const { createSecureHeaders } = require('next-secure-headers');

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: createSecureHeaders({
          contentSecurityPolicy: {
            directives: {
              defaultSrc: "'self'",
              styleSrc: ["'self'", "'unsafe-inline'"],
              imgSrc: ["'self'", 'data:'],
              fontSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
              frameSrc: [],
              connectSrc: ["'self'"],
            },
          },
          forceHTTPSRedirect: true,
          referrerPolicy: 'same-origin',
          xssProtection: 'block-rendering',
        }),
      },
    ];
  },
};

module.exports = nextConfig;
