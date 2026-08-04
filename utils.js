/* ==========================================================
   Retail ROI Analytics v2
   Utility Functions
========================================================== */

import { LOCALE } from "./constants.js";

/* ==========================================================
   DOM Helpers
========================================================== */

export const $ = (selector) => document.querySelector(selector);

export const $$ = (selector) => [...document.querySelectorAll(selector)];

export const byId = (id) => document.getElementById(id);

/* ==========================================================
   Number Helpers
========================================================== */

export function parseNumber(value) {

    if (value === null || value === undefined) return 0;

    if (typeof value === "number") return value;

    const clean = String(value)
        .replace(/,/g, "")
        .replace(/[^\d.-]/g, "");

    const num = Number(clean);

    return Number.isFinite(num) ? num : 0;

}

export function round(value, digits = 2) {

    return Number(
        parseNumber(value).toFixed(digits)
    );

}

export function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );

}

/* ==========================================================
   Currency Formatting
========================================================== */

export function formatCurrency(value) {

    return new Intl.NumberFormat(

        LOCALE.CURRENCY,

        {

            style: "currency",

            currency: LOCALE.CURRENCY_CODE,

            maximumFractionDigits:
                LOCALE.MAX_DECIMALS

        }

    ).format(parseNumber(value));

}

/* ==========================================================
   Number Formatting
========================================================== */

export function formatNumber(value) {

    return new Intl.NumberFormat(

        LOCALE.CURRENCY,

        {

            maximumFractionDigits: 2

        }

    ).format(parseNumber(value));

}

/* ==========================================================
   Percentage Formatting
========================================================== */

export function formatPercent(value) {

    return `${round(value)}%`;

}

/* ==========================================================
   Safe Divide
========================================================== */

export function divide(a, b) {

    a = parseNumber(a);

    b = parseNumber(b);

    if (b === 0) return 0;

    return a / b;

}

/* ==========================================================
   Percentage Calculator
========================================================== */

export function percentage(part, total) {

    return divide(part * 100, total);

}

/* ==========================================================
   Financial Helpers
========================================================== */

export function calculateMarginAmount(

    revenue,

    margin

) {

    return revenue * (margin / 100);

}

export function calculateProfit(

    marginAmount,

    expenses

) {

    return marginAmount - expenses;

}

export function calculateExpenseRatio(

    expenses,

    revenue

) {

    return percentage(expenses, revenue);

}

export function calculateProfitRatio(

    profit,

    revenue

) {

    return percentage(profit, revenue);

}

/* ==========================================================
   Input Sanitizer
========================================================== */

export function sanitizeInput(value) {

    return String(value)

        .replace(/[^\d.]/g, "")

        .replace(/(\..*)\./g, "$1");

}

/* ==========================================================
   Debounce
========================================================== */

export function debounce(fn, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(

            () => fn(...args),

            delay

        );

    };

}

/* ==========================================================
   Throttle
========================================================== */

export function throttle(fn, delay = 250) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        fn(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, delay);

    };

}

/* ==========================================================
   Clipboard
========================================================== */

export async function copy(text) {

    try {

        await navigator.clipboard.writeText(text);

        return true;

    }

    catch {

        return false;

    }

}

/* ==========================================================
   Download File
========================================================== */

export function download(

    filename,

    content,

    mime = "text/plain"

) {

    const blob = new Blob(

        [content],

        {

            type: mime

        }

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}

/* ==========================================================
   Local Date
========================================================== */

export function today() {

    return new Date()

        .toLocaleDateString(

            "en-IN"

        );

}

/* ==========================================================
   Timestamp
========================================================== */

export function timestamp() {

    return new Date()

        .toLocaleString(

            "en-IN"

        );

}

/* ==========================================================
   Random ID
========================================================== */

export function uid(length = 8) {

    return Math.random()

        .toString(36)

        .substring(2, length + 2);

}

/* ==========================================================
   Toast
========================================================== */

export function toast(

    title,

    message,

    type = "success"

) {

    const toast = byId("toast");

    if (!toast) return;

    byId("toastTitle").textContent = title;

    byId("toastMessage").textContent = message;

    toast.className = `toast ${type}`;

    toast.classList.remove("hidden");

    setTimeout(() => {

        toast.classList.add("hidden");

    }, 3000);

}

/* ==========================================================
   Progress Ring
========================================================== */

export function progressRing(

    circle,

    percent

) {

    if (!circle) return;

    const radius = circle.r.baseVal.value;

    const circumference =

        radius * 2 * Math.PI;

    circle.style.strokeDasharray =

        circumference;

    circle.style.strokeDashoffset =

        circumference -

        (percent / 100) *

        circumference;

}

/* ==========================================================
   Sleep
========================================================== */

export function sleep(ms) {

    return new Promise(

        resolve =>

            setTimeout(resolve, ms)

    );

}

/* ==========================================================
   Empty Check
========================================================== */

export function isEmpty(value) {

    return (

        value === null ||

        value === undefined ||

        value === ""

    );

}

/* ==========================================================
   Deep Clone
========================================================== */

export function clone(value) {

    return structuredClone(value);

}

/* ==========================================================
   Sum Array
========================================================== */

export function sum(array = []) {

    return array.reduce(

        (total, item) =>

            total + parseNumber(item),

        0

    );

}
