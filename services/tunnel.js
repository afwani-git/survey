const ngrok = require("ngrok");

ngrok
	.connect({
		proto: "http", // http|tcp|tls, defaults to http
		addr: 3000, // port or network address, defaults to 80
		authtoken: "1aHX4NeDuBVElOys8ZNulbZPLvg_6FRN9QFmTeGKjMAEswJ6s", // your authtoken from ngrok.com
		region: "us" // one of ngrok regions (us, eu, au, ap), defaults to us
	})
	.then(data => {
		console.log("ngrok connected = " + data);
	})
	.catch(err => {
		console.log(err);
	});
