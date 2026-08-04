/* ==========================================================
   Retail ROI Analytics v2
   Calculation Engine
========================================================== */

import {
    FINANCIAL,
    BENCHMARKS,
    HEALTH
} from "./constants.js";

import {
    parseNumber,
    divide,
    percentage,
    clamp,
    round
} from "./utils.js";

/* ==========================================================
   Time Multiplier
========================================================== */

export function getTimeMultiplier(timeframe) {

    return timeframe === "annual"
        ? 12
        : 1;

}

/* ==========================================================
   Rent
========================================================== */

export function calculateRent(

    rent,

    rentMode

) {

    rent = parseNumber(rent);

    if (rentMode === "without") {

        rent *= (1 + FINANCIAL.GST_RATE);

    }

    return round(rent);

}

/* ==========================================================
   Employee Salary
========================================================== */

export function calculateEmployeeSalary(

    employees = []

) {

    return employees.reduce(

        (sum, employee) => {

            return sum +

                parseNumber(employee.salary);

        },

        0

    );

}

/* ==========================================================
   Salary
========================================================== */

export function calculateSalary(

    salaryMode,

    salary,

    employees = []

) {

    if (salaryMode === "detailed") {

        return calculateEmployeeSalary(

            employees

        );

    }

    return parseNumber(salary);

}

/* ==========================================================
   Fixed Expenses
========================================================== */

export function calculateFixedExpenses({

    rent,

    rentMode,

    salary,

    salaryMode,

    employees,

    internet

}) {

    const actualRent =

        calculateRent(

            rent,

            rentMode

        );

    const actualSalary =

        calculateSalary(

            salaryMode,

            salary,

            employees

        );

    const total =

        actualRent +

        actualSalary +

        parseNumber(internet);

    return {

        rent: actualRent,

        salary: actualSalary,

        internet: parseNumber(internet),

        fixedExpense: round(total)

    };

}

/* ==========================================================
   Variable Expenses
========================================================== */

export function calculateVariableExpenses({

    electricity,

    stationary,

    marketing,

    misc

}) {

    electricity =

        parseNumber(electricity);

    stationary =

        parseNumber(stationary);

    marketing =

        parseNumber(marketing);

    misc =

        parseNumber(misc);

    return {

        electricity,

        stationary,

        marketing,

        misc,

        variableExpense:

            round(

                electricity +

                stationary +

                marketing +

                misc

            )

    };

}

/* ==========================================================
   Total Expenses
========================================================== */

export function calculateTotalExpenses(

    fixed,

    variable

) {

    return round(

        fixed +

        variable

    );

}

/* ==========================================================
   Revenue
========================================================== */

export function calculateRevenue(

    revenue,

    timeframe

) {

    return round(

        parseNumber(revenue) *

        getTimeMultiplier(timeframe)

    );

}

/* ==========================================================
   Margin Amount
========================================================== */

export function calculateMarginAmount(

    revenue,

    margin

) {

    revenue = parseNumber(revenue);

    margin = parseNumber(margin);

    return round(

        revenue *

        (margin / 100)

    );

}

/* ==========================================================
   Profit
========================================================== */

export function calculateProfit(

    marginAmount,

    totalExpense

) {

    return round(

        marginAmount -

        totalExpense

    );

}

/* ==========================================================
   Expense Ratio
========================================================== */

export function calculateExpenseRatio(

    expense,

    revenue

) {

    return round(

        percentage(

            expense,

            revenue

        )

    );

}

/* ==========================================================
   Profit Ratio
========================================================== */

export function calculateProfitRatio(

    profit,

    revenue

) {

    return round(

        percentage(

            profit,

            revenue

        )

    );

}

/* ==========================================================
   Rent Ratio
========================================================== */

export function calculateRentRatio(

    rent,

    revenue

) {

    return round(

        percentage(

            rent,

            revenue

        )

    );

}

/* ==========================================================
   Salary Ratio
========================================================== */

export function calculateSalaryRatio(

    salary,

    revenue

) {

    return round(

        percentage(

            salary,

            revenue

        )

    );

}

/* ==========================================================
   Margin Efficiency
========================================================== */

export function calculateMarginEfficiency(

    profit,

    marginAmount

) {

    return round(

        percentage(

            profit,

            marginAmount

        )

    );

}
/* ==========================================================
   Retail ROI Analytics v2
   Calculation Engine - Part 2
========================================================== */
/* ==========================================================
   Break Even Revenue
========================================================== */

export function calculateBreakEven(

    totalExpense,

    margin

){

    margin = parseNumber(margin);

    if(margin <= 0){

        return 0;

    }

    return round(

        totalExpense /

        (margin / 100)

    );

}


/* ==========================================================
   Required Revenue
========================================================== */

export function calculateRequiredRevenue(

    targetProfit,

    totalExpense,

    margin

){

    margin = parseNumber(margin);

    if(margin<=0){

        return 0;

    }

    return round(

        (

            parseNumber(targetProfit)

            +

            totalExpense

        )

        /

        (

            margin/100

        )

    );

}


