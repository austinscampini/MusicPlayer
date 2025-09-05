import { useAuthenticator } from "@aws-amplify/ui-react";


function App() {
const { signOut } = useAuthenticator();									   

const audio: HTMLAudioElement | null = document.getElementById('my-audio-element') as HTMLAudioElement;


// Safely get the display elements
const durationDisplay: HTMLElement | null = document.getElementById('duration-display');
const currentTimeDisplay: HTMLElement | null = document.getElementById('current-time-display');
const playButton: HTMLButtonElement | null = document.getElementById('play-button') as HTMLButtonElement;

// A flag to keep track of playback state
let isPlaying = false;

// Function to format seconds into a "mm:ss" string
const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

// Event listener for when the audio's metadata (including duration) is loaded
if (audio && durationDisplay) {
    audio.addEventListener('loadedmetadata', () => {
        const duration = audio.duration;
        durationDisplay.textContent = formatTime(duration);
        console.log(`The song length is: ${duration} seconds.`);
    });
}

// Event listener for updating the current playback time
if (audio && currentTimeDisplay) {
    audio.addEventListener('timeupdate', () => {
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
}

// Toggle play/pause function
const togglePlayback = (): void => {
    if (!audio) {
        return;
    }
    if (isPlaying) {
        audio.pause();
        playButton.textContent = '▶';
    } else {
        audio.play().catch(error => {
            console.error("Autoplay failed:", error);
            // Handle browser restrictions on autoplay
        });
        playButton.textContent = '⏸';
    }
    isPlaying = !isPlaying;
};

// Add a click event listener to the button
if (playButton) {
    playButton.addEventListener('click', togglePlayback);
}


  return (
    
<body>
<button onClick={() => signOut()}>
        Sign Out
</button>
    <audio id="my-audio-element" src="./src/library/Delirious.mp3"></audio>
    <div className="music-player">
        <div className="equalizer">
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
            <div className="eq-bar"></div>
        </div>
        
        <div className="album-art"></div>
        
        <div className="song-info">
            <div id="songName" className="song-title">Song Title Placeholder</div>
            <div className="artist">Artist Placeholder</div>
            <div className="album">Album Placeholder</div>
        </div>
        
        <div className="progress-container">
            <div className="progress-bar">
                <div className="progress-fill"></div>
            </div>
            <div className="time-display">
                <p><span id="current-time-display">0:00</span></p>
                <p><span id="duration-display">Loading...</span></p>
            </div>
        </div>
        
        <div className="controls">
            <button className="control-btn">⏮</button>
            <button id="play-button" className="control-btn play-btn">▶</button>
            <button className="control-btn">⏭</button>
        </div>
        
    </div>
</body>

  );
}

export default App;
