import React from "react"
import { ConfirmModalProps } from "../types/basicComponentsProps"
import Modal from "react-bootstrap/Modal"
import { ActionButton } from "./ActionButton"

export const ConfirmModal = (props: ConfirmModalProps): JSX.Element => {
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
				<Modal.Header className='bg-primary'>
					<Modal.Title className='text-center'>{props.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p>{props.contents}</p>
				</Modal.Body>
				<Modal.Footer className='row m-1'>
					<ActionButton
						buttonSize={5}
						buttonColor='danger'
						buttonMarginX={1}
						buttonThickness='md'
						buttonContent='Annuler'
						disabled={false}
						onClick={props.handleClose}
					/>
					<ActionButton
						buttonSize={5}
						buttonColor='primary'
						buttonMarginX={1}
						buttonThickness='md'
						buttonContent='Confirmer'
						disabled={false}
						onClick={props.confirm}
					/>
				</Modal.Footer>
			</Modal>
		</>
	)
}
