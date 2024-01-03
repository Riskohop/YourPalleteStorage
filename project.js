'use strict';

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}


let url = new URL(document.URL);
let projectName = window.atob(url.searchParams.get("project"));
document.title = projectName;
let currentState = "All";
const header = document.querySelector(".header");
header.lastElementChild.textContent = projectName;

const example = document.querySelector(".Example");
example.style.zIndex = "-999";
example.style.opacity = "0%";
example.style.position = "absolute";

let categories = [];
//[{
//     nameCategory: 'Super',
//     colors: ['#23f321', '#3213fd']
// },{
//     nameCategory: 'Super2',
//     colors: ['#f23232', '#98521f']
// },{
//     nameCategory: 'Super3',
//     colors: ['#1233d2', '#807512']
// }]
categories = JSON.parse(localStorage.getItem(`Categories${projectName}`));
if(!categories) categories = [];
LoadCategories();
function NewCategory() {
    ClearInputs();
    const categoryName = document.querySelector("#project-name").value;
    if(!categoryName) {
        const errorMessage = document.querySelector(".error-create-Category");
        errorMessage.textContent = "Category name empty!";
        return;
    }
    if(categoryName.length >= 40) {
        const errorMessage = document.querySelector(".error-create-Category");
        errorMessage.textContent = "Category name >= 40 symbols!";
        return;
    }
    const listCategories = document.querySelector(".list-categories");
    let newCategory = listCategories.firstElementChild.cloneNode(true);
    newCategory.firstElementChild.textContent = categoryName;
    listCategories.append(newCategory);
    const mainListCategories = document.querySelector(".main-window");
    const allCategories = mainListCategories.firstElementChild;
    newCategory = allCategories.cloneNode(true);
    newCategory.firstElementChild.textContent = categoryName;
    newCategory.classList.add(categoryName);
    newCategory.classList.remove("Example");
    if(currentState !== "All") {
        newCategory.style.zIndex = -999;
        newCategory.style.position = "absolute";
        newCategory.style.opacity = "0%";
    } else {
        newCategory.style.zIndex = 1;
        newCategory.style.position = "unset";
        newCategory.style.opacity = "100%";
    }
    newCategory.lastElementChild.lastElementChild.name = categoryName;

    allCategories.parentNode.insertBefore(newCategory,allCategories.nextSibling);

    categories.push({
        nameCategory: categoryName,
        colors: []
    })
    localStorage.setItem(`Categories${projectName}`, JSON.stringify(categories));
    CloseNewCategory();
}
function OpenNewCategory() {
    const newCategory = document.querySelector(".new-category");
    newCategory.style.zIndex = 999;
    newCategory.style.opacity = "100%";
}
function CloseNewCategory() {
    const newCategory = document.querySelector(".new-category");
    newCategory.style.zIndex = -999;
    newCategory.style.opacity = "0%";
}
function SelectedCategory(buttonCategory) {
    console.log(buttonCategory.textContent);
    const category = buttonCategory.textContent;

    currentState = category;
    const listCategories = document.querySelectorAll(".category");
    listCategories.forEach(x => {
        if(category === "All") {
            if(!x.classList.contains("Example")) {
                x.style.zIndex = "1";
                x.style.position = "unset";
                x.style.opacity = "100%";
            }
        } else {
            if(!x.classList.contains(category)) {
                x.style.zIndex = "-999";
                x.style.position = "absolute";
                x.style.opacity = "0%";
            } else {
                x.style.zIndex = "1";
                x.style.position = "unset";
                x.style.opacity = "100%";
            }
        }
    });
}
function NewColor(category) {
    const nameCategory = category.name;

    const color = document.querySelector("#dashboard-color");

    const categoryElement = document.querySelector(`.${nameCategory}`);
    const example = categoryElement.lastElementChild.firstElementChild;
    const newColor = example.cloneNode(true);
    newColor.firstElementChild.textContent = color.value;
    newColor.style.backgroundColor = color.value;

    newColor.style.opacity = "100%";
    newColor.style.position = "unset";
    newColor.style.zIndex =  "1";

    example.parentNode.insertBefore(newColor, example.nextSibling);

    categories.forEach(x => {
        if(x.nameCategory === nameCategory) {
            x.colors.push(color.value);
        }
    });
    localStorage.setItem(`Categories${projectName}`,  JSON.stringify(categories));
    CloseNewColor();
}
function OpenNewColor(category){
    const colorPicker = document.querySelector("#dashboard-color");
    colorPicker.value = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
    const newCategory = document.querySelector(".new-color");
    newCategory.style.zIndex = 999;
    newCategory.style.opacity = "100%";
    console.log(category.name);
    document.querySelector("#new-color-btn").name = category.name;
}
function CloseNewColor(){
    const newCategory = document.querySelector(".new-color");
    newCategory.style.zIndex = -999;
    newCategory.style.opacity = "0%";
}
function ClearInputs() {
    const categoryName = document.querySelector("#new-color-btn");
    categoryName.value = "";
}
async function CopyHEX(element) {
    try {
        await navigator.clipboard.writeText(element.firstElementChild.textContent)

        console.log('Text copied to clipboard successfully!')
    } catch (error) {
        console.error('Failed to copy text:', error)
    }

}

function LoadCategories() {
    if(!categories) return;
    categories.forEach(x => {
        const categoryName = x.nameCategory;
        const listCategories = document.querySelector(".list-categories");
        let newCategory = listCategories.firstElementChild.cloneNode(true);
        newCategory.firstElementChild.textContent = categoryName;
        listCategories.append(newCategory);
        const mainListCategories = document.querySelector(".main-window");
        const allCategories = mainListCategories.firstElementChild;
        newCategory = allCategories.cloneNode(true);
        newCategory.firstElementChild.textContent = categoryName;
        newCategory.classList.add(categoryName);
        newCategory.classList.remove("Example");
        if(currentState !== "All") {
            newCategory.style.zIndex = -999;
            newCategory.style.position = "absolute";
            newCategory.style.opacity = "0%";
        } else {
            newCategory.style.zIndex = 1;
            newCategory.style.position = "unset";
            newCategory.style.opacity = "100%";
        }
        newCategory.lastElementChild.lastElementChild.name = categoryName;

        allCategories.parentNode.insertBefore(newCategory,allCategories.nextSibling);

        x.colors.forEach(y => {
            const categoryElement = document.querySelector(`.${categoryName}`);
            const example = categoryElement.lastElementChild.firstElementChild;
            const newColor = example.cloneNode(true);
            newColor.firstElementChild.textContent = y;
            newColor.style.backgroundColor = y;

            newColor.style.opacity = "100%";
            newColor.style.position = "unset";
            newColor.style.zIndex =  "1";

            example.parentNode.insertBefore(newColor, example.nextSibling);
        })
    })
}