import React from "react"
import { Legend } from "../BacisComponents/Legend"
import { Label } from "../BacisComponents/Label"
import { PilotInput } from "../BacisComponents/PilotInput"
import { PilotSelect } from "../BacisComponents/PilotSelect"
import { ActionButton } from "../BacisComponents/ActionButton"
import { durationIsCorrect, selectChoiceIsDone } from "../Tools/validators"
import { PiloteFieldsetProps } from "../types/fieldsetsProps"

export const PiloteFieldset = (props: PiloteFieldsetProps): JSX.Element => {
	return (
		<div className='col-md-6'>
			<fieldset className='border border-dark text-dark shadow-lg rounded p-1'>
				<Legend title='Heures par pilote' />
				{props.pilots.map((pilot) => (
					<div key={props.pilots.indexOf(pilot)} className='form-group row m-1'>
						<Label labelSize={3} title={pilot.title} />
						<PilotSelect
							selectSize={3}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							index={props.pilots.indexOf(pilot)}
							pilots={props.pilots}
							setControl={props.setPilot}
							options={props.pilotList}
						/>
						<PilotInput
							inputSize={3}
							backgroundColor='dark'
							textColor='light'
							validator={durationIsCorrect}
							index={props.pilots.indexOf(pilot)}
							pilots={props.pilots}
							setControl={props.setPilot}
							valueToCompare={props.dayValueToCompare}
							type='number'
							placeholder='Jour...'
						/>
						<PilotInput
							inputSize={3}
							backgroundColor='dark'
							textColor='light'
							validator={durationIsCorrect}
							index={props.pilots.indexOf(pilot)}
							pilots={props.pilots}
							setControl={props.setPilot}
							valueToCompare={props.nightValueToCompare}
							type='number'
							placeholder='Nuit...'
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
