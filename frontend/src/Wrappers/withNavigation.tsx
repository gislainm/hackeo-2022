import React from 'react';

const withNavigation = (Component: typeof React.Component) => {
    return class WithNavigation extends React.Component<{globals: any}>
    {
        constructor(globals: any)
        {
            super(globals);
        }

        render() : JSX.Element 
        {
            return <><Component /></>;
        }
    }
}


export default withNavigation;