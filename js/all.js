var calBtn = document.querySelector('.calculate');
var bmiList = document.querySelector('.bmiList');
var bmiData = JSON.parse(localStorage.getItem('listData')) || [];
var height = document.querySelector('.inputHeight');
var weight = document.querySelector('.inputWeight');
var reset = document.querySelector('.reset');
var clearAllBtn = document.querySelector('.clearAllBtn')

var today = new Date();
var todayDate = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()+'';

function updateList(items){
    var str = '';
    for(var i=0;i<items.length;i++){
        str +=      
        `
        <li class="${bmiData[i].status}">
            <div class="itemText">${bmiData[i].statusText}</div>
            <div class="item">
                <h4>BMI</h4>
                <p>${bmiData[i].bmi}</p>
            </div>
            <div class="item">
                <h4>weight</h4>
                <p>${bmiData[i].weight}</p>
            </div>
            <div class="item">
                <h4>height</h4>
                <p>${bmiData[i].height}</p>
            </div>
            <div class="item">
                <h4>${bmiData[i].date}</h4>
            </div>
            <a href="#" class="listDelete" data-index = "${i}">刪除</a>    
        </li>
        `
    }
    //將動態新增的 HTML 標籤加入 bmiList 中
    bmiList.innerHTML = str;
}

function bmiCalculate(e){
    e.preventDefault();
    var bmiItem = {};
    let Height = parseInt(height.value);
    let Weight = parseInt(weight.value);
    let bmi = (Weight / Math.pow(Height/100, 2)).toFixed(2); //小數點後兩位

    switch(true){
        case bmi <= 18.5:
            bmiItem.status = "light";
            bmiItem.statusText = "過輕";
            break;
        case bmi > 18.5 && bmi<=25:
            bmiItem.status = "balance";
            bmiItem.statusText = "理想";
            break;
        case bmi > 25 && bmi<=30:
            bmiItem.status = "fat";
            bmiItem.statusText = "過重";
            break;
        case bmi > 30 && bmi<=35:
            bmiItem.status = "fat-1";
            bmiItem.statusText = "輕度肥胖";
            break;
        case bmi > 35 && bmi<=40:
            bmiItem.status = "fat-2";
            bmiItem.statusText = "中度肥胖";
            break;
        case bmi > 40:
            bmiItem.status = "fat-3";
            bmiItem.statusText = "重度肥胖";
            break;
        default:
            alert('請輸入身高體重');
            break;
    }
    bmiItem.bmi = bmi;
    bmiItem.weight = Weight;
    bmiItem.height = Height;
    bmiItem.date = todayDate;

    bmiData.push(bmiItem);

    localStorage.setItem('bmiData',JSON.stringify(bmiData));

    //更新
    updateList(bmiData);
    
    document.querySelector('.status h3').textContent = bmiItem.bmi;
    document.querySelector('.statusText').textContent = bmiItem.statusText;

    let status = document.querySelector('.status');
    let statusInner = document.querySelector('.status-inner')
    calBtn.style.display = 'none';
    status.style.display = 'block';
    //status.setAttribute('class',"status " + `${bmiItem.status}`);
    statusInner.setAttribute('class',"status " + `${bmiItem.status}`);

    clearBtnToggle();
}
//重新輸入資料
function resetData(e){
    e.preventDefault();
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
    localStorage.removeItem('bmiData');
    updateList(bmiData);
    this.style.display = none;
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

updateList(bmiData);
calBtn.addEventListener('click',bmiCalculate,false);
bmiList.addEventListener('click',delItem,false);
reset.addEventListener('click',resetData,false);
clearAllBtn.addEventListener('click',clearAllData,false);