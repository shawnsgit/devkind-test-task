import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function HistoryTable(props) {
	if (props.history.length === 0) return 'empty history'
	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Gender</TableCell>
						<TableCell>Age</TableCell>
						<TableCell>Address</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Password</TableCell>
						<TableCell>Time</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{props.history.map((row, index) => (
						<TableRow
							key={`table-row-${index}`}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell >{row.userFirstName}</TableCell>
							<TableCell >{row.userLastName}</TableCell>
							<TableCell >{row.userGender}</TableCell>
							<TableCell >{row.userAge}</TableCell>
							<TableCell >{row.userAddress}</TableCell>
							<TableCell >{row.userEmail}</TableCell>
							<TableCell >{row.userPassword}</TableCell>
							<TableCell >{row.timeStamp}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}