import {combineReducers} from 'redux';

export const songReducer = () => {
    return [
        { title: 'No Scrubs', duration: '4:05' },
        { title: 'Macarena', duration: '3:25' }
    ];
};

export const selectedSongReducer = (selectedSong = null, action) => {
    console.log(action.payload)
    switch(action.type) {
        case 'SONG_SELECTED' :
            return action.payload;
        default:
            return selectedSong;
    }
}

export default combineReducers({
    songs: songReducer,
    selectedSong: selectedSongReducer
});