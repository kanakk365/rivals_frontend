import { toast } from "sonner";

const API_BASE_URL = "http://44.222.232.195";

interface RequestConfig extends RequestInit {
  requiresAuth?: boolean;
}

interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): HeadersInit {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const tokenType =
      typeof window !== "undefined"
        ? localStorage.getItem("token_type")
        : "Bearer";

    if (token) {
      return {
        Authorization: `${tokenType || "Bearer"} ${token}`,
      };
    }

    return {};
  }

  private handleUnauthorized(): void {
    // Clear tokens
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("token_type");

      // Show error message
      toast.error("Session expired. Please login again.");

      // Redirect to login
      window.location.href = "/login";
    }
  }

  async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const { requiresAuth = true, headers = {}, ...restConfig } = config;

    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
      ...(requiresAuth ? this.getAuthHeaders() : {}),
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...restConfig,
        headers: requestHeaders,
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        this.handleUnauthorized();
        return {
          data: null,
          error: "Unauthorized",
          status: 401,
        };
      }

      // Handle other error statuses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle validation errors (422)
        if (response.status === 422 && errorData.detail) {
          if (Array.isArray(errorData.detail)) {
            const errorMessages = errorData.detail
              .map((err: { msg: string }) => err.msg)
              .join(", ");
            return {
              data: null,
              error: errorMessages || "Validation error",
              status: response.status,
            };
          }
        }

        return {
          data: null,
          error:
            errorData.message ||
            errorData.detail ||
            `Request failed with status ${response.status}`,
          status: response.status,
        };
      }

      // Parse successful response
      const data = await response.json();
      return {
        data,
        error: null,
        status: response.status,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Network error";
      return {
        data: null,
        error: errorMessage,
        status: 0,
      };
    }
  }

  async get<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(
    endpoint: string,
    config?: RequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

export type { ApiResponse, RequestConfig };
