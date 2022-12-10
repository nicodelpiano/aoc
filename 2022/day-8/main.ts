import * as fs from 'fs'
import { buildTree, Forest, isTreeVisible, Tree } from './tree'

function main() {
  const filename = process.argv[2] || 'input.txt'
  const lines = fs
    .readFileSync(filename, { encoding: 'utf-8' })
    .split('\n')
    .slice(0, -1)

  const visibleTreesCount = mapForestConnections(parseForest(lines))
    .map((rows) =>
      rows.reduce((acc, t) => (isTreeVisible(t) ? 1 + acc : acc), 0)
    )
    .reduce((acc, st) => st + acc)

  console.log(visibleTreesCount)
}

function parseForest(lines: string[]): Forest {
  return lines.map(parseLine)
}

function parseLine(line: string): Tree[] {
  return line
    .split('')
    .map((c) => parseInt(c, 10))
    .map(buildTree)
}

function mapForestConnections(forest: Forest): Forest {
  for (const [i, treeRow] of forest.entries()) {
    for (const [j, t] of treeRow.entries()) {
      if (t === 'Empty') {
        continue
      }
      // fill top tree if exists
      const prevTreeRow = forest[i - 1]
      if (prevTreeRow && prevTreeRow[j]) {
        t.top = prevTreeRow[j]
      }
      // fill bottom tree if exists
      const nextTreeRow = forest[i + 1]
      if (nextTreeRow && nextTreeRow[j]) {
        t.bottom = nextTreeRow[j]
      }
      // fill right tree if exists
      if (treeRow[j + 1]) {
        t.right = treeRow[j + 1]
      }
      // fill left tree if exists
      if (treeRow[j - 1]) {
        t.left = treeRow[j - 1]
      }
    }
  }
  return forest
}

main()
