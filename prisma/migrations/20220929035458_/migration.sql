-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blueprint" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterID" TEXT NOT NULL,
    "itemID" BIGINT NOT NULL,
    "locationFlag" TEXT NOT NULL,
    "locationID" BIGINT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,
    CONSTRAINT "Blueprint_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blueprint" ("characterID", "itemID", "key", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID") SELECT "characterID", "itemID", "key", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID" FROM "Blueprint";
DROP TABLE "Blueprint";
ALTER TABLE "new_Blueprint" RENAME TO "Blueprint";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
