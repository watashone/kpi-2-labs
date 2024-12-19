// Task 4 (Stream/AsyncIterator/Alternative) -- Ongoing processing of large data sets that do not fit in memory

async function asyncMap(iterator, callback, signal) {
    const results = [];
    for await (const chunk of iterator) {
        for (const element of chunk) {
            if (signal.aborted) {
                throw new Error('Operation was aborted');
            }
            results.push(await callback(element, signal));
        }
    }
    return results;
}

async function* createIterator(array, chunkSize = 2) {
    for (let i = 0; i < array.length; i += chunkSize) {
        yield array.slice(i, i + chunkSize);
    }
}

async function mapCallback(element, signal) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            resolve(element * 2);
        }, 100);

        signal.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Operation was aborted'));
        });
    });
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const controller = new AbortController();
const signal = controller.signal;

(async () => {
    try {
        const iterator = createIterator(numbers, 3);
        const result = await asyncMap(iterator, mapCallback, signal);
        console.log(result); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
    } catch (error) {
        console.log(error.message);
    }
})();

// setTimeout(() => { controller.abort(); }, 2500);
