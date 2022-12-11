import * as fs from 'node:fs'
import { parseHeadRopeMoves } from './moves'
import {
  printSimulation,
  printTailSimulation,
  startSimulation,
  visitedTailPositions,
} from './simulation'

function main() {
  const inputfile = process.argv[2] || 'input.txt'
  const numOfKnots = parseInt(process.argv[3] || '10')
  const data = fs.readFileSync(inputfile, { encoding: 'utf-8' })

  const headRopeMoves = parseHeadRopeMoves(data)
  const simulation = startSimulation(headRopeMoves, numOfKnots)
  console.log(simulation.simulation)
  // printSimulation(simulation)
  printTailSimulation(simulation)
  console.log(visitedTailPositions(simulation).size)
}

main()
