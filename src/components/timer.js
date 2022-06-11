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

    interval = null;

    constructor(props) {
        super(props);

        this.state = {
            currentStep: 0,
            clock: {
                minutes: this.steps[0].minutes,
                seconds: 0
            },
            clockRunning: false
        };

        this.button = this.button.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.start = this.start.bind(this);
        this.subSecond = this.subSecond.bind(this);
    }

    nextStep() {
        clearInterval(this.interval);

        const newCurrentStep = (this.state.currentStep + 1) % 8;

        this.setState({
            currentStep: newCurrentStep,
            clock: {
                minutes: this.steps[newCurrentStep].minutes,
                seconds: 0
            },
            clockRunning: false
        });
    }

    start() {
        this.setState({clockRunning: true});
        this.subSecond();
        this.interval = setInterval(this.subSecond, 1000);
    }

    subSecond() {
        if(this.state.clock.minutes === 0 && this.state.clock.seconds === 0) {
            this.nextStep();
            return;
        }

        if(this.state.clock.seconds === 0) {
            this.setState({
                clock: {
                    minutes: this.state.clock.minutes - 1,
                    seconds: 59
                }
            });
            return;
        }

        this.setState({
            clock: {
                minutes: this.state.clock.minutes,
                seconds: this.state.clock.seconds - 1
            }
        });
    }

    button() {
        if(this.state.clockRunning) {
            return (
                <button type="button" class="btn btn-light btn-lg" onClick={this.nextStep}>Encerrar essa etapa</button>
            );
        }

        return (
            <button type="button" class="btn btn-light btn-lg" onClick={this.start}>Iniciar!</button>
        );
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
                    {this.button()}
                </div>

                <div className="row col-12 mt-5">
                    <Steps steps={this.steps} currentStep={this.state.currentStep} />
                </div>


            </>
        );
    }

}