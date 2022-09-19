-- CreateTable
CREATE TABLE "AgentResearch" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterID" TEXT NOT NULL,
    "agentID" INTEGER NOT NULL,
    "pointsPerDay" REAL NOT NULL,
    "remainderPoints" REAL NOT NULL,
    "skillTypeID" INTEGER NOT NULL,
    "startedAT" TEXT NOT NULL,
    CONSTRAINT "AgentResearch_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AgentResearch_characterID_key" ON "AgentResearch"("characterID");
