-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('female', 'male');

-- CreateEnum
CREATE TYPE "LocationFlag" AS ENUM ('AutoFit', 'Cargo', 'CorpseBay', 'DroneBay', 'FleetHangar', 'Deliveries', 'HiddenModifiers', 'Hangar', 'HangarAll', 'LoSlot0', 'LoSlot1', 'LoSlot2', 'LoSlot3', 'LoSlot4', 'LoSlot5', 'LoSlot6', 'LoSlot7', 'MedSlot0', 'MedSlot1', 'MedSlot2', 'MedSlot3', 'MedSlot4', 'MedSlot5', 'MedSlot6', 'MedSlot7', 'HiSlot0', 'HiSlot1', 'HiSlot2', 'HiSlot3', 'HiSlot4', 'HiSlot5', 'HiSlot6', 'HiSlot7', 'AssetSafety', 'Locked', 'Unlocked', 'Implant', 'QuafeBay', 'RigSlot0', 'RigSlot1', 'RigSlot2', 'RigSlot3', 'RigSlot4', 'RigSlot5', 'RigSlot6', 'RigSlot7', 'ShipHangar', 'SpecializedFuelBay', 'SpecializedOreHold', 'SpecializedGasHold', 'SpecializedMineralHold', 'SpecializedSalvageHold', 'SpecializedShipHold', 'SpecializedSmallShipHold', 'SpecializedMediumShipHold', 'SpecializedLargeShipHold', 'SpecializedIndustrialShipHold', 'SpecializedAmmoHold', 'SpecializedCommandCenterHold', 'SpecializedPlanetaryCommoditiesHold', 'SpecializedMaterialBay', 'SubSystemSlot0', 'SubSystemSlot1', 'SubSystemSlot2', 'SubSystemSlot3', 'SubSystemSlot4', 'SubSystemSlot5', 'SubSystemSlot6', 'SubSystemSlot7', 'FighterBay', 'FighterTube0', 'FighterTube1', 'FighterTube2', 'FighterTube3', 'FighterTube4', 'Module');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('public', 'private');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('AcceptedAlly', 'AcceptedSurrender', 'AgentRetiredTrigravian', 'AllAnchoringMsg', 'AllMaintenanceBillMsg', 'AllStrucInvulnerableMsg', 'AllStructVulnerableMsg', 'AllWarCorpJoinedAllianceMsg', 'AllWarDeclaredMsg', 'AllWarInvalidatedMsg', 'AllWarRetractedMsg', 'AllWarSurrenderMsg', 'AllianceCapitalChanged', 'AllianceWarDeclaredV2', 'AllyContractCancelled', 'AllyJoinedWarAggressorMsg', 'AllyJoinedWarAllyMsg', 'AllyJoinedWarDefenderMsg', 'BattlePunishFriendlyFire', 'BillOutOfMoneyMsg', 'BillPaidCorpAllMsg', 'BountyClaimMsg', 'BountyESSShared', 'BountyESSTaken', 'BountyPlacedAlliance', 'BountyPlacedChar', 'BountyPlacedCorp', 'BountyYourBountyClaimed', 'BuddyConnectContactAdd', 'CharAppAcceptMsg', 'CharAppRejectMsg', 'CharAppWithdrawMsg', 'CharLeftCorpMsg', 'CharMedalMsg', 'CharTerminationMsg', 'CloneActivationMsg', 'CloneActivationMsg2', 'CloneMovedMsg', 'CloneRevokedMsg1', 'CloneRevokedMsg2', 'CombatOperationFinished', 'ContactAdd', 'ContactEdit', 'ContainerPasswordMsg', 'ContractRegionChangedToPochven', 'CorpAllBillMsg', 'CorpAppAcceptMsg', 'CorpAppInvitedMsg', 'CorpAppNewMsg', 'CorpAppRejectCustomMsg', 'CorpAppRejectMsg', 'CorpBecameWarEligible', 'CorpDividendMsg', 'CorpFriendlyFireDisableTimerCompleted', 'CorpFriendlyFireDisableTimerStarted', 'CorpFriendlyFireEnableTimerCompleted', 'CorpFriendlyFireEnableTimerStarted', 'CorpKicked', 'CorpLiquidationMsg', 'CorpNewCEOMsg', 'CorpNewsMsg', 'CorpNoLongerWarEligible', 'CorpOfficeExpirationMsg', 'CorpStructLostMsg', 'CorpTaxChangeMsg', 'CorpVoteCEORevokedMsg', 'CorpVoteMsg', 'CorpWarDeclaredMsg', 'CorpWarDeclaredV2', 'CorpWarFightingLegalMsg', 'CorpWarInvalidatedMsg', 'CorpWarRetractedMsg', 'CorpWarSurrenderMsg', 'CustomsMsg', 'DeclareWar', 'DistrictAttacked', 'DustAppAcceptedMsg', 'ESSMainBankLink', 'EntosisCaptureStarted', 'ExpertSystemExpired', 'ExpertSystemExpiryImminent', 'FWAllianceKickMsg', 'FWAllianceWarningMsg', 'FWCharKickMsg', 'FWCharRankGainMsg', 'FWCharRankLossMsg', 'FWCharWarningMsg', 'FWCorpJoinMsg', 'FWCorpKickMsg', 'FWCorpLeaveMsg', 'FWCorpWarningMsg', 'FacWarCorpJoinRequestMsg', 'FacWarCorpJoinWithdrawMsg', 'FacWarCorpLeaveRequestMsg', 'FacWarCorpLeaveWithdrawMsg', 'FacWarLPDisqualifiedEvent', 'FacWarLPDisqualifiedKill', 'FacWarLPPayoutEvent', 'FacWarLPPayoutKill', 'GameTimeAdded', 'GameTimeReceived', 'GameTimeSent', 'GiftReceived', 'IHubDestroyedByBillFailure', 'IncursionCompletedMsg', 'IndustryOperationFinished', 'IndustryTeamAuctionLost', 'IndustryTeamAuctionWon', 'InfrastructureHubBillAboutToExpire', 'InsuranceExpirationMsg', 'InsuranceFirstShipMsg', 'InsuranceInvalidatedMsg', 'InsuranceIssuedMsg', 'InsurancePayoutMsg', 'InvasionCompletedMsg', 'InvasionSystemLogin', 'InvasionSystemStart', 'JumpCloneDeletedMsg1', 'JumpCloneDeletedMsg2', 'KillReportFinalBlow', 'KillReportVictim', 'KillRightAvailable', 'KillRightAvailableOpen', 'KillRightEarned', 'KillRightUnavailable', 'KillRightUnavailableOpen', 'KillRightUsed', 'LocateCharMsg', 'MadeWarMutual', 'MercOfferRetractedMsg', 'MercOfferedNegotiationMsg', 'MissionCanceledTriglavian', 'MissionOfferExpirationMsg', 'MissionTimeoutMsg', 'MoonminingAutomaticFracture', 'MoonminingExtractionCancelled', 'MoonminingExtractionFinished', 'MoonminingExtractionStarted', 'MoonminingLaserFired', 'MutualWarExpired', 'MutualWarInviteAccepted', 'MutualWarInviteRejected', 'MutualWarInviteSent', 'NPCStandingsGained', 'NPCStandingsLost', 'OfferToAllyRetracted', 'OfferedSurrender', 'OfferedToAlly', 'OfficeLeaseCanceledInsufficientStandings', 'OldLscMessages', 'OperationFinished', 'OrbitalAttacked', 'OrbitalReinforced', 'OwnershipTransferred', 'RaffleCreated', 'RaffleExpired', 'RaffleFinished', 'ReimbursementMsg', 'ResearchMissionAvailableMsg', 'RetractsWar', 'SeasonalChallengeCompleted', 'SovAllClaimAquiredMsg', 'SovAllClaimLostMsg', 'SovCommandNodeEventStarted', 'SovCorpBillLateMsg', 'SovCorpClaimFailMsg', 'SovDisruptorMsg', 'SovStationEnteredFreeport', 'SovStructureDestroyed', 'SovStructureReinforced', 'SovStructureSelfDestructCancel', 'SovStructureSelfDestructFinished', 'SovStructureSelfDestructRequested', 'SovereigntyIHDamageMsg', 'SovereigntySBUDamageMsg', 'SovereigntyTCUDamageMsg', 'StationAggressionMsg1', 'StationAggressionMsg2', 'StationConquerMsg', 'StationServiceDisabled', 'StationServiceEnabled', 'StationStateChangeMsg', 'StoryLineMissionAvailableMsg', 'StructureAnchoring', 'StructureCourierContractChanged', 'StructureDestroyed', 'StructureFuelAlert', 'StructureImpendingAbandonmentAssetsAtRisk', 'StructureItemsDelivered', 'StructureItemsMovedToSafety', 'StructureLostArmor', 'StructureLostShields', 'StructureOnline', 'StructureServicesOffline', 'StructureUnanchoring', 'StructureUnderAttack', 'StructureWentHighPower', 'StructureWentLowPower', 'StructuresJobsCancelled', 'StructuresJobsPaused', 'StructuresReinforcementChanged', 'TowerAlertMsg', 'TowerResourceAlertMsg', 'TransactionReversalMsg', 'TutorialMsg', 'WarAdopted', 'WarAllyInherited', 'WarAllyOfferDeclinedMsg', 'WarConcordInvalidates', 'WarDeclared', 'WarEndedHqSecurityDrop', 'WarHQRemovedFromSpace', 'WarInherited', 'WarInvalid', 'WarRetracted', 'WarRetractedByConcord', 'WarSurrenderDeclinedMsg', 'WarSurrenderOfferMsg');

