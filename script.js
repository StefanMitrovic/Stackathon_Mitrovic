let maxRow = 10;
let maxCol = 10;

const buildTemplate = function(){
    let container = document.getElementById('container');
    for (let x = 0; x<maxRow; x++){
        let row = document.createElement('div');
        row.id = "row"+(x+1);
        row.className = "allrows row"+(x+1);
        for (let y = 0; y<maxCol; y++){
            let cell = document.createElement('div');
            cell.id = "cell" + (x*10+(y+1));
            cell.className = "allcells cell" + (x*10+(y+1));

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
}
let base = 'cornsilk';
let builtWall = 'red';
let path = 'green';

const wall = function(elemID){
    let cell = document.getElementById(elemID);
    console.log('clicked!');
    if (cell.style.backgroundColor == builtWall){
        cell.style.backgroundColor = base;
    } else {
        cell.style.backgroundColor = builtWall;
    }
}

const solution = function(){
    let grid = [];
    let columnCount = 0;
    let rowCount = 0;
    let cellValue = 1;
    let adjacentSet = {};
    let possibleMoveSet = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1]
    ]
    let checkedCells = [];
    let traversed = new Array(maxRow*maxCol).fill(0);

    for (let x=0; x<maxRow; x++){
        grid[x] = new Array(maxRow).fill(0);
    }

    for (let x = 1; x<(maxRow*maxCol+1); x++){
        if(document.getElementById('cell'+x).style.backgroundColor == 'red'){
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

    for (let x = 0; x<maxRow; x++){
        for (let y = 0; y<maxCol; y++){
            if (grid[x][y] == -1){
                continue
            }
            let currentCell = grid[x][y];
            let openSpots = [];

            for (let i = 0; i<possibleMoveSet.length; i++){
                let newRow = possibleMoveSet[i][0]+x;
                let newCol = possibleMoveSet[i][1]+y;

                if ((newCol >= 0 && newCol < maxCol) && (newRow >= 0 && newRow < maxRow)){
                    if (grid[newRow][newCol] != -1){
                        openSpots.push([newRow, newCol]);

                    }
                }
            }
            adjacentSet[currentCell] = openSpots;
        }
    }

    for (let x = 0; x <maxRow; x++){
        checkedCells[x] = new Array(maxRow).fill(false);
    }

    //Tracking section
    
    let queue = [];
    let solved = false;
    queue.push([0,0]);
    while(queue.length > 0){
        let coordinate = queue.splice(0,1)[0];
        let cell = grid[coordinate[0]][coordinate[1]];
        checkedCells[coordinate[0]][coordinate[1]] = true;

        if (cell == 100){
            solved = true;
            break;
        }

        let neighbor = adjacentSet[cell];
        for (let x = 0; x<neighbor.length; x++){
            let check = neighbor[x];
            if(!checkedCells[check[0]][check[1]]){
                checkedCells[check[0]][check[1]] = true;
                queue.push(check);
                traversed[(grid[check[0]][check[1]])-1] = cell-1;
            }
        }
    }
    if(!solved) {
        console.log('this maze has no solution');
    }
    let endPoint = grid[9][9];//change later to be more fluid
    let startPoint = grid[0][0];
    document.getElementById('cell'+endPoint).style.backgroundColor = path;
    let previous = endPoint-1;
    
    while(true){
        
        let node = traversed[previous];
        document.getElementById('cell'+(node+1)).style.backgroundColor = path;
        if (node == 0){
            break
        } else {
            previous = node;
        }
    }
    document.getElementById('cell'+startPoint).style.backgroundColor = path;
}
