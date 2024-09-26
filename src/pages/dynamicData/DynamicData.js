import { CircularProgress, Grid, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const DynamicData = ({ data, columnHide = ["isSuccess"], isMobile, handelEdit, handelRemove,column }) => {
    const tableData = (item) => {
        return (
            <>
                <Grid sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    {Object.keys(item).map((key) => (
                        columnHide.includes(key) ? null : (
                            <Typography key={key} sx={{ width: isMobile ? '5rem' : '10rem',textAlign:'start',margin:'0.5rem',wordBreak:'break-word' }} >
                                {item[key]}
                                {/* {tableData(item[key])} */}
                            </Typography>
                        )
                    ))
                    }
                    <Typography sx={{display: 'flex' }} >
                        <IconButton variant='contained' onClick={() => { handelEdit(item.id); }} sx={{ marginRight: '0.5rem', color: '#02A0FC' }}>
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
                <Grid xs={12} component={Paper} elevation={3} sx={{ width: isMobile ? '95%' : '100%', height: '38rem' , maxHeight: '38rem', overflow: 'auto' }}>
                   {data ?  <Table sx={{}}>
                        <TableHead sx={{ backgroundColor: '#F7F9FF', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between' }}>
                            <TableRow sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            {
                                column && Object.keys(column).map((key) => (
                                    <span>
                                        { columnHide.includes(key) ? null : (
                                            <>
                                                <TableCell key={key} sx={{ width: isMobile ? '2.5rem ' : '10rem', padding: '1rem 1.3rem',textAlign:'start' }} >
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
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

                                    // <TableRow key={item.id}>
                                    //    { Object.keys(item).map((key)=> (
                                    //     columnHide.includes(key) ? null : (
                                    //     <TableCell key={key} >
                                    //         {/* {item[key]} */}
                                    //         {tableData(item[key])}
                                    //     </TableCell>
                                    //     )
                                    //     ))
                                    //     }
                                    // </TableRow>
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