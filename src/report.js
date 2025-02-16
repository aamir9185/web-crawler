const fs = require('fs');
const path = require('path');
const { URL } = require('url');

function saveReportToCSV(pages, url) {
    const hostname = new URL(url).hostname; // Extract hostname
    const reportDir = path.join(__dirname, '../report'); // Folder outside src
    const filePath = path.join(reportDir, `${hostname}.csv`); // Filename as hostname

    // Ensure the 'report' directory exists
    if (!fs.existsSync(reportDir)) {
        fs.mkdirSync(reportDir, { recursive: true });
    }

    const sortedPages = sortPages(pages);
    const csvContent = sortedPages.map(([url, count]) => `${url},${count}`).join('\n');

    // Write to CSV
    fs.writeFileSync(filePath, `URL,Count\n${csvContent}`);

    console.log(`SEO report saved to: ${filePath}`);
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => b[1] - a[1]);
    return pagesArr;
}

module.exports = {
    saveReportToCSV,
    sortPages
};
