const express = require("express");
const { model, default: mongoose, Mongoose } = require("mongoose");
const { authMiddleware } = require("../Middlewares/authMiddleware");
const { Account } = require("../db/db");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        user: req.userId,
    });

    // console.log(balance);

    res.json({
        balance: account.balance,
    });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    /* const userAccount = await Account.findOne({
        user: req.userId,
    });

    const amount = Number(req.body.amount) * 100;

    if (userAccount.balance < amount) {
        return res.status(400).json({
            msg: "Insufficient balance",
        });
    }

    const reciverAccount = await Account.findOne({
        user: req.body.to,
    });

    if (!reciverAccount) {
        return res.status(400).json({
            msg: "Invalid account",
        });
    }

    await userAccount.updateOne({
        $inc: {
            balance: -amount,
        },
    });

    await reciverAccount.updateOne({
        $inc: {
            balance: amount,
        },
    });

    res.json({
        msg: "transaction successful",
    }); */

    const session = await mongoose.startSession();

    session.startTransaction();
    const amount = Number(req.body.amount) * 100;
    const to = req.body.to;

    const userAccount = await Account.findOne({
        user: req.userId,
    }).session(session);

    if (!userAccount || userAccount.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance",
        });
    }

    const reciverAccount = await Account.findOne({
        user: to,
    });

    if (!reciverAccount) {
        await session.abortSession();
        return res.status(400).json({
            msg: "Invalid Account",
        });
    }

    await Account.updateOne(
        {
            user: req.userId,
        },
        {
            $inc: {
                balance: -amount,
            },
        }
    ).session(session);

    await Account.updateOne(
        {
            user: to,
        },
        {
            $inc: {
                balance: amount,
            },
        }
    ).session(session);

    await session.commitTransaction();

    res.json({
        msg : "Transaction Successful"
    })
});

module.exports = accountRouter;
