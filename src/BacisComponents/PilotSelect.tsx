import React from "react"
import { PiloteSelectProps } from "../types/basicComponentsProps"

export const PilotSelect = (props: PiloteSelectProps): JSX.Element => {
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const update = {
			title: props.pilots[props.index].title,
			pilotChoice: e.target.value,
			pilotChoiceValidity: props.validator(e.target.value),
			piloteDay: props.pilots[props.index].piloteDay,
			piloteDayValidity: props.pilots[props.index].piloteDayValidity,
			piloteNight: props.pilots[props.index].piloteNight,
			piloteNightValidity: props.pilots[props.index].piloteNightValidity,
		}
		props.setControl(
			props.pilots.map((pilot) =>
				props.pilots.indexOf(pilot) === props.index ? update : pilot
			)
		)
	}
	return (
		<div className={`col-md-${props.selectSize}`}>
			<select
				className={`form-select bg-${props.backgroundColor} text-${
					props.textColor
				} ${
					props.pilots[props.index].pilotChoiceValidity
						? "is-valid"
						: "is-invalid"
				}`}
				onChange={handleSelectChange}
				value={props.pilots[props.index].pilotChoice}
			>
				<option>Choix...</option>
				{props.options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	)
}