-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('character', 'corporation', 'alliance', 'faction', 'other');

-- CreateEnum
CREATE TYPE "CorpRole" AS ENUM ('Account_Take_1', 'Account_Take_2', 'Account_Take_3', 'Account_Take_4', 'Account_Take_5', 'Account_Take_6', 'Account_Take_7', 'Accountant', 'Auditor', 'Communications_Officer', 'Config_Equipment', 'Config_Starbase_Equipment', 'Container_Take_1', 'Container_Take_2', 'Container_Take_3', 'Container_Take_4', 'Container_Take_5', 'Container_Take_6', 'Container_Take_7', 'Contract_Manager', 'Diplomat', 'Director', 'Factory_Manager', 'Fitting_Manager', 'Hangar_Query_1', 'Hangar_Query_2', 'Hangar_Query_3', 'Hangar_Query_4', 'Hangar_Query_5', 'Hangar_Query_6', 'Hangar_Query_7', 'Hangar_Take_1', 'Hangar_Take_2', 'Hangar_Take_3', 'Hangar_Take_4', 'Hangar_Take_5', 'Hangar_Take_6', 'Hangar_Take_7', 'Junior_Accountant', 'Personnel_Manager', 'Rent_Factory_Facility', 'Rent_Office', 'Rent_Research_Facility', 'Security_Officer', 'Starbase_Defense_Operator', 'Starbase_Fuel_Technician', 'Station_Manager', 'Trader');

