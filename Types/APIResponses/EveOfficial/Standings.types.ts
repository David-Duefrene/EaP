export enum FromType {
	agent, npcCorp, faction,
}

type Standings = {
	fromID: number,
	fromType: FromType,
	standing: number,
}

export default Standings
