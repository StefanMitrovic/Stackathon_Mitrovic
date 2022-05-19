
let maxRow = 10;
let maxCol = 10;
let board = new Array(maxRow);

const point = function(){
    this.f = 0;
    this.g = 0;
    this.h = 0;
}


// const buildTemplate = function() {
//     for (let y = 0; y<maxCol; y++){
//         board[y] = new Array(maxCol);
//     }
//     for (let y=0; y<maxCol; y++){
//         for (let x=0; x<maxRow; x++){
//             board[y][x] = new point();
//         }
//     }
//     let start = board[0][0];
//     let end = [maxCol-1][maxRow-1];
//     openSet.push(start);
//     return board;
// }

const solution = function(){
    let grid = [];
    let columnCount = 0;
    let rowCount = 0;
    let cellValue = 1;

    for (let x=0; x<maxRow; x++){
        grid[x] = new Array(maxRow).fill(0);
    }
    for (let x = 1; x<(maxRow*maxCol+1); x++){
        if(document.getElementById('cell'+x).style.backgroundColor == builtWall){
            grid[rowCount][columnCount] = -1;
        } else {
            grid[rowCount][columnCount] = cellValue;
        }
        columnCount++;
        if (columnCount==maxRow){
            rowCount++;
            columnCount=0;
        }
        cellValue++
    }
    

}


const buildTemplate = function(){
    let container = document.getElementById('container');
    for (let x = 0; x<maxRow; x++){
        let row = document.createElement('div');
        row.id = "row"+(x+1);
        row.className = "allrows row"+(x+1);
        //board[x] = new Array(maxCol);
        for (let y = 0; y<maxCol; y++){
            let cell = document.createElement('div');
            cell.id = "cell" + (x*10+(y+1));
            cell.className = "allcells cell" + (x*10+(y+1));
            //board[x][y] = new point();

            // if (cell.id == 'cell1'){
            //     cell.name = 'Start';
            //     cell.style.backgroundColor = ('green');
            //     openSet.push(cell);
            // }

            // if (cell.id == 'cell' + (maxCol*maxRow)){
            //     cell.name = 'End';
            //     cell.style.backgroundColor = ('black');
            // }

            if (((x*10)+(y+1)) !=(maxCol*maxRow)  && ((x*10)+(y+1)) != 0){
                //add default color
                cell.onclick = function() {
                    wall(this.id);
                }
            }

            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    render();
}
let base = 'cornsilk';
let builtWall = 'red';


const wall = function(elemID){
    let cell = document.getElementById(elemID);
    console.log('clicked!');
    if (cell.style.backgroundColor == builtWall){
        cell.style.backgroundColor = base;
    } else {
        cell.style.backgroundColor = builtWall;
    }
}


let openSet = [];
let closedSet = [];

console.log(openSet)


const traverse = () => {
    if (openSet.length>0){
        //
    }
    else{
        console.log('No solution!')
    }
}