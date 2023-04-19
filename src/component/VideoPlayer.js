// VideoPlayer.js
import ReactPlayer from 'react-player';

const VideoPlayer = ({url}) => {
  return (
    <ReactPlayer
      url={url} 
      width='100%'
      height='auto'
      playing
      muted
      loop
      controls={false}
      className='react-player'
      playsinline
    />
  );
};

export default VideoPlayer;

