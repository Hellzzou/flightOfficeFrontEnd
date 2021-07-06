import { flightToValidate, Simpil, validatedFlight } from "../types/models"
import { bdvView, pilotView } from "../types/views"

export const flightsToBDVView = (
	flights: Array<validatedFlight> | Array<flightToValidate>
): Array<bdvView> => {
	const bdvViewArray = [] as Array<bdvView>
	flights.forEach((flight: validatedFlight | flightToValidate) => {
		bdvViewArray.push({
			id: flight._id,
			effectiveDeparture: new Date(flight.effectiveDeparture).toDateString(),
			CDA: flight.flightPilots[0].pilotName,
			aircraft: flight.aircraft,
			crew: flight.crew,
			mission: flight.mission,
			dayDuration: flight.dayDuration,
			nightDuration: flight.nightDuration,
			totalDuration: flight.totalDuration,
		})
	})
	bdvViewArray.sort(
		(a: { effectiveDeparture: string }, b: { effectiveDeparture: string }) =>
			Date.parse(a.effectiveDeparture) - Date.parse(b.effectiveDeparture)
	)
	return bdvViewArray
}
export const flightsToPilotView = (
	activities: Array<validatedFlight>,
	pilotName: string
): Array<pilotView> => {
	const pilotViewArray = [] as Array<pilotView>
	activities.forEach((activity: validatedFlight) => {
		if (
			activity.flightPilots.find((pilot) => pilot.pilotName === pilotName) !==
			undefined
		) {
			pilotViewArray.push({
				id: activity._id,
				type: "VOL",
				effectiveDeparture: new Date(
					activity.effectiveDeparture
				).toDateString(),
				aircraft: activity.aircraft,
				function:
					activity.flightPilots[0].pilotName === pilotName ? "CDA" : "Pilote",
				crew: activity.crew,
				mission: activity.mission,
				dayDuration: activity.dayDuration,
				nightDuration: activity.nightDuration,
				totalDuration: activity.totalDuration,
			})
		}
	})
	return pilotViewArray
}
export const simpilsToPilotView = (
	activities: Array<Simpil>,
	pilotName: string
): Array<pilotView> => {
	const pilotViewArray = [] as Array<pilotView>
	activities.forEach((activity: Simpil) => {
		if (
			activity.flightPilots.find((pilot) => pilot.pilotName === pilotName) !==
			undefined
		) {
			pilotViewArray.push({
				id: activity._id,
				type: "SIMPIL",
				effectiveDeparture: new Date(
					activity.effectiveDeparture
				).toDateString(),
				aircraft: "/",
				function:
					activity.flightPilots[0].pilotName === pilotName ? "CDA" : "Pilote",
				crew: "/",
				mission: activity.mission,
				dayDuration: activity.dayDuration,
				nightDuration: activity.nightDuration,
				totalDuration: activity.totalDuration,
			})
		}
	})
	return pilotViewArray
}
