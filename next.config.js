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
    ]
  }
}
