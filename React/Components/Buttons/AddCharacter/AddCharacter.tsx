// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require('electron')

import React from 'react'

import LoginWhite from './eve-sso-login-white-large.png'
import CSS from './AddCharacter.module.css'

/**
 * A component that allows the user to log a character in and add it to the database
 * @requires react
 * @returns {JSX.Element}
 */
const AddCharacter = () => {
	return <img tabIndex={0} className={CSS.Login} src={LoginWhite} alt='Add new character' onClick={() => ipcRenderer.send('Login')} />
}

export default AddCharacter
