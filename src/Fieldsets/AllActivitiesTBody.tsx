import React from "react"
import { AllActivitiesTBodyProps } from "../types/fieldsetsProps"

export const AllActivitiesTBody = (
	props: AllActivitiesTBodyProps
): JSX.Element => {
	return (
		<tbody>
			{props.squadronFlights.map((flight) => (
				<tr key={props.squadronFlights.indexOf(flight)}>
					<td>{new Date(flight.effectiveDeparture).toLocaleDateString()}</td>
					<td>{flight.aircraft}</td>
					<td>{flight.CDA}</td>
					<td>{flight.crew}</td>
					<td>{flight.mission}</td>
					<td>{flight.done}</td>
					<td>{flight.cause}</td>
					<td>{flight.group}</td>
					<td>{flight.client}</td>
					<td>{flight.manager}</td>
					<td>{flight.dayDuration.toFixed(1)}</td>
					<td>{flight.nightDuration.toFixed(1)}</td>
					<td>{flight.totalDuration.toFixed(1)}</td>
				</tr>
			))}
		</tbody>
	)
}
