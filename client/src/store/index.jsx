import { configureStore } from '@reduxjs/toolkit'

//STATE
import playlist from '@/store/playlist'
import song from '@/store/song'
import player from '@/store/player'
import auth from '@/store/auth'
import modal from '@/store/modal'

//SERVICES
import { musicApi } from '@/services/music'

export const store = configureStore({
  reducer: {
    playlist,
    song,
    player,
    auth,
    modal,
    [musicApi.reducerPath]: musicApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(musicApi.middleware)
})