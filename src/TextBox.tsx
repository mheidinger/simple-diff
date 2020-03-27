import React, { ChangeEvent } from 'react';
import './TextBox.css';

type TextBoxProps = {
	value: string,
	onChange(value: string): void;
}

class TextBox extends React.Component<TextBoxProps> {
  handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		this.props.onChange(event.target.value)
	}

  render() {
    return (
      <form className="TextBox">
				<textarea value={this.props.value} onChange={this.handleChange.bind(this)} />
      </form>
    );
  }
}

export default TextBox;