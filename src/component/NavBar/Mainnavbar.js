import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery  from '@mui/material/useMediaQuery';
import { NavLink } from 'react-router-dom';
import NavMenuItem from './NavmenuItem';
import { Avatar, Grid, Menu, MenuItem, Tooltip } from '@mui/material';
import { MediaQuery } from 'utils/ReactMediaQuery';
import Servicer from 'utils/Servicer';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword, loginPage } from 'pages/Login/LoginSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export  const MainNavbar= ()=> {

    const isTab = useMediaQuery('(max-width:800px)')
    const isMobile  =MediaQuery()
    // const [openNav, setOpenNav] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openNav = Boolean(anchorEl);
    const navItemRef = React.useRef()

    const getAccountData = useSelector((state)=> state.LoginReducer.isOnAccountDetailPage);

    const dispatch =useDispatch()

    React.useEffect(() =>{
      dispatch( loginPage(false))
        dispatch(changePassword(true))
    }, [])


  const handleOpenNav = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {

    setAnchorEl(null);
  };




  return (
    <Box sx={{ flexGrow: 1, }}>
      <AppBar position="static" sx={{backgroundColor:'rgb(25 21 53 / 87%)'}} >
        <Toolbar sx={{display:'flex',justifyContent:'space-between'}}>
          {!getAccountData&&<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: isMobile ? 'block' : 'none' }}
            onClick={handleOpenNav}
            id="basic-button"
            aria-controls={openNav ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openNav ? 'true' : undefined}
          >
            <MenuIcon />
            
          </IconButton>}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openNav} 
            onClose={handleClose}
            MenuListProps={{
             'aria-labelledby': 'basic-button',
             }}
             sx={{height:'auto'}}
            >
              <NavMenuItem/> 
            </Menu>
          <Grid   sx={{ display: isMobile ? 'none' : 'block' }} >

          {!getAccountData&&<NavMenuItem/>}
          </Grid>
          <Grid xs={8} sx={{ width:"90%", display:'flex', justifyContent:'flex-end' }} mr={4}>
          <Grid sx={{ width:'10rem' }} xs={6} >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Grid>
          </Grid>

          <Box sx={{ flexGrow: 0 }}>
            <Servicer />
          </Box>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
