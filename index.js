let myList = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const clearBtn = document.getElementById("clear-btn");
const savePageBtn = document.getElementById("savePage-btn");

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myList"));

if (leadsFromLocalStorage) {
  myList = leadsFromLocalStorage;
  render(myList);
}

function render(list) {
  let listItems = "";
  for (let i = 0; i < list.length; i++) {
    listItems += `<li><a href='${list[i]}' target='_blank'> ${list[i]} </a></li>`;
  }
  ulEl.innerHTML = listItems;
}
savePageBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myList.push(tabs[0].url);
    localStorage.setItem("myList", JSON.stringify(myList));
    render(myList);
  });
});

clearBtn.addEventListener("click", function () {
  localStorage.clear();
  myList = [];
  render(myList);
});

inputBtn.addEventListener("click", function () {
  myList.push(inputEl.value);
  inputEl.value = "";
  localStorage.setItem("myList", JSON.stringify(myList));
  render(myList);
});
