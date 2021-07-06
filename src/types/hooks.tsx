export type control = {
	value: string
	validity: boolean
}
export type disableControl = {
	value: string
	validity: boolean
	disabled: boolean
}
export type sectionControl = {
	name: string
	display: string
	activity: string
	content: string
}
export type sectionHook = {
	control: sectionControl
	setter: React.Dispatch<React.SetStateAction<sectionControl>>
}
export type pilot = {
	title: string
	pilotChoice: string
	pilotChoiceValidity: boolean
	piloteDay: string
	piloteDayValidity: boolean
	piloteNight: string
	piloteNightValidity: boolean
}
export type duration = {
	title: string
	durationDay: string
	durationDayValidity: boolean
	durationNight: string
	durationNightValidity: boolean
}
