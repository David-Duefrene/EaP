import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom'

import Home from './Pages/Home/Home'
import Blueprints from './Pages/Character/Blueprints/Blueprints'
import ContactNotifications from './Pages/Character/ContactNotifications/ContactNotifications'
import CorpHistory from './Pages/Character/CorpHistory/CorpHistory'
import CorpRolesList from './Pages/Character/CorpRoles/CorpRoles'
import MedalList from './Pages/Character/Medals/MedalList'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import './index.css'

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route path='/' element={<Home />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID' element={<MedalList />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/blueprints' element={<Blueprints />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/contact-notification' element={<ContactNotifications />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/corp-history' element={<CorpHistory />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/corp-roles' element={<CorpRolesList />} errorElement={<ErrorPage />} />
		<Route path='character/:characterID/medal-list' element={<MedalList />} errorElement={<ErrorPage />} />
	</>,
))

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
