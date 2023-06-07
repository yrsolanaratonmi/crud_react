import { Button } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"
import { CommentEntity } from "../dto/types"
import React from "react"

interface ModalCommentsProps {
    element: CommentEntity
    editIndex: number
    setEditIndex: Dispatch<SetStateAction<number>>
    index: number,
    changeComments: (index: number, editValue: string, setEditValue: Dispatch<SetStateAction<string>>) => void;
}


const ModalComments = (props: ModalCommentsProps) => {
    const { element, editIndex, setEditIndex, index, changeComments } = props;

    const styles = {
        editWindow: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '10px'
        },
        editArea: {
            width: '400px',
            height: '130px'
        }
    }

    const [editValue, setEditValue] = useState<string>(element.body)


    return (
        <tr key={element.id}>
            <td>{element.name}</td>
            {editIndex === index
                ?
                <div style={styles.editWindow}>
                    <textarea
                    style={styles.editArea}
                    onChange={(e) => setEditValue(e.target.value)}
                    value={editValue} />
                    <Button
                    sx={{ height: '40px' }}
                    variant="outlined"
                    onClick={() => changeComments(index, editValue, setEditValue)}>
                    Save
                    </Button>
                </div>
                : <td onClick={() => setEditIndex(index)}>{element.body}</td>}
        </tr>
    )
}

export default React.memo(ModalComments)