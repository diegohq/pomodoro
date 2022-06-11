import React from "react";
import Step from "./step";
import LocalizedStrings from 'react-localization';

export default class Steps extends React.Component {

    strings = new LocalizedStrings({
        en: {
            steps: "Steps",
            restart: "And start it over...",
        },
        pt: {
            steps: "Etapas",
            restart: "E recomece...",
        }
    });

    render() {
        return (
            <div className="row col-12">

                <h2 className="text-center text-light mb-3">
                    {this.strings.steps}
                </h2>

                <ul class="list-group">
                {this.props.steps.map((step, index) => (

                    <Step step={step} index={index} currentStep={this.props.currentStep} />

                ))}
                <li className="list-group-item text-center list-group-item-danger">
                    {this.strings.restart}
                </li>
                </ul>

            </div>
        );
    }


}