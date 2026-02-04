const calendarLink =
  "https://docs.google.com/spreadsheets/d/11Vs7UTY-r3_9UoooULhy4Ut3Nn0hW5fhINnv6cEZffA/edit?usp=sharing";

// Redirect
document.getElementById("viewCalendarBtn").addEventListener("click", () => {
  window.open(calendarLink, "_blank");
});

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
    subtitle: "Click the button below to view all calendars",
    button: "View Calendar",
    langBtn: "KH"
  },
  kh: {
    title: "ផ្ទាំងប្រតិទិន",
    subtitle: "ចុចប៊ូតុងខាងក្រោម ដើម្បីមើលប្រតិទិនទាំងអស់",
    button: "មើលប្រតិទិន",
    langBtn: "EN"
  }
};

let currentLang = "en";

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "kh" : "en";

  document.getElementById("title").textContent = texts[currentLang].title;
  document.getElementById("subtitle").textContent =
    texts[currentLang].subtitle;
  document.getElementById("viewCalendarBtn").textContent =
    texts[currentLang].button;

  langToggle.textContent = texts[currentLang].langBtn;
});
