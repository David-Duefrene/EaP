type Clones = {
	characterID: bigint,
	jumpCloneID: number,
	locationID: bigint,
	locationType: 'station' | 'structure',
	implants?: number[],
	name?: string,
}

export default Clones
