import React from 'react' //, {useState}
import { Card } from '../cards'
import { AssessmentForm } from '../forms'

export default function NewAssessment() {
    //const location = useLocation();

    return (
        <div className="container">
            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col-sm-12">
                    <p
                        className="bl"
                        style={{ color: '#354A5F', fontSize: '32px' }}
                    >
                        New Opportunity Assessments
                    </p>
                </div>
            </div>

            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col">
                    <Card size="card--xlarge">
                        <AssessmentForm type="new" />
                    </Card>
                </div>
            </div>
        </div>
    )
}
