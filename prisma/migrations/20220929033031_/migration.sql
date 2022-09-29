/*
  Warnings:

  - You are about to alter the column `characterID` on the `Character` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `characterID` on the `AgentResearch` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

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
CREATE TABLE "new_AgentResearch" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterID" INTEGER NOT NULL,
    "agentID" INTEGER NOT NULL,
    "pointsPerDay" REAL NOT NULL,
    "remainderPoints" REAL NOT NULL,
    "skillTypeID" INTEGER NOT NULL,
    "startedAT" TEXT NOT NULL,
    CONSTRAINT "AgentResearch_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AgentResearch" ("agentID", "characterID", "key", "pointsPerDay", "remainderPoints", "skillTypeID", "startedAT") SELECT "agentID", "characterID", "key", "pointsPerDay", "remainderPoints", "skillTypeID", "startedAT" FROM "AgentResearch";
DROP TABLE "AgentResearch";
ALTER TABLE "new_AgentResearch" RENAME TO "AgentResearch";
CREATE UNIQUE INDEX "AgentResearch_characterID_key" ON "AgentResearch"("characterID");
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
    CONSTRAINT "Blueprint_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character" ("characterID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blueprint" ("characterID", "itemID", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID") SELECT "characterID", "itemID", "locationFlag", "locationID", "materialEfficiency", "quantity", "runs", "timeEfficiency", "typeID" FROM "Blueprint";
DROP TABLE "Blueprint";
ALTER TABLE "new_Blueprint" RENAME TO "Blueprint";
CREATE UNIQUE INDEX "Blueprint_characterID_key" ON "Blueprint"("characterID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
