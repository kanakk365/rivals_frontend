import { create } from "zustand";
import { apiClient } from "@/lib/api-client";

// --- API response types ---

export interface RevenueQuarter {
  date: string;
  fiscal_year: string;
  period: string;
  revenue: number;
  cost_of_revenue: number;
  gross_profit: number;
  operating_expenses: number;
  operating_income: number;
  ebitda: number;
  ebit: number;
  net_income: number;
  eps: number;
  eps_diluted: number;
  reported_currency: string;
  filing_date: string;
  accepted_date: string;
}

export interface RevenueSummary {
  total_revenue_4q: number;
  total_net_income_4q: number;
  average_eps_4q: number;
  period_range: {
    oldest: string;
    newest: string;
  };
}

export interface RevenueData {
  symbol: string;
  status: string;
  quarters_count: number;
  quarters: RevenueQuarter[];
  summary: RevenueSummary;
  fetched_at: string;
}

interface RevenueMetadata {
  job_id: number;
  script_type: string;
  requested_domain: string;
  last_updated: string;
}

interface RevenueResponse {
  status: string;
  message: string;
  metadata: RevenueMetadata;
  data: RevenueData;
}

// --- Store ---

interface RevenueState {
  revenueData: RevenueData | null;
  metadata: RevenueMetadata | null;
  isLoading: boolean;
  error: string | null;
  lastFetched: number | null;
  currentDomain: string | null;
}

interface RevenueActions {
  fetchRevenue: (domain: string) => Promise<void>;
  clearRevenue: () => void;
}

interface RevenueStore extends RevenueState, RevenueActions {}

export const useRevenueStore = create<RevenueStore>((set, get) => ({
  // State
  revenueData: null,
  metadata: null,
  isLoading: false,
  error: null,
  lastFetched: null,
  currentDomain: null,

  // Actions
  fetchRevenue: async (domain: string) => {
    const state = get();
    // eslint-disable-next-line no-console
    console.log(
      "[RevenueStore] Fetching revenue for:",
      domain,
      "Current store domain:",
      state.currentDomain,
    );

    set({ isLoading: true, error: null, currentDomain: domain });

    const response = await apiClient.get<RevenueResponse>(
      `/api/frontend/revenue-data?domain=${encodeURIComponent(domain)}`,
    );

    if (response.error) {
      set({
        isLoading: false,
        error: response.error,
        revenueData: null,
        metadata: null,
      });
      return;
    }

    if (response.data?.data) {
      set({
        revenueData: response.data.data,
        metadata: response.data.metadata,
        isLoading: false,
        error: null,
        lastFetched: Date.now(),
      });
    } else {
      set({
        isLoading: false,
        error: "No revenue data available",
        revenueData: null,
        metadata: null,
      });
    }
  },

  clearRevenue: () => {
    set({
      revenueData: null,
      metadata: null,
      isLoading: false,
      error: null,
      lastFetched: null,
      currentDomain: null,
    });
  },
}));
