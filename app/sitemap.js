export default function sitemap() {
  const urls = [];
  const lastModifiedTime = new Date();
  const addAnEntry = (url) => {
    urls.push({
      url,
      lastModified: lastModifiedTime,
    });
  };

  addAnEntry('https://your-domain');
  addAnEntry('https://your-domain/posts');

  return urls;
}
