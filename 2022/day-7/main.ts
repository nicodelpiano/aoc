import { CDCmd, Command, LSCmd, parseCommandLines } from './commands'
import { Context, FS, FSDir, FSNode } from './filesystem'

const fs = require('node:fs')

function main() {
  const filename = process.argv[2] || 'input.txt'

  const lines = getFileLines(filename)

  const cmds = parseCommandLines(lines)

  const initCtx: Context = { filesystem: [], level: [] }
  const resCtx = parseLineNode(initCtx, cmds)

  // Solution to puzzle 1
  console.log(
    findNodesThat(
      resCtx.level,
      (n: FSNode) => n.t === 'dir' && n.size <= 100000
    ).reduce((acc, a) => a.size + acc, 0)
  )

  // Solution to puzzle 2
  const TOTAL_DISK_SPACE = 70000000
  const UPDATE_SPACE = 30000000
  const totalUsedSpace = resCtx.level[0].size
  const currentFreeSpace = TOTAL_DISK_SPACE - totalUsedSpace
  const spaceNeeded = UPDATE_SPACE - currentFreeSpace

  const directoriesThatCanDelete = findNodesThat(
    resCtx.level,
    (n: FSNode) => n.t === 'dir' && n.size >= spaceNeeded
  )

  directoriesThatCanDelete.sort((a, b) => a.size - b.size)

  const directoryToDelete = directoriesThatCanDelete[0]
  console.log(`Space needed ${spaceNeeded}`)
  console.log(
    `Delete directory '${directoryToDelete.name}' will free up ${directoryToDelete.size}`
  )
}

main()

function getFileLines(filename: string): string[] {
  const data = fs.readFileSync(filename, { encoding: 'utf-8' })
  return data.split('\n').slice(0, -1)
}

function parseLineNode(context: Context, commands: Command[]): Context {
  for (const cmd of commands) {
    switch (cmd.cmd) {
      case 'cd':
        {
          const currentCmd = cmd as CDCmd
          if (currentCmd.dirname === '..') {
            const level = context.level.pop()
            if (!level) {
              break
            }
            const upLevel = context.level[context.level.length - 1]
            upLevel.nodes = [...upLevel.nodes, level]
            upLevel.size += level.size
          } else {
            const newLevel: FSDir = {
              name: currentCmd.dirname,
              size: 0,
              nodes: [],
              t: 'dir',
            }
            context.level.push(newLevel)
          }
        }
        break
      case 'ls': {
        const currentCmd = cmd as LSCmd

        const currentLevel = context.level.pop()

        for (const l of currentCmd.result) {
          const tokens = l.split(' ')
          switch (tokens[0]) {
            case 'dir':
              {
                currentLevel.nodes.push({
                  nodes: [],
                  name: tokens[1],
                  size: 0,
                  t: 'dir',
                })
              }
              break
            default:
              {
                const fileSize = parseInt(tokens[0])
                currentLevel.nodes.push({
                  name: tokens[1],
                  size: fileSize,
                  t: 'file',
                })
                currentLevel.size += fileSize
              }
              break
          }
        }

        context.level = [...context.level, currentLevel]
        break
      }
    }
  }

  return context
}

function findNodesThat(fs: FS, condition: (node: FSNode) => boolean): FSNode[] {
  let nodes: FSNode[] = []

  if (!fs || fs.length === 0) {
    return nodes
  }

  if (fs.length === 1) {
    if (condition(fs[0])) {
      return [fs[0]]
    }
  }

  const currNodes = fs.filter(condition)

  const moarNodes = fs.flatMap((n: FSDir) => findNodesThat(n.nodes, condition))

  return [...currNodes, ...moarNodes]
}
