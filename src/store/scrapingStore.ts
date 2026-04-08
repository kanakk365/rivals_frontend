import { create } from "zustand";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

export interface ScrapeJob {
  job_id: number;
  script_type: string;
  status: "pending" | "running" | "completed" | "completed_no_data" | "failed" | "skipped";
  job_instance_id: number | null;
  has_result: boolean;
  created_at: string | null;
  completed_at: string | null;
  error_message: string | null;
}

export interface CompletionStatus {
  is_complete: boolean;
  domain: string;
  total_jobs: number;
  completed_jobs: number;
  completed_no_data_jobs: number;
  failed_jobs: number;
  pending_jobs: number;
  running_jobs: number;
  completion_percentage: number;
  all_results_available: boolean;
  jobs: ScrapeJob[];
  oldest_job_created_at: string | null;
  newest_job_completed_at: string | null;
  message: string;
}

interface ScrapingState {
  isLoading: boolean;
  currentBrand: string | null;
  currentDomain: string | null;
  jobIds: Record<string, number> | null;
  error: string | null;
  // Progress tracking
  isPolling: boolean;
  completionStatus: CompletionStatus | null;
  pollError: string | null;
}

interface ScrapingActions {
  startScraping: (
    brand: string,
    domain: string
  ) => Promise<{ success: boolean; slug?: string }>;
  resetScraping: () => void;
  setLoading: (loading: boolean) => void;
  pollCompletionStatus: (domain: string) => Promise<CompletionStatus | null>;
  startPolling: (domain: string, onComplete: () => void) => () => void;
  clearStatus: () => void;
}

interface ScrapingStore extends ScrapingState, ScrapingActions {}

interface ScrapeResponse {
  success: boolean;
  job_ids: Record<string, number>;
  message: string;
  results: unknown;
}

export const useScrapingStore = create<ScrapingStore>((set, get) => ({
  // State
  isLoading: false,
  currentBrand: null,
  currentDomain: null,
  jobIds: null,
  error: null,
  isPolling: false,
  completionStatus: null,
  pollError: null,

  // Actions
  startScraping: async (brand: string, domain: string) => {
    set({
      isLoading: true,
      currentBrand: brand,
      currentDomain: domain,
      jobIds: null,
      error: null,
      completionStatus: null,
    });

    const response = await apiClient.post<ScrapeResponse>("/api/scrape", {
      domain,
      brand,
    });

    if (response.error) {
      set({
        isLoading: false,
        error: response.error,
      });
      toast.error(response.error);
      return { success: false };
    }

    if (response.data?.success) {
      set({
        isLoading: false,
        jobIds: response.data.job_ids || null,
        error: null,
      });

      const slug = brand.toLowerCase().replace(/\s+/g, "-");
      return { success: true, slug };
    }

    set({
      isLoading: false,
      error: response.data?.message || "Failed to start scraping",
    });
    toast.error(response.data?.message || "Failed to start scraping");
    return { success: false };
  },

  pollCompletionStatus: async (domain: string) => {
    const response = await apiClient.get<CompletionStatus>(
      `/api/scrape/completion-status?domain=${encodeURIComponent(domain)}`
    );

    if (response.error || !response.data) {
      set({ pollError: response.error || "Failed to fetch status" });
      return null;
    }

    set({ completionStatus: response.data, pollError: null });
    return response.data;
  },

  startPolling: (domain: string, onComplete: () => void) => {
    set({ isPolling: true, pollError: null });
    const { pollCompletionStatus } = get();

    const interval = setInterval(async () => {
      const status = await pollCompletionStatus(domain);
      if (status?.is_complete) {
        clearInterval(interval);
        set({ isPolling: false });
        onComplete();
      }
    }, 5000); // Poll every 5 seconds

    // Initial poll immediately
    pollCompletionStatus(domain);

    // Return cleanup function
    return () => {
      clearInterval(interval);
      set({ isPolling: false });
    };
  },

  clearStatus: () => {
    set({ completionStatus: null, isPolling: false, pollError: null });
  },

  resetScraping: () => {
    set({
      isLoading: false,
      currentBrand: null,
      currentDomain: null,
      jobIds: null,
      error: null,
      isPolling: false,
      completionStatus: null,
      pollError: null,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
