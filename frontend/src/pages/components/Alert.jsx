import * as React from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

const CustAlert = ({open, type, text, callback}) => {
	return <Collapse in={open}> <Alert
		severity={type}
		action={
			<IconButton
				aria-label="close"
				color="inherit"
				size="small"
				onClick={() => {
					callback()
				}}
			>
			<CloseIcon fontSize="inherit" />
			</IconButton>
		}
		sx={{ mb: 2 }}>{text}</Alert></Collapse>
}

export default CustAlert