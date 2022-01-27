import React from 'react'
import './Card.css'

export default function Card({
    padding = 'pad--large',
    size = 'card--large',
    children,
}) {
    const str = `card card--light ${size} ${padding}`
    return <div className={str}>{children}</div>
}
