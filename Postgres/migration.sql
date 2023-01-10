SET search_path TO public;
-- Enums
CREATE TYPE owner_type AS ENUM ('character', 'corporation');
CREATE TYPE gender AS ENUM ('female', 'male');
CREATE TYPE location_flag AS ENUM ('AutoFit', 'Cargo', 'CorpseBay', 'DroneBay', 'FleetHangar', 'Deliveries', 'HiddenModifiers', 'Hangar', 'HangarAll', 'LoSlot0', 'LoSlot1', 'LoSlot2', 'LoSlot3', 'LoSlot4', 'LoSlot5', 'LoSlot6', 'LoSlot7', 'MedSlot0', 'MedSlot1', 'MedSlot2', 'MedSlot3', 'MedSlot4', 'MedSlot5', 'MedSlot6', 'MedSlot7', 'HiSlot0', 'HiSlot1', 'HiSlot2', 'HiSlot3', 'HiSlot4', 'HiSlot5', 'HiSlot6', 'HiSlot7', 'AssetSafety', 'Locked', 'Unlocked', 'Implant', 'QuafeBay', 'RigSlot0', 'RigSlot1', 'RigSlot2', 'RigSlot3', 'RigSlot4', 'RigSlot5', 'RigSlot6', 'RigSlot7', 'ShipHangar', 'SpecializedFuelBay', 'SpecializedOreHold', 'SpecializedGasHold', 'SpecializedMineralHold', 'SpecializedSalvageHold', 'SpecializedShipHold', 'SpecializedSmallShipHold', 'SpecializedMediumShipHold', 'SpecializedLargeShipHold', 'SpecializedIndustrialShipHold', 'SpecializedAmmoHold', 'SpecializedCommandCenterHold', 'SpecializedPlanetaryCommoditiesHold', 'SpecializedMaterialBay', 'SubSystemSlot0', 'SubSystemSlot1', 'SubSystemSlot2', 'SubSystemSlot3', 'SubSystemSlot4', 'SubSystemSlot5', 'SubSystemSlot6', 'SubSystemSlot7', 'FighterBay', 'FighterTube0', 'FighterTube1', 'FighterTube2', 'FighterTube3', 'FighterTube4', 'Module');
CREATE TYPE privacy_status AS ENUM ('public', 'private');
CREATE TYPE message_type AS ENUM ('AcceptedAlly', 'AcceptedSurrender', 'AgentRetiredTrigravian', 'AllAnchoringMsg', 'AllMaintenanceBillMsg', 'AllStrucInvulnerableMsg', 'AllStructVulnerableMsg', 'AllWarCorpJoinedAllianceMsg', 'AllWarDeclaredMsg', 'AllWarInvalidatedMsg', 'AllWarRetractedMsg', 'AllWarSurrenderMsg', 'AllianceCapitalChanged', 'AllianceWarDeclaredV2', 'AllyContractCancelled', 'AllyJoinedWarAggressorMsg', 'AllyJoinedWarAllyMsg', 'AllyJoinedWarDefenderMsg', 'BattlePunishFriendlyFire', 'BillOutOfMoneyMsg', 'BillPaidCorpAllMsg', 'BountyClaimMsg', 'BountyESSShared', 'BountyESSTaken', 'BountyPlacedAlliance', 'BountyPlacedChar', 'BountyPlacedCorp', 'BountyYourBountyClaimed', 'BuddyConnectContactAdd', 'CharAppAcceptMsg', 'CharAppRejectMsg', 'CharAppWithdrawMsg', 'CharLeftCorpMsg', 'CharMedalMsg', 'CharTerminationMsg', 'CloneActivationMsg', 'CloneActivationMsg2', 'CloneMovedMsg', 'CloneRevokedMsg1', 'CloneRevokedMsg2', 'CombatOperationFinished', 'ContactAdd', 'ContactEdit', 'ContainerPasswordMsg', 'ContractRegionChangedToPochven', 'CorpAllBillMsg', 'CorpAppAcceptMsg', 'CorpAppInvitedMsg', 'CorpAppNewMsg', 'CorpAppRejectCustomMsg', 'CorpAppRejectMsg', 'CorpBecameWarEligible', 'CorpDividendMsg', 'CorpFriendlyFireDisableTimerCompleted', 'CorpFriendlyFireDisableTimerStarted', 'CorpFriendlyFireEnableTimerCompleted', 'CorpFriendlyFireEnableTimerStarted', 'CorpKicked', 'CorpLiquidationMsg', 'CorpNewCEOMsg', 'CorpNewsMsg', 'CorpNoLongerWarEligible', 'CorpOfficeExpirationMsg', 'CorpStructLostMsg', 'CorpTaxChangeMsg', 'CorpVoteCEORevokedMsg', 'CorpVoteMsg', 'CorpWarDeclaredMsg', 'CorpWarDeclaredV2', 'CorpWarFightingLegalMsg', 'CorpWarInvalidatedMsg', 'CorpWarRetractedMsg', 'CorpWarSurrenderMsg', 'CustomsMsg', 'DeclareWar', 'DistrictAttacked', 'DustAppAcceptedMsg', 'ESSMainBankLink', 'EntosisCaptureStarted', 'ExpertSystemExpired', 'ExpertSystemExpiryImminent', 'FWAllianceKickMsg', 'FWAllianceWarningMsg', 'FWCharKickMsg', 'FWCharRankGainMsg', 'FWCharRankLossMsg', 'FWCharWarningMsg', 'FWCorpJoinMsg', 'FWCorpKickMsg', 'FWCorpLeaveMsg', 'FWCorpWarningMsg', 'FacWarCorpJoinRequestMsg', 'FacWarCorpJoinWithdrawMsg', 'FacWarCorpLeaveRequestMsg', 'FacWarCorpLeaveWithdrawMsg', 'FacWarLPDisqualifiedEvent', 'FacWarLPDisqualifiedKill', 'FacWarLPPayoutEvent', 'FacWarLPPayoutKill', 'GameTimeAdded', 'GameTimeReceived', 'GameTimeSent', 'GiftReceived', 'IHubDestroyedByBillFailure', 'IncursionCompletedMsg', 'IndustryOperationFinished', 'IndustryTeamAuctionLost', 'IndustryTeamAuctionWon', 'InfrastructureHubBillAboutToExpire', 'InsuranceExpirationMsg', 'InsuranceFirstShipMsg', 'InsuranceInvalidatedMsg', 'InsuranceIssuedMsg', 'InsurancePayoutMsg', 'InvasionCompletedMsg', 'InvasionSystemLogin', 'InvasionSystemStart', 'JumpCloneDeletedMsg1', 'JumpCloneDeletedMsg2', 'KillReportFinalBlow', 'KillReportVictim', 'KillRightAvailable', 'KillRightAvailableOpen', 'KillRightEarned', 'KillRightUnavailable', 'KillRightUnavailableOpen', 'KillRightUsed', 'LocateCharMsg', 'MadeWarMutual', 'MercOfferRetractedMsg', 'MercOfferedNegotiationMsg', 'MissionCanceledTriglavian', 'MissionOfferExpirationMsg', 'MissionTimeoutMsg', 'MoonminingAutomaticFracture', 'MoonminingExtractionCancelled', 'MoonminingExtractionFinished', 'MoonminingExtractionStarted', 'MoonminingLaserFired', 'MutualWarExpired', 'MutualWarInviteAccepted', 'MutualWarInviteRejected', 'MutualWarInviteSent', 'NPCStandingsGained', 'NPCStandingsLost', 'OfferToAllyRetracted', 'OfferedSurrender', 'OfferedToAlly', 'OfficeLeaseCanceledInsufficientStandings', 'OldLscMessages', 'OperationFinished', 'OrbitalAttacked', 'OrbitalReinforced', 'OwnershipTransferred', 'RaffleCreated', 'RaffleExpired', 'RaffleFinished', 'ReimbursementMsg', 'ResearchMissionAvailableMsg', 'RetractsWar', 'SeasonalChallengeCompleted', 'SovAllClaimAquiredMsg', 'SovAllClaimLostMsg', 'SovCommandNodeEventStarted', 'SovCorpBillLateMsg', 'SovCorpClaimFailMsg', 'SovDisruptorMsg', 'SovStationEnteredFreeport', 'SovStructureDestroyed', 'SovStructureReinforced', 'SovStructureSelfDestructCancel', 'SovStructureSelfDestructFinished', 'SovStructureSelfDestructRequested', 'SovereigntyIHDamageMsg', 'SovereigntySBUDamageMsg', 'SovereigntyTCUDamageMsg', 'StationAggressionMsg1', 'StationAggressionMsg2', 'StationConquerMsg', 'StationServiceDisabled', 'StationServiceEnabled', 'StationStateChangeMsg', 'StoryLineMissionAvailableMsg', 'StructureAnchoring', 'StructureCourierContractChanged', 'StructureDestroyed', 'StructureFuelAlert', 'StructureImpendingAbandonmentAssetsAtRisk', 'StructureItemsDelivered', 'StructureItemsMovedToSafety', 'StructureLostArmor', 'StructureLostShields', 'StructureOnline', 'StructureServicesOffline', 'StructureUnanchoring', 'StructureUnderAttack', 'StructureWentHighPower', 'StructureWentLowPower', 'StructuresJobsCancelled', 'StructuresJobsPaused', 'StructuresReinforcementChanged', 'TowerAlertMsg', 'TowerResourceAlertMsg', 'TransactionReversalMsg', 'TutorialMsg', 'WarAdopted', 'WarAllyInherited', 'WarAllyOfferDeclinedMsg', 'WarConcordInvalidates', 'WarDeclared', 'WarEndedHqSecurityDrop', 'WarHQRemovedFromSpace', 'WarInherited', 'WarInvalid', 'WarRetracted', 'WarRetractedByConcord', 'WarSurrenderDeclinedMsg', 'WarSurrenderOfferMsg');
CREATE TYPE sender_type AS ENUM ('character', 'corporation', 'alliance', 'faction', 'other');
CREATE TYPE corp_role_type AS ENUM ('Account_Take_1', 'Account_Take_2', 'Account_Take_3', 'Account_Take_4', 'Account_Take_5', 'Account_Take_6', 'Account_Take_7', 'Accountant', 'Auditor', 'Communications_Officer', 'Config_Equipment', 'Config_Starbase_Equipment', 'Container_Take_1', 'Container_Take_2', 'Container_Take_3', 'Container_Take_4', 'Container_Take_5', 'Container_Take_6', 'Container_Take_7', 'Contract_Manager', 'Diplomat', 'Director', 'Factory_Manager', 'Fitting_Manager', 'Hangar_Query_1', 'Hangar_Query_2', 'Hangar_Query_3', 'Hangar_Query_4', 'Hangar_Query_5', 'Hangar_Query_6', 'Hangar_Query_7', 'Hangar_Take_1', 'Hangar_Take_2', 'Hangar_Take_3', 'Hangar_Take_4', 'Hangar_Take_5', 'Hangar_Take_6', 'Hangar_Take_7', 'Junior_Accountant', 'Personnel_Manager', 'Rent_Factory_Facility', 'Rent_Office', 'Rent_Research_Facility', 'Security_Officer', 'Starbase_Defense_Operator', 'Starbase_Fuel_Technician', 'Station_Manager', 'Trader', 'None');
CREATE TYPE npc_standing_type AS ENUM ('agent', 'npc_corp', 'faction');

