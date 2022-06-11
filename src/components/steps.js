import React from "react";
import Step from "./step";

export default class Steps extends React.Component {

    render() {
        return (
            <div className="row col-12">

                <h2 className="text-center text-light mb-3">Etapas</h2>

                <ul class="list-group">
                {this.props.steps.map((step, index) => (

                    <Step step={step} index={index} currentStep={this.props.currentStep} />

                ))}
                <li className="list-group-item text-center list-group-item-danger">
                    E recomece...
                </li>
                </ul>

            </div>
        );
    }


}