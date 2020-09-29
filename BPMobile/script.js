var testArray = [];
var arrSize = 51;
var centre = Math.floor(arrSize / 2);
var pre = document.getElementById("output");

for (var i = 0; i < arrSize; i++) {
    testArray[i] = [];
    for (var j = 0; j < arrSize; j++) {
        testArray[i][j] = " ";
        if (i == centre) {
            testArray[i][j] = "-";
        } else if (j == centre) {
            testArray[i][j] = "|";
        }
    }
}

testArray[centre][centre] = "+";

function showInput() {
    pre.innerHTML = testArray.join("\n").split(",").join("");
}

function setObjectsByXY_onclick() {
    var objectName = document.getElementById('nameSet').value;
    var xPoint = document.getElementById('xPointSet').value;
    var yPoint = document.getElementById('yPointSet').value;
    setObjectsByXY(objectName, xPoint, yPoint);

}
function getObjectByXY_onclick() {
    var xPoint = Number(document.getElementById('xPointGet').value);
    var yPoint = Number(document.getElementById('yPointGet').value);
    document.getElementById('nameGet').value = getObjectByXY(centre - yPoint, xPoint + centre);
}

function updateObjectXY_onclick() {
    var objectName = document.getElementById('nameUpdate').value;
    var xPoint = document.getElementById('xPointUpdate').value;
    var yPoint = document.getElementById('yPointUpdate').value;
    updateObjectXY(objectName, xPoint, yPoint);
}

function setObjectPositionByDistance_onclick() {
    var objectName = document.getElementById('nameDistance').value;
    var distance = document.getElementById('distance').value;
    var angle = document.getElementById('angle').value;
    setObjectPositionByDistance(objectName, distance, angle);
}

function setObjectsByXY(objectName, xPoint, yPoint) {
    if (centre - Number(yPoint) < 0 || centre + Number(xPoint) > arrSize
    || centre + Number(xPoint) < 0 || centre - Number(yPoint) > arrSize) {
        alert("too high value");
    } else {
        testArray[centre - Number(yPoint)][centre + Number(xPoint)] = objectName;
        showInput();
    }
}

function getObjectByXY(xPoint, yPoint) {
    var findObj = testArray[xPoint][yPoint];
    console.log(findObj)
    return findObj;
}

function findByName(objName) {
    for (var i = 0; i < arrSize; i++) {
        for (var j = 0; j < arrSize; j++) {
            if (testArray[i][j] == objName) {
                return [i, j];
            }
        }
    }
}
function deleteObject(xPoint, yPoint) {
    testArray[Number(xPoint)][Number(yPoint)] = " ";
    showInput();
}

function updateObjectXY(objName, xPoint, yPoint) {
    var coords = findByName(objName);
    deleteObject(coords[0], coords[1]);
    setObjectsByXY(objName, xPoint, yPoint);
    showInput();
}

function setObjectPositionByDistance(objName, distance, angle) {
    var coords = findByName(objName);
    var rad = angle * Math.PI / 180;
    xDistance = Math.floor(Math.cos(rad) * distance);
    yDistance = Math.floor(Math.sin(rad) * distance);
    updateObjectXY(objName, centre - coords[0] + Number(yDistance), Number(coords[1]) - centre + Number(xDistance));
    showInput();
}

