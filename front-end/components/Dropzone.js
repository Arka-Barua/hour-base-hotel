import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const Dropzone = ({ onChange, ...rest }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive, open, fileRejections } =
    useDropzone({
      accept: ".jpeg, .png, .jpg",
      maxFiles: 5,
      noClick: true,
      noKeyboard: true,
      onDrop: (acceptedFiles) => {
        console.log(acceptedFiles);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <>
      <div
        {...getRootProps()}
        style={{
          border: "1px dashed #808080",
          borderRadius: 4,
          padding: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input {...getInputProps({ onChange })} defaultValue={[]} />
        {isDragActive ? (
          <p style={{ textAlign: "center" }}>Drop the files here ...</p>
        ) : (
          <p style={{ textAlign: "center" }}>
            Drag 'n' drop some files here, or click upload button to select
            files
          </p>
        )}
        <Button
          onClick={open}
          variant="outlined"
          style={{ textAlign: "center", width: "6rem" }}
        >
          Upload
        </Button>
      </div>
      <h4>Accepted Files</h4>
      {thumbs && <aside style={thumbsContainer}>{thumbs}</aside>}
      <h4>Rejected Files</h4>
      <ul>{fileRejectionItems}</ul>
    </>
  );
};

export default Dropzone;
