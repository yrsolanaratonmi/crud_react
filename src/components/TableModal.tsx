import { Box, Modal } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

interface TableModalProps {
    setIsModalOpened: Dispatch<SetStateAction<boolean>>
}
const TableModal = (props: TableModalProps) => {
    const { setIsModalOpened } = props;
    const styles ={
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        content: {
            width: 400,
            background: 'white',
            padding: 5
        }
    }
    return (
        <>
            <Modal
                open={true}
                onClose={() => setIsModalOpened(false)}
                sx={styles.container}
            >
                <Box sx={styles.content}>
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </Box>
            </Modal>
        </>
    )
}

export default TableModal