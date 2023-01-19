import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import keys from './public/locales/en/keys.json'
import enums from './public/locales/en/enums.json'
import navigation from './public/locales/en/navigation.json'

i18n.use(initReactI18next).init({
	lng: 'en',
	resources: {
		en: { keys, enums, navigation },
	},
	interpolation: {
		escapeValue: false,
	},
})

export default i18n
