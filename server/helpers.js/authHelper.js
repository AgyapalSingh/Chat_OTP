import bcrypt from "bcrypt";

// 1. Function to create HASHEDPASSWORD
export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// 2. Funtion to compare HASHEDPASSWORD with give password while login
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
