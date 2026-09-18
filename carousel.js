document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("chapter-player");
    if (!player) return;

    // Pull configuration details from HTML custom properties
    const coverPath = player.getAttribute("data-cover");
    const totalPanels = parseInt(player.getAttribute("data-total"), 10) || 1;

    let currentIndex = 0; // Index 0 represents your cover art panel

    const imgDisplay = document.getElementById("comic-display");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const counter = document.getElementById("panel-counter");

    function renderActiveView() {
        if (currentIndex === 0) {
            // Serve the 1280x480 banner from your covers/ track
            imgDisplay.src = coverPath;
            counter.textContent = "Cover";
            prevBtn.style.opacity = "0.3"; 
        } else {
            // Serve sequential zero-padded panels relative to the active folder
            // Example layout conversion: Index 1 turns into -> aoc01_p1.jpg
            const paddedIndex = currentIndex;
            imgDisplay.src = `aoc01${paddedIndex}.jpg`;
            counter.textContent = `Panel ${currentIndex} of ${totalPanels}`;
            prevBtn.style.opacity = "1";
        }

        // Toggle state styling limits
        nextBtn.style.opacity = currentIndex === totalPanels ? "0.3" : "1";
        
        // Instant window auto-scroll to focus view layout frame updates cleanly
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            renderActiveView();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalPanels) {
            currentIndex++;
            renderActiveView();
        }
    });

    // Run layout constructor step instantly on initialization
    renderActiveView();
});
