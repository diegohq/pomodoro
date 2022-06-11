import React from "react";

export default class Step extends React.Component {

    type() {
        if(this.props.step.type === 'focus') {
            return 'Foque';
        }

        return 'Relaxe';
    }

    active() {
        if(this.props.currentStep === this.props.index) {
            
            if(this.props.step.type === 'focus') {
                return 'bg-danger text-light';
            }

            return 'bg-primary text-light';
        }

        return '';
    }

    done() {
        if(this.props.currentStep > this.props.index) {
            return 'list-group-item-secondary';
        }

        return '';
    }

    render() {
        return (
            <li className={`list-group-item ${this.active()} ${this.done()}`}>
                {this.props.index + 1}. {this.type()} por {this.props.step.minutes} minutos
            </li>
        );
    }

}