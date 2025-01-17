// import { Grid } from "@mui/material"
// import { useState } from "react"

// const UploadFile = () =>{

//     const [file,setFile] = useState()

//     console.log(file)

// return (
//     <>
//     <Grid className="file_upload">

//      <input id="upload_file" type="file" onChange={(e) => setFile(e.target.value)} />
//     </Grid>
//     </>
// )
// }
// export default UploadFile

import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./UploadFile.scss";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
// import { ImageConfig } from '../../config/ImageConfig.js';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";

const UploadFile = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);
  const [open, setOpen] = useState(false);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      // props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    // props.onFileChange(updatedList);
  };
  console.log(fileList);

  return (
    <>
      <Grid>
        <Button onClick={() => setOpen(true)}>Upload</Button>
      </Grid>
      <Dialog id="Dialog_id" open={open} sx={{height: '50rem','&.MuiPaper-root-MuiDialog-paper':{
            border:'1px solid red'
          }}}>
        <DialogContent id="Dialog_contain_id" sx={{"&.MuiPaper-root-MuiDialog-paper":{
            border:'1px solid red'
          }}}>
        <Grid className="Dialog_file">
          <DialogTitle sx={{width:'30rem'}}>Upload File</DialogTitle>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <Grid className="drop_file_Index">
          <div
            ref={wrapperRef}
            className="drop-file-input"
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="drop-file-input__label">
              <img
                src={
                  "https://media.geeksforgeeks.org/wp-content/uploads/20240308113922/Drag-.png"
                }
                alt=""
              />
              <p>Drag & Drop your files here</p>
            </div>
            <input type="file" value="" onChange={onFileDrop} />
          </div>
          {fileList.length > 0 ? (
            <div className="drop-file-preview">
              {fileList.map((item, index) => (
                <div key={index} className="drop-file-preview__item">
                  <div className="drop-file-preview__item__info">
                    <p>{item.name}</p>
                  </div>
                  <span
                    className="drop-file-preview__item__del"
                    onClick={() => fileRemove(item)}
                  ></span>
                </div>
              ))}
              <Grid sx={{ alignContent: "center" }}>
                <p className="drop-file-preview__title">Ready to upload</p>
              </Grid>
            </div>
          ) : null}
        </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

UploadFile.propTypes = {
  onFileChange: PropTypes.func,
};

export default UploadFile;
