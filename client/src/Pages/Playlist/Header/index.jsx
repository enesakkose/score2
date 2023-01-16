import React from 'react'
import CustomPlaylistHeader from '@/components/Playlist/Header'
import PlaylistDropdownMenu from '@/Pages/Playlist/Header/PlaylistDropdownMenu'
import { useGetProfile } from '@/hooks/useGetProfile'
import { Link } from 'react-router-dom'
import { modal } from '@/utils'
import '@/Pages/Playlist/Header/Header.scss'

function Header({ playlist, bgColor, validUser, scrollTop }) {
  const user = useGetProfile(playlist.uid)
  const coverImage = playlist?.addedSongs[0]?.track?.images?.coverart

  return (        
    <CustomPlaylistHeader 
      className="headerInPlaylist" 
      style={{ backgroundColor: `#${bgColor}`}}
      onClick={() => modal('PlaylistInfoModal', playlist)}
      type='PLAYLIST'
      img={playlist?.coverURL !== null ? playlist.coverURL : playlist.addedSongs.length > 0 ? coverImage : null}
      title={playlist.name}
      validProfile={validUser}
      bg={bgColor}
      scrollTop={scrollTop}
    >
      <div className="subActions">
        <h6 className='subActionsLink'>
          <Link to={`/profile/${user?.uid}`}>
            {user?.displayName}
          </Link>
        </h6>
        {validUser && <PlaylistDropdownMenu playlist={playlist}/>}
      </div>
    </CustomPlaylistHeader>
  )
}

export default Header