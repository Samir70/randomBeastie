const fs = require('fs');

var beasties = fs.readFileSync('beasties.txt', 'utf8').split('\r\n');
// console.log(beasties);

const theOne = beasties[Math.floor(Math.random() * beasties.length)];

const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const messages = [
    'You and I both know that I have already chosen the winner',
    'But this display adds to the suspense.....',
    'All it does is make you wait',
    'But the skin on the back of your neck tightens',
    'And the hairs stand as you drum your fingers in tense agitation',
    'As if something magical is about to happen',
    'When, finally, after much ado and faffing about',
    'the winner is announced!!!'
];

const betweenLines = 300 // milliseconds
const typeMessage = async (m, line) => {
    for (i = 0; i < m.length; i++) {
        process.stdout.cursorTo(0, line);
        process.stdout.write(m.slice(0, i+1));
        await pause(50)
    }
    await pause(betweenLines);
}
const deleteMessage = async (m, line) => {
    for (i=m.length; i>0; i--) {
        process.stdout.cursorTo(0, line);
        process.stdout.clearLine();
        process.stdout.write(m.slice(0, i));
        await pause(10);
    }
}

const displayBeastie = async () => {
    console.clear();
    var r = 0;
    await typeMessage(messages[r], 0);
    await typeMessage(messages[r+1], 1);
    while (r<6) {
        await deleteMessage(messages[r], 0);
        r +=2;
        await typeMessage(messages[r], 0);
        await deleteMessage(messages[r-1], 1);
        await typeMessage(messages[r+1], 1);
    }
    await typeMessage('The #WaitingIsOver... (nearly)', 2);
    await pause(betweenLines);
    console.log('\n\nThe winner is', theOne);
}

displayBeastie()