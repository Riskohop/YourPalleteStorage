'use strict';

let projects = [];
projects = JSON.parse(localStorage.getItem("projects"));
if(!projects) projects = [];
Loadprojects();
function OpenProject(projectElement) {
    const isHover = e => e.parentElement.querySelector(':hover') === e;
    if(isHover(projectElement.firstElementChild.firstElementChild) === true ) return;
    if(isHover(projectElement.lastElementChild) === true) return;
    window.open(`project.html?project=${window.btoa(projectElement.lastElementChild.textContent)}`, "_self");
}
function Loadprojects() {
    projects.forEach(x => {
        const exampleProject = document.querySelector(".project");
        const newProject = exampleProject.cloneNode(true);

        newProject.style.opacity = "100%";
        newProject.style.position = "unset";
        newProject.style.zIndex = "1";

        newProject.firstElementChild.firstElementChild.style.background = x.dashboardColor;
        newProject.firstElementChild.style.background = x.dashboardColor;
        newProject.firstElementChild.lastElementChild.textContent = `${x.dashboardColor}`;

        newProject.lastElementChild.textContent = x.projectName;

        exampleProject.parentNode.insertBefore(newProject, exampleProject.nextSibling);
        ClearFields()
        CloseNewProjectPanel();
    });
}
function OpenNewProjectPanel() {
    const newProjectForm = document.querySelector(".create-project-parameters");
    newProjectForm.style.position = 'fixed';
    newProjectForm.style.zIndex = "999";
    newProjectForm.style.opacity = "100%";

    const colorPicker = document.querySelector("#dashboard-color");
    colorPicker.value = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
}
function CloseNewProjectPanel() {
    const newProjectForm = document.querySelector(".create-project-parameters");
    newProjectForm.style.position = 'absolute';
    newProjectForm.style.zIndex = "-999";
    newProjectForm.style.opacity = "0";
}
function CreateProject() {
    const projectName = document.querySelector("#project-name");
    const dashboardColor = document.querySelector("#dashboard-color");

    if(!projectName.value) {
        const errorMessage = document.querySelector(".error-create-project");
        errorMessage.textContent = "Project name empty!";
        return;
    }
    else if(projectName.value.length >= 30) {
        const errorMessage = document.querySelector(".error-create-project");
        errorMessage.textContent = "Project name >= 30 symbols!";
        return
    }
    const projectsDashboard = document.querySelector(".main");
    const exampleProject = document.querySelector(".project");
    const newProject = exampleProject.cloneNode(true);

    newProject.style.opacity = "100%";
    newProject.style.position = "unset";
    newProject.style.zIndex = "1";

    newProject.firstElementChild.style.background = dashboardColor.value;
    newProject.firstElementChild.firstElementChild.textContent = `${dashboardColor.value}`;
    newProject.lastElementChild.textContent = projectName.value;

    exampleProject.parentNode.insertBefore(newProject, exampleProject.nextSibling);
    projects.push(
        {
            dashboardColor: dashboardColor.value,
            projectName: projectName.value
        }
    );
    localStorage.setItem("projects", JSON.stringify(projects));
    ClearFields()
    CloseNewProjectPanel();
}
function ClearFields() {
    const projectName = document.querySelector("#project-name");
    const dashboardColor = document.querySelector("#dashboard-color");
    projectName.value = null;
    dashboardColor.value = null;
}
async function CopyHEX(element) {
    try {
        await navigator.clipboard.writeText(element.textContent)

        console.log('Text copied to clipboard successfully!')
    } catch (error) {
        console.error('Failed to copy text:', error)
    }

}