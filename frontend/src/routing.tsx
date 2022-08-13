import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Loading from './Pages/Loading';
import { AvailableRoutes } from './RouterData/Routing';

import withUser from './Wrappers/withUser';
import withNavigation from './Wrappers/withNavigation';

import DefaultPage from './Pages/TestingPage';

interface IGlobalState
{
    authenticated: boolean;
}

export default class RouterNetwork extends React.PureComponent<{}, IGlobalState>
{
    constructor(props)
    {
        super(props);
        this.state = {
            authenticated: false,
        };
    }

    render()
    {
        console.log("Overlay rendering")
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