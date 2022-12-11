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
  return s
}

export function startSimulation(headRopeMoves: HeadRopeMoves): Simulation {
  return simulate({
    headMoves: headRopeMoves,
    simulation: [startRopePos],
  })
}
