import React, { FunctionComponent } from "react";
import './Footer.css'

export const Footer: FunctionComponent = function(props) {
	return (
		<div className="Footer">
			<p>Made by <a href="https://max-heidinger.de">Max Heidinger</a></p>
		</div>
	);
}