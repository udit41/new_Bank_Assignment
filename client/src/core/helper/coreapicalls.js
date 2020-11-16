const { API } = require("../../Backend");

export const withdraw = (amount, userId, token) => {
  return fetch(`${API}/withdraw/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(amount),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deposit = (amount, userId, token) => {
  return fetch(`${API}/deposit/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(amount),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserBalance = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMytransaction = (userId, token) => {
  return fetch(`${API}/getAllTrans/${userId}`, {
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

export const formatDate = (string) => {
  var options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};
