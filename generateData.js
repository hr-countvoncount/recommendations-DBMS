const fastcsv = require('fast-csv');  
const fs = require('fs');  
const faker = require('faker')

const randomInt = (min,max) => {
  return Math.floor(Math.random()*(max-min+1)+min);
}

let array = []

function createArray() {
	for (let i = 0; i < 100; i++) {
		array.push(faker.lorem.sentence())
	}
	return array
}

createArray()

const generateData = () => {
  const arr = []
  for (let i = 0; i < 10000000; i++) {
    let data = {
    id: i,
	  recImg:  'https://loremflickr.com/320/240',
	  recDetails: array[randomInt(0, 19)], 
	  recTitle:  array[randomInt(0, 19)],
	  recCost:  randomInt(0, 100), 
	  recRating: randomInt(0, 100),
	  recratingCount: randomInt(0, 100), 
	  roomId: randomInt(0, 100),
    }
    arr.push(data)
  }
  return arr

}

let data = generateData()
const ws = fs.createWriteStream("data10m.csv");  
fastcsv  
  .write(data, { headers: true })
  .pipe(ws);