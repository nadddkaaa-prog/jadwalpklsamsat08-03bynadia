// Function Navigasi Tab
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Function Filter / Search Tabel Jadwal PKL
function filterTable() {
    let input = document.getElementById("searchInput");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("pklTable");
    let tr = table.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        let textContent = tr[i].textContent || tr[i].innerText;
        if (textContent.toLowerCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}

// Function Cek Status Operasional Realtime
function checkStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + (now.getMinutes() / 60);
    
    const statusBadge = document.getElementById("statusBadge");
    const statusText = document.getElementById("statusText");

    let isOpen = false;
    if (day >= 1 && day <= 5 && hour >= 8 && hour < 14) {
        isOpen = true;
    } else if (day === 6 && hour >= 8 && hour < 11) {
        isOpen = true;
    }

    if (isOpen) {
        statusBadge.className = "status-badge open";
        statusText.innerText = "🟢 SAMSAT Cimahi Saat Ini Sedang BUKA";
    } else {
        statusBadge.className = "status-badge closed";
        statusText.innerText = "🔴 SAMSAT Cimahi Saat Ini Sedang TUTUP";
    }
}

// Function Play / Pause Manual
function toggleMusic() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggleBtn");
    
    if (audio.paused) {
        audio.play();
        btn.innerText = "⏸️ Hentikan Musik";
        btn.classList.add("playing");
        audio.removeAttribute('data-user-paused');
    } else {
        audio.pause();
        btn.innerText = "🎵 Putar Musik";
        btn.classList.remove("playing");
        audio.setAttribute('data-user-paused', 'true');
    }
}

// Function Otomatis Putar Musik saat Pengguna Pertama Kali Berinteraksi
function initAutoPlay() {
    const audio = document.getElementById("bgMusic");
    const btn = document.getElementById("musicToggleBtn");

    const playAudio = () => {
        if (audio.paused && !audio.getAttribute('data-user-paused')) {
            audio.play().then(() => {
                btn.innerText = "⏸️ Hentikan Musik";
                btn.classList.add("playing");
            }).catch(err => console.log("Autoplay diblokir browser:", err));
        }
    };

    // Coba langsung putar
    playAudio();

    // Event trigger interaksi pertama (klik, sentuh, scroll, tombol)
    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    const handleFirstInteraction = () => {
        playAudio();
        events.forEach(e => document.removeEventListener(e, handleFirstInteraction));
    };

    events.forEach(e => document.addEventListener(e, handleFirstInteraction, { once: true }));
}

// Inisialisasi saat Halaman Selesai Dimuat
document.addEventListener('DOMContentLoaded', () => {
    checkStatus();
    initAutoPlay();
});