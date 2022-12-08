export type FS = FSNode[]

export type FSNodeType = 'dir' | 'file'
export type FSNode = FSFile | FSDir

export type FSFile = {
  t: FSNodeType
  size: number
  name: string
}

export type FSDir = {
  t: FSNodeType
  nodes: FSNode[]
  name: string
  size: number
}

export type Context = {
  filesystem: FS
  level: FSDir[]
}
