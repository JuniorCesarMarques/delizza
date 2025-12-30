const jwt = require("jsonwebtoken");

type User = {
  id: string;
  name: string;
  password: string;
  role: string;
};

export const createToken = (user: User) => {
  const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
