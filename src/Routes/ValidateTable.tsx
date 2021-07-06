import React, { useState } from "react"
import { deleteFetchRequest, getFetchRequest } from "../Tools/fetch"
import useAsyncEffect from "use-async-effect"
import { DB_URL } from "../datas/datas"
import { Thead } from "../Fieldsets/Thead"
import { ValidateFlightTBody } from "../Fieldsets/ValidateFlightTBody"
import { flightsToBDVView } from "../Tools/transformers"
import { bdvView } from "../types/views"
import { flightToValidate } from "../types/models"
import { validateTableTitles } from "../datas/tablesTitles"
import { Redirect, useHistory } from "react-router"
import { Header } from "../Fieldsets/Header"
import { Navbar } from "../Fieldsets/Navbar"
import { tokenCheck } from "../Tools/user"

export function ValidateTable(): JSX.Element {
	const [BDVFlights, setBDVFlights] = useState([] as Array<bdvView>)
	const history = useHistory()

	const handleTableClick = (id: string) => {
		history.push(`/validateFlight/${id}`)
	}

	async function handleDeleteClick(id: string) {
		const deleted = await deleteFetchRequest(
			DB_URL + "newFlight/deleteWithID",
			{ id: id }
		)
		if (deleted) {
			const flights: Array<flightToValidate> = await getFetchRequest(
				DB_URL + "newFlight/getAllNewFlights"
			)
			setBDVFlights(flightsToBDVView(flights))
		}
	}

	useAsyncEffect(() => {
		;(async () => {
			const flights: Array<flightToValidate> = await getFetchRequest(
				DB_URL + "newFlight/getAllNewFlights"
			)
			setBDVFlights(flightsToBDVView(flights))
		})()
	}, [BDVFlights.length])

	return !tokenCheck() ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			{BDVFlights.length === 0 ? (
				<h3 className='text-center'>{"Aucun vol à valider !"}</h3>
			) : (
				<div className='table-responsive m-2'>
					<table className='table table-sm align-middle table-hover table-secondary rounded table-striped text-center'>
						<Thead titles={validateTableTitles} />
						<ValidateFlightTBody
							handleDeleteClick={handleDeleteClick}
							handleClick={handleTableClick}
							lines={BDVFlights}
							primaryButtonContent='valider'
						/>
					</table>
				</div>
			)}
		</>
	)
}
