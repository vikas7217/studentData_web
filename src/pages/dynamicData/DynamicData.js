import { CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import firstLatterCapital from "utils/ToUppercase";

const DynamicData = ({ data, columnHide = ["isSuccess"], isMobile, handelEdit, handelRemove,column }) => {
    const tableData = (item) => {
        return (
            <>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    {Object.keys(item).map((key) => (
                        columnHide.includes(key) ? null : (
                            <Typography key={key} sx={{ width: isMobile ? '5rem' : '10rem',textAlign:'start',margin:'0.5rem',wordBreak:'break-word' }} >
                                {item[key]}
                            </Typography>
                        )
                    ))
                    }
                    <Typography sx={{display: 'flex' }} >
                        <IconButton variant='contained' onClick={() => { handelEdit(item.id) }} sx={{ marginRight: '0.5rem', color: '#02A0FC' }}>
                            <EditOutlinedIcon />
                        </IconButton>
                        <IconButton variant='contained' onClick={() => handelRemove(item.id)} sx={{ color: '#752928' }} >
                            <DeleteOutlineOutlinedIcon />
                        </IconButton>
                    </Typography>
                </Grid>
            </>
        )


    }


    return (
        <>
                <Typography variant="h5" mt={5}> Dynamic Table</Typography>
            <Grid xs={12} mt={3} mb={2} sx={{ display: 'flex', justifyContent: 'center',paddingY:'1rem' }} >
                <Grid xs={12} id="table_main_grid" component={Paper} elevation={3} sx={{ width: isMobile ? '95%' : '97rem', height: '38rem' , maxHeight: '38rem', overflow: 'auto' }}>
                   {data ?  <Table sx={{}} id="table" >
                        <TableHead id="table_head" sx={{ backgroundColor: '#F7F9FF', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between' }}>
                            <TableRow sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {
                                column && Object.keys(column).map((key) => (
                                    <span>
                                        { columnHide.includes(key) ? null : (
                                            <>
                                                <TableCell key={key} sx={{ width: isMobile ? '2.5rem ' : '11rem', padding: '1rem',textAlign:'start' }} >
                                                    {firstLatterCapital(key)}
                                                </TableCell>

                                            </>

                                        )}
                                        </span>
                                    ))
                                    
                                }
                            { column && Object.keys(column).length > 0 ?<TableCell sx={{marginRight:'2rem'}}>
                                Action
                            </TableCell> : ""}
                                </TableRow>
                        </TableHead>

                      <TableBody>
                            {
                                data && data?.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell >
                                            {tableData(item)}
                                        </TableCell>

                                    </TableRow>

                                ))
                               
                            }
                        </TableBody> 
                    </Table> : <Grid sx={{ padding:'2rem 1rem', height:'100%', display:'flex', justifyContent: 'center', alignItems:'center'}}> <CircularProgress /> </Grid> }
                </Grid>
            </Grid>
        </>
    )

}
export default DynamicData