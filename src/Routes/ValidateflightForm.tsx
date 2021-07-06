import React, { useState } from "react"
import { ActionButton } from "../BacisComponents/ActionButton"
import { ValidateFieldset } from "../Fieldsets/ValidateFieldset"
import { ConfirmModal } from "../BacisComponents/ConfirmModal"
import { TimingFieldset } from "../Fieldsets/TimingFieldset"
import { MissionFieldset } from "../Fieldsets/MissionFieldset"
import { PiloteFieldset } from "../Fieldsets/PiloteFieldset"
import { DurationFieldset } from "../Fieldsets/DurationFieldset"
import {
	AddPilot,
	formValidity,
	fullfillFlightFormWithFlightToValidate,
} from "../Tools/formTools"
import {
	INITIAL_DURATION_STATE,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_DISABLED_CONTROL,
	INITIAL_PILOTS_STATE,
	INITIAL_TRUE_CONTROL,
	INITIAL_TRUE_DISABLED_CONTROL,
} from "../datas/formDatas"
import useAsyncEffect from "use-async-effect"
import { getFetchRequest, postFetchRequest } from "../Tools/fetch"
import { DB_URL } from "../datas/datas"
import { saveValidatedFlight } from "../Tools/saveDatasToDB"
import { Header } from "../Fieldsets/Header"
import { Navbar } from "../Fieldsets/Navbar"
import { Redirect, useHistory } from "react-router"
import { RouteComponentProps } from "react-router"
import { tokenCheck } from "../Tools/user"

