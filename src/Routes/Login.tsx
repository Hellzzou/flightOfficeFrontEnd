import React, { useState } from "react"
import { ActionButton } from "../BacisComponents/ActionButton"
import { Input } from "../BacisComponents/Input"
import { Label } from "../BacisComponents/Label"
import { Legend } from "../BacisComponents/Legend"
import { formValidity } from "../Tools/formTools"
import { textIsNotNull } from "../Tools/validators"
import loginbg from "../images/loginbg1.jpg"
import { checkUser } from "../Tools/user"
import { useHistory } from "react-router-dom"

export const Login = (): JSX.Element => {
	const [login, setLogin] = useState({ value: "", validity: false })
	const [password, setPassword] = useState({ value: "", validity: false })
	const [loginError, setLoginError] = useState("")
	const history = useHistory()
	const divStyle = {
		backgroundImage: `url(${loginbg})`,
		backgroundSize: "cover",
		height: "100vh",
	}
	const handleLogin = () => {
		;(async () => {
			const findUser = await checkUser(login.value, password.value)
			if (typeof findUser.rank !== "undefined") {
				sessionStorage.setItem("token", findUser.token)
				history.push("/newFlight")
			} else setLoginError(findUser.error)
		})()
	}
	return (
		<>
			<form
				action='#'
				className='row justify-content-center align-items-center bg-image'
				style={divStyle}
			>
				<div className='col-md-5'>
					<fieldset className='border border-dark text-dark rounded py-4 bg-light'>
						<Legend title='Connexion' />
						<div className='form-group row m-3 mt-5'>
							<Label labelSize={4} title='Identifiant :' />
							<Input
								inputSize={8}
								backgroundColor='dark'
								textColor='light'
								validator={textIsNotNull}
								type='text'
								control={login}
								setControl={setLogin}
								placeholder='Entrez votre identifiant...'
							/>
						</div>
						<div className='form-group row m-3'>
							<Label labelSize={4} title='Mot de passe :' />
							<Input
								inputSize={8}
								backgroundColor='dark'
								textColor='light'
								validator={textIsNotNull}
								type='password'
								control={password}
								setControl={setPassword}
								placeholder='Entrez votre mot de passe...'
							/>
						</div>
						<div className='row m-1 justify-content-center'>
							<ActionButton
								buttonColor='primary'
								buttonContent='LOGIN'
								buttonSize={8}
								buttonThickness='md'
								buttonMarginX={0}
								disabled={!formValidity([login, password])}
								onClick={handleLogin}
							/>
						</div>
						<div className='justify-content-center row mt-3 text-danger fw-bold'>
							<span className='col-md-5'>{loginError}</span>
						</div>
					</fieldset>
				</div>
			</form>
		</>
	)
}
