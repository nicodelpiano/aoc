export type CPUInstruction = { kind: 'noop' } | { kind: 'add'; value: number }

export type Program = CPUInstruction[]

function parseCPUInstruction(line: string): CPUInstruction {
  const [op, val] = line.split(' ')

  switch (op) {
    case 'noop':
      return { kind: 'noop' }
    default:
      return { kind: 'add', value: parseInt(val) }
  }
}

export function parseProgram(data: string[]): Program {
  return data.map(parseCPUInstruction)
}

type Registers = {
  X: number
  // Add moar registers if needed
}

// Each CPU entry is a cycle
type CPU = Registers[]

export function executeProgram(p: Program, cpu: CPU): CPU {
  for (const ins of p) {
    executeInstruction(ins, cpu)
  }

  return cpu
}

function executeInstruction(i: CPUInstruction, cpu: CPU) {
  switch (i.kind) {
    case 'noop':
      // Push one cycle
      cpu.push(cpu[cpu.length - 1])
      break
    case 'add':
      // Push two cycles
      cpu.push(cpu[cpu.length - 1])
      const lastRegister = cpu[cpu.length - 1]
      const updatedRegister = {
        ...lastRegister,
        X: lastRegister.X + i.value,
      }
      cpu.push(updatedRegister)
      break
  }
}
