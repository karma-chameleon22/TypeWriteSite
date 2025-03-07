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
const pdfBtn = document.getElementById('pdfBtn');
const textarea = document.getElementById('typewriter');
const titleInput = document.getElementById('titleInput');

// Audio elements - these are now preloaded in `main.js`
const soundCache = window.soundCache || {};

// Change font
fontSelector.addEventListener('change', () => {
    textarea.style.fontFamily = fontSelector.value;
});

// Change font size
fontSizeSelector.addEventListener('change', () => {
    textarea.style.fontSize = fontSizeSelector.value;
});

// Bold, Italic, and Underline functionality with auto-toggle
boldBtn.addEventListener('click', () => {
    document.execCommand('bold');
    updateButtonState(boldBtn, 'bold');
});

italicBtn.addEventListener('click', () => {
    document.execCommand('italic');
    updateButtonState(italicBtn, 'italic');
});

underlineBtn.addEventListener('click', () => {
    document.execCommand('underline');
    updateButtonState(underlineBtn, 'underline');
});

// Alignment buttons for individual paragraphs
leftAlignBtn.addEventListener('click', () => {
    document.execCommand('justifyLeft');
});

centerAlignBtn.addEventListener('click', () => {
    document.execCommand('justifyCenter');
});

rightAlignBtn.addEventListener('click', () => {
    document.execCommand('justifyRight');
});

justifyAlignBtn.addEventListener('click', () => {
    document.execCommand('justifyFull');
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

// Save as PDF functionality
pdfBtn.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const content = textarea.value.split('\n');
    content.forEach((line, index) => {
        doc.text(line, 10, 10 + (index * 10));  // Adding each line at a 10 unit vertical offset
    });

    const title = titleInput.value || 'Untitled Document';
    doc.save(`${title}.pdf`);
});

// Function to update button state based on current selection
function updateButtonState(button, style) {
    const isActive = document.queryCommandState(style);
    if (isActive) {
        button.style.backgroundColor = '#666';  // Active state
    } else {
        button.style.backgroundColor = '#444';  // Inactive state
    }
}

// Ensures pressing Enter creates a distinct paragraph
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();  // Prevent default behavior
        const currentValue = textarea.value;
        const selectionStart = textarea.selectionStart;
        const selectionEnd = textarea.selectionEnd;

        // Split the text at the cursor and insert a new line
        const beforeCursor = currentValue.slice(0, selectionStart);
        const afterCursor = currentValue.slice(selectionEnd);

        textarea.value = beforeCursor + '\n' + afterCursor;
        textarea.selectionStart = textarea.selectionEnd = beforeCursor.length + 1;

        // Play sound when Enter is pressed
        playTypingSound('Enter');
    } else if (e.key === 'Tab') {
        e.preventDefault(); // Prevent default Tab behavior
        const cursorPosition = textarea.selectionStart;
        const currentText = textarea.value;
        const newText = currentText.slice(0, cursorPosition) + '    ' + currentText.slice(cursorPosition);
        textarea.value = newText;
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 4; // Move cursor after tab

        // Play sound for Tab key (could be a space or special sound)
        playTypingSound('Tab');
    } else {
        // Play typing sounds as you type
        playTypingSound(e.key);
    }
});

// Function to play the typing sound for each key
function playTypingSound(key) {
    let soundFile = 'Key1.mp3'; // Default sound
    if (key === ' ') {
        soundFile = 'space.mp3';
    } else if (key === 'Enter') {
        soundFile = 'enter-key.mp3';
    } else if (key === 'Backspace') {
        soundFile = 'backspace.mp3';
    } else if (key === 'Tab') {
        soundFile = 'tab.mp3'; // Add a tab sound if needed
    }

    if (soundCache[soundFile]) {
        soundCache[soundFile].play();
    }
}
