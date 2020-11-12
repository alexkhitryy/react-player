import React, { useState, useRef } from "react";
//import styles
import "./styles/app.scss";
//import components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
//import songs data
import data from "./data";

function App() {
  //Ref
  const audioRef = useRef(null);

  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryOpen, setLibraryOpen] = useState(false);

  //Event Handlers
  const songDurationHandler = (event) => {
    const current = event.target.currentTime;
    const duration = event.target.duration;

    //calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const songEndHandler = async (event) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        };
      } else
        return {
          ...song,
          active: false,
        };
    });
    setSongs(newSongs);
  };
  return (
    <div className={`App ${libraryOpen ? "library-active" : ""}`}>
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        songs={songs}
        setSongs={setSongs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        activeLibraryHandler={activeLibraryHandler}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryOpen={libraryOpen}
        activeLibraryHandler={activeLibraryHandler}
      />
      <audio
        onTimeUpdate={songDurationHandler}
        onLoadedMetadata={songDurationHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
