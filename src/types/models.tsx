export type flightToValidate = {
	_id: string
	estimatedDeparture: string
	effectiveDeparture: string
	dayDuration: number
	nightDuration: number
	totalDuration: number
	belonging: string
	mission: string
	flightType: string
	aircraft: number
	crew: string
	durationType: Array<{
		name: string
		day: number
		night: number
	}>
	flightPilots: [
		{
			pilotName: string
			pilotDay: number
			pilotNight: number
		}
	]
}
export type validatedFlight = {
	_id: string
	estimatedDeparture: string
	effectiveDeparture: string
	dayDuration: number
	nightDuration: number
	totalDuration: number
	belonging: string
	mission: string
	flightType: string
	aircraft: number
	crew: string
	durationType: Array<{
		name: string
		day: number
		night: number
	}>
	flightPilots: Array<{
		pilotName: string
		pilotDay: number
		pilotNight: number
	}>
	group: string
	client: string
	manager: string
	exercice: string
	done: string
	cause: string
	area: string
}
export type Simpil = {
	_id: string
	effectiveDeparture: string
	mission: string
	dayDuration: number
	nightDuration: number
	totalDuration: number
	flightPilots: [
		{
			pilotName: string
			pilotDay: number
			pilotNight: number
		}
	]
}
export type user = {
	rank: string
	name: string
	function: string
	token: string
	error: string
}
export type norm = {
	name: string
	hoursToDo: number
	nightToDo: number
	duration: number
}
