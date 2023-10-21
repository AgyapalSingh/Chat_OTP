export const authenticateUser = (req, res, next) => {
  console.log("Session", req.session);
  console.log("Session Id", req.sessionId);
  console.log("Email Stored in Session and use in verify", req.session.email);
  console.log("Otp Stored in Session and use in verify", req.session.otp);

  if (req.session && req.session.email && req.session.otp) {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
