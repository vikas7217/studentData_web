import { useEffect, useRef, useState } from 'react'
import { getRequest, putRequest } from "../../Dada/Axios"
import { Button, Grid, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material'
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DynamicData from '../dynamicData/DynamicData';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Featch = () => {
    const header = [
        'Id', 'Name', 'Views', 'Action'

    ]


    const navigate = useNavigate()
    const [data, setData] = useState(null)
    // const [viewMode, setViewMode] = useState('post')
    // const [save, setSave] = useState({ 'id': '', 'title': '', 'views': '' })
    // const [id, setId] = useState('')
    const [page, setPage] = useState(1)
    // const [offset, setOffset] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [allData, setAllData] = useState()
    const [allEntries, setAllEntries] = useState(0)
    const [entriesFrom, setEntriesFrom] = useState(0)
    const [entriesTo, setEntriesTo] = useState(10)
    const [columnHeader, setColumnHeader] = useState([])

    const isExisting = ['isSuccess'];
    const isMobile = useMediaQuery('(max-width:500px)')

    const getData = async () => {
        try {

            const req = await getRequest(`/api/service/my`)
            if (req?.data?.isSuccess) {
                const data = req?.data?.usersServicer;
                const offset = data.slice(entriesFrom, entriesTo)
                setAllData(data)
                setData(offset)
                setAllEntries(data.length)
                setColumnHeader(data[0])
            } 

        } catch (error) {
            
            toast.error('data not found ')
        
        }
    }

    useEffect(() => {
        if (allEntries % 10 === 0) {
            const count = allEntries / 10
            setTotalCount(count)
        } else {
            const count = Math.ceil(allEntries / 10)
            setTotalCount(count)

        }

    }, [allEntries])

    useEffect(() => {
        getData()
    }, [])

    const handelPagination = (event, value) => {
        setPage(value)
        if (page < value) {
            let newEntriesFrom = entriesFrom + 10;
            let newEntriesTo = entriesTo + 10

            const data = allData.slice(newEntriesFrom, newEntriesTo)
            setEntriesFrom(newEntriesFrom)
            setEntriesTo(newEntriesTo)
            setData(data)
        }
        else if (page > value) {
            let newEntriesFrom = entriesFrom - 10;
            let newEntriesTo = entriesTo - 10

            const data = allData.slice(newEntriesFrom, newEntriesTo)
            setEntriesFrom(newEntriesFrom)
            setEntriesTo(newEntriesTo)
            setData(data)
        }
        else if (page === value) {
            return
        }

    }
// useEffect(()=>{
// const data = async()=>{
//     const req = await axios.get('http://localhost:4000/posts')
//     const dataReq = req

    
// }
// data()

// const remove = async()=>{
//    const req = await axios.delete(`http://localhost:4000/posts/${'D35S48'}`)
// }
// remove()
// },[])
    
    // const handelChangeData = (e) => {
    //     const { name, value } = e.target

    //     setSave({ ...save, [name]: value })
    // }

    // const handelSave = async () => {
    //     if (viewMode === 'post') {

    //         const response = await postRequest('/posts', { ...save, isExisting: true });

    //         if (response) {

    //             setSave({ 'id': '', 'title': '', 'views': '' })
    //             getData()
    //         }
    //     }
    //     else {
    //         const response = await putRequest(`/posts/${id}`, { ...save, isExisting: true });
    //         if (response) {

    //             setId('')
    //             setSave({ 'id': '', 'title': '', 'views': '' })
    //             getData()
    //         }

    //     }

    // }

    const handelEdit = (id) => {

        // const data = await getRequest(`/posts?id=${id}`)
        //     if (data.length > 0) {
        //         // setData(data)
        //         setSave(...data)
        //         setViewMode('put')
        //     } else {
        //         toast.error('data not found ')

        //     }

        // const editValue = data.find((item) => item.id === id)
        // setViewMode('put')
        // setSave(editValue)
        // setId(id)

        navigate(`/CreateData`, { state: { id } })


    }



    const handelRemove = async (id) => {
      const req = await putRequest(`/api/service/${id}`);

      if(req.data.isSuccess){
        toast.success(req.data.message)
        getData()
      }
    }
    
    const tableData = (item) => {

        return (
            <>
                <Grid sx={{ width: '100%', }}>

                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', }}>
                        <Typography sx={{ width: isMobile ? '3rem' : '3rem' }}>{item.id}</Typography>
                        <Typography sx={{ width: isMobile ? '6rem' : '6rem' }} >{item.title}</Typography>
                        <Typography sx={{ width: isMobile ? '3rem' : '5rem', textAlign: 'center' }}>{item.views}</Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'start' }}>
                            <IconButton variant='contained' onClick={() => { handelEdit(item.id); }} sx={{ marginRight: '0.5rem', color: '#02A0FC' }}>
                                <EditOutlinedIcon />
                            </IconButton>
                            <IconButton variant='contained' onClick={() => handelRemove(item.id)} sx={{ color: '#752928' }} >
                                <DeleteOutlineOutlinedIcon />
                            </IconButton>
                        </Typography>
                    </div>

                </Grid>
            </>
        )
    }


    return (
        <>
            {/* <Grid xs={12} mt={5} sx={{ display: 'flex', justifyContent: 'center' }} >
                <Grid xs={12} sx={{ width: isMobile ? 'auto' : '50%' }} >
                    <Grid sx={{ maxHeight: '24rem', overflow: 'auto', paddingBottom: '0.5rem' }} component={Paper} elevation={2} >

                        <Table sx={{ marginBottom: '0.5rem' }}>
                            <TableHead sx={{ backgroundColor: '#F7F9FF', position: 'sticky', top: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between' }}>

                                {header.map((item) => (
                                    <>
                                        <TableRow sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <TableCell sx={{ width: isMobile ? '2.5rem ' : '5.5rem' }}>{item}</TableCell>
                                        </TableRow>
                                    </>
                                )
                                )}
                            </TableHead>
                            <TableBody>

                                {/* {data?.map((item, index) => (
                                    <>
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.title}</TableCell>
                                            <TableCell>{item.views}</TableCell>
                                            <TableCell sx={{ display: 'flex', justifyContent: 'start', }}>
                                                <IconButton variant='contained' onClick={() => { handelEdit(item.id); }} sx={{ marginRight: '0.5rem', color: '#02A0FC' }}>
                                                    <EditOutlinedIcon />
                                                </IconButton>
                                                <IconButton variant='contained' onClick={() => handelRemove(item.id)} sx={{ color: '#752928' }} >
                                                    <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ))} */}

                                {/* {data?.map((item) => (
                                    <TableRow sx={{ display: 'flex', }} key={item}>
                                        <TableCell sx={{ display: 'flex', width: '100%' }}>

                                            {tableData(item)}
                                        </TableCell>
                                    </TableRow>
                                ))} */}

                            {/* </TableBody> */}

            {/* //             </Table> */}
            {/* //         </Grid> */}
            {/* //         <Grid mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

            //             <Pagination count={totalCount} page={page} onChange={handelPagination} variant="outlined" color="primary" />
            //         </Grid>
            //     </Grid> */}
            {/* // </Grid> */}
            {/* <Button><Link to={'/CreateData'}>go</Link></Button> */}
            {/* <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
                <Grid sx={{ display: 'flex', justifyContent: 'center ', }} xs={12} sm={6}>
                    <Grid sx={{ display: 'flex', flexDirection: 'column' }}>


                        <TextField name='id' label='id' variant='outlined' size='small' value={save.id} onChange={handelChangeData} sx={{ marginTop: '1rem' }} />
                        <TextField name='title' label='title' variant='outlined' size='small' value={save.title} onChange={handelChangeData} sx={{ marginTop: '1rem' }} />
                        <TextField name='views' label='views' variant='outlined' size='small' value={save.views} onChange={handelChangeData} sx={{ marginTop: '1rem', marginBottom: '1rem' }} />
                    </Grid>
                </Grid>
                <Grid xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: isMobile ? '50%' : '20%' }}>
                        <Button variant='contained' onClick={handelSave}>
                            Save
                        </Button>
                        <Button variant='outlined' onClick={handelCancel}>
                            Cancel
                        </Button>

                    </Box>

                </Grid>
            </Grid> */}
            <Grid sx={{ display:'flex',justifyContent:'center'}}>
                <Grid sx={{width:'90%'}}>

            <DynamicData data={data} columnHide={isExisting} isMobile={isMobile} handelEdit={handelEdit} handelRemove={handelRemove} column={columnHeader} />
            <Grid mt={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                <Pagination count={totalCount} page={page} onChange={handelPagination} variant="outlined" color="primary" />
            </Grid>
                </Grid>
            </Grid>
            {/* <DynamicData data={data} columnHide={isExisting} isMobile={isMobile} handelEdit={handelEdit} handelRemove={handelRemove} column={columnHeader} />
            <Grid mt={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                <Pagination count={totalCount} page={page} onChange={handelPagination} variant="outlined" color="primary" />
            </Grid> */}
        </>
    )
}
export default Featch