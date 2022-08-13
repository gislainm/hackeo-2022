import React from 'react';

const withUser = (Component: typeof React.Component) => {
    return class WithUser extends React.Component
    {
        constructor(globals: any)
        {
            super(globals);
        }

        render() : React.ReactNode 
        {
            return <>{Component}</>;
        }
    }
}

export default withUser;