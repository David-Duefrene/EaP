import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'

import Home from './Pages/Home/Home'
import Character from './Pages/Character/Character'
import Blueprints from './Pages/Character/Blueprints/Blueprints'
import ContactNotifications from './Pages/Character/ContactNotifications/ContactNotifications'
import CorpHistory from './Pages/Character/CorpHistory/CorpHistory'
import CorpRoles from './Pages/Character/CorpRoles/CorpRoles'
import MedalList from './Pages/Character/Medals/MedalList'
import Notifications from './Pages/Character/Notifications/Notifications'
import Standings from './Pages/Character/Standings/Standings'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

import NavBar from './Components/NavBars/MainNavBar'
import Notification from './Components/Buttons/Notification/Notification'
import './index.css'

import type CharacterQuery from '../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'
import type Title from '../Types/APIResponses/EveOfficial/Title.types'
import type Blueprint from '../Types/APIResponses/EveOfficial/Blueprints.types'
import type ContactNotification from '../Types/APIResponses/EveOfficial/ContactNotifications.types'
import type TypeCorpHistory from '../Types/APIResponses/EveOfficial/CorpHistory.types'
import type CorpRole from '../Types/APIResponses/EveOfficial/CorpRoles.types'
import type Medal from '../Types/APIResponses/EveOfficial/Medals.types'
import type TypeNotification from '../Types/APIResponses/EveOfficial/Notifications.types'
import type Standing from '../Types/APIResponses/EveOfficial/Standings.types'
import type Log from '../Electron/MessagingSystem/Message.types'

interface FindAll {
	characters: () => Promise<CharacterQuery[]>,
	characterSheets: () => Promise<CharacterQuery[]>,
}

interface Auth {
	login: () => void,
}

interface GetCharacter {
	characterSheet: (characterID: bigint) => Promise<CharacterQuery>,
	titles: (characterID: bigint) => Promise<Title[]>,
	blueprints: (characterID: bigint) => Promise<Blueprint[]>,
	contactNotifications: (characterID: bigint) => Promise<ContactNotification[]>,
	corpHistory: (characterID: bigint) => Promise<TypeCorpHistory[]>,
	corpRoles: (characterID: bigint) => Promise<CorpRole>,
	medals: (characterID: bigint) => Promise<Medal[]>,
	notifications: (characterID: bigint) => Promise<TypeNotification[]>,
	standings: (characterID: bigint) => Promise<Standing[]>,
}

declare global {
	interface Window {
		findAll: FindAll
		auth: Auth
		getCharacter: GetCharacter
		listen: {
			notification: (setMessages: (event: Event, data: Log) => void) => void
		}
	}
  }

const routes =
	<Routes>
		<Route path='/' element={<Home />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID' element={<Character />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/blueprints' element={<Blueprints />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/contact-notification' element={<ContactNotifications />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/corp-history' element={<CorpHistory />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/corp-roles' element={<CorpRoles />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/medal-list' element={<MedalList />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/notifications' element={<Notifications />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/standings' element={<Standings />} errorElement={<ErrorPage />} />
	</Routes>

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HashRouter>
			<NavBar />
			{routes}
			<Notification />
		</HashRouter>
	</React.StrictMode>,
)
