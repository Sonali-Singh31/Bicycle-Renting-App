import bcrypt from 'bcrypt';

const generateHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compareHash = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export { generateHash, compareHash };
