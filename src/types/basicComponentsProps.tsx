import { control, disableControl, duration, pilot } from "./hooks"
import { pilotHoursView } from "./views"

export type InputProps = {
	inputSize: number
	backgroundColor: string
	textColor: string
	validator: (arg0: string) => boolean
	type: string
	min?: number
	max?: number
	placeholder?: string
	control: control
	setControl: React.Dispatch<React.SetStateAction<control>>
	durations?: Array<duration>
	setDuration?: React.Dispatch<React.SetStateAction<Array<duration>>>
	pilots?: Array<pilot>
	setPilot?: React.Dispatch<React.SetStateAction<Array<pilot>>>
}
export type ButtonProps = {
	buttonSize: number
	buttonThickness: string
	buttonColor: string
	buttonMarginX: number
	buttonContent: string
	buttonDisplay?: string
	onClick?: () => void
	disabled: true | false
}
export type LabelProps = {
	labelSize: number
	title: string
}
export type LegendProps = {
	title: string
}
export type SelectProps = {
	selectSize: number
	backgroundColor: string
	textColor: string
	validator: (arg0: string) => boolean
	options: string[]
	control: control
	setControl: React.Dispatch<React.SetStateAction<disableControl>>
	disabled: boolean
	cause?: control
	setCause?: React.Dispatch<React.SetStateAction<disableControl>>
	group?: control
	setGroup?: React.Dispatch<React.SetStateAction<disableControl>>
	client?: control
	setClient?: React.Dispatch<React.SetStateAction<disableControl>>
	manager?: control
	setManager?: React.Dispatch<React.SetStateAction<disableControl>>
}
export type PilotInputProps = {
	inputSize: number
	backgroundColor: string
	textColor: string
	validator: (arg0: string) => boolean
	type: string
	min?: number
	max?: number
	placeholder?: string
	index: number
	pilots: Array<pilot>
	setControl: React.Dispatch<React.SetStateAction<Array<pilot>>>
	valueToCompare?: control
}
export type DurationInputProps = {
	inputSize: number
	backgroundColor: string
	textColor: string
	validator: (arg0: string) => boolean
	type: string
	min?: number
	max?: number
	placeholder?: string
	index: number
	durations: Array<duration>
	setDuration: React.Dispatch<React.SetStateAction<Array<duration>>>
	valueToCompare?: control
}
export type PiloteSelectProps = {
	selectSize: number
	backgroundColor: string
	textColor: string
	validator: (arg0: string) => boolean
	options: string[]
	index: number
	pilots: Array<pilot>
	setControl: React.Dispatch<React.SetStateAction<Array<pilot>>>
}
export type ConfirmModalProps = {
	show: boolean
	title: string
	contents: string
	handleClose: () => void
	confirm: () => void
}
export type navbarButtonProps = {
	buttonColor: string
	borderColor: string
	buttonMarginX: number
	activity: string
	name: string
	content: string
	onClick: (name: string) => void
	disabled: boolean
}
export type ErrorModalProps = {
	show: boolean
	title: string
	contents: Array<string>
	handleClose: () => void
}
export type pilotMiniCardProps = {
	pilotHours: pilotHoursView
	lineIndex: number
	pilotIndex: number
	onClick: (lineIndex: number, pilotIndex: number) => void
}
export type pilotCardProps = {
	pilotHours: pilotHoursView
	handleClick: () => void
}
