import jwt from "jsonwebtoken";
const SECRET_KEY = "NOTESAPI ";
const filter = (req, res, next) => {
   const token = req.header("auth-token");
   if (!token) {
     res.status(401).send({ status: "Token not found" });
   }
   try {
     const data = jwt.verify(token, SECRET_KEY);
     req.user = data;
     next();
   } catch (error) {
     res.status(401).send({ status: "Authenticate using correct token" });
   }
};
export default filter;
