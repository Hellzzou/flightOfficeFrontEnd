import React, { useState } from "react"
import { ActionButton } from "../BacisComponents/ActionButton"
import { ConfirmModal } from "../BacisComponents/ConfirmModal"
import { SimpilFieldset } from "../Fieldsets/SimpilFieldset"
import { SimpilPiloteFieldset } from "../Fieldsets/SimpilPilotFieldset"
import {
	AddPilot,
	formValidity,
	getAllPilots,
	resetForm,
} from "../Tools/formTools"
import { INITIAL_PILOTS_STATE } from "../datas/formDatas"
import { INITIAL_SIMPILFORM_STATES } from "../datas/formDatas"
import useAsyncEffect from "use-async-effect"
import { saveNewSimpil } from "../Tools/saveDatasToDB"
import { Navbar } from "../Fieldsets/Navbar"
import { Header } from "../Fieldsets/Header"
import { NewEntryNavBar } from "../Fieldsets/NewEntryNavBar"
import { tokenCheck } from "../Tools/user"
import { Redirect } from "react-router-dom"

export const NewSimpil = (): JSX.Element => {
	const [pilotList, setPilotList] = useState([] as Array<string>)
	const [showConfirmModal, setShowConfirmModal] = useState(false)
	const [confirmArray, setConfirmArray] = useState("")
	const [date, setDate] = useState({ value: "", validity: false })
	const [mission, setMission] = useState({ value: "", validity: false })
	const [duration, setDuration] = useState({ value: "", validity: false })
	const [pilots, setPilot] = useState(INITIAL_PILOTS_STATE)
	const hooks = [date, mission, duration]
	const setters = [setDate, setMission, setDuration, setPilot]

	const handleCloseConfirmModal = () => setShowConfirmModal(false)

	const handleConfirmModalOpen = () => {
		setShowConfirmModal(true)
		setConfirmArray(
			"Confirmer l'enregistrement du simpil du " +
				new Date(date.value).toLocaleDateString() +
				" d'une durée de " +
				parseFloat(duration.value).toFixed(1)
		)
	}

	const handleAddPilot = () => AddPilot(pilots, setPilot)

	const createNewSimpil = () => {
		if (saveNewSimpil(pilots, hooks)) {
			setShowConfirmModal(false)
			resetForm(setters, INITIAL_SIMPILFORM_STATES)
		}
	}
	useAsyncEffect(() => {
		;(async () => {
			const pilots = await getAllPilots()
			setPilotList(pilots)
		})()
	}, [pilotList.length])

	return !tokenCheck() ? (
		<Redirect to='/' />
	) : (
		<div>
			<Header />
			<Navbar />
			<NewEntryNavBar />
			<form action='#' className='row justify-content-center'>
				<div className='row m-1'>
					<SimpilFieldset
						date={date}
						setDate={setDate}
						misssion={mission}
						setMission={setMission}
						duration={duration}
						setDuration={setDuration}
						pilots={pilots}
						setPilot={setPilot}
					/>
					<SimpilPiloteFieldset
						pilotList={pilotList}
						pilots={pilots}
						setPilot={setPilot}
						addPilot={handleAddPilot}
						dayValueToCompare={duration}
					/>
				</div>
				<ActionButton
					buttonSize={6}
					buttonThickness='lg'
					buttonColor='primary'
					buttonMarginX={3}
					buttonContent='Enregistrer ce simpil'
					onClick={handleConfirmModalOpen}
					disabled={!formValidity(hooks, pilots)}
				/>
			</form>
			<ConfirmModal
				show={showConfirmModal}
				title="Confirmation d'enregistrement"
				contents={confirmArray}
				handleClose={handleCloseConfirmModal}
				confirm={createNewSimpil}
			/>
		</div>
	)
}
