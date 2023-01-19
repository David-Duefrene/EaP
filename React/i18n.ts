import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import english from './public/locales/en/keys.json'

i18n.use(initReactI18next).init({
	lng: 'en',
	resources: {
		en: {
			keys: english,
		},
	},
	debug: true,
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
