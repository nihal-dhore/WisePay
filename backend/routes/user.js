const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, signupBody, updationBody } = require("../config");
const { User, Account } = require("../db/db");
const { authMiddleware } = require("../Middlewares/authMiddleware");
const userRouter = express.Router();

userRouter.get("/isloggedin", authMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(403).json({
      msg: "User is not Signed in",
    });
  }

  const userDetails = await User.findById(userId);
  const accountDetails = await Account.findOne({
    user: userId,
  });

  res.json({
    user: {
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      username: userDetails.username,
    },
    account : {
        balance : accountDetails.balance
    }
  });
});

userRouter.post("/signup", async (req, res) => {
  const user = req.body;
  console.log(user);
  const userResponse = signupBody.safeParse(user);
  /* console.log(userResponse.error); */
  if (!userResponse.success) {
    res.status(411).json({
      msg: "Enter valid inputs",
    });
    return;
  }

  const isUserAlreadyExists = await User.findOne({
    username: user.username,
  });

  if (isUserAlreadyExists) {
    res.status(403).json({
      msg: "User already exists",
    });

    return;
  }

  const newUser = await User({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  let hashedPassword = await newUser.createHash(user.password);
  newUser.password_hash = hashedPassword;

  await newUser.save();

  const userId = newUser._id;

  await Account.create({
    user: userId,
    balance: (Math.random() * (10000 - 1 + 1) + 1).toFixed(2) * 100,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({
    token: token,
    msg: "User created Successfully",
  });
});

userRouter.post("/signin", async (req, res) => {
  const username = req.body.username;

  const user = await User.findOne({
    username: username,
  });

  if (user === null) {
    res.status(411).json({
      msg: "Create a profile",
    });
    return;
  }

  if (await user.validatePassword(req.body.password)) {
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.status(200).json({
      token,
      msg: "User logged in successfully",
      firstname: user.firstName,
    });
    return;
  }

  res.status(411).json({
    msg: "Error while logging in",
  });
});

userRouter.put("/", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });

  const inputValidation = updationBody.safeParse(req.body);
  if (!inputValidation) {
    return res.status(411).json({
      msg: "Password is to short",
    });
  }

  /* const isNewPasswordSameAsPrevious = await user.validatePassword(
        req.body.password
    );
    if (isNewPasswordSameAsPrevious) {
        return res.status(411).json({
            msg: "Password is same as previous use different one",
        });
    } */

  const newPasswordHash = await user.createHash(req.body.password);

  await User.updateOne(
    {
      _id: req.userId,
    },
    {
      password_hash: newPasswordHash,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
    }
  );

  res.json({
    msg: "Updated succesfully",
  });
});
userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find().or([
    {
      firstName: {
        $regex: filter,
      },
    },
    {
      lastName: {
        $regex: filter,
      },
    },
  ]);

  res.json({
    user: users.map((user) => ({
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});
module.exports = userRouter;
