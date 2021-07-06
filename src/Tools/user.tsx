import { DB_URL } from "../datas/datas"
import { user } from "../types/models"
import { getFetchRequest, postFetchRequest } from "./fetch"

export async function checkUser(
	login: string,
	password: string
): Promise<user> {
	const res = await postFetchRequest(DB_URL + "user/login", {
		login: login,
		password: password,
	})
	return res
}
export async function tokenCheck(): Promise<boolean> {
	const user = await getFetchRequest(DB_URL + "user/getOne")
	return user.error === ""
}
