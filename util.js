module.exports.idGenerator = function () {
    let id = 0;
    return () => `000${id++}`.slice(-3);
};
module.exports.PORT = 8085;
module.exports.SEND_LETTER = '-';
module.exports.PRESS_EVENT = 'press-key';
module.exports.LETTERS = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
];
module.exports.INTRO_HTML = `
    <html>
        <head>
            <title>CSS-only Chat APP</title>
            <link rel='stylesheet' href='style.css'/>
        </head>
        <body>
        <h1>Welcome to CSS-only Chat!</h1>
        <p>This page uses no javascript whatsosever - only CSS and html. Blame @kkuchta for this.</p>
        <p>This is a
            <a target="_blank" href="https://github.com/alienzhou/css-only-chat-node">NodeJS version</a>
            for
            <a target="_blank" href="https://github.com/kkuchta/css-only-chat">@kkuchta/css-only-chat</a>.
            Open <a target="_blank" href="//127.0.0.1:${module.exports.PORT}">a new tab</a> for chatting.
        </p>
        <p>Your id is %id%.</p>
`;
module.exports.STYLE_TEXT = `
    .keys {
        position: absolute;
        left: 10px;
        top: 200px;
    }
    .messages {
        position: absolute;
        top: 260px;
        left: 10px;
    }
    .btn {
        width: 40px;
        padding: 0;
        text-align: center;
        line-height: 20px;
        cursor: pointer;
    }
    .send {
        padding: 0 20px;
        line-height: 28px;
        background: blue;
        color: #fff;
        cursor: pointer;
    }
    .send-block {
        margin: 10px 0;
    }
`;