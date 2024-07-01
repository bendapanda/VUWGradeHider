/**
 * This script runs on pages matching: *://nuku.wgtn.ac.nz/courses/*\/assignments
 */
import { get_parent_text_only, alterHTML, getElements } from "./common";

/**
 * function that examines an html element containing a grade and reports on what
 * it should be replaced with. 
 * @param entry html element to be examined
 * @returns 1 if the grade is a pass, 0 if it is a fail, and 2 otherwise  
 */
function getPassFailNotOut(entry) {
    console.log(entry);
    
    let mark = entry.querySelector('b');
    let mark_str = get_parent_text_only(mark); 

    let grade_str = get_parent_text_only(entry).trim();
    let split_grade = grade_str.split('/');
    let gradeout_of_str = split_grade[1].trim().split(' ')[0];

    console.log(mark_str, gradeout_of_str)

    if (mark_str.length > 0 && !isNaN(mark_str)) {

        return (Number(mark_str) / Number(gradeout_of_str) < 0.5 ? 0 : 1);
    }

    else { return 2; }
}

getElements('.score-display').then((grade_entries) => {
console.log(grade_entries);
if (grade_entries != null) {
    grade_entries.forEach(entry => {
        let result = getPassFailNotOut(entry);
        alterHTML(entry, result)
    });
}
}); 





