SET search_path TO public;

CREATE TYPE gender AS ENUM ('female', 'male');

CREATE TYPE location_flag AS ENUM (
	'AutoFit', 'Cargo', 'CorpseBay', 'DroneBay', 'FleetHangar', 'Deliveries', 'HiddenModifiers', 'Hangar', 'HangarAll', 'LoSlot0', 'LoSlot1',
	'LoSlot2', 'LoSlot3', 'LoSlot4', 'LoSlot5', 'LoSlot6', 'LoSlot7', 'MedSlot0', 'MedSlot1', 'MedSlot2', 'MedSlot3', 'MedSlot4', 'MedSlot5',
	'MedSlot6', 'MedSlot7', 'HiSlot0', 'HiSlot1', 'HiSlot2', 'HiSlot3', 'HiSlot4', 'HiSlot5', 'HiSlot6', 'HiSlot7', 'AssetSafety', 'Locked',
	'Unlocked', 'Implant', 'QuafeBay', 'RigSlot0', 'RigSlot1', 'RigSlot2', 'RigSlot3', 'RigSlot4', 'RigSlot5', 'RigSlot6', 'RigSlot7', 'ShipHangar',
	'SpecializedFuelBay', 'SpecializedOreHold', 'SpecializedGasHold', 'SpecializedMineralHold', 'SpecializedSalvageHold', 'SpecializedShipHold',
	'SpecializedSmallShipHold', 'SpecializedMediumShipHold', 'SpecializedLargeShipHold', 'SpecializedIndustrialShipHold', 'SpecializedAmmoHold',
	'SpecializedCommandCenterHold', 'SpecializedPlanetaryCommoditiesHold', 'SpecializedMaterialBay', 'SubSystemSlot0', 'SubSystemSlot1',
	'SubSystemSlot2', 'SubSystemSlot3', 'SubSystemSlot4', 'SubSystemSlot5',  'SubSystemSlot6', 'SubSystemSlot7', 'FighterBay', 'FighterTube0',
	'FighterTube1', 'FighterTube2', 'FighterTube3', 'FighterTube4', 'Module'
);

CREATE TYPE privacy_status AS ENUM ('public', 'private');

