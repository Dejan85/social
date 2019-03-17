export const authenticate = () => {
  return JSON.parse(localStorage.getItem("token"));
};
