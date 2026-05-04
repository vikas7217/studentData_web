import { useEffect, useState } from 'react'
import { getRequest, putRequest } from "../../Dada/Axios"
import { Grid, Pagination, useMediaQuery } from '@mui/material'
import { toast } from 'react-toastify';
import DynamicData from '../dynamicData/DynamicData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAccountDetailPage } from 'pages/Login/LoginSlice';

const Featch = () => {
    
    const navigate = useNavigate()
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [allData, setAllData] = useState()
    const [allEntries, setAllEntries] = useState(0)
    const [entriesFrom, setEntriesFrom] = useState(0)
    const [entriesTo, setEntriesTo] = useState(10)
    const [columnHeader, setColumnHeader] = useState([])
    const isExisting = ['isSuccess'];
    const isMobile = useMediaQuery('(max-width:500px)')
    const dispatch = useDispatch()


    const getData = async () => {
        try {

            const req = await getRequest(`/api/service/my/filter`)
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
        dispatch(onAccountDetailPage(false))
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

    const handelEdit = (id) => {
        navigate(`/CreateData`, { state: { id } })
    }



    const handelRemove = async (id) => {
      const req = await putRequest(`/api/service/removeUser/${id}`);

      if(req.data.isSuccess){
        toast.success(req.data.message)
        getData()
      }
    }
    
    // const tableData = (item) => {

    //     return (
    //         <>
    //             <Grid sx={{ width: '100%', }}>

    //                 <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', }}>
    //                     <Typography sx={{ width: isMobile ? '3rem' : '3rem' }}>{item.id}</Typography>
    //                     <Typography sx={{ width: isMobile ? '6rem' : '6rem' }} >{item.title}</Typography>
    //                     <Typography sx={{ width: isMobile ? '3rem' : '5rem', textAlign: 'center' }}>{item.views}</Typography>
    //                     <Typography sx={{ display: 'flex', justifyContent: 'start' }}>
    //                         <IconButton variant='contained' onClick={() => { handelEdit(item.id); }} sx={{ marginRight: '0.5rem', color: '#02A0FC' }}>
    //                             <EditOutlinedIcon />
    //                         </IconButton>
    //                         <IconButton variant='contained' onClick={() => handelRemove(item.id)} sx={{ color: '#752928' }} >
    //                             <DeleteOutlineOutlinedIcon />
    //                         </IconButton>
    //                     </Typography>
    //                 </div>

    //             </Grid>
    //         </>
    //     )
    // }


    return (
        <>
            <Grid sx={{ display:'flex',justifyContent:'center'}}>
                <Grid sx={{width:'90%'}}>

            <DynamicData data={data} columnHide={isExisting} isMobile={isMobile} handelEdit={handelEdit} handelRemove={handelRemove} column={columnHeader} />
            <Grid mt={1} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                <Pagination count={totalCount} page={page} onChange={handelPagination} variant="outlined" color="primary" />
            </Grid>
                </Grid>
            </Grid>
        </>
    )
}
export default Featch