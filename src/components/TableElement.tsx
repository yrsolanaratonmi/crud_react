import { Checkbox, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { getPost, getUser } from "../api/fetchData";
import { CommentEntity, PostEntity, UserEntity } from "../dto/types";
import React from "react";

interface TableRowProps {
    isItemSelected: boolean;
    handleClickTableRow: (post: PostEntity, user: UserEntity) => void;
    row: CommentEntity;
    handleClick: (event: any, name: string) => void;
    labelId: string;
}

const TableElement = (props: TableRowProps) => {
    const { isItemSelected, handleClickTableRow, row, handleClick, labelId } = props;
    const [currentPost, setCurrentPost] = useState<PostEntity>();
    const [currentUser, setCurrentUser] = useState<UserEntity>();

    useEffect(() => {
        getPost(row.postId).then(res => setCurrentPost(res.data));
        if (currentPost?.userId) {
            getUser(currentPost.userId).then((res: any) => setCurrentUser(res.data));
        }
    }, [row.postId, currentPost]);

    return (
        <>
            <TableRow
                hover
                onClick={() => handleClickTableRow( (currentPost as PostEntity), (currentUser as UserEntity))}
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

        </>
    )
}

export default React.memo(TableElement)