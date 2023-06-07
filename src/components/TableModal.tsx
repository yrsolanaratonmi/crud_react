import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { getCommentsByPost } from "../api/fetchData";
import { CommentEntity, PostEntity, UserEntity } from "../dto/types";

interface TableModalProps {
    setIsModalOpened: Dispatch<SetStateAction<boolean>>;
    rowToOpen: [PostEntity, UserEntity] | [];
}
const TableModal = (props: TableModalProps) => {
    const { setIsModalOpened, rowToOpen } = props;
    const [currentPost, currentUser] = rowToOpen;
type CommentEntityArray<T extends CommentEntity[] | []> = T extends CommentEntity[] ? T : [];
const [allComments, setAllComments] = useState<CommentEntityArray<Array<CommentEntity>>>([]);

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            width: '80%',
            overflow: 'scroll',
            height: '80%',
            background: 'white',
            padding: 5,
            border: '1px solid black'
        },
    }

    const fetchData = useCallback(async () => {
        const response = await getCommentsByPost(currentPost?.id)
        setAllComments(response.data)
    }, [currentPost?.id])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const renderUserInfo = useCallback(() => {
        return (
            <>
                <h2>User Info</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>User Name</td>
                            <td>{currentUser?.name}</td>
                        </tr>
                        <tr>
                            <td>User Nick</td>
                            <td>{currentUser?.username}</td>
                        </tr>
                        <tr>
                            <td>User Email</td>
                            <td>{currentUser?.email}</td>
                        </tr>
                        <tr>
                            <td>User City</td>
                            <td>{currentUser?.address.city}</td>
                        </tr>
                        <tr>
                            <td>User Street</td>
                            <td>{currentUser?.address.street}</td>
                        </tr>
                        <tr>
                            <td>User Suite</td>
                            <td>{currentUser?.address.suite}</td>
                        </tr>
                        <tr>
                            <td>User Zipcode</td>
                            <td>{currentUser?.address.zipcode}</td>
                        </tr>
                        <tr>
                            <td>User Site</td>
                            <td>{currentUser?.website}</td>
                        </tr>
                        <tr>
                            <td>User Phone</td>
                            <td>{currentUser?.phone}</td>
                        </tr>
                        <tr>
                            <td>User Company</td>
                            <td>{currentUser?.company.name}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }, [currentUser])

    const renderPostInfo = useCallback(() => {
        return (
            <>
                <h2>Post Info</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>Post Title</td>
                            <td>{currentPost?.title}</td>
                        </tr>
                        <tr>
                            <td>Post Body</td>
                            <td>{currentPost?.body}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        )
    }, [currentPost])


    const renderComments = useCallback(() => {
        return allComments.map((element: CommentEntity) => {
            return (
                <>
                    <tr>
                        <td>{element.name}</td>
                        <td>{element.body}</td>
                    </tr>
                </>
            )
        })
    }, [allComments])

    return (
        <>
            <Modal
                open={true}
                onClose={() => setIsModalOpened(false)}
                sx={styles.container}
            >
                <Box sx={styles.content}>
                    {renderUserInfo()}
                    {renderPostInfo()}
                    <h2>
                        All comments related to post
                    </h2>
                    <table>
                        <thead>
                            <th>Post Title</th>
                            <th>Post Body</th>
                        </thead>
                        <tbody>
                            {renderComments()}
                        </tbody>
                    </table>
                </Box>
            </Modal>
        </>
    )
}

export default TableModal