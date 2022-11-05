import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import CSS from './Nav.module.css'

const Nav = (props: { URL: string, children: string }) => {
	const currentSection: string = useLocation().pathname.split('/')[3]
	return <Link
		className={`${CSS.Nav} ${currentSection === props.URL.split('/')[3] ? CSS.Active : null}`}
		to={props.URL}>
		{props.children}
	</Link>
}

export default Nav
