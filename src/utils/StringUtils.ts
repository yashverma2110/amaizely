export function isStringValid(input: string): boolean {
  return input !== undefined && input !== null && input.trim() !== '';
}

export function isEmailValid(input: string): boolean {
  return isStringValid(input) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

export function extractAlphanumeric(input: string): string {
  const alphanumericSpaceRegex = /[a-zA-Z0-9]+|\s+/g;

  const matches = input.match(alphanumericSpaceRegex);

  return matches ? matches.join('') : '';
}

export function removeHtmlTags(html: string) {
  // Regular expression to match HTML tags
  const htmlTagRegex = /<[^>]*>/g;

  // Replace all occurrences of HTML tags with an empty string
  return html.replace(htmlTagRegex, '');
}