import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, Routes, HashRouter } from 'react-router-dom'

import Home from './Pages/Home/Home'
import ErrorPage from './Pages/ErrorPage/ErrorPage'

import NavBar from './Components/NavBars/MainNavBar'
import Notification from './Components/Buttons/Notification/Notification'
import './index.css'

import type Log from '../Electron/MessagingSystem/Message.types'
import { FindAll, GetCharacter } from '../Electron/preload.d'

declare global {
	interface Window {
		findAll: FindAll
		auth: { login: () => void }
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
