export function Greet(){
    alert("Hello, World")
}

//for each square
function Square(color, id, piece){
    return {color, id, piece};
}
function SquareROw(row_id){
    const SquareROw=[];
    if (row_id%2==0){
        SquareROw.push(Square("White","e5",null))
    }
    else{
        SquareROw.push(Square("Black","e5",null))

    }
    return SquareROw;
}

function intiGame(){

    return [SquareROw(8),SquareROw(7),SquareROw(6),SquareROw(5),SquareROw(4),SquareROw(3),SquareROw(2),SquareROw(1)];

}
export{intiGame};