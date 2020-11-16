const { API } = require("../../Backend");

export const getAllUser = (userId, token) => {
  return fetch(`${API}/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserSpecificTranc = (userId) => {
  return fetch(`${API}/getUserTrans/${userId}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};
