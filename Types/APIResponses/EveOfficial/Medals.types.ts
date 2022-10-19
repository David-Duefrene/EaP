export type Graphic = {
	color: number,
	graphicID: string,
	layer: number,
	part: number
}

type Medal = {
	corporationID: number,
	date: Date,
	description: string,
	graphics?: Array<Graphic>,
	issuerID: number,
	medalID: number,
	reason: string,
	status: 'private' | 'public',
	title: string,
}

export default Medal
