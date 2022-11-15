import React, { useDeferredValue, useMemo, useState, useEffect } from 'react'
import Categories from '@/Pages/Search/Categories'
import SearchResult from '@/Pages/Search/SearchResult'
import Loading from '@/components/Loading'
import SearchError from '@/components/SearchError'
import { useDebounceValue } from '@/hooks/useDebounceValue'
import { useSelector } from 'react-redux'
import { useGetSearchSongsQuery } from '@/services/music'
import { profileQuery } from '@/firebase/db'
import '@/Pages/Search/Search.scss'

function Search() {
  const { querySongs } = useSelector(state => state.song)
  const { profiles } = useSelector(state => state.profiles)
  const debouncedSearch = useDebounceValue(querySongs, 600)
  const [skip, setSkip] = useState(true)//this state was used to for not send request when page first render 
  const { data, isFetching, isSuccess, error } = useGetSearchSongsQuery(debouncedSearch, {skip})

  useEffect(() => {
    setSkip(querySongs.length > 1 ? false : true)
    profileQuery(querySongs)
  }, [querySongs])

  if(isFetching || profiles === null ) return <Loading/>
  if(error) return <SearchError text={querySongs} status={error.status}/>
  
  return (
    <div className='search'>
      {querySongs.length < 2 && <Categories/>}
      {isSuccess && !isFetching && <SearchResult 
        profiles={profiles}
        songs={data.tracks.hits} 
        querySongs={debouncedSearch} 
      />}
    </div>
  )
}

export default Search