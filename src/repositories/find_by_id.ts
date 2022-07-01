import { connect } from "mongoose";
import { User } from "../schema";	

const data_base_url = process.env.DATA_BASE_URL

export async function find_by_id(email: string) {

	try {
		await connect(`${data_base_url}`)

		const user = await User.findOne({ email }).exec()

		return user

	} catch(err) {
		console.log(err)
	}
}
