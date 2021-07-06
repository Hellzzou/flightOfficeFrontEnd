import React from "react"
import { returnZeroOrValue } from "../Tools/math"
import { InputProps } from "../types/basicComponentsProps"

export const Input = (props: InputProps): JSX.Element => {
	const hadleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setControl({
			value: e.target.value,
			validity: props.validator(e.target.value),
		})
		if (typeof props.durations !== "undefined") {
			let durationSum = 0
			props.durations.forEach((duration) => {
				props.placeholder! === "Jour..."
					? (durationSum += returnZeroOrValue(duration.durationDay))
					: (durationSum += returnZeroOrValue(duration.durationNight))
			})
			props.setDuration!(
				props.durations.map((duration) => ({
					title: duration.title,
					durationDay: duration.durationDay,
					durationDayValidity:
						props.placeholder! === "Jour..."
							? durationSum === returnZeroOrValue(e.target.value)
							: duration.durationDayValidity,
					durationNight: duration.durationNight,
					durationNightValidity:
						props.placeholder! === "Nuit..."
							? durationSum === returnZeroOrValue(e.target.value)
							: duration.durationNightValidity,
				}))
			)
		}
		if (typeof props.pilots !== "undefined") {
			let pilotSum = 0
			props.pilots.forEach((pilot) => {
				props.placeholder! === "Jour..." || props.placeholder! === "Durée..."
					? (pilotSum += returnZeroOrValue(pilot.piloteDay))
					: (pilotSum += returnZeroOrValue(pilot.piloteNight))
			})
			props.setPilot!(
				props.pilots.map((pilot) => ({
					title: pilot.title,
					pilotChoice: pilot.pilotChoice,
					pilotChoiceValidity: pilot.pilotChoiceValidity,
					piloteDay: pilot.piloteDay,
					piloteDayValidity:
						props.placeholder! === "Jour..." ||
						props.placeholder! === "Durée..."
							? pilotSum === 2 * returnZeroOrValue(e.target.value)
							: pilot.piloteDayValidity,
					piloteNight: pilot.piloteNight,
					piloteNightValidity:
						props.placeholder! === "Nuit..."
							? pilotSum === 2 * returnZeroOrValue(e.target.value)
							: pilot.piloteNightValidity,
				}))
			)
		}
	}
	return (
		<div className={`col-md-${props.inputSize}`}>
			<input
				className={`form-control bg-${props.backgroundColor} 
                    text-center text-${props.textColor} 
                    ${props.control.validity ? "is-valid" : "is-invalid"}`}
				type={props.type}
				min={props.min}
				max={props.max}
				placeholder={props.placeholder}
				onChange={hadleInputChange}
				value={props.control.value}
			/>
		</div>
	)
}
