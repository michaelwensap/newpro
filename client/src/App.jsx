import React from 'react'
import BreadCrumbContext from './BreadCrumbContext'
import CustomerContext from './CustomerContext'
import ToastsContext from './ToastsContext'
import CategoryScopeUpdateContext from './CategoryScopeUpdateContext'
import './App.css'
import {
    Home,
    Admin,
    Customer,
    NewCustomer,
    NewAssessment,
    Assessment,
    EditUser,
    Reset,
    EditCustomer,
    EditAssessment,
    AssessmentCategory,
} from './components/pages'
import Header from './components/Header'
import { Route, useLocation } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Toasts from './components/toast/Toasts'
import CategoryScopeUpdate from './components/popover/CategoryScopeUpdate'
import { useState } from 'react'
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js'
import { ThemeProvider, Page } from '@ui5/webcomponents-react'
import '@ui5/webcomponents/dist/Assets'
import '@ui5/webcomponents-fiori/dist/Assets'
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    HttpLink,
    from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API,
    credentials: 'include',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        )

    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token')
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    }
})

const client = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache(),
    queryDeduplication: true,
})

export default function App() {
    const location = useLocation()
    const [breadcrumb, setBreadCrumb] = useState([])
    const [customerName, setCustomerName] = useState('')
    const [toastsMessage, setToastsMessage] = useState('')
    const [categoryScopeUpdate, setCategoryScopeUpdate] = useState({})
    setTheme('sap_horizon')

    return (
        <ApolloProvider client={client}>
            <ThemeProvider>
                <ToastsContext.Provider
                    value={{ toastsMessage, setToastsMessage }}
                >
                    <BreadCrumbContext.Provider
                        value={{ breadcrumb, setBreadCrumb }}
                    >
                        <CustomerContext.Provider
                            value={{ customerName, setCustomerName }}
                        >
                            <CategoryScopeUpdateContext.Provider
                                value={{
                                    categoryScopeUpdate,
                                    setCategoryScopeUpdate,
                                }}
                            >
                                <Page>
                                    {location.pathname === '/' ||
                                    location.pathname === '/reset' ? null : (
                                        <Header />
                                    )}
                                    <Route
                                        exact={true}
                                        path="/"
                                        component={Home}
                                    />
                                    <Route path="/reset" component={Reset} />
                                    <ProtectedRoute
                                        path="/admin"
                                        component={Admin}
                                    />
                                    <ProtectedRoute
                                        path="/customer/:id/oas"
                                        exact
                                        component={Customer}
                                    />
                                    <ProtectedRoute
                                        path="/new-customer"
                                        component={NewCustomer}
                                    />
                                    <ProtectedRoute
                                        path="/customer/:id"
                                        exact
                                        component={EditCustomer}
                                    />
                                    <ProtectedRoute
                                        path="/new-assessment"
                                        component={NewAssessment}
                                    />
                                    <ProtectedRoute
                                        path="/assessment"
                                        component={Assessment}
                                    />
                                    <ProtectedRoute
                                        path="/assessment-category"
                                        component={AssessmentCategory}
                                    />
                                    <ProtectedRoute
                                        path="/user/:id"
                                        exact
                                        component={EditUser}
                                    />
                                    <ProtectedRoute
                                        path="/edit-assessment"
                                        component={EditAssessment}
                                    />
                                    <Toasts />
                                    <CategoryScopeUpdate />
                                </Page>
                            </CategoryScopeUpdateContext.Provider>
                        </CustomerContext.Provider>
                    </BreadCrumbContext.Provider>
                </ToastsContext.Provider>
            </ThemeProvider>
        </ApolloProvider>
    )
}

//export default withRouter(App);
