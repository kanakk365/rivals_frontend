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

// Social Posts Metrics types (job_id: 7=Instagram, 8=Twitter, 9=YouTube, 10=Facebook, 11=LinkedIn)
export interface SocialPostsNumericTotals {
  videoViewCount: number;
  likesCount: number;
  commentsCount: number;
  totalEngagement: number;
  engagementRate: number;
}

export interface SocialPostsEngagementSummary {
  total_views: number;
  total_likes: number;
  total_comments: number;
  average_engagement_rate: number;
}

export interface SocialPostsTotals {
  likes: number;
  comments: number;
  shares: number;
  reactions: number;
  views: number;
  video_views: number;
  total_engagement: number;
}

export interface SocialPostsMetricsResponse {
  status: string;
  message: string;
  domain: string;
  job_id: number;
  numeric_totals: SocialPostsNumericTotals | null;
  engagement_summary: SocialPostsEngagementSummary | null;
  totals: SocialPostsTotals | null;
  posts_count: number;
}

// Platform metrics data structure
export interface PlatformMetrics {
  videoViewCount: number;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  totalEngagement: number;
  engagementRate: number;
  postsCount: number;
}

// Review Posts Statistics types (job_id: 12=Reddit, 13=Trustpilot, 14=Google Reviews)
export interface ReviewTarget {
  type: string;
  name: string;
  sanitized_name: string;
  requested_reviews: number;
  retrieved_reviews: number;
}

export interface SentimentSummary {
  positive_count: number;
  negative_count: number;
  neutral_count: number;
  total_analyzed: number;
  positive_pct: number;
  negative_pct: number;
  neutral_pct: number;
}

export interface ReviewPostsStatisticsResponse {
  status: string;
  message: string;
  domain: string;
  job_id: number;
  target: ReviewTarget | null;
  sentiment_summary: SentimentSummary | null;
  review_urls: string[];
}

// Combined sentiment data from all review platforms
export interface OverallSentiment {
  positive_count: number;
  negative_count: number;
  neutral_count: number;
  total_analyzed: number;
  positive_pct: number;
  negative_pct: number;
  neutral_pct: number;
}

// Social Posts List types
export interface SocialPost {
  id: number;
  platform: string;
  post_url: string;
  post_type: string;
  caption: string | null;
  post_timestamp: string;
  likes_count: number | null;
  comments_count: number | null;
  views_count: number | null;
  total_engagement: number | null;
  engagement_rate: number | null;
  external_post_id: string;
  created_at: string;
  image_url: string | null;
}

export interface SocialPostsListResponse {
  status: string;
  message: string;
  domain: string;
  platform: string;
  limit: number;
  offset: number;
  total_count: number;
  posts: SocialPost[];
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
  // Platform metrics from social-posts/metrics endpoint
  instagramMetrics: PlatformMetrics | null;
  twitterMetrics: PlatformMetrics | null;
  youtubeMetrics: PlatformMetrics | null;
  facebookMetrics: PlatformMetrics | null;
  linkedinMetrics: PlatformMetrics | null;
  metricsLoading: boolean;
  // Review sentiment data (Reddit, Trustpilot, Google Reviews)
  redditSentiment: SentimentSummary | null;
  trustpilotSentiment: SentimentSummary | null;
  googleReviewsSentiment: SentimentSummary | null;
  overallSentiment: OverallSentiment | null;
  sentimentLoading: boolean;
  // Social posts list state
  socialPosts: SocialPost[];
  socialPostsTotal: number;
  socialPostsLoading: boolean;
}

