import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Loading from './Pages/Loading';
import { AvailableRoutes } from './RouterData/Routing';

import withUser from './Wrappers/withUser';
import withNavigation from './Wrappers/withNavigation';

import DefaultPage from './Pages/DefaultPage';

export default class RouterNetwork extends React.PureComponent
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    render()
    {
        return <Router>
            <Suspense fallback={<Loading />}>
                <Routes>
                    {
                        AvailableRoutes.map((routeData, index) => {
                            console.log("IN ROUTER INSTANCE")
                            let pageWrap = withUser(routeData.component);
                            if(routeData.hasNavBar)
                                pageWrap = withNavigation(routeData.component);
                            
                            const ComponentPage = routeData.component;
                            return <Route
                                key={"KPage"+index}
                                path={routeData.path}
                                element={<ComponentPage />} />;
                        })
                    }
                </Routes>
            </Suspense>
        </Router>;
    }
}