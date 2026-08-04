/* ==========================================================
   Retail ROI Analytics v2
   UI Rendering Layer
========================================================== */

import { byId, formatCurrency, formatPercent, clamp, progressRing } from "./utils.js";

import {
    generateHealthInsights,
    generateRisks,
    generateGrowthIdeas,
    generateSavings,
    buildExecutiveSummary,
    generateActionPlan,
    calculateGrade,
    getHealthRating
} from "./insights.js";


/* ==========================================================
   Safe DOM Helpers
========================================================== */

function setText(id, value) {

    const element = byId(id);

    if (element) {
        element.textContent = value;
    }

}


function setHTML(id, value) {

    const element = byId(id);

    if (element) {
        element.innerHTML = value;
    }

}


function setWidth(id, value) {

    const element = byId(id);

    if (element) {
        element.style.width = `${clamp(value, 0, 100)}%`;
    }

}


/* ==========================================================
   KPI Rendering
========================================================== */

export function renderKPIs(data) {

    setText(
        "kpiRevenue",
        formatCurrency(data.revenue)
    );

    setText(
        "kpiExpense",
        formatCurrency(data.totalExpense)
    );

    setText(
        "kpiMargin",
        formatPercent(data.margin)
    );

    setText(
        "kpiProfit",
        formatCurrency(data.profit)
    );

    setText(
        "healthScore",
        Math.round(data.healthScore || 0)
    );

    setText(
        "targetValue",
        formatCurrency(data.target || 0)
    );

    renderProfitStatus(data);

    renderTargetProgress(data);

}


/* ==========================================================
   Profit Status
========================================================== */

function renderProfitStatus(data) {

    const element = byId("profitStatus");

    if (!element) return;

    element.classList.remove(
        "positive",
        "negative",
        "neutral"
    );

    if (data.profit > 0) {

        element.textContent = "Profitable";

        element.classList.add("positive");

    } else if (data.profit < 0) {

        element.textContent = "Operating Loss";

        element.classList.add("negative");

    } else {

        element.textContent = "Break-even";

        element.classList.add("neutral");

    }

}


/* ==========================================================
   Target Progress
========================================================== */

function renderTargetProgress(data) {

    const target = Number(data.target) || 0;

    const profit = Number(data.profit) || 0;

    const progress = target > 0
        ? (profit / target) * 100
        : 0;

    setText(
        "targetProgress",
        `${Math.round(progress)}%`
    );

}


/* ==========================================================
   Expense Totals
========================================================== */

export function renderExpenseTotals(data) {

    setText(
        "fixedExpenseTotal",
        formatCurrency(data.fixedExpense)
    );

    setText(
        "variableExpenseTotal",
        formatCurrency(data.variableExpense)
    );

}


/* ==========================================================
   Financial Summary
========================================================== */

export function renderFinancialSummary(data) {

    setText(
        "summaryRevenue",
        formatCurrency(data.revenue)
    );

    setText(
        "summaryMargin",
        formatCurrency(data.marginAmount)
    );

    setText(
        "summaryFixed",
        formatCurrency(data.fixedExpense)
    );

    setText(
        "summaryVariable",
        formatCurrency(data.variableExpense)
    );

    setText(
        "summaryExpenses",
        formatCurrency(data.totalExpense)
    );

    setText(
        "summaryProfit",
        formatCurrency(data.profit)
    );

}


/* ==========================================================
   Target Planner
========================================================== */

export function renderTargetPlanner(data) {

    setText(
        "requiredRevenue",
        formatCurrency(data.requiredRevenue)
    );

    setText(
        "requiredMargin",
        formatPercent(data.requiredMargin)
    );

    setText(
        "dailySales",
        formatCurrency(data.dailyRevenue)
    );

    setText(
        "breakEven",
        formatCurrency(data.breakEven)
    );

}


/* ==========================================================
   Performance Metrics
========================================================== */

export function renderMetrics(data) {

    setText(
        "expenseRatio",
        formatPercent(data.expenseRatio)
    );

    setText(
        "profitRatio",
        formatPercent(data.profitRatio)
    );

    setText(
        "marginEfficiency",
        formatPercent(data.marginEfficiency || 0)
    );

    setText(
        "roiScore",
        Math.round(data.roiScore || 0)
    );

}


/* ==========================================================
   Health Gauge
========================================================== */

export function renderHealth(data) {

    const score = clamp(
        Number(data.healthScore) || 0,
        0,
        100
    );

    const rating = getHealthRating(score);

    setText(
        "healthPercent",
        Math.round(score)
    );

    setText(
        "healthTitle",
        rating.title
    );

    setText(
        "healthRemark",
        rating.title
    );

    const description = getHealthDescription(
        score
    );

    setText(
        "healthDescription",
        description
    );

    const circle = byId("healthProgress");

    if (circle) {

        progressRing(
            circle,
            score
        );

    }

}


