import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';


export default function ListOfErrors(props) {
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
          {props.data.map(row => (
            <TableRow key={row.Start}>
              <TableCell>{row.Start}</TableCell>
              <TableCell>{row.Type}</TableCell>
              <TableCell>{row.Description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}