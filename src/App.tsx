import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { getComments } from './api/fetchData';
import { getComparator, stableSort } from './api/utils';
import MainTable from './components/MainTable';
import TableHeader from './components/TableHeader';
import TableToolbar from './components/TableToolbar';
import { CommentEntity } from './dto/types';

export default function App() {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('email');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [comments, setComments] = useState<Array<CommentEntity>>([])
const [allComments, setAllComments] = useState<Array<CommentEntity>>([]);

  useEffect(() => {
    fetchComments()
  }, []);


  function fetchComments() {
    getComments().then(res => {
      setComments(res.data)
      setAllComments(res.data)
    })
  }


  const handleRequestSort = useCallback((
    event: any,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [order])

  const handleSelectAllClick = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = comments.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  }, [comments])

  const handleClick = useCallback((event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);

  }, [selected])


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRemoveClick = useCallback(() => {
    const filteredRows = comments.filter((row: CommentEntity) => {
      return !selected.includes(row.name)
    })
    setComments(filteredRows)
    setSelected([]);
  }, [comments, selected])

const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  const filteredRows = allComments.filter((row: CommentEntity) => row.name.includes(value));
  setComments(filteredRows);
};



  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - comments.length) : 0;

  const visibleComments = useMemo(
    () =>
      stableSort(comments, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, comments, rowsPerPage],

  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          numSelected={selected.length}
          handleRemoveClick={handleRemoveClick}
          handleSearchChange={handleSearchChange}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={comments.length}
            />
            <MainTable
              visibleComments={visibleComments}
              isSelected={isSelected}
              handleClick={handleClick}
              emptyRows={emptyRows}
            ></MainTable>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={comments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
