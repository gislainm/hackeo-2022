import React from 'react';

const withNavigation = (Component: typeof React.Component) => {
    return class WithNavigation extends React.Component
    {
        constructor(globals: any)
        {
            super(globals);
        }

        render() : React.ReactNode 
        {
            return <><Component /></>;
        }
    }
}


export default withNavigation;