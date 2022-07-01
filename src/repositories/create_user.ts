import { connect } from "mongoose";
import { User } from "../schema";
import { IUser } from "../entities/user";
import { find_by_id } from "./find_by_id";
import crypto from "crypto";

const data_base_url = process.env.DATA_BASE_URL
const crypto_key = process.env.JWT_KEY

export async function create_user({
	_id,
	name,
	email,
	password,
	github,
	linkedIn,
	bio }: IUser) {
	try {
		await connect(`${data_base_url}`)

		const existing_user = await find_by_id(email)

		if(existing_user) {
			return "existing user"
		}else {

		const key = crypto.createCipher('aes-128-cbc', `${crypto_key}`);

		let myPassword = key.update(`${password}`, "utf8", "hex");

		myPassword += key.final("hex")

		const user = new User({
			_id,
			name,
			email,
			password: myPassword,
			github,
			linkedIn,
			bio
		})

		await user.save()
	}

	} catch(err) {
		console.log(err)
	}
}