function getHealthDescription(score) {

    if (score >= 90) {
        return "Excellent financial performance with strong profitability and expense control.";
    }

    if (score >= 75) {
        return "Healthy financial performance with some room for further optimization.";
    }

    if (score >= 60) {
        return "Stable performance, but key financial indicators should be monitored.";
    }

    if (score >= 40) {
        return "Several financial indicators require improvement.";
    }

    return "Profitability, margins and operating costs require immediate attention.";

}


/* ==========================================================
   Live Progress
========================================================== */

export function renderProgress(data) {

    const revenueProgress =
        data.requiredRevenue > 0
            ? (data.revenue / data.requiredRevenue) * 100
            : 0;

    const marginProgress =
        data.requiredMargin > 0
            ? (data.margin / data.requiredMargin) * 100
            : 0;

    const expenseControl =
        100 - clamp(data.expenseRatio || 0, 0, 100);

    setWidth(
        "revenueProgress",
        revenueProgress
    );

    setWidth(
        "marginProgress",
        marginProgress
    );

    setWidth(
        "expenseProgress",
        expenseControl
    );

    setText(
        "revenueProgressText",
        `${Math.round(revenueProgress)}%`
    );

    setText(
        "marginProgressText",
        `${Math.round(marginProgress)}%`
    );

    setText(
        "expenseProgressText",
        `${Math.round(expenseControl)}%`
    );

}


/* ==========================================================
   Scenario Cards
========================================================== */

export function renderScenarios(data) {

    const scenarios = data.scenarios || {};

    setText(
        "currentScenarioProfit",
        formatCurrency(
            scenarios.current ?? data.profit
        )
    );

    setText(
        "marginScenarioProfit",
        formatCurrency(
            scenarios.margin ?? 0
        )
    );

    setText(
        "revenueScenarioProfit",
        formatCurrency(
            scenarios.revenue ?? 0
        )
    );

    setText(
        "bestScenarioProfit",
        formatCurrency(
            scenarios.best ?? 0
        )
    );

}


/* ==========================================================
   Daily Targets
========================================================== */

export function renderDailyTargets(data) {

    setText(
        "dailyRevenueTarget",
        formatCurrency(data.dailyRevenue)
    );

    setText(
        "dailyProfitTarget",
        formatCurrency(data.dailyProfit)
    );

    setText(
        "dailyMarginTarget",
        formatPercent(data.margin)
    );

    setText(
        "dailyBreakEven",
        formatCurrency(data.dailyBreakEven || 0)
    );

}


/* ==========================================================
   Opportunity Cards
========================================================== */

export function renderOpportunities(data) {

    setText(
        "privateLabelGain",
        formatCurrency(
            data.privateLabelGain || 0
        )
    );

    setText(
        "crossSellValue",
        formatCurrency(
            data.crossSellValue || 0
        )
    );

    setText(
        "savingPotential",
        formatCurrency(
            data.savingPotential || 0
        )
    );

}


/* ==========================================================
   List Renderer
========================================================== */

function renderList(id, items = []) {

    const container = byId(id);

    if (!container) return;

    container.replaceChildren();

    items.forEach(item => {

        const li =
            document.createElement("li");

        const icon =
            document.createElement("span");

        icon.className =
            "insight-list-icon";

        icon.textContent = "•";

        const text =
            document.createElement("span");

        text.textContent = item;

        li.append(
            icon,
            text
        );

        container.appendChild(li);

    });

}


/* ==========================================================
   Business Advisor
========================================================== */

export function renderInsights(data) {

    const health =
        generateHealthInsights(data);

    const risks =
        generateRisks(data);

    const growth =
        generateGrowthIdeas(data);

    const savings =
        generateSavings(data);

    renderList(
        "healthInsights",
        health
    );

    renderList(
        "riskList",
        risks
    );

    renderList(
        "growthList",
        growth
    );

    renderList(
        "savingList",
        savings
    );

    const rating =
        getHealthRating(
            data.healthScore || 0
        );

    setText(
        "healthStatus",
        rating.title
    );

}


/* ==========================================================
   Executive Scoreboard
========================================================== */

export function renderScoreboard(data) {

    const profitScore =
        clamp(
            data.profitScore ??
            data.roiScore ??
            0,
            0,
            100
        );

    const expenseScore =
        clamp(
            data.expenseScore ??
            (100 - (data.expenseRatio || 0)),
            0,
            100
        );

    const marginScore =
        clamp(
            data.marginScore ??
            ((data.margin || 0) / 25) * 100,
            0,
            100
        );

    const overall =
        (
            profitScore +
            expenseScore +
            marginScore
        ) / 3;

    setText(
        "profitScore",
        Math.round(profitScore)
    );

    setText(
        "expenseScore",
        Math.round(expenseScore)
    );

    setText(
        "marginScore",
        Math.round(marginScore)
    );

    setText(
        "overallScore",
        calculateGrade(overall)
    );

}


