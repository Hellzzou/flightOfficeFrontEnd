import React from "react"
import { Legend } from "../BacisComponents/Legend"
import { Label } from "../BacisComponents/Label"
import { Input } from "../BacisComponents/Input"
import {
	dateIsBeforeNow,
	durationIsCorrect,
	timeIsCorrect,
} from "../Tools/validators"
import { timingFieldsetProps } from "../types/fieldsetsProps"

export const TimingFieldset = (props: timingFieldsetProps): JSX.Element => (
	<div className='col-md-6'>
		<fieldset className='border border-dark text-dark shadow-lg rounded p-1'>
			<Legend title='Horaires en Zulu' />
			<div className='form-group row m-1'>
				<Label labelSize={4} title='Décollage prévu :' />
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={dateIsBeforeNow}
					type='date'
					control={props.estimatedDateOfDeparture}
					setControl={props.setEstimatedDateOfDeparture}
				/>
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={timeIsCorrect}
					type='time'
					control={props.estimatedTimeOfDeparture}
					setControl={props.setEstimatedTimeOfDeparture}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label labelSize={4} title='Décollage réel :' />
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={dateIsBeforeNow}
					type='date'
					control={props.date}
					setControl={props.setDate}
				/>
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={timeIsCorrect}
					type='time'
					control={props.departureTime}
					setControl={props.setDepartureTime}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label labelSize={4} title='Durée :' />
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={durationIsCorrect}
					type='number'
					placeholder='Jour...'
					control={props.dayDuration}
					setControl={props.setDayDuration}
					durations={props.durations}
					setDuration={props.setDuration}
					pilots={props.pilots}
					setPilot={props.setPilot}
				/>
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={durationIsCorrect}
					type='number'
					placeholder='Nuit...'
					control={props.nightDuration}
					setControl={props.setNightDuration}
					durations={props.durations}
					setDuration={props.setDuration}
					pilots={props.pilots}
					setPilot={props.setPilot}
				/>
			</div>
		</fieldset>
	</div>
)
