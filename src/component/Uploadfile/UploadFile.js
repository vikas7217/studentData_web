import React, { useRef, useState } from "react";
import "./UploadFile.scss";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import upload_file from "../../assets/coworkers-office-working-together.jpg";
import upload_cloud from "../../assets/upload-cloud-svgrepo-com.svg";
import trash_icon from "../../assets/trash.svg";
import { postFileUploadRequest } from "Dada/Axios";
import { toast } from "react-toastify";

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
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const saveFile = async (file) => {
    const formData = new FormData();
    formData.append("files", file);
    try {
      const response = await postFileUploadRequest(
        "/api/upload-file/upload",
        formData
      );
      if (response.data.isSuccess) {
        toast.success(response?.data?.message);
        setOpen(false);
        setFileList([])
      } else {
        toast.error(response?.data?.error);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Grid>
        <Button onClick={() => setOpen(true)}>Upload</Button>
      </Grid>
      <Dialog
        id="Dialog_id"
        open={open}
        sx={{
          height: "50rem",
          "&.MuiPaper-root-MuiDialog-paper": {
            border: "1px solid red",
          },
        }}
      >
        <Grid className="Dialog_file">
          <DialogTitle sx={{ width: "30rem" }}>Upload File</DialogTitle>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
        <DialogContent id="Dialog_contain_id">
          <Grid className="drop_file_Index">
            <div
              ref={wrapperRef}
              className="drop-file-input"
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <div className="drop-file-input__label">
                <img src={upload_file} alt="" />
                <p>Drag & Drop your files here</p>
              </div>
              <input type="file" value="" onChange={onFileDrop} />
            </div>
            {fileList.length > 0 ? (
              <Grid className="drop-file-preview">
                {fileList.map((item, index) => (
                  <Grid
                    xs={12}
                    key={index}
                    className="drop-file-preview__item"
                    sx={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Grid xs={9} className="drop-file-preview__item__info">
                      <p>{item.name}</p>
                    </Grid>

                    <Grid className="drop-file-preview__item_index">
                      <Grid
                        className="drop-file-preview__item__del"
                        onClick={() => fileRemove(item)}
                      >
                        {" "}
                        <img src={trash_icon} alt="icon" />
                      </Grid>

                      <Grid
                        className="drop-file-preview__title"
                        onClick={() => saveFile(item)}
                      >
                        <img src={upload_cloud} alt="icon" />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ) : null}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadFile;
