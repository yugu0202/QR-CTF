const qr = document.getElementById("qr");
const squareTemplate = document.getElementById("square-template");
const removeTemplate = document.getElementById("remove-template");
const qrResult = document.getElementById("qr-result");

let cellStateList = [];
let size = 21;
let mask = "011";
let maskSelect = document.getElementById("mask");

function checkMask() {
  let maskdata = "";

  for (let i=2;i<5;i++) {
    maskdata += cellStateList[i][8].toString();
  }

  mask = ("000" + (parseInt(maskdata,2) ^ parseInt("101",2)).toString(2)).slice(-3);

  for (opt of maskSelect.options) {
    if (opt.value == mask) {
      opt.selected = true;
    }
  }
}

function onClickSquare(x,y) {
  changeColor = (cellStateList[x][y]+1)%2;
  cellStateList[x][y] = changeColor;
  document
    .querySelector(`[data-x='${x}'][data-y='${y}']`)
    .setAttribute("data-state",changeColor);

  if (x >= 2 && x <= 4 && y == 8) {
    checkMask();
  }
}

function onClickRemove(x) {
	for (let y=0;y<size;y++) {
		if (isTimingPattern(x,y) || x == 8 && y == size-8) {
			cellStateList[x][y] = 1;
			document
				.querySelector(`[data-x='${x}'][data-y='${y}']`)
				.setAttribute("data-state",1);
		}
		else {
			cellStateList[x][y] = 0;
			document
				.querySelector(`[data-x='${x}'][data-y='${y}']`)
				.setAttribute("data-state",0);
		}
	}

  setPosPattern(0,0);
  setPosPattern(0,size-7);
  setPosPattern(size-7,0);

	if (size >= 25)
	{
		setAlignmentPattern(size-9,size-9);
	}

  if (x >= 2 && x <= 4) {
    checkMask();
  }
}

function selectSize(event) {
	size = parseInt(event.currentTarget.value);
	let width = `width:${size*30}px`;
	let height = `height:${size*30}px`;
	qr.setAttribute("style",width);
	qr.setAttribute("height",height);
	resetBase();
	createBase();
}

