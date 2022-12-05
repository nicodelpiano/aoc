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
  const score = outcome(a, b)
  return {
    yourScore: selectedShapeScore(b) + score.yourScore,
    opponentScore: selectedShapeScore(a) + score.opponentScore,
  }
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
// X => Rock
// Y => Paper
// Z => Sissors
//
function outcome(a, b) {
  // Opponent chooses Rock
  if (a === 'A') {
    if (b === 'X') {
      return {
        opponentScore: 3,
        yourScore: 3,
      }
    } else if (b === 'Y') {
      return {
        opponentScore: 0,
        yourScore: 6,
      }
    } else {
      return {
        opponentScore: 6,
        yourScore: 0,
      }
    }
  }

  // Opponent chooses Paper
  if (a === 'B') {
    if (b === 'X') {
      return {
        opponentScore: 6,
        yourScore: 0,
      }
    } else if (b === 'Y') {
      return {
        opponentScore: 3,
        yourScore: 3,
      }
    } else {
      return {
        opponentScore: 0,
        yourScore: 6,
      }
    }
  }

  // Opponent chooses Sissors
  if (a === 'C') {
    if (b === 'X') {
      return {
        opponentScore: 0,
        yourScore: 6,
      }
    } else if (b === 'Y') {
      return {
        opponentScore: 6,
        yourScore: 0,
      }
    } else {
      return {
        opponentScore: 3,
        yourScore: 3,
      }
    }
  }

  throw new Error(`Invalid round input: ${a} - ${b}`)
}
