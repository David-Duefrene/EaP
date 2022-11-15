type Log = {
	type: string,
	log: Record<string, string>,
} | {
	type: 'log',
	log: Error,
}

export default Log
