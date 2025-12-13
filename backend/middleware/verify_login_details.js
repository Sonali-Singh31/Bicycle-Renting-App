export const verifyLoginDetails = (req, res, next) => {
const { username, password, usertype } = req.body;
if (String(username).includes("--") || password.includes("--") || usertype.includes("--")) {
return res.status(403).send({ message: "invalid credentials" });
}
next();
};
