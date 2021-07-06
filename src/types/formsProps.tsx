import { control, disableControl } from "./hooks"
import { activityView, pilotView, sumsView } from "./views"

export type AllActivitiesTableProps = {
	squadronFlights: Array<activityView>
	sums: sumsView
}
export type BetweenTwoDatesFormProps = {
	startDate: control
	setStartDate: React.Dispatch<React.SetStateAction<control>>
	endDate: control
	setEndDate: React.Dispatch<React.SetStateAction<control>>
}
export type MyActivitiesTableProps = {
	myHours: Array<pilotView>
	sums: sumsView
}
export type ValidateFieldsetProps = {
	group: disableControl
	setGroup: React.Dispatch<React.SetStateAction<disableControl>>
	client: disableControl
	setClient: React.Dispatch<React.SetStateAction<disableControl>>
	manager: disableControl
	setManager: React.Dispatch<React.SetStateAction<disableControl>>
	done: control
	setDone: React.Dispatch<React.SetStateAction<disableControl>>
	cause: disableControl
	setCause: React.Dispatch<React.SetStateAction<disableControl>>
	area: control
	setArea: React.Dispatch<React.SetStateAction<disableControl>>
}
