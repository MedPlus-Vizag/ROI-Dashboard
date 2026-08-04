/* ==========================================================
   Retail ROI Analytics v2
   Local Storage Manager
========================================================== */

import { STORAGE_KEYS } from "./constants.js";
import { getState } from "./state.js";

/* ==========================================================
   Generic Storage
========================================================== */

export function save(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

export function load(key, fallback = null) {

    try {

        const value = localStorage.getItem(key);

        if (!value) return fallback;

        return JSON.parse(value);

    } catch {

        return fallback;

    }

}

export function remove(key) {

    localStorage.removeItem(key);

}

export function clearAll() {

    Object.values(STORAGE_KEYS).forEach(remove);

}

/* ==========================================================
   Inputs
========================================================== */

export function saveInputs(inputs) {

    return save(
        STORAGE_KEYS.INPUTS,
        inputs
    );

}

export function loadInputs() {

    return load(
        STORAGE_KEYS.INPUTS,
        {}
    );

}

/* ==========================================================
   Settings
========================================================== */

export function saveSettings(settings) {

    return save(
        STORAGE_KEYS.SETTINGS,
        settings
    );

}

export function loadSettings() {

    return load(
        STORAGE_KEYS.SETTINGS,
        {}
    );

}

/* ==========================================================
   Theme
========================================================== */

export function saveTheme(theme) {

    localStorage.setItem(

        STORAGE_KEYS.THEME,

        theme

    );

}

export function loadTheme() {

    return (

        localStorage.getItem(

            STORAGE_KEYS.THEME

        ) || "light"

    );

}

/* ==========================================================
   History
========================================================== */

export function addHistory(record) {

    const history =

        loadHistory();

    history.unshift({

        id: crypto.randomUUID(),

        timestamp: new Date().toISOString(),

        ...record

    });

    if (history.length > 50) {

        history.length = 50;

    }

    save(

        STORAGE_KEYS.HISTORY,

        history

    );

}

export function loadHistory() {

    return load(

        STORAGE_KEYS.HISTORY,

        []

    );

}

export function clearHistory() {

    remove(

        STORAGE_KEYS.HISTORY

    );

}

/* ==========================================================
   Auto Save
========================================================== */

export function autoSave() {

    const state = getState();

    saveInputs(state.inputs);

    saveSettings({

        timeframe: state.inputs.timeframe,

        salaryMode: state.inputs.salaryMode,

        rentMode: state.inputs.rentMode,

        theme: state.theme

    });

}

/* ==========================================================
   Export Backup
========================================================== */

export function exportBackup() {

    const state = getState();

    return JSON.stringify(

        state,

        null,

        2

    );

}

/* ==========================================================
   Import Backup
========================================================== */

export function importBackup(json) {

    try {

        return JSON.parse(json);

    }

    catch {

        return null;

    }

}
