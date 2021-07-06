import React from "react"
import { Label } from "../BacisComponents/Label"
import { Legend } from "../BacisComponents/Legend"
import { Select } from "../BacisComponents/Select"
import { selectChoiceIsDone } from "../Tools/validators"
import { ValidateFieldsetProps } from "../types/formsProps"

// props : display,

const GROUP_OPTIONS = ["101", "202", "303"]
const CLIENT_OPTIONS = ["23F", "21F", "CCLAN"]
const MANAGER_OPTIONS = ["23F", "21F", "CCLAN"]
const DONE_OPTIONS = ["ME", "MNE", "MPE"]
const CAUSE_OPTIONS = ["TECH", "MTO", "OPS", "REPROG"]
const AREA_OPTIONS = ["France atlantique", "Frnce méditerrannée", "Niger"]

export const ValidateFieldset = (props: ValidateFieldsetProps): JSX.Element => {
	return (
		<form action='#' className='m-2'>
			<div>
				<fieldset className='bg-warning border border-dark text-dark shadow-lg rounded p-1'>
					<Legend title='A remplir par le BDV' />
					<div className='form-group row m-1'>
						<Label labelSize={2} title='Groupe : ' />
						<Select
							selectSize={2}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							options={GROUP_OPTIONS}
							control={props.group}
							setControl={props.setGroup}
							disabled={props.group.disabled}
						/>
						<Label labelSize={2} title='Client : ' />
						<Select
							selectSize={2}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							options={CLIENT_OPTIONS}
							control={props.client}
							setControl={props.setClient}
							disabled={props.group.disabled}
						/>
						<Label labelSize={2} title='Gest : ' />
						<Select
							selectSize={2}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							options={MANAGER_OPTIONS}
							control={props.manager}
							setControl={props.setManager}
							disabled={props.group.disabled}
						/>
					</div>
					<div className='form-group row m-1'>
						<Label labelSize={2} title='Effectué : ' />
						<Select
							selectSize={2}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							options={DONE_OPTIONS}
							control={props.done}
							setControl={props.setDone}
							cause={props.cause}
							setCause={props.setCause}
							disabled={false}
						/>
						<Label labelSize={2} title='Cause : ' />
						<Select
							selectSize={2}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							options={CAUSE_OPTIONS}
							control={props.cause}
							setControl={props.setCause}
							disabled={props.cause.disabled}
						/>
						<Label labelSize={2} title='Zone : ' />
						<Select
							selectSize={2}
							backgroundColor='dark'
							textColor='light'
							validator={selectChoiceIsDone}
							options={AREA_OPTIONS}
							control={props.area}
							setControl={props.setArea}
							disabled={false}
						/>
					</div>
				</fieldset>
			</div>
		</form>
	)
}
