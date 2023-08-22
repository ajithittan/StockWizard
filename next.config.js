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
        destination: 'http://127.0.0.1:5100/newsfeed/:path*' // Proxy to Backend
      },
      {
        source: '/personalize/:path*',
        destination: 'http://127.0.0.1:5550/personalize/:path*' // Proxy to Backend
      },
      {
        source: '/stream/:path*',
        destination: 'http://127.0.0.1:5551/stream/:path*' // Proxy to Backend
      },
      {
        source: '/realtime/:path*',
        destination: 'http://127.0.0.1:5551/realtime/:path*' // Proxy to Backend
      },
      {
        source: '/auth/google',
        destination: 'http://127.0.0.1:5100/auth/google' // Proxy to Backend
      },
      {
        source: '/auth/google/callback',
        destination: 'http://127.0.0.1:5100/auth/google/callback' // Proxy to Backend
      }
    ]
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
}
