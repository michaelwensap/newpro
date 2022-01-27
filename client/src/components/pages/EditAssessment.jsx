import React from 'react' //, {useState}

import { Card } from '../cards'
import { useLocation } from 'react-router-dom'
import { AssessmentForm } from '../forms'

export default function EditAssessment() {
    const location = useLocation()
    return (
        <div className="container">
            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col-sm-12">
                    <p
                        className="bl"
                        style={{ color: '#354A5F', fontSize: '32px' }}
                    >
                        Edit Opportunity Assessments
                    </p>
                </div>
            </div>

            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col">
                    <Card size="card--xlarge">
                        <AssessmentForm
                            formType="edit"
                            formAssessment={location.state}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}
