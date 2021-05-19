const { Composer } = require('micro-bot');
const { getPrice } = require('./src/controllers/commands');
const bot = new Composer;
const app = require('./app.js');

bot.command(['precio'], getPrice);

const port = process.env.PORT || 80;
const now = new Date();

app.listen(port, () => {
	console.log(now + ' - Running server on port ' + port);
});

module.exports = {
	bot,
};
