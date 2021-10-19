const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //Get token
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Access denied, you must be signed in." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ msg: "Invalid token." });
  }
};
