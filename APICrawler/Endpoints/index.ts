import CharacterAuthData from './CharacterAuthData.type'

const endpoints: Record<string, (auth: CharacterAuthData) => Promise<any>> = import.meta.glob('./**/!(*.test|.type).ts')

const endpointObject: Record<string, typeof endpoints> = {}

for (const [ key, value ] of Object.entries(endpoints)) {
	const directory = key.slice(2, -3).split('/').map((item) => `${item[0].toLowerCase()}${item.slice(1)}`)

	if (directory[0] in endpointObject) {
		endpointObject[directory[0]][directory[1]] = value
	} else {
		endpointObject[directory[0]] = {}
		endpointObject[directory[0]][directory[1]] = value
	}
}
export default endpointObject

