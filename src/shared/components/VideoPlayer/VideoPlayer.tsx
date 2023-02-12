import {useState, useRef, useEffect} from "react";
// import "./ControlIcons.css";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Button, Slider, Select, MenuItem } from "@mui/material";

interface IVideoPlayer {
  width: any;
  height: any;
  srcVideo: string;
  srcCap?: string;
}

function usePlayerState($videoPlayer: any): any {
  const [playerState, setPlayerState] = useState({
    playing: false,
    percentage: 0,
  });

  useEffect(() => {
    playerState.playing
      ? $videoPlayer.current.play().then( (data) => {
        // console.log("then")
      }).catch( err => {
        // console.log(err)
      })
      : $videoPlayer.current.pause();
  }, [$videoPlayer, playerState.playing]);

  function toggleVideoPlay() {
    setPlayerState({
      ...playerState,
      playing: !playerState.playing,
    });
  }

  function handleTimeUpdate() {
      const currentPercentage = ($videoPlayer.current?.currentTime / $videoPlayer.current.duration) * 100;
      setPlayerState({
        ...playerState,
        percentage: currentPercentage,
      });
  }

  function handleChangeVideoPercentage(event) {
    const currentPercentageValue = event.target.value;
    $videoPlayer.current.currentTime = $videoPlayer.current.duration / 100 * currentPercentageValue
  }

  return {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage,
  };
}

export const VideoPlayer = ({
  width,
  height,
  srcCap = "https://play-lh.googleusercontent.com/t4y-bkIKRqF5fqjYfnWdvwBze6V_wYE9vj8fyNqccOc29T-DVbhxEl6acyQQd6hXx-c",
  srcVideo,
}: IVideoPlayer) => {
  const $videoPlayer = useRef(null);
  const {
    playerState,
    toggleVideoPlay,
    handleTimeUpdate,
    handleChangeVideoPercentage,
  } = usePlayerState($videoPlayer);
  const [speed, setSpeed] = useState(1);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width={width}
      height={height}
    >
      {/* Top Segment */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="start"
        style={{ padding: 16 }}
      >
        <Grid item>
          <Box width={width} height={height}>
            <video
              ref={$videoPlayer}
              src={srcVideo}
              poster={srcCap}
              onTimeUpdate={handleTimeUpdate}
              height={height}
              width={width}
            />
          </Box>

          <Grid container>
            <Grid item xs={1}>
              <Button variant="text" onClick={toggleVideoPlay}>
                {playerState.playing ? "Pause" : "Play"}
              </Button>
            </Grid>
            <Grid item xs={10}>
              <Box>
                <Slider
                  min={0}
                  max={100}
                  defaultValue={0}
                  value={playerState.percentage}
                  onChange={handleChangeVideoPercentage}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={1}
              display="flex"
              justifyContent="end"
              alignItems="center"
              alignContent="center"
            >
              <Select
                value={speed}
                onChange={(event) => setSpeed(Number(event.target.value))}
                size="small"
                variant="standard"
              >
                {[1, 2, 3].map((speed) => (
                  <MenuItem key={`speedChange_${speed}`} value={speed}>
                    {speed}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

