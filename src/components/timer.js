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
            clockRunning: false,
            autoStart: false
        };

        this.currentStep = this.currentStep.bind(this);
        this.button = this.button.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.changeAutoStart = this.changeAutoStart.bind(this);
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
            clockRunning: this.state.autoStart
        });

        if(this.state.autoStart) {
            const interval = setInterval(
                () => {
                    this.start();
                    clearInterval(interval);
                },
                1000
            );
        }
    }

    currentStep() {
        return this.steps[this.state.currentStep];
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

    changeAutoStart() {
        this.setState({
            autoStart: !this.state.autoStart
        });
    }

    button() {
        if(this.state.clockRunning) {
            return (
                <button type="button" class="btn btn-warning btn-lg square-corner" onClick={this.nextStep}>Encerrar esta etapa</button>
            );
        }

        if(this.currentStep().type === 'focus') {
            return (
                <button type="button" class="btn btn-danger btn-lg square-corner" onClick={this.start}>Iniciar</button>
            );
        }

        return (
            <button type="button" class="btn btn-primary btn-lg square-corner" onClick={this.start}>Iniciar</button>
        );
    }

    badge() {
        if(this.currentStep().type === 'focus') {
            return (
                <span class="badge bg-danger square-corner">{this.currentStep().type}</span>
            );
        }

        return (
            <span class="badge bg-primary square-corner">{this.currentStep().type}</span>
        );
    }

    render() {
        return (
            <>
                <div className="row col-12 text-center rounded bg-light">

                    {this.badge()}

                    <div className="display-1 mt-2 mb-2">
                        <strong>
                            <Clock minutes={this.state.clock.minutes} seconds={this.state.clock.seconds} />
                        </strong>
                    </div>
                    {this.button()}
                </div>

                <div className="row col-12 mt-2 text-light">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" checked={this.state.autoStart} onChange={this.changeAutoStart} id="auto-start" />
                    <label class="form-check-label" for="auto-start">
                        Iniciar etapas automaticamente
                    </label>
                </div>
                </div>

                <div className="row col-12 mt-5">
                    <Steps steps={this.steps} currentStep={this.state.currentStep} />
                </div>
            </>
        );
    }

}