import { TableBody, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { CommentEntity } from "../dto/types";
import TableElement from "./TableElement";

interface MainProps {
    visibleComments: Array<CommentEntity>;
    isSelected: (name: string) => boolean;
    handleClick: (event: any, name: string) => void;
    emptyRows: number;
}

function MainTable(props: MainProps) {
    const { visibleComments, isSelected, handleClick, emptyRows } = props;
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)



    const renderRows = (visibleComments).map((row, index) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `table-checkbox-${index}`;

        return (
            <TableElement
                isItemSelected={isItemSelected}
                row={row}
                handleClick={handleClick}
                labelId={labelId}
                isModalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
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