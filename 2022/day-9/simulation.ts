import { HeadRopeMoves } from './moves'

type Position = {
  x: number
  y: number
}

const startPos: Position = {
  x: 0,
  y: 0,
}

const startRopePos: RopePosition = {
  head: startPos,
  tail: startPos,
}

type RopePosition = {
  head: Position
  tail: Position
}

type Simulation = {
  simulation: RopePosition[]
  headMoves: HeadRopeMoves
}

function simulate(s: Simulation): Simulation {
  // TODO: calculate simulation

  for (const m of s.headMoves) {
    for (let i = 0; i < m.n; i++) {
      switch (m.move) {
        case 'down':
          {
            const currentRopePos = s.simulation[s.simulation.length - 1]
            const newHeadPos = {
              ...currentRopePos.head,
              y: currentRopePos.head.y + 1,
            }

            let newTailPos = { ...currentRopePos.head }

            if (touch(newHeadPos, currentRopePos.tail)) {
              newTailPos = { ...currentRopePos.tail }
            }

            s.simulation = [
              ...s.simulation,
              {
                head: newHeadPos,
                tail: newTailPos,
              },
            ]
          }
          break
        case 'up':
          {
            const currentRopePos = s.simulation[s.simulation.length - 1]
            const newHeadPos = {
              ...currentRopePos.head,
              y: currentRopePos.head.y - 1,
            }

            let newTailPos = { ...currentRopePos.head }

            if (touch(newHeadPos, currentRopePos.tail)) {
              newTailPos = { ...currentRopePos.tail }
            }

            s.simulation = [
              ...s.simulation,
              {
                head: newHeadPos,
                tail: newTailPos,
              },
            ]
          }
          break
        case 'right':
          {
            const currentRopePos = s.simulation[s.simulation.length - 1]
            const newHeadPos = {
              ...currentRopePos.head,
              x: currentRopePos.head.x + 1,
            }

            let newTailPos = { ...currentRopePos.head }

            if (touch(newHeadPos, currentRopePos.tail)) {
              newTailPos = { ...currentRopePos.tail }
            }

            s.simulation = [
              ...s.simulation,
              {
                head: newHeadPos,
                tail: newTailPos,
              },
            ]
          }
          break
        case 'left':
          {
            const currentRopePos = s.simulation[s.simulation.length - 1]
            const newHeadPos = {
              ...currentRopePos.head,
              x: currentRopePos.head.x - 1,
            }

            let newTailPos = { ...currentRopePos.head }

            if (touch(newHeadPos, currentRopePos.tail)) {
              newTailPos = { ...currentRopePos.tail }
            }

            s.simulation = [
              ...s.simulation,
              {
                head: newHeadPos,
                tail: newTailPos,
              },
            ]
          }
          break
      }
    }
  }

  return s
}

type Grid = string[][]

function printSimulation(s: Simulation): Grid {
  const grid: Grid = []

  // TODO: print sim

  return grid
}

export function visitedTailPositions(s: Simulation): Set<string> {
  const visited = new Set<string>()

  for (const m of s.simulation) {
    visited.add(`${m.tail.x}-${m.tail.y}`)
  }

  return visited
}

function touch(head: Position, tail: Position): boolean {
  return Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2
}

export function startSimulation(headRopeMoves: HeadRopeMoves): Simulation {
  return simulate({
    headMoves: headRopeMoves,
    simulation: [startRopePos],
  })
}
