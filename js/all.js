var calBtn = document.querySelector('.calculate');
var bmiList = document.querySelector('.bmiList');
var bmiData = JSON.parse(localStorage.getItem('bmiData')) || [];
var height = document.querySelector('.inputHeight');
var weight = document.querySelector('.inputWeight');
var reset = document.querySelector('.reset');
var clearAllBtn = document.querySelector('.clearAllBtn');
var bmiItem = {};

var today = new Date();
var todayDate = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();

calBtn.addEventListener('click',bmiCalculate,false);
bmiList.addEventListener('click',delItem,false);
reset.addEventListener('click',resetData,false);
clearAllBtn.addEventListener('click',clearAllData,false);
updateList(bmiData);

//更新 BMI 紀錄
function updateList(items){
    var str = '';
    for(var i=0;i<items.length;i++){
        str +=      
        `
        <li style="border-left: 7px solid ${bmiItem.color}">
            <h4 class="itemText">${bmiData[i].statusText}</h4>
            <h4>BMI</h4>
            <p>${bmiData[i].bmi}</p>
            <h4>weight</h4>
            <p>${bmiData[i].weight}</p>
            <h4>height</h4>
            <p>${bmiData[i].height}</p>
            <h4>${bmiData[i].date}</h4>    
            <a href="#" class="listDelete" data-index = "${i}">刪除</a>    
        </li>
        `
    }
    //將動態新增的 HTML 標籤加入 bmiList 中
    bmiList.innerHTML = str;
}
//計算 BMI
function bmiCalculate(e){
    e.preventDefault();
    BMI(bmiItem);
    bmiData.push(bmiItem);
    localStorage.setItem('bmiData',JSON.stringify(bmiData));
    console.log(bmiItem.color);
    //更新
    updateList(bmiData);
    clearBtnToggle();

    document.querySelector('.status h3').textContent = bmiItem.bmi;
    document.querySelector('.statusText').textContent = bmiItem.statusText;

    let status = document.querySelector('.status');
    let statusInner = document.querySelector('.status-inner');
    calBtn.style.display = 'none';
    status.style.display = 'flex';

    statusInner.setAttribute('class', "status-inner " + `${bmiItem.status}`);
    statusInner.setAttribute('style', "color:" + `${bmiItem.color}` + ";border: 6px solid " + `${bmiItem.color}`);
    document.querySelector('.status-inner a').setAttribute('style', "background:" + `${bmiItem.color}`);
    document.querySelector('.statusText').setAttribute('style', "color:" + `${bmiItem.color}`);
}
//BMI
function BMI(item){
    let Height = parseInt(height.value);
    let Weight = parseInt(weight.value);
    let bmi = (Weight / Math.pow(Height/100, 2)).toFixed(2); //小數點後兩位
    switch(true){
        case bmi <= 18.5:
            item.status = "light";
            item.statusText = "過輕";
            item.color = "#31BAF9";
            break;
        case bmi > 18.5 && bmi<=25:
            item.status = "balance";
            item.statusText = "理想";
            item.color = "#86D73F";
            break;
        case bmi > 25 && bmi<=30:
            item.status = "fat";
            item.statusText = "過重";
            item.color = "#FF982D";
            break;
        case bmi > 30 && bmi<=35:
            item.status = "fat-1";
            item.statusText = "輕度肥胖";
            item.color = "#FF6C03";
            break;
        case bmi > 35 && bmi<=40:
            item.status = "fat-2";
            bmiItem.statusText = "中度肥胖";
            item.color = " #FF6C03";
            break;
        case bmi > 40:
            item.status = "fat-3";
            item.statusText = "重度肥胖";
            item.color = "#FF1200";
            break;
        default:
            alert('請輸入身高體重');
            break;
    }
    item.bmi = bmi;
    item.weight = Weight;
    item.height = Height;
    item.date = todayDate;
}

//重新輸入資料
function resetData(e){
    e.preventDefault();
    let status = document.querySelector('.status');
    localStorage.removeItem('bmiData');
    updateList(bmiData);
    status.style.display = 'none';
    calBtn.style.display = 'block';
    height.value = '';
    weight.value = '';
}
//刪除單筆資料
function delItem(e){
    e.preventDefault();
    if(e.target.nodeName !== 'A'){return};
    var index = e.target.dataset.index;
    bmiData.splice(index,1);
    localStorage.setItem('listData',JSON.stringify(bmiData));
    updateList(bmiData);
    clearBtnToggle();
}
//清除所有資料
function clearAllData(e){
    e.preventDefault();
    bmiData.splice(0,99);
    localStorage.removeItem('bmiData');
    updateList(bmiData);
    this.style.display = 'none';
}
//清除所有資料按鈕是否顯示
function clearBtnToggle(){
    let bmiList = JSON.parse(localStorage.getItem('bmiData')) || [];
    if(bmiList.length !=0){
        clearAllBtn.style.display = 'block';
    }
    else{
        clearAllBtn.style.display = 'none';
    }
}

