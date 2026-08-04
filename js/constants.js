/* ==========================================================
   Retail ROI Analytics v2
   Global Constants
========================================================== */

/**
 * Application Information
 */
export const APP = Object.freeze({
    NAME: "Retail ROI Analytics",
    VERSION: "2.0.0",
    AUTHOR: "Retail ROI Team",
    DEFAULT_THEME: "light",
    DEFAULT_TIMEFRAME: "monthly",
    DAYS_IN_MONTH: 30,
    MONTHS_IN_YEAR: 12
});

/**
 * Financial Constants
 */
export const FINANCIAL = Object.freeze({
    GST_RATE: 0.18,
    DEFAULT_MARGIN: 20,
    REVENUE_BOOST: 50000,
    PRIVATE_LABEL_MARGIN: 30,
    DEFAULT_TARGET: 0
});

/**
 * Health Score Thresholds
 */
export const HEALTH = Object.freeze({

    EXCELLENT: 90,

    VERY_GOOD: 80,

    GOOD: 70,

    AVERAGE: 60,

    BELOW_AVERAGE: 50,

    POOR: 35

});

/**
 * Business Benchmarks
 */
export const BENCHMARKS = Object.freeze({

    IDEAL_MARGIN: 20,

    IDEAL_RENT_RATIO: 8,

    MAX_RENT_RATIO: 12,

    IDEAL_SALARY_RATIO: 10,

    MAX_SALARY_RATIO: 15,

    IDEAL_EXPENSE_RATIO: 25,

    MAX_EXPENSE_RATIO: 35

});

/**
 * KPI Card Configuration
 */

export const KPI = [

    {
        id: "revenue",
        title: "Revenue",
        icon: "indian-rupee",
        color: "green"
    },

    {
        id: "expense",
        title: "Expenses",
        icon: "wallet",
        color: "orange"
    },

    {
        id: "margin",
        title: "Margin",
        icon: "percent",
        color: "blue"
    },

    {
        id: "profit",
        title: "Profit",
        icon: "trending-up",
        color: "primary"
    },

    {
        id: "health",
        title: "Health",
        icon: "heart-pulse",
        color: "purple"
    },

    {
        id: "target",
        title: "Target",
        icon: "target",
        color: "amber"
    }

];

/**
 * Expense Categories
 */

export const EXPENSES = Object.freeze({

    FIXED: [

        "rent",

        "salary",

        "internet"

    ],

    VARIABLE: [

        "electricity",

        "stationary",

        "marketing",

        "misc"

    ]

});

/**
 * Theme Colors
 */

export const COLORS = Object.freeze({

    PRIMARY: "#008753",

    SECONDARY: "#004B87",

    SUCCESS: "#00B46E",

    WARNING: "#FFB020",

    DANGER: "#E5484D",

    INFO: "#3B82F6",

    PURPLE: "#8B5CF6",

    GRAY: "#CBD5E1"

});

/**
 * Chart Colors
 */

export const CHART_COLORS = Object.freeze({

    REVENUE: "#008753",

    EXPENSE: "#E5484D",

    PROFIT: "#004B87",

    MARGIN: "#00B46E",

    RENT: "#2563EB",

    SALARY: "#10B981",

    INTERNET: "#F59E0B",

    ELECTRICITY: "#EF4444",

    STATIONARY: "#8B5CF6",

    MARKETING: "#EC4899",

    MISC: "#64748B"

});

/**
 * Scenario Names
 */

export const SCENARIOS = Object.freeze({

    CURRENT: "Current",

    MARGIN: "20% Margin",

    REVENUE: "+₹50,000 Revenue",

    BEST: "Best Case"

});

/**
 * Local Storage Keys
 */

export const STORAGE_KEYS = Object.freeze({

    SETTINGS: "roi_settings",

    INPUTS: "roi_inputs",

    THEME: "roi_theme",

    HISTORY: "roi_history"

});

/**
 * Animation Durations
 */

export const ANIMATION = Object.freeze({

    FAST: 150,

    NORMAL: 300,

    SLOW: 600

});

/**
 * Default Empty State
 */

export const DEFAULT_STATE = Object.freeze({

    rent: 0,

    salary: 0,

    internet: 0,

    electricity: 0,

    stationary: 0,

    marketing: 0,

    misc: 0,

    revenue: 0,

    margin: 0,

    target: 0,

    timeframe: "monthly",

    salaryMode: "total",

    rentMode: "with"

});

/**
 * Business Messages
 */

export const MESSAGES = Object.freeze({

    NO_DATA:
        "Enter financial details to begin analysis.",

    HEALTHY:
        "Business performance is healthy.",

    WARNING:
        "Some KPIs require improvement.",

    DANGER:
        "Immediate financial attention required."

});

/**
 * Application Events
 */

export const EVENTS = Object.freeze({

    INPUT_CHANGED: "inputChanged",

    KPI_UPDATED: "kpiUpdated",

    CHART_UPDATED: "chartUpdated",

    STATE_CHANGED: "stateChanged",

    THEME_CHANGED: "themeChanged"

});

/**
 * Number Formatting
 */

export const LOCALE = Object.freeze({

    CURRENCY: "en-IN",

    CURRENCY_CODE: "INR",

    MAX_DECIMALS: 2

});
