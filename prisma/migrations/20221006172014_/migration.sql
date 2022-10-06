-- CreateTable
CREATE TABLE "Fatigue" (
    "characterID" TEXT NOT NULL,
    "lastJumpDate" DATETIME NOT NULL,
    "lastUpdateDate" DATETIME NOT NULL,
    "fatigueExpires" DATETIME NOT NULL,
    CONSTRAINT "Fatigue_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character" ("characterID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Fatigue_characterID_key" ON "Fatigue"("characterID");
