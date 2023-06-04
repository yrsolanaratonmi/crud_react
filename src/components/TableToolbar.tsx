import { DeleteOutline } from "@mui/icons-material";
import {Box, Button, Toolbar, Tooltip, Typography, alpha, OutlinedInput} from "@mui/material";
import React, { ChangeEvent } from "react";

interface TableToolbarProps {
    numSelected: number;
    handleRemoveClick: () => void;
    handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TableToolbar(props: TableToolbarProps) {
    const { numSelected, handleRemoveClick, handleSearchChange } = props;
    // @ts-ignore
    return (
        <Toolbar
            sx={{
                pl: { sm: 1 },
                pr: { xs: 1, sm: 5 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >

            <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
            >
                {numSelected} selected
            </Typography>
            <Box style={{display: 'flex', gap: '10px', height: '30px'}}>
                    {numSelected > 0 && (
                <Tooltip title="Delete">
                    <Button variant="outlined" startIcon={<DeleteOutline />} onClick={() => handleRemoveClick()}>
                        Delete
                    </Button>
                </Tooltip>
            )}
            <OutlinedInput
    placeholder="Поиск комментария"
    onChange={handleSearchChange}
    />
            </Box>
        </Toolbar>

    );
}
export default TableToolbar