const solver = document.querySelector(".solverbtn");
solver.addEventListener("click",startSolving);

let matrix = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]];

let transpose = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]];

function startSolving (){
    const values = document.querySelectorAll(".content");
    for(let i = 0; i < 81; i++){
        if(!isNaN(values[i].value)){
            matrix[Math.floor(i/9)][i % 9] = Number(values[i].value);
        }else{
            matrix[Math.floor(i/9)][i % 9] = 0;
        }
        
    }
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            transpose[j][i] = matrix[i][j];
        }
    }
    solve();
}

let end = false;

function solve(){
    for(let i = 0; i <= 9; i++){
        for(let j = 0; j < 9; j++){
            if(end){
                return;
            }
            if(i == 9){
                end = true;
                answer();
                return;
            }
            if(matrix[i][j] === 0){
                for(let k = 1; k <= 9; k++){
                    if(end){
                        return;
                    }
                    //row
                    const inMat = matrix[i].filter(val => {
                        return val == k;
                    });
                    //column
                    const inTran = transpose[j].filter(val => {
                        return val == k;
                    });
                    
                    
                    if(inMat == '' && inTran == ''){
                        //box
                        let box = true;
                        let box_x = Math.floor( i / 3 );
                        let box_y = Math.floor( j / 3 );
                        for(let l = box_y * 3; l < box_y * 3 + 3; l++){
                            for(let m = box_x * 3; m < box_x * 3 + 3; m++){
                                if(transpose[l][m] == k || matrix[m][l] == k){
                                    box = false;
                                }
                            }
                        }
                        if(box){
                            matrix[i][j] = k;   
                            transpose[j][i] = k;   
                            solve();
                            matrix[i][j] = 0;   
                            transpose[j][i] = 0;
                        }
                    }
                }
                return;
            }
        }
    }
}

function answer(){
    console.table(matrix);
    const values = document.querySelectorAll(".content");
    for(let i = 0; i < 81; i++){
        values[i].value = matrix[Math.floor(i/9)][i % 9];
    }
};

//solve();