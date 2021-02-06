import React, { ChangeEvent } from 'react';
import './TextBox.css';

type TextBoxProps = {
	value: string,
	onChange(value: string): void,
}

type TextBoxState = {
  startValue: string,
}

class TextBox extends React.Component<TextBoxProps, TextBoxState> {
  constructor(props: TextBoxProps) {
    super(props);
    this.state = {
      startValue: props.value,
    };
  }

  handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.props.onChange(event.target.value);
	}

  handleFocus(event: ChangeEvent<HTMLTextAreaElement>) {
    if (this.props.value === this.state.startValue) {
      event.target.select();
    }
  }

  render() {
    return (
      <form className="TextBox">
				<textarea value={this.props.value} onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} />
      </form>
    );
  }
}

export default TextBox;