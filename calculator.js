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

import {
    FINANCIAL,
    BENCHMARKS
} from "./constants.js";

import {
    parseNumber,
    round,
    divide,
    percentage
} from "./utils.js";

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
   Calculation Engine - Part 3
========================================================== */

import {
    HEALTH,
    BENCHMARKS
} from "./constants.js";

import {
    clamp,
    round
} from "./utils.js";

/* ==========================================================
   Health Score
========================================================== */

export function calculateHealthScore({

    profit,

    margin,

    expenseRatio,

    rentRatio,

    salaryRatio

}){

    let score = 100;

    /* Profit */

    if(profit <= 0){

        score -= 40;

    }

    /* Margin */

    if(margin < BENCHMARKS.IDEAL_MARGIN){

        score -=

            (BENCHMARKS.IDEAL_MARGIN - margin) * 2;

    }

    /* Expense Ratio */

    if(expenseRatio >

        BENCHMARKS.IDEAL_EXPENSE_RATIO){

        score -=

            expenseRatio -

            BENCHMARKS.IDEAL_EXPENSE_RATIO;

    }

    /* Rent */

    if(rentRatio >

        BENCHMARKS.MAX_RENT_RATIO){

        score -=

            (rentRatio -

            BENCHMARKS.MAX_RENT_RATIO) * 2;

    }

    /* Salary */

    if(salaryRatio >

        BENCHMARKS.MAX_SALARY_RATIO){

        score -=

            (salaryRatio -

            BENCHMARKS.MAX_SALARY_RATIO);

    }

    return clamp(

        round(score),

        0,

        100

    );

}

/* ==========================================================
   ROI Score
========================================================== */

export function calculateROI(

    profit,

    totalExpense

){

    if(totalExpense<=0){

        return 0;

    }

    return clamp(

        round(

            (

                profit/

                totalExpense

            )*100

        ),

        0,

        100

    );

}

/* ==========================================================
   Profit Score
========================================================== */

export function calculateProfitScore(

    profit,

    revenue

){

    if(revenue<=0){

        return 0;

    }

    return clamp(

        round(

            (

                profit/

                revenue

            )*1000

        ),

        0,

        100

    );

}

/* ==========================================================
   Expense Score
========================================================== */

export function calculateExpenseScore(

    expenseRatio

){

    return clamp(

        round(

            100-expenseRatio

        ),

        0,

        100

    );

}

/* ==========================================================
   Margin Score
========================================================== */

export function calculateMarginScore(

    margin

){

    return clamp(

        round(

            margin*5

        ),

        0,

        100

    );

}

/* ==========================================================
   Business Grade
========================================================== */

export function calculateGrade(

    healthScore

){

    if(

        healthScore>=90

    ) return "A+";

    if(

        healthScore>=80

    ) return "A";

    if(

        healthScore>=70

    ) return "B+";

    if(

        healthScore>=60

    ) return "B";

    if(

        healthScore>=50

    ) return "C";

    return "D";

}

/* ==========================================================
   Business Status
========================================================== */

export function calculateBusinessStatus(

    healthScore

){

    if(

        healthScore>=

        HEALTH.EXCELLENT

    ){

        return "Excellent";

    }

    if(

        healthScore>=

        HEALTH.VERY_GOOD

    ){

        return "Very Good";

    }

    if(

        healthScore>=

        HEALTH.GOOD

    ){

        return "Good";

    }

    if(

        healthScore>=

        HEALTH.AVERAGE

    ){

        return "Average";

    }

    if(

        healthScore>=

        HEALTH.BELOW_AVERAGE

    ){

        return "Needs Improvement";

    }

    return "Critical";

}

/* ==========================================================
   KPI Summary
========================================================== */

export function buildKPIs(data){

    return{

        revenue:data.revenue,

        expenses:data.totalExpense,

        margin:data.margin,

        profit:data.profit,

        health:data.healthScore,

        roi:data.roiScore

    };

}

/* ==========================================================
   Dashboard Metrics
========================================================== */

export function buildDashboardMetrics(data){

    return{

        revenue:data.revenue,

        marginAmount:data.marginAmount,

        totalExpense:data.totalExpense,

        profit:data.profit,

        expenseRatio:data.expenseRatio,

        profitRatio:data.profitRatio,

        rentRatio:data.rentRatio,

        salaryRatio:data.salaryRatio,

        healthScore:data.healthScore,

        roiScore:data.roiScore,

        grade:data.grade

    };

}

/* ==========================================================
   Executive Summary
========================================================== */

export function buildExecutiveSummary(data){

    return{

        revenue:data.revenue,

        profit:data.profit,

        health:data.healthScore,

        grade:data.grade,

        status:data.status,

        expenseRatio:data.expenseRatio,

        margin:data.margin

    };

}

/* ==========================================================
   Recommendation Priority
========================================================== */

export function buildRecommendations(data){

    const list=[];

    if(data.margin<20){

        list.push(

            "Increase Private Label contribution."

        );

    }

    if(data.expenseRatio>

        BENCHMARKS.MAX_EXPENSE_RATIO){

        list.push(

            "Reduce operating expenses."

        );

    }

    if(data.profit<=0){

        list.push(

            "Improve gross margin immediately."

        );

    }

    if(data.healthScore>80){

        list.push(

            "Continue current strategy."

        );

    }

    if(list.length===0){

        list.push(

            "Business performance is stable."

        );

    }

    return list;

}
Retail ROI Analytics v2

index.html

css/
├── theme.css
├── layout.css
├── components.css
├── dashboard.css
├── animations.css
└── responsive.css

js/
├── constants.js
├── state.js
├── utils.js
├── calculator.js
├── charts.js
├── storage.js
├── insights.js
├── ui.js
├── events.js
└── app.js
