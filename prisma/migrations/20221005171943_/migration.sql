/*
  Warnings:

  - You are about to drop the column `characterId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `Blueprint` table. All the data in the column will be lost.
  - You are about to drop the column `locationId` on the `Blueprint` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `Blueprint` table. All the data in the column will be lost.
  - You are about to drop the column `allianceId` on the `CharacterSheet` table. All the data in the column will be lost.
  - You are about to drop the column `bloodLineId` on the `CharacterSheet` table. All the data in the column will be lost.
  - You are about to drop the column `corporationId` on the `CharacterSheet` table. All the data in the column will be lost.
  - You are about to drop the column `raceId` on the `CharacterSheet` table. All the data in the column will be lost.
  - You are about to drop the column `agentId` on the `AgentResearch` table. All the data in the column will be lost.
  - You are about to drop the column `characterId` on the `AgentResearch` table. All the data in the column will be lost.
  - You are about to drop the column `skillTypeId` on the `AgentResearch` table. All the data in the column will be lost.
  - Added the required column `characterID` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterID` to the `Blueprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationID` to the `Blueprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeID` to the `Blueprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allianceID` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodlineID` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corporationID` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raceID` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agentID` to the `AgentResearch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterID` to the `AgentResearch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillTypeID` to the `AgentResearch` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Character" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "characterID" TEXT NOT NULL
);
INSERT INTO "new_Character" ("createdAt", "key", "name", "updatedAt") SELECT "createdAt", "key", "name", "updatedAt" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
CREATE UNIQUE INDEX "Character_characterID_key" ON "Character"("characterID");
CREATE TABLE "new_Blueprint" (
    "characterID" TEXT NOT NULL,
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
INSERT INTO "new_Blueprint" ("itemID", "locationFlag", "materialEfficiency", "quantity", "runs", "timeEfficiency") SELECT "itemID", "locationFlag", "materialEfficiency", "quantity", "runs", "timeEfficiency" FROM "Blueprint";
DROP TABLE "Blueprint";
ALTER TABLE "new_Blueprint" RENAME TO "Blueprint";
CREATE UNIQUE INDEX "Blueprint_itemID_key" ON "Blueprint"("itemID");
CREATE TABLE "new_CharacterSheet" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "allianceID" INTEGER NOT NULL,
    "birthday" DATETIME NOT NULL,
    "bloodlineID" INTEGER NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raceID" INTEGER NOT NULL,
    "securityStatus" REAL NOT NULL,
    CONSTRAINT "CharacterSheet_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CharacterSheet" ("birthday", "description", "gender", "key", "name", "securityStatus") SELECT "birthday", "description", "gender", "key", "name", "securityStatus" FROM "CharacterSheet";
DROP TABLE "CharacterSheet";
ALTER TABLE "new_CharacterSheet" RENAME TO "CharacterSheet";
CREATE UNIQUE INDEX "CharacterSheet_name_key" ON "CharacterSheet"("name");
CREATE TABLE "new_AgentResearch" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterID" INTEGER NOT NULL,
    "agentID" INTEGER NOT NULL,
    "pointsPerDay" REAL NOT NULL,
    "remainderPoints" REAL NOT NULL,
    "skillTypeID" INTEGER NOT NULL,
    "startedAt" TEXT NOT NULL,
    CONSTRAINT "AgentResearch_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AgentResearch" ("key", "pointsPerDay", "remainderPoints", "startedAt") SELECT "key", "pointsPerDay", "remainderPoints", "startedAt" FROM "AgentResearch";
DROP TABLE "AgentResearch";
ALTER TABLE "new_AgentResearch" RENAME TO "AgentResearch";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
