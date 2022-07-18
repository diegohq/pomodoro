import React from "react";
import LocalizedStrings from 'react-localization';

export class Youtube extends React.Component {

    strings = new LocalizedStrings({
        en: {
            explanation: "How about listening to a song to focus? Insert the ID of the YouTube video you want to start automatically in the focus step, the video will stop when it reaches the relax step.",
            autoStart: "Automatically start and pause video according to the steps"
        },
        pt: {
            explanation: "Que tal ouvir uma música para se concentrar? Coloque o ID do vídeo do YouTube que você quer que incie automaticamente na etapa de foco, o vídeo irá parar quando chegar a etapa de relaxar.",
            autoStart: "Iniciar e pausar vídeo automaticamente conforme as etapas"
        }
    });

    constructor(props) {

        super(props)

        this.state = {
            videoId: 'R4yZ15_gwC4',
            inputVideo: 'R4yZ15_gwC4',
            autoStart: true
        };

        this.src = this.src.bind(this);
        this.handleInputVideo = this.handleInputVideo.bind(this);
        this.changeVideo = this.changeVideo.bind(this);
        this.changeAutoStart = this.changeAutoStart.bind(this);
    }

    src() {
        if(this.state.autoStart && this.props.play) {
            return `https://www.youtube.com/embed/${this.state.videoId}?autoplay=1`;
        }

        return `https://www.youtube.com/embed/${this.state.videoId}`;
    }

    handleInputVideo(event) {
        this.setState({
            inputVideo: event.target.value
        });
    }

    changeVideo() {
        this.setState({
            videoId: this.state.inputVideo
        });
    }

    changeAutoStart() {
        this.setState({
            autoStart: !this.state.autoStart
        });
    }

    render() {
        return (
            <>
                <div className="row col-12 text-light mb-2">

                    <p className={"mb-2"}>{ this.strings.explanation }</p>

                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" checked={this.state.autoStart} onChange={this.changeAutoStart} id="video-auto-start" />
                        <label className="form-check-label" htmlFor="video-auto-start">
                            {this.strings.autoStart}
                        </label>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-6">
                        <input type="text" className="form-control" value={this.state.inputVideo} size={20} onChange={(e) => this.handleInputVideo(e)} />
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary" onClick={this.changeVideo}>Alterar</button>
                    </div>
                </div>
                

                <iframe width="560" height="315" src={this.src()} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </>
        );
    }

}