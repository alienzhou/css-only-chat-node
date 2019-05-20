const http = require('http');
const EventEmitter = require('events');
const Cache = require('./cache');
const {
    PORT,
    LETTERS,
    SEND_LETTER,
    idGenerator,
    STYLE_TEXT,
    INTRO_HTML,
    PRESS_EVENT
} = require('./util');

const cache = new Cache();
const msgList = [];
const event = new EventEmitter();
const getId = idGenerator();

function createPanel(id, current = '') {
    const prev = cache.getHistory(id) || '';
    const prevMsg = cache.getMsg(id) || '';
    const now = prev + current;
    const createKey = letter => {
        const prefix = now ? `${now}-${letter}` : letter;
        return `
            <style>.btn_${prefix}:active { background-image: url('/keys/${prefix}_${id}_${letter}') }</style>
            <button class="btn btn_${prefix}">${letter}</button>
        `;
    };
    const msgListHtml = () => msgList.reduce((prev, item) => `${prev}<li>${item.id}: ${item.msg}</li>`, '');

    const sendBtnHTML = `
        <div class="send-block">
            <style>.send_${now}:active { background-image: url('/send-${now}_${id}') }</style>
            <button class="send send_${now}">send</button>
        </div>
    `;
    const keysStyle = current ? `<style>.main_${prev}{display: none;}</style>` : '';
    const currentText = `${prevMsg}${current}`;
    const msgHTML = msgListHtml();

    return `
        ${keysStyle}
        <div class="main main_${now}">
            ${LETTERS.map(createKey).join('')}
            ${sendBtnHTML}
            <div>Current Message: ${currentText === SEND_LETTER ? '' : currentText}</div>
            ${msgHTML ? '<div>Message List:</div>' : ''}
            <ul>${msgHTML}</ul>
        </div>
    `;
}



const app = http.createServer((req, res) => {
    if (/^\/$/.test(req.url)) {
        req.url = '/index';
    }

    if (/^\/index$/.test(req.url) && req.method === 'GET') {
        const clientId = getId();
        cache.add(clientId, '');

        const send = ({id, letter}) => clientId === id && res.write(createPanel(id, letter));

        res.statusCode = 200;
        res.setHeader('connection', 'keep-alive');
        res.setHeader('content-type', 'text/html; charset=utf-8');
        res.write(INTRO_HTML.replace('%id%', `#${clientId}`));
        res.write(createPanel(clientId));

        event.addListener(PRESS_EVENT, send);
        req.socket.on('close', () => event.removeListener(PRESS_EVENT, send));
        return;
    }

    if (/^\/send-/.test(req.url)) {
        const clientId = req.url.split('_')[1];
        const msg = cache.getMsg(clientId);

        cache.clear(clientId);
        msgList.push({id: clientId, msg});

        cache.ids().forEach(id => {
            event.emit(PRESS_EVENT, {id, letter: SEND_LETTER});
            cache.add(id, SEND_LETTER);
        });

        res.statusCode = 204;
        res.end();
        return
    }

    if (/^\/keys/.test(req.url)) {
        const segments = req.url.split('_');
        const letter = segments[2];
        const id = segments[1];
        event.emit(PRESS_EVENT, {id, letter});
        cache.add(id, letter);

        res.statusCode = 204;
        res.end();
        return;
    }

    if (/^\/style.css$/.test(req.url) && req.method === 'GET') {
        res.setHeader('content-type', 'text/css');
        res.end(STYLE_TEXT);
        return;
    }

    res.statusCode = 404;
    res.end('404');
});

app.listen(PORT, () => console.log('listening on %s port', PORT));