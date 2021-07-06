import React from "react"
import { Legend } from "../BacisComponents/Legend"
import { Label } from "../BacisComponents/Label"
import { PilotInput } from "../BacisComponents/PilotInput"
import { PilotSelect } from "../BacisComponents/PilotSelect"
import { ActionButton } from "../BacisComponents/ActionButton"
import { durationIsCorrect, selectChoiceIsDone } from "../Tools/validators"
import { PiloteFieldsetProps } from "../types/fieldsetsProps"

export const SimpilPiloteFieldset = (
	props: PiloteFieldsetProps
): JSX.Element => {
	return (
		<div className='col-md-6'>
			<fieldset
				id='flightPilotesFieldset'
				className='border border-dark text-dark shadow-lg rounded p-1'
			>
				<Legend title='Heures par pilote' />
				{props.pilots.map((pilot) => (
					<div key={props.pilots.indexOf(pilot)} className='form-group row m-1'>
						<Label labelSize={4} title={pilot.title} />
						<PilotSelect
							selectSize={4}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							index={props.pilots.indexOf(pilot)}
							pilots={props.pilots}
							setControl={props.setPilot}
							options={props.pilotList}
						/>
						<PilotInput
							inputSize={4}
							backgroundColor='dark'
							textColor='light'
							validator={durationIsCorrect}
							index={props.pilots.indexOf(pilot)}
							pilots={props.pilots}
							setControl={props.setPilot}
							valueToCompare={props.dayValueToCompare}
							type='number'
							placeholder='Durée...'
						/>
					</div>
				))}
				<div className='form-group row m-1 justify-content-center'>
					<ActionButton
						buttonSize={6}
						buttonThickness='md'
						buttonColor='primary'
						buttonMarginX={3}
						buttonContent='Insérer un nouveau pilote'
						onClick={props.addPilot}
						disabled={false}
					/>
				</div>
			</fieldset>
		</div>
	)
}
