// // script.js

// // Translations
// const translations = {
//   en: {
//     welcome: "Welcome to our website!",
//     description: "This is an example of a multi-language site.",
//     contact: "Contact Us"
//   },
//   zh: {
//     welcome: "欢迎来到我们的网站！",
//     description: "这是一个多语言网站的示例。",
//     contact: "联系我们"
//   },
//   km: {
//     welcome: "សូមស្វាគមន៍មកកាន់គេហទំព័ររបស់យើង!",
//     description: "នេះគឺជាគំរូនៃគេហទំព័រពហុភាសា។",
//     contact: "ទំនាក់ទំនងយើង"
//   }
// };

// // Function to update all text
// function changeLanguage(lang) {
//   document.querySelectorAll("[data-translate]").forEach(el => {
//     const key = el.getAttribute("data-translate");
//     el.innerText = translations[lang][key];
//   });

//   // Save language to localStorage
//   localStorage.setItem("selectedLanguage", lang);
// }

// // On language change
// document.getElementById("languageSwitcher").addEventListener("change", function() {
//   changeLanguage(this.value);
// });

// // On page load — use saved language or default
// window.addEventListener("DOMContentLoaded", () => {
//   const savedLang = localStorage.getItem("selectedLanguage") || "en";
//   document.getElementById("languageSwitcher").value = savedLang;
//   changeLanguage(savedLang);
// });


document.querySelectorAll("a[data-link]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault(); // Stop full page reload
    const url = link.getAttribute("href");

    fetch(url)
      .then(res => res.text())
      .then(html => {
        document.getElementById("content").innerHTML = html;
      })
      .catch(err => console.error("Error loading page:", err));
  });
});

const movieUrl = "https://jsonfakery.com/movies/simple-paginate";

fetch(movieUrl)
  .then(res => res.json())
  .then(data => {
    if (data.Search) {
      data.Search.forEach(movie => {
        console.log(movie.original_title); // Each movie title
      });
    } else {
      console.log("No movies found.");
    }
  })
  .catch(err => console.error("Error:", err));