-- CreateEnum
CREATE TYPE "NPCStandingType" AS ENUM ('agent', 'npc_corp', 'faction');

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
    "characterID" TEXT NOT NULL,
    "allianceID" INTEGER,
    "birthday" TIMESTAMP(3) NOT NULL,
    "bloodlineID" INTEGER NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "description" TEXT,
    "factionID" INTEGER,
    "gender" "Gender" NOT NULL,
    "name" TEXT NOT NULL,
    "raceID" INTEGER NOT NULL,
    "securityStatus" DOUBLE PRECISION,
    "title" TEXT
);

-- CreateTable
CREATE TABLE "AgentResearch" (
    "agentID" INTEGER NOT NULL,
    "pointsPerDay" DOUBLE PRECISION NOT NULL,
    "remainderPoints" DOUBLE PRECISION NOT NULL,
    "skillTypeID" INTEGER NOT NULL,
    "startedAt" TEXT NOT NULL,

    CONSTRAINT "AgentResearch_pkey" PRIMARY KEY ("agentID")
);

-- CreateTable
CREATE TABLE "Blueprint" (
    "itemID" BIGINT NOT NULL,
    "locationFlag" "LocationFlag" NOT NULL,
    "locationID" BIGINT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,

    CONSTRAINT "Blueprint_pkey" PRIMARY KEY ("itemID")
);

-- CreateTable
CREATE TABLE "CorpHistory" (
    "corporationID" INTEGER NOT NULL,
    "recordID" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "CorpHistory_pkey" PRIMARY KEY ("recordID")
);

-- CreateTable
CREATE TABLE "Fatigue" (
    "characterID" TEXT NOT NULL,
    "lastJumpDate" TIMESTAMP(3) NOT NULL,
    "lastUpdateDate" TIMESTAMP(3) NOT NULL,
    "jumpFatigueExpireDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fatigue_pkey" PRIMARY KEY ("characterID")
);

-- CreateTable
CREATE TABLE "Medal" (
    "corporationID" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "graphics" TEXT NOT NULL,
    "issuerID" INTEGER NOT NULL,
    "medalID" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Medal_pkey" PRIMARY KEY ("medalID")
);

-- CreateTable
CREATE TABLE "Notification" (
    "characterID" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "notificationID" INTEGER NOT NULL,
    "senderID" INTEGER NOT NULL,
    "senderType" "SenderType" NOT NULL,
    "text" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" "MessageType" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationID")
);

-- CreateTable
CREATE TABLE "ContactNotification" (
    "characterID" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "notificationID" INTEGER NOT NULL,
    "sendDate" TIMESTAMP(3) NOT NULL,
    "senderCharacterID" INTEGER NOT NULL,
    "standingLevel" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ContactNotification_pkey" PRIMARY KEY ("notificationID")
);

