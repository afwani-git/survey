const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const recipientsSchema = require("./Recipiens");

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [recipientsSchema],
	yes: {
		type: Number,
		default: 1
	},
	no: {
		type: Number,
		default: 0
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: "User"
	},
	dataSent: Date,
	lastRespon: Date
});

model("surveys", surveySchema);
