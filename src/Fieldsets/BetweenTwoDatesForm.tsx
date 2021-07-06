import React from "react"
import { Input } from "../BacisComponents/Input"
import { Label } from "../BacisComponents/Label"
import { BetweenTwoDatesFormProps } from "../types/formsProps"
import { dateIsBeforeNow } from "../Tools/validators"

export const BetweenTwoDatesForm = (
	props: BetweenTwoDatesFormProps
): JSX.Element => {
	return (
		<div className='row justify-content-center m-2 bg-light p-2 border rounded border-dark'>
			<div className='row col-md-4'>
				<Label labelSize={5} title='Date de début : ' />
				<Input
					inputSize={7}
					backgroundColor='dark'
					textColor='light'
					validator={dateIsBeforeNow}
					type='date'
					control={props.startDate}
					setControl={props.setStartDate}
				/>
			</div>
			<div className='row col-md-4'>
				<Label labelSize={5} title='Date de fin : ' />
				<Input
					inputSize={7}
					backgroundColor='dark'
					textColor='light'
					validator={dateIsBeforeNow}
					type='date'
					control={props.endDate}
					setControl={props.setEndDate}
				/>
			</div>
		</div>
	)
}
