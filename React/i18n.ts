import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const endpoints = import.meta.globEager('./public/locales/**/*.json')
const endpointObject: Record<string, Record<string, () => Promise<never>>> = {}

for (const [ key, value ] of Object.entries(endpoints)) {
	const directory = key.slice(2, -5).split('/').map((item) => `${item[0].toLowerCase()}${item.slice(1)}`)

	if (directory[2] in endpointObject) {
		endpointObject[directory[2]][directory[3]] = value.default
	} else {
		endpointObject[directory[2]] = {}
		endpointObject[directory[2]][directory[3]] = value.default
	}
}

i18n.use(initReactI18next).init({
	lng: 'en',
	resources: endpointObject,
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
