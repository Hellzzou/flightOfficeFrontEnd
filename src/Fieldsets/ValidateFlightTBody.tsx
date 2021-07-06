import React from "react"
import { TbodyProps } from "../types/fieldsetsProps"
import { ActionButton } from "../BacisComponents/ActionButton"
import { bdvView } from "../types/views"

export const ValidateFlightTBody = (props: TbodyProps): JSX.Element => {
	return (
		<tbody>
			{props.lines.map((line: bdvView) => (
				<tr key={props.lines.indexOf(line)}>
					<td>{new Date(line.effectiveDeparture).toLocaleDateString()}</td>
					<td>{line.CDA}</td>
					<td>{line.aircraft}</td>
					<td>{line.crew}</td>
					<td>{line.mission}</td>
					<td>{line.dayDuration}</td>
					<td>{line.nightDuration}</td>
					<td>{line.totalDuration}</td>
					<td>
						<ActionButton
							onClick={() => props.handleClick(line.id)}
							buttonSize={10}
							buttonColor='primary'
							buttonMarginX={1}
							buttonThickness='md'
							buttonContent={props.primaryButtonContent}
							disabled={false}
						/>
					</td>
					<td>
						<ActionButton
							onClick={() =>
								props.handleDeleteClick(line.id, props.lines.indexOf(line))
							}
							buttonSize={10}
							buttonColor='danger'
							buttonMarginX={1}
							buttonThickness='md'
							buttonContent='supprimer'
							disabled={false}
						/>
					</td>
				</tr>
			))}
		</tbody>
	)
}
