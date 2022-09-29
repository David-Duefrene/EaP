/*
  Warnings:

  - You are about to alter the column `characterID` on the `Blueprint` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blueprint" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterID" INTEGER NOT NULL,
    "itemID" TEXT NOT NULL,
    "locationFlag" TEXT NOT NULL,
    "locationID" TEXT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,
    CONSTRAINT "Blueprint_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blueprint" ("characterID", "itemID", "key", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID") SELECT "characterID", "itemID", "key", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID" FROM "Blueprint";
DROP TABLE "Blueprint";
ALTER TABLE "new_Blueprint" RENAME TO "Blueprint";
CREATE UNIQUE INDEX "Blueprint_characterID_key" ON "Blueprint"("characterID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