-- CreateTable
CREATE TABLE "Character" (
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "characterID" BIGINT UNIQUE,
	PRIMARY KEY ("name", "characterID")
);

-- CreateTable
CREATE TABLE "CharacterSheet" (
    "characterID" BIGINT PRIMARY KEY,
    "allianceID" INTEGER,
    "birthday" TIMESTAMP(3) NOT NULL,
    "bloodlineID" INTEGER NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "description" TEXT,
    "factionID" INTEGER,
    "gender" gender NOT NULL,
    "name" TEXT UNIQUE NOT NULL,
    "raceID" INTEGER NOT NULL,
    "securityStatus" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "title" TEXT,

	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_bloodline_id FOREIGN KEY ("bloodlineID") REFERENCES "chrBloodlines"("bloodlineID") ON DELETE RESTRICT ON UPDATE CASCADE,
	CONSTRAINT fk_race_id FOREIGN KEY ("raceID") REFERENCES "chrRaces"("raceID") ON DELETE RESTRICT ON UPDATE CASCADE
);


-- CreateTable
CREATE TABLE "AgentResearch" (
	"characterID" BIGINT,
    "agentID" INTEGER NOT NULL,
    "pointsPerDay" DOUBLE PRECISION NOT NULL,
    "remainderPoints" DOUBLE PRECISION NOT NULL,
    "skillTypeID" INTEGER NOT NULL,
    "startedAt" TEXT NOT NULL,

	PRIMARY KEY ("characterID", "agentID"),
	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Blueprint" (
    "itemID" BIGINT NOT NULL UNIQUE,
    "characterID" BIGINT NOT NULL,
    "locationFlag" location_flag NOT NULL,
    "locationID" BIGINT NOT NULL,
    "materialEfficiency" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "timeEfficiency" INTEGER NOT NULL,
    "typeID" INTEGER NOT NULL,

    PRIMARY KEY ("itemID", "characterID"),
	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CorpHistory" (
    "characterID" BIGINT NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "recordID" INTEGER PRIMARY KEY,
    "startDate" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Fatigue" (
    "characterID" BIGINT PRIMARY KEY ,
    "lastJumpDate" TIMESTAMP(3) NOT NULL,
    "lastUpdateDate" TIMESTAMP(3) NOT NULL,
    "jumpFatigueExpireDate" TIMESTAMP(3) NOT NULL,

	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Medal" (
    "characterID" BIGINT NOT NULL,
    "corporationID" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "graphics" TEXT NOT NULL,
    "issuerID" INTEGER NOT NULL,
    "medalID" INTEGER NOT NULL,
    "reason" TEXT NOT NULL,
    "status" privacy_status NOT NULL,
    "title" TEXT NOT NULL,

	PRIMARY KEY ("characterID", "medalID"),
	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Notification" (
    "characterID" BIGINT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "notificationID" INTEGER NOT NULL,
    "senderID" INTEGER NOT NULL,
    "senderType" sender_type NOT NULL,
    "text" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" message_type NOT NULL,

	PRIMARY KEY ("characterID", "notificationID"),
	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ContactNotification" (
    "characterID" BIGINT NOT NULL,
    "message" TEXT NOT NULL,
    "notificationID" INTEGER,
    "sendDate" TIMESTAMP(3) NOT NULL,
    "senderCharacterID" INTEGER NOT NULL,
    "standingLevel" DOUBLE PRECISION NOT NULL,

	PRIMARY KEY ("characterID", "notificationID"),
	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CorpRoles" (
    "characterID" BIGINT PRIMARY KEY,
    "roles" corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],
    "rolesAtBase" corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],
    "rolesAtHQ" corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],
    "rolesAtOther" corp_role_type[] DEFAULT ARRAY['None']::corp_role_type[],

	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Standings" (
    "characterID" BIGINT NOT NULL,
    "fromID" INTEGER NOT NULL,
    "fromType" npc_standing_type NOT NULL,
    "standing" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("characterID", "fromID"),
	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Title" (
    "characterID" BIGINT NOT NULL REFERENCES "Character"("characterID"),
    "titleID" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

	PRIMARY KEY ("characterID", "titleID"),
	CONSTRAINT fk_char_id FOREIGN KEY ("characterID") REFERENCES "Character"("characterID") ON DELETE CASCADE ON UPDATE CASCADE
);
