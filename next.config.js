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
              imgSrc: [
                "'self'",
                'data:',
                'https://raw.githubusercontent.com/nextauthjs/next-auth/main/packages/next-auth/provider-logos/google.svg',
              ],
              fontSrc: ["'self'"],
              scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
              frameSrc: [],
              connectSrc: ["'self'"],
            },
          },
          forceHTTPSRedirect: true,
          referrerPolicy: 'same-origin',
          xssProtection: 'block-rendering',
          frameGuard: [
            'allow-from',
            { uri: 'chrome-extension://bgkegjofecmhiafepokkjlgeaiclecal/dashboard.html' },
          ],
        }),
      },
    ];
  },
};

module.exports = nextConfig;
