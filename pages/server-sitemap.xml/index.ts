import { Component } from 'react';
import { getAllPosts } from '../../utils/getAllPosts';
import { getAllBlogPosts } from '../../utils/getAllBlogPosts';

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL
const EXTERNAL_DATA_URL_POST = `${siteUrl}/memo-item`;
const EXTERNAL_DATA_URL_BLOG = `${siteUrl}/blog`;

const createSitemap = ({posts, blogs} : {posts: any, blogs: any}) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${posts
          .map(({slug}: {slug: any}) => {
            return `
                <url>
                    <loc>${`${EXTERNAL_DATA_URL_POST}/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
        ${blogs
          .map(({slug}: {slug: any}) => {
            return `
                <url>
                    <loc>${`${EXTERNAL_DATA_URL_BLOG}/${slug}`}</loc>
                </url>
            `;
          })
          .join('')}
    </urlset>
    `;

class Sitemap extends Component {
  static async getInitialProps({ res }: { res: any } ) {
    const posts = await getAllPosts();
    const blogs = await getAllBlogPosts();  

    res.setHeader('Content-Type', 'text/xml');
    res.write(createSitemap({posts, blogs}));
    res.end();
  }
}

export default Sitemap;

