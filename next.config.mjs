/** @type {import('next').NextConfig} */
const nextConfig = {
 output: 'export',
    // Define the getStaticPaths function for dynamic routes
    async exportPathMap() {
        // Add any paths you need to generate here
        const paths = {
            '/': { page: '/' }, // Example root path
            // Add other routes as needed
        };
        return paths;
    },
};

export default nextConfig;
