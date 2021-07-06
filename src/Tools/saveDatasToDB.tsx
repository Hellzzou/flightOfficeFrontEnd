import { DB_URL } from "../datas/datas"
import { deleteFetchRequest, postFetchRequest } from "./fetch"
import { DecimalRound, returnZeroOrValue } from "./math"
import { control, duration, pilot } from "../types/hooks"

export async function saveNewFlight(
	pilots: Array<pilot>,
	hooks: Array<control>,
	durations: Array<duration>
): Promise<boolean> {
	const flightPilot: {
		pilotName: string
		pilotDay: number
		pilotNight: number
	}[] = []
	pilots.forEach((pilot) => {
		flightPilot.push({
			pilotName: pilot.pilotChoice,
			pilotDay: DecimalRound(returnZeroOrValue(pilot.piloteDay)),
			pilotNight: DecimalRound(returnZeroOrValue(pilot.piloteNight)),
		})
	})
	const flightDurations: { name: string; day: number; night: number }[] = []
	durations.forEach((duration) => {
		flightDurations.push({
			name: duration.title,
			day: DecimalRound(returnZeroOrValue(duration.durationDay)),
			night: DecimalRound(returnZeroOrValue(duration.durationNight)),
		})
	})
	const newFlight = {
		estimatedDeparture: new Date(
			Date.parse(hooks[0].value + " " + hooks[1].value + " GMT")
		),
		effectiveDeparture: new Date(
			Date.parse(hooks[2].value + " " + hooks[3].value + " GMT")
		),
		dayDuration: DecimalRound(returnZeroOrValue(hooks[4].value)),
		nightDuration: DecimalRound(returnZeroOrValue(hooks[5].value)),
		totalDuration:
			DecimalRound(returnZeroOrValue(hooks[4].value)) +
			DecimalRound(returnZeroOrValue(hooks[5].value)),
		belonging: hooks[6].value,
		mission: hooks[7].value,
		flightType: hooks[8].value,
		aircraft: returnZeroOrValue(hooks[9].value),
		crew: hooks[10].value,
		durationType: flightDurations,
		flightPilots: flightPilot,
	}
	const created = await postFetchRequest(DB_URL + "newFlight/save", newFlight)
	console.log(created)
	return created === "success"
}
export async function saveNewSimpil(
	pilots: Array<pilot>,
	hooks: Array<control>
): Promise<boolean> {
	const simpilPilots: {
		pilotName: string
		pilotDay: number
		pilotNight: number
	}[] = []
	pilots.forEach((pilot) =>
		simpilPilots.push({
			pilotName: pilot.pilotChoice,
			pilotDay:
				DecimalRound(parseFloat(pilot.piloteDay)) -
				DecimalRound(parseFloat(pilot.piloteDay) / 3),
			pilotNight: DecimalRound(parseFloat(pilot.piloteDay) / 3),
		})
	)
	const newSimpil = {
		effectiveDeparture: new Date(Date.parse(hooks[0].value + " 00:00 GMT")),
		mission: hooks[1].value,
		dayDuration:
			DecimalRound(parseFloat(hooks[2].value)) -
			DecimalRound(parseFloat(hooks[2].value) / 3),
		nightDuration: DecimalRound(parseFloat(hooks[2].value) / 3),
		totalDuration: DecimalRound(parseFloat(hooks[2].value)),
		flightPilots: simpilPilots,
	}
	const created = await postFetchRequest(DB_URL + "simpil/save", newSimpil)
	return created === "success"
}
export async function saveValidatedFlight(
	hooks: Array<control>,
	durations: Array<duration>,
	pilots: Array<pilot>,
	additionals: Array<control>,
	id: string
): Promise<boolean> {
	const flightPilot: {
		pilotName: string
		pilotDay: number
		pilotNight: number
	}[] = []
	pilots.forEach((pilot) => {
		flightPilot.push({
			pilotName: pilot.pilotChoice,
			pilotDay: DecimalRound(returnZeroOrValue(pilot.piloteDay)),
			pilotNight: DecimalRound(returnZeroOrValue(pilot.piloteNight)),
		})
	})
	const flightDurations: { name: string; day: number; night: number }[] = []
	durations.forEach((duration) => {
		flightDurations.push({
			name: duration.title,
			day: DecimalRound(returnZeroOrValue(duration.durationDay)),
			night: DecimalRound(returnZeroOrValue(duration.durationNight)),
		})
	})
	const validatedFlight = {
		estimatedDeparture: new Date(
			Date.parse(hooks[0].value + " " + hooks[1].value + " GMT")
		),
		effectiveDeparture: new Date(
			Date.parse(hooks[2].value + " " + hooks[3].value + " GMT")
		),
		dayDuration: DecimalRound(returnZeroOrValue(hooks[4].value)),
		nightDuration: DecimalRound(returnZeroOrValue(hooks[5].value)),
		totalDuration:
			DecimalRound(returnZeroOrValue(hooks[4].value)) +
			DecimalRound(returnZeroOrValue(hooks[5].value)),
		belonging: hooks[6].value,
		mission: hooks[7].value,
		flightType: hooks[8].value,
		aircraft: returnZeroOrValue(hooks[9].value),
		crew: hooks[10].value,
		durationType: flightDurations,
		flightPilots: flightPilot,
		group: additionals[0].value,
		client: additionals[1].value,
		manager: additionals[2].value,
		exercice: "",
		done: additionals[3].value,
		cause: additionals[4].value,
		area: additionals[5].value,
	}
	const deleted = await deleteFetchRequest(DB_URL + "newFlight/deleteWithID", {
		id: id,
	})
	const saved = await postFetchRequest(DB_URL + "validatedFlight/save", {
		flight: validatedFlight,
	})
	return deleted === "success" && saved === "success"
}
