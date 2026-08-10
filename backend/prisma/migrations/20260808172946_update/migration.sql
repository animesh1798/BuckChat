/*
  Warnings:

  - Added the required column `socketId` to the `OnlineUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnlineUser" ADD COLUMN     "socketId" TEXT NOT NULL;
