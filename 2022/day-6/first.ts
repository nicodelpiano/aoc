const fs = require('node:fs')
const assert = require('node:assert')

const filename = 'input.txt'

function main() {
	runTests()

	const data = fs.readFileSync(filename, 'utf-8')

	console.log(searchWindowOf(data, 4, noDuplicates))
}

// 
function searchWindowOf(data: string, n: number, condition: (a: string[]) => boolean): number {
	if (data.length < n) {
		throw new Error(`Data is too short to contain a single marker: ${data.length} - required at least ${n}`)
	}

	let currentIndex = 0
	let currentSlice = []

	for (const c of data) {
		if (currentSlice.length === n) {
			currentSlice.shift()
		}

		currentSlice.push(c)
		currentIndex++

		if (currentSlice.length < n) {
			continue
		}

		if (condition(currentSlice)) {
			return currentIndex
		}
	}

	return -1
}

function noDuplicates(arr: string[]): boolean {
	const s = new Set(arr)
	return s.size === arr.length
}

const testCases = [
	{
		data: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
		n: 4,
		res: 5,
	},
	{
		data: 'nppdvjthqldpwncqszvftbrmjlhg',
		n: 4,
		res: 6,
	},
	{
		data: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
		n: 4,
		res: 10,
	},
	{
		data: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
		n: 4,
		res: 11,
	},
	{
		data: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
		n: 4,
		res: 7,
	},
]

function runTests() {
	for (const tc of testCases) {
		assert.equal(searchWindowOf(tc.data, tc.n, noDuplicates), tc.res)
	}
}

main()
