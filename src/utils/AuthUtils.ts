export function setAuthToken(token: string) {
  localStorage.setItem("sid", token);
}

export function getAuthToken() {
  return localStorage.getItem("sid");
}