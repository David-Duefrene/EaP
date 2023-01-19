import CharacterAuthData from './CharacterAuthData.type'

type Module = (auth: CharacterAuthData) => Promise<never>

const endpoints: Record<string, { default: Module }> = import.meta.globEager('./**/!(*.test|*.type).ts')

const endpointObject: Record<string, Record<string, Module>> = {}

for (const [ key, value ] of Object.entries(endpoints)) {
	const directory = key.slice(2, -3).split('/').map((item) => `${item[0].toLowerCase()}${item.slice(1)}`)

	if (directory[0] in endpointObject) {
		endpointObject[directory[0]][directory[1]] = value.default
	} else {
		endpointObject[directory[0]] = {}
		endpointObject[directory[0]][directory[1]] = value.default
	}
}
export default endpointObject

