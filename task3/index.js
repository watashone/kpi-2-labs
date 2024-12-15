// Task 3
//   * Integrate AbortController or other Cancellable approach

async function asyncMap(array, callback, signal) {
    const results = [];
    for (const element of array) {
        if (signal.aborted) new Error('Operation was aborted');
        results.push(await callback(element, signal));
    }
    return results;
}

async function mapCallback(element, signal) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            resolve(element * 2)
        }, 1000)
        signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Operation was aborted'));
        })
    })
}

const numbers = [1, 2, 3, 4, 5];
const controller = new AbortController()
const signal = controller.signal;

(async () => {
    try {
        const result = await asyncMap(numbers, mapCallback, signal);
        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
})();

setTimeout(() => {controller.abort()}, 2500);



