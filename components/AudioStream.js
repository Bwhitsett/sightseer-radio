import React, { View } from 'react';
import ReactDOM from 'react-dom';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";

class AudioStream extends React.Component {
    
    // componentDidMount = () => {
        
    // }
    render = () => {
        return (
            
            <ReactTwitchEmbedVideo
            autoplay="true"
            channel="sightseerxyz" 
            layout="video"
            height="70%"
            width="720"/>

        )
    }
}
export default AudioStream;