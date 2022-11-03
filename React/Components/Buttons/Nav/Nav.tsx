import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import CSS from './Nav.module.css'

const Nav = (props) => {
	const currentSection: string = useLocation().pathname.split('/')[3]
	return <Link className={`${CSS.Nav} ${currentSection === props.URL.split('/')[3] ? CSS.Active : CSS.Nav}`} to={props.URL}>{props.children}</Link>
}

export default Nav
