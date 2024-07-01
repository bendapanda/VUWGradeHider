import { get_parent_text_only, alterHTML, getElements } from "./common";

/**
 * This page has the problem that the main heading only shows our mark,
 * not what it was out of. So, we need to dig much deeper to figure out
 * whether or not we passed. 
 *  
 * @param entry The section of html to be read
 * @returns 1 if we passed, 0 if we failed, and 2 otherwise 
 */
function getPassFailNotOut(entry) {
    // we assume the last entry in the table contains the grade
    let firstTable = entry.querySelector('table');
    let tableEntries = firstTable.querySelectorAll('tr');
    let lastTableEntry = tableEntries[tableEntries.length-1];
    let mark = lastTableEntry.querySelector('span.pull-right');

    let markStr = get_parent_text_only(mark); 

    let splitGrade = markStr.split('/');
    let gradeStr = splitGrade[0];
    let outOfStr = splitGrade[1];

    if (gradeStr.length > 0 && !isNaN(gradeStr)) {

        return (Number(gradeStr) / Number(outOfStr) < 0.5 ? 0 : 1);
    }

    else { return 2; }
}

getElements('.panel').then((grade_entries) => {
console.log(grade_entries);
if (grade_entries != null) {
    grade_entries.forEach(entry => {
        let result = getPassFailNotOut(entry);
        // I wanted to keep the comments around so there are multiple elements to change here.
        let finalMark = entry.querySelector('span.final-mark');
        alterHTML(finalMark, result);
        // now, in the first table in the entry, for each tr, get the last td
        // we want to set all of these to empty.
        let firstTable = entry.querySelector('table');
        let tableRows = firstTable.querySelectorAll('tr');
        tableRows.forEach((tr) => {
            let rowEntries = tr.querySelectorAll('td');
            if (rowEntries.length > 0) {
               let lastEntry = rowEntries[rowEntries.length-1]; 
               lastEntry.innerHTML = '';
            }
        });
    });
}
}); 





