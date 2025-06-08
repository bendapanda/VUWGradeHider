# VUW Grade Hider
This is a fairly simple extension that goes through pages on VUW websites and hides the value of grades.
It does this by running a different, small script on each page that contains a grade,
and replaces the grade score with pass, fail, or not released, depending on the state of the assessment.

For me, sometimes the anticipation of waiting to see what grade I got on a particular assignment can be a bit stressful!
In reality I think I've been guilty of taking my assignment marks a bit too seriously, and it's more positive for my mental health
if I only knew whether I had passed or failed the assignment. That's why I made this!


Every page on the vuw website has a different structure with different headings, so a different script is used for each one. However, the default layout of these files is: 

- A function, getPassFailNotOut that decides what we should put in place of the grade.
- A small block of code that finds the grades and replaces them.

There is also a shared file called common that contains functions that all scripts use.

## How to run

Firefox modules seem to act very weird around imports. For that reason I am using webpack,
which packages each script together with its dependencies.
So, to compile the code use "npm run build".

Then, go to about:debugging, this firefox, and add the manifest.json as a temporary extension.
