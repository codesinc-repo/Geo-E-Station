
const profileicon = document.querySelector("#secoundbaruser"); // Selecting the profile icon
const profilesection = document.querySelector(".profilesection"); // Selecting the profile section

profileicon.addEventListener("click", () => {
  // Add event listener on the profile icon
  profilesection.style.display =
    profilesection.style.display === "none" ? "block" : "none"; // Toggle the display of the profile section
});
const calendericon = document.querySelector(".fa-calendar"); // Selecting the profile icon
const calenndarcontent = document.querySelector("#calendar-content"); // Selecting the profile section

calendericon.addEventListener("click", () => {
  // Add event listener on the profile icon
  calenndarcontent.style.display =
    calenndarcontent.style.display === "none" ? "block" : "none"; // Toggle the display of the profile section
});
const tasksicon = document.querySelector(".fa-tasks"); // Selecting the profile icon
const taskscontent = document.querySelector(".companydata"); // Selecting the profile section
tasksicon.addEventListener("click", () => {
  // Add event listener on the profile icon
  taskscontent.style.display =
    taskscontent.style.display === "none" ? "block" : "none"; // Toggle the display of the profile section
});
const usersicon = document.querySelector(".fa-users"); // Selecting the profile icon
const userscontent = document.querySelector(".userdata"); // Selecting the profile section
usersicon.addEventListener("click", () => {
  // Add event listener on the profile icon
  userscontent.style.display =
    userscontent.style.display === "none" ? "block" : "none"; // Toggle the display of the profile section
});
const messagesicon = document.querySelector(".fa-envelope"); // Selecting the profile icon
const messagescontent = document.querySelector(".memberdata"); // Selecting the profile section
messagesicon.addEventListener("click", () => {
  // Add event listener on the profile icon
  messagescontent.style.display =
    messagescontent.style.display === "none" ? "block" : "none"; // Toggle the display of the profile section
});
const billingicon = document.querySelector(".fa-euro-sign"); // Selecting the profile icon
const billingcontent = document.querySelector(".bilingdata"); // Selecting the profile section
billingicon.addEventListener("click", () => {
  // Add event listener on the profile icon
  billingcontent.style.display =
    billingcontent.style.display === "none" ? "block" : "none"; // Toggle the display of the profile section
});
const createUserButton = document.querySelector(".create-user-button");
const modalBg = document.querySelector(".modal-bg");
const modalContent = document.querySelector(".modal-content");
const closeModal = document.querySelector("#close-modal");
const body = document.querySelector("body");

// Open Modal
createUserButton.addEventListener("click", () => {
modalBg.style.display = "block";
modalContent.style.display = "block";
//body.classList.add("blur");
});

// Close Modal
closeModal.addEventListener("click", () => {
modalBg.style.display = "none";
modalContent.style.display = "none";
body.classList.remove("blur");
});

// Close Modal on Background Click
modalBg.addEventListener("click", () => {
modalBg.style.display = "none";
modalContent.style.display = "none";
body.classList.remove("blur");
});
