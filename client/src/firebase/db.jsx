import { app } from '@/firebase'
import { 
    getFirestore, 
    collection, 
    addDoc,
    setDoc,
    doc,
    deleteDoc,
    query,
    where,
    orderBy,
    updateDoc,
    arrayUnion,
    onSnapshot } from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/auth'
import { store } from "@/store"
import { addPlaylist } from '@/store/playlist'
import { popup } from '@/utils'
import { toast } from 'react-hot-toast'

const db = getFirestore(app)

onAuthStateChanged(auth, (user) => {
    if(user) 
    onSnapshot(query(collection(db, 'playlists'), where('uid', '==', auth.currentUser.uid), orderBy('createdAt', 'desc')), (doc) => {
        store.dispatch(
            addPlaylist(
                doc.docs.reduce((playlists, playlist) => [...playlists, playlist.data()], [])
            )
        )
    })
})

export const addPlaylistHandle = async(playlists, id, userId) => {
    await setDoc(doc(db, 'playlists', id),{
        name: `My Playlist #${playlists.length + 1}`,
        id : id,
        uid: userId,
        addedSongs: [],
        coverURL: null,
        createdAt: new Date().toISOString()
    })
    popup(true, 'AddPlaylistPopup')
}


export const updatePlaylist = async(id, data) => {
    try {
        const playlistRef = doc(db, 'playlists', id)
        await updateDoc(playlistRef, data)
        toast.success('Update successful')
        return true
    } catch (error) {
        toast.error('Update is failed!')
    }
}

export const deletePlaylist = async(id) => {
    try {
        await deleteDoc(doc(db, 'playlists', id))
    } catch (error) {
        toast.error(error.message)
    }
}

export const addOrRemoveAddedSongs = async(playlistId, data, addedSongs) => {
    try {
        const playlistRef = doc(db, 'playlists', playlistId)
        const findInAddedSongs = addedSongs.some(song => song.id === data.id)
        await updateDoc(playlistRef, {
            addedSongs: findInAddedSongs
            ? addedSongs.filter(song => song.id !== data.id)
            : arrayUnion(data)
        })
    } catch (error) {
        toast.error(error.message)
    }
}