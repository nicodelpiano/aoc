const fs = require('node:fs')

const filename = 'input.txt'

type Crane = string
type Stack = Crane[]
type StackConfiguration = Stack[]
type Move = [number, number, number]
type Moves = Move[]

function main(): void {
	const lines = readLines(filename)

	const [stackLines, movesLines] = splitData(lines)

	let stack = parseStackConfig(stackLines)

	const moves = movesLines.map(parseMove)

	for (const move of moves) {
		stack = executeMove(move, stack)
	}

	for (const s of stack) {
		console.log(s[0])
	}
}

main()

function readLines(filename: string): string[] {
  return fs.readFileSync(filename, {
    encoding: 'utf-8'
  }).split('\n').slice(0, -1)
}

function splitData(lines: string[]): [string[], string[]] {
	const stackConfiguration = []
	const moves = []

	let pushTo = stackConfiguration

	for (const line of lines) {
		if (line === '') {
			pushTo = moves
			continue
		}

		pushTo.push(line)
	}


	return [stackConfiguration, moves]
}

function parseCrane(craneLine: string): Crane {
	return craneLine.slice(0, -1).slice(1)
}

function parseStack(stackLine: string): Stack {
	const splittedLine = stackLine.split(' ')

	const stack: Stack = []

	// For each 4 empty strings, we count 1 space in the stack
	let count = 0
	for (const l of splittedLine) {
		if (l === '') {
			count++

			if (count === 4) {
				stack.push('')
				count = 0
			}

			continue
		}
		stack.push(parseCrane(l))
	}

	return stack
}

function parseStackConfig(lines: string[]): StackConfiguration {
	const stackLines: Stack[] = lines.map(parseStack).slice(0, -1)

	const stackConfig: StackConfiguration = Array(stackLines.length + 1).fill([])

	for (const [i, stack] of stackLines.entries()) {
		for (const [j, crane] of stack.entries()) {
			if (crane === '') {
				// Ignore
				continue
			}
			stackConfig[j] = [...stackConfig[j], crane]
		}
	}

	return stackConfig
}

function parseMove(moveStr: string): Move {
	const pattern = /\d+/g
	const [n, from, to] = moveStr.match(pattern)
	return [parseInt(n), parseInt(from) - 1, parseInt(to) - 1]
}

function executeMove(move: Move, stack: StackConfiguration): StackConfiguration {
	const [n, from, to] = move

	const itemsToAdd = stack[from].slice(0, n)

	// second puzzle
	stack[to] = [...itemsToAdd, ...stack[to]]
	// first puzzle
	// stack[to] = [...itemsToAdd.reverse(), ...stack[to]]
	stack[from] = stack[from].slice(n)

	return stack
}
