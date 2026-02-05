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

// Store the original link before trying to open app
let originalLink = '';

// Reliable method to open calendar links on iOS
function openCalendarSmart(link) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Store the original link
    originalLink = link;
    
    // Method 1: Use hidden iframe to try opening Google Calendar app
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '-100px';
    
    // Try to open Google Calendar app
    iframe.src = 'googlecalendar://';
    document.body.appendChild(iframe);
    
    // Listen for page visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Set timeout to fallback to web
    setTimeout(() => {
      // Remove the iframe
      document.body.removeChild(iframe);
      
      // Check if we should fallback to web
      if (originalLink) {
        // Open web version in new tab
        window.open(originalLink, '_blank');
        originalLink = ''; // Reset
      }
      
      // Remove the event listener
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, 1200); // Increased timeout to give iOS more time
    
  } else {
    // Android/Desktop - direct link
    window.open(link, '_blank');
  }
}

function handleVisibilityChange() {
  // If page becomes hidden, app opened successfully
  if (document.hidden) {
    originalLink = ''; // Clear the link since app opened
  }
}

// Alternative simpler method (less reliable but cleaner)
function openCalendarSimple(link) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Create a temporary link element
    const tempLink = document.createElement('a');
    tempLink.href = link;
    tempLink.target = '_blank';
    tempLink.rel = 'noopener noreferrer';
    
    // First, try to trigger Google Calendar app with a user gesture
    const appLink = document.createElement('a');
    appLink.href = 'googlecalendar://';
    appLink.style.display = 'none';
    document.body.appendChild(appLink);
    appLink.click();
    
    // Wait a moment, then click the web link
    setTimeout(() => {
      document.body.removeChild(appLink);
      tempLink.click();
    }, 300);
    
  } else {
    window.open(link, '_blank');
  }
}

// Best method: Use universal links that iOS handles better
function openCalendarUniversal(link) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Extract calendar ID from URL
    const calendarIdMatch = link.match(/cid=([^&]+)/);
    
    if (calendarIdMatch) {
      const calendarId = encodeURIComponent(calendarIdMatch[1]);
      
      // Create Google Calendar universal link
      // This format often works better on iOS
      const universalLink = `https://calendar.google.com/calendar/r?cid=${calendarId}`;
      
      // Try to open it
      window.location.href = universalLink;
      
      // Fallback after delay
      setTimeout(() => {
        // If still on same page after 1 second, open in new tab
        if (window.location.href.includes('your-domain.com') || 
            !document.hidden) {
          window.open(link, '_blank');
        }
      }, 1000);
    } else {
      // If no calendar ID found, use regular link
      window.open(link, '_blank');
    }
  } else {
    window.open(link, '_blank');
  }
}

// Recommended method: Prompt user for better UX
function openCalendarWithPrompt(link) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  if (isIOS) {
    // Ask user what they want to do
    const userChoice = confirm(
      "Open in Google Calendar app?\n\n" +
      "• Click OK to try opening the app\n" +
      "• Click Cancel to open in browser instead\n\n" +
      "Note: If the app doesn't open, it will fall back to browser."
    );
    
    if (userChoice) {
      // User wants to try app
      window.location = 'googlecalendar://';
      
      // Fallback to web after delay
      setTimeout(() => {
        // Check if page is still visible (app didn't open)
        if (!document.hidden) {
          window.open(link, '_blank');
        }
      }, 800);
    } else {
      // User wants web version directly
      window.open(link, '_blank');
    }
  } else {
    window.open(link, '_blank');
  }
}

// Add click handlers to all calendar buttons
function setupCalendarButtons() {
  document.querySelectorAll('.calendar-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const link = button.getAttribute('data-link');
      
      // Use the prompt method for best UX
      openCalendarWithPrompt(link);
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  detectIOS();
  setupCalendarButtons();
});