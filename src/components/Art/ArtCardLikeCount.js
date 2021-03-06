import React from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

const ArtCardLikeCount = ({ art, handleDisplay }) => {
  return (
    <>
      {(() => {
        switch (art.likes.length) {
          case 0:
            return (
              <>
                <p className="explore art card">
                  <span className="explore art card username">
                    be the first to like this!
                  </span>
                </p>
              </>
            );
          case 1:
            return (
              <>
                <p className="explore art card">
                  liked by{" "}
                  <Link
                    id="user-link"
                    key={art.likes[0].user.id + "u"}
                    to={`/profile/${art.likes[0].user.id}`}
                  >
                    <span className="avi range">
                      <Image
                        className="main art likes avi set-1"
                        avatar
                        src={`https://ipfs.io/ipfs/${art.likes[0].user.avatar}`}
                      />
                    </span>

                    <span className="explore art card username">
                      {art.likes[0].user.username}
                    </span>
                  </Link>
                </p>
              </>
            );
          case 2:
            return (
              <>
                <p className="explore art card">
                  liked by{" "}
                  <span className="avi range">
                    <Image
                      className="main art likes avi set-1"
                      avatar
                      src={`https://ipfs.io/ipfs/${art.likes[0].user.avatar}`}
                      onClick={(e) => handleDisplay(e, "LIKES")}
                    />

                    <Image
                      className="main art likes avi set-2"
                      avatar
                      src={`https://ipfs.io/ipfs/${art.likes[1].user.avatar}`}
                      onClick={(e) => handleDisplay(e, "LIKES")}
                    />
                  </span>
                  <Link
                    id="user-link"
                    key={art.likes[0].user.id + "u"}
                    to={`/profile/${art.likes[0].user.id}`}
                  >
                    <span className="explore art card username">
                      {art.likes[0].user.username}
                    </span>{" "}
                  </Link>
                  and{" "}
                  <a
                    href="/likers"
                    className="explore art card likes"
                    onClick={(e) => handleDisplay(e, "LIKES")}
                  >
                    1 other user
                  </a>
                </p>
              </>
            );
          default:
            return (
              <>
                <p className="explore art card">
                  liked by{" "}
                  <span className="avi range">
                    <Image
                      onClick={(e) => handleDisplay(e, "LIKES")}
                      className="main art likes avi set-1"
                      avatar
                      src={`https://ipfs.io/ipfs/${art.likes[0].user.avatar}`}
                    />

                    <Image
                      onClick={(e) => handleDisplay(e, "LIKES")}
                      className="main art likes avi set-2"
                      avatar
                      src={`https://ipfs.io/ipfs/${art.likes[1].user.avatar}`}
                    />

                    <Image
                      onClick={(e) => handleDisplay(e, "LIKES")}
                      className="main art likes avi set-3"
                      avatar
                      src={`https://ipfs.io/ipfs/${art.likes[2].user.avatar}`}
                    />
                  </span>
                  <Link
                    id="user-link"
                    key={art.likes[0].user.id + "u"}
                    to={`/profile/${art.likes[0].user.id}`}
                  >
                    <span className="explore art card username">
                      {art.likes[0].user.username}
                    </span>{" "}
                  </Link>
                  {"and "}
                  <a
                    onClick={(e) => handleDisplay(e, "LIKES")}
                    href="/likers"
                    className="explore art card likes"
                  >
                    {`${art.likes.length - 1} others`}
                  </a>
                </p>
              </>
            );
        }
      })()}
    </>
  );
};

export default ArtCardLikeCount;
