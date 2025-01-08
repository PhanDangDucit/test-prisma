/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'custom',
        loaderFile: 'components/imageloader.tsx',
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // output: "standalone"
};

export default nextConfig;