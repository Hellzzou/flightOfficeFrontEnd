import React from "react"
import { MyHoursTFootProps } from "../types/fieldsetsProps"

export const AllActivitiesTFoot = (props: MyHoursTFootProps): JSX.Element => {
	return (
		<tfoot>
			<tr>
				<th colSpan={9} className='bg-white border-white'></th>
				<th>Total : </th>
				<th>{props.sums.flights.day.toFixed(1)}</th>
				<th>{props.sums.flights.night.toFixed(1)}</th>
				<th>{props.sums.flights.total.toFixed(1)}</th>
			</tr>
		</tfoot>
	)
}
