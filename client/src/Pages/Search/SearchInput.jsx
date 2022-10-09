import React, { useEffect, useMemo, useCallback, useDeferredValue, useState } from 'react'
import { useFocus } from '@/hooks/useFocus'
import { useDispatch, useSelector } from 'react-redux'
import { setQuerySongs } from '@/store/song'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'
import Icon from '@/components/Icon'
import '@/Pages/Search/SearchInput.scss'

function SearchInput() {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const { querySongs } = useSelector(state => state.song)
  
  useEffect(() => {
    dispatch(setQuerySongs(searchParams.get('') || ''))
  }, [searchParams])

  const handleQueryChange = debounce((e) => {
    dispatch(setQuerySongs(e.target.value))

    if(e.target.value.length === 0){
      searchParams.delete('')
      setSearchParams(searchParams, { replace: true })
    }else{
      searchParams.set('', e.target.value)
      setSearchParams(searchParams, { replace: true })
    }
  }, 300)

  const cc = () => {
    //todo buraya bak 
  }

  return (
    <form className='searchInput'>
      <label>
        <Icon className='searchIcon' name='Search' size={24}/>
        <input
          type="text"
          defaultValue={searchParams.get('') || ''}
          onChange={handleQueryChange}
          placeholder='What do you want to listen to ?'
        />
        {querySongs && <button 
          type='button' 
          onClick={cc} 
          className='closeBtn'
        >
          <Icon name='Close' size={24}/>
        </button>}
      {querySongs.length === 1 && <p className='searchInput__error'>Please enter min 2 character</p>}
      </label>
    </form>
    
  )
}

export default SearchInput