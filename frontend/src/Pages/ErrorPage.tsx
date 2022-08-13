import React from 'react';
import Error from '../Components/Error';

interface IErrorPageProps
{
    children: React.ReactNode;
}

interface IErrorPageState
{
    errored: boolean;
}

export default class ErrorBoundary extends React.Component<IErrorPageProps, IErrorPageState>
{
    constructor(props: IErrorPageProps)
    {
        super(props);

        this.state = { errored: false, };
    }

    static getDerivedStateFromError(error)
    {
        console.log("Error Caught");
        return { errored: true, };
    }

    componentDidCatch(error, info)
    {
        ErrorBoundary.actions(info.componentStack);
        this.setState({ errored: true });
    }

    render()
    {
        if(this.state.errored)
            return <Error />;

        return this.props.children;
    }

    private static actions(error: string)
    {
        console.log(error);
    }
}