/* ==========================================================
   Required Margin
========================================================== */

export function calculateRequiredMargin(

    revenue,

    targetProfit,

    totalExpense

){

    revenue=parseNumber(revenue);

    if(revenue<=0){

        return 0;

    }

    return round(

        (

            (

                parseNumber(targetProfit)

                +

                totalExpense

            )

            /

            revenue

        )

        *

        100

    );

}


/* ==========================================================
   Daily Revenue Target
========================================================== */

export function calculateDailyRevenue(

    revenue,

    timeframe

){

    revenue=parseNumber(revenue);

    return timeframe==="annual"

        ? round(revenue/365)

        : round(revenue/30);

}


/* ==========================================================
   Daily Profit Target
========================================================== */

export function calculateDailyProfit(

    profit,

    timeframe

){

    profit=parseNumber(profit);

    return timeframe==="annual"

        ? round(profit/365)

        : round(profit/30);

}


/* ==========================================================
   Daily BreakEven
========================================================== */

export function calculateDailyBreakEven(

    breakEven,

    timeframe

){

    breakEven=parseNumber(breakEven);

    return timeframe==="annual"

        ? round(breakEven/365)

        : round(breakEven/30);

}


/* ==========================================================
   Target Achievement %
========================================================== */

export function calculateTargetAchievement(

    profit,

    target

){

    target=parseNumber(target);

    if(target<=0){

        return 0;

    }

    return round(

        percentage(

            profit,

            target

        )

    );

}


/* ==========================================================
   Revenue Achievement %
========================================================== */

export function calculateRevenueAchievement(

    revenue,

    requiredRevenue

){

    if(requiredRevenue<=0){

        return 100;

    }

    return round(

        percentage(

            revenue,

            requiredRevenue

        )

    );

}


/* ==========================================================
   Margin Achievement %
========================================================== */

export function calculateMarginAchievement(

    margin,

    requiredMargin

){

    if(requiredMargin<=0){

        return 100;

    }

    return round(

        percentage(

            margin,

            requiredMargin

        )

    );

}


/* ==========================================================
   Opportunity
========================================================== */

export function calculatePrivateLabelGain(

    revenue

){

    return round(

        parseNumber(revenue)

        *

        0.02

    );

}


export function calculateCrossSellGain(

    revenue

){

    return round(

        parseNumber(revenue)

        *

        0.015

    );

}


export function calculateExpenseSaving(

    totalExpense

){

    return round(

        parseNumber(totalExpense)

        *

        0.05

    );

}


/* ==========================================================
   20% Margin Scenario
========================================================== */

export function calculateTwentyMarginScenario(

    revenue,

    expenses

){

    const marginAmount=

        revenue*.20;

    return round(

        marginAmount-

        expenses

    );

}


/* ==========================================================
   Revenue Boost Scenario
========================================================== */

export function calculateRevenueBoostScenario(

    revenue,

    margin,

    expenses

){

    const boosted=

        revenue+

        FINANCIAL.REVENUE_BOOST;

    const marginAmount=

        boosted*

        (

            margin/100

        );

    return round(

        marginAmount-

        expenses

    );

}


/* ==========================================================
   Best Case Scenario
========================================================== */

export function calculateBestScenario(

    revenue,

    expenses

){

    const boosted=

        revenue+

        FINANCIAL.REVENUE_BOOST;

    const marginAmount=

        boosted*

        0.20;

    return round(

        marginAmount-

        expenses

    );

}


/* ==========================================================
   Scenario Engine
========================================================== */

export function calculateScenarios(

    revenue,

    margin,

    expenses,

    currentProfit

){

    return{

        current:

            currentProfit,

        margin:

            calculateTwentyMarginScenario(

                revenue,

                expenses

            ),

        revenue:

            calculateRevenueBoostScenario(

                revenue,

                margin,

                expenses

            ),

        best:

            calculateBestScenario(

                revenue,

                expenses

            )

    };

}
/* ==========================================================
   Retail ROI Analytics v2
   Calculation Engine - Part 4
========================================================== */
/* ==========================================================
   Master Calculation
========================================================== */
function calculateHealthScore() {
    return 75;
}

function calculateROI(profit, expense) {
    if (expense <= 0) return 0;
    return Math.round((profit / expense) * 100);
}

function calculateProfitScore() {
    return 75;
}

function calculateExpenseScore() {
    return 75;
}

function calculateMarginScore() {
    return 75;
}

function calculateGrade(score) {
    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B";
    if (score >= 60) return "C";
    return "D";
}

function calculateBusinessStatus() {
    return "Healthy";
}

function buildKPIs(data) {
    return data;
}

function buildDashboardMetrics(data) {
    return data;
}

function buildExecutiveSummary(data) {
    return data;
}

