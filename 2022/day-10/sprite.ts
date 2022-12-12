import { CPU } from './instruction'

type Pixel = '#' | '.'

type CRT = Pixel[][]

// CRT Pixels
const width = 40
const height = 6

type Sprite = {
  position: number
  wide: number
}

const defaultSprite: Sprite = {
  position: 0,
  wide: 3,
}

const defaultCRT: () => CRT = () => {
  const crt: CRT = Array(height + 1)
  for (const [i] of crt.entries()) {
    crt[i] = Array(width + 1)
  }
  return crt
}

function drawCycle(cycle: number, sprite: Sprite, crt: CRT) {
  const row = Math.floor(cycle / width)
  const col = cycle - row * width
  const spritePos = row * width + sprite.position
  console.log(cycle, row, col, spritePos)
  if (Math.abs(spritePos - cycle) < sprite.wide && cycle >= spritePos) {
    crt[row][col] = '#'
  } else {
    crt[row][col] = '.'
  }
}

export function draw(cpu: CPU) {
  const sprite = defaultSprite
  const crt = defaultCRT()

  for (const [i, cycle] of cpu.slice(0, 240).entries()) {
    drawCycle(i, { ...sprite, position: cycle.X - 1 }, crt)
  }

  for (const r of crt) {
    console.log(r.join(''))
  }
}
