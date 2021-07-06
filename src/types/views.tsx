import { norm } from "./models"

export type bdvView = {
	id: string
	effectiveDeparture: string
	CDA: string
	aircraft: number
	crew: string
	mission: string
	dayDuration: number
	nightDuration: number
	totalDuration: number
}
export type pilotView = {
	id: string
	type: string
	effectiveDeparture: string
	aircraft: number | string
	function: string
	crew: string
	mission: string
	dayDuration: number
	nightDuration: number
	totalDuration: number
}
export type activityView = {
	effectiveDeparture: string
	aircraft: number
	CDA: string
	crew: string
	mission: string
	done: string
	cause: string
	group: string
	client: string
	manager: string
	dayDuration: number
	nightDuration: number
	totalDuration: number
}
export type pilotHoursView = {
	crew: string
	name: string
	norme: norm
	lastMonthDay: number
	lastMonthNight: number
	lastMonthTotal: number
	lastMonthSimpilTotal: number
	lastMonthSimpilNight: number
	sixLastMonthTotal: number
	sixLastMonthNight: number
	sixLastMonthTotalSimpil: number
	sixLastMonthNightSimpil: number
	twelveLastMonthTotal: number
	twelveLAstMonthNight: number
	hoursToDoThisMonthTotal: number
	hoursToDoThisMonthNight: number
	lastFlightdate: number
	lastSimpildate: number
}
export type sumsView = {
	flights: { day: number; night: number; total: number }
	simpils: { day: number; night: number; total: number }
}
