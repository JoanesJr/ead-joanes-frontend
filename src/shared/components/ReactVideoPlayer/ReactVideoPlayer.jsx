import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import Container from "@mui/material/Container";
import "./style.css";
import ControlIcons from "../ComponentsControllIcons/ControlIcons";
import { Box } from "@mui/material";

const format = (seconds) => {
  if (isNaN(seconds)) {
    return "00:00";
  }

  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, "0");

  if (hh) {
    return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
  } else {
    return `${mm}:${ss}`;
  }
};

function ReactVideoPlayer({ title, src, type }) {
  const [playerstate, setPlayerState] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    playerbackRate: 1.0,
    played: 0,
    seeking: false,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);

  const controllPadding =
    type == "url" ? (isFullScreen ? 0 : 5) : isFullScreen ? 0 : 8;
  const borderControll = isFullScreen ? 0 : 10;

  //Destructure State in other to get the values in it
  const { playing, muted, volume, playerbackRate, played, seeking } =
    playerstate;
  const playerRef = useRef(null);
  const playerDivRef = useRef(null);

  //This function handles play and pause onchange button
  const handlePlayAndPause = () => {
    setPlayerState({ ...playerstate, playing: !playerstate.playing });
  };

  const handleMuting = () => {
    setPlayerState({ ...playerstate, muted: !playerstate.muted });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };

  const handleFastForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 30);
  };

  const handleVolumeChange = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handleVolumeSeek = (e, newValue) => {
    setPlayerState({
      ...playerstate,
      volume: parseFloat(newValue / 100),
      muted: newValue === 0 ? true : false,
    });
  };

  const handlePlayerRate = (rate) => {
    setPlayerState({ ...playerstate, playerbackRate: rate });
  };

  const handleFullScreenMode = () => {
    setIsFullScreen(!isFullScreen);
    screenfull.toggle(playerDivRef.current);
  };

  const handlePlayerProgress = (state) => {
    if (!playerstate.seeking) {
      setPlayerState({ ...playerstate, ...state });
    }
  };

  const handlePlayerSeek = (e, newValue) => {
    setPlayerState({ ...playerstate, played: parseFloat(newValue / 100) });
    playerRef.current.seekTo(parseFloat(newValue / 100));
    // console.log(played)
  };

  const handlePlayerMouseSeekDown = (e) => {
    setPlayerState({ ...playerstate, seeking: true });
  };

  const handlePlayerMouseSeekUp = (e, newValue) => {
    setPlayerState({ ...playerstate, seeking: false });
    playerRef.current.seekTo(newValue / 100);
  };

  const currentPlayerTime = playerRef.current
    ? playerRef.current.getCurrentTime()
    : "00:00";
  const movieDuration = playerRef.current
    ? playerRef.current.getDuration()
    : "00:00";
  const playedTime = format(currentPlayerTime);
  const fullMovieTime = format(movieDuration);

  return (
    <>
      <Container maxWidth="md">
        <Box
          className="playerDiv"
          ref={playerDivRef}
          sx={{
            width: "80%",
            height: "60%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "black",
            p: controllPadding,
            border: borderControll,
            borderColor: "primary.main",
            borderRadius: 5,
          }}
        >
          <ReactPlayer
            width={"100%"}
            height="100%"
            ref={playerRef}
            url={src}
            playing={playing}
            volume={volume}
            playbackRate={playerbackRate}
            onProgress={handlePlayerProgress}
            muted={muted}
          />

          <ControlIcons
            key={volume.toString()}
            playandpause={handlePlayAndPause}
            playing={playing}
            rewind={handleRewind}
            fastForward={handleFastForward}
            muting={handleMuting}
            muted={muted}
            volumeChange={handleVolumeChange}
            volumeSeek={handleVolumeSeek}
            volume={volume}
            playerbackRate={playerbackRate}
            playRate={handlePlayerRate}
            fullScreenMode={handleFullScreenMode}
            played={played}
            onSeek={handlePlayerSeek}
            onSeekMouseUp={handlePlayerMouseSeekUp}
            onSeekMouseDown={handlePlayerMouseSeekDown}
            playedTime={playedTime}
            fullMovieTime={fullMovieTime}
            seeking={seeking}
            title={title}
          />
        </Box>
      </Container>
    </>
  );
}

export default ReactVideoPlayer;