-- CreateTable
CREATE TABLE "CorpRoles" (
    "characterID" TEXT NOT NULL,
    "roles" "CorpRole"[],
    "rolesAtBase" "CorpRole"[],
    "rolesAtHQ" "CorpRole"[],
    "rolesAtOther" "CorpRole"[],

    CONSTRAINT "CorpRoles_pkey" PRIMARY KEY ("characterID")
);

-- CreateTable
CREATE TABLE "Standings" (
    "characterID" TEXT NOT NULL,
    "fromID" INTEGER NOT NULL,
    "fromType" "NPCStandingType" NOT NULL,
    "standing" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Standings_pkey" PRIMARY KEY ("fromID")
);

-- CreateTable
CREATE TABLE "Title" (
    "characterID" TEXT NOT NULL,
    "titleID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Title_pkey" PRIMARY KEY ("titleID")
);

-- CreateTable
CREATE TABLE "_CharacterToCorpHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToMedal" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToNotification" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToContactNotification" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToStandings" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CharacterToTitle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_AgentResearchToCharacter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_BlueprintToCharacter" (
    "A" BIGINT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_name_key" ON "Character"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Character_characterID_key" ON "Character"("characterID");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSheet_characterID_key" ON "CharacterSheet"("characterID");

-- CreateIndex
CREATE UNIQUE INDEX "CharacterSheet_name_key" ON "CharacterSheet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToCorpHistory_AB_unique" ON "_CharacterToCorpHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToCorpHistory_B_index" ON "_CharacterToCorpHistory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToMedal_AB_unique" ON "_CharacterToMedal"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToMedal_B_index" ON "_CharacterToMedal"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToNotification_AB_unique" ON "_CharacterToNotification"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToNotification_B_index" ON "_CharacterToNotification"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToContactNotification_AB_unique" ON "_CharacterToContactNotification"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToContactNotification_B_index" ON "_CharacterToContactNotification"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToStandings_AB_unique" ON "_CharacterToStandings"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToStandings_B_index" ON "_CharacterToStandings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToTitle_AB_unique" ON "_CharacterToTitle"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToTitle_B_index" ON "_CharacterToTitle"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AgentResearchToCharacter_AB_unique" ON "_AgentResearchToCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_AgentResearchToCharacter_B_index" ON "_AgentResearchToCharacter"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BlueprintToCharacter_AB_unique" ON "_BlueprintToCharacter"("A", "B");

-- CreateIndex
CREATE INDEX "_BlueprintToCharacter_B_index" ON "_BlueprintToCharacter"("B");

-- AddForeignKey
ALTER TABLE "CharacterSheet" ADD CONSTRAINT "CharacterSheet_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fatigue" ADD CONSTRAINT "Fatigue_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorpRoles" ADD CONSTRAINT "CorpRoles_characterID_fkey" FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToCorpHistory" ADD CONSTRAINT "_CharacterToCorpHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToCorpHistory" ADD CONSTRAINT "_CharacterToCorpHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "CorpHistory"("recordID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToMedal" ADD CONSTRAINT "_CharacterToMedal_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToMedal" ADD CONSTRAINT "_CharacterToMedal_B_fkey" FOREIGN KEY ("B") REFERENCES "Medal"("medalID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToNotification" ADD CONSTRAINT "_CharacterToNotification_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToNotification" ADD CONSTRAINT "_CharacterToNotification_B_fkey" FOREIGN KEY ("B") REFERENCES "Notification"("notificationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToContactNotification" ADD CONSTRAINT "_CharacterToContactNotification_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToContactNotification" ADD CONSTRAINT "_CharacterToContactNotification_B_fkey" FOREIGN KEY ("B") REFERENCES "ContactNotification"("notificationID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToStandings" ADD CONSTRAINT "_CharacterToStandings_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToStandings" ADD CONSTRAINT "_CharacterToStandings_B_fkey" FOREIGN KEY ("B") REFERENCES "Standings"("fromID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToTitle" ADD CONSTRAINT "_CharacterToTitle_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToTitle" ADD CONSTRAINT "_CharacterToTitle_B_fkey" FOREIGN KEY ("B") REFERENCES "Title"("titleID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgentResearchToCharacter" ADD CONSTRAINT "_AgentResearchToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "AgentResearch"("agentID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AgentResearchToCharacter" ADD CONSTRAINT "_AgentResearchToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlueprintToCharacter" ADD CONSTRAINT "_BlueprintToCharacter_A_fkey" FOREIGN KEY ("A") REFERENCES "Blueprint"("itemID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlueprintToCharacter" ADD CONSTRAINT "_BlueprintToCharacter_B_fkey" FOREIGN KEY ("B") REFERENCES "Character"("key") ON DELETE CASCADE ON UPDATE CASCADE;
