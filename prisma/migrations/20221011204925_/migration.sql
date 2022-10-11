-- CreateTable
CREATE TABLE "Medal" (
    "characterID" TEXT NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "description" TEXT NOT NULL,
    "issuerID" INTEGER NOT NULL,
    "medalID" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Medal_medalID_key" ON "Medal"("medalID");
