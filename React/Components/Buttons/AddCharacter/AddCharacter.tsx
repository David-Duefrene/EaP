// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require('electron')

import React from 'react'
import LoginWhite from './eve-sso-login-white-large.png'

/**
 * A component that allows the user to log a character in and add it to the database
 * @requires react
 * @returns {JSX.Element}
 */
const AddCharacter = () => {
	return <img src={LoginWhite} alt='Add new character' onClick={() => ipcRenderer.send('Login')} />
}

export default AddCharacter
