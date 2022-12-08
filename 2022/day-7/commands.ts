export type Command = LSCmd | CDCmd

type Cmd = 'ls' | 'cd'

export type LSCmd =
  | {
      result: string[]
    } & { cmd: Cmd }

export type CDCmd =
  | {
      dirname: string
    } & { cmd: Cmd }

export function parseCommandLines(lines: string[]): Command[] {
  const commands: Command[] = []

  for (const [i, line] of lines.entries()) {
    const tokens = line.split(' ')
    const firstToken = tokens[1]

    if (!isCommandLine(line)) {
      continue
    }

    switch (firstToken) {
      case 'cd':
        {
          commands.push({ dirname: tokens[2], cmd: 'cd' })
        }
        break
      case 'ls':
        {
          // parse next lines till find the next cmd
          const lsResult: string[] = [...lines].slice(i + 1)

          const r: string[] = []

          for (const lsLine of lsResult) {
            if (isCommandLine(lsLine)) {
              break
            }

            r.push(lsLine)
          }

          commands.push({ result: r, cmd: 'ls' })
        }
        break
    }
  }

  return commands
}

function isCommandLine(line: string): boolean {
  const tokens = line.split(' ')
  const firstToken = tokens[0]

  return firstToken === '$'
}
