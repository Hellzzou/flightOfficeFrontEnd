import { MONTHS } from "../datas/datas"
import { pilotHoursView } from "../types/views"

export const returnZeroOrValue = (value: string): number =>
	value === "" ? 0 : parseFloat(value)
export const DecimalRound = (value: number): number =>
	Math.round(value * 10) / 10
export const determineColor = (
	value: number,
	floor: number,
	ceil: number
): string => {
	if (value > ceil) return "danger"
	if (value > floor) return "warning"
	return "success"
}
export const sliceArray = (
	arrayToSlice: Array<pilotHoursView>,
	lengthToSlice: number
): Array<Array<pilotHoursView>> => {
	const slicedArray = [] as Array<Array<pilotHoursView>>
	let start = 0
	let end = lengthToSlice
	while (end < arrayToSlice.length) {
		slicedArray.push(arrayToSlice.slice(start, end))
		start += lengthToSlice
		end += lengthToSlice
	}
	slicedArray.push(arrayToSlice.slice(start))
	return slicedArray
}
export const worthColor = (colorsArray: Array<string>): string => {
	let worthColor = "success"
	for (let i = 0; i < colorsArray.length; i++)
		if (colorsArray[i] === "danger") worthColor = "danger"
	if (worthColor !== "danger")
		for (let i = 0; i < colorsArray.length; i++)
			if (colorsArray[i] === "warning") worthColor = "warning"
	return worthColor
}
export const getMonthString = (index: number): string => MONTHS[index]
export const getMonthNumber = (number: number): string =>
	number < 10 ? "0" + (number + 1) : (number + 1).toString()
export const getDateNumber = (number: number): string =>
	number < 10 ? "0" + number : number.toString()
