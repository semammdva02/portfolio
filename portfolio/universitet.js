"use strict";


/* =========================
   UNIVERSITY MANAGEMENT
========================= */

const STORAGE_KEY = "sema-university-system";

const SUBJECTS = [
    "Riyaziyyat",
    "Proqramlaşdırma",
    "Verilənlər bazası"
];

const TOTAL_LESSONS = 30;

let currentView = "students";

let universityData = {
    nextId: 6,

    students: [
        {
            id: 1,
            name: "Aysel Hüseynova",
            group: "IT-21",
            grades: [85, 92, 78],
            missed: 2
        },

        {
            id: 2,
            name: "Elvin Quliyev",
            group: "IT-21",
            grades: [64, 71, 58],
            missed: 6
        },

        {
            id: 3,
            name: "Nigar Əliyeva",
            group: "IT-22",
            grades: [95, 89, 97],
            missed: 0
        },

        {
            id: 4,
            name: "Rəşad Cəfərov",
            group: "IT-22",
            grades: [45, 52, 40],
            missed: 12
        },

        {
            id: 5,
            name: "Leyla Nəsirova",
            group: "IT-21",
            grades: [73, 80, 69],
            missed: 3
        }
    ]
};


/* =========================
   ELEMENTS
========================= */

const dashboardView =
    document.getElementById("dashboardView");

const dashboardTabs =
    document.getElementById("dashboardTabs");

const kpiGrid =
    document.getElementById("kpiGrid");

const themeToggle =
    document.getElementById("themeToggle");

const themeIcon =
    document.getElementById("themeIcon");


/* =========================
   INIT
========================= */

function init() {

    loadData();

    initTheme();

    render();
}


/* =========================
   STORAGE
========================= */

function loadData() {

    try {

        const saved =
            localStorage.getItem(STORAGE_KEY);

        if (!saved) return;

        const parsed =
            JSON.parse(saved);

        if (
            parsed &&
            Array.isArray(parsed.students)
        ) {

            universityData = parsed;
        }

    } catch (error) {

        console.warn(
            "University məlumatları oxunmadı:",
            error
        );
    }
}


function saveData() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(universityData)
        );

    } catch (error) {

        console.warn(
            "University məlumatları yadda saxlanılmadı:",
            error
        );
    }
}


/* =========================
   CALCULATIONS
========================= */

function getAverage(student) {

    if (!student.grades.length) return 0;

    const total =
        student.grades.reduce(
            (sum, grade) => sum + Number(grade),
            0
        );

    return total / student.grades.length;
}


function getAttendance(student) {

    return Math.round(
        ((TOTAL_LESSONS - student.missed) /
            TOTAL_LESSONS) *
            100
    );
}


function isPassed(student) {

    return (
        getAverage(student) >= 51 &&
        getAttendance(student) >= 75
    );
}


function getOverallAverage() {

    if (!universityData.students.length) {
        return 0;
    }

    const total =
        universityData.students.reduce(
            (sum, student) =>
                sum + getAverage(student),
            0
        );

    return (
        total /
        universityData.students.length
    );
}


function getPassedCount() {

    return universityData.students.filter(
        isPassed
    ).length;
}


/* =========================
   KPI
========================= */

function renderKpis() {

    const students =
        universityData.students;

    const studentCount =
        students.length;

    const passed =
        getPassedCount();

    const average =
        getOverallAverage();

    const attendance =
        studentCount
            ? Math.round(
                  students.reduce(
                      (sum, student) =>
                          sum +
                          getAttendance(student),
                      0
                  ) / studentCount
              )
            : 0;


    kpiGrid.innerHTML = `

        <div class="kpi-card">

            <div class="kpi-top">
                <span class="kpi-label">
                    Tələbələr
                </span>

                <span class="kpi-index">
                    01
                </span>
            </div>

            <strong class="kpi-value">
                ${studentCount}
            </strong>

            <span class="kpi-sub">
                qeydiyyatda olan tələbə
            </span>

        </div>


        <div class="kpi-card">

            <div class="kpi-top">
                <span class="kpi-label">
                    Ümumi orta
                </span>

                <span class="kpi-index">
                    02
                </span>
            </div>

            <strong class="kpi-value">
                ${average.toFixed(1)}
            </strong>

            <span class="kpi-sub">
                akademik orta bal
            </span>

        </div>


        <div class="kpi-card">

            <div class="kpi-top">
                <span class="kpi-label">
                    Keçənlər
                </span>

                <span class="kpi-index">
                    03
                </span>
            </div>

            <strong class="kpi-value">
                ${passed}
            </strong>

            <span class="kpi-sub">
                uğurlu tələbə
            </span>

        </div>


        <div class="kpi-card">

            <div class="kpi-top">
                <span class="kpi-label">
                    Davamiyyət
                </span>

                <span class="kpi-index">
                    04
                </span>
            </div>

            <strong class="kpi-value">
                ${attendance}%
            </strong>

            <span class="kpi-sub">
                orta davamiyyət
            </span>

        </div>
    `;
}


