/*
  Warnings:

  - Added the required column `message` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Message_authorId_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayName" TEXT NOT NULL,
    "chatColor" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "message" TEXT NOT NULL
);
INSERT INTO "new_User" ("chatColor", "createdAt", "displayName", "id", "name", "profileImageUrl") SELECT "chatColor", "createdAt", "displayName", "id", "name", "profileImageUrl" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
