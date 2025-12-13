export const verifyAdmin = (req, res, next) => {
if (req.usertype !== "admin") {
return res.status(403).send({ message: "invalid credentials" });
}
next();
};