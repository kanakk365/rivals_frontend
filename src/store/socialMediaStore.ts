import { create } from "zustand";
import { apiClient } from "@/lib/api-client";

// Request body type
interface SocialMediaDataRequest {
  domain: string;
  job_id: number;
  name: string;
}

// Response types
interface SocialMediaMetadata {
  job_id: number;
  script_type: string;
  requested_domain: string;
  last_updated: string;
}

// Instagram data (job_id = 2)
export interface InstagramData {
  followersCount: number;
  followsCount: number;
  postsCount: number;
  followersToFollowingRatio: number;
  accountType: string;
  businessCategory: string;
  hasContactInfo: boolean;
  hasWebsite: boolean;
  isVerified: boolean;
  isPrivate: boolean;
  hasIGTV: boolean;
  hasHighlights: boolean;
  profileCompletenessScore: number;
  activityLevel: string;
  relatedProfilesCount: number;
  relatedProfilesVerifiedCount: number;
  relatedProfilesVerifiedPercentage: number;
  relatedProfilesPrivateCount: number;
  profileUrl: string;
  profilePictureUrl: string;
}

// Twitter data (job_id = 3)
export interface TwitterData {
  name: string;
  profileUrl: string;
  verification: boolean;
  statistics: {
    followersCount?: number;
    followingCount?: number;
    tweetsCount?: number;
    [key: string]: unknown;
  };
}

// YouTube data (job_id = 4)
export interface YouTubeData {
  name: string;
  url: string;
  media: {
    avatar: string;
  };
  statistics: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
    totalPosts: number;
    hiddenSubscriberCount: boolean;
  };
}

// Facebook data (job_id = 5)
export interface FacebookData {
  name: string;
  alternate_name: string;
  id: string;
  url: string;
  verified: boolean;
  profile_type: string;
  category: string;
  profile_intro_text: string;
  followers: string;
  likes: string;
  following: string;
  rating: string;
  reviews: number;
  address: string;
  phone: string;
  email: string;
  business_hours: string;
  price_range: string;
  profile_picture: string;
  cover_photo: string;
  has_stories: boolean;
}

// LinkedIn data (job_id = 6)
export interface LinkedInData {
  url: string;
  companyName: string;
  websiteUrl: string;
  industry: string;
  employeeCount: number;
  followerCount: number;
  universalName: string;
  tagline: string | null;
  description: string;
  companyId: number;
  hashtag: string;
  industryV2Taxonomy: string;
}

// Union type for all social media data
export type SocialMediaData =
  | InstagramData
  | TwitterData
  | YouTubeData
  | FacebookData
  | LinkedInData
  | null;

interface SocialMediaDataResponse {
  status: string;
  message: string;
  metadata: SocialMediaMetadata;
  data: SocialMediaData;
}

interface SocialMediaState {
  instagramData: InstagramData | null;
  twitterData: TwitterData | null;
  youtubeData: YouTubeData | null;
  facebookData: FacebookData | null;
  linkedinData: LinkedInData | null;
  metadata: SocialMediaMetadata | null;
  isLoading: boolean;
  loadingPlatforms: Set<string>;
  errors: Record<string, string | null>;
  lastFetched: number | null;
}

interface SocialMediaActions {
  fetchInstagramData: (domain: string, name: string) => Promise<void>;
  fetchTwitterData: (domain: string, name: string) => Promise<void>;
  fetchYouTubeData: (domain: string, name: string) => Promise<void>;
  fetchFacebookData: (domain: string, name: string) => Promise<void>;
  fetchLinkedInData: (domain: string, name: string) => Promise<void>;
  fetchAllSocialData: (domain: string, name: string) => Promise<void>;
  clearSocialMediaData: () => void;
}

interface SocialMediaStore extends SocialMediaState, SocialMediaActions {}

