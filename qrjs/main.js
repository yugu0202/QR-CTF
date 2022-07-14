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


function xorBit(bitdata,maskdata) {
	let code = ("0000" + (parseInt(bitdata.slice(0,4),2) ^ parseInt(maskdata.slice(0,4),2)).toString(2)).slice(-4);
	bitdata = bitdata.slice(4);
	maskdata = maskdata.slice(4);
	let str_num = (parseInt(bitdata.slice(0,8),2) ^ parseInt(maskdata.slice(0,8),2)).toString();
	bitdata = bitdata.slice(8);
	maskdata = maskdata.slice(8);

	for (let i = 0;i<=bitdata.length/8;i++)
	{
		let str = String.fromCharCode((parseInt(bitdata.slice(0,8),2) ^ parseInt(maskdata.slice(0,8),2)));
		bitdata = bitdata.slice(8);
		maskdata = maskdata.slice(8);
		console.log(str);
	}

	console.log(code);
	console.log(str_num);
}


function analyzeQR() {
  let textarea = document.getElementById("qr-result");
  let select = document.getElementById("mask");
  let num = select.selectedIndex;

	let x = 20;
	let y = 20;
	let count = 1;
	let bitdata = "";
	let maskdata = "";
	let skipFlag = false;

	while (count <= 11)
	{
		if (x == 6)
		{
			x -= 1;
			count ++;
			continue;
		}

		while (y <= 20 && y >= 0)
		{
			if (y == 6)
			{
				console.log("skip! y==6");
				y += (-1) ** count;
				continue;
			}

			if (x >= 0 && x <= 8)
			{
				if (y >= 0 && y <= 8)
				{
					console.log("skip! left top box");
					skipFlag = true;
				}
				else if (y >= 12 && y <= 20)
				{
					console.log("skip! left buttom box");
					skipFlag = true;
				}
			}

			if (x >= 12 && x <= 20 && y >= 0 && y <= 8)
			{
				console.log("skip! right top box");
				skipFlag = true;
			}

			if (!skipFlag)
			{
				bitdata += cellStateList[x][y].toString();
				bitdata += cellStateList[x-1][y].toString();

				if ((x+y)%3 == 0)
				{
					maskdata += "1";
				}
				else
				{
					maskdata += "0";
				}

				if ((x-1+y)%3 == 0)
				{
					maskdata += "1";
				}
				else
				{
					maskdata += "0";
				}
			}

			skipFlag = false;

			if (y == 0 && count%2 == 1 || y == 20 && count%2 == 0)
			{
				break;
			}

			y += (-1) ** count;
		}

		x -= 2;
		count++;
	}

	console.log(bitdata.length);

	//select.options[num].value

	xorBit(bitdata,maskdata);

  textarea.value = bitdata;
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
