const userDB = {
  users: require("../models/users.json"),
  setUser: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();
// const path = require('path')
// const fsPromise = require('fs/promises')

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies.jwt;
  if (!cookies?.jwt) return res.sendStatus(401);
  console.log(cookies.jwt);
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        "userInfo": {
          "username": decoded.username,
          "roles": roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({accessToken});
  });
};

module.exports = handleRefreshToken
