import React, { FunctionComponent } from 'react';
import { DiffMethod } from 'react-diff-viewer-continued';
import { FormControlLabel, Switch, FormControl, Select, MenuItem, FormHelperText } from '@material-ui/core';
import './Settings.css'

export type AvailableSettings = {
	splitView: boolean,
	showDiffOnly: boolean,
	disableWordDiff: boolean,
	diffMethod: DiffMethod,
}

type SettingsProps = AvailableSettings & {
  settingsToggleChange(event: React.ChangeEvent<HTMLInputElement>, checked: boolean): void,
  settingsDiffMethodChange(event: React.ChangeEvent<{ name?: string; value: unknown }>, child: React.ReactNode): void,
}

export const Settings: FunctionComponent<SettingsProps> = function(props) {
	return (
		<div className="Settings">
			<FormControlLabel
				control={<Switch checked={props.splitView} onChange={props.settingsToggleChange} name="splitView"/>}
				label="Split View"
			/>
			<FormControlLabel
				control={<Switch checked={props.showDiffOnly} onChange={props.settingsToggleChange} name="showDiffOnly"/>}
				label="Show Diff Only"
			/>
			<FormControlLabel
				control={<Switch checked={props.disableWordDiff} onChange={props.settingsToggleChange} name="disableWordDiff"/>}
				label="Disable Word Diff"
			/>
			<FormControl>
				<Select value={props.diffMethod} onChange={props.settingsDiffMethodChange}>
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
	);
}