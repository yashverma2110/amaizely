export function extractYoutubeId(url: string) {
  // Regular expression pattern to match Youtube video IDs
  const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?(?:live\/)?(?:embed\/)?(?:feature=player_embedded&v=)?([^#&?]*)/;

  // Execute the regular expression on the URL
  const match = url.match(pattern);

  // If a match is found, return the video ID, otherwise return null
  return match ? match[1] : null;
}

export function isValidYouTubeUrl(url: string) {
  const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

  return youtubeUrlRegex.test(url);
}

export function isValidWebsiteURL(url: string): boolean {
  // Regular expression for URL validation
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i' // case-insensitive
  );

  return urlPattern.test(url);
}