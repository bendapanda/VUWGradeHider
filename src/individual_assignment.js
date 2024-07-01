/**
 * This script runs on pages matching: *://nuku.wgtn.ac.nz/courses/*\/assignments/*
 */
import { get_parent_text_only, alterHTML, getElements} from "./common";

/**
 * function that examines an html element containing a grade and reports on what
 * it should be replaced with. 
 * @param entry html element to be examined
 * @returns 1 if the grade is a pass, 0 if it is a fail, and 2 otherwise  
 */
function getPassFailNotOut(entry) {
    
    let gradeStr = get_parent_text_only(entry);

    let splitMark = gradeStr.split('/');
    let markStr = splitMark[0];
    let outOfStr = splitMark[1];

    if (markStr.length > 0 && !isNaN(markStr)) {

        return (Number(markStr) / Number(outOfStr) < 0.5 ? 0 : 1);
    }

    else { return 2; }
}

// the assignment pages show the grades in two spots, so we need to remove both

// get the html elements to be replaced
getElements('span.points-value').then((grade_entries) => {
if (grade_entries != null) {
    grade_entries.forEach(entry => {
        let mark = entry.querySelector('strong')
        // determine the results
        let result = getPassFailNotOut(mark);
        // replace the html based on the results
        alterHTML(entry, result)
    });
}
}); 
 
// get the html elements to be replaced
getElements('span.css-102gxog-text').then((grade_entries) => {
if (grade_entries != null) {
    grade_entries.forEach(entry => {
        // determine the results
        let result = getPassFailNotOut(entry);
        // replace the html based on the results
        alterHTML(entry, result)
    });
}
}); 






