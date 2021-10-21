import React from 'react';

export class WebsocketHandler extends React.Component {

    constructor(props: object) {
        super(props);

        this.state = { connection: null };
    }

    componentDidMount() {
        /*todo: connect to server here, using game id passed in props*/
    }

    componentWillUnmount() {
        /*todo: close websocket connection here*/
    }

    render() {
        return (<></>);
    }
};