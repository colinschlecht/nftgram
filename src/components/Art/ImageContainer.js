import React, { useEffect, useRef } from "react";

const ImageContainer = ({ art, location, handleLike }) => {
  //! Used in setting classname for art image
  const imgEl = useRef();
  //! gets image orientation and sets class name accordingly
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
    getImageDim(imgEl);
  });

  return (
    <div className="explore picture container">
      {art && (
        <img
          src={`https://ipfs.io/ipfs/${art.cid}`}
          onClick={location === "art card" ? (e) => handleLike(e) : null}
          ref={imgEl}
          className="explore"
          alt={`An NFT posted with a description of: ${art.description}`}
        />
      )}
    </div>
  );
};

export default ImageContainer;
