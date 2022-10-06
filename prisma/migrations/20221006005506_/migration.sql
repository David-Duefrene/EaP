-- CreateTable
CREATE TABLE "CorpHistory" (
    "characterID" TEXT NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "recordID" INTEGER NOT NULL,
    "startDate" DATETIME NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "CorpHistory_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character" ("characterID") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CorpHistory_recordID_key" ON "CorpHistory"("recordID");
