import { create } from "zustand";
import { apiClient } from "@/lib/api-client";

// --- API response types ---

export interface FundraisingRound {
  round_type: string;
  round_date: string;
  amount: string;
  amount_raised: number | null;
  currency: string;
  investors: string[];
  lead_investor: string;
  source_url: string;
}

export interface FundraisingSummary {
  total_rounds: number;
  latest_raised: string;
  total_funding: string;
  last_round: string;
  lead_investor: string;
  valuation: string;
}

export interface FundraisingPayload {
  query: string;
  company_name: string;
  domain: string;
  as_of_date: string;
  confidence_level: number;
  summary: FundraisingSummary;
  rounds: FundraisingRound[];
}

interface FundraisingData {
  job_id: number;
  script_type: string;
  schema_version: string;
  generated_at: string;
  payload: FundraisingPayload;
}

interface FundraisingResponse {
  job_id: number;
  script_type: string;
  domain: string;
  data: FundraisingData;
  metadata: {
    execution_time: string;
    job_instance_id: number;
    query_domain: string;
    query_source: string;
  };
  created_at: string;
  updated_at: string | null;
}

// --- Store ---

interface FundraisingState {
  fundraisingData: FundraisingPayload | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  currentDomain: string | null;
}

interface FundraisingActions {
  fetchFundraising: (domain: string) => Promise<void>;
  clearFundraising: () => void;
}

interface FundraisingStore extends FundraisingState, FundraisingActions {}

export const useFundraisingStore = create<FundraisingStore>((set, get) => ({
  // State
  fundraisingData: null,
  isLoading: false,
  error: null,
  lastFetched: null,
  currentDomain: null,

  // Actions
  fetchFundraising: async (domain: string) => {
    // Skip if already fetched for this domain recently (within 5 minutes)
    const state = get();
    if (
      state.currentDomain === domain &&
      state.lastFetched &&
      Date.now() - state.lastFetched < 5 * 60 * 1000
    ) {
      return;
    }

    set({ isLoading: true, error: null, currentDomain: domain });

    const response = await apiClient.get<FundraisingResponse>(
      `/api/fundraising?domain=${encodeURIComponent(domain)}`,
    );

    if (response.error) {
      set({
        isLoading: false,
        error: response.error,
        fundraisingData: null,
      });
      return;
    }

    if (response.data?.data?.payload) {
      set({
        fundraisingData: response.data.data.payload,
        isLoading: false,
        error: null,
        lastFetched: Date.now(),
      });
    } else {
      set({
        isLoading: false,
        error: "No fundraising data available",
        fundraisingData: null,
      });
    }
  },

  clearFundraising: () => {
    set({
      fundraisingData: null,
      isLoading: false,
      error: null,
      lastFetched: null,
      currentDomain: null,
    });
  },
}));
