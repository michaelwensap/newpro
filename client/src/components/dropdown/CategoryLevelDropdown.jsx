import React, { useState } from 'react'
import './CategoryLevelDropdown.css'
import { ReactComponent as DROPDOWNBLUE } from '../../img/icons/dropdown-blue.svg'

export default function CategoryLevelDropdown({ selected, list, onSelect }) {
    const [expanded, setExpanded] = useState(false)

    function handleClick(elm) {
        onSelect(elm)
        setExpanded(false)
    }

    return (
        <div
            className="category-group"
            onBlur={() => {
                setExpanded(false)
            }}
        >
            <button
                type="button"
                className="btn bluechip"
                onClick={() => {
                    setExpanded(!expanded)
                }}
            >
                <span className="ellipse"></span>{' '}
                <span className="blue-text">
                    {' '}
                    L{selected.categoryLevel} Category{' '}
                </span>{' '}
                <span style={{ paddingLeft: '5px' }}>
                    {' '}
                    <DROPDOWNBLUE />{' '}
                </span>
            </button>
            {expanded === true ? (
                <ul className="level-list-group">
                    {list.map((elm, i, array) => {
                        return (
                            <li
                                className="level-list-group-item b"
                                style={{
                                    color:
                                        i === array.length - 1
                                            ? '#1B90FF'
                                            : null,
                                    cursor:
                                        i === array.length - 1
                                            ? 'not-allowed'
                                            : 'pointer',
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault()
                                }}
                                onClick={() => {
                                    handleClick(elm)
                                }}
                                value={elm.categoryCode}
                                name={elm.categoryDesc}
                                key={i}
                            >
                                {' '}
                                L{elm.categoryLevel} {elm.categoryDesc}{' '}
                            </li>
                        )
                    })}
                </ul>
            ) : null}
        </div>
    )
}
