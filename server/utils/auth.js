const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Middleware function for authentication
  authMiddleware: async function (context) {
    const { req } = context;

    // Extract token from authorization header
    let token;
    if (req.headers.authorization) {
      const tokenString = req.headers.authorization.split(' ');
      if (tokenString[0] === 'Bearer') {
        token = tokenString[1];
      }
    }

    // Check if token exists
    if (!token) {
      throw new AuthenticationError('You have no token!');
    }

    // Verify token and attach user data to context
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      context.user = data;
    } catch (error) {
      console.log('Invalid token');
      throw new AuthenticationError('Invalid token!');
    }
  },
  // Function to generate JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
