/* ==========================================================
   Retail ROI Analytics v2
   Application Bootstrap
========================================================== */

import { APP } from "./constants.js";

import {
    getState,
    subscribe,
    updateInputs,
    updateCalculations
} from "./state.js";

import {
    loadInputs,
    loadSettings,
    loadTheme,
    autoSave
} from "./storage.js";

import {
    renderDashboard,
    applyTheme,
    renderSalaryMode,
    renderRentMode,
    renderTimeframe,
    renderLoading,
    renderWelcome,
    renderLastSaved
} from "./ui.js";

import {
    registerEvents,
    registerCalculator
} from "./events.js";

import {
    updateCharts,
    resizeCharts
} from "./charts.js";

/**
 * IMPORTANT
 *
 * Replace this import with the modular calculator.js
 * once migrated from your original application.
 */

import { calculateAll } from "./calculator.js";

/* ==========================================================
   Restore Saved Data
========================================================== */

function restoreApplication() {

    const inputs = loadInputs();

    if (inputs) {

        updateInputs(inputs);

    }

    const settings = loadSettings();

    if (settings) {

        if (settings.timeframe)
            renderTimeframe(settings.timeframe);

        if (settings.salaryMode)
            renderSalaryMode(settings.salaryMode);

        if (settings.rentMode)
            renderRentMode(settings.rentMode);

    }

    applyTheme(loadTheme());

}

/* ==========================================================
   Recalculate Everything
========================================================== */

function recalculate() {

    const state = getState();

    renderLoading(true);

    try {

        const calculations = calculateAll(
            state.inputs
        );

        updateCalculations(calculations);

        const dashboardData = {
            ...state.inputs,
            ...calculations
        };

        renderDashboard(dashboardData);

        updateCharts(dashboardData);

        renderLastSaved();

        autoSave();

    }

    catch (error) {

        console.error(error);

    }

    finally {

        renderLoading(false);

    }

}

/* ==========================================================
   Observe State Changes
========================================================== */

function observeState() {

    subscribe(() => {

        recalculate();

    });

}

/* ==========================================================
   Window Events
========================================================== */

function registerWindowEvents() {

    window.addEventListener(

        "chartsResize",

        resizeCharts

    );

}

/* ==========================================================
   Startup
========================================================== */

function initialize() {

    console.log(

        `${APP.NAME} ${APP.VERSION}`

    );

    restoreApplication();

    registerCalculator(recalculate);

    registerEvents();

    observeState();

    registerWindowEvents();

    renderWelcome(true);

    recalculate();

}

/* ==========================================================
   DOM Ready
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initialize

);
