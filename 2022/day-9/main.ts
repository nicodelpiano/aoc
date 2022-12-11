import * as fs from 'node:fs'
import { parseHeadRopeMoves } from './moves'
import { startSimulation } from './simulation'

function main() {
  const inputfile = process.argv[2] || 'input.txt'
  const data = fs.readFileSync(inputfile, { encoding: 'utf-8' })

  const headRopeMoves = parseHeadRopeMoves(data)
  console.log(startSimulation(headRopeMoves))
}

main()
