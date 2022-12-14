const fs = require('node:fs')
const assert = require('node:assert')

const inputfile = './input.txt'

function main() {
  runTests()

  const file = fs.readFileSync(inputfile, { encoding: 'utf-8' })
  const data = file.split('\n').slice(0, -1)

  const groups = groupOf(data, 3)
  const result = groups.map(processGroup).reduce((acc, a) => acc + a)
  console.log(result)
}

main()

function groupOf(lines, n) {
  const linesGrouped = []

  let group = []
  for (const line of lines) {
    group.push(line)
    if (group.length == n) {
      linesGrouped.push([...group])
      group = []
    }
  }

  if (group.length > 0) {
    linesGrouped.push([...group])
  }

  return linesGrouped
}

function testGroupOf() {
  assert.deepEqual(groupOf(['a','b','c','d'], 2), [['a', 'b'], ['c', 'd']])
  assert.deepEqual(groupOf(['a','b','c','d'], 3), [['a', 'b', 'c'], ['d']])
}

function splitRucksack(rucksack) {
  const middle = rucksack.length / 2
  return [rucksack.substr(0, middle), rucksack.substr(middle)]
}

function testSplitRucksack() {
  assert.deepEqual(splitRucksack('abcd'), ['ab', 'cd'])
  assert.deepEqual(splitRucksack('NGvdqJmJvpNbGRMGQgRsfgfn'), ['NGvdqJmJvpNb', 'GRMGQgRsfgfn'])
  assert.deepEqual(splitRucksack(''), ['', ''])
  assert.deepEqual(splitRucksack('a'), ['', 'a'])
  assert.deepEqual(splitRucksack('ab'), ['a', 'b'])
}

function findRepeatedItems(compartiment1, compartiment2) {
  const repeatedItems = new Set()

  for (const item of compartiment1) {
    if (compartiment2.includes(item)) {
      repeatedItems.add(item)
    }
  }

  return [...repeatedItems]
}

function testFindRepeatedItems() {
  assert.deepEqual(findRepeatedItems('vJrwpWtwJgWr', 'hcsFMMfFFhFp'), ['p'])
  assert.deepEqual(findRepeatedItems('jqHRNqRjqzjGDLGL', 'rsFMfFZSrLrFZsSL'), ['L'])
}

function calculateValue(item) {
  if (item >= 'a' && item <= 'z') {
    return item.charCodeAt(0) - 96
  }

  if (item >= 'A' && item <= 'Z') {
    return item.charCodeAt(0) - 38
  }

  throw new Error(`Invalid item value ${item}`)
}

function testCalculateValue() {
  assert.equal(calculateValue('a'), 1)
  assert.equal(calculateValue('p'), 16)
  assert.equal(calculateValue('L'), 38)
  assert.equal(calculateValue('P'), 42)
  assert.equal(calculateValue('v'), 22)
  assert.equal(calculateValue('t'), 20)
  assert.equal(calculateValue('s'), 19)
}

function processRucksack(rucksack) {
  const [fc, sc] = splitRucksack(rucksack)
  const ri = findRepeatedItems(fc, sc)
  return ri.map(calculateValue).reduce((acc, v) => v + acc)
}

function processGroup(group) {
  const groupBadge = identifyBadge(group)
  return calculateValue(groupBadge)
}

function testProcessGroup() {
  assert.equal(processGroup([
    'vJrwpWtwJgWrhcsFMMfFFhFp',
    'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
    'PmmdzqPrVvPwwTWBwg'
  ]), 18)
  assert.equal(processGroup([
    'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
    'ttgJtRGJQctTZtZT',
    'CrZsJsPPZsGzwwsLwLmpwMDw',
  ]), 52)
}

function identifyBadge(group) {
  const [r1, r2, r3] = group

  for (const item of r1) {
    if (r2.includes(item) && r3.includes(item)) {
      return item
    }
  }

  throw new Error(`Badge could not be identified for group ${group}`)
}

function runTests() {
  testSplitRucksack()
  testCalculateValue()
  testFindRepeatedItems()
  testGroupOf()
  testProcessGroup()
}
