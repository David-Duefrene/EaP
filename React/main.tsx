import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	Route, Routes, BrowserRouter,
} from 'react-router-dom'

import Home from './Pages/Home/Home'
// import Blueprints from './Pages/Character/Blueprints/Blueprints'
// import ContactNotifications from './Pages/Character/ContactNotifications/ContactNotifications'
// import CorpHistory from './Pages/Character/CorpHistory/CorpHistory'
// import CorpRoles from './Pages/Character/CorpRoles/CorpRoles'
// import MedalList from './Pages/Character/Medals/MedalList'
// import Notifications from './Pages/Character/Notifications/Notifications'
// import Standings from './Pages/Character/Standings/Standings'
import Titles from './Pages/Character/Titles/Titles'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

import NavBar from './Components/NavBars/MainNavBar'
import Notification from './Components/Buttons/Notification/Notification'
import './index.css'

import CharacterQuery from '../Types/APIResponses/PrismaQueries/Character/CharacterSheetQueries.type'
import Title from '../Types/APIResponses/EveOfficial/Title.types'

interface FindAll {
	characters: () => Promise<CharacterQuery[]>,
	characterSheets: () => Promise<CharacterQuery[]>,
}

interface Auth {
	login: () => void,
}

interface GetCharacter {
	titles: (characterID: bigint) => Promise<Title>,
}

declare global {
	interface Window {
		findAll: FindAll
		auth: Auth
		getCharacter: GetCharacter
	}
  }

const routes =
	<Routes>
		<Route path='/' element={<Home />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID' element={<Titles />} errorElement={<ErrorPage />} />
		{/* <Route path='character/:characterID/blueprints' element={<Blueprints />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/contact-notification' element={<ContactNotifications />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/corp-history' element={<CorpHistory />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/corp-roles' element={<CorpRoles />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/medal-list' element={<MedalList />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/notifications' element={<Notifications />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/standings' element={<Standings />} errorElement={<ErrorPage />} /> */}
		<Route path='character/:characterID/Titles' element={<Titles />} errorElement={<ErrorPage />} />
	</Routes>

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
			<NavBar />
			{routes}
			<Notification />
		</BrowserRouter>
	</React.StrictMode>,
)
