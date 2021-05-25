const button = document.querySelector('button');
//const form = document.getElementById('form');
const search = document.querySelector('#search');
const result = document.getElementById('result'); 
async function searchSongs(inputVal) {
    let response = await fetch(`https://api.lyrics.ovh/suggest/${inputVal}`);
    let songData = await response.json();
    let songs = songData.data;
    showData(songs)
}
// show songs data in DOM
const showData = (data) => {
    result.innerHTML = `
      <ul class="songs">
        ${data
          .map(
            song => `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
      </li>`
          )
          .join('')}
      </ul>`
}
// get lyrics
async function getLyrics(artist, songTitle) {
    let response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
    let lyricsData = await response.json();
    showLyrics(artist, songTitle, lyricsData);
}
const showLyrics = (artist, songTitle, lyricsData) => {
    const lyrics = lyricsData.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = `
    <h2><strong>${artist}</strong> - ${songTitle}</h2>
    <span>${lyrics}</span>
    `;
}
button.addEventListener('click', async (e)=> {
    e.preventDefault();
    const userInput = search.value.trim(); // only get text
    // check if user input something
    if(!userInput) {
        alert('Pleas type something')
    } else {
        // then call searchSongs function
        searchSongs(userInput);
    }
}); 
result.addEventListener ('click', (e) =>  {
    const elementClicked = e.target;
    if(elementClicked.tagName === 'BUTTON'){
        console.log(elementClicked)
        const artistName = elementClicked.getAttribute('data-artist');  
        const songTitle = elementClicked.getAttribute('data-songtitle');
        getLyrics(artistName, songTitle)
    }
})