const useSuspense = (promise: () => Promise<any>) => {
	let status = 'pending'
	let result: any
	const suspend = promise().then(
		(res) => {
			status = 'success'
			result = res
		},
		(err) => {
			status = 'error'
			result = err
		},
	)
	return {
		read() {
			if (status === 'pending') {
				throw suspend
			} else if (status === 'error') {
				throw result
			}
			return result
		},
	}
}

export default useSuspense
