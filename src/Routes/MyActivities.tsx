import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { INITAL_PILOT_HOURS, INITIAL_SUMS } from "../datas/pilotDatas"
import { BetweenTwoDatesForm } from "../Fieldsets/BetweenTwoDatesForm"
import { Navbar } from "../Fieldsets/Navbar"
import { buildMyHours, sumActivities } from "../Tools/buildViews"
import { pilotView } from "../types/views"
import { Header } from "../Fieldsets/Header"
import {
	INITIAL_ENDDATE_CONTROL,
	INITIAL_STARTDATE_CONTROL,
} from "../datas/formDatas"
import { tokenCheck } from "../Tools/user"
import { Redirect } from "react-router"
import { getFetchRequest } from "../Tools/fetch"
import { DB_URL } from "../datas/datas"
import { INITIAL_USER } from "../datas/userDatas"
import { Thead } from "../Fieldsets/Thead"
import { myActivitiesTableTitles } from "../datas/tablesTitles"
import { MyActivitiesTBody } from "../Fieldsets/MyActivitiesTBody"
import { MyActivitiesTFoot } from "../Fieldsets/MyActivitiesTFoot"

export const MyActivities = (): JSX.Element => {
	const [startDate, setStartDate] = useState(INITIAL_STARTDATE_CONTROL)
	const [endDate, setEndDAte] = useState(INITIAL_ENDDATE_CONTROL)
	const [myHours, setMyHours] = useState<Array<pilotView>>([INITAL_PILOT_HOURS])
	const [sums, setSums] = useState(INITIAL_SUMS)
	const [user, setUser] = useState(INITIAL_USER)

	useAsyncEffect(() => {
		;(async () => {
			const newUser = await getFetchRequest(DB_URL + "user/getOne")
			setUser(newUser)
			const allPilotHours = await buildMyHours(
				newUser.name,
				new Date(startDate.value),
				new Date(endDate.value)
			)
			setMyHours(allPilotHours)
			setSums(sumActivities(allPilotHours))
		})()
	}, [startDate, endDate])
	return !tokenCheck() ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<BetweenTwoDatesForm
				startDate={startDate}
				setStartDate={setStartDate}
				endDate={endDate}
				setEndDate={setEndDAte}
			/>
			{user.function !== "Pilote" ? (
				<h3 className='text-center'>{"Vous n'êtes pas pilote !"}</h3>
			) : myHours.length === 0 ? (
				<h3 className='text-center'>{"Aucune activité sur cette période"}</h3>
			) : (
				<div className='table-responsive m-2'>
					<table className='table table-sm align-middle table-secondary rounded text-center'>
						<Thead titles={myActivitiesTableTitles} />
						<MyActivitiesTBody myHours={myHours} />
						<MyActivitiesTFoot sums={sums} />
					</table>
				</div>
			)}
		</>
	)
}