export const useSocialMediaStore = create<SocialMediaStore>((set, get) => ({
  // State
  instagramData: null,
  twitterData: null,
  youtubeData: null,
  facebookData: null,
  linkedinData: null,
  metadata: null,
  isLoading: false,
  loadingPlatforms: new Set(),
  errors: {},
  lastFetched: null,

  // Actions
  fetchInstagramData: async (domain: string, name: string) => {
    const { loadingPlatforms } = get();
    loadingPlatforms.add("instagram");
    set({ loadingPlatforms: new Set(loadingPlatforms), isLoading: true });

    const requestBody: SocialMediaDataRequest = {
      domain,
      job_id: 2,
      name,
    };

    const response = await apiClient.post<SocialMediaDataResponse>(
      "/api/frontend/social-data",
      requestBody
    );

    loadingPlatforms.delete("instagram");
    const newErrors = { ...get().errors };

    if (response.error) {
      newErrors.instagram = response.error;
      set({
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
      });
      return;
    }

    if (response.data) {
      newErrors.instagram = null;
      set({
        instagramData: response.data.data as InstagramData,
        metadata: response.data.metadata,
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
        lastFetched: Date.now(),
      });
    }
  },

  fetchTwitterData: async (domain: string, name: string) => {
    const { loadingPlatforms } = get();
    loadingPlatforms.add("twitter");
    set({ loadingPlatforms: new Set(loadingPlatforms), isLoading: true });

    const requestBody: SocialMediaDataRequest = {
      domain,
      job_id: 3,
      name,
    };

    const response = await apiClient.post<SocialMediaDataResponse>(
      "/api/frontend/social-data",
      requestBody
    );

    loadingPlatforms.delete("twitter");
    const newErrors = { ...get().errors };

    if (response.error) {
      newErrors.twitter = response.error;
      set({
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
      });
      return;
    }

    if (response.data) {
      newErrors.twitter = null;
      set({
        twitterData: response.data.data as TwitterData,
        metadata: response.data.metadata,
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
        lastFetched: Date.now(),
      });
    }
  },

  fetchYouTubeData: async (domain: string, name: string) => {
    const { loadingPlatforms } = get();
    loadingPlatforms.add("youtube");
    set({ loadingPlatforms: new Set(loadingPlatforms), isLoading: true });

    const requestBody: SocialMediaDataRequest = {
      domain,
      job_id: 4,
      name,
    };

    const response = await apiClient.post<SocialMediaDataResponse>(
      "/api/frontend/social-data",
      requestBody
    );

    loadingPlatforms.delete("youtube");
    const newErrors = { ...get().errors };

    if (response.error) {
      newErrors.youtube = response.error;
      set({
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
      });
      return;
    }

    if (response.data) {
      newErrors.youtube = null;
      set({
        youtubeData: response.data.data as YouTubeData,
        metadata: response.data.metadata,
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
        lastFetched: Date.now(),
      });
    }
  },

  fetchFacebookData: async (domain: string, name: string) => {
    const { loadingPlatforms } = get();
    loadingPlatforms.add("facebook");
    set({ loadingPlatforms: new Set(loadingPlatforms), isLoading: true });

    const requestBody: SocialMediaDataRequest = {
      domain,
      job_id: 5,
      name,
    };

    const response = await apiClient.post<SocialMediaDataResponse>(
      "/api/frontend/social-data",
      requestBody
    );

    loadingPlatforms.delete("facebook");
    const newErrors = { ...get().errors };

    if (response.error) {
      newErrors.facebook = response.error;
      set({
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
      });
      return;
    }

    if (response.data) {
      newErrors.facebook = null;
      set({
        facebookData: response.data.data as FacebookData,
        metadata: response.data.metadata,
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
        lastFetched: Date.now(),
      });
    }
  },

  fetchLinkedInData: async (domain: string, name: string) => {
    const { loadingPlatforms } = get();
    loadingPlatforms.add("linkedin");
    set({ loadingPlatforms: new Set(loadingPlatforms), isLoading: true });

    const requestBody: SocialMediaDataRequest = {
      domain,
      job_id: 6,
      name,
    };

    const response = await apiClient.post<SocialMediaDataResponse>(
      "/api/frontend/social-data",
      requestBody
    );

    loadingPlatforms.delete("linkedin");
    const newErrors = { ...get().errors };

    if (response.error) {
      newErrors.linkedin = response.error;
      set({
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
      });
      return;
    }

    if (response.data) {
      newErrors.linkedin = null;
      set({
        linkedinData: response.data.data as LinkedInData,
        metadata: response.data.metadata,
        loadingPlatforms: new Set(loadingPlatforms),
        isLoading: loadingPlatforms.size > 0,
        errors: newErrors,
        lastFetched: Date.now(),
      });
    }
  },

  fetchAllSocialData: async (domain: string, name: string) => {
    const {
      fetchInstagramData,
      fetchYouTubeData,
      fetchFacebookData,
      fetchLinkedInData,
    } = get();

    await Promise.all([
      fetchInstagramData(domain, name),
      fetchYouTubeData(domain, name),
      fetchFacebookData(domain, name),
      fetchLinkedInData(domain, name),
    ]);
  },

  clearSocialMediaData: () => {
    set({
      instagramData: null,
      twitterData: null,
      youtubeData: null,
      facebookData: null,
      linkedinData: null,
      metadata: null,
      isLoading: false,
      loadingPlatforms: new Set(),
      errors: {},
      lastFetched: null,
    });
  },
}));
