import React from "react"
import { NavLink } from "react-router-dom"
import { navLinks } from "../datas/navLinkDatas"

export const Navbar = (): JSX.Element => {
	return (
		<div className='nav nav-tabs bg-dark text-light justify-content-center mx-2'>
			{navLinks.map((navLink) => (
				<NavLink key={navLink.link} to={navLink.link} activeClassName='active'>
					<button type='button' className='btn-md btn-primary fw-bold p-1 px-3'>
						{navLink.content}
					</button>
				</NavLink>
			))}
		</div>
	)
}
