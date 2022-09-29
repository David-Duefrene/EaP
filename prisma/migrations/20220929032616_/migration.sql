/*
  Warnings:

  - The primary key for the `Blueprint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `Blueprint` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blueprint" (
    "characterID" INTEGER NOT NULL,
    "itemID" BIGINT NOT NULL,
    "locationFlag" TEXT NOT NULL,
    "locationID" BIGINT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,
    CONSTRAINT "Blueprint_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blueprint" ("characterID", "itemID", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID") SELECT "characterID", "itemID", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID" FROM "Blueprint";
DROP TABLE "Blueprint";
ALTER TABLE "new_Blueprint" RENAME TO "Blueprint";
CREATE UNIQUE INDEX "Blueprint_characterID_key" ON "Blueprint"("characterID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
