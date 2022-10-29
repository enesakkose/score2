import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useClickOutside } from '@/hooks/useClickOutside'
import { useSelector } from 'react-redux'
import { modal } from '@/utils'
import PlaylistHeader from '@/components/PlaylistHeader'
import Icon from '@/components/Icon'
import DropdownMenu from '@/components/DropdownMenu'
import Loading from '@/components/Loading'
import '@/Pages/Playlist/PlaylistHeaderInPlaylist.scss'

function PlaylistHeaderInPlaylist({ playlistId, bgColor }) {
  const { playlists } = useSelector(state => state.playlist)
  const playlistName = playlists.find((playlist) => playlist.id === playlistId)
  const [ open, setOpen ] = useState(false)

  const domNode = useClickOutside(() => { 
    setOpen(false)
  })

  const openPlaylistInfoModal = () => {
    modal('PlaylistInfoModal', playlistName)
    setOpen(false)
  }

  const openPlaylistDeleteModal = () => {
    modal('PlaylistDeleteModal', playlistName)
    setOpen(false)
  }

  if(playlistName === undefined) return <Loading/>

  return (        
    <PlaylistHeader className="playlist__headerInPlaylist" style={{ backgroundColor: `#${bgColor}`}}>
      {/*//!  single classnames in child elements is coming from PlaylistHeader components//*/}
      <div onClick={openPlaylistInfoModal} className="playlist__headerInPlaylist__cover cover">
        <Icon name='Music' size={75}/>
        <span className="playlist__headerInPlaylist__cover__action">
          <Icon name='Pencil' size={48}/>
          Choose Photo
        </span>
      </div>
      <div ref={domNode} className="playlist__headerInPlaylist__info info">
        <h6>PLAYLIST</h6>
        <h1>{playlistName.name}</h1>
        <h6 className='playlist__headerInPlaylist__info__userName'>
          <Link to='/'>
            Aaa(username)
          </Link>
          <button onClick={() => setOpen(!open)} className="playlistAction-btn">
            <Icon name='ThreeDots' size={32}/>
          </button>
          {open && 
            <DropdownMenu  className='playlistActionMenu'>
              <ul>
                <li>
                  <button onClick={openPlaylistInfoModal}>
                    Edit Details
                  </button>
                </li>
                <li>
                  <button onClick={openPlaylistDeleteModal}>
                    Delete
                  </button>
                </li>
              </ul>
            </DropdownMenu>
          }
        </h6>
      </div>
    </PlaylistHeader>
  )
}

export default PlaylistHeaderInPlaylist