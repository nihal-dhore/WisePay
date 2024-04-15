-- CreateTable
CREATE TABLE "ptopTransfer" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "receiverId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,

    CONSTRAINT "ptopTransfer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ptopTransfer" ADD CONSTRAINT "ptopTransfer_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ptopTransfer" ADD CONSTRAINT "ptopTransfer_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
