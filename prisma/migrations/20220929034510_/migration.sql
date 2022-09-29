/*
  Warnings:

  - Added the required column `key` to the `Blueprint` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "AgentResearch_characterID_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blueprint" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterID" INTEGER NOT NULL,
    "itemID" BIGINT NOT NULL,
    "locationFlag" TEXT NOT NULL,
    "locationID" BIGINT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,
    CONSTRAINT "Blueprint_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character" ("characterID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blueprint" ("characterID", "itemID", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID") SELECT "characterID", "itemID", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID" FROM "Blueprint";
DROP TABLE "Blueprint";
ALTER TABLE "new_Blueprint" RENAME TO "Blueprint";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
