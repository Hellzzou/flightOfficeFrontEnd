import React, { useState } from "react"
import { DisplayButton } from "../BacisComponents/DisplayButton"
import image from "../images/whiteAircraft.png"
import useAsyncEffect from "use-async-effect"
import { getLastEntry } from "../Tools/buildViews"
import { determineColor } from "../Tools/math"
import { getFetchRequest } from "../Tools/fetch"
import { DB_URL } from "../datas/datas"
import { INITIAL_USER } from "../datas/userDatas"
import { useHistory } from "react-router"

export const Header = (): JSX.Element => {
	const [updateColor, setUpdateColor] = useState("success")
	const [update, setUpdate] = useState("")
	const [user, setUser] = useState(INITIAL_USER)
	const history = useHistory()
	const handleClick = () => history.push("/")
	useAsyncEffect(() => {
		;(async () => {
			if (sessionStorage.getItem("token") !== null) {
				const lastEntry = await getLastEntry()
				const getUser = await getFetchRequest(DB_URL + "user/getOne")
				setUpdate(new Date(lastEntry).toLocaleDateString())
				setUser(getUser)
				setUpdateColor(
					determineColor(
						(Date.now() - Date.parse(lastEntry)) / 1000 / 60 / 60 / 24,
						7,
						14
					)
				)
			}
		})()
	}, [update])
	return (
		<header>
			<div className='bg-dark rounded mx-2 my-1'>
				<div className='align-items-center row mx-3 p-2'>
					<div className='col-md-2 text-center text-light align-self-center'>
						<img src={image} alt='lol' />
						<h5 className='d-inline mx-3'>Bureau des vols</h5>
					</div>
					<div className='col-md-2'></div>
					<h5 className='col-md-3 text-center text-light align-self-center pt-2'>
						Dernière mise à jour :{" "}
						<span className={`text-${updateColor}`}>{update}</span>
					</h5>
					<div className='col-md-2'></div>
					<div className='col-md-3 text-center text-light align-self-center'>
						<h5 className='d-inline px-3'>{`${user.rank} ${user.name}`}</h5>
						<DisplayButton
							buttonColor='warning'
							borderColor='warning'
							buttonMarginX={0}
							activity=''
							name='disconnect'
							content='Déconnexion'
							onClick={handleClick}
							disabled={false}
						/>
					</div>
				</div>
			</div>
		</header>
	)
}
