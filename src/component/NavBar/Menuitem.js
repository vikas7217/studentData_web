
// import AboutIcon from 'assets/world.svg';
import CreateIconB from 'assets/icon-plus (1).svg';
import CreateIconW from 'assets/icon-plusW.svg'
import BuildingIcon from 'assets/building.svg'
import EmployeeIcon from 'assets/portrait.svg'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BuildingW from 'assets/Industryw.svg'
import EmployeeIconW from 'assets/User_box_light (1).svg'


export const MenuItem = [
    {
        title:'Home',
        icon: <KeyboardArrowDownOutlinedIcon/>,
        subNav: [
            {
                title:'Users Data',
                icon:[<img src={BuildingW} style={{height:'1rem',width:'1rem'}}  alt='icon'  />,<img src={BuildingIcon} style={{height:'1rem',width:'1rem'}}  alt='icon' />],
                path:'/home'
             },
             {
                title:'Company',
                icon:[<img src={BuildingW} style={{height:'1rem',width:'1rem'}}  alt='icon'  />,<img src={BuildingIcon} style={{height:'1rem',width:'1rem'}}  alt='icon' />],
                path:''
             },
        ]
    },
    {
        title: 'About',
        icon: <KeyboardArrowDownOutlinedIcon/>,
        subNav: [
                 {
                    title:'Company',
                    icon:[<img src={BuildingW} style={{height:'1rem',width:'1rem'}}  alt='icon'  />,<img src={BuildingIcon} style={{height:'1rem',width:'1rem'}}  alt='icon' />],
                    path:''
                 },
                 {
                    title:'Employee Meant',
                    icon:[<img src={EmployeeIconW} alt='icon' style={{height:'1.5rem',width:'1rem'}}  />,<img src={EmployeeIcon} alt='icon' style={{height:'1rem',width:'1rem'}}  />],
                    path:''

                 }
                ]
    },
    {
        title: 'Create',
        icon: <KeyboardArrowDownOutlinedIcon/>,
        subNav:[
            {
            title:'Create',
            icon:[<img src={CreateIconW} alt='icon' style={{height:'1rem',width:'1rem',color:'red'}}  />,<img src={CreateIconB} alt='icon' style={{height:'1rem',width:'1rem',color:'red'}}  />],
            path:'/CreateData'
         }
        ]
    }

]