/*
 * Code inspired by http://www.arungudelli.com/2013/09/matrix-effect-using-html5-and-javascript.html
 *
 * by Andrew Golightly (support@andrewgolightly.com)
 *
 * Contributors:
 *   Moonchild (moonchild@palemoon.org)
 */


"use strict";

var theMatrixCanvas = document.getElementById("theMatrixCanvas");
var matrixContext = theMatrixCanvas.getContext("2d");
var yCoordinates;
var timeoutID;
var xIncrement = 20;

function initMatrix() {
    window.addEventListener('resize', resizeMatrixCanvas, false);
    resizeMatrixCanvas();
    
    //make sure the background is completely black at the start
    matrixContext.fillStyle = "black";
    matrixContext.fillRect(0, 0, theMatrixCanvas.width, theMatrixCanvas.height);
}

function resizeMatrixCanvas() {

    // We're about to re-start The Matrix; clear the previous timer.
    // We do this here to prevent a race on the timer, preventing it from
    // firing during resize calculations and re-initialization of the array.
    if (timeoutID) {
        clearInterval(timeoutID);
    }
    
    theMatrixCanvas.width = window.innerWidth;
    theMatrixCanvas.height = window.innerHeight;
    
    console.log("The canvas's new width is " + theMatrixCanvas.width);
    var numCharacters = Math.floor(theMatrixCanvas.width / xIncrement) - 2;
    console.log("Number of characters is: " + numCharacters);
    
    yCoordinates = new Array(numCharacters).join(0).split('');
    for (let i = 0; i < numCharacters; i++) {
      yCoordinates[i] = Math.random() * -4000;
    }
    
    processTheMatrix();
    
    timeoutID = setInterval(function () {
        requestAnimationFrame(processTheMatrix);
    }, 1000 / 22);
}

function processTheMatrix() {
 
    matrixContext.fillStyle = "rgba(0,0,0,0.08)";
    matrixContext.fillRect(0, 0, theMatrixCanvas.width, theMatrixCanvas.height);
    matrixContext.font = "29px sans-serif";
    matrixContext.fillStyle = "#1e1";

    yCoordinates.map(function (y, index) {
        var x = (index * xIncrement) + xIncrement;
        var charSetSelect = (Math.random() * 100);
        if (charSetSelect < 70) {
             matrixContext.fillText(String.fromCharCode(0x30A0 + Math.random() * (0x30FF - 0x30A0 + 1)), x, y);
        } else if (charSetSelect < 80) {
             matrixContext.fillText(String.fromCharCode(0xFF21 + Math.random() * (0xFF3A - 0xFF21 + 1)), x, y);
        } else {
             matrixContext.fillText(String.fromCharCode(0x0391 + Math.random() * (0x042F - 0x0391 + 1)), x, y);
        }
        if (y > theMatrixCanvas.height + Math.random()*1000) {
            yCoordinates[index] = 0;
        } else {
            yCoordinates[index] = y + 15;
        }
    });
    
}