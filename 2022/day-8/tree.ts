export type Tree =
  | {
      height: number
      bottom: Tree
      top: Tree
      right: Tree
      left: Tree
    }
  | 'Empty'

export type Forest = Tree[][]

export function buildTree(height: number): Tree {
  return {
    height,
    bottom: 'Empty',
    top: 'Empty',
    right: 'Empty',
    left: 'Empty',
  }
}

type Direction = 'right' | 'left' | 'bottom' | 'top'

function maxTreeHeightFrom(t: Tree, direction: Direction): number {
  if (t === 'Empty') {
    return -1
  }

  switch (direction) {
    case 'right':
      return Math.max(t.height, maxTreeHeightFrom(t.right, direction))
    case 'left':
      return Math.max(t.height, maxTreeHeightFrom(t.left, direction))
    case 'top':
      return Math.max(t.height, maxTreeHeightFrom(t.top, direction))
    case 'bottom':
      return Math.max(t.height, maxTreeHeightFrom(t.bottom, direction))
  }
}

function isTreeVisibleFrom(t: Tree, direction: Direction): boolean {
  if (t === 'Empty') {
    return false
  }

  switch (direction) {
    case 'right':
      return t.height > maxTreeHeightFrom(t.right, direction)
    case 'left':
      return t.height > maxTreeHeightFrom(t.left, direction)
    case 'top':
      return t.height > maxTreeHeightFrom(t.top, direction)
    case 'bottom':
      return t.height > maxTreeHeightFrom(t.bottom, direction)
  }
}

export function isTreeVisible(t: Tree): boolean {
  return (
    isTreeVisibleFrom(t, 'bottom') ||
    isTreeVisibleFrom(t, 'left') ||
    isTreeVisibleFrom(t, 'top') ||
    isTreeVisibleFrom(t, 'right')
  )
}
