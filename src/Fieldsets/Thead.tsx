import React from "react"
import { TheadProps } from "../types/fieldsetsProps"

export const Thead = (props: TheadProps): JSX.Element => {
	return (
		<thead>
			<tr>
				{props.titles.map((title) => (
					<th key={props.titles.indexOf(title)}>{title}</th>
				))}
			</tr>
		</thead>
	)
}
