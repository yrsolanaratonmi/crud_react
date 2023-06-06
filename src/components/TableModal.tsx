import { Box, Button, Modal } from "@mui/material"
const TableModal = () => {
    const styles ={
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }
    }
    return (
        <>
            <Button>Open modal</Button>
            <Modal
                open={false}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={styles.container}
            >
                <Box sx={{ width: 400, background: 'black'}}>
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