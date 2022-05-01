import React, { useEffect, useRef, useState } from "react";
import Tabs from "../../components/Tabs/Tabs";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Forward5RoundedIcon from "@mui/icons-material/Forward5Rounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeMuteRoundedIcon from "@mui/icons-material/VolumeMuteRounded";
import ZoomOutMapRoundedIcon from "@mui/icons-material/ZoomOutMapRounded";
import ZoomInMapRoundedIcon from "@mui/icons-material/ZoomInMapRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import SettingsBackupRestoreRoundedIcon from "@mui/icons-material/SettingsBackupRestoreRounded";
import PictureInPictureAltRoundedIcon from "@mui/icons-material/PictureInPictureAltRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import aot4 from "../../assets/images/anime/aot4.jpg";
import Videos from "../Watch/video.webm";
import "./watch.scss";

const Player = () => {
  //states
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  //references
  const videoRef = useRef();
  const progressRef = useRef();
  const animationRef = useRef();

  //Play & Pause
  const handlePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      videoRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      videoRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };
  //While Playing
  const whilePlaying = () => {
    progressRef.current.value = videoRef.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };
  //Change player current time
  const changePlayerCurrentTime = () => {
    progressRef.current.style.setProperty(
      "--seek-before-width",
      `${(progressRef.current.value / duration) * 100}%`
    );
    setCurrentTime(progressRef.current.value);
  };
  // Ended Video
  const onEnded = () => {
    setShowReplay(true);
  };
  const handleReplay = () => {
    setShowReplay(false);
    videoRef.current.play();
  };

  //Duration
  useEffect(() => {
    const times = Math.floor(videoRef.current.duration);
    setDuration(times);
    progressRef.current.max = times;
  }, [videoRef?.current?.loadedmetadata, videoRef?.current?.readyState]);

  //Format time video
  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const reMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const reSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${reMinutes}:${reSeconds}`;
  };

  //Current time video
  const changeRange = () => {
    videoRef.current.currentTime = progressRef.current.value;
    changePlayerCurrentTime();
  };

  // Zoom out
  const handleZoomOut = () => {
    videoRef.current.requestFullscreen();
  };

  return (
    <>
      <div className="ani-watch__main__container">
        <div className="ani-watch__theater-section">
          <div className="ani-watch__header">
            <div className="logo-ani">
              <img className="logo-ani__img" src={aot4} alt="" />
            </div>
            <div className="info-ani">
              <div className="info-ani__content">
                <h2 className="info-ani__title">
                  Episode 1 - From you, 2000 years ago
                </h2>
                <div className="info-ani__toolbar">
                  <div className="info-ani__toolbar__btnFav">
                    <FavoriteIcon fontSize="small" />
                    <span>Favorite</span>
                  </div>
                  <div className="info-ani__toolbar__btnShare">
                    <ReplyOutlinedIcon fontSize="small" />
                    <span>Share</span>
                  </div>
                </div>
              </div>
              <div className="info-ani__subtitle">
                <div className="rate">
                  <StarIcon fontSize="small" />
                  <span className="rate__txt">9.8</span>
                </div>
                <span className="ani__name">Attack on Titan Final Season</span>
                <div className="view">
                  <VisibilityIcon fontSize="small" />
                  <span className="view__txt">2310k views</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ani-player">
            <div className="ani-player__controls">
              <div className="ani-player__progress">
                <input
                  className="seek-bar"
                  defaultValue="0"
                  type="range"
                  step="1"
                  ref={progressRef}
                  onChange={changeRange}
                ></input>
              </div>
              <div className="ani-player__left">
                {!showReplay ? (
                  <div
                    className="ani-player__btn play-pause-control"
                    onClick={handlePlayPause}
                  >
                    {isPlaying ? (
                      <PauseRoundedIcon fontSize="large" />
                    ) : (
                      <PlayArrowRoundedIcon fontSize="large" />
                    )}
                  </div>
                ) : (
                  <div className="ani-player__btn replay-control">
                    <SettingsBackupRestoreRoundedIcon onClick={handleReplay} />
                  </div>
                )}
                <div className="ani-player__btn next5s-control">
                  <Forward5RoundedIcon />
                </div>
                <div className="ani-player__btn volume-control">
                  <VolumeUpRoundedIcon />
                  <input
                    className="volume"
                    type="range"
                    max="1"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="ani-player__timer">
                  <span className="time-elapsed">
                    {calculateTime(currentTime)}
                  </span>
                  <span> / </span>
                  <span className="duration">
                    {duration && !isNaN(duration) && calculateTime(duration)}
                  </span>
                </div>
                {/* <div className="ani-player__btn volume-mute-control">
                  <VolumeMuteRoundedIcon fontSize="medium" />
                </div> */}
              </div>
              <div className="ani-player__right">
                <div className="ani-player__btn pip-control">
                  <PictureInPictureAltRoundedIcon />
                </div>
                {/* <div className="ani-player__btn zoom-in-control">
                  <ZoomInMapRoundedIcon  />
                </div> */}
                <div className="ani-player__btn setting-control">
                  <SettingsIcon />
                </div>
                <div className="ani-player__btn zoom-out-control">
                  <ZoomOutMapRoundedIcon onClick={handleZoomOut} />
                </div>
              </div>
            </div>
            <div className="video-player">
              <video src={Videos} ref={videoRef} onEnded={onEnded}></video>
            </div>
          </div>
          <div className="ani-watch__footer">
            <Tabs />
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
