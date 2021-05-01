import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon, Segment } from "semantic-ui-react";

const Dropzone = ({ input, getFile }) => {
  const [file, setfile] = useState(input.value);

  const onDrop = useCallback(
    (acceptedFiles) => {
      input.onChange(acceptedFiles);
      const upload = new File(acceptedFiles, acceptedFiles[0].name,{
        type: acceptedFiles[0].type
      })
      const reader = new FileReader()
      reader.readAsDataURL(upload)
      reader.onloadend = () => {
        const data = reader.result
        setfile(data)
        getFile(upload)
      }

      
      
      });

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
