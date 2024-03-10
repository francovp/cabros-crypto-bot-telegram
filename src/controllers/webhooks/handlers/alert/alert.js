function postAlert(bot) {
	return async (req, res) => {
		const body = req.body;
		bot.telegram.sendMessage(body.chatId, `${body.text}`, { parse_mode: body.parseMode })
			.then(() => {
				res.sendStatus(200);
			})
			.catch((error) => {
				console.debug('webhook/alert handler: Error sending message to bot');
				console.error(error);
				res.status(error.response.error_code).send(error.response);
			});
	};
}

module.exports = {
	postAlert,
};