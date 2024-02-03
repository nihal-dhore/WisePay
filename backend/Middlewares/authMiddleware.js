const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const data = " 4";
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // const isTokenValid = jwt.verify(authHeader, JWT_SECRET);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            msg: "Unauthorized Request",
        });
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        if (decodedToken.userId) {
            req.userId = decodedToken.userId;
            next();
        } else {
            return res.status(403).json({});
        }
    } catch (e) {
        return res.status(403).json({
            msg : "Unauthorised access"
        });
        
    }   
}

module.exports = {
    authMiddleware,
};
