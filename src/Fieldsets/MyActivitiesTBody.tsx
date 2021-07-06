import React from "react"
import { MyHoursTBodyProps } from "../types/fieldsetsProps"
import { pilotView } from "../types/views"

export const MyActivitiesTBody = (props: MyHoursTBodyProps): JSX.Element => {
	return (
		<tbody>
			{props.myHours.map((flight: pilotView) => (
				<tr key={props.myHours.indexOf(flight)}>
					<td>{flight.type}</td>
					<td>{new Date(flight.effectiveDeparture).toLocaleDateString()}</td>
					<td>{flight.aircraft}</td>
					<td>{flight.function}</td>
					<td>{flight.crew}</td>
					<td>{flight.mission}</td>
					<td>{flight.dayDuration.toFixed(1)}</td>
					<td>{flight.nightDuration.toFixed(1)}</td>
					<td>{flight.totalDuration.toFixed(1)}</td>
				</tr>
			))}
		</tbody>
	)
}
