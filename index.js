const { getPrice, cryptoBotCmd } = require('./src/controllers/commands');
const app = require('./app.js');
const { Telegraf } = require('telegraf');

const token = process.env.BOT_TOKEN;
if (token === undefined) {
	throw new Error('BOT_TOKEN must be provided!');
}

const bot = new Telegraf(token);

bot.command(['precio'], getPrice);

bot.command(['cryptobot'], cryptoBotCmd);

const port = process.env.PORT || 80;
const now = new Date();

app.listen(port, () => {
	console.log(now + ' - Running server on port ' + port);
	bot.launch();

	// Enable graceful stop
	process.once('SIGINT', () => bot.stop('SIGINT'));
	process.once('SIGTERM', () => bot.stop('SIGTERM'));
});

app.post('/webhook/alert', async (req, res) => {
	const body = req.body;
	bot.telegram.sendMessage(body.chatId, `${body.text}`, { parse_mode: body.parseMode })
		.then(() => {
			res.sendStatus(200);
		})
		.catch((error) => {
			console.debug('webhook/alert handler: Error sending message to bot');
			console.error(error);
		});
});

module.exports = { bot };
