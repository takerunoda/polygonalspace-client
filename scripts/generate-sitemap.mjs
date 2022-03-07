import { writeFileSync } from 'fs';
import globby  from 'globby';
import prettier from 'prettier';


async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const siteUrl = ``
  const pages = await globby([
    'pages/*.ts',
    'pages/*.tsx',
    'pages/*.js',
    'data/**/*.mdx',
    '!data/*.mdx',
    '!pages/_*.tsx',
    '!pages/_*.ts',
    '!pages/_*.js',
    '!pages/api',
    '!pages/404.tsx',
    '!pages/404.js',
    '!pages/admin-shared.tsx',
    '!pages/change-password.tsx',
    '!pages/delete-account-google.tsx',
    '!pages/delete-account.tsx',
    '!pages/enable-google-signin.tsx',
    '!pages/enable-password-signin.tsx',
    '!pages/mybookmarks.tsx',
    '!pages/mypage.tsx',
    '!pages/confirmation.tsx',
    '!pages/resend-confirmation.tsx',
    '!pages/password-reset.tsx',
    '!pages/request-password-reset.tsx',
    '!pages/shared.tsx',
    '!pages/shared-item/[_id].tsx',
    '!pages/category-shared/[categoryValue].tsx',
    '!pages/private.js'
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
        ${pages
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('data', '')
              .replace('.tsx', '')
              .replace('.ts', '')
              .replace('.js', '')
              .replace('.mdx', '');
            const route = path === '/index' ? '' : path;

            return `
              <url>
                  <loc>${`${siteUrl}${route}`}</loc>
              </url>
            `;
          })
          .join('')}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
}

generate();
