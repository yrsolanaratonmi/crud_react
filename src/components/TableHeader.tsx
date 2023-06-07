import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { ChangeEvent } from "react";


interface TableProps {
  numSelected: number;
  onRequestSort: (event: any, property: string) => void;
  onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
}

const headCells: Array<{id: string, numeric: boolean, label: string}> = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'id',
    numeric: true,
    label: 'ID',
  },
  {
    id: 'email',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'body',
    numeric: false,
    label: 'Comment',
  },
  {
    id: 'body',
    numeric: false,
    label: 'Post'
  },
  {
    id: 'name',
    numeric: false,
    label: 'UserName'
  }
];

function TableHeader(props: TableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: string) => (event: any) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.label}
            align={headCell.numeric ? 'right' : 'left'}
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader