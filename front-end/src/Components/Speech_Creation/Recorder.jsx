import React from 'react';
import { ReactMic } from 'react-mic';
import Button from '@material-ui/core/Button'

var title = "";
 
export default class Recorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  record: false,
	}
	title = props.title;
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
	var reader = new FileReader();

    reader.readAsDataURL(recordedBlob.blob); 
    reader.onloadend = function() {
		var form_data = new FormData();
		form_data.append('title', title);
        form_data.append('audio',recordedBlob.blob);
        fetch('api/speech', {
          method : 'POST',
          body: form_data
        }).then(r =>{
          r.text().then(a =>{
            console.log(a)
          })
        })
    }
  }

  render() {
    return (
      <div style={{margin: '20px', textAlign: 'center', display: 'block'}}>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
		  backgroundColor="white"
		  width="500" />
        <Button onClick={this.startRecording} >Start</Button>
		<Button onClick={this.stopRecording} >Send</Button>
      </div>
    );
  }
}
