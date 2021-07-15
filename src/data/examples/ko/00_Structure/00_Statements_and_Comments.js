/*
 * @name Comments and Statements
 * @description Statements are the elements that make up programs. The ";" (semi-colon) symbol is used to end statements. It is called the "statement  * terminator". Comments are used for making notes to help people better understand programs. A comment begins with two forward slashes ("//"). (ported from https://processing.org/examples/statementscomments.html)
 */
// The createCanvas function is a statement that tells the computer 
// how large to make the window.
// Each function statement has zero or more parameters. 
// Parameters are data passed into the function
// and are used as values for telling the computer what to do.
function setup() {
   createCanvas(710, 400);
}

// The background function is a statement that tells the computer
// which color (or gray value) to make the background of the display window 
function draw() {
   background(204, 153, 0);
}

