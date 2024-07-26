export function extractAlphanumeric(input: string): string {
  const alphanumericSpaceRegex = /[a-zA-Z0-9]+|\s+/g;

  const matches = input.match(alphanumericSpaceRegex);

  return matches ? matches.join('') : '';
}