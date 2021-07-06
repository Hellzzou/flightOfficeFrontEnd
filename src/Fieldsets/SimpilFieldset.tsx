import React from "react"
import { Input } from "../BacisComponents/Input"
import { Label } from "../BacisComponents/Label"
import { Legend } from "../BacisComponents/Legend"
import {
	dateIsBeforeNow,
	durationIsCorrect,
	textLengthIsCorrect,
} from "../Tools/validators"
import { SimpilFieldsetProps } from "../types/fieldsetsProps"

export const SimpilFieldset = (props: SimpilFieldsetProps): JSX.Element => {
	return (
		<div className='col-md-6'>
			<fieldset className='border border-dark text-dark shadow-lg rounded p-1'>
				<Legend title='Horaires' />
				<div className='form-group row m-1'>
					<Label labelSize={4} title='Date :' />
					<Input
						inputSize={8}
						backgroundColor='dark'
						textColor='light'
						validator={dateIsBeforeNow}
						type='date'
						control={props.date}
						setControl={props.setDate}
					/>
				</div>
				<div className='form-group row m-1'>
					<Label labelSize={4} title='Intitulé :' />
					<Input
						inputSize={8}
						backgroundColor='dark'
						textColor='light'
						validator={textLengthIsCorrect}
						type='text'
						control={props.misssion}
						setControl={props.setMission}
						placeholder='Mission...'
					/>
				</div>
				<div className='form-group row m-1'>
					<Label labelSize={4} title='Durée:' />
					<Input
						inputSize={8}
						backgroundColor='dark'
						textColor='light'
						validator={durationIsCorrect}
						type='number'
						control={props.duration}
						setControl={props.setDuration}
						pilots={props.pilots}
						setPilot={props.setPilot}
						placeholder='Durée...'
					/>
				</div>
			</fieldset>
		</div>
	)
}
