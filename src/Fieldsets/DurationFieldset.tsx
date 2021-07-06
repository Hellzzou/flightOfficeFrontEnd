import React from "react"
import { Legend } from "../BacisComponents/Legend"
import { Label } from "../BacisComponents/Label"
import { durationIsCorrect } from "../Tools/validators"
import { DurationFieldsetProps } from "../types/fieldsetsProps"
import { DurationInput } from "../BacisComponents/DurationInput"

export const DurationFieldset = (props: DurationFieldsetProps): JSX.Element => (
	<div className='col-md-6'>
		<fieldset className='border border-dark text-dark shadow-lg rounded p-1'>
			<Legend title='Régime de vol' />
			{props.durations.map((duration) => (
				<div
					key={props.durations.indexOf(duration)}
					className='form-group row m-1'
				>
					<Label labelSize={4} title={duration.title} />
					<DurationInput
						inputSize={4}
						backgroundColor='dark'
						textColor='light'
						validator={durationIsCorrect}
						type='number'
						index={props.durations.indexOf(duration)}
						durations={props.durations}
						setDuration={props.setDuration}
						valueToCompare={props.dayValueToCompare}
						placeholder='Jour...'
					/>
					<DurationInput
						inputSize={4}
						backgroundColor='dark'
						textColor='light'
						validator={durationIsCorrect}
						type='number'
						index={props.durations.indexOf(duration)}
						durations={props.durations}
						setDuration={props.setDuration}
						valueToCompare={props.nightValueToCompare}
						placeholder='Nuit...'
					/>
				</div>
			))}
		</fieldset>
	</div>
)
