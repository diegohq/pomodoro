import React from "react";
import LocalizedStrings from 'react-localization';

export default class Step extends React.Component {

    strings = new LocalizedStrings({
        en: {
            focus: "Focus",
            relax: "Relax",
            for: "for",
            minutes: "minutes"
        },
        pt: {
            focus: "Foque",
            relax: "Relaxe",
            for: "por",
            minutes: "minutos"
        }
    });

    type() {
        if(this.props.step.type === 'focus') {
            return this.strings.focus;
        }

        return this.strings.relax;
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
                {this.props.index + 1}. {this.type()} {this.strings.for} {this.props.step.minutes} {this.strings.minutes}
            </li>
        );
    }

}