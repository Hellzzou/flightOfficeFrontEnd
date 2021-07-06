import React from "react"
import { ButtonProps } from "../types/basicComponentsProps"

export const ActionButton = (props: ButtonProps): JSX.Element => {
	return (
		<button
			type='button'
			className={`col-md-${props.buttonSize} 
                    btn btn-${props.buttonThickness} 
                    btn-${props.buttonColor} 
                	rounded 
                    fw-bold 
                    mx-${props.buttonMarginX}
                    ${props.buttonDisplay}`}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.buttonContent}
		</button>
	)
}
