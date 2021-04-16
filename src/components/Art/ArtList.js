import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { explore, resetAllLoaded, loadingArts } from "../../actions";
import { ArtCard } from "./ArtCard";
import { LoadingArt } from "./LoadingArt";

const ArtList = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.art.page);
  const loading = useSelector((state) => state.art.loading);
  const allLoaded = useSelector((state) => state.art.allLoaded);
  const arts = useSelector((state) => state.art.arts);

  // initial fetch
  useEffect(() => {
    if (page === 0) dispatch(explore(page));
  });

  //checks if element is at the bottom of the page
  const isBottom = (el) =>
    el.getBoundingClientRect().bottom <= window.innerHeight || el.getBoundingClientRect().bottom - window.innerHeight < 1;

    // const isBottom = (el) =>
    // el.getBoundingClientRect().bottom - window.innerHeight < 1;

  //callback for fetch
  const trackScroll = useCallback(() => {
    const wrappedElement = document.getElementById("arts-container");
    if (isBottom(wrappedElement) && !loading) {
      dispatch(loadingArts());
      dispatch(explore(page)).then((res) => console.log(res));
    } 
  }, [page, dispatch, loading]);

  //fetch more art if not loading and element fully in screen
  useEffect(() => {
    if (!allLoaded) document.addEventListener("scroll", trackScroll);
    return () => {
      document.removeEventListener("scroll", trackScroll);
    };
  }, [trackScroll, allLoaded, dispatch]);

  //reset event listener if there is no more to load
  useEffect(() => {
    return () => dispatch(resetAllLoaded());
  }, [dispatch]);

  return (
    <>
      <div id="arts-container">
        <div className="ui two column centered grid">
          <div className="column">
          {arts.map((art) => (
            <ArtCard page={page} key={art.id} art={art} />
          ))}
          </div>
        </div>
      </div>
      {loading && <LoadingArt />}
    </>
  );
};

export default ArtList;
