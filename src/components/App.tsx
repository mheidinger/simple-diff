import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer-continued';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import './App.css';
import TextBox from './TextBox';
import { ThemeProvider, IconButton } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { AvailableSettings, Settings } from './Settings';
import logo from '../resources/logo.png'
import { Footer } from './Footer';

enum TextType {
  LEFT, RIGHT
}

type AppState = AvailableSettings & {
  leftValue: string,
  rightValue: string,
}

const darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      leftValue: "Original here!",
      rightValue: "Changed here!",
      splitView: true,
      showDiffOnly: false,
      disableWordDiff: false,
      diffMethod: DiffMethod.WORDS,
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

  swapValues() {
    this.setState({leftValue: this.state.rightValue, rightValue: this.state.leftValue});
  }

  settingsToggleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean) {
    this.setState({...this.state, [event.target.name]: checked});
  }

  settingsDiffMethodChange(event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode) {
    this.setState({diffMethod: event.target.value as DiffMethod});
  }

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <div className="App">
          <div className="Header">
            <img src={logo} alt="logo" id="logo"/>
            <Settings
              showDiffOnly={this.state.showDiffOnly}
              splitView={this.state.splitView}
              disableWordDiff={this.state.disableWordDiff}
              diffMethod={this.state.diffMethod}
              settingsDiffMethodChange={this.settingsDiffMethodChange.bind(this)}
              settingsToggleChange={this.settingsToggleChange.bind(this)}
            />
          </div>

          <div className="InputBoxes">
            <TextBox value={this.state.leftValue} onChange={this.onTextBoxChange.bind(this, TextType.LEFT)}/>
            <IconButton aria-label="Swap texts" onClick={this.swapValues.bind(this)}>
              <SwapHorizIcon fontSize="large"/>
            </IconButton>
            <TextBox value={this.state.rightValue} onChange={this.onTextBoxChange.bind(this, TextType.RIGHT)}/>
          </div>

          <div className="DiffViewer">
            <ReactDiffViewer
              useDarkTheme={true}
              oldValue={this.state.leftValue}
              newValue={this.state.rightValue}
              splitView={this.state.splitView}
              showDiffOnly={this.state.showDiffOnly}
              disableWordDiff={this.state.disableWordDiff}
              compareMethod={this.state.diffMethod}
              leftTitle="Original"
              rightTitle="Changed"
            />
          </div>
          <Footer/>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;