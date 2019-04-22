const fastcsv = require('fast-csv');  
const fs = require('fs');  
// const faker = require('faker')

// const randomInt = (min,max) => {
//   return Math.floor(Math.random()*(max-min+1)+min);
// }

// let array = ['poiuytrewq', 'qwertyuio', '123456789', ]

var start = new Date()

// function createArray() {
// 	for (let i = 0; i < 100; i++) {
// 		array.push(faker.lorem.sentence())
// 	}
// 	return array
// }

// createArray()

const generateData = () => {

  const arr = []
  for (let i = 0; i < 1000000; i++) {
    let data = {
    id: i,
	  recImg:  'https://loremflickr.com/320/240',
	  recDetails:'poiuytrewq', 
	  recTitle:  'qwertyuio',
	  recCost:  12234,  
	  recRating: 42323432,
	  recratingCount: 32532, 
	  roomId: 32423,
    }
    arr.push(data)
	}
  return arr
}


let data = generateData()
const ws = fs.createWriteStream(`data4.csv`);  
fastcsv  
  .write(data, { headers: true })
	.pipe(ws);

	var end = new Date() - start
	console.log('took:  %dms', end)
	console.log(process.memoryUsage());
