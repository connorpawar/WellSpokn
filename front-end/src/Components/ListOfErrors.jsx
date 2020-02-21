import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

// Generate Order Data
function createData(position, type, description) {
  return { position, type, description};
}

const rows = [
  createData(0, 'Grammar', 'This is a test description for the list of errors'),
  createData(1, 'Grammar', 'This is a test description for the list of errors'),
  createData(2, 'Grammar', 'This is a test description for the list of errors'),
  createData(3, 'Grammar', 'This is a test description for the list of errors'),
  createData(4, 'Grammar', 'This is a test description for the list of errors'),
  createData(5, 'Grammar', 'This is a test description for the list of errors'),
  createData(6, 'Grammar', 'This is a test description for the list of errors'),
  createData(7, 'Grammar', 'This is a test description for the list of errors'),
  createData(8, 'Grammar', 'This is a test description for the list of errors'),
  createData(9, 'Grammar', 'This is a test description for the list of errors'),
];

export default function ListOfErrors() {
  return (
    <React.Fragment>
    	<Typography component="h1" variant="h5" color="primary" gutterBottom>
      		Detailed Error Info
    	</Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.position}>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}