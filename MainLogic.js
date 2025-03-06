// Function to play a sound
function playSound(soundFile) {
    const audio = new Audio(soundFile); // Create a new audio object
    audio.play().catch(error => {
        console.error('Error playing sound:', error); // Handle errors
    });
}

// Get elements
const fontSelector = document.getElementById('fontSelector');
const fontSizeSelector = document.getElementById('fontSizeSelector');
const boldBtn = document.getElementById('boldBtn');
const italicBtn = document.getElementById('italicBtn');
const underlineBtn = document.getElementById('underlineBtn');
const leftAlignBtn = document.getElementById('leftAlignBtn');
const centerAlignBtn = document.getElementById('centerAlignBtn');
const rightAlignBtn = document.getElementById('rightAlignBtn');
const justifyAlignBtn = document.getElementById('justifyAlignBtn');
const saveBtn = document.getElementById('saveBtn');
const textarea = document.getElementById('typewriter');
const titleInput = document.getElementById('titleInput');

// Sound files
const soundFiles = {
    key: 'key.mp3',            // Change to correct path if necessary
    backspace: 'backspace.mp3',
    space: 'space.mp3',
    enter: 'enter.mp3',
};

// Function to handle key presses and play appropriate sound
textarea.addEventListener('keydown', (event) => {
    let soundToPlay = null;

    if (event.key === 'Enter') {
        soundToPlay = soundFiles.enter;
    } else if (event.key === 'Backspace') {
        soundToPlay = soundFiles.backspace;
    } else if (event.key === ' ') {
        soundToPlay = soundFiles.space;
    } else {
        soundToPlay = soundFiles.key; // Default sound for any other key
    }

    if (soundToPlay) {
        playSound(`./${soundToPlay}`); // Ensure sound path is correct relative to the HTML file
    }
});

// Change font
fontSelector.addEventListener('change', () => {
    textarea.style.fontFamily = fontSelector.value;
});

// Change font size
fontSizeSelector.addEventListener('change', () => {
    textarea.style.fontSize = fontSizeSelector.value;
});

// Bold, Italic, and Underline functionality
boldBtn.addEventListener('click', () => {
    document.execCommand('bold');
});

italicBtn.addEventListener('click', () => {
    document.execCommand('italic');
});

underlineBtn.addEventListener('click', () => {
    document.execCommand('underline');
});

// Alignment buttons
leftAlignBtn.addEventListener('click', () => {
    textarea.style.textAlign = 'left';
});

centerAlignBtn.addEventListener('click', () => {
    textarea.style.textAlign = 'center';
});

rightAlignBtn.addEventListener('click', () => {
    textarea.style.textAlign = 'right';
});

justifyAlignBtn.addEventListener('click', () => {
    textarea.style.textAlign = 'justify';
});

// Save button (Download content as a .txt file with the title as filename)
saveBtn.addEventListener('click', () => {
    const content = textarea.value;
    const title = titleInput.value || 'Untitled Document'; // Default to 'Untitled Document' if no title is entered
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.txt`;
    link.click();
});
