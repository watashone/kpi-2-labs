// Task 1
// * Choose array fn (map/filter/filterMap/some/find/findIndex)
// * Prepare its callback based async counterpart
// * Prepare demo cases for the usage
// Task 2
//   * Prepare promise based alternative
//   * Write use cases for the promise based solution
//   * Write use cases for the async-await


const numbers = [1, 2, 3, 4, 5];

async function asyncMap(array, callback) {
    const results = [];
    for (const element of array) {
        results.push(await callback(element));
    }
    return results;
}

async function mapCallback(element) {
    return new Promise(resolve => {
        resolve(element * 2);
    })
}

// promise
asyncMap(numbers, mapCallback).then(results => console.log(results));

// async & await
(async () => {
    const results = await asyncMap(numbers, mapCallback);
    console.log(results);
})()
