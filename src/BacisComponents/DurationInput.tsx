/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React from "react"
import { returnZeroOrValue } from "../Tools/math"
import { DurationInputProps } from "../types/basicComponentsProps"

export const DurationInput = (props: DurationInputProps): JSX.Element => {
	const hadleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let sum = 0
		props.durations.forEach((duration) => {
			if (props.durations.indexOf(duration) !== props.index) {
				const addValue =
					props.placeholder! === "Jour..."
						? returnZeroOrValue(duration.durationDay)
						: returnZeroOrValue(duration.durationNight)
				sum += addValue
			}
		})
		sum += returnZeroOrValue(e.target.value)
		props.setDuration(
			props.durations.map((duration) => ({
				title: duration.title,
				durationDay:
					props.placeholder! === "Jour..." &&
					props.durations.indexOf(duration) === props.index
						? e.target.value
						: duration.durationDay,
				durationDayValidity:
					props.placeholder! === "Jour..."
						? sum === parseFloat(props.valueToCompare!.value)
						: duration.durationDayValidity,
				durationNight:
					props.placeholder! === "Nuit..." &&
					props.durations.indexOf(duration) === props.index
						? e.target.value
						: duration.durationNight,
				durationNightValidity:
					props.placeholder! === "Nuit..."
						? sum === parseFloat(props.valueToCompare!.value)
						: duration.durationNightValidity,
			}))
		)
	}
	return (
		<div className={`col-md-${props.inputSize}`}>
			<input
				className={`form-control bg-${props.backgroundColor} text-center text-${
					props.textColor
				} ${
					props.placeholder! === "Jour..."
						? props.durations[props.index].durationDayValidity
							? "is-valid"
							: "is-invalid"
						: props.durations[props.index].durationNightValidity
						? "is-valid"
						: "is-invalid"
				}`}
				type={props.type}
				min={props.min}
				max={props.max}
				placeholder={props.placeholder}
				onChange={hadleInputChange}
				value={
					props.placeholder! === "Jour..."
						? props.durations[props.index].durationDay
						: props.durations[props.index].durationNight
				}
			/>
		</div>
	)
}
