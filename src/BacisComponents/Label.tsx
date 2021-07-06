import React from "react"
import { LabelProps } from "../types/basicComponentsProps"

export const Label = (props: LabelProps): JSX.Element => (
	<label className={`col-md-${props.labelSize} col-form-label fw-bold`}>
		{props.title}
	</label>
)
