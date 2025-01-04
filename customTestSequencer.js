const TestSequencer = require('@jest/test-sequencer').default;

class CustomSequencer extends TestSequencer {
    sort(tests) {
        const order = [
            'user.route.test.js',
            'car.route.test.js',
        ];

        return tests.sort((a, b) => {
            const indexA = order.indexOf(a.path.split('/').pop());
            const indexB = order.indexOf(b.path.split('/').pop());
            return indexA - indexB;
        });
    }
}

module.exports = CustomSequencer;