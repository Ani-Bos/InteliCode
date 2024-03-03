import jwt from "jsonwebtoken";
const SECRET_KEY = "NOTESAPI ";
// const filter = (req, res, next) => {
//   try {
//     let token = req.headers.authorization;
//     if (token) {
//       token = token.split(" ")[1];
//       let user = jwt.verify(token, SECRET_KEY);
//       req.userId = user.id;
//     } else {
//       res.status(401).json({ message: " Unauthorized user" });
//     }

//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ message: " Unauthorized user" });
//   }
// };
const filter = (req, res, next) => {
  const token = req.headers["auth-token"];
  console.log(token)
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using correct token" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Set the user object on req.user
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using correct token" });
  }
};

export default filter;
