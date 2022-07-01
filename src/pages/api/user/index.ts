import type { NextApiRequest,NextApiResponse } from "next";
import { create_user } from "../../../repositories/create_user";
import { v4 as uuidv4 } from "uuid";

export default async function handle(req: NextApiRequest, res: NextApiResponse){

if(req.method == "POST") {
	const { name,email,password,github,linkedIn,bio } = req.body
	const _id = uuidv4()
	try {
		const existing_user = await create_user({
		  _id,
			name,
			email,
			password,
			github,
			linkedIn,
			bio
		})
		if(existing_user) {
			return res.status(400).send(existing_user)
		}else {
		return res.status(201).send("create sucess")
		}
	}catch(err) {
		console.log(err)
	}
 return res.send("oi")

} else {
	return res.status(400).send("this request is not post")
}
}


