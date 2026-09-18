document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const chParam = parseInt(urlParams.get('ch'), 10) || 1;
    const formattedCh = String(chParam).padStart(3, '0'); 

    let currentIndex = 0;
    let chConfig = { title: `Chapter ${chParam}`, total: 1 };

    const titleDisplay = document.getElementById("chapter-title");
    const imgDisplay = document.getElementById("comic-display");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const counter = document.getElementById("panel-counter");

    fetch("panels.json")
        .then(response => {
            if (!response.ok) throw new Error("Panels data file could not be read");
            return response.json();
        })
        .then(data => {
            if (data[formattedCh]) {
                chConfig = data[formattedCh];
            }
            if (titleDisplay) titleDisplay.textContent = chConfig.title;
            renderActiveView();
        })
        .catch(err => {
            console.error(err);
            if (titleDisplay) titleDisplay.textContent = `Chapter ${chParam}`;
            renderActiveView();
        });

    function renderActiveView() {
        if (!imgDisplay || !counter || !prevBtn || !nextBtn) return;

        imgDisplay.src = `chapter${formattedCh}/${formattedCh}${currentIndex}.jpg`;
        counter.textContent = `${currentIndex} / ${chConfig.total}`;
        prevBtn.style.opacity = "1";

        nextBtn.style.opacity = (currentIndex === chConfig.total) ? "0.3" : "1";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                renderActiveView();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentIndex < chConfig.total) {
                currentIndex++;
                renderActiveView();
            }
        });
    }
});
