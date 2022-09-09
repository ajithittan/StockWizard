module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5100/api/:path*' // Proxy to Backend
      },
      {
        source: '/newsfeed/:path*',
        destination: 'http://localhost:5100/newsfeed/:path*' // Proxy to Backend
      },
      {
        source: '/auth/google',
        destination: 'http://localhost:5100/auth/google' // Proxy to Backend
      },
      {
        source: '/auth/google/callback',
        destination: 'http://localhost:5100/auth/google/callback' // Proxy to Backend
      }
    ]
  },
}