export const ValidateFlightForm = ({
	match,
}: RouteComponentProps<{ id: string }>): JSX.Element => {
	const history = useHistory()
	const [types, setTypes] = useState([] as Array<string>)
	const [pilotList, setPilotList] = useState([] as Array<string>)
	const [estimatedDateOfDeparture, setEstimatedDateOfDeparture] = useState(
		INITIAL_FALSE_CONTROL
	)
	const [estimatedTimeOfDeparture, setEstimatedTimeOfDeparture] = useState(
		INITIAL_FALSE_CONTROL
	)
	const [date, setDate] = useState(INITIAL_FALSE_CONTROL)
	const [departureTime, setDepartureTime] = useState(INITIAL_FALSE_CONTROL)
	const [dayDuration, setDayDuration] = useState(INITIAL_TRUE_CONTROL)
	const [nightDuration, setNightDuration] = useState(INITIAL_TRUE_CONTROL)
	const [belonging, setBelonging] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [mission, setMission] = useState(INITIAL_FALSE_CONTROL)
	const [flightType, setFlightType] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [aircraft, setAircraft] = useState(INITIAL_FALSE_CONTROL)
	const [crew, setCrew] = useState(INITIAL_FALSE_CONTROL)
	const [durations, setDuration] = useState(INITIAL_DURATION_STATE)
	const [pilots, setPilot] = useState(INITIAL_PILOTS_STATE)
	const [group, setGroup] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [client, setClient] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [manager, setManager] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [done, setDone] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [cause, setCause] = useState(INITIAL_TRUE_DISABLED_CONTROL)
	const [area, setArea] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const hooks = [
		estimatedDateOfDeparture,
		estimatedTimeOfDeparture,
		date,
		departureTime,
		dayDuration,
		nightDuration,
		belonging,
		mission,
		flightType,
		aircraft,
		crew,
	]
	const setters = [
		setEstimatedDateOfDeparture,
		setEstimatedTimeOfDeparture,
		setDate,
		setDepartureTime,
		setDayDuration,
		setNightDuration,
		setBelonging,
		setMission,
		setFlightType,
		setAircraft,
		setCrew,
		setDuration,
		setPilot,
		setGroup,
		setClient,
		setManager,
		setDone,
		setCause,
		setArea,
	]
	const additionals = [group, client, manager, done, cause, area]
	const [confirmArray, setConfirmArray] = useState("")
	const [showConfirmModal, setShowConfirmModal] = useState(false)

	const handleAddPilot = () => AddPilot(pilots, setPilot)

	const handleReturnClick = () => history.push("/validateTable")

	const handleConfirmModalOpen = () => {
		setConfirmArray("Etes-vous sûr de vouloir valider ce vol ?")
		setShowConfirmModal(true)
	}
	const handleCloseConfirmModal = () => setShowConfirmModal(false)

	async function validateflight() {
		const savedAndDeleted = await saveValidatedFlight(
			hooks,
			durations,
			pilots,
			additionals,
			match.params.id
		)
		if (savedAndDeleted) {
			setShowConfirmModal(false)
			history.push("/validateTable")
		}
	}

	useAsyncEffect(() => {
		;(async () => {
			const type = await getFetchRequest(DB_URL + "type/getAllTypes")
			const typeArray = [] as Array<string>
			type.forEach((type: { _id: string; name: string }) =>
				typeArray.push(type.name)
			)
			setTypes(typeArray)
			const pilots = await postFetchRequest(DB_URL + "pilot/23F", {
				belonging: "23F",
			})
			const pilotArray = [] as Array<string>
			pilots.forEach((pilot: { name: string }) => pilotArray.push(pilot.name))
			setPilotList(pilotArray)
			if (typeof match.params.id !== "undefined")
				fullfillFlightFormWithFlightToValidate(match.params.id, setters)
		})()
	}, [types.length, pilots.length])

	return !tokenCheck() ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<form action='#' className='row justify-content-center'>
				<div className='row m-1'>
					<TimingFieldset
						estimatedDateOfDeparture={estimatedDateOfDeparture}
						setEstimatedDateOfDeparture={setEstimatedDateOfDeparture}
						date={date}
						setDate={setDate}
						departureTime={departureTime}
						setDepartureTime={setDepartureTime}
						estimatedTimeOfDeparture={estimatedTimeOfDeparture}
						setEstimatedTimeOfDeparture={setEstimatedTimeOfDeparture}
						dayDuration={dayDuration}
						setDayDuration={setDayDuration}
						nightDuration={nightDuration}
						setNightDuration={setNightDuration}
						durations={durations}
						setDuration={setDuration}
						pilots={pilots}
						setPilot={setPilot}
					/>
					<MissionFieldset
						belonging={belonging}
						setBelonging={setBelonging}
						mission={mission}
						setMission={setMission}
						flightType={flightType}
						setFlightType={setFlightType}
						aircraft={aircraft}
						setAircraft={setAircraft}
						crew={crew}
						setCrew={setCrew}
						types={types}
						group={group}
						setGroup={setGroup}
						client={client}
						setClient={setClient}
						manager={manager}
						setManager={setManager}
					/>
				</div>
				<div className='row m-1'>
					<DurationFieldset
						durations={durations}
						setDuration={setDuration}
						dayValueToCompare={dayDuration}
						nightValueToCompare={nightDuration}
					/>
					<PiloteFieldset
						pilotList={pilotList}
						pilots={pilots}
						setPilot={setPilot}
						addPilot={handleAddPilot}
						dayValueToCompare={dayDuration}
						nightValueToCompare={nightDuration}
					/>
				</div>
			</form>
			<ValidateFieldset
				group={group}
				setGroup={setGroup}
				client={client}
				setClient={setClient}
				manager={manager}
				setManager={setManager}
				done={done}
				setDone={setDone}
				cause={cause}
				setCause={setCause}
				area={area}
				setArea={setArea}
			/>
			<div className='row justify-content-center mb-2'>
				<ActionButton
					onClick={handleReturnClick}
					buttonSize={4}
					buttonColor='danger'
					buttonContent='Retour'
					buttonMarginX={1}
					buttonThickness='md'
					disabled={false}
				/>
				<ActionButton
					onClick={handleConfirmModalOpen}
					buttonSize={4}
					buttonColor='primary'
					buttonContent='Valider ce vol'
					buttonMarginX={1}
					buttonThickness='md'
					disabled={!formValidity(hooks, pilots, durations, additionals)}
				/>
			</div>
			<ConfirmModal
				show={showConfirmModal}
				title='Confirmation de validation'
				contents={confirmArray}
				handleClose={handleCloseConfirmModal}
				confirm={validateflight}
			/>
		</>
	)
}
