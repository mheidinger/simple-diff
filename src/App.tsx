import React from 'react';
import ReactDiffViewer from 'react-diff-viewer';
import './App.css';
import TextBox from './TextBox';

enum TextType {
  LEFT, RIGHT
}

type AppState = {
  leftValue: string,
  rightValue: string,
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      leftValue: "Text here!",
      rightValue: "Comparison here!"
    };
  }

  onTextBoxChange(type: TextType, value: string) {
    switch (type) {
      case TextType.LEFT:
        this.setState({leftValue: value});
        break;
      case TextType.RIGHT:
        this.setState({rightValue: value});
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <TextBox value={this.state.leftValue} onChange={this.onTextBoxChange.bind(this, TextType.LEFT)}/>
        <TextBox value={this.state.rightValue} onChange={this.onTextBoxChange.bind(this, TextType.RIGHT)}/>
        <ReactDiffViewer oldValue={this.state.leftValue} newValue={this.state.rightValue} splitView={true} useDarkTheme={true}/>
      </div>
    );
  }
}

export default App;