/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for @react-three/fiber and drei to work with Next.js
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
};

module.exports = nextConfig;
