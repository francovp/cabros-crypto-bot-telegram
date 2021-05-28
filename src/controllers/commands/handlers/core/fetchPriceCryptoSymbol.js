const { round10 } = require('../../../helpers');

const fetchSymbolPrice = async (context) => {
	const axios = require('axios');
	// Check for parameters;
	const messageSplited = context.message.text.split(' ');
	const symbol = messageSplited[1];
	try {
		const axiosResponse = await axios.get(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`);
		// Retrieve the prices from the response object, in USD and EUR
		const data = axiosResponse.data;
		let price;
		// The prices have been successfully retrieved
		// So build the response object to trigger the success intent
		if (data.price >= 1) {
			price = round10(data.price, -5);
		} else {
			price = data.price;
		}

		// Resolve the Promise to say that the handler performed the action without any error
		return Promise.resolve({
			price: price,
			symbol: symbol,
		});
	} catch (e) {
		// An error occured during the request to the API
		// Reject the Promise to say that an error occured while the handler was performing the action
		return Promise.reject(e);
	}
};

module.exports = { fetchSymbolPrice };

