import React from "react";

export default class Clock extends React.Component {

    format(number) {
        if(number <= 9) {
            return `0${number}`;
        }

        return number;
    }

    render() {
        return (
            <>
                {this.format(this.props.minutes)}:{this.format(this.props.seconds)}
            </>
        );
    }

}