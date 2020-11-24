export default function isAuthenticated() {
  let token = localStorage.getItem('CR_TOKEN');

  return !!token;
}
