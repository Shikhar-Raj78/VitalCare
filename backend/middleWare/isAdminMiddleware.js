const isAdmin = (req, res, next) => {
    if (req.user && req.user.status === "admin") {
      next();
    } else {
      res.status(403);
      throw new Error("Not authorized as admin");
    }
};
  
module.exports = isAdmin;
  