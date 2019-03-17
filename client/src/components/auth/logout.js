import { getData } from "../common/fetchData";

export const logout = next => {
  const route = `${process.env.REACT_APP_API_URL}/logout`;

  localStorage.removeItem("token");
  next();
  return getData(route)
    .then(res => {
      console.log("signout", res);
      //   return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};
