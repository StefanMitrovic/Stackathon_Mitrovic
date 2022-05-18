const buildTemplate = function(){
    let container = document.getElementById('container');
    for (let x = 0; x<25; x++){
        let row = document.createElement('div');
        row.id = "row"+(x+1);
        row.className = "allrows row"+(x+1);
        
        for (let y = 0; y<25; y++){
            let cell = document.createElement('div');
            cell.id = "cell" + (x*10+(y+1));
            cell.className = "allcells cell" + (x*10+(y+1));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
    
}