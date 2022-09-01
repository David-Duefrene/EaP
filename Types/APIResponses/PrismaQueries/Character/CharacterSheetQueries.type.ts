type CharacterQuery = {
	characterID: string,
	name: string,
	allianceID: number,
	birthday: string | Date,
	bloodLineID: number,
	corporationID: number,
	description: string,
	gender: 'male' | 'female',
	raceID: number,
	securityStatus: number
}

export default CharacterQuery
