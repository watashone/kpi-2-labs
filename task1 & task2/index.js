// Task 1
// * Choose array fn (map/filter/filterMap/some/find/findIndex)
// * Prepare its callback based async counterpart
// * Prepare demo cases for the usage
// Task 2
//   * Prepare promise based alternative
//   * Write use cases for the promise based solution
//   * Write use cases for the async-await


const numbers = [1, 2, 3, 4, 5];

// callback
function callbackMap(array, callback) {
    const results = [];
    for (const element of array) {
        results.push(callback(element));
    }
    return results;
}

function callback(element) {
    return element * 2;
}

console.log(callbackMap(numbers, callback));

// promise

function asyncMap(array) {
    const promises = [];
    for (const element of array) {
        promises.push(new Promise((resolve) => {
            resolve(element * 2);
        }));
    }
    return Promise.all(promises);
}


asyncMap(numbers).then(results => console.log(results));

// async & await
(async () => {
    const results = await asyncMap(numbers);
    console.log(results);
})()
