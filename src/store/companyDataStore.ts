import { create } from "zustand";
import { apiClient } from "@/lib/api-client";

// Request body type
interface FrontendDataRequest {
  domain: string;
  job_id: number;
  name: string;
}

// Response types based on API
interface CompanyDataMetadata {
  job_id: number;
  script_type: string;
  requested_domain: string;
  last_updated: string;
}

export interface CompanyOverviewData {
  company_name: string;
  description: string;
  logo_url: string;
  industry: string;
  size: string;
  headquarters: string;
  trading_status: string;
  score: number;
}

interface FrontendDataResponse {
  status: string;
  message: string;
  metadata: CompanyDataMetadata;
  data: CompanyOverviewData;
}

interface CompanyDataState {
  companyData: CompanyOverviewData | null;
  metadata: CompanyDataMetadata | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
}

interface CompanyDataActions {
  fetchCompanyData: (
    domain: string,
    jobId: number,
    name: string
  ) => Promise<void>;
  clearCompanyData: () => void;
}

interface CompanyDataStore extends CompanyDataState, CompanyDataActions {}

export const useCompanyDataStore = create<CompanyDataStore>((set) => ({
  // State
  companyData: null,
  metadata: null,
  isLoading: false,
  error: null,
  lastFetched: null,

  // Actions
  fetchCompanyData: async (domain: string, jobId: number, name: string) => {
    set({ isLoading: true, error: null });

    const requestBody: FrontendDataRequest = {
      domain,
      job_id: jobId,
      name,
    };

    const response = await apiClient.post<FrontendDataResponse>(
      "/api/frontend/data",
      requestBody
    );

    if (response.error) {
      set({
        isLoading: false,
        error: response.error,
      });
      return;
    }

    if (response.data) {
      set({
        companyData: response.data.data,
        metadata: response.data.metadata,
        isLoading: false,
        error: null,
        lastFetched: Date.now(),
      });
    }
  },

  clearCompanyData: () => {
    set({
      companyData: null,
      metadata: null,
      isLoading: false,
      error: null,
      lastFetched: null,
    });
  },
}));
