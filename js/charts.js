/* ==========================================================
   Retail ROI Analytics v2
   Chart Manager
========================================================== */

import { CHART_COLORS } from "./constants.js";
import { registerChart, getChart } from "./state.js";

/* ==========================================================
   Base Options
========================================================== */

const baseOptions = {

    responsive: true,

    maintainAspectRatio: false,

    interaction: {

        intersect: false,

        mode: "index"

    },

    plugins: {

        legend: {

            position: "bottom",

            labels: {

                usePointStyle: true,

                padding: 20

            }

        }

    },

    animation: {

        duration: 600

    }

};

/* ==========================================================
   Destroy Chart
========================================================== */

function destroyChart(name) {

    const chart = getChart(name);

    if (chart) {

        chart.destroy();

    }

}

/* ==========================================================
   Revenue vs Expense Chart
========================================================== */

export function renderRevenueChart(data) {

    destroyChart("revenueChart");

    const canvas = document.getElementById("revenueExpenseChart");

    if (!canvas) return;

    const chart = new Chart(canvas, {

        type: "bar",

        data: {

            labels: [

                "Revenue",

                "Margin",

                "Expenses",

                "Profit"

            ],

            datasets: [

                {

                    label: "Amount",

                    borderRadius: 8,

                    data: [

                        data.revenue,

                        data.marginAmount,

                        data.totalExpense,

                        data.profit

                    ],

                    backgroundColor: [

                        CHART_COLORS.REVENUE,

                        CHART_COLORS.MARGIN,

                        CHART_COLORS.EXPENSE,

                        CHART_COLORS.PROFIT

                    ]

                }

            ]

        },

        options: baseOptions

    });

    registerChart(

        "revenueChart",

        chart

    );

}

/* ==========================================================
   Expense Donut
========================================================== */

export function renderExpenseChart(data) {

    destroyChart("expenseChart");

    const canvas = document.getElementById("expenseChart");

    if (!canvas) return;

    const chart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Rent",

                "Salary",

                "Internet",

                "Electricity",

                "Stationary",

                "Marketing",

                "Misc"

            ],

            datasets: [

                {

                    data: [

                        data.rent,

                        data.salary,

                        data.internet,

                        data.electricity,

                        data.stationary,

                        data.marketing,

                        data.misc

                    ],

                    backgroundColor: [

                        CHART_COLORS.RENT,

                        CHART_COLORS.SALARY,

                        CHART_COLORS.INTERNET,

                        CHART_COLORS.ELECTRICITY,

                        CHART_COLORS.STATIONARY,

                        CHART_COLORS.MARKETING,

                        CHART_COLORS.MISC

                    ]

                }

            ]

        },

        options: {

            ...baseOptions,

            cutout: "70%"

        }

    });

    registerChart(

        "expenseChart",

        chart

    );

}

/* ==========================================================
   Timeline Chart
========================================================== */

export function renderTimelineChart(values = []) {

    destroyChart("timelineChart");

    const canvas = document.getElementById(

        "performanceTimelineChart"

    );

    if (!canvas) return;

    const chart = new Chart(canvas, {

        type: "line",

        data: {

            labels: values.map(v => v.label),

            datasets: [

                {

                    label: "Profit",

                    data: values.map(v => v.value),

                    borderColor: CHART_COLORS.PROFIT,

                    backgroundColor: CHART_COLORS.PROFIT,

                    tension: .35,

                    fill: false

                }

            ]

        },

        options: baseOptions

    });

    registerChart(

        "timelineChart",

        chart

    );

}

/* ==========================================================
   Scenario Chart
========================================================== */

export function renderScenarioChart(values) {

    destroyChart("scenarioChart");

    const canvas = document.getElementById(

        "scenarioChart"

    );

    if (!canvas) return;

    const chart = new Chart(canvas, {

        type: "radar",

        data: {

            labels: [

                "Current",

                "20% Margin",

                "+Revenue",

                "Best Case"

            ],

            datasets: [

                {

                    label: "Scenario",

                    data: values,

                    backgroundColor:

                        "rgba(0,135,83,.20)",

                    borderColor:

                        CHART_COLORS.REVENUE,

                    pointRadius: 4

                }

            ]

        },

        options: baseOptions

    });

    registerChart(

        "scenarioChart",

        chart

    );

}

/* ==========================================================
   Update All Charts
========================================================== */

export function updateCharts(calculation) {

    renderRevenueChart(calculation);

    renderExpenseChart(calculation);

}

/* ==========================================================
   Resize Charts
========================================================== */

export function resizeCharts() {

    [

        "revenueChart",

        "expenseChart",

        "timelineChart",

        "scenarioChart"

    ].forEach(name => {

        const chart = getChart(name);

        if (chart) {

            chart.resize();

        }

    });

}

/* ==========================================================
   Export Charts
========================================================== */

export function exportChart(name) {

    const chart = getChart(name);

    if (!chart) return null;

    return chart.toBase64Image();

}
