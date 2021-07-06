import React, { useState } from "react"
import useAsyncEffect from "use-async-effect"
import { PilotMiniCard } from "../Fieldsets/PilotMiniCard"
import { INITIAL_PILOTHOURS } from "../datas/pilotDatas"
import { Navbar } from "../Fieldsets/Navbar"
import { buildPilotsHours } from "../Tools/buildViews"
import { sliceArray } from "../Tools/math"
import { Header } from "../Fieldsets/Header"
import { Redirect, useHistory } from "react-router"
import { tokenCheck } from "../Tools/user"

export const PilotsSummary = (): JSX.Element => {
	const [lines, setLines] = useState([[INITIAL_PILOTHOURS]])
	const history = useHistory()

	const handleClick = (lineIndex: number, pilotIndex: number) => {
		history.push(`/pilotDetails/${lineIndex}/${pilotIndex}`)
	}

	useAsyncEffect(() => {
		;(async () => {
			const pilotHours = await buildPilotsHours()
			setLines(sliceArray(pilotHours, 6))
		})()
	}, [lines.length])
	return !tokenCheck() ? (
		<Redirect to='/' />
	) : (
		<>
			<Header />
			<Navbar />
			<div>
				{lines.map((line) => (
					<div key={lines.indexOf(line)} className='row m-2'>
						{line.map((pilot) => (
							<PilotMiniCard
								key={pilot.name}
								pilotHours={pilot}
								lineIndex={lines.indexOf(line)}
								pilotIndex={line.indexOf(pilot)}
								onClick={handleClick}
							/>
						))}
					</div>
				))}
			</div>
		</>
	)
}
