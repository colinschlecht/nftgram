import React, { useState, useEffect } from "react";

const CommentLikes = ( { likes } ) => {

    const [plural, setPlural] = useState("likes")

    const handleLikeCountClick =(e)=>{
        e.preventDefault()
    }

    useEffect(() => {
        switch (likes) {
            case 0:
               setPlural("likes")
                break;
            case 1:
                setPlural("like")
                break;
            default:
                setPlural("likes")
                break;
        }
    }, [likes])
  return (
    <>
      <a
        href="/like-count"
        id="small-like-count"
        onClick={(e) => handleLikeCountClick(e)}
      >
        <span>{likes} {plural}</span>
      </a>
    </>
  );
};

export default CommentLikes;