CREATE TYPE message_type AS ENUM (
	'AcceptedAlly', 'AcceptedSurrender', 'AgentRetiredTrigravian', 'AllAnchoringMsg', 'AllMaintenanceBillMsg', 'AllStrucInvulnerableMsg', 
	'AllStructVulnerableMsg', 'AllWarCorpJoinedAllianceMsg', 'AllWarDeclaredMsg', 'AllWarInvalidatedMsg', 'AllWarRetractedMsg',
	'AllWarSurrenderMsg', 'AllianceCapitalChanged', 'AllianceWarDeclaredV2', 'AllyContractCancelled', 'AllyJoinedWarAggressorMsg',
	'AllyJoinedWarAllyMsg', 'AllyJoinedWarDefenderMsg', 'BattlePunishFriendlyFire', 'BillOutOfMoneyMsg', 'BillPaidCorpAllMsg', 'BountyClaimMsg',
	'BountyESSShared', 'BountyESSTaken', 'BountyPlacedAlliance', 'BountyPlacedChar', 'BountyPlacedCorp', 'BountyYourBountyClaimed',
	'BuddyConnectContactAdd', 'CharAppAcceptMsg', 'CharAppRejectMsg', 'CharAppWithdrawMsg', 'CharLeftCorpMsg', 'CharMedalMsg', 'CharTerminationMsg',
	'CloneActivationMsg', 'CloneActivationMsg2', 'CloneMovedMsg', 'CloneRevokedMsg1', 'CloneRevokedMsg2', 'CombatOperationFinished', 'ContactAdd',
	'ContactEdit', 'ContainerPasswordMsg', 'ContractRegionChangedToPochven', 'CorpAllBillMsg', 'CorpAppAcceptMsg', 'CorpAppInvitedMsg',
	'CorpAppNewMsg', 'CorpAppRejectCustomMsg', 'CorpAppRejectMsg', 'CorpBecameWarEligible', 'CorpDividendMsg',
	'CorpFriendlyFireDisableTimerCompleted', 'CorpFriendlyFireDisableTimerStarted', 'CorpFriendlyFireEnableTimerCompleted',
	'CorpFriendlyFireEnableTimerStarted', 'CorpKicked', 'CorpLiquidationMsg', 'CorpNewCEOMsg', 'CorpNewsMsg', 'CorpNoLongerWarEligible',
	'CorpOfficeExpirationMsg', 'CorpStructLostMsg', 'CorpTaxChangeMsg', 'CorpVoteCEORevokedMsg', 'CorpVoteMsg', 'CorpWarDeclaredMsg',
	'CorpWarDeclaredV2', 'CorpWarFightingLegalMsg', 'CorpWarInvalidatedMsg', 'CorpWarRetractedMsg', 'CorpWarSurrenderMsg', 'CustomsMsg',
	'DeclareWar', 'DistrictAttacked', 'DustAppAcceptedMsg', 'ESSMainBankLink', 'EntosisCaptureStarted', 'ExpertSystemExpired',
	'ExpertSystemExpiryImminent', 'FWAllianceKickMsg', 'FWAllianceWarningMsg', 'FWCharKickMsg', 'FWCharRankGainMsg', 'FWCharRankLossMsg',
	'FWCharWarningMsg', 'FWCorpJoinMsg', 'FWCorpKickMsg', 'FWCorpLeaveMsg', 'FWCorpWarningMsg', 'FacWarCorpJoinRequestMsg',
	'FacWarCorpJoinWithdrawMsg', 'FacWarCorpLeaveRequestMsg', 'FacWarCorpLeaveWithdrawMsg', 'FacWarLPDisqualifiedEvent', 'FacWarLPDisqualifiedKill',
	'FacWarLPPayoutEvent', 'FacWarLPPayoutKill', 'GameTimeAdded', 'GameTimeReceived', 'GameTimeSent', 'GiftReceived', 'IHubDestroyedByBillFailure',
	'IncursionCompletedMsg', 'IndustryOperationFinished', 'IndustryTeamAuctionLost', 'IndustryTeamAuctionWon', 'InfrastructureHubBillAboutToExpire',
	'InsuranceExpirationMsg', 'InsuranceFirstShipMsg', 'InsuranceInvalidatedMsg', 'InsuranceIssuedMsg', 'InsurancePayoutMsg',
	'InvasionCompletedMsg', 'InvasionSystemLogin', 'InvasionSystemStart', 'JumpCloneDeletedMsg1', 'JumpCloneDeletedMsg2', 'KillReportFinalBlow',
	'KillReportVictim', 'KillRightAvailable', 'KillRightAvailableOpen', 'KillRightEarned', 'KillRightUnavailable', 'KillRightUnavailableOpen',
	'KillRightUsed', 'LocateCharMsg', 'MadeWarMutual', 'MercOfferRetractedMsg', 'MercOfferedNegotiationMsg', 'MissionCanceledTriglavian',
	'MissionOfferExpirationMsg', 'MissionTimeoutMsg', 'MoonminingAutomaticFracture', 'MoonminingExtractionCancelled',
	'MoonminingExtractionFinished', 'MoonminingExtractionStarted', 'MoonminingLaserFired', 'MutualWarExpired', 'MutualWarInviteAccepted',
	'MutualWarInviteRejected', 'MutualWarInviteSent', 'NPCStandingsGained', 'NPCStandingsLost', 'OfferToAllyRetracted', 'OfferedSurrender',
	'OfferedToAlly', 'OfficeLeaseCanceledInsufficientStandings', 'OldLscMessages', 'OperationFinished', 'OrbitalAttacked', 'OrbitalReinforced',
	'OwnershipTransferred', 'RaffleCreated', 'RaffleExpired', 'RaffleFinished', 'ReimbursementMsg', 'ResearchMissionAvailableMsg', 'RetractsWar',
	'SeasonalChallengeCompleted', 'SovAllClaimAquiredMsg', 'SovAllClaimLostMsg', 'SovCommandNodeEventStarted', 'SovCorpBillLateMsg',
	'SovCorpClaimFailMsg', 'SovDisruptorMsg', 'SovStationEnteredFreeport', 'SovStructureDestroyed', 'SovStructureReinforced',
	'SovStructureSelfDestructCancel', 'SovStructureSelfDestructFinished', 'SovStructureSelfDestructRequested', 'SovereigntyIHDamageMsg', 
	'SovereigntySBUDamageMsg', 'SovereigntyTCUDamageMsg', 'StationAggressionMsg1', 'StationAggressionMsg2', 'StationConquerMsg',
	'StationServiceDisabled', 'StationServiceEnabled', 'StationStateChangeMsg', 'StoryLineMissionAvailableMsg', 'StructureAnchoring',
	'StructureCourierContractChanged', 'StructureDestroyed', 'StructureFuelAlert', 'StructureImpendingAbandonmentAssetsAtRisk',
	'StructureItemsDelivered', 'StructureItemsMovedToSafety', 'StructureLostArmor', 'StructureLostShields', 'StructureOnline',
	'StructureServicesOffline', 'StructureUnanchoring', 'StructureUnderAttack', 'StructureWentHighPower', 'StructureWentLowPower',
	'StructuresJobsCancelled', 'StructuresJobsPaused', 'StructuresReinforcementChanged', 'TowerAlertMsg', 'TowerResourceAlertMsg',
	'TransactionReversalMsg', 'TutorialMsg', 'WarAdopted', 'WarAllyInherited', 'WarAllyOfferDeclinedMsg', 'WarConcordInvalidates', 'WarDeclared',
	'WarEndedHqSecurityDrop', 'WarHQRemovedFromSpace', 'WarInherited', 'WarInvalid', 'WarRetracted', 'WarRetractedByConcord',
	'WarSurrenderDeclinedMsg', 'WarSurrenderOfferMsg'
);

