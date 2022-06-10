//import Clock from "./clock";

import React from "react";
import Clock from "./clock";
import Steps from "./steps";

export default class Timer extends React.Component {

    steps = [
        {type: 'focus', minutes: 25},
        {type: 'relax', minutes: 5},
        {type: 'focus', minutes: 25},
        {type: 'relax', minutes: 5},
        {type: 'focus', minutes: 25},
        {type: 'relax', minutes: 5},
        {type: 'focus', minutes: 25},
        {type: 'relax', minutes: 15},
    ];

    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0,
            clock: {
                minutes: 25,
                seconds: 0
            }
        };

        this.nextStep = this.nextStep.bind(this);
    }

    nextStep() {
        const newCurrentStep = (this.state.currentStep + 1) % 8;

        this.setState({
            currentStep: newCurrentStep,
            clock: {
                minutes: this.steps[newCurrentStep].minutes,
                seconds: 0
            }
        });
    }

    render() {
        return (
            <>
                <div className="row col-12 text-center">

                    <div className="display-1">
                        <strong>
                            <Clock minutes={this.state.clock.minutes} seconds={this.state.clock.seconds} />
                        </strong>
                    </div>
                    <button type="button" class="btn btn-light btn-lg">Iniciar!</button>
                </div>

                <div className="row col-12 mt-5">
                    <Steps steps={this.steps} currentStep={this.state.currentStep} />
                </div>


            </>
        );
    }

}