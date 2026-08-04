/* ==========================================================
   Retail ROI Analytics v2
   Business Insights Engine
========================================================== */

import { BENCHMARKS, HEALTH } from "./constants.js";

/* ==========================================================
   Health Rating
========================================================== */

export function getHealthRating(score) {

    if (score >= HEALTH.EXCELLENT)
        return {
            title: "Excellent",
            color: "success"
        };

    if (score >= HEALTH.VERY_GOOD)
        return {
            title: "Very Good",
            color: "success"
        };

    if (score >= HEALTH.GOOD)
        return {
            title: "Good",
            color: "primary"
        };

    if (score >= HEALTH.AVERAGE)
        return {
            title: "Average",
            color: "warning"
        };

    if (score >= HEALTH.BELOW_AVERAGE)
        return {
            title: "Needs Improvement",
            color: "warning"
        };

    return {
        title: "Critical",
        color: "danger"
    };

}

/* ==========================================================
   Financial Health Insights
========================================================== */

export function generateHealthInsights(data) {

    const insights = [];

    if (data.profit > 0)
        insights.push("Business is generating positive net profit.");

    if (data.margin >= BENCHMARKS.IDEAL_MARGIN)
        insights.push("Gross margin is above the recommended benchmark.");

    if (data.expenseRatio < BENCHMARKS.IDEAL_EXPENSE_RATIO)
        insights.push("Operating expenses are well controlled.");

    if (data.healthScore >= HEALTH.GOOD)
        insights.push("Overall financial health is stable.");

    if (!insights.length)
        insights.push("Additional financial data is required.");

    return insights;

}

/* ==========================================================
   Risk Detection
========================================================== */

export function generateRisks(data) {

    const risks = [];

    if (data.profit <= 0)
        risks.push("Store is operating at a loss.");

    if (data.margin < BENCHMARKS.IDEAL_MARGIN)
        risks.push("Gross margin is below the recommended level.");

    if (data.expenseRatio > BENCHMARKS.MAX_EXPENSE_RATIO)
        risks.push("Operating expenses are too high.");

    if (data.rentRatio > BENCHMARKS.MAX_RENT_RATIO)
        risks.push("Property rent consumes a large share of revenue.");

    if (data.salaryRatio > BENCHMARKS.MAX_SALARY_RATIO)
        risks.push("Salary expenses exceed the recommended level.");

    if (!risks.length)
        risks.push("No major financial risks detected.");

    return risks;

}

/* ==========================================================
   Growth Opportunities
========================================================== */

export function generateGrowthIdeas(data) {

    const list = [];

    if (data.margin < 22)
        list.push("Increase Private Label sales to improve margin.");

    if (data.profitRatio < 10)
        list.push("Focus on improving average basket value.");

    list.push("Promote cross-selling and combo offers.");

    list.push("Increase repeat customer visits through memberships.");

    list.push("Improve conversion of high-margin products.");

    return list;

}

/* ==========================================================
   Cost Saving Suggestions
========================================================== */

export function generateSavings(data) {

    const savings = [];

    if (data.electricity > 10000)
        savings.push("Review electricity usage and optimize power consumption.");

    if (data.marketing > 20000)
        savings.push("Evaluate marketing ROI before increasing spend.");

    if (data.misc > 5000)
        savings.push("Reduce miscellaneous operational expenses.");

    if (data.stationary > 3000)
        savings.push("Optimize stationery procurement.");

    if (!savings.length)
        savings.push("Current expense structure appears efficient.");

    return savings;

}

/* ==========================================================
   Executive Summary
========================================================== */

export function buildExecutiveSummary(data) {

    return `
Revenue : ₹${data.revenue.toLocaleString("en-IN")}

Net Profit : ₹${data.profit.toLocaleString("en-IN")}

Expense Ratio : ${data.expenseRatio.toFixed(1)}%

Profit Ratio : ${data.profitRatio.toFixed(1)}%

Health Score : ${data.healthScore}/100

The business is currently operating at a ${getHealthRating(data.healthScore).title.toLowerCase()} financial level.

Primary recommendation:
Improve gross margin through Private Label products while maintaining strict expense control.

Focus areas:
• Membership growth
• Cross-selling
• Inventory optimisation
• Expense monitoring
• High-margin product mix
`;

}

/* ==========================================================
   Action Plan
========================================================== */

export function generateActionPlan(data) {

    return {

        immediate:
            data.profit <= 0
                ? "Reduce operating expenses immediately."
                : "Maintain profitability while improving margins.",

        weekly:
            "Increase average basket size through add-on selling.",

        monthly:
            "Improve Private Label contribution and customer retention."

    };

}

/* ==========================================================
   Performance Grade
========================================================== */

export function calculateGrade(score) {

    if (score >= 90) return "A+";
    if (score >= 80) return "A";
    if (score >= 70) return "B+";
    if (score >= 60) return "B";
    if (score >= 50) return "C";
    return "D";

}

/* ==========================================================
   Recommendation Cards
========================================================== */

export function generateRecommendations(data) {

    return [

        {
            title: "Increase Revenue",
            description:
                "Focus on customer acquisition and repeat visits."
        },

        {
            title: "Improve Margin",
            description:
                "Sell more Private Label and high-margin products."
        },

        {
            title: "Control Expenses",
            description:
                "Review recurring operational costs monthly."
        },

        {
            title: "Increase Memberships",
            description:
                "Membership customers generally generate higher lifetime value."
        }

    ];

}
