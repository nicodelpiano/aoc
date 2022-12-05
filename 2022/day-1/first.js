const fs = require('node:fs')

const inputFile = 'input'

function main() {
  const file = fs.readFileSync('input.txt', { encoding: 'utf-8' })
  const data = file.split('\n')

  const elvesCalories = []

  let totalCalories = 0

  for (const d of data) {
    if (d === '') {
      elvesCalories.push(totalCalories)
      totalCalories = 0
    } else {
      const foodCalories = parseInt(d)
      totalCalories += foodCalories
    }
  }

  let maxCalories = 0
  for (const elfCalories of elvesCalories) {
    if (elfCalories > maxCalories) {
      maxCalories= elfCalories
    }
  }

  console.log(maxCalories)
}

main()
