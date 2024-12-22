// Task 5 (Observable/EventEmitter/Alternative) -- Reactive message based communication between entities
import {EventEmitter} from 'events';

class ReactiveSystem extends EventEmitter {
    sendMessage(entity, message) {
        this.emit('message', {entity, message});
    }

    subscribe(entity, handler) {
        this.on('message', ({entity: targetEntity, message}) => {
            if (targetEntity === entity) {
                handler(message);
            }
        });
    }
}

async function asyncMap(iterator, callback, signal) {
    const results = [];
    for await (const chunk of iterator) {
        if (signal.aborted) {
            reactiveSystem.sendMessage('asyncMap', "Oops! Operation was aborted..");
            throw new Error('ABORTED');
        }
        for (const element of chunk) {
            results.push(await callback(element, signal));
        }
    }
    reactiveSystem.sendMessage('asyncMap', "Mapping completed successfully");
    return results;
}

async function* createIterator(array, chunkSize = 2) {
    for (let i = 0; i < array.length; i += chunkSize) {
        yield array.slice(i, i + chunkSize);
    }
}

async function mapCallback(element) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(element * 2);
        }, 200);
    });
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const controller = new AbortController();
const signal = controller.signal;
const reactiveSystem = new ReactiveSystem();

reactiveSystem.subscribe('asyncMap', (message) => {
    console.log(`asyncMap received message: ${message}`);
});

(async () => {
    try {
        const iterator = createIterator(numbers, 3);
        const result = await asyncMap(iterator, mapCallback, signal);
        console.log(result); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();

setTimeout(() => controller.abort(), 500);