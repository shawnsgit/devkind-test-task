import mongoose from "mongoose";
const UserSchema = mongoose.Schema({
	userEmail: {
		type: String,
		required: false
	},
	userFirstName: {
		type: String,
		required: false
	},
	userLastName: {
		type: String,
		required: false
	},
	userGender: {
		type: String,
		required: false
	},
	userAge: {
		type: Number,
		required: false
	},
	userAddress: {
		type: String,
		required: false
	},
	userPassword: {
		type: String,
		required: false
	},
	result: {
		type: Boolean,
		required: false
	},
	timeStamp: {
		type: String,
		required: false
	}
})
const HistorySchema = mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	profileHistory: [UserSchema],
	result: {
		type: Boolean,
		required: false
	}
})
const UserInfo = mongoose.model('UserInfo', UserSchema)
const ProfileHistory = mongoose.model('ProfileHistory', HistorySchema)
export { UserInfo, ProfileHistory }