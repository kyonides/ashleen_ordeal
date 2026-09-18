// Mock data framework for chapter images
const chapterData = {
    chapter1: [
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500"
    ],
    chapter2: [
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500",
        "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500"
    ],
    chapter3: [
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500"
    ]
};

let currentImages = [];
let currentIndex = 0;

const chapterSelect = document.getElementById('chapterSelect');
const container = document.getElementById('imageContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function loadChapter(chapterKey) {
    container.innerHTML = '';
    currentImages = chapterData[chapterKey] || [];
    currentIndex = 0;

    currentImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Page ${index + 1}`;
        if (index === 0) img.classList.add('active');
        container.appendChild(img);
    });
    
    updateButtons();
}

function updateButtons() {
    const images = container.querySelectorAll('img');
    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateButtons();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        updateButtons();
    }
});

chapterSelect.addEventListener('change', (e) => {
    loadChapter(e.target.value);
});

// Initial load
loadChapter(chapterSelect.value);
