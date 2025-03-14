/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://amaizely.com',
  generateRobotsTxt: true,
  exclude: ['*'], // Exclude all pages by default
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/'
      }
    ]
  },
  additionalPaths: async (config, path) => {
    const paths = [
      {
        loc: '/', // Landing page
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        loc: '/purchase',
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        loc: '/deck/create/pdf',
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        loc: '/deck/create/website',
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        loc: '/blog/flashcard-maker',
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString()
      }
    ];

    return paths;
  }
}