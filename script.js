// Theme toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Language toggle
const langToggle = document.getElementById("langToggle");

const texts = {
  en: {
    title: "Calendar Dashboard",
    subtitle: "Select a calendar from the options below",
    majorTitle: "Major Courses",
    electiveTitle: "Elective Courses",
    langBtn: "KH"
  },
  kh: {
    title: "ផ្ទាំងប្រតិទិន",
    subtitle: "ជ្រើសរើសប្រតិទិនពីជម្រើសខាងក្រោម",
    majorTitle: "មុខវិជ្ជាជាមូលដ្ឋាន",
    electiveTitle: "មុខវិជ្ជាជម្រើស",
    langBtn: "EN"
  }
};

let currentLang = "en";

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "kh" : "en";

  document.getElementById("title").textContent = texts[currentLang].title;
  document.getElementById("subtitle").textContent = texts[currentLang].subtitle;
  document.getElementById("majorTitle").textContent = texts[currentLang].majorTitle;
  document.getElementById("electiveTitle").textContent = texts[currentLang].electiveTitle;
  
  langToggle.textContent = texts[currentLang].langBtn;
});

// Detect iOS and show notice
function detectIOS() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const iosNotice = document.getElementById('iosNotice');
  
  if (isIOS && iosNotice) {
    iosNotice.style.display = 'block';
  }
}

// Smart calendar opener for iOS/Android
function openCalendarSmart(link) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // iOS: Try to open Google Calendar app first
    const googleCalendarScheme = 'googlecalendar://';
    const appleCalendarScheme = 'calshow://';
    
    // Try Google Calendar app first
    window.location = googleCalendarScheme;
    
    // Fallback timers
    setTimeout(() => {
      // If still on page after 300ms, try Apple Calendar
      if (!document.hidden) {
        window.location = appleCalendarScheme;
      }
    }, 300);
    
    setTimeout(() => {
      // If still on page after 800ms, open web calendar
      if (!document.hidden) {
        window.open(link, '_blank');
      }
    }, 800);
  } else {
    // Android/Desktop: Direct link (will open Google Calendar app if installed)
    window.open(link, '_blank');
  }
}

// Add click handlers to all calendar buttons
function setupCalendarButtons() {
  document.querySelectorAll('.calendar-btn').forEach(button => {
    button.addEventListener('click', () => {
      const link = button.getAttribute('data-link');
      openCalendarSmart(link);
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  detectIOS();
  setupCalendarButtons();
});