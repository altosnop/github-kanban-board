const getValueFromUrl = (url: string) => {
	const regex = /(?<=github\.com\/)[^/]+\/[^/]+/;
	const result = url.match(regex);

	if (result) {
		return result[0];
	}
};

export default getValueFromUrl;
