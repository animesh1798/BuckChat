-- CreateTable
CREATE TABLE "OnlineUser" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "OnlineUser_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "OnlineUser" ADD CONSTRAINT "OnlineUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
