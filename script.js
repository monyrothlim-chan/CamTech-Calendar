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
    langBtn: "KH",
    instructionsTitle: "How to Add Calendar:",
    step1: "Click any calendar button above",
    step2: "Sign in with your Google account",
    step3: 'Click <strong>"+ Google Calendar"</strong> at the bottom'
  },
  kh: {
    title: "ផ្ទាំងប្រតិទិន",
    subtitle: "ជ្រើសរើសប្រតិទិនពីជម្រើសខាងក្រោម",
    majorTitle: "មុខវិជ្ជាជាមូលដ្ឋាន",
    electiveTitle: "មុខវិជ្ជាជម្រើស",
    langBtn: "EN",
    instructionsTitle: "វិធីបន្ថែមប្រតិទិន៖",
    step1: "ចុចប៊ូតុងប្រតិទិនខាងលើ",
    step2: "ចូលគណនី Google របស់អ្នក",
    step3: 'ចុច <strong>"+ Google Calendar"</strong> នៅខាងក្រោម'
  }
};

let currentLang = "en";

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "kh" : "en";

  document.getElementById("title").textContent = texts[currentLang].title;
  document.getElementById("subtitle").textContent = texts[currentLang].subtitle;
  document.getElementById("majorTitle").textContent = texts[currentLang].majorTitle;
  document.getElementById("electiveTitle").textContent = texts[currentLang].electiveTitle;
  
  // Update instructions if they exist
  const instructionsTitle = document.querySelector('.instructions h3');
  if (instructionsTitle) {
    instructionsTitle.textContent = texts[currentLang].instructionsTitle;
  }
  
  const steps = document.querySelectorAll('.step p');
  if (steps.length >= 3) {
    steps[0].textContent = texts[currentLang].step1;
    steps[1].textContent = texts[currentLang].step2;
    steps[2].innerHTML = texts[currentLang].step3;
  }
  
  langToggle.textContent = texts[currentLang].langBtn;
});

// Detect device and show appropriate notice
function detectDevice() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  const iosNotice = document.getElementById('iosNotice');
  const androidNotice = document.getElementById('androidNotice');
  
  if (isIOS && iosNotice) {
    iosNotice.style.display = 'block';
  } else if (isAndroid && androidNotice) {
    androidNotice.style.display = 'block';
  }
}

// Convert calendar URL to proper format for adding to Google Calendar
function convertToAddCalendarUrl(originalUrl) {
  // Extract the calendar ID from the URL
  const match = originalUrl.match(/cid=([^&]+)/);
  if (!match || !match[1]) return originalUrl;
  
  const calendarId = decodeURIComponent(match[1]);
  
  // Format 1: Direct subscribe URL (works best for web)
  const subscribeUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(calendarId)}`;
  
  // Format 2: For iOS/Android apps (if installed)
  const appUrl = `https://calendar.google.com/calendar/u/0/r?cid=${encodeURIComponent(calendarId)}`;
  
  return {
    web: subscribeUrl,
    app: appUrl,
    calendarId: calendarId
  };
}

// Function to copy calendar ID to clipboard
function copyCalendarId(calendarId) {
  navigator.clipboard.writeText(calendarId).then(() => {
    alert(`Calendar ID copied to clipboard!\n\n${calendarId}\n\nYou can now paste this in Google Calendar app.`);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Open calendar with proper instructions
function openCalendarWithInstructions(link) {
  const urls = convertToAddCalendarUrl(link);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  
  if (isIOS || isAndroid) {
    // For mobile, show detailed instructions
    const choice = confirm(
      "📱 Mobile Instructions:\n\n" +
      "1. This will open Google Calendar\n" +
      "2. Sign in if needed\n" +
      "3. Tap '+ Google Calendar' at bottom\n" +
      "4. Calendar will be added\n\n" +
      "OK to continue?"
    );
    
    if (choice) {
      // Open the subscription URL
      window.open(urls.web, '_blank');
      
      // Optional: Try to open app after a delay
      setTimeout(() => {
        window.open(urls.app, '_blank');
      }, 500);
    }
  } else {
    // For desktop, just open directly
    window.open(urls.web, '_blank');
  }
}

// Alternative: Show a modal with QR code for easy mobile access
function showQRCodeModal(link) {
  const urls = convertToAddCalendarUrl(link);
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 12px; text-align: center; max-width: 400px;">
      <h3>Add Calendar to Mobile</h3>
      <p>Scan QR code with your phone camera:</p>
      <div id="qrcode" style="margin: 1rem 0; padding: 1rem; background: white;"></div>
      <p>Or click link below:</p>
      <a href="${urls.web}" target="_blank" style="color: blue; word-break: break-all;">${urls.web}</a>
      <div style="margin-top: 1.5rem;">
        <button onclick="copyCalendarId('${urls.calendarId.replace(/'/g, "\\'")}')" style="padding: 0.5rem 1rem; margin-right: 0.5rem;">
          Copy Calendar ID
        </button>
        <button onclick="this.closest('div').parentElement.remove()" style="padding: 0.5rem 1rem;">
          Close
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Generate QR code (would need QRCode library)
  // For now, just show the link
}

// Main function to open calendar
function openCalendar(link, button) {
  const urls = convertToAddCalendarUrl(link);
  
  // Show instructions
  const instructions = `
    <div style="text-align: left; padding: 1rem;">
      <h4 style="margin-bottom: 0.5rem;">Instructions to Add Calendar:</h4>
      <ol style="margin: 0; padding-left: 1.2rem;">
        <li>Page will open in Google Calendar</li>
        <li>Sign in with your Google account</li>
        <li>Click <strong>"+ Google Calendar"</strong> button at the bottom</li>
        <li>Calendar will be added to your account</li>
      </ol>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
        <button onclick="window.open('${urls.web}', '_blank'); this.parentElement.parentElement.parentElement.remove();" style="padding: 0.5rem 1rem; background: #4f46e5; color: white; border: none; border-radius: 6px;">
          Open Calendar
        </button>
        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="padding: 0.5rem 1rem; background: #6b7280; color: white; border: none; border-radius: 6px;">
          Cancel
        </button>
      </div>
    </div>
  `;
  
  // Create a simple instruction modal
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 12px;
    z-index: 1000;
    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    max-width: 90%;
    width: 400px;
  `;
  
  if (document.body.classList.contains('dark')) {
    modal.style.background = '#1e293b';
    modal.style.color = 'white';
  }
  
  modal.innerHTML = instructions;
  
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  `;
  
  overlay.onclick = () => {
    document.body.removeChild(overlay);
    document.body.removeChild(modal);
  };
  
  document.body.appendChild(overlay);
  document.body.appendChild(modal);
}

// Add click handlers to all calendar buttons
function setupCalendarButtons() {
  document.querySelectorAll('.calendar-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const link = button.getAttribute('data-link');
      openCalendar(link, button);
    });
  });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
  detectDevice();
  setupCalendarButtons();
});

// Make functions available globally
window.copyCalendarId = copyCalendarId;
window.showQRCodeModal = showQRCodeModal;