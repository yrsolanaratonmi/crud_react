import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import { getPost, getUser } from "../api/fetchData";
import { CommentEntity, PostEntity, UserEntity } from "../dto/types";

interface TableRowProps {
    isItemSelected: boolean;
    row: CommentEntity;
    index: number
    handleClick: (event: any, name: string) => void;
    labelId: string;
}

const TableElement = (props: TableRowProps) => {
    const { isItemSelected, row, index, handleClick, labelId } = props;
    const [currentPost, setCurrentPost] = useState<PostEntity>()
    const [currentUser, setCurrentUser] = useState<UserEntity>()
    getPost(row.postId).then(res => setCurrentPost(res.data))
    getUser(currentPost?.userId).then((res: any) => setCurrentUser(res.data))
    return (
        <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
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
            <TableCell align="left">{currentPost?.title}</TableCell>
            <TableCell align="left">{currentUser?.name}</TableCell>
        </TableRow>
    )
}

export default TableElement