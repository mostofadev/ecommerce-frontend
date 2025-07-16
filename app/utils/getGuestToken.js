export function getGuestToken() {
  let token = localStorage.getItem("guest_token");

  if (!token) {
    token = crypto.randomUUID(); // Modern browser API
    localStorage.setItem("guest_token", token);
  }

  return token;
}

export const getUserFromLocal = () => {
    const user = localStorage.getItem("user_data");
    return user ? JSON.parse(user) : null;
  };

export  const getTokenFromLocal = () => localStorage.getItem("user_token");
