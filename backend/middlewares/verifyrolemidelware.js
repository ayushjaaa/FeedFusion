
export const verifyrolemiddleware = (allowedRoles) => {
    return (req, res, next) => {
        console.log(req.body)
      if (!allowedRoles.includes(req.body.role)) {
        return res.status(403).json({ message: "Access denied: Role not allowed" });
      }
      next();
    };
  };
  