interface SocialMediaActions {
  fetchInstagramData: (domain: string, name: string) => Promise<void>;
  fetchTwitterData: (domain: string, name: string) => Promise<void>;
  fetchYouTubeData: (domain: string, name: string) => Promise<void>;
  fetchFacebookData: (domain: string, name: string) => Promise<void>;
  fetchLinkedInData: (domain: string, name: string) => Promise<void>;
  fetchAllSocialData: (domain: string, name: string) => Promise<void>;
  // Metrics actions
  fetchPlatformMetrics: (domain: string, jobId: number) => Promise<void>;
  fetchAllPlatformMetrics: (domain: string) => Promise<void>;
  // Review sentiment actions
  fetchReviewSentiment: (domain: string, jobId: number) => Promise<void>;
  fetchAllReviewSentiments: (domain: string) => Promise<void>;
  // Social posts actions
  fetchSocialPosts: (
    domain: string,
    platform: number,
    limit?: number,
    offset?: number
  ) => Promise<void>;
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
  // Platform metrics state
  instagramMetrics: null,
  twitterMetrics: null,
  youtubeMetrics: null,
  facebookMetrics: null,
  linkedinMetrics: null,
  metricsLoading: false,
  // Review sentiment state
  redditSentiment: null,
  trustpilotSentiment: null,
  googleReviewsSentiment: null,
  overallSentiment: null,
  sentimentLoading: false,
  // Social posts state
  socialPosts: [],
  socialPostsTotal: 0,
  socialPostsLoading: false,

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
      fetchAllPlatformMetrics,
      fetchAllReviewSentiments,
    } = get();

    await Promise.all([
      fetchInstagramData(domain, name),
      fetchYouTubeData(domain, name),
      fetchFacebookData(domain, name),
      fetchLinkedInData(domain, name),
      fetchAllPlatformMetrics(domain),
      fetchAllReviewSentiments(domain),
    ]);
  },

  fetchPlatformMetrics: async (domain: string, jobId: number) => {
    const response = await apiClient.get<SocialPostsMetricsResponse>(
      `/api/frontend/social-posts/metrics?domain=${encodeURIComponent(
        domain
      )}&job_id=${jobId}`
    );

    if (response.error || !response.data) {
      return;
    }

    const data = response.data;

    // Handle both numeric_totals and engagement_summary response formats
    let metrics: PlatformMetrics;

    if (data.numeric_totals) {
      // Instagram, Twitter, Facebook, LinkedIn use numeric_totals
      metrics = {
        videoViewCount: data.numeric_totals.videoViewCount || 0,
        likesCount: data.numeric_totals.likesCount || 0,
        commentsCount: data.numeric_totals.commentsCount || 0,
        sharesCount: 0,
        totalEngagement: data.numeric_totals.totalEngagement || 0,
        engagementRate: data.numeric_totals.engagementRate || 0,
        postsCount: data.posts_count || 0,
      };
    } else if (data.engagement_summary) {
      // YouTube uses engagement_summary
      metrics = {
        videoViewCount: data.engagement_summary.total_views || 0,
        likesCount: data.engagement_summary.total_likes || 0,
        commentsCount: data.engagement_summary.total_comments || 0,
        sharesCount: 0,
        totalEngagement:
          (data.engagement_summary.total_likes || 0) +
          (data.engagement_summary.total_comments || 0),
        engagementRate: data.engagement_summary.average_engagement_rate || 0,
        postsCount: data.posts_count || 0,
      };
    } else if (data.totals) {
      // Facebook uses totals (includes shares)
      metrics = {
        videoViewCount: data.totals.video_views || data.totals.views || 0,
        likesCount: data.totals.likes || 0,
        commentsCount: data.totals.comments || 0,
        sharesCount: data.totals.shares || 0,
        totalEngagement: data.totals.total_engagement || 0,
        engagementRate: 0,
        postsCount: data.posts_count || 0,
      };
    } else {
      // No data available
      return;
    }

    // Map job_id to platform metrics
    switch (jobId) {
      case 7:
        set({ instagramMetrics: metrics });
        break;
      case 8:
        set({ twitterMetrics: metrics });
        break;
      case 9:
        set({ youtubeMetrics: metrics });
        break;
      case 10:
        set({ facebookMetrics: metrics });
        break;
      case 11:
        set({ linkedinMetrics: metrics });
        break;
    }
  },

  fetchAllPlatformMetrics: async (domain: string) => {
    set({ metricsLoading: true });
    const { fetchPlatformMetrics } = get();

    // Fetch metrics for all platforms (job_ids 7-11)
    await Promise.all([
      fetchPlatformMetrics(domain, 7), // Instagram
      fetchPlatformMetrics(domain, 8), // Twitter
      fetchPlatformMetrics(domain, 9), // YouTube
      fetchPlatformMetrics(domain, 10), // Facebook
      fetchPlatformMetrics(domain, 11), // LinkedIn
    ]);

    set({ metricsLoading: false });
  },

  fetchReviewSentiment: async (domain: string, jobId: number) => {
    const response = await apiClient.get<ReviewPostsStatisticsResponse>(
      `/api/frontend/review-posts/statistics?domain=${encodeURIComponent(
        domain
      )}&job_id=${jobId}`
    );

    if (response.error || !response.data || !response.data.sentiment_summary) {
      return;
    }

    const sentiment = response.data.sentiment_summary;

    // Map job_id to sentiment state
    switch (jobId) {
      case 12:
        set({ redditSentiment: sentiment });
        break;
      case 13:
        set({ trustpilotSentiment: sentiment });
        break;
      case 14:
        set({ googleReviewsSentiment: sentiment });
        break;
    }
  },

  fetchAllReviewSentiments: async (domain: string) => {
    set({ sentimentLoading: true });
    const { fetchReviewSentiment } = get();

    // Fetch sentiment for all review platforms (job_ids 12-14)
    await Promise.all([
      fetchReviewSentiment(domain, 12), // Reddit
      fetchReviewSentiment(domain, 13), // Trustpilot
      fetchReviewSentiment(domain, 14), // Google Reviews
    ]);

    // Calculate overall sentiment from all platforms
    const { redditSentiment, trustpilotSentiment, googleReviewsSentiment } =
      get();
    const sentiments = [
      redditSentiment,
      trustpilotSentiment,
      googleReviewsSentiment,
    ].filter(Boolean) as SentimentSummary[];

    if (sentiments.length > 0) {
      const overall: OverallSentiment = {
        positive_count: sentiments.reduce(
          (sum, s) => sum + s.positive_count,
          0
        ),
        negative_count: sentiments.reduce(
          (sum, s) => sum + s.negative_count,
          0
        ),
        neutral_count: sentiments.reduce((sum, s) => sum + s.neutral_count, 0),
        total_analyzed: sentiments.reduce(
          (sum, s) => sum + s.total_analyzed,
          0
        ),
        positive_pct: 0,
        negative_pct: 0,
        neutral_pct: 0,
      };

      // Calculate percentages
      if (overall.total_analyzed > 0) {
        overall.positive_pct = Math.round(
          (overall.positive_count / overall.total_analyzed) * 100
        );
        overall.negative_pct = Math.round(
          (overall.negative_count / overall.total_analyzed) * 100
        );
        overall.neutral_pct = Math.round(
          (overall.neutral_count / overall.total_analyzed) * 100
        );
      }

      set({ overallSentiment: overall });
    }

    set({ sentimentLoading: false });
  },

  fetchSocialPosts: async (
    domain: string,
    platform: number,
    limit = 10,
    offset = 0
  ) => {
    set({ socialPostsLoading: true });

    const queryParams = new URLSearchParams({
      domain,
      platform: platform.toString(),
      limit: limit.toString(),
      offset: offset.toString(),
    });

    const response = await apiClient.get<SocialPostsListResponse>(
      `/api/frontend/social-posts/list?${queryParams.toString()}`
    );

    if (response.data) {
      set({
        socialPosts: response.data.posts,
        socialPostsTotal: response.data.total_count,
        socialPostsLoading: false,
      });
    } else {
      set({ socialPostsLoading: false });
    }
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
      // Clear metrics
      instagramMetrics: null,
      twitterMetrics: null,
      youtubeMetrics: null,
      facebookMetrics: null,
      linkedinMetrics: null,
      metricsLoading: false,
      // Clear sentiment
      redditSentiment: null,
      trustpilotSentiment: null,
      googleReviewsSentiment: null,
      overallSentiment: null,
      sentimentLoading: false,
      socialPosts: [],
      socialPostsTotal: 0,
      socialPostsLoading: false,
    });
  },
}));
