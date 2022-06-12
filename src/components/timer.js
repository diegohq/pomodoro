import React from "react";
import Clock from "./clock";
import Steps from "./steps";
import LocalizedStrings from 'react-localization';

export default class Timer extends React.Component {

    audio = new Audio('/alert.wav');

    strings = new LocalizedStrings({
        en: {
            focusTime: "Time to focus",
            relaxTime: "Time to relax",
            start: "Start",
            restart: "Restart",
            pause: "Pause",
            skip: "Skip this step",
            autoStart: "Start steps automatically",
            audioAlert: "Play alert when step is over"
        },
        pt: {
            focusTime: "Hora de focar",
            relaxTime: "Hora de relaxar",
            start: "Iniciar",
            restart: "Reiniciar",
            pause: "Pausar",
            skip: "Encerrar esta etapa",
            autoStart: "Iniciar etapas automaticamente",
            audioAlert: "Tocar alerta quando a etapa for concluída"
        }
    });

    steps = [
        {type: 'focus', minutes: 1},
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
            autoStart: false,
            isPaused: false,
            audioAlert: true,
        };

        this.currentStep = this.currentStep.bind(this);
        this.button = this.button.bind(this);
        this.pauseButton = this.pauseButton.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.changeAutoStart = this.changeAutoStart.bind(this);
        this.changeAudioAlert = this.changeAudioAlert.bind(this);
        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);
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
        this.setState({
            clockRunning: true,
            isPaused: false,
        });
        this.subSecond();
        this.interval = setInterval(this.subSecond, 1000);
    }

    pause() {
        clearInterval(this.interval);
        this.setState({
            isPaused: true
        });
    }

    subSecond() {
        if(this.state.clock.minutes === 0 && this.state.clock.seconds === 0) {
            if(this.state.audioAlert) {
                this.audio.play();
            }
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
                <>
                    {this.pauseButton()}
                    <button type="button" class="col-6 btn btn-warning btn-lg square-corner" onClick={this.nextStep}><i class="bi bi-skip-forward-circle"></i> {this.strings.skip}</button>
                </>
            );
        }

        if(this.currentStep().type === 'focus') {
            return (
                <button type="button" class="btn btn-danger btn-lg square-corner" onClick={this.start}><i class="bi bi-play-circle"></i> {this.strings.start}</button>
            );
        }

        return (
            <button type="button" class="btn btn-primary btn-lg square-corner" onClick={this.start}><i class="bi bi-play-circle"></i> {this.strings.start}</button>
        );
    }

    pauseButton() {
        if(this.state.isPaused) {
            return <button type="button" class="col-6 btn btn-info btn-lg square-corner" onClick={this.start}><i class="bi bi-play-circle"></i> {this.strings.restart}</button>;
        }

        return <button type="button" class="col-6 btn btn-primary btn-lg square-corner" onClick={this.pause}><i class="bi bi-pause-circle"></i> {this.strings.pause}</button>;
    }

    badge() {
        if(this.currentStep().type === 'focus') {
            return (
                <span class="badge bg-danger square-corner">{this.strings.focusTime}</span>
            );
        }

        return (
            <span class="badge bg-primary square-corner">{this.strings.relaxTime}</span>
        );
    }

    changeAutoStart() {
        this.setState({
            autoStart: !this.state.autoStart
        });
    }

    changeAudioAlert() {
        this.setState({
            audioAlert: !this.state.audioAlert
        });
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
                        {this.strings.autoStart}
                    </label>
                </div>
                </div>

                <div className="row col-12 mt-2 text-light">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" checked={this.state.audioAlert} onChange={this.changeAudioAlert} id="audio-alert" />
                    <label class="form-check-label" for="audio-alert">
                        {this.strings.audioAlert}
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