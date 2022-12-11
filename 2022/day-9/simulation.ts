import { HeadRopeMoves, Move } from './moves'

type Position = {
  x: number
  y: number
}

const startPos: Position = {
  x: 0,
  y: 0,
}

type RopePosition = Position[]

const startRopePos = (numOfKnots: number) => Array(numOfKnots).fill(startPos)

export type Simulation = {
  simulation: RopePosition[]
  headMoves: HeadRopeMoves
  numOfKnots: number
}

function calculateNewKnots(s: Simulation, m: Move): RopePosition {
  const ropeKnots = s.simulation[s.simulation.length - 1]
  const headKnot = ropeKnots[0]

  let newHeadKnot = { x: 0, y: 0 }

  switch (m) {
    case 'down':
      newHeadKnot = {
        ...headKnot,
        x: headKnot.x + 1,
      }
      break
    case 'up':
      newHeadKnot = {
        ...headKnot,
        x: headKnot.x - 1,
      }
      break
    case 'right':
      newHeadKnot = {
        ...headKnot,
        y: headKnot.y + 1,
      }
      break
    case 'left':
      newHeadKnot = {
        ...headKnot,
        y: headKnot.y - 1,
      }
      break
  }

  let newKnotPositions: RopePosition = [newHeadKnot]

  for (const [i, knot] of ropeKnots.slice(1).entries()) {
    let newKnotPos = calculateNewKnotPosition(
      newKnotPositions[i],
      ropeKnots[i],
      knot,
      m
    )

    if (touch(newKnotPositions[i], knot)) {
      newKnotPos = { ...knot }
    }

    newKnotPositions.push(newKnotPos)
  }

  return newKnotPositions
}

function calculateNewKnotPosition(
  head: Position,
  oldHead: Position,
  tail: Position,
  m: Move
): Position {
  if (head.x !== tail.x && head.y !== tail.y) {
    return {
      x: head.x > tail.x ? tail.x + 1 : tail.x - 1,
      y: head.y > tail.y ? tail.y + 1 : tail.y - 1,
    }
  }

  if (head.x === tail.x) {
    return {
      y: head.y > tail.y ? tail.y + 1 : tail.y - 1,
      x: tail.x,
    }
  }

  if (head.y === tail.y) {
    return {
      y: tail.y,
      x: head.x > tail.x ? tail.x + 1 : tail.x - 1,
    }
  }

  return { ...oldHead }
}

function simulate(s: Simulation): Simulation {
  for (const m of s.headMoves) {
    for (let i = 0; i < m.n; i++) {
      const newKnotPositions = calculateNewKnots(s, m.move)
      s.simulation = [...s.simulation, newKnotPositions]
    }
  }

  return s
}

export function visitedTailPositions(s: Simulation): Set<string> {
  const visited = new Set<string>()

  for (const m of s.simulation) {
    const tail = m[m.length - 1]
    visited.add(`${tail.x}-${tail.y}`)
  }

  return visited
}

function touch(head: Position, tail: Position): boolean {
  return Math.abs(head.x - tail.x) < 2 && Math.abs(head.y - tail.y) < 2
}

export function startSimulation(
  headRopeMoves: HeadRopeMoves,
  numOfKnots: number
): Simulation {
  return simulate({
    numOfKnots,
    headMoves: headRopeMoves,
    simulation: [startRopePos(numOfKnots)],
  })
}

export function printLastSimulation(s: Simulation) {
  const [l, r, u, d] = getSimulationBounds(s)
  const [rows, cols] = getGridSize(s)
  const grid: Grid = Array(rows)

  for (let i = 0; i < rows; i++) {
    grid[i] = Array(cols).fill('.')
  }

  const rp = s.simulation[s.simulation.length - 1]
  for (const [j, p] of rp.entries()) {
    if (grid[p.x - l][p.y - u] === '.') {
      grid[p.x - l][p.y - u] = j === 0 ? 'H' : `${j}`
    }
  }

  grid[-l][-u] = 's'

  for (const row of grid) {
    console.log(row.join(' '))
  }
}

export function printSimulation(s: Simulation) {
  const [l, r, u, d] = getSimulationBounds(s)
  const [rows, cols] = getGridSize(s)

  for (const rp of s.simulation) {
    const grid: Grid = Array(rows)

    for (let i = 0; i < rows; i++) {
      grid[i] = Array(cols).fill('.')
    }

    grid[-l][-u] = 's'

    for (const [j, p] of rp.entries()) {
      if (grid[p.x - l][p.y - u] === '.' || grid[p.x - l][p.y - u] === 's') {
        grid[p.x - l][p.y - u] = j === 0 ? 'H' : `${j}`
      }
    }

    for (const row of grid) {
      console.log(row.join(' '))
    }

    console.log()
  }
}

type Grid = string[][]
type GridSize = [number, number]
type Bounds = [number, number, number, number]

export function printTailSimulation(s: Simulation) {
  const [l, r, u, d] = getSimulationBounds(s)
  const [rows, cols] = getGridSize(s)
  const grid: Grid = Array(rows)

  for (let i = 0; i < rows; i++) {
    grid[i] = Array(cols).fill('.')
  }

  for (const rp of s.simulation) {
    for (const [j, p] of rp.entries()) {
      if (j === rp.length - 1) {
        grid[p.x - l][p.y - u] = '#'
      }
    }
  }

  grid[-l][-u] = 's'

  for (const row of grid) {
    console.log(row.join(' '))
  }
}

function getSimulationBounds(s: Simulation): Bounds {
  // bounds [left, right, up, down]
  const bounds: Bounds = [0, 0, 0, 0]

  for (const rp of s.simulation) {
    for (const p of rp) {
      if (p.x < bounds[0]) {
        bounds[0] = p.x
      }
      if (p.x > bounds[1]) {
        bounds[1] = p.x
      }
      if (p.y < bounds[2]) {
        bounds[2] = p.y
      }
      if (p.y > bounds[3]) {
        bounds[3] = p.y
      }
    }
  }

  return bounds
}

function getGridSize(s: Simulation): GridSize {
  const [l, r, u, d] = getSimulationBounds(s)
  return [r - l + 1, d - u + 1]
}
