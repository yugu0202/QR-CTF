const qr = document.getElementById("qr");
const squareTemplate = document.getElementById("square-template");
const qrResult = document.getElementById("qr-result");

const cellStateList = [];

function onClickSquare(x,y) {
  console.log(x,y)
  changeColor = (cellStateList[x][y]+1)%2;
  cellStateList[x][y] = changeColor;
  document
    .querySelector(`[data-x='${x}'][data-y='${y}']`)
    .setAttribute("data-state",changeColor);
}

function setPosPattern(x,y) {
  let setBlack = false;
  for (let a=x;a<x+7;a++)
  {
    for (let b=y;b<y+7;b++)
    {
      if (a == x || a == x+6)
      {
        setBlack = true;
      }
      else if (b == y || b == y+6)
      {
        setBlack = true;
      }
      else if (a >= x+2 && a <= x+4 && b >= y+2 && b<= y+4)
      {
        setBlack = true;
      }

      if (setBlack)
      {
        setBlack = false;
        cellStateList[a][b] = 1;
        document
          .querySelector(`[data-x='${a}'][data-y='${b}']`)
          .setAttribute("data-state",1);
      }
    }
  }
}

function isTimingPattern(x,y) {
  let setBlack = false;

  for (let i of [8,10,12])
  {
    if (x == i && y == 6)
    {
      setBlack = true;
    }
    else if (y == i && x == 6)
    {
      setBlack = true;
    }
  }

  return setBlack;
}

function analyzeQR() {
  let textarea = document.getElementById("qr-result");
  let select = document.getElementById("mask");
  let num = select.selectedIndex;
  textarea.value = select.options[num].value;
}

window.onload = function(){
  qrResult.readOnly = true;
  let setBlack = false;
  for (let y=0;y<21;y++)
  {
    let cellState = []
    for (let x=0;x<21;x++)
    {
      const square = squareTemplate.cloneNode(true);
      square.removeAttribute("id");
      qr.appendChild(square);

      const cell = square.querySelector(".cell");
      cell.setAttribute("data-x",x);
      cell.setAttribute("data-y",y);

      setBlack = isTimingPattern(x,y);

      if (x == 8 && y == 13)
      {
        setBlack = true;
      }

      if (setBlack)
      {
        setBlack = false;
        cell.setAttribute("data-state",1);
        cellState.push(1);
      }
      else
      {
        cell.setAttribute("data-state",0);
        cellState.push(0);
      }

      square.addEventListener('click', () => {
        onClickSquare(x,y);
      })
    }
    cellStateList.push(cellState);
  }

  setPosPattern(0,0);
  setPosPattern(0,14);
  setPosPattern(14,0);
}