function selectMask(event) {
  mask = event.currentTarget.value;
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

function setAlignmentPattern(x,y) {
	let setBlack = false;
	for (let a=x;a<x+5;a++) {
		for (let b=y;b<y+5;b++) {
			if (a== x || a == x+4) {
				setBlack = true;
			}
			else if (b == y || b == y+4) {
				setBlack = true;
			}
			else if (a == x+2 && b == y+2) {
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

  for (let i=8;i<=size;i+=2)
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
  let return_str = "";
	let code = ("0000" + (parseInt(bitdata.slice(0,4),2) ^ parseInt(maskdata.slice(0,4),2)).toString(2)).slice(-4);
	bitdata = bitdata.slice(4);
	maskdata = maskdata.slice(4);
	let str_num = (parseInt(bitdata.slice(0,8),2) ^ parseInt(maskdata.slice(0,8),2)).toString();
	bitdata = bitdata.slice(8);
	maskdata = maskdata.slice(8);

	for (let i = 0;i<parseInt(str_num);i++)
	{
		return_str += String.fromCharCode((parseInt(bitdata.slice(0,8),2) ^ parseInt(maskdata.slice(0,8),2)));
		bitdata = bitdata.slice(8);
		maskdata = maskdata.slice(8);
	}

  return_str = "文字数:" + str_num + "\n" + return_str;
  return_str = "code:" + code + "\n" + return_str;

  return return_str;
}


function skipPosPattern(x,y) {
	if (x >= 0 && x <= 8)
	{
		if (y >= 0 && y <= 8)
		{
  		return true;
		}
		else if (y >= size-7 && y <= size-1)
		{
  		return true;
		}
	}

	if (x >= size-8 && x <= size-1 && y >= 0 && y <= 8)
	{
		return true;
	}

	return false;
}

function skipAlignmentPattern(x,y) {
	let skipFlag = false;


	if (x >=size-9 && x <= size-5) {
		if (y >=size-9 && y <= size-5) {
			skipFlag = true;
		}
	}

	return skipFlag;
}

function getMaskData(j,i) {
  let maskdata = "";
  switch (mask) {
    case "000":
      maskdata = ((i+j)%2 == 0) ? "1" : "0";
      break;
    case "001":
      maskdata = (i%2 == 0) ? "1" : "0";
      break;
    case "010":
      maskdata = (j%3 == 0) ? "1" : "0";
      break;
    case "011":
      maskdata = ((i+j)%3 == 0) ? "1" : "0";
      break;
    case "100":
      maskdata = (((i/2)+(j/3))%2 == 0) ? "1" : "0";
      break;
    case "101":
      maskdata = ((i*j)%2+(i*j)%3 == 0) ? "1" : "0";
      break;
    case "110":
      maskdata = (((i*j)%2+(i*j)%3)%2 == 0) ? "1" : "0";
      break;
    case "111":
      maskdata = (((i*j)%3+(i+j)%2)%2 == 0) ? "1" : "0";
      break;
  }

  return maskdata;
}

function analyzeQR() {
  let textarea = document.getElementById("qr-result");
  let select = document.getElementById("mask");
  let num = select.selectedIndex;

	let x = size-1;
	let y = size-1;
	let count = 1;
	let bitdata = "";
	let maskdata = "";
	let skipFlagR = false;
	let skipFlagL = false;

	while (count <= (size+1)/2)
	{
		if (x == 6)
		{
			x -= 1;
			count ++;
			continue;
		}

		while (y <= size-1 && y >= 0)
		{
			if (y == 6)
			{
				y += (-1) ** count;
				continue;
			}

			skipFlagR = skipPosPattern(x,y);
			skipFlagL = skipPosPattern(x-1,y);

			if (size >= 25 && !skipFlagR) {
				skipFlagR = skipAlignmentPattern(x,y);
			}
			if (size >= 25 && !skipFlagL) {
				skipFlagL = skipAlignmentPattern(x-1,y);
			}


			if (!skipFlagR)
			{
				bitdata += cellStateList[x][y].toString();

        maskdata += getMaskData(x,y);
			}
      if (!skipFlagL)
      {
				bitdata += cellStateList[x-1][y].toString();
        maskdata += getMaskData(x-1,y);
      }

			skipFlagR = false;
			skipFlagL = false;

			if (y == 0 && count%2 == 1 || y == size-1 && count%2 == 0)
			{
				break;
			}

			y += (-1) ** count;
		}

		x -= 2;
		count++;
	}

  textarea.value = xorBit(bitdata,maskdata);
}

function createBase() {
  let setBlack = false;

	for (let x=0;x<size;x++) {
		const remove = removeTemplate.cloneNode(true);
		remove.removeAttribute("id");
		qr.appendChild(remove);

		remove.addEventListener('click', () => {
			onClickRemove(x);
		})
	}

  for (let y=0;y<size;y++)
  {
    let cellState = []
    for (let x=0;x<size;x++)
    {
      const square = squareTemplate.cloneNode(true);
      square.removeAttribute("id");
      qr.appendChild(square);

      const cell = square.querySelector(".cell");
      cell.setAttribute("data-x",x);
      cell.setAttribute("data-y",y);

      setBlack = isTimingPattern(x,y);

      if (x == 8 && y == size-8)
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
  setPosPattern(0,size-7);
  setPosPattern(size-7,0);

	if (size >= 25)
	{
		setAlignmentPattern(size-9,size-9);
	}
}

function resetBase() {
	while (qr.lastChild) {
		qr.removeChild(qr.lastChild);
	}
	cellStateList = [];
}

window.onload = function(){
  qrResult.readOnly = true;

	createBase();

	let size = document.getElementById("size");
	size.addEventListener('change',selectSize);
	maskSelect.addEventListener('change',selectMask);
}
