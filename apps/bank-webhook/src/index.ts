import express from "express";
import db from "@wise/db/client";
import { OnRampStatus } from "@prisma/client/edge";

const app = express();

app.use(express.json());

app.post("/hdfcWebHook", async (req, res) => {
  //console.log(req.body);
  
  const paymentInfo: {
    token: string,
    userId: string,
    amount: string
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount
  }
  const transactionStatus = await db.onRampTransaction.findUnique({
    where: {
      token: paymentInfo.token
    },
    select: {
      status: true
    }
  })
  //console.log(paymentInfo);

  if (transactionStatus?.status === "Success") {
    return res.status(400).json({
      error : "Transaction has already successfully processed"
    })
  } else if (transactionStatus?.status === "Failure") {
    return res.status(400).json({
      error : "Transaction has already Failed"
    })
  }

  try {
    const dbRes = await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: paymentInfo.userId
        },
        data: {
          amount: {
            increment: (Number(paymentInfo.amount) * 100)
          }
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInfo.token
        },
        data: {
          status: "Success"
        }
      })
    ]);
    console.log(dbRes[0]);
    
    return res.json({
      message: "done"
    })
  } catch (e) {
    console.log(e);

    return res.json({
      message: "Error while processing webhook"
    })
  }
});

app.listen(3003, () => {
  console.log(`Listening on PORT 3003`);
});