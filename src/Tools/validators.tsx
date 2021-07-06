export const dateIsBeforeNow = (value: string): boolean => {
	return new Date(value) < new Date()
}
export const timeIsCorrect = (value: string): boolean => {
	return /\d{2}:\d{2}/.test(value)
}
export const textLengthIsCorrect = (value: string): boolean => {
	return value !== "" && value.length >= 1 && value.length <= 15
}
export const crewIsCorrect = (value: string): boolean => {
	return (
		(/^W[A-Z]/.test(value) ||
			/^U[A-Z]/.test(value) ||
			/^M[A-Z]/.test(value) ||
			/^I[A-Z]/.test(value) ||
			value === "HE") &&
		value.length === 2
	)
}
export const aircraftIsCorrect = (value: string): boolean => {
	return (
		value !== "" &&
		parseInt(value) > 0 &&
		parseInt(value) < 29 &&
		parseInt(value) !== 1 &&
		parseInt(value) !== 2 &&
		parseInt(value) !== 10
	)
}
export const selectChoiceIsDone = (value: string): boolean => {
	return value !== "Choix..."
}
export const durationIsCorrect = (value: string): boolean => {
	return (
		value === "" ||
		(parseFloat(value) >= 0 &&
			parseFloat(value) <= 15 &&
			!isNaN(parseFloat(value)))
	)
}
export const textIsNotNull = (value: string): boolean => {
	return value !== "" && value.length >= 1
}
