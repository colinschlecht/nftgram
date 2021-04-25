import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon, Segment } from "semantic-ui-react";

const Dropzone = ({ input }) => {
  const [file, setfile] = useState(input.value);

  const onDrop = useCallback(
    (acceptedFiles) => {
      input.onChange(acceptedFiles);
      var blobPromise = new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onloadend = () => {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
      blobPromise.then((value) => {
        setfile(value);
        localStorage.setItem("cont",value);
      });
    },
    [input]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const render =
    file.length !== 0 ? (
      <img alt="uploaded art" src={file}></img>
    ) : (
      <Segment placeholder>
        <Header icon>
          <Icon name="camera" />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag or click to select files</p>
          )}
        </Header>
      </Segment>
    );

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {render}
    </div>
  );
};

export default Dropzone;
