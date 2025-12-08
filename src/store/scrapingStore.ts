import { create } from "zustand";
import { apiClient } from "@/lib/api-client";
import { toast } from "sonner";

interface ScrapingState {
  isLoading: boolean;
  currentBrand: string | null;
  currentDomain: string | null;
  jobIds: Record<string, number> | null;
  error: string | null;
}

interface ScrapingActions {
  startScraping: (
    brand: string,
    domain: string
  ) => Promise<{ success: boolean; slug?: string }>;
  resetScraping: () => void;
  setLoading: (loading: boolean) => void;
}

interface ScrapingStore extends ScrapingState, ScrapingActions {}

interface ScrapeResponse {
  success: boolean;
  job_ids: Record<string, number>;
  message: string;
  results: unknown;
}

export const useScrapingStore = create<ScrapingStore>((set) => ({
  // State
  isLoading: false,
  currentBrand: null,
  currentDomain: null,
  jobIds: null,
  error: null,

  // Actions
  startScraping: async (brand: string, domain: string) => {
    set({
      isLoading: true,
      currentBrand: brand,
      currentDomain: domain,
      jobIds: null,
      error: null,
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
      toast.success(response.data.message || "Scraping started successfully!");

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

  resetScraping: () => {
    set({
      isLoading: false,
      currentBrand: null,
      currentDomain: null,
      jobIds: null,
      error: null,
    });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));
