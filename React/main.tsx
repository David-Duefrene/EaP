import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom'

import Home from './Pages/Home/Home'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import './index.css'

const router = createBrowserRouter(createRoutesFromElements(
	<Route path='/' element={<Home />} errorElement={<ErrorPage />} />,
))

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
