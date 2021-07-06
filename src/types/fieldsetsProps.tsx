import { control, disableControl, duration, pilot } from "./hooks"
import { activityView, bdvView, pilotView, sumsView } from "./views"

export type timingFieldsetProps = {
	estimatedDateOfDeparture: control
	setEstimatedDateOfDeparture: React.Dispatch<React.SetStateAction<control>>
	date: control
	setDate: React.Dispatch<React.SetStateAction<control>>
	departureTime: control
	setDepartureTime: React.Dispatch<React.SetStateAction<control>>
	estimatedTimeOfDeparture: control
	setEstimatedTimeOfDeparture: React.Dispatch<React.SetStateAction<control>>
	dayDuration: control
	setDayDuration: React.Dispatch<React.SetStateAction<control>>
	nightDuration: control
	setNightDuration: React.Dispatch<React.SetStateAction<control>>
	durations: Array<duration>
	setDuration: React.Dispatch<React.SetStateAction<Array<duration>>>
	pilots: Array<pilot>
	setPilot: React.Dispatch<React.SetStateAction<Array<pilot>>>
}
export type MissionFieldsetProps = {
	belonging: control
	setBelonging: React.Dispatch<React.SetStateAction<disableControl>>
	mission: control
	setMission: React.Dispatch<React.SetStateAction<control>>
	flightType: control
	setFlightType: React.Dispatch<React.SetStateAction<disableControl>>
	aircraft: control
	setAircraft: React.Dispatch<React.SetStateAction<control>>
	crew: control
	setCrew: React.Dispatch<React.SetStateAction<control>>
	types: Array<string>
	group?: control
	setGroup?: React.Dispatch<React.SetStateAction<disableControl>>
	client?: control
	setClient?: React.Dispatch<React.SetStateAction<disableControl>>
	manager?: control
	setManager?: React.Dispatch<React.SetStateAction<disableControl>>
}
export type DurationFieldsetProps = {
	durations: Array<duration>
	setDuration: React.Dispatch<React.SetStateAction<Array<duration>>>
	dayValueToCompare: control
	nightValueToCompare: control
}
export type PiloteFieldsetProps = {
	pilotList: Array<string>
	pilots: Array<pilot>
	setPilot: React.Dispatch<React.SetStateAction<Array<pilot>>>
	addPilot: () => void
	dayValueToCompare: control
	nightValueToCompare?: control
}
export type SimpilFieldsetProps = {
	date: control
	setDate: React.Dispatch<React.SetStateAction<control>>
	misssion: control
	setMission: React.Dispatch<React.SetStateAction<control>>
	duration: control
	setDuration: React.Dispatch<React.SetStateAction<control>>
	pilots: Array<pilot>
	setPilot: React.Dispatch<React.SetStateAction<Array<pilot>>>
}
export type AllActivitiesTBodyProps = {
	squadronFlights: Array<activityView>
}
export type MyHoursTFootProps = {
	sums: sumsView
}
export type MyHoursTBodyProps = {
	myHours: Array<pilotView>
}
export type TheadProps = {
	titles: Array<string>
}
export type TbodyProps = {
	lines: Array<bdvView>
	handleClick: (dataToValidate: string) => void
	handleDeleteClick: (id: string, index: number) => void
	primaryButtonContent: string
}
