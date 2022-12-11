export type Move = 'up' | 'down' | 'right' | 'left'
type HeadRopeMove = {
  n: number
  move: Move
}
export type HeadRopeMoves = HeadRopeMove[]

function charToMove(c: string): Move {
  switch (c) {
    case 'U':
      return 'up'
    case 'D':
      return 'down'
    case 'R':
      return 'right'
    case 'L':
      return 'left'
  }

  // Shouldn't happen
  return 'up'
}

export function parseHeadRopeMoves(data: string): HeadRopeMoves {
  const lines = data.split('\n').slice(0, -1)
  return lines.map((line) => {
    const [move, n] = line.split(' ')
    return {
      move: charToMove(move),
      n: parseInt(n),
    }
  })
}
