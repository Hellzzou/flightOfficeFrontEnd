import React, { useState } from "react"
import { TimingFieldset } from "../Fieldsets/TimingFieldset"
import { MissionFieldset } from "../Fieldsets/MissionFieldset"
import { DurationFieldset } from "../Fieldsets/DurationFieldset"
import { PiloteFieldset } from "../Fieldsets/PiloteFieldset"
import { ActionButton } from "../BacisComponents/ActionButton"
import {
	AddPilot,
	formValidity,
	getAllPilots,
	getAllTypes,
	resetForm,
} from "../Tools/formTools"
import useAsyncEffect from "use-async-effect"
import { ConfirmModal } from "../BacisComponents/ConfirmModal"
import {
	INITIAL_DURATION_STATE,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_DISABLED_CONTROL,
	INITIAL_FLIGHTFORM_STATE,
	INITIAL_PILOTS_STATE,
	INITIAL_TRUE_CONTROL,
} from "../datas/formDatas"
import { saveNewFlight } from "../Tools/saveDatasToDB"
import { Header } from "../Fieldsets/Header"
import { Navbar } from "../Fieldsets/Navbar"
import { NewEntryNavBar } from "../Fieldsets/NewEntryNavBar"
import { tokenCheck } from "../Tools/user"
import { Redirect } from "react-router"

export const NewFlight = (): JSX.Element => {
	const [showConfirmModal, setShowConfirmModal] = useState(false)
	const [confirmArray, setConfirmArray] = useState("")
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
	const [dayDuration, setDayDuration] = useState({ value: "", validity: true })
	const [nightDuration, setNightDuration] = useState(INITIAL_TRUE_CONTROL)
	const [belonging, setBelonging] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [mission, setMission] = useState(INITIAL_FALSE_CONTROL)
	const [flightType, setFlightType] = useState(INITIAL_FALSE_DISABLED_CONTROL)
	const [aircraft, setAircraft] = useState(INITIAL_FALSE_CONTROL)
	const [crew, setCrew] = useState(INITIAL_FALSE_CONTROL)
	const [durations, setDuration] = useState(INITIAL_DURATION_STATE)
	const [pilots, setPilot] = useState(INITIAL_PILOTS_STATE)
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
	]

	const handleCloseConfirmModal = () => setShowConfirmModal(false)

	const handleConfirmModalOpen = () => {
		setShowConfirmModal(true)
		setConfirmArray(
			"Confirmer l'enregistrement du vol du " +
				new Date(date.value).toLocaleDateString() +
				" de l'équipage " +
				crew.value +
				" d'une durée de " +
				(
					parseFloat(dayDuration.value) + parseFloat(nightDuration.value)
				).toFixed(1)
		)
	}

	const handleAddPilot = () => AddPilot(pilots, setPilot)

	async function createNewFlight(): Promise<void> {
		const savenewFlight = await saveNewFlight(pilots, hooks, durations)
		if (savenewFlight) {
			setShowConfirmModal(false)
			resetForm(setters, INITIAL_FLIGHTFORM_STATE)
		}
	}
	useAsyncEffect(() => {
		;(async () => {
			const types = await getAllTypes()
			setTypes(types)
			const pilots = await getAllPilots()
			setPilotList(pilots)
		})()
	}, [pilots.length, types.length])

	return !tokenCheck() ? (
		<Redirect to='/' />
	) : (
		<div>
			<Header />
			<Navbar />
			<NewEntryNavBar />
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
				<ActionButton
					buttonSize={6}
					buttonThickness='lg'
					buttonColor='primary'
					buttonMarginX={3}
					buttonContent='Enregistrer ce vol'
					onClick={handleConfirmModalOpen}
					disabled={!formValidity(hooks, pilots, durations)}
					buttonDisplay={""}
				/>
			</form>
			<ConfirmModal
				show={showConfirmModal}
				handleClose={handleCloseConfirmModal}
				title="Confirmation d'enregistrement"
				contents={confirmArray}
				confirm={createNewFlight}
			/>
		</div>
	)
}
