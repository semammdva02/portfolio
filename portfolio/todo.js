"use strict";

/* =========================
   TODO APPLICATION
========================= */

const STORAGE_KEY = "sema-portfolio-todos";

let tasks = [];
let currentFilter = "all";


/* =========================
   ELEMENTS
========================= */

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");

const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");

const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");

const filters = document.getElementById("filters");
const clearCompleted = document.getElementById("clearCompleted");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const todayDate = document.getElementById("todayDate");


/* =========================
   DEFAULT DATA
========================= */

const defaultTasks = [
    {
        id: 1,
        title: "Portfolio saytını yeniləmək",
        completed: true
    },
    {
        id: 2,
        title: "JavaScript bacarıqlarını inkişaf etdirmək",
        completed: false
    },
    {
        id: 3,
        title: "Yeni frontend layihəsi hazırlamaq",
        completed: false
    }
];


/* =========================
   INIT
========================= */

function init() {

    loadTasks();

    renderDate();

    renderTasks();

    initTheme();

    taskInput.focus();
}


/* =========================
   STORAGE
========================= */

function loadTasks() {

    try {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {

            tasks = JSON.parse(saved);

        } else {

            tasks = [...defaultTasks];

            saveTasks();
        }

    } catch (error) {

        console.warn("Todo məlumatları oxunmadı:", error);

        tasks = [...defaultTasks];
    }
}


function saveTasks() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(tasks)
        );

    } catch (error) {

        console.warn("Todo məlumatları yadda saxlanılmadı:", error);
    }
}


/* =========================
   DATE
========================= */

function renderDate() {

    const date = new Intl.DateTimeFormat(
        (window.I18n && window.I18n.locale) || "az-AZ",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(new Date());

    todayDate.textContent = date;
}


/* =========================
   FILTER
========================= */

function getFilteredTasks() {

    if (currentFilter === "active") {

        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {

        return tasks.filter(task => task.completed);
    }

    return tasks;
}


/* =========================
   RENDER
========================= */

function renderTasks() {

    const visibleTasks = getFilteredTasks();

    taskList.innerHTML = "";

    visibleTasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className =
            "task-item" +
            (task.completed ? " completed" : "");

        li.style.animationDelay = `${index * 0.03}s`;


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.className = "check";

        checkbox.checked = task.completed;

        checkbox.setAttribute(
            "aria-label",
            `${task.title} ${window.I18n ? window.I18n.t("tamamlandı") : "tamamlandı"}`
        );


        checkbox.addEventListener(
            "change",
            () => toggleTask(task.id)
        );


        const title = document.createElement("span");

        title.className = "task-title";

        title.textContent = window.I18n && task.id >= 1 && task.id <= 3
            ? window.I18n.t(task.title)
            : task.title;


        const deleteButton = document.createElement("button");

        deleteButton.type = "button";

        deleteButton.className = "delete-btn";

        deleteButton.textContent = "×";

        deleteButton.setAttribute(
            "aria-label",
            `${task.title} ${window.I18n ? window.I18n.t("sil") : "sil"}`
        );


        deleteButton.addEventListener(
            "click",
            () => deleteTask(task.id)
        );


        li.append(
            checkbox,
            title,
            deleteButton
        );

        taskList.appendChild(li);
    });


    updateEmptyState(visibleTasks.length);

    updateStats();

    updateFilters();
}


/* =========================
   EMPTY STATE
========================= */

function updateEmptyState(count) {

    emptyState.classList.toggle(
        "visible",
        count === 0
    );
}


/* =========================
   STATS
========================= */

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(task => task.completed).length;

    const active = total - completed;

    const progress =
        total === 0
            ? 0
            : Math.round((completed / total) * 100);


    totalCount.textContent = total;

    activeCount.textContent = active;

    completedCount.textContent = completed;

    progressText.textContent = `${progress}%`;

    progressBar.style.width = `${progress}%`;
}


/* =========================
   FILTER BUTTONS
========================= */

function updateFilters() {

    document
        .querySelectorAll(".filter")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.filter === currentFilter
            );
        });
}


filters.addEventListener("click", event => {

    const button =
        event.target.closest(".filter");

    if (!button) return;

    currentFilter = button.dataset.filter;

    renderTasks();
});


/* =========================
   ADD TASK
========================= */

taskForm.addEventListener("submit", event => {

    event.preventDefault();

    const title = taskInput.value.trim();

    if (!title) {

        taskInput.focus();

        return;
    }


    const newTask = {

        id: Date.now(),

        title,

        completed: false
    };


    tasks.unshift(newTask);

    saveTasks();

    taskInput.value = "";

    currentFilter = "all";

    renderTasks();

    taskInput.focus();
});


/* =========================
   TOGGLE TASK
========================= */

function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {

            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });


    saveTasks();

    renderTasks();
}


/* =========================
   DELETE TASK
========================= */

function deleteTask(id) {

    tasks = tasks.filter(
        task => task.id !== id
    );

    saveTasks();

    renderTasks();
}


/* =========================
   CLEAR COMPLETED
========================= */

clearCompleted.addEventListener(
    "click",
    () => {

        tasks = tasks.filter(
            task => !task.completed
        );

        saveTasks();

        renderTasks();
    }
);


/* =========================
   THEME
========================= */

function initTheme() {

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {

        document.documentElement.dataset.theme =
            "dark";

        themeIcon.textContent = "☀";

    } else {

        document.documentElement.dataset.theme =
            "light";

        themeIcon.textContent = "☾";
    }
}


themeToggle.addEventListener(
    "click",
    () => {

        const isDark =
            document.documentElement.dataset.theme === "dark";


        if (isDark) {

            document.documentElement.dataset.theme =
                "light";

            themeIcon.textContent = "☾";

            localStorage.setItem(
                "portfolio-theme",
                "light"
            );

        } else {

            document.documentElement.dataset.theme =
                "dark";

            themeIcon.textContent = "☀";

            localStorage.setItem(
                "portfolio-theme",
                "dark"
            );
        }
    }
);


/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "/" &&
            document.activeElement !== taskInput
        ) {

            event.preventDefault();

            taskInput.focus();
        }
    }
);


/* =========================
   START
========================= */

init();