import React from "react"
import { MyHoursTFootProps } from "../types/fieldsetsProps"

export const MyActivitiesTFoot = (props: MyHoursTFootProps): JSX.Element => {
	return (
		<tfoot>
			<tr>
				<th colSpan={5} className='bg-white border-white'></th>
				<th>Total vols : </th>
				<th>{props.sums.flights.day.toFixed(1)}</th>
				<th>{props.sums.flights.night.toFixed(1)}</th>
				<th>{props.sums.flights.total.toFixed(1)}</th>
			</tr>
			<tr>
				<th colSpan={5} className='bg-white border-white'></th>
				<th>Total SIMPIL : </th>
				<th>{props.sums.simpils.day.toFixed(1)}</th>
				<th>{props.sums.simpils.night.toFixed(1)}</th>
				<th>{props.sums.simpils.total.toFixed(1)}</th>
			</tr>
			<tr>
				<th colSpan={5} className='bg-white border-white'></th>
				<th>Total : </th>
				<th>{(props.sums.simpils.day + props.sums.flights.day).toFixed(1)}</th>
				<th>
					{(props.sums.simpils.night + props.sums.flights.night).toFixed(1)}
				</th>
				<th>
					{(props.sums.simpils.total + props.sums.flights.total).toFixed(1)}
				</th>
			</tr>
		</tfoot>
	)
}
