import { Schema,createConnection } from "mongoose";

const data_base_url = process.env.DATA_BASE_URL

const connect_data_base = createConnection(`${data_base_url}`)

const User_schema = new Schema({
	_id: String,
	name: String,
	email: String,
	password: String,
	github: String,
	linkedIn: String,
	bio: String,
})

export const User = connect_data_base.model("Users",User_schema)
