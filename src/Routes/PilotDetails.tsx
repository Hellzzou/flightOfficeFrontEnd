import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import useAsyncEffect from "use-async-effect"
import { INITIAL_PILOTHOURS } from "../datas/pilotDatas"
import { buildPilotsHours } from "../Tools/buildViews"
import { determineColor, getMonthString, worthColor } from "../Tools/math"
import { ActionButton } from "../BacisComponents/ActionButton"
import { sliceArray } from "../Tools/math"
import { Redirect, RouteComponentProps, useHistory } from "react-router"
import { tokenCheck } from "../Tools/user"
import { Navbar } from "../Fieldsets/Navbar"
import { Header } from "../Fieldsets/Header"

export const PilotDetails = ({
	match,
}: RouteComponentProps<{
	lineIndex: string
	pilotIndex: string
}>): JSX.Element => {
	const [toDoThisMonthColor, setToDoThisMonthColor] = useState("dark")
	const [toDoThisMonthNightColor, setToDoThisMonthNightColor] = useState("dark")
	const [daySinceLastFlightColor, setDaySinceLastFlightColor] = useState("dark")
	const [daySinceLatSimpilColor, setDaySinceLatSimpilColor] = useState("dark")
	const [pilotBG, setPilotBG] = useState("light")
	const [pilotView, setPilotView] = useState(INITIAL_PILOTHOURS)
	const history = useHistory()

	const handleClick = () => history.push("/pilotsSummary")

	useAsyncEffect(() => {
		;(async () => {
			const pilotHours = await buildPilotsHours()
			setPilotView(
				sliceArray(pilotHours, 6)[parseInt(match.params.lineIndex)][
					parseInt(match.params.pilotIndex)
				]
			)
		})()
	}, [match.params.lineIndex])

	useEffect(() => {
		setToDoThisMonthColor(
			determineColor(
				pilotView.hoursToDoThisMonthTotal,
				0,
				pilotView.norme.hoursToDo / pilotView.norme.duration
			)
		)
		setToDoThisMonthNightColor(
			determineColor(
				pilotView.hoursToDoThisMonthNight,
				0,
				pilotView.norme.nightToDo / pilotView.norme.duration
			)
		)
		setDaySinceLastFlightColor(
			determineColor(pilotView.lastFlightdate / 1000 / 60 / 60 / 24, 22, 30)
		)
		setDaySinceLatSimpilColor(
			determineColor(pilotView.lastSimpildate / 1000 / 60 / 60 / 24, 22, 30)
		)
		setPilotBG(
			worthColor([
				toDoThisMonthColor,
				toDoThisMonthNightColor,
				daySinceLastFlightColor,
				daySinceLatSimpilColor,
			])
		)
	}, [
		pilotView.hoursToDoThisMonthTotal,
		pilotView.norme.hoursToDo,
		pilotView.norme.duration,
		pilotView.norme.nightToDo,
		pilotView.hoursToDoThisMonthNight,
		pilotView.lastFlightdate,
		pilotView.lastSimpildate,
		toDoThisMonthColor,
		toDoThisMonthNightColor,
		daySinceLastFlightColor,
		daySinceLatSimpilColor,
	])
	return !tokenCheck() ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<div className='row m-2 justify-content-center'>
				<h5 className='text-center fs-2 fw-bold'>
					{getMonthString(new Date().getMonth())}
				</h5>
				<Card className='text-center col-md-10 px-0'>
					<Card.Header className={`bg-${pilotBG}`}>
						<h5 className={"row m-0 fs-2"}>
							<div className='col-md-9 text-start'>{pilotView.name}</div>
							<div className='col-md-3 border-start border-dark m-0 text-center'>
								{pilotView.norme.name}
							</div>
						</h5>
					</Card.Header>
					<Card.Body className='bg-light'>
						<div className='row m-2'>
							<Card className='col-md-3 px-0'>
								<Card.Header className='text-center px-2 fs-6 fw-bold'>
									Heures de vol du mois :
								</Card.Header>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Jour :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.lastMonthDay.toFixed(1)}
									</div>
								</div>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Nuit :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.lastMonthNight.toFixed(1)}
									</div>
								</div>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Total :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.lastMonthTotal.toFixed(1)}
									</div>
								</div>
							</Card>
							<Card className='col-md-3 px-0'>
								<Card.Header className='text-center px-2 fs-6 fw-bold'>
									Heures de simpil du mois :
								</Card.Header>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Total :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.lastMonthSimpilTotal.toFixed(1)}
									</div>
								</div>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Nuit :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.lastMonthSimpilNight.toFixed(1)}
									</div>
								</div>
							</Card>
							<Card className='col-md-3 px-0'>
								<Card.Header className='text-center px-2 fs-6 fw-bold'>
									6 derniers mois :
								</Card.Header>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Total :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.sixLastMonthTotal.toFixed(1)}
									</div>
								</div>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Nuit :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.sixLastMonthNight.toFixed(1)}
									</div>
								</div>
							</Card>
							<Card className='col-md-3 px-0'>
								<Card.Header className='text-center px-2 fs-6 fw-bold'>
									12 derniers mois :
								</Card.Header>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Total :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.twelveLastMonthTotal.toFixed(1)}
									</div>
								</div>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Nuit :</div>
									<div className='col-md-6  m-0 text-center'>
										{pilotView.twelveLAstMonthNight.toFixed(1)}
									</div>
								</div>
							</Card>
						</div>
						<div className='row m-2'>
							<Card className='col-md-6 px-0'>
								<Card.Header className='text-center px-2 fs-6 fw-bold'>
									Heures à faire ce mois :
								</Card.Header>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Total :</div>
									<div
										className={`col-md-6  m-0 text-center text-${toDoThisMonthColor}`}
									>
										{pilotView.hoursToDoThisMonthTotal.toFixed(1)}
									</div>
								</div>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Nuit :</div>
									<div
										className={`col-md-6  m-0 text-center text-${toDoThisMonthNightColor}`}
									>
										{pilotView.hoursToDoThisMonthNight.toFixed(1)}
									</div>
								</div>
							</Card>
							<Card className='col-md-6 px-0'>
								<Card.Header className='text-center px-2 fs-6 fw-bold'>
									Nombre de jours depuis le dernier :
								</Card.Header>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Vol :</div>
									<div
										className={`col-md-6  m-0 text-center text-${daySinceLastFlightColor}`}
									>
										{(pilotView.lastFlightdate / 1000 / 60 / 60 / 24).toFixed(
											0
										)}
									</div>
								</div>
								<div className={"row m-0"}>
									<div className='col-md-6 text-center'>Simpil :</div>
									<div
										className={`col-md-6  m-0 text-center text-${daySinceLatSimpilColor}`}
									>
										{(pilotView.lastSimpildate / 1000 / 60 / 60 / 24).toFixed(
											0
										)}
									</div>
								</div>
							</Card>
						</div>
					</Card.Body>
					<Card.Footer className='p-0'>
						<ActionButton
							buttonColor='danger'
							buttonContent='Retour'
							buttonMarginX={0}
							buttonSize={12}
							buttonThickness=''
							disabled={false}
							onClick={() => handleClick()}
						/>
					</Card.Footer>
				</Card>
			</div>
		</>
	)
}
