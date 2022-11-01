// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require('electron')

import React from 'react'

/**
 * A component that allows the user to log a character in and add it to the database
 * @requires react
 * @returns {JSX.Element}
 */
const AddCharacter = () => {
	return <button type='button' onClick={() => ipcRenderer.send('Login')}>Login</button>
}

export default AddCharacter
