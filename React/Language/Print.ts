import english from './english'

const Print = (id: string) => {
	const language = window.navigator.language.slice(0, 2)

	const index: {[key: string]: any} = {
		en: english,
	}

	if (index[language]) {
		return index[language][id]
	}

	return english[id]
}

export default Print
