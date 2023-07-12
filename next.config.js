/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['swagger-ui-react',
    'react-syntax-highlighter',
    'swagger-client'],
}

module.exports = nextConfig