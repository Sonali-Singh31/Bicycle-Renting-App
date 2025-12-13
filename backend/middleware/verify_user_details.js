import { validate } from 'deep-email-validator';
export const verifyUserDetails = async (req, res, next) => {
const { firstName, lastName, username, password, usertype } = req.body;
if ([username, password, usertype, firstName, lastName].some(f => f.includes("--"))) {
return res.status(403).send({ message: "invalid credentials" });
}
try {
const email_verification_result = await validate(username);
if (!email_verification_result.valid) {
if (email_verification_result.reason === 'smtp' && email_verification_result.validators.smtp.reason === 'Timeout') {
console.log("SMTP validation timed out, proceeding...");
} else {
return res.status(401).send({ message: "Invalid email" });
}
}
} catch (error) {
return res.status(501).send({ message: "Internal server error" });
}
next();
};