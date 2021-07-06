import { DB_URL } from "../datas/datas"
import { getFetchRequest, postFetchRequest } from "./fetch"
import { control, disableControl, duration, pilot } from "../types/hooks"

export function formValidity(
	hooks: Array<control>,
	pilots?: Array<pilot>,
	durations?: Array<duration>,
	additionals?: Array<control>
): boolean {
	let validity = true
	hooks.forEach((hook) => (validity = validity && hook.validity))
	durations?.forEach(
		(duration) =>
			(validity =
				validity &&
				duration.durationDayValidity &&
				duration.durationNightValidity)
	)
	pilots?.forEach(
		(pilot) =>
			(validity =
				validity &&
				pilot.pilotChoiceValidity &&
				pilot.piloteDayValidity &&
				pilot.piloteNightValidity)
	)
	additionals?.forEach(
		(additional) => (validity = validity && additional.validity)
	)
	return validity
}
export const resetForm = (
	setters: Array<React.Dispatch<React.SetStateAction<any>>>,
	initialState: Array<any>
): void => {
	for (let i = 0; i < setters.length; i++) setters[i](initialState[i])
}
export const AddPilot = (
	pilots: Array<pilot>,
	setPilot: React.Dispatch<React.SetStateAction<Array<pilot>>>
): void => {
	const newPilot = {
		title: "pilote :",
		pilotChoice: "",
		pilotChoiceValidity: false,
		piloteDay: "",
		piloteDayValidity: true,
		piloteNight: "",
		piloteNightValidity: true,
	}
	setPilot([...pilots, newPilot])
}
export async function fullfillFlightFormWithFlightToValidate(
	dataToValidate: string,
	setters: Array<React.Dispatch<React.SetStateAction<any>>>
): Promise<void> {
	const flightToValidate = await postFetchRequest(DB_URL + "newFlight/find", {
		id: dataToValidate,
	})
	const pilots = []
	pilots.push({
		title: "CDA :",
		pilotChoice: flightToValidate.flightPilots[0].pilotName,
		pilotChoiceValidity: true,
		piloteDay: flightToValidate.flightPilots[0].pilotDay.toString(),
		piloteDayValidity: true,
		piloteNight: flightToValidate.flightPilots[0].pilotNight.toString(),
		piloteNightValidity: true,
	})
	for (let i = 1; i < flightToValidate.flightPilots.length; i++) {
		pilots.push({
			title: "pilote :",
			pilotChoice: flightToValidate.flightPilots[i].pilotName,
			pilotChoiceValidity: true,
			piloteDay: flightToValidate.flightPilots[i].pilotDay.toString(),
			piloteDayValidity: true,
			piloteNight: flightToValidate.flightPilots[i].pilotNight.toString(),
			piloteNightValidity: true,
		})
	}
	const durations = []
	for (let i = 0; i < flightToValidate.durationType.length; i++) {
		durations.push({
			title: flightToValidate.durationType[i].name,
			durationDay: flightToValidate.durationType[i].day.toString(),
			durationDayValidity: true,
			durationNight: flightToValidate.durationType[i].night.toString(),
			durationNightValidity: true,
		})
	}
	setters[0]({
		value: flightToValidate.estimatedDeparture.split("T")[0],
		validity: true,
	})
	setters[1]({
		value: flightToValidate.estimatedDeparture.split("T")[1].split("Z")[0],
		validity: true,
	})
	setters[2]({
		value: flightToValidate.effectiveDeparture.split("T")[0],
		validity: true,
	})
	setters[3]({
		value: flightToValidate.effectiveDeparture.split("T")[1].split("Z")[0],
		validity: true,
	})
	setters[4]({ value: flightToValidate.dayDuration, validity: true })
	setters[5]({ value: flightToValidate.nightDuration, validity: true })
	setters[6]({ value: flightToValidate.belonging, validity: true })
	setters[7]({ value: flightToValidate.mission, validity: true })
	setters[8]({ value: flightToValidate.flightType, validity: true })
	setters[9]({ value: flightToValidate.aircraft, validity: true })
	setters[10]({ value: flightToValidate.crew, validity: true })
	setters[11](durations)
	setters[12](pilots)
}
export async function fullfillFlightFormWithValidatedFlight(
	dataToValidate: string,
	setters: Array<React.Dispatch<React.SetStateAction<any>>>
): Promise<void> {
	const validatedFlight = await postFetchRequest(
		DB_URL + "validatedFlight/find",
		{ id: dataToValidate }
	)
	const pilots = []
	pilots.push({
		title: "CDA :",
		pilotChoice: validatedFlight.flightPilots[0].pilotName,
		pilotChoiceValidity: true,
		piloteDay: validatedFlight.flightPilots[0].pilotDay.toString(),
		piloteDayValidity: true,
		piloteNight: validatedFlight.flightPilots[0].pilotNight.toString(),
		piloteNightValidity: true,
	})
	for (let i = 1; i < validatedFlight.flightPilots.length; i++) {
		pilots.push({
			title: "pilote :",
			pilotChoice: validatedFlight.flightPilots[i].pilotName,
			pilotChoiceValidity: true,
			piloteDay: validatedFlight.flightPilots[i].pilotDay.toString(),
			piloteDayValidity: true,
			piloteNight: validatedFlight.flightPilots[i].pilotNight.toString(),
			piloteNightValidity: true,
		})
	}
	const durations = []
	for (let i = 0; i < validatedFlight.durationType.length; i++) {
		durations.push({
			title: validatedFlight.durationType[i].name,
			durationDay: validatedFlight.durationType[i].day.toString(),
			durationDayValidity: true,
			durationNight: validatedFlight.durationType[i].night.toString(),
			durationNightValidity: true,
		})
	}
	setters[0]({
		value: validatedFlight.estimatedDeparture.split("T")[0],
		validity: true,
	})
	setters[1]({
		value: validatedFlight.estimatedDeparture.split("T")[1].split("Z")[0],
		validity: true,
	})
	setters[2]({
		value: validatedFlight.effectiveDeparture.split("T")[0],
		validity: true,
	})
	setters[3]({
		value: validatedFlight.effectiveDeparture.split("T")[1].split("Z")[0],
		validity: true,
	})
	setters[4]({ value: validatedFlight.dayDuration, validity: true })
	setters[5]({ value: validatedFlight.nightDuration, validity: true })
	setters[6]({ value: validatedFlight.belonging, validity: true })
	setters[7]({ value: validatedFlight.mission, validity: true })
	setters[8]({ value: validatedFlight.flightType, validity: true })
	setters[9]({ value: validatedFlight.aircraft, validity: true })
	setters[10]({ value: validatedFlight.crew, validity: true })
	setters[11](durations)
	setters[12](pilots)
	setters[13]({
		value:
			validatedFlight.belonging === "VOL 23F"
				? validatedFlight.group
				: "Choix...",
		validity: true,
		disabled: validatedFlight.belonging === "VOL 23F" ? false : true,
	})
	setters[14]({
		value:
			validatedFlight.belonging === "VOL 23F"
				? validatedFlight.client
				: "Choix...",
		validity: true,
		disabled: validatedFlight.belonging === "VOL 23F" ? false : true,
	})
	setters[15]({
		value:
			validatedFlight.belonging === "VOL 23F"
				? validatedFlight.manager
				: "Choix...",
		validity: true,
		disabled: validatedFlight.belonging === "VOL 23F" ? false : true,
	})
	setters[16]({ value: validatedFlight.done, validity: true })
	setters[17]({
		value: validatedFlight.done !== "ME" ? validatedFlight.cause : "Choix...",
		validity: true,
		disabled: validatedFlight.belonging === "ME" ? false : true,
	})
	setters[18]({ value: validatedFlight.area, validity: true })
}
export const manageCauseSelect = (
	event: string,
	setCause: React.Dispatch<React.SetStateAction<disableControl>>,
	causeValue: string
): void => {
	if (event === "ME" || event === "Choix...") {
		setCause({
			value: "Choix...",
			validity: true,
			disabled: true,
		})
	} else {
		setCause({
			value: causeValue,
			validity: false,
			disabled: false,
		})
	}
}
export const manageGroupSelects = (
	event: string,
	setGroup: React.Dispatch<React.SetStateAction<disableControl>>,
	setClient: React.Dispatch<React.SetStateAction<disableControl>>,
	setManager: React.Dispatch<React.SetStateAction<disableControl>>,
	groupValue: string,
	clientValue: string,
	managerValue: string
): void => {
	if (event !== "VOL 23F") {
		setGroup({ value: "Choix...", validity: true, disabled: true })
		setClient({ value: "Choix...", validity: true, disabled: true })
		setManager({ value: "Choix...", validity: true, disabled: true })
	} else {
		setGroup({ value: groupValue, validity: false, disabled: false })
		setClient({ value: clientValue, validity: false, disabled: false })
		setManager({ value: managerValue, validity: false, disabled: false })
	}
}
export async function getAllTypes(): Promise<Array<string>> {
	const type = await getFetchRequest(DB_URL + "type/getAllTypes")
	const typeArray = [] as Array<string>
	type.forEach((type: { _id: string; name: string }) =>
		typeArray.push(type.name)
	)
	return typeArray
}
export async function getAllPilots(): Promise<Array<string>> {
	const pilots = await postFetchRequest(DB_URL + "pilot/23F", {
		belonging: "23F",
	})
	const pilotArray = [] as Array<string>
	pilots.forEach((pilot: { name: string }) => pilotArray.push(pilot.name))
	return pilotArray
}
