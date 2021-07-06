import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../datas/datas"
import { INITIAL_MYHOURS, INITIAL_SUMS } from "../datas/pilotDatas"
import { BetweenTwoDatesForm } from "../Fieldsets/BetweenTwoDatesForm"
import { Navbar } from "../Fieldsets/Navbar"
import { sumActivities } from "../Tools/buildViews"
import { buildSquadronFlights } from "../Tools/buildViews"
import { postFetchRequest } from "../Tools/fetch"
import { activityView } from "../types/views"
import { Header } from "../Fieldsets/Header"
import {
	INITIAL_ENDDATE_CONTROL,
	INITIAL_STARTDATE_CONTROL,
} from "../datas/formDatas"
import { Thead } from "../Fieldsets/Thead"
import { AllActivitiesTBody } from "../Fieldsets/AllActivitiesTBody"
import { AllActivitiesTFoot } from "../Fieldsets/AllActivitiesTFoot"
import { allActivitiesTableTitles } from "../datas/tablesTitles"
import { tokenCheck } from "../Tools/user"
import { Redirect } from "react-router"

export const AllActivities = (): JSX.Element => {
	const [startDate, setStartDate] = useState(INITIAL_STARTDATE_CONTROL)
	const [endDate, setEndDAte] = useState(INITIAL_ENDDATE_CONTROL)
	const [squadronFlights, setSquadronFlights] = useState<Array<activityView>>([
		INITIAL_MYHOURS,
	])
	const [sums, setSums] = useState(INITIAL_SUMS)

	useAsyncEffect(() => {
		;(async () => {
			const allFlights = await postFetchRequest(
				DB_URL + "validatedFlight/byDate",
				{
					startDate: new Date(startDate.value),
					endDate: new Date(endDate.value),
				}
			)
			const squadronFlights = buildSquadronFlights(allFlights)
			setSquadronFlights(squadronFlights)
			setSums(sumActivities(squadronFlights))
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
			{squadronFlights.length === 0 ? (
				<h3 className='text-center'>{"Auncun vol sur cette période"}</h3>
			) : (
				<div className='table-responsive m-2'>
					<table className='table table-sm align-middle table-hover table-secondary rounded table-striped text-center'>
						<Thead titles={allActivitiesTableTitles} />
						<AllActivitiesTBody squadronFlights={squadronFlights} />
						<AllActivitiesTFoot sums={sums} />
					</table>
				</div>
			)}
		</>
	)
}
