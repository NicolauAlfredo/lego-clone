import { tabsCategories } from "../data/promo-tabs-data";


const tabContent = document.querySelectorAll(".section-featured__cards");
const tabLink = document.querySelectorAll(".section-featured__nav-link");
const contentActive = document.getElementsByClassName("section-featured__cards--active")



function setActiveLink(activeLink) {
  tabLink.forEach((link) => {
    link.classList.remove("section-featured__nav-link--active");
  });
  activeLink.classList.add("section-featured__nav-link--active");
}

function setActiveTab(activeContent){  
  tabLink.forEach((content) => {
    content.classList.remove("section-featured__cards--active");
  })
  activeContent.classList.add("section-featured__cards--active")
}


function openTab(activeTab){
    tabContent.forEach(content => {
        tabContent[content].style.display = "none";
    });
    contentActive.style.display = "block";
}

console.log(tabContent)

function listenButton() {
    contentActive.addEventListener('click', () => {
        setActiveLink(tabLink)
        setActiveTab(tabContent)
    })
}
