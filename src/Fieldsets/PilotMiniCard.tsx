import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { determineColor, worthColor } from "../Tools/math"
import { pilotMiniCardProps } from "../types/basicComponentsProps"
import { ActionButton } from "../BacisComponents/ActionButton"

export const PilotMiniCard = (props: pilotMiniCardProps): JSX.Element => {
	const [toDoThisMonthColor, setToDoThisMonthColor] = useState("dark")
	const [toDoThisMonthNightColor, setToDoThisMonthNightColor] = useState("dark")
	const [daySinceLastFlightColor, setDaySinceLastFlightColor] = useState("dark")
	const [daySinceLatSimpilColor, setDaySinceLatSimpilColor] = useState("dark")
	const [pilotBG, setPilotBG] = useState("light")

	useEffect(() => {
		setToDoThisMonthColor(
			determineColor(
				props.pilotHours.hoursToDoThisMonthTotal,
				0,
				props.pilotHours.norme.hoursToDo / props.pilotHours.norme.duration
			)
		)
		setToDoThisMonthNightColor(
			determineColor(
				props.pilotHours.hoursToDoThisMonthNight,
				0,
				props.pilotHours.norme.nightToDo / props.pilotHours.norme.duration
			)
		)
		setDaySinceLastFlightColor(
			determineColor(
				props.pilotHours.lastFlightdate / 1000 / 60 / 60 / 24,
				22,
				30
			)
		)
		setDaySinceLatSimpilColor(
			determineColor(
				props.pilotHours.lastSimpildate / 1000 / 60 / 60 / 24,
				22,
				30
			)
		)
		setPilotBG(
			worthColor([
				toDoThisMonthColor,
				toDoThisMonthNightColor,
				daySinceLastFlightColor,
				daySinceLatSimpilColor,
			])
		)
	})
	return (
		<Card className='text-center col-md-2 px-0'>
			<Card.Header className='fs-5 p-0'>
				<div className={`row m-0 bg-${pilotBG}`}>
					<div className='col-md-9 text-start'>{props.pilotHours.name}</div>
					<div className='col-md-3 border-start border-dark m-0'>
						{props.pilotHours.norme.name}
					</div>
				</div>
			</Card.Header>
			<Card.Body className='p-2'>
				<div className='row'>
					<div className='col-md-8 text-start'>A faire ce mois :</div>
					<div className={`col-md-4 text-end text-${toDoThisMonthColor}`}>
						{props.pilotHours.hoursToDoThisMonthTotal.toFixed(1)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-8 text-start'>dont nuit :</div>
					<div className={`col-md-4 text-end text-${toDoThisMonthNightColor}`}>
						{props.pilotHours.hoursToDoThisMonthNight.toFixed(1)}
					</div>
				</div>
				<hr className='my-2'></hr>
				<div className='row'>
					<div className='col-md-8 text-start'>Dernier vol :</div>
					<div className={`col-md-4 text-end text-${daySinceLastFlightColor}`}>
						{(props.pilotHours.lastFlightdate / 1000 / 60 / 60 / 24).toFixed(0)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-8 text-start'>Dernier simpil :</div>
					<div className={`col-md-4 text-end text-${daySinceLatSimpilColor}`}>
						{(props.pilotHours.lastSimpildate / 1000 / 60 / 60 / 24).toFixed(0)}
					</div>
				</div>
			</Card.Body>
			<Card.Footer className='p-0'>
				<ActionButton
					buttonColor='primary'
					buttonContent='Détails'
					buttonMarginX={0}
					buttonSize={12}
					buttonThickness='sm'
					disabled={false}
					onClick={() => props.onClick(props.lineIndex, props.pilotIndex)}
				/>
			</Card.Footer>
		</Card>
	)
}
