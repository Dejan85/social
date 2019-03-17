import { authenticate } from "../common/authenitcation";

// user registration
export const postData = (data, route) => {
  return fetch(route, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// user login
export const getData = route => {
  return fetch(route, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// get user information
export const getUserInfo = route => {
  return fetch(route, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${authenticate().token}`
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      if (data.error) {
        console.log("error");
      } else {
        return data;
      }
    });
};

// get all users
export const getUsers = route => {
  return fetch(route, {
    method: "GET"
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// update user
export const update = (route, token, user) => {
  console.log(user);

  return fetch(route, {
    method: "PUT",
    headers: {
      Accept: "aplication/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
    .then(res => {
      return res.json();
    })
    .catch(err => {
      console.log(err);
    });
};

// delete user account
export const deleteUser = (route, token) => {
  return fetch(route, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      return res.json();
    })
    .catch(err => console.log(err));
};
