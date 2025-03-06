document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("typewriter");

    // Preload sounds
    const keySounds = [
        new Audio("Key1.mp3"),
        new Audio("Key2.mp3"),
        new Audio("Key3.mp3"),
        new Audio("Key4.mp3")
    ];
    const spaceSound = new Audio("space.mp3");
    const enterSound = new Audio("enter-key.mp3");
    const backspaceSound = new Audio("backspace.mp3");
    const dingSound = new Audio("ding.mp3");
    const fullKeySound = new Audio("FullKey.mp3");

    let lastKeyPressTime = 0;
    let lastDingLine = -1; 

    // Function to play a sound with slight overlap
    function playSound(audio) {
        const newAudio = audio.cloneNode(); // Clone so sounds can overlap slightly
        newAudio.volume = 0.9; // Slight volume reduction for better layering
        newAudio.play();
    }

    function playRandomKeySound() {
        const now = Date.now();
        if (now - lastKeyPressTime > 30) { // Allow slight overlap for smoother sound
            const sound = keySounds[Math.floor(Math.random() * keySounds.length)];
            playSound(sound);
            lastKeyPressTime = now;
        }
    }

    textarea.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            playSound(enterSound);
        } else if (event.key === "Backspace") {
            playSound(backspaceSound);
        } else if (event.key === " ") {
            playSound(spaceSound);
        } else if (event.key.length === 1) {
            playRandomKeySound();
        }

        // Ding sound only plays when reaching a new line end
        setTimeout(() => {
            const lines = textarea.value.split("\n");
            const lastLineIndex = lines.length - 1;
            const lastLine = lines[lastLineIndex] || "";

            if (lastLine.length > 80 && lastDingLine !== lastLineIndex) {
                playSound(dingSound);
                lastDingLine = lastLineIndex;
            }
        }, 10);
    });
});
