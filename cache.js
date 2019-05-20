const {SEND_LETTER} = require('./util');

class Cache {
    constructor() {
        this.msg = new Map();
        this.history = new Map();
    }

    add(id, letter = '') {
        const msg = this.msg.get(id) || '';
        const history = this.history.get(id) || '';
        if (letter !== SEND_LETTER) {
            this.msg.set(id, msg + letter);
        }
        this.history.set(id, history + letter);
    }

    ids() {
        const keys = [];
        for (let [k] of this.history) {
            keys.push(k);
        }
        return keys;
    }

    clear(id) {
        this.msg.set(id, '');
    }

    getMsg(id) {
        return this.msg.get(id);
    }

    getHistory(id) {
        return this.history.get(id);
    }
}

module.exports = Cache;