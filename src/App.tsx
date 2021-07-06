import React from "react"
import { AllActivities } from "./Routes/AllActivities"
import { Login } from "./Routes/Login"
import { ModifyFlightForm } from "./Routes/ModifyFlightForm"
import { MyActivities } from "./Routes/MyActivities"
import { ValidateFlightForm } from "./Routes/ValidateflightForm"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { NewFlight } from "./Routes/NewFlight"
import { NewSimpil } from "./Routes/NewSimpil"
import { PilotDetails } from "./Routes/PilotDetails"
import { PilotsSummary } from "./Routes/PilotsSummary"
import { ValidateTable } from "./Routes/ValidateTable"
import { ModifyTable } from "./Routes/ModifyTable"

export const App = (): React.ReactElement => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Login} />
				<Route path='/newFlight' component={NewFlight} />
				<Route path='/newSimpil' component={NewSimpil} />
				<Route path='/pilotsSummary' component={PilotsSummary} />
				<Route
					path='/pilotDetails/:lineIndex/:pilotIndex'
					component={PilotDetails}
				/>
				<Route path='/myActivities' component={MyActivities} />
				<Route path='/validateTable' component={ValidateTable} />
				<Route path='/validateFlight/:id' component={ValidateFlightForm} />
				<Route path='/allActivities' component={AllActivities} />
				<Route path='/modifyFlightTable' component={ModifyTable} />
				<Route path='/modifyFlightForm/:id' component={ModifyFlightForm} />
			</Switch>
		</BrowserRouter>
	)
}
