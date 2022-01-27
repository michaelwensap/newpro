import React, { useState, useEffect, useContext } from 'react';
import { Button, Title } from '@ui5/webcomponents-react';
import CustomerContext from '../../CustomerContext';
import BreadCrumbContext from '../../BreadCrumbContext';
import ADD from '../../img/icons/add.svg';
import { useHistory } from 'react-router-dom'; //useLocation,
import { Assessments } from '../tables';
import { Card } from '../cards';

export default function Customer() {
    const history = useHistory();
    const [customer, setCustomer] = useState({});
    const { setCustomerName } = useContext(CustomerContext);
    const { breadcrumb, setBreadCrumb } = useContext(BreadCrumbContext);
    // const goBack = ()=>{
    //   history.push('/admin');
    // }
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const cutm = JSON.parse(localStorage.getItem('customer'))
        if (cutm) {
            setCustomerName(cutm.name)
            if (breadcrumb.length === 0)
                breadcrumb.push({
                    title: 'Opportunity Assessments',
                    path: '/customer',
                })
            setBreadCrumb(breadcrumb);
            setCustomer(cutm);
        } else {
            history.push('/admin')
        }
    }, [history, setCustomerName, breadcrumb, setBreadCrumb])

    const onNewOpportunity = (e) => {
        breadcrumb.push('New Opportunity Assessment')
        setBreadCrumb(breadcrumb)
        history.push({
            pathname: '/new-assessment',
            state: {
                // location state
                customer: customer,
            },
        })
    }

    return (
        <div className="container">
            <div className="row" style={{ marginTop: '100px' }}>
                <div className="col-sm-12">
                    <Title level='H1' children ='Opportunity Assessments'/>
                </div>
            </div>

            <div className="row" style={{ marginTop: '3%' }}>
                <div className="col">
                    <div style={{ float: 'right' }}>
                        <Button design ='Emphasized' icon='add' onClick ={onNewOpportunity} children = 'New Assessment'/>
                    </div>
                </div>
            </div>

            <div className="row" style={{ marginTop: '1%' }}>
                <div className="col">
                    <Card padding="pad--xsmall">
                        <Assessments />
                    </Card>
                </div>
            </div>
        </div>
    )
}
