import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'

import Home from './Pages/Home/Home'
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

const pages = import.meta.globEager('./Pages/!(Home|ErrorPage)/**/!(*.test).tsx')
const pagesRaw: Record<string, string> = import.meta.globEager('./Pages/!(Home|ErrorPage)/**/!(*.test).tsx', { as: 'raw' })

const newRoutes = []

const toKebabCase = (str: string) => str.replace(/[A-Z]{1,2}/g, (letter: string, offset: number) => {
	if (offset === 0) return letter.toLowerCase()
	return `-${letter.toLowerCase()}`
})

for (const [ key, value ] of Object.entries(pages)) {
	const path = key.slice(8, -4).split('/').map((item) => toKebabCase(item)).slice(0, -1).join('/')
	const paramKey = 'useParams<{ '

	if (pagesRaw[key].includes(paramKey)) {
		const tempParam = pagesRaw[key].slice(pagesRaw[key].indexOf(paramKey) + paramKey.length, pagesRaw[key].indexOf('}>')).split(':')[0]
		const param = tempParam.slice(0, -2)
		newRoutes.push(<Route path={path.replace(`${param}`, `${param}/:${tempParam}`)} element={< value.default />} errorElement={<ErrorPage />} />)
	}
}

const routes =
	<Routes>
		<Route path='/' element={<Home />} errorElement={<ErrorPage />} />
		{newRoutes}
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
