import { TableBody, TableCell, TableRow } from "@mui/material";
import { useCallback, useState } from "react";
import { CommentEntity, PostEntity, UserEntity } from "../dto/types";
import TableElement from "./TableElement";
import TableModal from "./TableModal";

interface MainProps {
    visibleComments: Array<CommentEntity>;
    isSelected: (name: string) => boolean;
    handleClick: (event: any, name: string) => void;
    emptyRows: number;
}

function MainTable(props: MainProps) {
    const { visibleComments, isSelected, handleClick, emptyRows } = props;
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
    const [rowToOpen, setRowToOpen] = useState<[PostEntity, UserEntity] | []>([])

    const handleClickTableRow = useCallback((post: PostEntity, user: UserEntity) => {
        setIsModalOpened(true)
        setRowToOpen([post, user])
    }, [])

    const renderRows = useCallback(() => (visibleComments).map((row, index) => {
        const isItemSelected = isSelected(row.name);
        const labelId = `table-checkbox-${index}`;

        return (
            <TableElement
                key={row.id}
                isItemSelected={isItemSelected}
                handleClickTableRow={handleClickTableRow}
                row={row}
                handleClick={handleClick}
                labelId={labelId}
                isModalOpened={isModalOpened}
                setIsModalOpened={setIsModalOpened}
            />
        )
    }), [handleClick, handleClickTableRow, isModalOpened, isSelected, visibleComments])

    return (
        <TableBody>
            {renderRows()}
            {emptyRows > 0 && (
                <TableRow
                    style={{
                        height: 53 * emptyRows,
                    }}
                >
                    <TableCell colSpan={6} />
                </TableRow>
            )}
            {isModalOpened && <TableModal
            setIsModalOpened={setIsModalOpened}
            rowToOpen={rowToOpen}
            />}
        </TableBody>
    )
}

export default MainTable