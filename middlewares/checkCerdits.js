module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		return res.status(402).json({
			err: "cerdits kurang"
		});
	}

	return next();
};
