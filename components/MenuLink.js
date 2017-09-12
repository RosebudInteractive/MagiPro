import React from 'react'
import { Route, Link } from 'react-router-dom'
import classNames from 'classnames'

export default function MenuLink({ to, menuLabel, activeOnlyWhenExact }) {
	return (
		<Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
			<Link to={to} className={match ? 'active' : ''} >{menuLabel}</Link>
		)} />
	)
}
export function MenuLinkLi({ to, menuLabel, activeOnlyWhenExact }) {
	return (
		<Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
			<li className={match ? "filters__item active" : "filters__item"}>
				<Link to={to} style={{ color: 'inherit'}}>{menuLabel}</Link>
			</li>
		)} />
	)
}
