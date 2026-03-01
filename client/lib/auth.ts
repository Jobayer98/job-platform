// Auth utility functions

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export const getAdminToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
};

export const getAdminUser = (): AdminUser | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("admin_user");
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getAdminToken();
};

export const logout = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
  window.location.href = "/admin/auth";
};

export const getAuthHeaders = (): HeadersInit => {
  const token = getAdminToken();
  return {
    "Content-Type": "application/json",
    "Accept": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