/* =========================
   TABS
========================= */

function updateTabs() {

    document
        .querySelectorAll(".dashboard-tab")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.view === currentView
            );
        });
}


dashboardTabs.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".dashboard-tab"
            );

        if (!button) return;

        currentView =
            button.dataset.view;

        render();
    }
);


/* =========================
   STUDENTS VIEW
========================= */

function renderStudents() {

    dashboardView.innerHTML = `

        <div class="content-card">

            <div class="content-heading">

                <div>

                    <h3>
                        Yeni tələbə qeydiyyatı
                    </h3>

                    <p>
                        Sistemə yeni tələbə əlavə edin.
                    </p>

                </div>

            </div>


            <form
                class="student-form"
                id="studentForm"
            >

                <input
                    class="form-input"
                    id="studentName"
                    type="text"
                    placeholder="Ad və soyad"
                    maxlength="80"
                    required
                >

                <input
                    class="form-input"
                    id="studentGroup"
                    type="text"
                    placeholder="Qrup — IT-23"
                    maxlength="20"
                >

                <button
                    class="primary-btn"
                    type="submit"
                >
                    + Tələbə əlavə et
                </button>

            </form>


            <div class="content-heading">

                <div>

                    <h3>
                        Tələbələr
                        (${universityData.students.length})
                    </h3>

                    <p>
                        Qeydiyyatda olan tələbələrin siyahısı.
                    </p>

                </div>

            </div>


            <div class="search-box">

                <span class="search-icon">
                    ⌕
                </span>

                <input
                    id="studentSearch"
                    type="search"
                    placeholder="Tələbə və ya qrup üzrə axtar..."
                >

            </div>


            <div id="studentsTable"></div>

        </div>
    `;


    document
        .getElementById("studentForm")
        .addEventListener(
            "submit",
            addStudent
        );


    document
        .getElementById("studentSearch")
        .addEventListener(
            "input",
            renderStudentTable
        );


    renderStudentTable();
}


/* =========================
   STUDENT TABLE
========================= */

function renderStudentTable() {

    const container =
        document.getElementById(
            "studentsTable"
        );

    if (!container) return;


    const searchInput =
        document.getElementById(
            "studentSearch"
        );

    const query =
        searchInput
            ? searchInput.value
                  .trim()
                  .toLowerCase()
            : "";


    const students =
        universityData.students.filter(
            student =>
                student.name
                    .toLowerCase()
                    .includes(query) ||
                student.group
                    .toLowerCase()
                    .includes(query)
        );


    if (!students.length) {

        container.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    ⌕
                </div>

                <h3>
                    Tələbə tapılmadı
                </h3>

                <p>
                    Axtarış kriteriyasını dəyişərək yenidən cəhd edin.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML = `

        <div class="table-wrap">

            <table>

                <thead>

                    <tr>
                        <th>Ad və soyad</th>
                        <th>Qrup</th>
                        <th>Orta bal</th>
                        <th>Davamiyyət</th>
                        <th></th>
                    </tr>

                </thead>

                <tbody>

                    ${students
                        .map(
                            student => `

                        <tr>

                            <td class="student-name">
                                ${escapeHTML(
                                    student.name
                                )}
                            </td>

                            <td>
                                <span class="group-tag">
                                    ${escapeHTML(
                                        student.group
                                    )}
                                </span>
                            </td>

                            <td class="average">
                                ${getAverage(
                                    student
                                ).toFixed(1)}
                            </td>

                            <td>
                                ${getAttendance(
                                    student
                                )}%
                            </td>

                            <td>
                                <button
                                    type="button"
                                    class="delete-btn"
                                    data-delete="${student.id}"
                                >
                                    Sil
                                </button>
                            </td>

                        </tr>

                    `
                        )
                        .join("")}

                </tbody>

            </table>

        </div>
    `;
}


/* =========================
   ADD STUDENT
========================= */

function addStudent(event) {

    event.preventDefault();


    const nameInput =
        document.getElementById(
            "studentName"
        );

    const groupInput =
        document.getElementById(
            "studentGroup"
        );


    const name =
        nameInput.value.trim();

    const group =
        groupInput.value.trim() ||
        "-";


    if (!name) return;


    universityData.students.push({

        id:
            universityData.nextId++,

        name,

        group,

        grades: [0, 0, 0],

        missed: 0
    });


    saveData();

    render();
}


/* =========================
   DELETE STUDENT
========================= */

dashboardView.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                "[data-delete]"
            );

        if (!button) return;


        const id =
            Number(
                button.dataset.delete
            );


        universityData.students =
            universityData.students.filter(
                student =>
                    student.id !== id
            );


        saveData();

        render();
    }
);


