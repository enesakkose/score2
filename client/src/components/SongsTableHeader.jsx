import React from 'react'
import Icon from '@/components/Icon'
import '@/components/SongsTableHeader.scss'

function SongsTableHeader({children}) {
  return (
    <div className='songsTableTitle'>
      <Icon name='Hashtag' size={20}/>
      <h5 className='songsTableTitle__head'>
        TITLE
      </h5>
      <Icon name='Favorite' size={22}/>
      {children}
    </div>
  )
}

export default SongsTableHeader