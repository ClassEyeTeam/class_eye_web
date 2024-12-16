import axios from "axios";
import { User, UserManager, WebStorageStateStore } from "oidc-client-ts";
import { authConfig } from "./authConfig";

class AuthService {
  private userManager: UserManager | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.userManager = new UserManager({
        ...authConfig,
        userStore: new WebStorageStateStore({ store: window.localStorage }),
      });

      // Set up axios interceptor with CORS headers
      axios.interceptors.request.use(async (config) => {
        const user = await this.getUser();
        if (user?.access_token) {
          config.headers.Authorization = `Bearer ${user.access_token}`;
        }
        config.headers["Access-Control-Allow-Origin"] = "*";
        return config;
      });
    }
  }

  public async getUser(): Promise<User | null> {
    try {
      if (!this.userManager) return null;
      const user = await this.userManager.getUser();
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  public async login(): Promise<void> {
    try {
      if (!this.userManager) return;
      await this.userManager.signinRedirect();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  public async logout(): Promise<void> {
    try {
      if (!this.userManager) return;
      await this.userManager.signoutRedirect();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  public async handleCallback(): Promise<User | null> {
    try {
      if (!this.userManager) return null;
      const user = await this.userManager.signinRedirectCallback();
      return user;
    } catch (error) {
      console.error("Error handling callback:", error);
      throw error;
    }
  }

  public async refreshToken(): Promise<User | null> {
    try {
      if (!this.userManager) return null;
      const user = await this.userManager.signinSilent();
      return user;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  }
}

export const authService = new AuthService();
