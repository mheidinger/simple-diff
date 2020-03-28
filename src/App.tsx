import React from 'react';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import './App.css';
import TextBox from './TextBox';
import { FormControl, FormControlLabel, Switch, Select, MenuItem, FormHelperText, createMuiTheme, ThemeProvider, IconButton } from '@material-ui/core';

enum TextType {
  LEFT, RIGHT
}

type AppState = {
  leftValue: string,
  rightValue: string,
  splitView: boolean,
  showDiffOnly: boolean,
  disableWordDiff: boolean,
  diffMethod: DiffMethod,
}

const darkTheme = createMuiTheme({
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
      diffMethod: DiffMethod.CHARS,
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
          <div className="Settings">
            <FormControlLabel
              control={<Switch checked={this.state.splitView} onChange={this.settingsToggleChange.bind(this)} name="splitView"/>}
              label="Split View"
            />
            <FormControlLabel
              control={<Switch checked={this.state.showDiffOnly} onChange={this.settingsToggleChange.bind(this)} name="showDiffOnly"/>}
              label="Show Diff Only"
            />
            <FormControlLabel
              control={<Switch checked={this.state.disableWordDiff} onChange={this.settingsToggleChange.bind(this)} name="disableWordDiff"/>}
              label="Disable Word Diff"
            />
            <FormControl>
              <Select value={this.state.diffMethod} onChange={this.settingsDiffMethodChange.bind(this)}>
                <MenuItem value={DiffMethod.CHARS}>Characters</MenuItem>
                <MenuItem value={DiffMethod.WORDS}>Words</MenuItem>
                <MenuItem value={DiffMethod.WORDS_WITH_SPACE}>Words with space</MenuItem>
                <MenuItem value={DiffMethod.LINES}>Lines</MenuItem>
                <MenuItem value={DiffMethod.TRIMMED_LINES}>Trimmed Lines</MenuItem>
                <MenuItem value={DiffMethod.SENTENCES}>Sentences</MenuItem>
                <MenuItem value={DiffMethod.CSS}>CSS</MenuItem>
              </Select>
              <FormHelperText>Method used for diffing strings</FormHelperText>
            </FormControl>
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
        </div>
      </ThemeProvider>
    );
  }
}

export default App;