/* =========================
   GRADES VIEW
========================= */

function renderGrades() {

    dashboardView.innerHTML = `

        <div class="content-card">

            <div class="content-heading">

                <div>

                    <h3>
                        Qiymət cədvəli
                    </h3>

                    <p>
                        Qiymətlər 0–100 aralığında hesablanır.
                        Dəyişikliklər avtomatik saxlanılır.
                    </p>

                </div>

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>Tələbə</th>

                            ${SUBJECTS
                                .map(
                                    subject =>
                                        `<th>${subject}</th>`
                                )
                                .join("")}

                            <th>Orta</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${universityData.students
                            .map(
                                student => `

                            <tr>

                                <td class="student-name">
                                    ${escapeHTML(
                                        student.name
                                    )}
                                </td>

                                ${student.grades
                                    .map(
                                        (
                                            grade,
                                            index
                                        ) => `

                                        <td>

                                            <input
                                                class="grade-input"
                                                type="number"
                                                min="0"
                                                max="100"
                                                value="${grade}"
                                                data-grade-id="${student.id}"
                                                data-grade-index="${index}"
                                                aria-label="${SUBJECTS[index]} qiyməti"
                                            >

                                        </td>
                                    `
                                    )
                                    .join("")}


                                <td class="average">

                                    ${getAverage(
                                        student
                                    ).toFixed(1)}

                                </td>

                            </tr>
                        `
                            )
                            .join("")}

                    </tbody>

                </table>

            </div>

        </div>
    `;
}


/* =========================
   ATTENDANCE VIEW
========================= */

function renderAttendance() {

    dashboardView.innerHTML = `

        <div class="content-card">

            <div class="content-heading">

                <div>

                    <h3>
                        Davamiyyət
                    </h3>

                    <p>
                        Ümumi dərs sayı:
                        ${TOTAL_LESSONS}.
                        Keçid üçün minimum 75% davamiyyət tələb olunur.
                    </p>

                </div>

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>Tələbə</th>

                            <th>Buraxılan dərs</th>

                            <th>Davamiyyət</th>

                            <th>Status</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${universityData.students
                            .map(
                                student => {

                                    const attendance =
                                        getAttendance(
                                            student
                                        );

                                    const good =
                                        attendance >=
                                        75;


                                    return `

                                        <tr>

                                            <td class="student-name">
                                                ${escapeHTML(
                                                    student.name
                                                )}
                                            </td>

                                            <td>

                                                <input
                                                    class="attendance-input"
                                                    type="number"
                                                    min="0"
                                                    max="${TOTAL_LESSONS}"
                                                    value="${student.missed}"
                                                    data-attendance-id="${student.id}"
                                                >

                                            </td>

                                            <td class="average">

                                                ${attendance}%

                                            </td>

                                            <td>

                                                <span
                                                    class="status ${
                                                        good
                                                            ? "success"
                                                            : "danger"
                                                    }"
                                                >
                                                    ${
                                                        good
                                                            ? "Normal"
                                                            : "Xəbərdarlıq"
                                                    }
                                                </span>

                                            </td>

                                        </tr>
                                    `;
                                }
                            )
                            .join("")}

                    </tbody>

                </table>

            </div>

        </div>
    `;
}


/* =========================
   REPORTS VIEW
========================= */

