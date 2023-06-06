import { TableBody, TableCell, TableRow } from "@mui/material";
import { CommentEntity } from "../dto/types";
import TableElement from "./TableElement";

interface MainProps {
    visibleComments: Array<CommentEntity>;
    isSelected: (name: string) => boolean;
    handleClick: (event: any, name: string) => void;
    emptyRows: number;
    filteredRows: Array<CommentEntity>;
}

function MainTable(props: MainProps) {
    const { visibleComments, isSelected, handleClick, emptyRows, filteredRows } = props;
    const renderRows = (filteredRows.length ? filteredRows : visibleComments).map((row, index) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `table-checkbox-${index}`;

        return (
            <TableElement
                isItemSelected={isItemSelected}
                row={row}
                index={index}
                handleClick={handleClick}
                labelId={labelId}
            />
        )
    })

    return (
        <TableBody>
            {renderRows}
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