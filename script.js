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

// Convert Google Calendar web URL to app-specific URL
function convertToGoogleCalendarAppUrl(webUrl) {
  // Extract calendar ID from the URL
  const match = webUrl.match(/cid=([^&]+)/);
  if (match && match[1]) {
    const calendarId = encodeURIComponent(match[1]);
    return `googlecalendar://calendar/embed?src=${calendarId}`;
  }
  return 'googlecalendar://';
}

// Smart calendar opener for iOS/Android
function openCalendarSmart(link) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // For iOS, try to open Google Calendar app with the specific calendar
    const appUrl = convertToGoogleCalendarAppUrl(link);
    
    // Try to open Google Calendar app
    window.location = appUrl;
    
    // Set a timeout to check if the app opened
    setTimeout(() => {
      // If we're still on the page after 500ms, the app didn't open
      // So open the web version instead
      if (!document.hidden) {
        window.open(link, '_blank');
      }
    }, 500);
    
  } else {
    // For Android/Desktop - direct link should work
    window.open(link, '_blank');
  }
}

// Alternative method using iframe for better iOS detection
function openCalendarSmartAlt(link) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Method 1: Try to open Google Calendar app directly
    const appUrl = 'googlecalendar://';
    
    // Create hidden iframe to try opening the app
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = appUrl;
    document.body.appendChild(iframe);
    
    setTimeout(() => {
      document.body.removeChild(iframe);
      
      // Method 2: If app not installed, use universal link
      setTimeout(() => {
        // Google Calendar universal link that should prompt to open in app
        window.open('https://calendar.google.com/calendar/r', '_blank');
        
        // Fallback to original link after another delay
        setTimeout(() => {
          window.open(link, '_blank');
        }, 1000);
      }, 300);
    }, 100);
  } else {
    // Android/Desktop
    window.open(link, '_blank');
  }
}

// Simple method for iOS that works better
function openCalendarForIOS(link) {
  // On iOS, we need to use a different approach
  // First, try to open the Google Calendar app
  window.location = 'googlecalendar://';
  
  // If that doesn't work (app not installed), open web version
  setTimeout(() => {
    // Check if we're still on the same page
    if (!document.hidden) {
      // Open the specific Google Calendar link
      window.open(link, '_blank');
    }
  }, 800);
}

// Add click handlers to all calendar buttons
function setupCalendarButtons() {
  document.querySelectorAll('.calendar-btn').forEach(button => {
    button.addEventListener('click', () => {
      const link = button.getAttribute('data-link');
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      if (isIOS) {
        // For iOS users
        openCalendarForIOS(link);
      } else {
        // For Android/Desktop users
        window.open(link, '_blank');
      }
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  detectIOS();
  setupCalendarButtons();
});