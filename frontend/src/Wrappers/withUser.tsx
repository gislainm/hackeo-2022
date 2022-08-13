import React from 'react';

const withUser = (Component: any) => {
    return class WithUser extends React.Component<{globals: any}>
    {
        constructor(globals: any)
        {
            super(globals);
        }

        render() : JSX.Element
        {
            return <>
                <Component />
            </>;
        }
    }
}

export default withUser;