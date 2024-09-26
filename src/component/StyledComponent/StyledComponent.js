import { colors, Select, styled, TextField } from "@mui/material";

export const StyledTextFiled = styled(TextField)(
    ({value})=>({

        backgroundColor:'#fcfcf7',

       "& .MuiOutlinedInput-notchedOutline":{
        border: value ? '1px solid #1976d2' : '1px solid #aeb5bc'
       },
       "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":{
        border: value ? '1px solid #1976d2' : '1px solid red'
       },
        "& .MuiInputLabel-root.Mui-error":{
            color: value ? '#1976d2' : 'red'
        },
        // "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-error":{
        //     color: value ? '#1976d2' : 'red' 
        // },
        "& .MuiOutlinedInput-input":{
            border:'#1976d2'
        }
    })
)

export const StyledSelectedFiled = styled(Select)(
    ({value})=>({

        "& .MuiOutlinedInput-notchedOutline":{
            border: value ? '1px solid green' : '1px solid #aeb5bc'
        },

        '.MuiOutlinedInput-notchedOutline.MuiOutlinedInput-notchedOutline':{
            border: value ? '1px solid #1976d2' : '1px solid #aeb5bc'
        }

      
    })
)