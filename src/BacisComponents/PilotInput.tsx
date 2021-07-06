/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React from "react"
import { returnZeroOrValue } from "../Tools/math"
import { PilotInputProps } from "../types/basicComponentsProps"

export const PilotInput = (props: PilotInputProps): JSX.Element => {
	const hadleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let sum = 0
		props.pilots.forEach((pilot) => {
			if (props.pilots.indexOf(pilot) !== props.index) {
				const addValue =
					props.placeholder! === "Jour..." || props.placeholder! === "Durée..."
						? returnZeroOrValue(pilot.piloteDay)
						: returnZeroOrValue(pilot.piloteNight)
				sum += addValue
			}
		})
		sum += returnZeroOrValue(e.target.value)

		props.setControl(
			props.pilots.map((pilot) => ({
				title: pilot.title,
				pilotChoice: pilot.pilotChoice,
				pilotChoiceValidity: pilot.pilotChoiceValidity,
				piloteDay:
					(props.placeholder! === "Jour..." ||
						props.placeholder! === "Durée...") &&
					props.pilots.indexOf(pilot) === props.index
						? e.target.value
						: pilot.piloteDay,
				piloteDayValidity:
					props.placeholder! === "Jour..." || props.placeholder! === "Durée..."
						? sum === 2 * parseFloat(props.valueToCompare!.value)
						: pilot.piloteDayValidity,
				piloteNight:
					props.placeholder! === "Nuit..." &&
					props.pilots.indexOf(pilot) === props.index
						? e.target.value
						: pilot.piloteNight,
				piloteNightValidity:
					props.placeholder! === "Nuit..."
						? sum === 2 * parseFloat(props.valueToCompare!.value)
						: pilot.piloteNightValidity,
			}))
		)
	}
	return (
		<div className={`col-md-${props.inputSize}`}>
			<input
				className={`form-control bg-${props.backgroundColor} text-center text-${
					props.textColor
				} ${
					props.placeholder! === "Jour..." || props.placeholder! === "Durée..."
						? props.pilots[props.index].piloteDayValidity
							? "is-valid"
							: "is-invalid"
						: props.pilots[props.index].piloteNightValidity
						? "is-valid"
						: "is-invalid"
				}`}
				type={props.type}
				min={props.min}
				max={props.max}
				placeholder={props.placeholder}
				onChange={hadleInputChange}
				value={
					props.placeholder! === "Jour..." || props.placeholder! === "Durée..."
						? props.pilots[props.index].piloteDay
						: props.pilots[props.index].piloteNight
				}
			/>
		</div>
	)
}
