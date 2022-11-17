import React from 'react'

import LoginWhite from './eve-sso-login-white-large.png'

const AddCharacter = () => {
	return (
		<img tabIndex={0} src={LoginWhite} alt='Add new character' onClick={() => window.auth.login()} />
	)
}

export default AddCharacter
