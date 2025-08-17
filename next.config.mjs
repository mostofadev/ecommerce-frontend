/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '3000',
            pathname: '/storage/**',
          },
        ],
          domains: ['smart.mostofadev.cloud'],
      },
};

  
export default nextConfig;
