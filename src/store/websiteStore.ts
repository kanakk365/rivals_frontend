import { create } from "zustand";
import { apiClient } from "@/lib/api-client";

// Keyword suggestion types
export interface KeywordSuggestion {
  rank: number;
  suggestion: string;
  length: number;
  word_count: number;
}

export interface KeywordSuggestionsResponse {
  suggestions: KeywordSuggestion[];
}

export interface SeoData {
  data_captured_at: string;
  domain: string;
  keyword: string;
  country: string;
  website_overview: {
    total_traffic: number | null;
    trust_score: number | null;
    page_views: number | null;
    unique_visitors: number | null;
    bounce_rate: number | null;
    avg_session_seconds: number | null;
  };
  seo_performance: {
    domain_authority: number | null;
    page_authority: number | null;
    backlinks: number | null;
    referring_domains: number | null;
    organic_keywords_count: number | null;
    indexed_pages: number | null;
  };
  traffic_sources: Array<{
    source: string;
    value: number;
    share: number;
  }>;
  traffic_trend: {
    visits_history: Array<{
      date: string;
      value: number;
    }>;
    search_traffic_history: Array<{
      date: string;
      search_traffic: number;
      paid_traffic: number;
      organic_traffic: number;
    }>;
  };
  keyword_suggestions: Array<{
    keyword: string;
    rank: number;
    traffic_share: number;
    search_volume: number;
  }>;
  top_performing_pages: Array<{
    page: string;
    url: string;
    views: number | null;
    avg_time_seconds: number | null;
    bounce_rate: number | null;
  }>;
}

interface WebsiteState {
  // Keyword suggestions state
  keywordSuggestions: KeywordSuggestion[];
  keywordSuggestionsLoading: boolean;
  keywordSuggestionsError: string | null;

  // SEO Data state
  seoData: SeoData | null;
  seoDataLoading: boolean;
  seoDataError: string | null;
}

interface WebsiteActions {
  fetchKeywordSuggestions: (domain: string) => Promise<void>;
  fetchSeoData: (domain: string) => Promise<void>;
  clearWebsiteData: () => void;
}

interface WebsiteStore extends WebsiteState, WebsiteActions {}

export const useWebsiteStore = create<WebsiteStore>((set) => ({
  // State
  keywordSuggestions: [],
  keywordSuggestionsLoading: false,
  keywordSuggestionsError: null,

  seoData: null,
  seoDataLoading: false,
  seoDataError: null,

  // Actions
  fetchKeywordSuggestions: async (domain: string) => {
    set({ keywordSuggestionsLoading: true, keywordSuggestionsError: null });

    const response = await apiClient.get<KeywordSuggestionsResponse>(
      `/api/frontend/keyword-suggestions?domain=${encodeURIComponent(domain)}`,
    );

    if (response.data) {
      set({
        keywordSuggestions: response.data.suggestions,
        keywordSuggestionsLoading: false,
      });
    } else {
      set({
        keywordSuggestionsLoading: false,
        keywordSuggestionsError:
          response.error || "Failed to fetch keyword suggestions",
      });
    }
  },

  fetchSeoData: async (domain: string) => {
    set({ seoDataLoading: true, seoDataError: null });

    const response = await apiClient.get<SeoData>(
      `/api/frontend/seo-data?domain=${encodeURIComponent(domain)}`,
    );

    if (response.data) {
      set({
        seoData: response.data,
        seoDataLoading: false,
      });
    } else {
      set({
        seoDataLoading: false,
        seoDataError: response.error || "Failed to fetch SEO data",
      });
    }
  },

  clearWebsiteData: () => {
    set({
      keywordSuggestions: [],
      keywordSuggestionsLoading: false,
      keywordSuggestionsError: null,
      seoData: null,
      seoDataLoading: false,
      seoDataError: null,
    });
  },
}));
