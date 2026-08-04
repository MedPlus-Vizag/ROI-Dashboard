/* ==========================================================
   Retail ROI Analytics v2
   Event Manager
========================================================== */

import { $, $$, debounce, toast } from "./utils.js";

import {
    updateInput,
    setTheme,
    setTimeframe,
    setSalaryMode,
    setRentMode,
    resetState,
    hideWelcome
} from "./state.js";

import {
    applyTheme,
    renderSalaryMode,
    renderRentMode,
    renderTimeframe
} from "./ui.js";

import { autoSave } from "./storage.js";

/* ==========================================================
   Callback Registration
========================================================== */

let calculateCallback = () => {};

export function registerCalculator(callback) {

    calculateCallback = callback;

}

/* ==========================================================
   Input Events
========================================================== */

function bindInputs() {

    $$("input").forEach(input => {

        input.addEventListener(

            "input",

            debounce(event => {

                const { id, value } = event.target;

                if (!id) return;

                const key = id.replace("Input", "");

                updateInput(

                    key,

                    Number(value) || 0

                );

                calculateCallback();

                autoSave();

            }, 250)

        );

    });

}

/* ==========================================================
   Monthly / Annual
========================================================== */

function bindTimeframe() {

    $("#monthlyBtn")?.addEventListener(

        "click",

        () => {

            setTimeframe("monthly");

            renderTimeframe("monthly");

            calculateCallback();

        }

    );

    $("#annualBtn")?.addEventListener(

        "click",

        () => {

            setTimeframe("annual");

            renderTimeframe("annual");

            calculateCallback();

        }

    );

}

/* ==========================================================
   Salary Mode
========================================================== */

function bindSalaryMode() {

    $("#salaryTotalBtn")?.addEventListener(

        "click",

        () => {

            setSalaryMode("total");

            renderSalaryMode("total");

            calculateCallback();

        }

    );

    $("#salaryDetailedBtn")?.addEventListener(

        "click",

        () => {

            setSalaryMode("detailed");

            renderSalaryMode("detailed");

            calculateCallback();

        }

    );

}

/* ==========================================================
   Rent GST Mode
========================================================== */

function bindRentMode() {

    $("#rentWithGST")?.addEventListener(

        "click",

        () => {

            setRentMode("with");

            renderRentMode("with");

            calculateCallback();

        }

    );

    $("#rentWithoutGST")?.addEventListener(

        "click",

        () => {

            setRentMode("without");

            renderRentMode("without");

            calculateCallback();

        }

    );

}

/* ==========================================================
   Theme
========================================================== */

function bindTheme() {

    $("#themeToggle")?.addEventListener(

        "click",

        () => {

            const dark =

                document.documentElement

                .dataset.theme === "dark";

            const theme =

                dark ? "light" : "dark";

            applyTheme(theme);

            setTheme(theme);

            autoSave();

        }

    );

}

/* ==========================================================
   Reset
========================================================== */

function bindReset() {

    $("#resetButton")?.addEventListener(

        "click",

        () => {

            if (!confirm(

                "Reset all values?"

            )) return;

            resetState();

            document

                .querySelectorAll("input")

                .forEach(input => {

                    input.value = "";

                });

            calculateCallback();

            toast(

                "Reset",

                "Calculator has been reset."

            );

        }

    );

}

/* ==========================================================
   Welcome Screen
========================================================== */

function bindWelcome() {

    $("#startAnalysis")

        ?.addEventListener(

            "click",

            () => {

                hideWelcome();

            }

        );

}

/* ==========================================================
   Export
========================================================== */

function bindExport() {

    $("#exportPdfButton")

        ?.addEventListener(

            "click",

            () => {

                window.print();

            }

        );

    $("#exportExcelButton")

        ?.addEventListener(

            "click",

            () => {

                toast(

                    "Export",

                    "Excel export will be implemented in export.js"

                );

            }

        );

}

/* ==========================================================
   Keyboard Shortcuts
========================================================== */

function bindKeyboard() {

    document.addEventListener(

        "keydown",

        event => {

            if (!event.ctrlKey)

                return;

            switch (

                event.key.toLowerCase()

            ) {

                case "s":

                    event.preventDefault();

                    autoSave();

                    toast(

                        "Saved",

                        "Data saved."

                    );

                    break;

                case "r":

                    event.preventDefault();

                    resetState();

                    calculateCallback();

                    break;

                case "p":

                    event.preventDefault();

                    window.print();

                    break;

            }

        }

    );

}

/* ==========================================================
   Employee List
========================================================== */

function bindEmployeeButton() {

    $("#addEmployeeButton")

        ?.addEventListener(

            "click",

            () => {

                const template =

                    $("#employeeRowTemplate");

                const container =

                    $("#employeeContainer");

                if (

                    !template ||

                    !container

                ) return;

                const clone =

                    template.content

                    .cloneNode(true);

                container.appendChild(

                    clone

                );

            }

        );

}

/* ==========================================================
   Window Resize
========================================================== */

function bindResize() {

    window.addEventListener(

        "resize",

        debounce(() => {

            window.dispatchEvent(

                new Event("chartsResize")

            );

        }, 200)

    );

}

/* ==========================================================
   Register Everything
========================================================== */

export function registerEvents() {

    bindInputs();

    bindTimeframe();

    bindSalaryMode();

    bindRentMode();

    bindTheme();

    bindReset();

    bindWelcome();

    bindExport();

    bindKeyboard();

    bindEmployeeButton();

    bindResize();

}
