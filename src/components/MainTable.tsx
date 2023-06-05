import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import { CommentEntity } from "../dto/types";

interface MainProps {
    visibleRows: Array<CommentEntity>;
    isSelected: (name: string) => boolean;
    handleClick: (event: any, name: string) => void;
    emptyRows: number;
    filteredRows: Array<CommentEntity>;
}

function MainTable(props: MainProps) {
    const { visibleRows, isSelected, handleClick, emptyRows, filteredRows } = props;
    const visibleRender = visibleRows.map((row, index) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        onClick={(event: any) => handleClick(event, row.name)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                >
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.body}</TableCell>
            </TableRow>
        );
    })

    const filteredRender = filteredRows.map((row, index) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.name}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
            >
                <TableCell padding="checkbox">
                    <Checkbox
                        onClick={(event: any) => handleClick(event, row.name)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                    />
                </TableCell>
                <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                >
                    {row.name}
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.body}</TableCell>
            </TableRow>
        );
    })
    return (
        <TableBody>
            {filteredRows.length ? filteredRender : visibleRender}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: 53 * emptyRows,
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
        </TableBody>
    )
}

export default MainTable