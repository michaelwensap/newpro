import React, { useState } from 'react'
import './SearchFieldDropdown.css'
import { ReactComponent as DROPDOWNARROW } from '../../img/icons/dropdown-arrow.svg'

export default function SearchFieldDropdown({ selected, list, onSelect }) {
    const [showDropdown, setShowDropdown] = useState(false)

    function handleClick(elm) {
        onSelect(elm)
        setShowDropdown(false)
    }

    return (
        <div
            className="dropdown"
            onBlur={() => {
                setShowDropdown(false)
            }}
        >
            <button
                className="btn btn-dropdown"
                type="button"
                onClick={() => {
                    setShowDropdown(!showDropdown)
                }}
            >
                <span className="dropdown-text"> {selected} </span>
                <span style={{ float: 'right' }}>
                    {' '}
                    <DROPDOWNARROW />{' '}
                </span>
            </button>
            <ul
                style={{
                    maxHeight: '200px',
                    overflow: 'hidden',
                    overflowY: 'scroll',
                }}
                className={`dropdown-menu ${showDropdown ? 'show' : null}`}
            >
                {list.map((elm, i, array) => {
                    return (
                        <li
                            className="dropdown-item fs14"
                            onMouseDown={(e) => {
                                e.preventDefault()
                            }}
                            onClick={() => {
                                handleClick(elm.value)
                            }}
                            value={elm.value}
                            name={elm.value}
                            key={i}
                        >
                            {' '}
                            {elm.value}{' '}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
