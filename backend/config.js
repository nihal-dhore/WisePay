const zod = require("zod");

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstName: zod.string(),
    lastName: zod.string(),
});

const updationBody = zod.object({
    updationPassword: zod.string().min(6).optional(),
    updationFirstName: zod.string().optional(),
    updationLastName: zod.string().optional(),
});

module.exports = {
    JWT_SECRET: "secret",
    signupBody,
    updationBody
};
