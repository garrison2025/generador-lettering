/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true, // 移除：在新版 Next.js 中通常不再需要显式设置
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'], // 保留：让 Next.js 优先使用现代格式
    deviceSizes: [640, 750, 828, 1080, 1200, 1920], // 保留：定义生成哪些尺寸的图片
    imageSizes: [16, 32, 48, 64, 96, 128, 256], // 保留：用于 sizes 属性计算
    minimumCacheTTL: 60, // 保留：CDN 缓存时间
    remotePatterns: [
      // **修改这里：** 将 '**' 替换为明确允许加载图片的域名
      // 例如，如果你只从 picsum.photos 加载图片：
      // {
      //   protocol: 'https',
      //   hostname: 'picsum.photos',
      // },
      // 如果你需要允许所有子域名，比如 *.example.com:
      // {
      //   protocol: 'https',
      //   hostname: '*.example.com',
      // },
      // **重要：** 如果你没有使用任何外部图片，可以将 remotePatterns 设为空数组 []
      // 或者只保留你确认需要加载图片的域名。为了安全起见，暂时注释掉允许所有域名的规则：
       {
         protocol: 'https',
         hostname: '**', // 警告：允许所有 HTTPS 域名，请根据实际需要替换为具体域名列表
       },
    ],
    // unoptimized: true, // **移除或改为 false：** 这是必须修改的地方！删除此行以启用优化。
                         // 如果需要显式写，应该是 unoptimized: false
  },
  experimental: {
    // optimizeCss: false, // 移除：让 Next.js 使用默认的 CSS 优化 (通常为 true)
    scrollRestoration: true, // 保留
    optimisticClientCache: true, // 保留
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'], // 保留：生产环境移除部分 console
    } : false,
  },
  output: 'standalone', // 保留：适用于 Docker 等环境部署
  poweredByHeader: false, // 保留：移除 X-Powered-By: Next.js 头部
  compress: true, // 保留：启用 Gzip/Brotli 压缩（Cloudflare 通常也会处理）
  // headers 配置通常是有效的，可以保留，用于设置安全和缓存相关的 HTTP 头部
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
    {
      source: '/fonts/(.*)', // 如果你使用 next/font 自托管字体，这个路径可能需要调整或移除
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/(.*)', // 如果你的图片在 public/images 目录下
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, stale-while-revalidate=31536000',
        },
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
    {
      source: '/_next/image/(.*)', // next/image 优化后的图片路径
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        }
      ],
    },
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, max-age=0',
        }
      ],
    },
  ],
}

export default nextConfig
