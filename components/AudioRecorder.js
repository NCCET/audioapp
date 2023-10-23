import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { AudioRecorderPlayer } from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      audioPath: '',
    };
  }

  startRecording = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    this.setState({ isRecording: true, audioPath: result });
  };

  stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    this.setState({ isRecording: false, audioPath: result });
  };

  playRecording = async () => {
    const result = await audioRecorderPlayer.startPlayer(this.state.audioPath);
  };

  render() {
    return (
      <View>
        <Text>Audio Recorder App</Text>
        {this.state.isRecording ? (
          <Button title="Stop Recording" onPress={this.stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={this.startRecording} />
        )}
        <Button title="Play Recording" onPress={this.playRecording} />
      </View>
    );
  }
}

export default AudioRecorder;
