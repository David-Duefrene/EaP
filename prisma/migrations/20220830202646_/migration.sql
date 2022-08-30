/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `CharacterSheet` will be added. If there are existing duplicate values, this will fail.
  - Made the column `characterID` on table `Character` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "characterID" INTEGER NOT NULL
);
INSERT INTO "new_Character" ("characterID", "createdAt", "key", "name", "updatedAt") SELECT "characterID", "createdAt", "key", "name", "updatedAt" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
CREATE UNIQUE INDEX "Character_characterID_key" ON "Character"("characterID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSheet_name_key" ON "CharacterSheet"("name");
