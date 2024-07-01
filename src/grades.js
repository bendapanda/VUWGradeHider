/**
 * This script runs on pages matching: *://nuku.wgtn.ac.nz/courses/*\/grades
 */
import { get_parent_text_only, alterHTML, getElements } from "./common.js";

/**
 * function that examines an html element containing a grade and reports on what
 * it should be replaced with. 
 * @param entry html element to be examined
 * @returns 1 if the grade is a pass, 0 if it is a fail, and 2 otherwise  
 */
function getPassFailNotOut(entry) {
    let tooltip = entry.querySelector('span.tooltip');
    let grade_entry_spans = tooltip.querySelectorAll('span');
    let grade_out_of = grade_entry_spans[grade_entry_spans.length - 1];

    let grade = tooltip.querySelector('span.grade');
    let grade_str = get_parent_text_only(grade).trim();
    let out_of_str = get_parent_text_only(grade_out_of);

    if (grade_str.length > 0 && !isNaN(grade_str)) {

        let out_of_score = out_of_str.split('/')[1].trim();
        return (Number(grade_str) / Number(out_of_score) < 0.5 ? 0 : 1);
    }

    else { return 2; }
}

getElements('div.score_holder').then((grade_entries) => {
if (grade_entries != null) {
    grade_entries.forEach(entry => {
        let result = getPassFailNotOut(entry);
        alterHTML(entry, result)
    });
}
}); 