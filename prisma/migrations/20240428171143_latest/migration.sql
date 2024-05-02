/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `authorId` on table `Message` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `displayName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastMessageId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("authorId", "content", "createdAt", "id") SELECT "authorId", "content", "createdAt", "id" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE UNIQUE INDEX "Message_authorId_key" ON "Message"("authorId");
CREATE TABLE "new_Token" (
    "clientId" TEXT NOT NULL PRIMARY KEY,
    "clientSecret" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "obtainmentTimestamp" BIGINT DEFAULT 0,
    "expiresIn" BIGINT DEFAULT 0
);
INSERT INTO "new_Token" ("accessToken", "clientId", "clientSecret", "expiresIn", "obtainmentTimestamp", "refreshToken") SELECT "accessToken", "clientId", "clientSecret", "expiresIn", "obtainmentTimestamp", "refreshToken" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayName" TEXT NOT NULL,
    "chatColor" TEXT,
    "profileImageUrl" TEXT,
    "lastMessageId" INTEGER NOT NULL
);
INSERT INTO "new_User" ("chatColor", "id", "name", "profileImageUrl") SELECT "chatColor", "id", "name", "profileImageUrl" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE UNIQUE INDEX "User_lastMessageId_key" ON "User"("lastMessageId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
