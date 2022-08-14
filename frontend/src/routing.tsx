import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Loading from './Pages/Loading';
import { AvailableRoutes } from './RouterData/Routing';

import withUser from './Wrappers/withUser';
import withNavigation from './Wrappers/withNavigation';

import TestingPage from './Pages/TestingPage'

import DefaultPage from './Pages/TestingPage';

//TODO global state via this does not work
//use producer/consumer or redux...eventually
interface IGlobalState
{
    authenticated: boolean;
    updateState: Function;
}

export default class RouterNetwork extends React.PureComponent<{}, IGlobalState>
{
    constructor(props)
    {
        super(props);

        this.updateGlobalState = this.updateGlobalState.bind(this);

        this.state = {
            authenticated: false,
            updateState: this.updateGlobalState,
        };
    }

    private updateGlobalState(obj: any)
    {
        this.setState(obj);
    }

    render()
    {
        console.log("refreshed routing");

        return <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    {
                        AvailableRoutes.map((routeData, index) => {
                            let PageWrapper = withUser(routeData.component);
                            if(routeData.hasNavBar)
                                PageWrapper = withNavigation(routeData.component);
                            
                            return <Route
                                key={"KPage"+index}
                                path={routeData.path}
                                element={<PageWrapper globals={this.state} />} />;
                        })
                    }
                </Routes>
            </Suspense>
        </Router>;
    }
}