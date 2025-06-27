// Xano API Configuration
const XANO_BASE_URL = process.env.REACT_APP_XANO_BASE_URL || 'https://your-instance.xano.io/api:version';

// API endpoints
export const XANO_ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup',
    LOGIN: '/auth/login',
    ME: '/user/me'
  },
  WALLET: {
    BALANCE: '/wallet/balance',
    DEDUCT: '/wallet/deduct'
  }
};

// HTTP client with token management
class XanoClient {
  constructor() {
    this.baseURL = XANO_BASE_URL;
    this.token = localStorage.getItem('xano_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('xano_token', token);
  }

  removeToken() {
    this.token = null;
    localStorage.removeItem('xano_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers
      },
      ...options
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Xano API Error:', error);
      throw error;
    }
  }

  // Auth methods
  async signup(email, password) {
    const data = await this.request(XANO_ENDPOINTS.AUTH.SIGNUP, {
      method: 'POST',
      body: { email, password }
    });
    
    if (data.authToken) {
      this.setToken(data.authToken);
    }
    
    return data;
  }

  async login(email, password) {
    const data = await this.request(XANO_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: { email, password }
    });
    
    if (data.authToken) {
      this.setToken(data.authToken);
    }
    
    return data;
  }

  async getCurrentUser() {
    return await this.request(XANO_ENDPOINTS.AUTH.ME);
  }

  async logout() {
    this.removeToken();
  }

  // Wallet methods
  async getBalance() {
    return await this.request(XANO_ENDPOINTS.WALLET.BALANCE);
  }

  async deductTokens(model, tokensUsed) {
    return await this.request(XANO_ENDPOINTS.WALLET.DEDUCT, {
      method: 'POST',
      body: { model, tokens_used: tokensUsed }
    });
  }
}

export const xanoClient = new XanoClient();
export default xanoClient;