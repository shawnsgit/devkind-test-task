import express from 'express';
import { UserInfo, ProfileHistory } from '../models/user.js'
import {emailValidation, ageValidation} from '../utils/validation.js';
const router = express.Router();

router.post('/signup', async (req, res) => {
	const {
		userFirstName,
		userLastName,
		userEmail,
		userPassword,
		userAge,
		userGender
	} = req.body
	const userInfo = new UserInfo({
		userFirstName,
		userLastName,
		userEmail,
		userPassword,
		userAge,
		userGender
	})
	const emailErr = emailValidation(req,res);
	if (emailErr) return emailErr
	const ageErr = ageValidation(req, res);
	if (ageErr) return ageErr

	try {
		const findUsers = await UserInfo.find({ userEmail: req.body.userEmail });
		if (findUsers.length > 0) {
			return res.json({
				errors: {
					msg: 'already registered',
					code: 10003
				}, result: false
			})
		}
		const saveUser = await userInfo.save();
		saveUser.result = true;
		return res.json(saveUser)
	} catch (err) {
		return res.json({
			errors: {
				msg: 'something went wrong',
				code: 10000
			}
		})
	}
})
router.post('/login', async (req, res) => {
	const emailErr = emailValidation(req,res);
	if (emailErr) return emailErr
	try {
		const findUsers = await UserInfo.find({ userEmail: req.body.userEmail });
		if (findUsers.length === 0) {
			return res.json({
				errors: {
					msg: 'not registered',
					code: 10001
				}, result: false
			})
		}

		const users = findUsers.filter(i => i.userPassword === req.body.userPassword);
		if (users.length === 0) {
			return res.json({
				errors: {
					msg: 'wrong password',
					code: 10002
				}, result: false
			})
		}
		const user = users[0]
		user.result = true;
		return res.json(user)
	} catch (err) {
		return res.json({
			errors: {
				msg: 'something went wrong',
				code: 10000
			}
		})
	}
})
router.get('/profile', async (req, res) => {
	const userId = req.query.id
	if (!userId) {
		return res.json({
			errors: {
				msg: 'user id not provide',
				code: 10005
			}, result: false
		})
	}
	try {
		const findUsers = await UserInfo.find({ _id: userId });
		if (findUsers.length === 0) {
			return res.json({
				errors: {
					msg: 'user not found',
					code: 10004
				}, result: false
			})
		}
		const findUser = findUsers[0]
		findUser.result = true;
		return res.json(findUser)
	} catch (err) {
		return res.json({
			errors: {
				msg: 'something went wrong',
				code: 10000
			}
		})
	}
})
router.get('/history', async (req, res) => {
	const userId = req.query.id
	if (!userId) {
		return res.json({
			errors: {
				msg: 'user id not provide',
				code: 10005
			}, result: false
		})
	}
	try {
		const findHistories = await ProfileHistory.find({ userId: userId });
		if (findHistories.length === 0) {
			return res.json({
				errors: {
					msg: 'history not found',
					code: 10004
				}, result: false
			})
		}
		const findHistory = findHistories[0]
		findHistory.result = true;
		return res.json(findHistory)
	} catch (err) {
		return res.json({
			errors: {
				msg: 'something went wrong',
				code: 10000
			}
		})
	}
})
router.post('/profile', async (req, res) => {
	const {
		_id,
		userEmail,
		userPassword,
		userFirstName,
		userLastName,
		userGender,
		userAge,
		userAddress } = req.body
	const userInfo = {
		_id,
		userEmail,
		userPassword,
		userFirstName,
		userLastName,
		userGender,
		userAge,
		userAddress
	}
	const emailErr = emailValidation(req,res);
	if (emailErr) return emailErr
	const error = await ageValidation(req, res);
	if (error) return error

	try {
		const findUser = await UserInfo.find({ _id: _id });
		if (findUser.length === 0) {
			return res.json({
				errors: {
					msg: 'user not find',
					code: 10004
				}, result: false
			})
		}

		await UserInfo.updateOne({ _id: _id }, userInfo);

		const findHistory = await ProfileHistory.find({ userId: _id });
		userInfo.timeStamp = new Date().toISOString();
		if (findHistory.length === 0) {
			const newHistory = new ProfileHistory({
				userId: _id,
				profileHistory: [userInfo]
			})
			await ProfileHistory.create(newHistory);
		} else {
			await ProfileHistory.updateOne({ _id: findHistory[0]._id }, { profileHistory: [...findHistory[0].profileHistory, userInfo] });
		}

		userInfo.result = true;
		return res.json(userInfo);
	} catch (err) {
		return res.json({
			errors: {
				msg: 'something went wrong',
				code: 10000
			}
		})
	}
})
export default router

