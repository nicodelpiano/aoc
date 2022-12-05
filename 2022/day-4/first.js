const fs = require('node:fs')
const assert = require('node:assert')

const filename = process.argv[2]

function main() {
	runTests()

	// Read file
	const data = fs.readFileSync(filename, { encoding: 'utf-8' })
	const lines = data.split('\n').slice(0, -1)

	const result = lines
		.map(parseLine)
		.map(([fr, sr]) => rangeContains(fr, sr) || rangeContains(sr, fr))
		.reduce((acc, a) => a ? acc + 1 : acc)

	console.log(result)
}

main()

function parseLine(line) {
	return line.split(',').map(parseLineRange)
}

// From a line range `X-Y` obtain the meaningful numbers
// that represent the range `[X, Y]`
function parseLineRange(lineRange) {
	const [l, r] = lineRange.split('-')
	const lr = parseInt(l)
	const rr = parseInt(r)
	return [lr, rr]
}

function testParseLine() {
	assert.deepEqual(parseLine('17-99,18-24'), [[17, 99], [18, 24]])
	assert.deepEqual(parseLine('14-91,22-91'), [[14, 91], [22, 91]])
}

function rangeContains(firstRange, secondRange) {
	const [fl, fr] = firstRange
	const [sl, sr] = secondRange
	return fl <= sl && fr >= sr
}

function testRangeContains() {
	assert.equal(rangeContains([2, 8], [3, 7]), true)
	assert.equal(rangeContains([4, 6], [6, 6]), true)
	assert.equal(rangeContains([1, 5], [6, 6]), false)
}

function runTests() {
	testRangeContains()
	testParseLine()
}
