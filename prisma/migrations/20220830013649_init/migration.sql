-- CreateTable
CREATE TABLE "Character" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CharacterSheet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "allianceID" INTEGER NOT NULL,
    "birthday" DATETIME NOT NULL,
    "bloodLineID" INTEGER NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raceID" INTEGER NOT NULL,
    "securityStatus" REAL NOT NULL,
    CONSTRAINT "CharacterSheet_id_fkey" FOREIGN KEY ("id") REFERENCES "Character" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
