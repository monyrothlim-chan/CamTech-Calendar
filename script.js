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

// Calendar button redirect
document.querySelectorAll('.calendar-btn').forEach(button => {
  button.addEventListener('click', () => {
    const link = button.getAttribute('data-link');
    window.open(link, '_blank');
  });
});