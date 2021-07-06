import React from "react"
import { ErrorModalProps } from "../types/basicComponentsProps"
import Modal from "react-bootstrap/Modal"
import { ActionButton } from "./ActionButton"

export const ErrorModal = (props: ErrorModalProps): JSX.Element => {
	return (
		<>
			<Modal
				show={props.show}
				onHide={props.handleClose}
				backdrop='static'
				keyboard={false}
				size='lg'
				contentClassName='bg-light'
			>
				<Modal.Header className='bg-warning'>
					<Modal.Title className='text-center'>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{props.contents.map((content) => (
						<p key={content}>{`- ${content}`}</p>
					))}
				</Modal.Body>
				<Modal.Footer>
					<ActionButton
						buttonSize={12}
						buttonColor='primary'
						buttonMarginX={1}
						buttonThickness='md'
						buttonContent="J'ai compris"
						disabled={false}
						onClick={props.handleClose}
					/>
				</Modal.Footer>
			</Modal>
		</>
	)
}
