var localtunnel = require("localtunnel");
localtunnel(5000, { subdomain: "ashdoiasdssa" }, function(err, tunnel) {
	console.log(err);
	console.log("LT running");
});
