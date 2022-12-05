const fs = require('node:fs')

const inputFile = 'input'

function main() {
  const file = fs.readFileSync('input.txt', { encoding: 'utf-8' })
  const data = file.split('\n')

  const elvesCalories = []
  let maxThree = [0, 0, 0]

  let totalCalories = 0

  for (const d of data) {
    if (d === '') {
      elvesCalories.push(totalCalories)
      maxThree = insertToMaxThree(maxThree, totalCalories)
      totalCalories = 0
    } else {
      const foodCalories = parseInt(d)
      totalCalories += foodCalories
    }
  }

  console.log(maxThree)
  console.log(maxThree.reduce((a ,b) => a + b))
}

function insertToMaxThree(maxThree, value) {
  const newMaxThree = [...maxThree, value].sort((a, b) => a - b)
  return newMaxThree.slice(1)
}

main()
