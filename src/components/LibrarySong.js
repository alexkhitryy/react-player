import React from "react";

const LibrarySong = ({
  songs,
  setSongs,
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  id,
  activeLibraryHandler,
}) => {
  const songSelectHandler = async () => {
    await setCurrentSong(song);

    //Add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
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

    if (isPlaying) audioRef.current.play();
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.album}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
