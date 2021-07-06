import React from "react"
import { useHistory } from "react-router"
import { ActionButton } from "../BacisComponents/ActionButton"

export const NewEntryNavBar = (): JSX.Element => {
	const history = useHistory()
	const newFlightClick = () => {
		history.push("/newFlight")
	}
	const newSimpilClick = () => {
		history.push("/newSimpil")
	}
	return (
		<div className='row justify-content-center my-1'>
			<div className='col-md-2'>
				<ActionButton
					buttonColor='primary'
					buttonMarginX={3}
					buttonSize={10}
					buttonThickness='md'
					buttonContent='Vol'
					onClick={newFlightClick}
					disabled={false}
				/>
			</div>
			<div className='col-md-4'></div>
			<div className='col-md-2'>
				<ActionButton
					buttonColor='primary'
					buttonMarginX={3}
					buttonSize={10}
					buttonThickness='md'
					buttonContent='Simpil'
					onClick={newSimpilClick}
					disabled={false}
				/>
			</div>
		</div>
	)
}
