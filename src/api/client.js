// src/api/client.js
/**
 * SkillBridge Central API Client
 * 
 * Provides unified HTTP communication to the Node.js / Express backend.
 * Includes automatic Bearer JWT injection, response unwrapping, and
 * transparent offline fallback if the backend server is offline.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.tokenKey = "skillbridge_jwt_token";
    this.userKey = "skillbridge_auth_user";
    this.isBackendReachable = null; // null = untested, true = online, false = offline
  }

  // Token management
  getToken() {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  setToken(token) {
    try {
      if (token) {
        localStorage.setItem(this.tokenKey, token);
      } else {
        localStorage.removeItem(this.tokenKey);
      }
    } catch (e) {
      console.error("Failed to persist auth token", e);
    }
  }

  getCurrentUser() {
    try {
      const u = localStorage.getItem(this.userKey);
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  }

  setCurrentUser(user) {
    try {
      if (user) {
        localStorage.setItem(this.userKey, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.userKey);
      }
    } catch (e) {
      console.error("Failed to persist user profile", e);
    }
  }

  clearAuth() {
    this.setToken(null);
    this.setCurrentUser(null);
  }

  /**
   * Health check to detect whether backend API server is accessible
   */
  async checkHealth() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`${this.baseUrl}/health`, {
        signal: controller.signal,
        headers: { "Accept": "application/json" }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        this.isBackendReachable = true;
        return { online: true, data };
      }
      this.isBackendReachable = false;
      return { online: false, error: "Health check returned non-200" };
    } catch (err) {
      this.isBackendReachable = false;
      return { online: false, error: err.message };
    }
  }

  /**
   * Core request dispatcher with automatic Authorization header
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers
      });

      const json = await res.json().catch(() => ({
        success: false,
        message: "Failed to parse JSON response"
      }));

      if (!res.ok) {
        // Automatically clear auth on 401 Unauthorized
        if (res.status === 401) {
          this.clearAuth();
        }
        return {
          success: false,
          status: res.status,
          message: json.message || "Request failed",
          data: null
        };
      }

      this.isBackendReachable = true;
      return json;
    } catch (err) {
      console.warn(`[SkillBridge API] Network error on ${endpoint}:`, err.message);
      this.isBackendReachable = false;
      return {
        success: false,
        isNetworkError: true,
        message: `Backend service is offline or unreachable (${err.message})`,
        data: null
      };
    }
  }

  // HTTP helper verbs
  get(endpoint, params) {
    let url = endpoint;
    if (params) {
      const query = new URLSearchParams(params).toString();
      if (query) url += `?${query}`;
    }
    return this.request(url, { method: "GET" });
  }

  post(endpoint, body) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  put(endpoint, body) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body)
    });
  }

  patch(endpoint, body) {
    return this.request(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();

// ============================================================
// MODULAR API SERVICES
// ============================================================

export const authApi = {
  login: async (email, password) => {
    const res = await apiClient.post("/auth/login", { email, password });
    if (res.success && res.data?.token) {
      apiClient.setToken(res.data.token);
      apiClient.setCurrentUser(res.data.user);
    }
    return res;
  },

  register: async (userData) => {
    const res = await apiClient.post("/auth/register", userData);
    if (res.success && res.data?.token) {
      apiClient.setToken(res.data.token);
      apiClient.setCurrentUser(res.data.user);
    }
    return res;
  },

  getMe: async () => apiClient.get("/auth/me"),

  logout: () => apiClient.clearAuth()
};

export const studentApi = {
  getProfile: async () => apiClient.get("/students/profile"),
  updateProfile: async (data) => apiClient.put("/students/profile", data),
  getReadiness: async () => apiClient.get("/students/readiness"),
  getGapAnalysis: async (careerId) => apiClient.get("/students/gap-analysis", careerId ? { careerId } : undefined)
};

export const skillsApi = {
  getAll: async (category) => apiClient.get("/skills", category ? { category } : undefined),
  getMySkills: async () => apiClient.get("/skills/my"),
  addSkill: async (skillData) => apiClient.post("/skills/my", skillData),
  updateSkill: async (id, skillData) => apiClient.put(`/skills/my/${id}`, skillData),
  deleteSkill: async (id) => apiClient.delete(`/skills/my/${id}`)
};

export const assessmentsApi = {
  getAll: async () => apiClient.get("/assessments"),
  getById: async (id) => apiClient.get(`/assessments/${id}`),
  submit: async (id, answers) => apiClient.post(`/assessments/${id}/submit`, { answers }),
  getHistory: async () => apiClient.get("/assessments/history")
};

export const careersApi = {
  getAll: async () => apiClient.get("/careers"),
  getRecommendations: async () => apiClient.get("/careers/recommendations"),
  getGap: async (careerId) => apiClient.get(`/careers/${careerId}/gap`)
};

export const roadmapApi = {
  getRoadmap: async () => apiClient.get("/roadmap"),
  generate: async (careerId) => apiClient.post("/roadmap/generate", { careerId }),
  updateItemStatus: async (itemId, status) => apiClient.patch(`/roadmap/items/${itemId}/status`, { status })
};

export const learningApi = {
  getResources: async (params) => apiClient.get("/learning/resources", params),
  getProgress: async () => apiClient.get("/learning/progress"),
  updateProgress: async (resourceId, progress, completed) =>
    apiClient.post("/learning/update-progress", { resourceId, progress, completed })
};

export const jobsApi = {
  getAll: async (params) => apiClient.get("/jobs", params),
  getRecommendations: async () => apiClient.get("/jobs/recommendations"),
  getById: async (id) => apiClient.get(`/jobs/${id}`),
  createJob: async (jobData) => apiClient.post("/jobs", jobData),
  updateJob: async (id, jobData) => apiClient.put(`/jobs/${id}`, jobData),
  deleteJob: async (id) => apiClient.delete(`/jobs/${id}`)
};

export const applicationsApi = {
  getMyApplications: async () => apiClient.get("/applications/my"),
  apply: async (jobId, notes) => apiClient.post("/applications/apply", { jobId, notes }),
  withdraw: async (id) => apiClient.post(`/applications/${id}/withdraw`),
  updateStatus: async (id, status, notes) => apiClient.patch(`/applications/${id}/status`, { status, notes })
};

export const passportApi = {
  getMyPassport: async () => apiClient.get("/passport"),
  generatePassport: async () => apiClient.post("/passport/generate"),
  verifyPassport: async (credentialId) => apiClient.get(`/passport/verify/${credentialId}`)
};

export const recruiterApi = {
  getOverview: async () => apiClient.get("/recruiter/overview"),
  searchCandidates: async (params) => apiClient.get("/recruiter/candidates", params),
  getCandidate: async (id) => apiClient.get(`/recruiter/candidates/${id}`)
};

export const institutionApi = {
  getAnalytics: async (institution) => apiClient.get("/institution/analytics", institution ? { institution } : undefined)
};

export const adminApi = {
  getStats: async () => apiClient.get("/admin/stats"),
  getUsers: async (params) => apiClient.get("/admin/users", params),
  updateUser: async (id, data) => apiClient.patch(`/admin/users/${id}`, data)
};

export const notificationsApi = {
  getAll: async () => apiClient.get("/notifications"),
  markAllRead: async () => apiClient.patch("/notifications/read-all"),
  markRead: async (id) => apiClient.patch(`/notifications/${id}/read`)
};

export default apiClient;
