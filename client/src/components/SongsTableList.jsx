import React from 'react'
import Icon from '@/components/Icon'
import { setCurrent, playPause, setCurrentSongs } from '@/store/player'
import { useSelector, useDispatch } from 'react-redux'
import '@/components/SongsTableList.scss'

function SongsTableList({children, index, song, findSongs}) {
  const dispatch = useDispatch()
  const { current, isPlaying } = useSelector(state => state.player)

  const listPlayBtn = () => {
    dispatch(setCurrent({song, index}))
    dispatch(setCurrentSongs(findSongs))
    
    if(current.key === song.key) return dispatch(playPause(!isPlaying))
    if(current.key !== song.key) return dispatch(playPause(true))
  }
  
  const validMusic = current.key === song.key && isPlaying

  return (
    <div 
      onDoubleClick={listPlayBtn} 
      className={`songsTableListItem ${validMusic ? 'playingListItem' : ''}`}
    >
      <div className='songsTableListItem__indexPlay'>
        <span className='songsTableListItem__indexPlay__index'>
          {index + 1}
        </span>
        <button className='songsTableListItem__indexPlay__playBtn'>
          <Icon name={validMusic ? 'Stop' : 'Play'}/>
        </button>
      </div>
      
      <h4 className='songsTableListItem__text'>
        {song.title}
        <span>{song.subtitle}</span>
      </h4>
      {children}
    </div>
  )
}

export default SongsTableList