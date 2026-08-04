/* ==========================================================
   Retail ROI Analytics v2
   Application State Manager
========================================================== */

import {
    DEFAULT_STATE,
    EVENTS
} from "./constants.js";

/**
 * Central Application State
 */

const state = {

    // User Inputs
    inputs: structuredClone(DEFAULT_STATE),

    // Calculated Values
    calculations: {

        fixedExpense: 0,

        variableExpense: 0,

        totalExpense: 0,

        marginAmount: 0,

        profit: 0,

        requiredRevenue: 0,

        requiredMargin: 0,

        breakEven: 0,

        dailyRevenue: 0,

        dailyProfit: 0,

        expenseRatio: 0,

        profitRatio: 0,

        healthScore: 0,

        roiScore: 0

    },

    // Theme

    theme: "light",

    // Charts

    charts: {

        revenueChart: null,

        expenseChart: null,

        timelineChart: null

    },

    // UI

    ui: {

        loading: false,

        welcomeVisible: true,

        exportModal: false,

        settingsDrawer: false

    }

};


/* ==========================================================
   Subscribers
========================================================== */

const listeners = [];


/* ==========================================================
   Subscribe
========================================================== */

export function subscribe(callback){

    listeners.push(callback);

}


/* ==========================================================
   Notify
========================================================== */

function notify(event){

    listeners.forEach(listener=>{

        listener(state,event);

    });

}


/* ==========================================================
   Get State
========================================================== */

export function getState(){

    return structuredClone(state);

}


/* ==========================================================
   Update Input
========================================================== */

export function updateInput(key,value){

    state.inputs[key]=value;

    notify(EVENTS.INPUT_CHANGED);

}


/* ==========================================================
   Update Inputs
========================================================== */

export function updateInputs(values){

    Object.assign(state.inputs,values);

    notify(EVENTS.INPUT_CHANGED);

}


/* ==========================================================
   Update Calculations
========================================================== */

export function updateCalculations(values){

    Object.assign(

        state.calculations,

        values

    );

    notify(EVENTS.KPI_UPDATED);

}


/* ==========================================================
   Set Theme
========================================================== */

export function setTheme(theme){

    state.theme=theme;

    notify(EVENTS.THEME_CHANGED);

}


/* ==========================================================
   Get Theme
========================================================== */

export function getTheme(){

    return state.theme;

}


/* ==========================================================
   Timeframe
========================================================== */

export function setTimeframe(mode){

    state.inputs.timeframe=mode;

    notify(EVENTS.STATE_CHANGED);

}

export function getTimeframe(){

    return state.inputs.timeframe;

}


/* ==========================================================
   Salary Mode
========================================================== */

export function setSalaryMode(mode){

    state.inputs.salaryMode=mode;

    notify(EVENTS.STATE_CHANGED);

}

export function getSalaryMode(){

    return state.inputs.salaryMode;

}


/* ==========================================================
   Rent Mode
========================================================== */

export function setRentMode(mode){

    state.inputs.rentMode=mode;

    notify(EVENTS.STATE_CHANGED);

}

export function getRentMode(){

    return state.inputs.rentMode;

}


/* ==========================================================
   Chart Registration
========================================================== */

export function registerChart(name,chart){

    state.charts[name]=chart;

}


/* ==========================================================
   Retrieve Chart
========================================================== */

export function getChart(name){

    return state.charts[name];

}


/* ==========================================================
   Loading
========================================================== */

export function showLoading(){

    state.ui.loading=true;

    notify(EVENTS.STATE_CHANGED);

}

export function hideLoading(){

    state.ui.loading=false;

    notify(EVENTS.STATE_CHANGED);

}


/* ==========================================================
   Export Dialog
========================================================== */

export function openExport(){

    state.ui.exportModal=true;

    notify(EVENTS.STATE_CHANGED);

}

export function closeExport(){

    state.ui.exportModal=false;

    notify(EVENTS.STATE_CHANGED);

}


/* ==========================================================
   Settings Drawer
========================================================== */

export function openSettings(){

    state.ui.settingsDrawer=true;

    notify(EVENTS.STATE_CHANGED);

}

export function closeSettings(){

    state.ui.settingsDrawer=false;

    notify(EVENTS.STATE_CHANGED);

}


/* ==========================================================
   Welcome Screen
========================================================== */

export function hideWelcome(){

    state.ui.welcomeVisible=false;

    notify(EVENTS.STATE_CHANGED);

}


/* ==========================================================
   Reset State
========================================================== */

export function resetState(){

    state.inputs=structuredClone(DEFAULT_STATE);

    state.calculations={

        fixedExpense:0,

        variableExpense:0,

        totalExpense:0,

        marginAmount:0,

        profit:0,

        requiredRevenue:0,

        requiredMargin:0,

        breakEven:0,

        dailyRevenue:0,

        dailyProfit:0,

        expenseRatio:0,

        profitRatio:0,

        healthScore:0,

        roiScore:0

    };

    notify(EVENTS.STATE_CHANGED);

}


/* ==========================================================
   Debug Helper
========================================================== */

export function logState(){

    console.table(state.inputs);

    console.table(state.calculations);

}
