import { DB_URL } from "../datas/datas"
import { getFetchRequest, postFetchRequest } from "./fetch"
import { getDateNumber, getMonthNumber } from "./math"
import { flightsToPilotView, simpilsToPilotView } from "./transformers"
import {
	activityView,
	pilotHoursView,
	pilotView,
	sumsView,
} from "../types/views"
import { Simpil, validatedFlight } from "../types/models"

export const buildSquadronFlights = (
	flights: Array<validatedFlight>
): Array<activityView> => {
	const squadronFlights = [] as Array<activityView>
	flights.forEach((flight) => {
		if (flight.belonging === "VOL 23F")
			squadronFlights.push({
				effectiveDeparture: new Date(flight.effectiveDeparture).toDateString(),
				aircraft: flight.aircraft,
				CDA: flight.flightPilots[0].pilotName,
				crew: flight.crew,
				mission: flight.mission,
				done: flight.done,
				cause: flight.cause,
				group: flight.group,
				client: flight.client,
				manager: flight.manager,
				dayDuration: flight.dayDuration,
				nightDuration: flight.nightDuration,
				totalDuration: flight.totalDuration,
			})
	})
	squadronFlights.sort(
		(a, b) =>
			Date.parse(a.effectiveDeparture) - Date.parse(b.effectiveDeparture)
	)
	return squadronFlights
}
export async function buildMyHours(
	pilotName: string,
	startDate: Date,
	endDate: Date
): Promise<Array<pilotView>> {
	const flights = await postFetchRequest(DB_URL + "validatedFlight/byDate", {
		startDate: startDate,
		endDate: endDate,
	})
	const simpils = await postFetchRequest(DB_URL + "simpil/byDate", {
		startDate: startDate,
		endDate: endDate,
	})
	const pilotViewActivities = [
		...flightsToPilotView(flights, pilotName),
		...simpilsToPilotView(simpils, pilotName),
	]
	pilotViewActivities.sort(
		(a, b) =>
			Date.parse(a.effectiveDeparture) - Date.parse(b.effectiveDeparture)
	)
	return pilotViewActivities
}
export const sumActivities = (
	myHours: Array<pilotView> | Array<activityView>
): sumsView => {
	const sums = {
		flights: { day: 0, night: 0, total: 0 },
		simpils: { day: 0, night: 0, total: 0 },
	}
	myHours.forEach((activity: pilotView | validatedFlight | activityView) => {
		if (typeof activity.effectiveDeparture !== "undefined") {
			sums.flights.day += activity.dayDuration
			sums.flights.night += activity.nightDuration
			sums.flights.total += activity.totalDuration
		} else {
			sums.simpils.day += activity.totalDuration - activity.nightDuration
			sums.simpils.night += activity.nightDuration
			sums.simpils.total += activity.totalDuration
		}
	})
	return sums
}
export async function buildPilotsHours(): Promise<Array<pilotHoursView>> {
	const normes = await getFetchRequest(DB_URL + "norm/getAllNorms")
	const normeDuration = normes[0].duration - 1
	const pilotsHours = [] as Array<pilotHoursView>
	const lastMonthDate = new Date(
		Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0)
	)
	const sixLastMonthsDate = new Date(
		Date.UTC(
			new Date().getFullYear(),
			new Date().getMonth() - normeDuration,
			1,
			0,
			0,
			0
		)
	)
	const twelveLastMonthsDate = new Date(
		Date.UTC(new Date().getFullYear(), new Date().getMonth() - 11, 1, 0, 0, 0)
	)
	const today = new Date(
		Date.UTC(
			new Date().getFullYear(),
			new Date().getMonth(),
			new Date().getDate(),
			0,
			0,
			0
		)
	)
	const pilots = await postFetchRequest(DB_URL + "pilot/23F", {
		belonging: "23F",
	})
	const twelveLastMonthsFlights = await postFetchRequest(
		DB_URL + "validatedFlight/byDate",
		{ startDate: twelveLastMonthsDate, endDate: today }
	)
	const sixLastMonthsSimpils = await postFetchRequest(
		DB_URL + "simpil/byDate",
		{ startDate: sixLastMonthsDate, endDate: today }
	)
	for (let i = 0; i < pilots.length; i++) {
		const normeHours = await postFetchRequest(DB_URL + "norm/find", {
			name: pilots[i].norme,
		})
		pilotsHours[i] = {
			crew: pilots[i].crew,
			name: pilots[i].name,
			norme: normeHours[0],
			lastMonthDay: 0,
			lastMonthNight: 0,
			lastMonthTotal: 0,
			lastMonthSimpilTotal: 0,
			lastMonthSimpilNight: 0,
			sixLastMonthTotal: 0,
			sixLastMonthNight: 0,
			sixLastMonthTotalSimpil: 0,
			sixLastMonthNightSimpil: 0,
			twelveLastMonthTotal: 0,
			twelveLAstMonthNight: 0,
			hoursToDoThisMonthTotal: normeHours[0].hoursToDo,
			hoursToDoThisMonthNight: normeHours[0].nightToDo,
			lastFlightdate: Date.parse(new Date(1970, 1, 1).toLocaleDateString()),
			lastSimpildate: Date.parse(new Date(1970, 1, 1).toLocaleDateString()),
		}
	}
	twelveLastMonthsFlights.forEach((flight: validatedFlight) => {
		flight.flightPilots.forEach((pilot) => {
			const pilotindex = pilotsHours.findIndex(
				(element) => element.name === pilot.pilotName
			)
			if (pilotindex !== -1) {
				pilotsHours[pilotindex].lastFlightdate =
					(Math.max(pilotsHours[pilotindex].lastFlightdate),
					Date.parse(flight.effectiveDeparture))
				if (new Date(flight.effectiveDeparture) >= lastMonthDate) {
					pilotsHours[pilotindex].lastMonthDay += pilot.pilotDay
					pilotsHours[pilotindex].lastMonthNight += pilot.pilotNight
					pilotsHours[pilotindex].lastMonthTotal +=
						pilot.pilotDay + pilot.pilotNight
				}
				if (new Date(flight.effectiveDeparture) >= sixLastMonthsDate) {
					pilotsHours[pilotindex].sixLastMonthTotal +=
						pilot.pilotDay + pilot.pilotNight
					pilotsHours[pilotindex].sixLastMonthNight += pilot.pilotNight
				}
				pilotsHours[pilotindex].twelveLastMonthTotal +=
					pilot.pilotDay + pilot.pilotNight
				pilotsHours[pilotindex].twelveLAstMonthNight += pilot.pilotNight
			}
		})
	})
	sixLastMonthsSimpils.forEach((simpil: Simpil) => {
		simpil.flightPilots.forEach((pilot) => {
			const pilotindex = pilotsHours.findIndex(
				(element) => element.name === pilot.pilotName
			)
			if (pilotindex !== -1) {
				pilotsHours[pilotindex].lastSimpildate =
					(Math.max(pilotsHours[pilotindex].lastSimpildate),
					Date.parse(simpil.effectiveDeparture))
				if (new Date(simpil.effectiveDeparture) >= lastMonthDate) {
					pilotsHours[pilotindex].lastMonthSimpilTotal +=
						pilot.pilotDay + pilot.pilotNight
					pilotsHours[pilotindex].lastMonthSimpilNight += pilot.pilotNight
				}
				pilotsHours[pilotindex].sixLastMonthTotalSimpil +=
					pilot.pilotDay + pilot.pilotNight
				pilotsHours[pilotindex].sixLastMonthNightSimpil += pilot.pilotNight
			}
		})
	})
	pilotsHours.forEach((pilot) => {
		pilot.sixLastMonthTotal += Math.min(20, pilot.sixLastMonthTotalSimpil)
		pilot.sixLastMonthNight += Math.min(7, pilot.sixLastMonthNightSimpil)
		pilot.hoursToDoThisMonthTotal = Math.max(
			0,
			pilot.hoursToDoThisMonthTotal - pilot.sixLastMonthTotal
		)
		pilot.hoursToDoThisMonthNight = Math.max(
			0,
			pilot.hoursToDoThisMonthNight - pilot.sixLastMonthNight
		)
		pilot.lastFlightdate = Date.now() - pilot.lastFlightdate
		pilot.lastSimpildate = Date.now() - pilot.lastSimpildate
	})
	pilotsHours.sort(function compare(a, b) {
		if (a.crew < b.crew) return -1
		if (a.crew > b.crew) return 1
		return 0
	})
	return pilotsHours
}
export async function getLastEntry(): Promise<string> {
	const flights = await postFetchRequest(DB_URL + "validatedFlight/byDate", {
		startDate:
			new Date().getFullYear() +
			"-" +
			getMonthNumber(new Date().getMonth() - 1) +
			"-01",
		endDate:
			new Date().getFullYear() +
			"-" +
			getMonthNumber(new Date().getMonth()) +
			"-" +
			getDateNumber(new Date().getDate()),
	})
	const simpils = await postFetchRequest(DB_URL + "simpil/byDate", {
		startDate:
			new Date().getFullYear() +
			"-" +
			getMonthNumber(new Date().getMonth() - 1) +
			"-01",
		endDate:
			new Date().getFullYear() +
			"-" +
			getMonthNumber(new Date().getMonth()) +
			"-" +
			getDateNumber(new Date().getDate()),
	})
	const allEntries = [...flights, ...simpils]
	allEntries.sort(
		(a, b) =>
			Date.parse(b.effectiveDeparture) - Date.parse(a.effectiveDeparture)
	)
	return new Date(allEntries[0].effectiveDeparture.split("T")[0]).toDateString()
}
