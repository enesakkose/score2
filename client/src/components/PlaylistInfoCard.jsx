import React from 'react'
import Icon from '@/components/Icon'
import Card from '@/components/Card'
import { setCurrent, setCurrentSongs, playPause } from '@/store/player'
import { useDispatch, useSelector } from 'react-redux'

function PlaylistInfoCard({playlist, userName = false}) {
  const dispatch = useDispatch()
  const { current, isPlaying } = useSelector(state => state.player)
  const validCoverImg = playlist.coverURL === null && playlist.addedSongs.length > 0
  const coverImage = playlist?.addedSongs[0]?.track?.images?.coverart
  const haveSongs = playlist.addedSongs.some(song => song.id === current.key)
  
  const playInPlaylist = () => {
    if(current.key !== playlist.addedSongs[0].id && haveSongs) 
    return dispatch(playPause(!isPlaying))

    dispatch(setCurrent(playlist.addedSongs[0].track))
    dispatch(setCurrentSongs(playlist.addedSongs))

    if(current.key === playlist.addedSongs[0].id) return dispatch(playPause(!isPlaying))
    if(current.key !== playlist.addedSongs[0].id) return dispatch(playPause(true))
  }

  return (
    <Card
      onClick={playInPlaylist}
      playPause={isPlaying && haveSongs}
      className={isPlaying && haveSongs ? 'showBtn': ''}
      title={playlist.name}
      name={userName}
      playBtn={playlist.addedSongs.length > 0}
      href={`/playlist/${playlist.id}`}
    >     
      {playlist.coverURL !== null 
          ? (<img src={playlist.coverURL} alt="cover"/>)
          
          : (validCoverImg 
              ? <img src={coverImage} alt="cover"/>  
              : <Icon name='Music' size={52}/>
            )
      }
    </Card>
  )
}
export default PlaylistInfoCard