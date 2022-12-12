import * as fs from 'node:fs'
import { executeProgram, parseProgram } from './instruction'
import { draw } from './sprite'

function main() {
  const inputfile = process.argv[2] || 'input.txt'

  const data = fs
    .readFileSync(inputfile, { encoding: 'utf-8' })
    .split('\n')
    .slice(0, -1)

  const program = parseProgram(data)
  const initCPU = [{ X: 1 }]

  const finalCPU = executeProgram(program, initCPU)
  const result = [
    20 * finalCPU[19].X,
    60 * finalCPU[59].X,
    100 * finalCPU[99].X,
    140 * finalCPU[139].X,
    180 * finalCPU[179].X,
    220 * finalCPU[219].X,
  ]

  console.log(result.reduce((acc, a) => a + acc))

  draw(finalCPU)
}

main()
