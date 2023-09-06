/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'hfcfedrvdknutqafjvud.supabase.co'
            }
        ]
    }
}

module.exports = nextConfig
