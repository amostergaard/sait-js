// Defined Constants 

const FORM = document.forms[0]; // We know there's only one form 

const SUBMIT_BUTTON = document.getElementById("submit-button");
const ERROR_MESSAGE_BOX = document.getElementById("error-messages"); 

// Variables we Care About 

// Function Definitions
function displayLyrics(artist, songTitle, lyrics) {
    console.log("TODO: Display Lyrics Nicely"); 
    let container = document.getElementById('lyric-container');
    let lyricsElement = document.createElement('div');


    lyricsElement.innerHTML = lyrics;
    container.innerHTML = ""; // Clearing inner html
    container.appendChild(lyricsElement);
}

function displayLyricsNotFound() {
    console.log("TODO: Handle Lyrics Not Found"); 
}

function displayErrors(errors) { 
    // We know if we made it here, our errors array has at least one item 
    let html = ""; 

    html += "<p>Please fix the following errors:</p>"; 
    html += "<ul>"; 

    for(let i = 0; i < errors.length; i++) { 
        html += "<li>"; 
        html += errors[i]; 
        html += "</li>"; 
    }
    
    html += "</ul>"; 
    ERROR_MESSAGE_BOX.innerHTML = html; 

    if(ERROR_MESSAGE_BOX.classList.contains('hidden')) { 
        ERROR_MESSAGE_BOX.classList.remove('hidden');
    }
}

function clearErrors() {
    ERROR_MESSAGE_BOX.innerHTML = ""; // Clear the error messages 
    if (!ERROR_MESSAGE_BOX.classList.contains('hidden')) { 
        ERROR_MESSAGE_BOX.classList.add("hidden"); 
    }
}

function fetchLyrics(artist, songTitle) {
    fetch("https://api.lyrics.ovh/v1/" + artist + "/" + songTitle + "")
        .then(function (result) {
            if (!result.ok) {
                throw Error(result.status);
            }

            return result.json();
        })
        .then(function (data) {
            displayLyrics(artist, songTitle, data.lyrics);
        })
        .catch(function (error) {
            console.log("CAUGHT ERROR: " + error); 
            if (error.toString() === "404") { 
                displayLyricsNotFound(); 
            }
        });
}

// Interactivity 

SUBMIT_BUTTON.addEventListener('click', function (event) {
    event.preventDefault();

    let artist = FORM['artist'].value;
    let song = FORM['song'].value;

    let errors = [];

    if (!artist) {
        errors.push("Artist must be defined");
    }

    if (!song) {
        errors.push("Song must be defined");
    }

    // If we have errors, stop dead 
    if (errors.length !== 0) {
        displayErrors(errors); 
        return;
    }

    clearErrors(); 
    fetchLyrics(artist, song);
});