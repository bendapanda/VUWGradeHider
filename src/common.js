/*
File containing functions used accross multiple scripts
 */

/**
 * I pulled this function straight off the internet. It reads an html element
 * and returns only the text that is contained within it. 
 * @param parentElement an html element
 * @returns text that is contained only within that element, not its children
 */
export const get_parent_text_only = parentElement => [].reduce.call(parentElement.childNodes, function(a, b) { return a + (b.nodeType === 3 ? b.textContent : ''); }, ''); 

/**
 * Takes an html element and a result, and replaces that element with 
 * a pass (1), fail (0), not out (2) 
 * @param  entry 
 * @param  result 
 */
export function alterHTML(entry, result) {
    let newHTML = "<span style='color: orange;'>Error</span>"
    switch(result) {    
        case 0:
            newHTML = "<span style='color: red;'>fail</span>";
            break;
        case 1:
            newHTML = "<span style='color: #0D4C38;'>pass</span>";
            break;
        case 2:
            newHTML = "<span style='color: grey;'>not released</span>";
            break;
    }

    entry.innerHTML = newHTML;
}

/**
 * I found that sometimes when the network is slow, my extension 
 * will be run before the html I am trying to read is delivered. 
 * This function returns a promise that expires afer 8 seconds,
 * or returns the elements we requested if they exist.
 * @param queryString a string matching the html tags of the objects we are trying to find 
 * @param  titleExcludeQuery (optional) This is only used in assignment.js when some 
 *  trivial results to the query come in before the results we want. This lets us filter out
 *  the ones that are of a specific title.
 * @returns a list of html elements. 
 */
export function getElements(queryString, titleExcludeQuery=null) {
    let startTime = Date.now()
    return new Promise((resolve, reject) => {
        function lookForElements() {
            let elements = Array.from(document.querySelectorAll(queryString));
            let filteredElements = titleExcludeQuery == null ? elements : elements.filter(el => el.getAttribute('title') != titleExcludeQuery)
            if (filteredElements.length > 0) {
                resolve(filteredElements); // Resolve with found elements
            } else if (Date.now() - startTime >= 8000) {
                resolve(null);
            } else {
                requestAnimationFrame(lookForElements); // Check again on the next frame
            }
        }
        lookForElements();
    });
}