import React from "react"
import { manageCauseSelect, manageGroupSelects } from "../Tools/formTools"
import { SelectProps } from "../types/basicComponentsProps"

export const Select = (props: SelectProps): JSX.Element => {
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		props.setControl({
			value: e.target.value,
			validity: props.validator(e.target.value),
			disabled: false,
		})
		if (typeof props.setCause !== "undefined")
			manageCauseSelect(e.target.value, props.setCause, props.cause!.value)
		if (typeof props.setGroup !== "undefined")
			manageGroupSelects(
				e.target.value,
				props.setGroup,
				props.setClient!,
				props.setManager!,
				props.group!.value,
				props.client!.value,
				props.manager!.value
			)
	}
	return (
		<div className={`col-md-${props.selectSize}`}>
			<select
				className={`form-select bg-${props.backgroundColor} 
                    text-${props.textColor} 
                    ${props.control.validity ? "is-valid" : "is-invalid"}`}
				onChange={handleSelectChange}
				value={props.control.value}
				disabled={props.disabled}
			>
				<option>Choix...</option>
				{props.options.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	)
}