function renderReports() {

    const students =
        universityData.students;


    const passed =
        getPassedCount();


    const failed =
        students.length - passed;


    const best =
        [...students]
            .sort(
                (a, b) =>
                    getAverage(b) -
                    getAverage(a)
            )[0];


    dashboardView.innerHTML = `

        <div class="content-card">

            <div class="content-heading">

                <div>

                    <h3>
                        Akademik hesabat
                    </h3>

                    <p>
                        Keçid şərti: minimum 51 orta bal
                        və 75% davamiyyət.
                    </p>

                </div>

            </div>


            <div class="table-wrap">

                <table>

                    <thead>

                        <tr>

                            <th>Tələbə</th>

                            <th>Qrup</th>

                            <th>Orta bal</th>

                            <th>Davamiyyət</th>

                            <th>Nəticə</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${students
                            .map(
                                student => {

                                    const passedStudent =
                                        isPassed(
                                            student
                                        );


                                    return `

                                        <tr>

                                            <td class="student-name">
                                                ${escapeHTML(
                                                    student.name
                                                )}
                                            </td>

                                            <td>
                                                <span class="group-tag">
                                                    ${escapeHTML(
                                                        student.group
                                                    )}
                                                </span>
                                            </td>

                                            <td class="average">
                                                ${getAverage(
                                                    student
                                                ).toFixed(1)}
                                            </td>

                                            <td>
                                                ${getAttendance(
                                                    student
                                                )}%
                                            </td>

                                            <td>

                                                <span
                                                    class="status ${
                                                        passedStudent
                                                            ? "success"
                                                            : "danger"
                                                    }"
                                                >
                                                    ${
                                                        passedStudent
                                                            ? "Keçdi"
                                                            : "Keçmədi"
                                                    }
                                                </span>

                                            </td>

                                        </tr>
                                    `;
                                }
                            )
                            .join("")}

                    </tbody>

                </table>

            </div>


            <div class="feature-list" style="margin-top:20px">

                <span>
                    ✓ Keçən: ${passed}
                </span>

                <span>
                    × Keçməyən: ${failed}
                </span>

                <span>
                    ★ Ən yüksək orta:
                    ${
                        best
                            ? escapeHTML(
                                  best.name
                              )
                            : "-"
                    }
                </span>

            </div>

        </div>
    `;
}


/* =========================
   INPUT CHANGES
========================= */

dashboardView.addEventListener(
    "change",
    event => {

        const target =
            event.target;


        /* GRADES */

        if (
            target.hasAttribute(
                "data-grade-id"
            )
        ) {

            const id =
                Number(
                    target.dataset.gradeId
                );

            const index =
                Number(
                    target.dataset.gradeIndex
                );


            const student =
                universityData.students.find(
                    item =>
                        item.id === id
                );


            if (!student) return;


            let value =
                Number(target.value);


            if (Number.isNaN(value)) {
                value = 0;
            }


            value =
                Math.max(
                    0,
                    Math.min(100, value)
                );


            student.grades[index] =
                value;


            saveData();

            render();

            return;
        }


        /* ATTENDANCE */

        if (
            target.hasAttribute(
                "data-attendance-id"
            )
        ) {

            const id =
                Number(
                    target.dataset.attendanceId
                );


            const student =
                universityData.students.find(
                    item =>
                        item.id === id
                );


            if (!student) return;


            let value =
                Number(target.value);


            if (Number.isNaN(value)) {
                value = 0;
            }


            value =
                Math.max(
                    0,
                    Math.min(
                        TOTAL_LESSONS,
                        value
                    )
                );


            student.missed =
                value;


            saveData();

            render();
        }
    }
);


/* =========================
   RENDER
========================= */

function render() {

    renderKpis();

    updateTabs();


    if (currentView === "students") {

        renderStudents();

    } else if (currentView === "grades") {

        renderGrades();

    } else if (
        currentView === "attendance"
    ) {

        renderAttendance();

    } else if (
        currentView === "reports"
    ) {

        renderReports();
    }
}


/* =========================
   THEME
========================= */

function initTheme() {

    const savedTheme =
        localStorage.getItem(
            "portfolio-theme"
        );


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
            document.documentElement.dataset.theme ===
            "dark";


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
   SECURITY HELPER
========================= */

function escapeHTML(value) {

    return String(value).replace(
        /[&<>"']/g,
        character => {

            const entities = {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"
            };

            return entities[character];
        }
    );
}


/* =========================
   START
========================= */

init();