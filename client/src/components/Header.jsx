import React, { useState, useContext, useRef } from 'react'
import CustomerContext from '../CustomerContext'
import BreadCrumbContext from '../BreadCrumbContext'
import loginLogo from '../img/loginLogo.svg'
import { Auth } from '../utils'
import { useHistory } from 'react-router-dom'
import {
    ShellBar,
    ShellBarItem,
    Breadcrumbs,
    BreadcrumbsItem,
    Icon,
    Popover,
    StandardListItem,
} from '@ui5/webcomponents-react'
import '@ui5/webcomponents-icons/dist/employee.js'
import '@ui5/webcomponents-icons/dist/settings.js'
import '@ui5/webcomponents-icons/dist/log.js'

export default function Header() {
    const history = useHistory()
    const [show, setShow] = useState(false)
    const { customerName, setCustomerName } = useContext(CustomerContext)
    const { breadcrumb, setBreadCrumb } = useContext(BreadCrumbContext)
    const popoverRef = useRef(null)

    const logout = () => {
        console.log('logging out.')
        Auth.logout()
        setCustomerName('')
        setBreadCrumb([])
        if (!Auth.isAuthenticated()) history.push('/')
    }
    const toAdmin = () => {
        setCustomerName('')
        setBreadCrumb([])
        history.push({
            pathname: '/admin',
            state: 1,
        })
    }

    function navTo(item) {
        const currentPath = breadcrumb[breadcrumb.length - 1]
        if (item.path !== currentPath.path) {
            let pos = breadcrumb
                .map(function (e) {
                    return e.title
                })
                .indexOf(item.title)
            breadcrumb.splice(pos + 1, breadcrumb.length - 1)
            setBreadCrumb(breadcrumb)
            history.push({
                pathname: `${item.path}`,
            })
        }
    }

    const Logo = (props) => (
        <img slot={props.slot} src={loginLogo} alt="Source Agent by SAP" />
    )
    const avatarClick = (e) => {
        popoverRef.current.showAt(e.target)
    }
    return (
        <header className="mb-4">
            <ShellBar
                profile={<Icon name="employee" onClick={avatarClick} />}
                secondaryTitle="Admin"
                logo={<Logo />}
            ></ShellBar>
            <Popover
                ref={popoverRef}
                id="myUniquePopover"
                placementType="Bottom"
            >
                <StandardListItem icon="settings" onClick={toAdmin}>
                    Admin
                </StandardListItem>
                <StandardListItem icon="log" onClick={logout}>
                    Sign Out
                </StandardListItem>
            </Popover>
        </header>
    )
}