function buildRecommendations() {
    return [];
}
export function calculateAll(inputs){

    /* -----------------------------
       Revenue
    ------------------------------ */

    const revenue = calculateRevenue(
        inputs.revenue,
        inputs.timeframe
    );

    /* -----------------------------
       Fixed Expenses
    ------------------------------ */

    const fixed = calculateFixedExpenses(inputs);

    /* -----------------------------
       Variable Expenses
    ------------------------------ */

    const variable = calculateVariableExpenses(inputs);

    /* -----------------------------
       Total Expense
    ------------------------------ */

    const totalExpense = calculateTotalExpenses(
        fixed.fixedExpense,
        variable.variableExpense
    );

    /* -----------------------------
       Margin
    ------------------------------ */

    const marginAmount =
        calculateMarginAmount(
            revenue,
            inputs.margin
        );

    /* -----------------------------
       Profit
    ------------------------------ */

    const profit =
        calculateProfit(
            marginAmount,
            totalExpense
        );

    /* -----------------------------
       Ratios
    ------------------------------ */

    const expenseRatio =
        calculateExpenseRatio(
            totalExpense,
            revenue
        );

    const profitRatio =
        calculateProfitRatio(
            profit,
            revenue
        );

    const rentRatio =
        calculateRentRatio(
            fixed.rent,
            revenue
        );

    const salaryRatio =
        calculateSalaryRatio(
            fixed.salary,
            revenue
        );

    const marginEfficiency =
        calculateMarginEfficiency(
            profit,
            marginAmount
        );

    /* -----------------------------
       Targets
    ------------------------------ */

    const breakEven =
        calculateBreakEven(
            totalExpense,
            inputs.margin
        );

    const requiredRevenue =
        calculateRequiredRevenue(
            inputs.target,
            totalExpense,
            inputs.margin
        );

    const requiredMargin =
        calculateRequiredMargin(
            revenue,
            inputs.target,
            totalExpense
        );

    /* -----------------------------
       Daily Planner
    ------------------------------ */

    const dailyRevenue =
        calculateDailyRevenue(
            revenue,
            inputs.timeframe
        );

    const dailyProfit =
        calculateDailyProfit(
            profit,
            inputs.timeframe
        );

    const dailyBreakEven =
        calculateDailyBreakEven(
            breakEven,
            inputs.timeframe
        );

    /* -----------------------------
       Opportunities
    ------------------------------ */

    const privateLabelGain =
        calculatePrivateLabelGain(
            revenue
        );

    const crossSellValue =
        calculateCrossSellGain(
            revenue
        );

    const savingPotential =
        calculateExpenseSaving(
            totalExpense
        );

    /* -----------------------------
       Scenario Engine
    ------------------------------ */

    const scenarios =
        calculateScenarios(
            revenue,
            inputs.margin,
            totalExpense,
            profit
        );

    /* -----------------------------
       Scores
    ------------------------------ */

    const healthScore =
        calculateHealthScore({

            profit,

            margin: inputs.margin,

            expenseRatio,

            rentRatio,

            salaryRatio

        });

    const roiScore =
        calculateROI(
            profit,
            totalExpense
        );

    const profitScore =
        calculateProfitScore(
            profit,
            revenue
        );

    const expenseScore =
        calculateExpenseScore(
            expenseRatio
        );

    const marginScore =
        calculateMarginScore(
            inputs.margin
        );

    const grade =
        calculateGrade(
            healthScore
        );

    const status =
        calculateBusinessStatus(
            healthScore
        );

    /* -----------------------------
       Dashboard Objects
    ------------------------------ */

    const dashboard = {

        revenue,

        margin: inputs.margin,

        marginAmount,

        profit,

        fixedExpense:
            fixed.fixedExpense,

        variableExpense:
            variable.variableExpense,

        totalExpense,

        rent: fixed.rent,

        salary: fixed.salary,

        internet: fixed.internet,

        electricity:
            variable.electricity,

        stationary:
            variable.stationary,

        marketing:
            variable.marketing,

        misc:
            variable.misc,

        expenseRatio,

        profitRatio,

        rentRatio,

        salaryRatio,

        marginEfficiency,

        breakEven,

        requiredRevenue,

        requiredMargin,

        dailyRevenue,

        dailyProfit,

        dailyBreakEven,

        target:
            inputs.target,

        targetAchievement:
            calculateTargetAchievement(
                profit,
                inputs.target
            ),

        revenueAchievement:
            calculateRevenueAchievement(
                revenue,
                requiredRevenue
            ),

        marginAchievement:
            calculateMarginAchievement(
                inputs.margin,
                requiredMargin
            ),

        privateLabelGain,

        crossSellValue,

        savingPotential,

        scenarios,

        healthScore,

        roiScore,

        profitScore,

        expenseScore,

        marginScore,

        grade,

        status

    };

    return {

        ...dashboard,

        kpis:
            buildKPIs(dashboard),

        metrics:
            buildDashboardMetrics(
                dashboard
            ),

        executive:
            buildExecutiveSummary(
                dashboard
            ),

        recommendations:
            buildRecommendations(
                dashboard
            )

    };

}