/* ==========================================================
   Action Plan
========================================================== */

export function renderActionPlan(data) {

    const plan =
        generateActionPlan(data);

    setText(
        "priorityOne",
        plan.immediate
    );

    setText(
        "priorityTwo",
        plan.weekly
    );

    setText(
        "priorityThree",
        plan.monthly
    );

}


/* ==========================================================
   Executive Summary
========================================================== */

export function renderExecutiveSummary(data) {

    setText(
        "executiveSummary",
        buildExecutiveSummary(data)
    );

}


/* ==========================================================
   Theme
========================================================== */

export function applyTheme(theme) {

    let resolvedTheme = theme;

    if (theme === "system") {

        resolvedTheme =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches
                ? "dark"
                : "light";

    }

    document.documentElement.setAttribute(
        "data-theme",
        resolvedTheme
    );

    updateThemeIcon(resolvedTheme);

}


function updateThemeIcon(theme) {

    const button =
        byId("themeToggle");

    if (!button) return;

    button.innerHTML =
        theme === "dark"
            ? '<i data-lucide="sun"></i>'
            : '<i data-lucide="moon"></i>';

    refreshIcons();

}


/* ==========================================================
   Segment Controls
========================================================== */

export function setActiveSegment(
    activeId,
    groupIds = []
) {

    groupIds.forEach(id => {

        byId(id)?.classList.remove(
            "active"
        );

    });

    byId(activeId)?.classList.add(
        "active"
    );

}


/* ==========================================================
   Salary Mode UI
========================================================== */

export function renderSalaryMode(mode) {

    const container =
        byId("employeeContainer");

    const addButton =
        byId("addEmployeeButton");

    const salaryInput =
        byId("salaryInput");

    const detailed =
        mode === "detailed";

    if (container) {
        container.hidden = !detailed;
    }

    if (addButton) {
        addButton.hidden = !detailed;
    }

    if (salaryInput) {
        salaryInput.disabled = detailed;
    }

    setActiveSegment(
        detailed
            ? "salaryDetailedBtn"
            : "salaryTotalBtn",
        [
            "salaryTotalBtn",
            "salaryDetailedBtn"
        ]
    );

}


/* ==========================================================
   Timeframe UI
========================================================== */

export function renderTimeframe(mode) {

    setActiveSegment(
        mode === "annual"
            ? "annualBtn"
            : "monthlyBtn",
        [
            "monthlyBtn",
            "annualBtn"
        ]
    );

}


/* ==========================================================
   Rent Mode UI
========================================================== */

export function renderRentMode(mode) {

    setActiveSegment(
        mode === "without"
            ? "rentWithoutGST"
            : "rentWithGST",
        [
            "rentWithGST",
            "rentWithoutGST"
        ]
    );

}


/* ==========================================================
   Loading Overlay
========================================================== */

export function renderLoading(visible) {

    byId("loadingOverlay")
        ?.classList.toggle(
            "hidden",
            !visible
        );

}


/* ==========================================================
   Welcome Screen
========================================================== */

export function renderWelcome(visible) {

    byId("welcomeCard")
        ?.classList.toggle(
            "hidden",
            !visible
        );

}


/* ==========================================================
   Export Modal
========================================================== */

export function renderExportModal(visible) {

    byId("exportModal")
        ?.classList.toggle(
            "hidden",
            !visible
        );

}


/* ==========================================================
   Settings Drawer
========================================================== */

export function renderSettingsDrawer(visible) {

    const drawer =
        byId("settingsDrawer");

    if (!drawer) return;

    drawer.classList.toggle(
        "open",
        visible
    );

}


/* ==========================================================
   Last Saved
========================================================== */

export function renderLastSaved(date = new Date()) {

    setText(
        "lastSaved",
        `Last Saved : ${date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        )}`
    );

}


/* ==========================================================
   Lucide Icons
========================================================== */

export function refreshIcons() {

    if (
        window.lucide &&
        typeof window.lucide.createIcons ===
            "function"
    ) {

        window.lucide.createIcons();

    }

}


/* ==========================================================
   Render Entire Dashboard
========================================================== */

export function renderDashboard(data) {

    if (!data) return;

    renderKPIs(data);

    renderExpenseTotals(data);

    renderFinancialSummary(data);

    renderTargetPlanner(data);

    renderMetrics(data);

    renderHealth(data);

    renderProgress(data);

    renderScenarios(data);

    renderDailyTargets(data);

    renderOpportunities(data);

    renderInsights(data);

    renderScoreboard(data);

    renderActionPlan(data);

    renderExecutiveSummary(data);

    refreshIcons();

}
