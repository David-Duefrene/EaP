import AgentResearch from '../APICrawler/Endpoints/Character/AgentResearch/AgentResearch.type'
import Blueprint from '../APICrawler/Endpoints/Character/Blueprint/Blueprint.type'
import CharacterSheet from '../APICrawler/Endpoints/Character/CharacterSheet/CharacterSheet.type'
import ContactNotification from '../APICrawler/Endpoints/Character/ContactNotification/ContactNotification.type'
import CorpHistory from '../APICrawler/Endpoints/Character/CorpHistory/CorpHistory.type'
import CorpRoles from '../React/Pages/Character/CorpRoles/CorpRoles.type'
import Fatigue from '../APICrawler/Endpoints/Character/Fatigue/Fatigue.type'
import Medal from '../APICrawler/Endpoints/Character/Medal/Medal.type'
import Notification from '../React/Components/Buttons/Notification/Notification.type'
import Standing from '../APICrawler/Endpoints/Character/Standing/Standing.type'
import Title from '../APICrawler/Endpoints/Character/Title/Title.type'

import Bloodline from '../APICrawler/Endpoints/Universe/Bloodline.type'
import Race from '../APICrawler/Endpoints/Universe/Race.type'

export type {
	AgentResearch, Blueprint, CharacterSheet, ContactNotification, CorpHistory, CorpRoles, Fatigue, Medal, Notification,
	Standing, Title, Bloodline, Race,
}

export type FindAllCharacters = Array<CharacterSheet & Title & Bloodline & Race>

export type FindAll = {
	characters: () => Promise<findAllCharacters[]>
}

export type GetCharacter = {
	characterSheet: (number) => Promise<findAllCharacters[]>,
	blueprints: (number) => Promise<Blueprint[]>,
	contactNotifications: (number) => Promise<ContactNotification[]>,
	corpHistory: (number) => Promise<CorpHistory[]>,
	corpRoles: (number) => Promise<CorpRoles[]>,
	medals: (number) => Promise<Medal[]>,
	notifications: (number) => Promise<Notification[]>,
	standings: (number) => Promise<Standing[]>,
	titles: (number) => Promise<Title[]>,
}
