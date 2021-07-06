import React from "react"
import { navbarButtonProps } from "../types/basicComponentsProps"

export const DisplayButton = (props: navbarButtonProps): JSX.Element => (
	<button
		className={`btn btn-outline-${props.buttonColor} border-${props.borderColor} fw-bold px-4 ${props.activity}`}
		type='button'
		name={props.name}
		onClick={() => props.onClick(props.name)}
	>
		{props.content}
	</button>
)
