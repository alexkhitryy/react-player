import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  audioRef,
  isPlaying,
  libraryOpen,
  activeLibraryHandler,
}) => {
  return (
    <div className={`library ${libraryOpen ? "open" : ""}`}>
      <h2>Song Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setSongs={setSongs}
            song={song}
            setCurrentSong={setCurrentSong}
            id={song.id}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            activeLibraryHandler={activeLibraryHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
