-- CreateTable
CREATE TABLE "Blueprint" (
    "key" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "characterID" TEXT NOT NULL,
    "itemID" TEXT NOT NULL,
    "locationFlag" TEXT NOT NULL,
    "locationID" TEXT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,
    CONSTRAINT "Blueprint_key_fkey" FOREIGN KEY ("key") REFERENCES "Character" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Blueprint_characterID_key" ON "Blueprint"("characterID");
