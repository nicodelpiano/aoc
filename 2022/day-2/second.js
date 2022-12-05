const fs = require('node:fs')
const assert = require('node:assert')

const filename = './input.txt'

function main() {
	const file = fs.readFileSync(filename, { encoding: 'utf-8' })
	const data = file.split('\n').slice(0, -1)

  const result = data.map(calculateScore).reduce((acc, a) => ({
		opponentScore: acc.opponentScore + a.opponentScore,
		yourScore: acc.yourScore + a.yourScore,
	}))

	console.log(`🏆 Scores:`)
	console.log(`------------------------------`)
	console.log(`You: ${result.yourScore}`)
	console.log(`Opponent: ${result.opponentScore}`)
}

main()

// Take a line (e.g. 'A Y') and input the score
// for your opponent and you based on the
// values
function calculateScore(line) {
	const [a, b] = line.split(' ')
	return outcome(a, b)
}

function selectedShapeScore(shape) {
	if (shape === 'A' || shape === 'X') {
		return 1
	}
	if (shape === 'B' || shape === 'Y') {
		return 2
	}
	if (shape === 'C' || shape === 'Z') {
		return 3
	}

	throw new Error(`Invalid shape: ${shape}`)
}

// Calculates the outcome of a single round
//
// Opponent:
//
// A => Rock
// B => Paper
// C => Sissors
//
// You:
//
// X => Have to lose
// Y => Have to draw
// Z => Have to win
//
function outcome(a, b) {
	let myShape

	// I have to lose
	if (b === 'X') {
		// Rock
		if (a === 'A') {
			// Sissors
			myShape = 'C'
		// Paper
		} else if (a === 'B') {
			// Rock
			myShape = 'A'
		// Sissors
		} else {
			myShape = 'B'
		}

		return {
			opponentScore: 6 + selectedShapeScore(a),
			yourScore: 0 + selectedShapeScore(myShape),
		}
	}

	// I have to draw
	if (b === 'Y') {
		// Rock
		if (a === 'A') {
			// Sissors
			myShape = 'A'
		// Paper
		} else if (a === 'B') {
			// Rock
			myShape = 'B'
		// Sissors
		} else {
			myShape = 'C'
		}

		return {
			opponentScore: 3 + selectedShapeScore(a),
			yourScore: 3 + selectedShapeScore(myShape),
		}
	}

	// I have to win
	if (b === 'Z') {
		// Rock
		if (a === 'A') {
			// Sissors
			myShape = 'B'
		// Paper
		} else if (a === 'B') {
			// Rock
			myShape = 'C'
		// Sissors
		} else {
			myShape = 'A'
		}

		return {
			opponentScore: 0 + selectedShapeScore(a),
			yourScore: 6 + selectedShapeScore(myShape),
		}
	}
	
	throw new Error(`Invalid round input: ${a} - ${b}`)
}
