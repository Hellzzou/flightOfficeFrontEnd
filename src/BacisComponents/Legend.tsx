import React from "react"
import { LegendProps } from "../types/basicComponentsProps"

export const Legend = ({ title }: LegendProps): JSX.Element => (
	<legend className='text-center fw-bold'>{title}</legend>
)
