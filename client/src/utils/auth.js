import { gql } from '@apollo/client';
import { client } from '../apolloClient'; 

class AuthService {
  async getProfile() {
    try {
      const { data } = await client.query({
        query: gql`
          query Me {
            me {
              _id
              username
              email
            }
          }
        `
      });
      return data.me;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
