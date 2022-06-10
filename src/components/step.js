import React from "react";
import Clock from "./clock";

export default class Step extends React.Component {

    type() {
        if(this.props.step.type === 'focus') {
            return 'Foque';
        }

        return 'Relaxe';
    }

    active() {
        if(this.props.currentStep === this.props.index) {
            return 'active';
        }

        return '';
    }

    render() {
        return (
            <li className={`list-group-item text-center ${this.active()}`}>
                {this.type()} por <Clock minutes={this.props.step.minutes} seconds={0} />
            </li>
        );
    }

}