import React from 'react'
import './ProgressBar.css'
export default function ProgressBar({ percentage, color }) {
    const colors = [
        '#0070F2',
        '#0070F2',
        '#0070F2',
        '#0070F2',
        '#0070F2',
        '#1B90FF',
        '#1B90FF',
        '#1B90FF',
        '#1B90FF',
        '#1B90FF',
    ]
    return (
        <div className="progress">
            <div
                className="progress-bar"
                role="progressbar"
                style={{
                    width: `${percentage}%`,
                    backgroundColor: `${colors[color]}`,
                }}
            ></div>
        </div>
    )
}
