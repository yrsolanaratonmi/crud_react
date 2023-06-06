import { Checkbox, TableCell, TableRow } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getPost, getUser } from "../api/fetchData";
import { CommentEntity, PostEntity, UserEntity } from "../dto/types";
import TableModal from "./TableModal";

interface TableRowProps {
    isItemSelected: boolean;
    row: CommentEntity;
    handleClick: (event: any, name: string) => void;
    labelId: string;
    isModalOpened: boolean;
    setIsModalOpened: Dispatch<SetStateAction<boolean>>
}

const TableElement = (props: TableRowProps) => {
    const { isItemSelected, row, handleClick, labelId, isModalOpened, setIsModalOpened } = props;
    const [currentPost, setCurrentPost] = useState<PostEntity>();
    const [currentUser, setCurrentUser] = useState<UserEntity>();

    useEffect(() => {
        getPost(row.postId).then(res => setCurrentPost(res.data));
    }, [row.postId]);

    useEffect(() => {
        if (currentPost?.userId) {
            getUser(currentPost.userId).then((res: any) => setCurrentUser(res.data));
        }
    }, [currentPost]);

    return (
        <>
            <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
                onClick={() => setIsModalOpened(true)}
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
            {isModalOpened && <TableModal
                setIsModalOpened={setIsModalOpened}
            />}
        </>
    )
}

export default TableElement