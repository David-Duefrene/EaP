import AgentResearch from '../APICrawler/Endpoints/Character/AgentResearch/AgentResearch.type'
import Blueprint from '../APICrawler/Endpoints/Character/Blueprint/Blueprint.type'
import CharacterSheet from '../APICrawler/Endpoints/Character/CharacterSheet/CharacterSheet.type'
import ContactNotification from '../APICrawler/Endpoints/Character/ContactNotification/ContactNotification.type'
import CorpHistory from '../APICrawler/Endpoints/Character/CorpHistory/CorpHistory.type'
import CorpRoles from '../APICrawler/Endpoints/Character/CorpRoles/CorpRoles.type'
import Fatigue from '../APICrawler/Endpoints/Character/Fatigue/Fatigue.type'
import Medal from '../APICrawler/Endpoints/Character/Medal/Medal.type'
import Notification from '../APICrawler/Endpoints/Character/Notification/Notification.type'
import Standing from '../APICrawler/Endpoints/Character/Standing/Standing.type'
import Title from '../APICrawler/Endpoints/Character/Title/Title.type'

import Bloodline from '../APICrawler/Endpoints/Universe/Bloodline.type'
import Race from '../APICrawler/Endpoints/Universe/Race.type'

export type {
	AgentResearch, Blueprint, CharacterSheet, ContactNotification, CorpHistory, CorpRoles, Fatigue, Medal, Notification,
	Standing, Title, Bloodline, Race,
}
type charID = { characterID: string, bloodlineName: string, raceName: string, titleName: string }
export type FindAllCharacters = CharacterSheet & Title & Bloodline & Race & charID

export type FindAll = {
	characters: () => Promise<findAllCharacters[]>
}

export type GetCharacter = {
	characterSheet: (number) => Promise<findAllCharacters>,
	blueprints: (number) => Promise<Blueprint[]>,
	contactNotifications: (number) => Promise<ContactNotification[]>,
	corpHistory: (number) => Promise<CorpHistory[]>,
	corpRoles: (number) => Promise<CorpRoles[]>,
	medals: (number) => Promise<Medal[]>,
	notifications: (number) => Promise<Notification[]>,
	standings: (number) => Promise<Standing[]>,
	titles: (number) => Promise<Title[]>,
}
