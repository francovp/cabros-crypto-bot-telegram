require('dotenv').config();

const chatId = process.env.TELEGRAM_CHAT_ID;

function postAlert(bot) {
	return async (req, res) => {
		const { body } = req;
		try {
			let text = '';
			if (typeof body === 'object' && 'text' in body) {
				text = body.text;
			} else {
				text = body;
			}
			await bot.telegram.sendMessage(chatId, text, { parse_mode: 'MarkdownV2' });
			res.sendStatus(200);
		} catch (error) {
			console.debug('webhook/alert handler: Error sending message to bot');
			console.error(`webhook/alert handler: ${error}`);
			res.status(error.response.error_code).send(error.response);
		}
	};
}

module.exports = {
	postAlert,
};