CREATE TYPE sender_type AS ENUM ('character', 'corporation', 'alliance', 'faction', 'other');

CREATE TYPE corp_role_type AS ENUM (
	'Account_Take_1', 'Account_Take_2', 'Account_Take_3', 'Account_Take_4', 'Account_Take_5', 'Account_Take_6', 'Account_Take_7', 'Accountant',
	'Auditor', 'Communications_Officer', 'Config_Equipment', 'Config_Starbase_Equipment', 'Container_Take_1', 'Container_Take_2',
	'Container_Take_3', 'Container_Take_4', 'Container_Take_5', 'Container_Take_6', 'Container_Take_7', 'Contract_Manager', 'Diplomat', 'Director',
	'Factory_Manager', 'Fitting_Manager', 'Hangar_Query_1', 'Hangar_Query_2', 'Hangar_Query_3', 'Hangar_Query_4', 'Hangar_Query_5',
	'Hangar_Query_6', 'Hangar_Query_7', 'Hangar_Take_1', 'Hangar_Take_2', 'Hangar_Take_3', 'Hangar_Take_4', 'Hangar_Take_5', 'Hangar_Take_6',
	'Hangar_Take_7', 'Junior_Accountant', 'Personnel_Manager', 'Rent_Factory_Facility', 'Rent_Office', 'Rent_Research_Facility', 'Security_Officer',
	'Starbase_Defense_Operator', 'Starbase_Fuel_Technician', 'Station_Manager', 'Trader', 'None'
);

CREATE TYPE npc_standing_type AS ENUM ('agent', 'npc_corp', 'faction');
