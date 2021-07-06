import React from "react"
import { Legend } from "../BacisComponents/Legend"
import { Label } from "../BacisComponents/Label"
import { Input } from "../BacisComponents/Input"
import { Select } from "../BacisComponents/Select"
import {
	aircraftIsCorrect,
	crewIsCorrect,
	selectChoiceIsDone,
	textLengthIsCorrect,
} from "../Tools/validators"
import { MissionFieldsetProps } from "../types/fieldsetsProps"

const flightBelongingOptions = ["VOL 23F", "VOL HORS 23F"]
export const MissionFieldset = (props: MissionFieldsetProps): JSX.Element => (
	<div className='col-md-6'>
		<fieldset className='border border-dark text-dark shadow-lg rounded p-1'>
			<Legend title='Mission' />
			<div className='form-group row m-1'>
				<Label labelSize={4} title='Appartenance :' />
				<Select
					selectSize={8}
					backgroundColor='dark'
					textColor='light'
					validator={selectChoiceIsDone}
					options={flightBelongingOptions}
					control={props.belonging}
					setControl={props.setBelonging}
					disabled={false}
					group={props.group}
					setGroup={props.setGroup}
					client={props.client}
					setClient={props.setClient}
					manager={props.manager}
					setManager={props.setManager}
				/>
			</div>
			<div className='form-group row m-1'>
				<Label labelSize={4} title='Type / Intitulé :' />
				<Select
					selectSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={selectChoiceIsDone}
					options={props.types}
					control={props.flightType}
					setControl={props.setFlightType}
					disabled={false}
				/>
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={textLengthIsCorrect}
					type='text'
					min={1}
					max={15}
					control={props.mission}
					setControl={props.setMission}
					placeholder='Description...'
				/>
			</div>
			<div className='form-group row m-1'>
				<Label labelSize={4} title='Aéronef / Equipage :' />
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={aircraftIsCorrect}
					type='text'
					control={props.aircraft}
					setControl={props.setAircraft}
					placeholder='Numéro...'
				/>
				<Input
					inputSize={4}
					backgroundColor='dark'
					textColor='light'
					validator={crewIsCorrect}
					type='text'
					control={props.crew}
					setControl={props.setCrew}
					placeholder='Equipage...'
				/>
			</div>
		</fieldset>
	</div>
)
