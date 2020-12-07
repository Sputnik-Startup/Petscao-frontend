export default function isAuthenticated() {
  let token = localStorage.getItem('PC_TOKEN');

  return !!token;
}
