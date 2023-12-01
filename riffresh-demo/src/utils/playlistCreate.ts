import playlistsData from '../data/playlists.json';

const PLAYLIST_SIZE = 8;

export function generatePlaylist(plays: Set<any>) {
    let playlist = new Set<any>();
    let songsURIs = new Set<string>();
    let numSongsPerPlaylist = Math.floor(PLAYLIST_SIZE / plays.size);

    for (let name of plays) {
        let songs = playlistsData[name.toLowerCase().replace(/ /g, '') as keyof typeof playlistsData];
        
        let songIndices = Array.from({length: songs.length}, (_, i) => i);
        shuffleArray(songIndices);

        for (let i = 0; i < numSongsPerPlaylist; i++) {
            let song = songs[songIndices[i]];
            console.log(song)
            while (songsURIs.has(song.URI)) {
                songIndices = shuffleArray(songIndices);
                song = songs[songIndices[i]];
            }
            playlist.add(song);
            songsURIs.add(song.URI);
        }
    }
    
    return Array.from(songsURIs);
}

function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
