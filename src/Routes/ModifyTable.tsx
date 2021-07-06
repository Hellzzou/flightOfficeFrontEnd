import React, { useState } from "react"
import { deleteFetchRequest, postFetchRequest } from "../Tools/fetch"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../datas/datas"
import { Thead } from "../Fieldsets/Thead"
import { ValidateFlightTBody } from "../Fieldsets/ValidateFlightTBody"
import { flightsToBDVView } from "../Tools/transformers"
import { validatedFlight } from "../types/models"
import { bdvView } from "../types/views"
import { modifyTableTitles } from "../datas/tablesTitles"
import { Redirect, useHistory } from "react-router"
import { Header } from "../Fieldsets/Header"
import { Navbar } from "../Fieldsets/Navbar"
import { BetweenTwoDatesForm } from "../Fieldsets/BetweenTwoDatesForm"
import {
	INITIAL_ENDDATE_CONTROL,
	INITIAL_STARTDATE_CONTROL,
} from "../datas/formDatas"
import { tokenCheck } from "../Tools/user"

export function ModifyTable(): JSX.Element {
	const [startDate, setStartDate] = useState(INITIAL_STARTDATE_CONTROL)
	const [endDate, setEndDAte] = useState(INITIAL_ENDDATE_CONTROL)
	const [BDVFlights, setBDVFlights] = useState([] as Array<bdvView>)
	const history = useHistory()

	const handleTableClick = (id: string) => {
		history.push(`/modifyFlightForm/${id}`)
	}

	async function handleDeleteClick(id: string) {
		const deleted = await deleteFetchRequest(
			DB_URL + "validatedFlight/deleteOne",
			{ id: id }
		)
		if (deleted) {
			const flights: Array<validatedFlight> = await postFetchRequest(
				DB_URL + "validatedFlight/byDate",
				{
					startDate: new Date(startDate.value),
					endDate: new Date(endDate.value),
				}
			)
			setBDVFlights(flightsToBDVView(flights))
		}
	}

	useAsyncEffect(() => {
		;(async () => {
			const flights: Array<validatedFlight> = await postFetchRequest(
				DB_URL + "validatedFlight/byDate",
				{
					startDate: new Date(startDate.value),
					endDate: new Date(endDate.value),
				}
			)
			setBDVFlights(flightsToBDVView(flights))
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
			{BDVFlights.length === 0 ? (
				<h3 className='text-center'>{"Aucun vol sur cette période"}</h3>
			) : (
				<div className='table-responsive m-2'>
					<table className='table table-sm align-middle table-hover table-secondary rounded table-striped text-center'>
						<Thead titles={modifyTableTitles} />
						<ValidateFlightTBody
							handleDeleteClick={handleDeleteClick}
							handleClick={handleTableClick}
							lines={BDVFlights}
							primaryButtonContent='modifier'
						/>
					</table>
				</div>
			)}
		</>
	)
}
