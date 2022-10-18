-- CreateTable
CREATE TABLE "Character" (
    "key" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "characterID" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "CharacterSheet" (
    "key" INTEGER NOT NULL,
    "allianceID" INTEGER NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "bloodlineID" INTEGER NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "raceID" INTEGER NOT NULL,
    "securityStatus" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CharacterSheet_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "AgentResearch" (
    "key" INTEGER NOT NULL,
    "characterID" INTEGER NOT NULL,
    "agentID" INTEGER NOT NULL,
    "pointsPerDay" DOUBLE PRECISION NOT NULL,
    "remainderPoints" DOUBLE PRECISION NOT NULL,
    "skillTypeID" INTEGER NOT NULL,
    "startedAt" TEXT NOT NULL,

    CONSTRAINT "AgentResearch_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Blueprint" (
    "characterID" TEXT NOT NULL,
    "itemID" BIGINT NOT NULL,
    "locationFlag" TEXT NOT NULL,
    "locationID" BIGINT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "CorpHistory" (
    "characterID" TEXT NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "recordID" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Fatigue" (
    "characterID" TEXT NOT NULL,
    "lastJumpDate" TIMESTAMP(3) NOT NULL,
    "lastUpdateDate" TIMESTAMP(3) NOT NULL,
    "fatigueExpires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Graphic" (
    "key" SERIAL NOT NULL,
    "medalID" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "graphic" TEXT NOT NULL,
    "layer" INTEGER NOT NULL,
    "part" INTEGER NOT NULL,

    CONSTRAINT "Graphic_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Medal" (
    "characterID" TEXT NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "issuerID" INTEGER NOT NULL,
    "medalID" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Notification" (
    "characterID" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "notificationID" INTEGER NOT NULL,
    "senderID" INTEGER NOT NULL,
    "senderType" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ContactNotification" (
    "characterID" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "notificationID" INTEGER NOT NULL,
    "sendDate" TIMESTAMP(3) NOT NULL,
    "senderCharacterID" INTEGER NOT NULL,
    "standingLevel" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "CorpRoles" (
    "characterID" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "rolesAtBase" TEXT NOT NULL,
    "rolesAtHQ" TEXT NOT NULL,
    "rolesAtOther" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Standings" (
    "characterID" TEXT NOT NULL,
    "fromID" INTEGER NOT NULL,
    "fromType" TEXT NOT NULL,
    "standing" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Title" (
    "characterID" TEXT NOT NULL,
    "titleID" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_characterID_key" ON "Character"("characterID");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSheet_name_key" ON "CharacterSheet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Blueprint_itemID_key" ON "Blueprint"("itemID");

-- CreateIndex
CREATE UNIQUE INDEX "CorpHistory_recordID_key" ON "CorpHistory"("recordID");

-- CreateIndex
CREATE UNIQUE INDEX "Fatigue_characterID_key" ON "Fatigue"("characterID");

-- CreateIndex
CREATE UNIQUE INDEX "Medal_medalID_key" ON "Medal"("medalID");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_notificationID_key" ON "Notification"("notificationID");

-- CreateIndex
CREATE UNIQUE INDEX "ContactNotification_notificationID_key" ON "ContactNotification"("notificationID");

-- CreateIndex
CREATE UNIQUE INDEX "CorpRoles_characterID_key" ON "CorpRoles"("characterID");

-- CreateIndex
CREATE UNIQUE INDEX "Standings_fromID_key" ON "Standings"("fromID");

-- CreateIndex
CREATE UNIQUE INDEX "Title_characterID_key" ON "Title"("characterID");

-- AddForeignKey
ALTER TABLE "CharacterSheet" ADD CONSTRAINT "CharacterSheet_key_fkey" FOREIGN KEY ("key") REFERENCES "Character"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentResearch" ADD CONSTRAINT "AgentResearch_key_fkey" FOREIGN KEY ("key") REFERENCES "Character"("key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blueprint" ADD CONSTRAINT "Blueprint_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorpHistory" ADD CONSTRAINT "CorpHistory_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fatigue" ADD CONSTRAINT "Fatigue_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Graphic" ADD CONSTRAINT "Graphic_medalID_fkey" FOREIGN KEY ("medalID") REFERENCES "Medal"("medalID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medal" ADD CONSTRAINT "Medal_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactNotification" ADD CONSTRAINT "ContactNotification_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorpRoles" ADD CONSTRAINT "CorpRoles_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standings" ADD CONSTRAINT "Standings_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Title" ADD CONSTRAINT "Title_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;
