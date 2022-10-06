/*
  Warnings:

  - You are about to drop the column `agentID` on the `AgentResearch` table. All the data in the column will be lost.
  - You are about to drop the column `characterID` on the `AgentResearch` table. All the data in the column will be lost.
  - You are about to drop the column `skillTypeID` on the `AgentResearch` table. All the data in the column will be lost.
  - You are about to drop the column `startedAT` on the `AgentResearch` table. All the data in the column will be lost.
  - You are about to drop the column `characterID` on the `Blueprint` table. All the data in the column will be lost.
  - You are about to drop the column `locationID` on the `Blueprint` table. All the data in the column will be lost.
  - You are about to drop the column `typeID` on the `Blueprint` table. All the data in the column will be lost.
  - You are about to drop the column `characterID` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `allianceID` on the `CharacterSheet` table. All the data in the column will be lost.
  - You are about to drop the column `bloodLineID` on the `CharacterSheet` table. All the data in the column will be lost.
  - You are about to drop the column `corporationID` on the `CharacterSheet` table. All the data in the column will be lost.
  - You are about to drop the column `raceID` on the `CharacterSheet` table. All the data in the column will be lost.
  - Added the required column `agentId` to the `AgentResearch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `AgentResearch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skillTypeId` to the `AgentResearch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `AgentResearch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `Blueprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationId` to the `Blueprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Blueprint` table without a default value. This is not possible if the table is not empty.
  - Added the required column `characterId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allianceId` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bloodLineId` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `corporationId` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raceId` to the `CharacterSheet` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AgentResearch" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterId" INTEGER NOT NULL,
    "agentId" INTEGER NOT NULL,
    "pointsPerDay" REAL NOT NULL,
    "remainderPoints" REAL NOT NULL,
    "skillTypeId" INTEGER NOT NULL,
    "startedAt" TEXT NOT NULL,
    CONSTRAINT "AgentResearch_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AgentResearch" ("key", "pointsPerDay", "remainderPoints") SELECT "key", "pointsPerDay", "remainderPoints" FROM "AgentResearch";
DROP TABLE "AgentResearch";
ALTER TABLE "new_AgentResearch" RENAME TO "AgentResearch";
CREATE TABLE "new_Blueprint" (
    "characterId" TEXT NOT NULL,
    "itemID" BIGINT NOT NULL,
    "locationFlag" TEXT NOT NULL,
    "locationId" BIGINT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    CONSTRAINT "Blueprint_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "Character" ("characterId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Blueprint" ("itemID", "locationFlag", "materialEfficiency", "quantity", "runs", "timeEfficiency") SELECT "itemID", "locationFlag", "materialEfficiency", "quantity", "runs", "timeEfficiency" FROM "Blueprint";
DROP TABLE "Blueprint";
ALTER TABLE "new_Blueprint" RENAME TO "Blueprint";
CREATE UNIQUE INDEX "Blueprint_itemID_key" ON "Blueprint"("itemID");
CREATE TABLE "new_Character" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "characterId" TEXT NOT NULL
);
INSERT INTO "new_Character" ("createdAt", "key", "name", "updatedAt") SELECT "createdAt", "key", "name", "updatedAt" FROM "Character";
DROP TABLE "Character";
ALTER TABLE "new_Character" RENAME TO "Character";
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");
CREATE UNIQUE INDEX "Character_characterId_key" ON "Character"("characterId");
CREATE TABLE "new_CharacterSheet" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "allianceId" INTEGER NOT NULL,
    "birthday" DATETIME NOT NULL,
    "bloodLineId" INTEGER NOT NULL,
    "corporationId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raceId" INTEGER NOT NULL,
    "securityStatus" REAL NOT NULL,
    CONSTRAINT "CharacterSheet_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CharacterSheet" ("birthday", "description", "gender", "key", "name", "securityStatus") SELECT "birthday", "description", "gender", "key", "name", "securityStatus" FROM "CharacterSheet";
DROP TABLE "CharacterSheet";
ALTER TABLE "new_CharacterSheet" RENAME TO "CharacterSheet";
CREATE UNIQUE INDEX "CharacterSheet_name_key" ON "CharacterSheet"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
