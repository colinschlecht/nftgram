import React, { useCallback, useState, useRef, useEffect} from "react";
import { useDropzone } from "react-dropzone";
import { Header, Icon, Segment } from "semantic-ui-react";

const Dropzone = ({ input, getFile }) => {
  const imgEl = useRef();
  const [file, setfile] = useState(input.value);



  const getImageDim = async (imgEl) => {
    if (imgEl) {
      const width = await imgEl.current.naturalWidth;
      const height = await imgEl.current.naturalHeight;
      if (width > height) {
        return (imgEl.current.className = "explore landscape");
      } else {
        return (imgEl.current.className = "explore portrait");
      }
    }
  };

  useEffect(() => {
    if(imgEl.current){
      getImageDim(imgEl)
    }
    
  })
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles)
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
      },[getFile, input]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const render =
    file.length !== 0 ? (
      <Segment attached>
      <div className="imagecontainer artshow" id="art-show">
        <div className="explore picture container">
        <img ref={imgEl} alt="uploaded art" src={file} className={`explore`}></img>
      </div>
      </div>
      </Segment>
    ) : (
      <Segment placeholder  className="imagecontainer artshow">
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
