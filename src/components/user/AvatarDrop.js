import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "semantic-ui-react";
import PlaceholderExampleImage from "./PPPlaceHolder";

const AvatarDrop = ({ input, user, getFile, avatar }) => {
  const [file, setfile] = useState(input.value);

  const onDrop = useCallback(
    (acceptedFiles) => {
      input.onChange(acceptedFiles);
      const upload = new File(acceptedFiles, acceptedFiles[0].name, {
        type: acceptedFiles[0].type,
      });
      const reader = new FileReader();
      reader.readAsDataURL(upload);
      reader.onloadend = () => {
        const data = reader.result;
        setfile(data);
        getFile(upload)
      };
    },
    [input, getFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const render =
    file.length !== 0 ? (
      <>
        <div className="ui small circular image avatar editing">
          <div className="edit image fill">
            <Icon name="image outline" />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag or click to select files</p>
            )}
          </div>
        </div>
        <img
          alt="uploaded file"
          src={file}
          className="ui small circular image avatar"
        ></img>
      </>
    ) : (
      <>
        <div className="image placeholder">
          {avatar ? (
            <>
              <div className="ui small circular image avatar editing">
                <div className="edit image fill">
                  <Icon name="image outline" />
                  {isDragActive ? (
                    <p>Drop the files here ...</p>
                  ) : (
                    <p>Drag or click to select files</p>
                  )}
                </div>
              </div>
              <img
                alt={`${user.username}'s profile pic. Nice!`}
                className="ui small circular image avatar"
                src={`https://ipfs.io/ipfs/${avatar}`}
              ></img>
            </>
          ) : (
            <PlaceholderExampleImage />
          )}
        </div>
      </>
    );

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {render}
    </div>
  );
};

export default AvatarDrop;
