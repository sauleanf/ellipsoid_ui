import ApiClient from './api';

class AuthApi extends ApiClient {
  static retrieveHeaders() {
    const token = localStorage.getItem('@token');
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  }

  static isAuthenticated() {
    const token = localStorage.getItem('@token');
    return !!(token);
  }

  static setToken(data) {
    const { token } = data;
    localStorage.setItem('@token', token);
  }

  static removeToken() {
    localStorage.removeItem('@token');
  }

  static retrieveToken() {
    localStorage.getItem('@token');
  }
}

export default AuthApi;
