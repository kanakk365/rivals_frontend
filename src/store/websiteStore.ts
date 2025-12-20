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

interface WebsiteState {
  // Keyword suggestions state
  keywordSuggestions: KeywordSuggestion[];
  keywordSuggestionsLoading: boolean;
  keywordSuggestionsError: string | null;
}

interface WebsiteActions {
  fetchKeywordSuggestions: (domain: string) => Promise<void>;
  clearWebsiteData: () => void;
}

interface WebsiteStore extends WebsiteState, WebsiteActions {}

export const useWebsiteStore = create<WebsiteStore>((set) => ({
  // State
  keywordSuggestions: [],
  keywordSuggestionsLoading: false,
  keywordSuggestionsError: null,

  // Actions
  fetchKeywordSuggestions: async (domain: string) => {
    set({ keywordSuggestionsLoading: true, keywordSuggestionsError: null });

    const response = await apiClient.get<KeywordSuggestionsResponse>(
      `/api/frontend/keyword-suggestions?domain=${encodeURIComponent(domain)}`
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

  clearWebsiteData: () => {
    set({
      keywordSuggestions: [],
      keywordSuggestionsLoading: false,
      keywordSuggestionsError: null,
    });
  },
}));
