const b64toBlob = (b64Data) => {
	const data = b64Data.split(',');
	let contentType = '';
	try {
		contentType = data[0].replace('data:', '').replace(';base64', '');
	} catch (e) {}

	const byteCharacters = atob(data[1]);
	const sliceSize = 512;
	const byteArrays = [];

	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize);

		const byteNumbers = new Array(slice.length);
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		const byteArray = new Uint8Array(byteNumbers);
		byteArrays.push(byteArray);
	}

	return new Blob(byteArrays, { type: contentType });
};

export { b64toBlob };
