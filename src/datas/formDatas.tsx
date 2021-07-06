import { getDateNumber, getMonthNumber } from "../Tools/math"

export const INITIAL_TRUE_CONTROL = {
	value: "",
	validity: true,
}
export const INITIAL_FALSE_CONTROL = {
	value: "",
	validity: false,
}
export const INITIAL_TRUE_DISABLED_CONTROL = {
	value: "",
	validity: true,
	disabled: true,
}
export const INITIAL_FALSE_DISABLED_CONTROL = {
	value: "",
	validity: false,
	disabled: false,
}
export const INITIAL_STARTDATE_CONTROL = {
	value:
		new Date().getFullYear() +
		"-" +
		getMonthNumber(new Date().getMonth()) +
		"-01",
	validity: true,
}
export const INITIAL_ENDDATE_CONTROL = {
	value:
		new Date().getFullYear() +
		"-" +
		getMonthNumber(new Date().getMonth()) +
		"-" +
		getDateNumber(new Date().getDate()),
	validity: true,
}
export const INITIAL_PILOTS_STATE = [
	{
		title: "CDA :",
		pilotChoice: "",
		pilotChoiceValidity: false,
		piloteDay: "",
		piloteDayValidity: true,
		piloteNight: "",
		piloteNightValidity: true,
	},
	{
		title: "pilote :",
		pilotChoice: "",
		pilotChoiceValidity: false,
		piloteDay: "",
		piloteDayValidity: true,
		piloteNight: "",
		piloteNightValidity: true,
	},
]
export const INITIAL_DURATION_STATE = [
	{
		title: "CAG IFR",
		durationDay: "",
		durationDayValidity: true,
		durationNight: "",
		durationNightValidity: true,
	},
	{
		title: "CAG VFR",
		durationDay: "",
		durationDayValidity: true,
		durationNight: "",
		durationNightValidity: true,
	},
	{
		title: "CAM T",
		durationDay: "",
		durationDayValidity: true,
		durationNight: "",
		durationNightValidity: true,
	},
	{
		title: "CAM V",
		durationDay: "",
		durationDayValidity: true,
		durationNight: "",
		durationNightValidity: true,
	},
	{
		title: "CAM I",
		durationDay: "",
		durationDayValidity: true,
		durationNight: "",
		durationNightValidity: true,
	},
]
export const INITIAL_FLIGHTFORM_STATE = [
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_TRUE_CONTROL,
	INITIAL_TRUE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_DURATION_STATE,
	INITIAL_PILOTS_STATE,
]
export const INITIAL_SIMPILFORM_STATES = [
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_PILOTS_STATE,
]
export const INITIAL_VALIDATEFORM_STATE = [
	...INITIAL_FLIGHTFORM_STATE,
	INITIAL_FALSE_DISABLED_CONTROL,
	INITIAL_FALSE_DISABLED_CONTROL,
	INITIAL_FALSE_DISABLED_CONTROL,
	INITIAL_FALSE_CONTROL,
	INITIAL_TRUE_DISABLED_CONTROL,
	INITIAL_FALSE_CONTROL,
]
