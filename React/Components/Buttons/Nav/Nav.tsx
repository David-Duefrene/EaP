import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import CSS from './Nav.module.css'

const Nav = (props: { URL: string, children: string }) => {
	const currentButton = props.URL === '/' ? '/' : props.URL.slice(1)
	const currentURL = useLocation().pathname

	return (
		<li className={CSS.Item}>
			<Link
				className={`Button ${CSS.Nav} ${currentButton === currentURL ? 'Active' : ''}`}
				to={props.URL} >
				{props.children}
			</Link>
		</li>
	)
}

export default Nav
