const { fetchSymbolPrice } = require('./commands/handlers/core/fetchPriceCryptoSymbol');

const getPrice = (context) => {
	fetchSymbolPrice(context).then((result) => {
		context.reply(`Precio de ${result.symbol} es ${result.price}`);
	}).catch((error) => {
		console.log(error);
	});
};

module.exports = { getPrice };
