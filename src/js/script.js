let date = new Date();
let playersGame = {
    country: null,
    budget: 1600,
    dateTime: {
        year: date.getFullYear(),
        month: 1,
        monthDay: date.getDate(),
        hour: '20',
        minutes: '00',
        weekDay: 'Mon'
    },
    finances:{
        months:{
            january:{
                id: 1,
                expenses: [],
                income:[]
            },
            february:{
                id: 2,
                expenses: [],
                income:[]
            },
            march:{
                id: 3,
                expenses: [],
                income:[]
            },
            april:{
                id: 4,
                expenses: [],
                income:[]
            },
            may:{
                id: 5,
                expenses: [],
                income:[]
            },
            june:{
                id: 6,
                expenses: [],
                income:[]
            },
            july:{
                id: 7,
                expenses: [],
                income:[]
            },
            august:{
                id: 8,
                expenses: [],
                income:[]
            },
            september:{
                id: 9,
                expenses: [],
                income:[]
            },
            october:{
                id: 10,
                expenses: [],
                income:[]
            },
            november:{
                id: 11,
                expenses: [],
                income:[]
            },
            december:{
                id: 12,
                expenses: [],
                income:[]
            }
        }
    },
    groups:[
        {
            country: 'Poland',
            listOfGroups: [
                {
                    name: 'Mafia Pruszkowska',
                    relations: 50
                },
                {
                    name: 'Grupa Wołomińska',
                    relations: 50
                }
            ]
        },
        {
            country: 'United States of America',
            listOfGroups: [
                {
                    name: 'Bloods',
                    relations: 50
                },
                {
                    name: 'Almighty Vice Lord Nation',
                    relations: 50
                },
                {
                    name: 'Aryan Brotherhood',
                    relations: 50
                },
                {
                    name: 'Satan Disciples',
                    relations: 50
                }
            ]
        },
        {
            country: 'China',
            listOfGroups: [
                {
                    name: 'Sun Yee On',
                    relations: 50
                },
                {
                    name: '14K',
                    relations: 50
                }
            ]
        },
        {
            country: 'Japan',
            listOfGroups: [
                {
                    name: 'Yamaguchi-gumi',
                    relations: 50
                },
                {
                    name: 'Sumiyoshi-kai',
                    relations: 50
                }
            ]
        },
        {
            country: 'Russian Federation',
            listOfGroups: [
                {
                    name: 'Sołncewska brać',
                    relations: 50
                }
            ]
        },
        {
            country: 'Italy',
            listOfGroups: [
                {
                    name: 'Camorra',
                    relations: 50
                },
                {
                    name: "'Ndrangheta",
                    relations: 50
                }
            ]
        },
        {
            country: 'Mexico',
            listOfGroups: [
                {
                    name: 'Kartel z Sinaloa',
                    relations: 50
                }
            ]
        },
        {
            country: 'Colombia',
            listOfGroups: [
                {
                    name: 'Kartel z Medellín',
                    relations: 50
                },
                {
                    name: 'Kartel z Cali',
                    relations: 50
                }
            ]
        },
    ],
    character:{
        name: '',
        surname: '',
        crimeOrganisation: '',
        img: '',
    },
    hiredEmployees:[

    ],
    employeesCounter: 0,
    employees:[

    ],
    relations: [
        {
            name: 'Opinia publiczna',
            value: 50
        },
        {
            name: 'Służby mundurowe',
            value: 50
        },
    ],
    avaiableBusinesses:[
        {
            name: 'Włamanie do mieszkania',
            img: 'burglary',
            avaiable: true,
            skillProfit: ['Doświadczenie', 'Inteligencja'],
            timeToDo: '0.30'
        },
        {
            name: 'Kradzież samochodu',
            img: 'car',
            avaiable: false,
            skillProfit: ['Doświadczenie', 'Inteligencja'],
            timeToDo: '1'
        },
        {
            name: 'Sprzedaż narkotyku',
            img: 'plant',
            avaiable: false,
            skillProfit: ['Doświadczenie', 'Inteligencja', 'Opinia publiczna'],
            timeToDo: '2'
        },
        {
            name: 'Napad na bank',
            img: 'bank',
            avaiable: false,
            skillProfit: ['Doświadczenie', 'Inteligencja', 'Zdol. przywódcze', 'Strzelectwo'],
            timeToDo: '6'
        }
    ],
    gameVars:{
        gameProgress: 1,
    },
    tutorial: {
        finished:false,
        countryChosed: false,
        characterChoosed: false,
        dataTyped: false,
        employeesChecked: false,
        switchedToFinances: false,
        budgetChecked: false,
        employeeHired: false,
        switchedToBusiness: false,
        businessDone: false,
        actionToDo: false,
        switchedToRelations: false
    },
    lastAction:{},
    news: []
};

class Employee{
    constructor(name, surname, age){
        this.name = name;
        this.surname = surname;
        this.age = age;
    }
}

(async function init(){
    if(document.querySelector("#startGame") === null){
        checkSaves();
        hideOrShowMenuInit();
        switchPanels();
        startTutorial();
        countryHovering();
        choosingCountrySetup();
    }
})();

function hideOrShowMenuInit(){
    //Mobile menu handling
    document.querySelector('#mobileMenuBtn').addEventListener('click', e => hideOrShowMenu(e.target));
    document.querySelectorAll('.line').forEach( line => line.addEventListener('click', e => hideOrShowMenu(e.target.parentNode)));
}

function hideOrShowMenu(target){
    if(target.dataset.action === "show"){
        //Show menu
        const lines = document.querySelectorAll('.line');
        target.dataset.action = "hidden";
        
        lines[0].remove();
        lines[1].style.transform = "translate(0px, 10px) rotate(45deg)";
        lines[2].style.transform = "rotate(-45deg)";

        document.querySelector('#rightPanel').style.marginLeft = "-200%";
    }
    else if(target.dataset.action === "hidden"){
        //Hide menu
        const lines = document.querySelectorAll('.line');
        const line1 = document.createElement('div');
        target.dataset.action = "show";
        
        line1.className = "line";
        document.querySelector("#mobileMenuBtn").insertBefore(line1,  lines[1])
        lines[0].style.transform = "translate(0px, 0px) rotate(0deg)";
        lines[1].style.transform = "rotate(0deg)";

        document.querySelector('#rightPanel').style.marginLeft = "0%";
    }

    target.height = "auto";
}

function checkSaves(){
    //Check for user save
    if(localStorage.getItem('save') !== null){
        createPopup('Czy chciałbyś wczytać swój zapis gry? W przeciwnym wypadku utworzysz nową grę, a twój zapis zostanie usunięty', loadSave, removeSave)
    }
    else{
        !mobileCheck() ? infoAboutFullScreen() : null;
    }
}

function loadSave(){
    let savedProgress = JSON.parse(localStorage.getItem('save'));
    playersGame = {};

    for(let savedElem in savedProgress){
        playersGame[savedElem] = savedProgress[savedElem];
    }

    closePopup();
    !mobileCheck() ? infoAboutFullScreen() : null;
}

function removeSave(){
    localStorage.clear();
    closePopup();
    !mobileCheck() ? infoAboutFullScreen() : null;
}

function infoAboutFullScreen(){
    //Check for computer user to ask about opening game in full screen
    createPopup('Gra została zaprojektowana by działała w trybie pełnoekranowym, czy chcesz go uruchomić?', openFullscreen, closePopup)
}

function openFullscreen() {
    let wrapper = document.documentElement; 

    if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
    } 
    else if (wrapper.mozRequestFullScreen) { /* Firefox */
        wrapper.mozRequestFullScreen();
    } 
    else if (wrapper.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        wrapper.webkitRequestFullscreen();
    } 
    else if (wrapper.msRequestFullscreen) { /* IE/Edge */
        wrapper.msRequestFullscreen();
    }

    closePopup();
  }

function switchPanels(){
    document.querySelectorAll('#rightPanel li').forEach( li => li.addEventListener('click', initMenu))
}

function countryHovering(){
    document.querySelectorAll('path').forEach(path => path.addEventListener('mouseover', e => {
        e.target.style.strokeWidth = '3px'
    }));

    document.querySelectorAll('path').forEach(path => path.addEventListener('mouseout', e => {
        e.target.style.strokeWidth = '1px'
    }));
}

function choosingCountrySetup(){
    document.querySelectorAll('path').forEach(path => path.addEventListener('click', e => {
        let triangleCords = {};

        if(document.querySelector('#placeBox') !== null){
            closePlaceBox();  
        }

        createLoadingCountryBox(triangleCords, e);
        getCountryData(e.target.dataset.name, triangleCords)
    }));
}

async function getCountryData(countryName,triangleCords){
    //Fetch user choosed country data
    let fetchedData = await fetch(`https://restcountries.eu/rest/v2/name/${countryName.toLowerCase()}`);
    let countryData = await fetchedData.json();
    
    await createCountryBox(countryData, triangleCords)
}

function mobileCheck() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function createLoadingCountryBox(triangleCords, e){
    //Create country information box
    let box = document.createElement('div');
    box.id = 'placeBox';

    box.innerHTML = 
        `<div id="closePlaceBox">
            <img src='../img/icons/close.png'>
         </div>
         <div id="loadingBox">
            <div id="loading"></div>
         </div>`

    document.body.appendChild(box);

    !mobileCheck() ? renderBox(triangleCords, box, e) : renderBox(triangleCords, box, e, true)

    document.querySelector('#closePlaceBox').addEventListener('click', closePlaceBox);
}

function renderBox(triangleCords, box, e, mobile){
    if (mobile) {
        //For mobile user render different box
        return renderBoxMobile(box)
    }

    //Depending of country position in map render different box
    if (e.clientY > window.innerHeight / 2) {
        renderBoxFromBottom(e, triangleCords, box)
    }
    else {
        renderBoxFromTop(e, box)
    }

}


function renderBoxMobile(box){
    box.style.top = `50%`
    box.style.left = `50%`;
    box.style.transform = "translate(-50%, -50%)"
}

function renderBoxFromTop(e, box){
    box.style.top = `${e.clientY + 35}px`
    box.style.left = `${e.clientX - document.querySelector('#placeBox').offsetWidth / 2}px`;
}

function renderBoxFromBottom(e, triangleCords, box){
    triangleCords.top = '98.5%';
    triangleCords.left = '36%';
    triangleCords.borderWidth = '30px 30px 0 30px';
    triangleCords.borderColor = '#1d1d1d transparent transparent transparent';

    box.style.top = `${e.clientY - (document.querySelector('#placeBox').offsetHeight + 35)}px`
    box.style.left = `${e.clientX - document.querySelector('#placeBox').offsetWidth / 2}px`;
}

function renderBoxFromLeft(e, triangleCords, box){
    triangleCords.top = '42.5%';
    triangleCords.left = '-10%';
    triangleCords.borderWidth = '30px 30px 30px 0';
    triangleCords.borderColor = 'transparent #1d1d1d transparent transparent';

    box.style.top = `${e.clientY - document.querySelector('#placeBox').offsetHeight / 2 }px`
    box.style.left = `${e.clientX + 35}px`;
}

function renderBoxFromRight(e, triangleCords, box){
    triangleCords.top = '42.5%';
    triangleCords.right = '-10%';
    triangleCords.borderWidth = '30px 0 30px 30px';
    triangleCords.borderColor = 'transparent transparent transparent #1d1d1d';

    box.style.top = `${e.clientY - document.querySelector('#placeBox').offsetHeight / 2 }px`
    box.style.left = `${e.clientX - document.querySelector('#placeBox').offsetWidth - 35}px`;
}

function createCountryBox(countryData, triangleCords){
    //Create country information box
    let box = document.querySelector('#placeBox');
    
    playersGame.country = {
        name: countryData[0].name,
        capital: countryData[0].capital,
        population: countryData[0].population,
        area: countryData[0].area
    }

    box.innerHTML = 
        `<div id="closePlaceBox">
            <img src='../img/icons/close.png'>
         </div>
         <div id="triangle"></div>
         <div id="placeName">
            ${countryData[0].name}
         </div>
         <div id="capital" class='placeInformation'>
            <img src='../img/icons/home.png'>
            <div>Stolica: <span>${countryData[0].capital}</span></div>
         </div>
         <div id="population" class='placeInformation'>
            <img src='../img/icons/peopleRed.png'>
            <div>Populacja: <span> ${splitLongText(countryData[0].population.toString())}</span></div>
         </div>
         <div id="area" class='placeInformation'>
            <img src='../img/icons/area.png'>
            <div>Obszar: <span>${splitLongText(countryData[0].area.toString())} km²</span></div>
         </div>`;
         
         //Create arow sticking to the box from specifed cords
         unpackTriangleCords(triangleCords);

        if(playersGame.tutorial.businessDone){
            box.innerHTML += `<div class="mapButton" id="doJobFromMapBtn">Zaplanuj akcje w tym kraju</div>`;

            document.querySelector('#doJobFromMapBtn').addEventListener('click', e => {
                document.querySelector('.mainContainer').innerHTML = '';
                document.querySelector('.mainContainer').id = 'business';
               
                createBusinessBox(document.querySelector('#placeName').textContent);
                document.querySelector('#placeBox').remove();
            })
        }

        if(mobileCheck()){
            //Remove triangle for mobile users
            document.querySelector('#triangle').style.borderWidth = "0";
        }

        !playersGame.tutorial.countryChosed ? renderAddidionalInfo(countryData[0].name) : null;
        document.querySelector('#closePlaceBox').addEventListener('click', closePlaceBox);
}

function unpackTriangleCords(cords){
    //Give created arrow specifed styles
    for(let styling in cords){
        if(cords.hasOwnProperty(styling) && styling !== undefined){
            document.querySelector('#triangle').style[styling] = cords[styling];
        }
    }
}

function renderAddidionalInfo(countryName){
    let avaiableCountry = ['United States of America', 'Mexico', 'Colombia', 'Poland', 'Russian Federation', 'Italy', 'China', 'Japan'];

    avaiableCountry.forEach( country => country === countryName ? renderChooseButton() : null);
}

function renderChooseButton(){
    let box = document.querySelector('#placeBox');

    box.innerHTML += `<div class="mapButton" id="choosePlace">Wybieram to państwo</div>`
    document.querySelector('#choosePlace').addEventListener('click', () => createPopup('Czy napewno chcesz wybrać to państwo?', choosingCountry, closePopup));
}

function closePlaceBox(){
    !playersGame.tutorial.countryChosed ? playersGame.country = null : null;
    document.querySelector('#placeBox') !== null ? document.querySelector('#placeBox').remove() : null;
}

function splitLongText(text){
    let splittedText = '';

    for(let i = 0; i < text.length; i++){
       if(i === 2 || i === 5 || i === 8){
        splittedText += '.';
       }


       splittedText += text[i];
    }
    
    return splittedText
}

function initMenu(e){
    //Handling main menu
    if(e.target.textContent.trim() === 'Mapa'){

        document.querySelector('.mainContainer').innerHTML = '';
        document.querySelector('.mainContainer').id = 'sea';

        createMap();
    }
    if(e.target.textContent.trim() === 'Biuro'){

        if(!playersGame.tutorial.countryChosed){
            return
        }

        document.querySelector('.mainContainer').innerHTML = '';
        document.querySelector('.mainContainer').id = 'office';

        if(mobileCheck()){
            document.querySelector('#office').style.marginLeft = "0%";
            document.querySelector('#office').style.width = "100%";
        }

        createOffice();
    }
    if(e.target.textContent.trim() === 'Pracownicy'){

        if(!playersGame.tutorial.dataTyped){
            return
        }

        document.querySelector('.mainContainer').innerHTML = '';
        document.querySelector('.mainContainer').id = 'employees';

        createEmployees();
    }
    if(e.target.textContent.trim() === 'Finanse'){

        if(!playersGame.tutorial.employeesChecked){
            return
        }

        document.querySelector('.mainContainer').innerHTML = '';
        document.querySelector('.mainContainer').id = 'finances';

        createFinancesBox();
    }
    if(e.target.textContent.trim() === 'Działalności'){

        if(!playersGame.tutorial.employeeHired){
            return
        }

        document.querySelector('.mainContainer').innerHTML = '';
        document.querySelector('.mainContainer').id = 'business';

        createBusinessBox();
    }
    if(e.target.textContent.trim() === 'Relacje'){
        if(!playersGame.tutorial.businessDone){
            return
        }

        if(!playersGame.tutorial.switchedToRelations){
            switchedToRelations();
        }

        document.querySelector('.mainContainer').innerHTML = '';
        document.querySelector('.mainContainer').id = 'relations';

        createRelationsBox();
    }

    menuAnimation(e.target)
}

function menuAnimation(target){
    document.querySelectorAll('#rightPanel li').forEach( li => {
        li.style.opacity = '1';
        li.style.color = '#ffffff';
    });

    target.style.opacity = '0.5';
    target.style.color = '#cccccc';
}

function createOffice(){
    if(!playersGame.tutorial.characterChoosed){
        return switchedToOffice();
    }
    else{
        createOfficeBox();
    }
}

function createRelationsBox(){
    document.querySelector('#relations').innerHTML = 
        `<div id="realtionsTitle">
            <img src='../img/icons/handshake.png'>
            <h1>Stosunki</h1>
        </div>
        <div id="relationsBox">
            <div class="relationsWrap">
                <div>Opinia publiczna:</div>
                <div class="relationBarWrap">
                    <div class="relationsBar" style="width:${playersGame.relations[0].value * 5}px"></div>
                </div>
            </div>
            <div class="relationsWrap">
                <div>Służby mundurowe:</div>
                <div class="relationBarWrap">
                    <div class="relationsBar" style="width:${playersGame.relations[1].value * 5}px"></div>
                </div>
            </div>`

        renderGroupsFromChoosedCountry();
}

function renderGroupsFromChoosedCountry(){
    playersGame.groups.forEach( group => {
            group.listOfGroups.forEach( mafiaGroup => {
                document.querySelector('#relationsBox').innerHTML += 
                `<div class="relationsWrap">
                    <div>${mafiaGroup.name}:</div>
                    <div class="relationBarWrap">
                        <div class="relationsBar" style="width:${group.listOfGroups[0].relations * 5}px"></div>
                    </div>
                 </div>`
            })
    });

    determineRelationColor();
}

function determineRelationColor(){
    document.querySelectorAll('.relationsBar').forEach(bar => {
        if(parseInt(bar.style.width) < 250){
            //Negative relation
            bar.style.backgroundColor = '#ff0000'
        }
        else if(parseInt(bar.style.width) >= 250){
            //Positive relations
            bar.style.backgroundColor = '#009933';
        }
    });
}

function createBusinessBox(choosenCountry){
    document.querySelector('#business').innerHTML = 
        `<div id="availableBusinessTitle">
             <img src='../img/icons/pistol.png'>
             <h1>Dostępne akcje</h1>
         </div>
         <div id="choosenCountryForBusiness">
            Akcja odbędzie się w <span>${choosenCountry !== undefined ? choosenCountry : playersGame.country.name}</span>
         </div>
         <ul id="availableBusinessList"></ul>`

    playersGame.avaiableBusinesses.forEach(business => {
        //Render avaiable businesses
        document.querySelector('#availableBusinessList').innerHTML += 
            `<li class="${checkAvability(business)}">
                <img src='../img/icons/${business.img}Red.png'>
                <div>${business.name}</div>
             </li>`
    });

    document.querySelectorAll('.businessListElem').forEach(btn => btn.addEventListener('click', doBusiness))
    makeOverlayer();
    timeToDoAction();
}

function checkAvability(business){
    if(!business.avaiable){
        return `noAvaiable`
    }
    else{
        return `businessListElem`
    }
}

function doBusiness(e){
    //Render business popup
    const doBusinessPopup = document.createElement('div');
    const overlayer = document.createElement('div');
    let target = e.target;

    doBusinessPopup.id = 'doBusinessPopup';
    overlayer.id = 'overlayer';

    if(e.target.nodeName === 'DIV' || e.target.nodeName === 'IMG'){
        target = e.target.parentNode;
    } 

    if(target.className.includes('noAvaiable')){
        return;
    }
    
    doBusinessPopup.innerHTML = 
        `<div id="closePopup">
            <img src='../img/icons/close.png'>
         </div>
         <div id="businessJobTitle">
            ${target.children[1].textContent}
         </div>
         <div class="businessInfo">
            <img src='../img/icons/dollarRed.png'> Szacunkowy przychód za akcje: <span id="money">${(playersGame.gameVars.gameProgress * burglaryRandomNum(700, 500)).toFixed(2)}$</span>
         </div>
         <div class="businessInfo">
            <img src='../img/icons/failure.png'> Współczynnik niepowodzenia: <span id="percent">${(playersGame.gameVars.gameProgress * burglaryRandomNum(5, 7)).toFixed(2)}%</span>
         </div>
         <div id="chooseEmployeeToJob">Wybierz pracownika, który ma podjąć się tej akcji</div>
         <div id="businessEmployeesCards"></div>
         <div id="changeEmployeeArrowsBox"></div>
         <div class="contrastBtn" id="startAction">
            Rozpocznij akcje
         </div>`

    document.body.append(overlayer, doBusinessPopup);

    document.querySelector('#closePopup').addEventListener('click', () => {
        document.querySelector('#doBusinessPopup').remove();
        document.querySelector('#overlayer').remove();
    });

    document.querySelector('#startAction').addEventListener('click', startAction);

    playersGame.hiredEmployees.length > 0 ? generateBusinessEmployeeCard(playersGame.hiredEmployees[0].id) : noEmployeesForBusiness()
}

function generateBusinessEmployeeCard(idx){
    //Render employees cards
    let searchedEmp;

    playersGame.hiredEmployees.forEach( emp => {
        if(emp.id === idx){
            searchedEmp = emp;
        }
    })

    if(searchedEmp !== undefined){
        document.querySelector('#businessEmployeesCards').innerHTML =
            `<div data-id="${searchedEmp.id}" class="businessEmployeeCard chosen">
                    <img class="businessEmployeeImg" src="../img/icons/employee.png">
                    <div><span>Name:</span> ${searchedEmp.name}</div>
                    <div><span>Surname:</span> ${searchedEmp.surname}</div>
                    <div><span>Age:</span> ${searchedEmp.age}</div>
                </div>`

        if (playersGame.hiredEmployees.length > 1) {
            changeCard();
        }   
    }           
}

function startAction(){
    loadingScreen();
    checkActionResult();
    setTimeout(hideLoadingScreen, randomTime());
}

function checkActionResult(){
    let money = parseInt(document.querySelector('#money').textContent.slice(0, document.querySelector('#money').textContent.length - 1));
    let percent = parseInt(document.querySelector('#percent').textContent.slice(0, document.querySelector('#percent').textContent.length - 1));
    let percentRand = Math.floor(Math.random() * 100);
    let moneyRand = Math.floor(Math.random() * (money - (money - 50))) + money;
    let title = document.querySelector('#businessJobTitle').textContent
    let employee = document.querySelector('.chosen').outerHTML;

    percent = checkEmployeeStats(percent);

    if(percentRand <= percent){
        //FAIL
        document.querySelector('#doBusinessPopup').innerHTML = 
            `<div id="closePopup">
                 <img src='../img/icons/close.png'>
             </div>
             <div id="businessJobTitle">
                 ${title}
             </div>
             ${employee}
             <div class="actionStatus failure">
                <img src='../img/icons/failure.png'>
                Akcja zakończona niepowodzeniem
             </div>
             <div class="businessInfo">
                <img src='../img/icons/dollarRed.png'>
                Stracone pieniądze: <span>${money - moneyRand}$</span>
             </div>`

             playersGame.budget -= money - moneyRand;

        playersGame.lastAction.status = 'failure'
    }
    else{
        //WIN
        document.querySelector('#doBusinessPopup').innerHTML = 
            `<div id="closePopup">
                 <img src='../img/icons/close.png'>
             </div>
             <div id="businessJobTitle">
                 ${title}
             </div>
             ${employee}
             <div class="actionStatus success">
                <img src='../img/icons/sucess.png'>
                Akcja zakończona sukcesem!
             </div>
             <div class="businessInfo">
                <img src='../img/icons/dollarRed.png'>
                Zarobione pieniądze: <span>${moneyRand}$</span>
             </div>`

             playersGame.lastAction.status = 'success'
    }

    playersGame.lastAction.moneyEarned = moneyRand;
    playersGame.lastAction.name = title;

    playersGame.budget += moneyRand;

    document.querySelector('#closePopup').addEventListener('click', () => {
        document.querySelector('#doBusinessPopup').remove();
        document.querySelector('#overlayer').remove();
    });
   
    if(checkTutorialAvability()){
        //Change time after doing business
        playersGame.avaiableBusinesses.forEach(business => {
            if(business.name === title.trim()){
                if(parseInt(business.timeToDo) < 1){
                    let min = parseInt(playersGame.dateTime.minutes);
                    min += parseFloat(business.timeToDo) * 100;
                    playersGame.dateTime.minutes = `${min}`;
                }
                else{
                    let hour = parseInt(playersGame.dateTime.hour);
                    hour += parseInt(business.timeToDo)
                    playersGame.dateTime.hour = `${hour}`;
                }
            }

            renderTimer(document.querySelector('#timer'));
        });
    }
    
    for(let key in playersGame.finances.months){
        //Push to income object new data after doing business
        if(playersGame.finances.months[key].id === playersGame.dateTime.month){
            playersGame.finances.months[key].income.push(
                {
                    name: 'business',
                    businessName: title.trim(),
                    value: moneyRand
                }
            );
        }
    }

    if(checkTutorialAvability()){
        changeRelationsAfterJob();
    }

    businessDone();   
}

function changeRelationsAfterJob(){
    //After doing business check for any change in relations between you and other groups
    let jobCountry = document.querySelector('#choosenCountryForBusiness span').textContent.trim();

    if(playersGame.lastAction.status === 'success'){
        playersGame.groups.forEach(group => {

            if(group.country === jobCountry){
                group.listOfGroups.forEach( mafia => {
                    if(mafia.relations !== 0){
                        mafia.relations -= 10;
                    }
                })
            }
        });
    }
}

function checkEmployeeStats(percent){
    let business = determineBusiness();
    let skillProfit = [];
    
    playersGame.avaiableBusinesses.forEach(business => {
        business.skillProfit.forEach(profitableSkill => skillProfit.push(profitableSkill)); 
    });

    //Calculate success of the action based on employee that was sent to do it by his stats
    playersGame.hiredEmployees.forEach(employee => {
        if(employee.id === parseInt(document.querySelector('.chosen').dataset.id)){
            employee.skills.forEach(skill => {
                if(skillProfit.includes(skill.name)){
                    percent = percent - (skill.value / 100);
                    percent = parseInt(percent.toFixed(2));
                }
            });
        }
    });

    if(percent < 0){
        percent = 0
    }

    return percent
}

function determineBusiness(){
    playersGame.avaiableBusinesses.forEach(business => {
        if(business.name === document.querySelector('#businessJobTitle').textContent.trim()){
            return business
        }
    });
}

function randomTime(){
    return Math.floor(Math.random() * 500);
}

function changeCard(){
    //Change employee card
    if(playersGame.hiredEmployees.length > 1){
        if(document.querySelectorAll('.changeEmployee').length < 2){
            const leftArrow = document.createElement('div');
            const rightArrow = document.createElement('div');
                
            leftArrow.className = `changeEmployee left`;
            rightArrow.className = `changeEmployee right`
    
            document.querySelector('#changeEmployeeArrowsBox').append(leftArrow, rightArrow);
            document.querySelectorAll('.changeEmployee').forEach(arrow => {
                arrow.addEventListener('click', e => changeWorker(e.target.className.split(' ')[1]))
            });
        }
        
        parseInt(document.querySelector('.businessEmployeeCard').dataset.id) === 0 ? document.querySelector('.left').style.opacity = '0.3' : document.querySelector('.left').style.opacity = '1';
        parseInt(document.querySelector('.businessEmployeeCard').dataset.id) === playersGame.hiredEmployees[playersGame.hiredEmployees.length - 1].id ? document.querySelector('.right').style.opacity = '0.3' : document.querySelector('.right').style.opacity = '1';     
    }
    
    document.querySelector('.businessEmployeeCard').className += ' chosen';
    document.querySelector('.businessEmployeeCard').style =
        `-webkit-box-shadow: 0px 0px 14px 1px rgba(255,51,51,1);
         -moz-box-shadow: 0px 0px 14px 1px rgba(255,51,51,1);
         box-shadow: 0px 0px 14px 1px rgba(255,51,51,1);`
}

function changeWorker(direction){
    let id = parseInt(document.querySelector('.businessEmployeeCard').dataset.id);
    let idToCheck = null;
    let block =  checkForChangeBlock(direction)

    if(!block){
        playersGame.hiredEmployees.forEach( emp => {
            if(emp.id === id){
                if(direction === 'left'){
                    let previousId = (playersGame.hiredEmployees.indexOf(emp)) - 1;
                    searchedId = playersGame.hiredEmployees[previousId].id
                }
                else if(direction === 'right'){
                    let nextId = (playersGame.hiredEmployees.indexOf(emp)) + 1;
                    searchedId = playersGame.hiredEmployees[nextId].id
                }
            }
        });
    
        removeCard(document.querySelector('.businessEmployeeCard'))
        generateBusinessEmployeeCard(searchedId);
    }
}

function checkForChangeBlock(direction){
    //Check if current choosed employee is first or the last one
    if(playersGame.hiredEmployees[0].id === parseInt(document.querySelector('.businessEmployeeCard').dataset.id) && direction === 'left'){
        return true;
    }
    else if(playersGame.hiredEmployees[playersGame.hiredEmployees.length - 1].id === parseInt(document.querySelector('.businessEmployeeCard').dataset.id) && direction === 'right'){
        return true;
    }
    else{
        return false;
    }
}

function removeCard(card){
    let width = card.offsetWidth;
    let height = card.offsetHeight;
    let inter = null;

    card.style.width = width;
    card.style.height = height;
    card.innerHTML = "";

    inter = setInterval(() => {
        if(card.style.width <= 0 || card.style.height <= 0){
            clearInterval(inter)
        }
        card.style.width = `${parseInt(card.style.width - 2)}px`
        card.style.height = `${parseInt(card.style.height - 2)}px`
    }, 1000 / 60)
}

function noEmployeesForBusiness(){
    document.querySelector('#businessEmployeesCards').innerHTML =
             `<div class="businessInfo">
                Obecnie nie masz żadnego pracownika, którego mógłbyś wysłać na akcje
            </div>`
}

function burglaryRandomNum(max, min){
    return Math.floor(Math.random() * (max - min)) + min;
}

function createFinancesBox(){
    playersGame.tutorial.switchedToFinances === false ? checkBudget() : null;

    document.querySelector('#finances').innerHTML = 
        `<div id="budget">
            <img src='../img/icons/money.png'>
            <div>Budżet:</div> <div id="actualBudget">$${playersGame.budget}</div>
         </div>
         <div id="chartInfo">Miesięczny dochód:</div>
         <div id="financesChart"></div>
         <div id="financesButtons">
            <div id="income" class="generalBtn">Przychody</div>
            <div id="expenses" class="generalBtn">Wydatki</div>
         </div>`

    playersGame.tutorial.switchedToFinances = true;

    document.querySelector('#income').addEventListener('click', () => showFinancesData(undefined, 'income'));
    document.querySelector('#expenses').addEventListener('click', () => showFinancesData(undefined, 'expenses'));

    createFinancesChart()
}

function showFinancesData(month, financesType){
    let curDate;
    const fincancesArr = [];

    if(month === undefined){
        curDate = new Date();
        curDate = curDate.getMonth();
    }
    else{
        curDate = month;
    }

    if(playersGame.tutorial.finished){
        createFinancesInfoBox(`${financesType}Box`);
        for(let key in playersGame.finances.months){
            if( (curDate + 1) === playersGame.finances.months[key].id ){
                returnFinancesInfo(fincancesArr, playersGame.finances.months[key][financesType]);
            }
        }

        financesType === 'income' ? financesDataBoxContent('Przychody') : financesDataBoxContent('Wydatki');

        if(fincancesArr.length > 0){
            pickIncomeMonthPrep(curDate);
            fincancesArr.forEach(inc => {
                document.querySelector('#incomeInfoWrap').innerHTML += inc;
            });
        }
        else{
            //If there aren't any finances actions
            pickIncomeMonthPrep(curDate);
            document.querySelector('#incomeInfoWrap').innerHTML += `<div id="emptyIncome">Brak</div>`;
        }
        

        document.querySelector('#incomeBtn').addEventListener('click', () => {
            document.querySelector('#overlayer').remove();
            document.querySelector('.finacesBoxInfo').remove();
        });

        document.querySelectorAll('.anotherMonth').forEach(month => month.addEventListener('click', e => {
            showFinancesData(parseInt(e.target.dataset.id), financesType);
        }));
    }
}

function pickIncomeMonthPrep(curDate){
    document.querySelectorAll('.anotherMonth').forEach(month => {
        month.style.opacity = '1';
    });

    pickIncomeMonth(curDate);
}

function pickIncomeMonth(idx){
    document.querySelectorAll('.anotherMonth').forEach(month => {
        month.style.opacity = '1';
    });

    document.querySelectorAll('.anotherMonth').forEach(month => {
         if(parseInt(month.dataset.id) === idx){
             month.style.opacity = '0.4'
         }
    });
}

function financesDataBoxContent(title){
    //Create income or expenses box
    document.querySelector(`${title === 'Przychody' ? '#incomeBox' : '#expensesBox'}`).innerHTML =
        `<div id="incomeInfoWrap">
            <h2>${title}</h2>
        </div>
        <div id="monthList">
            Pozostałe miesiące:
            <ul>
                <li data-id="0" class="anotherMonth">Jan</li>
                <li data-id="1" class="anotherMonth">Fev</li>
                <li data-id="2" class="anotherMonth">Mar</li>
                <li data-id="3" class="anotherMonth">Apr</li>
                <li data-id="4" class="anotherMonth">May</li>
                <li data-id="5" class="anotherMonth">Jun</li>
                <li data-id="6" class="anotherMonth">Jul</li>
                <li data-id="7" class="anotherMonth">Aug</li>
                <li data-id="8" class="anotherMonth">Sep</li>
                <li data-id="9" class="anotherMonth">Oct</li>
                <li data-id="10" class="anotherMonth">Nov</li>
                <li data-id="11" class="anotherMonth">Dec</li>
            </ul>
        </div>
        <div id="buttonsBox">
            <div id="incomeBtn" class="contrastBtn">Ok</div>
        </div> `
}

function returnFinancesInfo(arr, months){
    //Show result of previously done businesses
    months.forEach(inc => {
        arr.push(
            `<div class="businessName">${inc.businessName}:<span class="businessVal">${inc.value}$</span></div>`
        )
    });
}

function showExpenses(){
    createFinancesInfoBox('expensesBox');
}

function createFinancesInfoBox(boxID){
    if(document.querySelector('#incomeBox') !== null || document.querySelector('#expensesBox') !== null){
        return;
    }

    const box = document.createElement('div');
    const overlayer = document.createElement('div');

    box.id = boxID;
    overlayer.id = 'overlayer';

    box.className = 'finacesBoxInfo'
    document.body.append(overlayer, box);
}

function createFinancesChart(){
    const chart = document.createElement('div');
    const dataNumbers = document.createElement('div');
    const dataMonths = document.createElement('div');
    let monthNum = 1;

    chart.id = 'chart';
    dataNumbers.id = 'dataNumbers';

    for(let i = 0; i <= 10; i++){
        const div = document.createElement('div');

        div.className = 'dataNumber';

        dataNumbers.appendChild(div);
        switch(i){
            case 0:
                div.textContent = '$100 mld'
                break;
            case 1:
                div.textContent = '$10 mld'
                break;
            case 2:
                div.textContent = '$1 mld'
                break;
            case 3:
                div.textContent = '$500 mln'
                break;
            case 4:
                div.textContent = '$100 mln'
                break;
            case 5:
                div.textContent = '$10 mln'
                break;
            case 6:
                div.textContent = '$1 mln'
                break;
            case 7:
                div.textContent = '$100 000'
                break;
            case 8:
                div.textContent = '$10 000'
                break;
            case 9:
                div.textContent = '$1000'
                break;
            case 10:
                div.textContent = '$0'
                break;
        }
    }

    for (let month in playersGame.finances.months) {
        chart.innerHTML += 
            `<div class="chartRect" style="height:${calculateProfit(playersGame.finances.months[month])}">${monthNum++}</div>`
    }

    document.querySelector('#financesChart').append(dataNumbers, chart);
}

function calculateProfit(month){
    let income = month.income;
    let expenses = month.expenses;
    let totalIncome = 0;
    let totalExpanses = 0;
    let profit = 0;

    if(income.length > 0){
        income.forEach( incomeVal => totalIncome += parseInt(incomeVal.value));
    }
    
    if(expenses.length > 0){
        expenses.forEach( expanseVal => totalExpanses += parseInt(expanseVal.value));
    }

    profit = totalIncome - totalExpanses;

    if(profit < 1){
        profit = 0;
    }

    return `${profit / 53}px`;
}

function closePopup(){
    document.querySelector('#popup').remove();
    document.querySelector('#overlayer').remove();
}

function createPopup(question, yesFnc, noFnc){
    const popup = document.createElement('div');
    const overlayer = document.createElement('div');

    overlayer.id = 'overlayer';
    popup.id = 'popup'
    popup.innerHTML = 
        `<h2>${question}</h2>
         <div id="buttonsBox">
            <div id="yesBtn" class="popupBtn">Tak</div>
            <div id="noBtn" class="popupBtn">Nie</div>
         </div>`
    document.body.append(overlayer, popup);

    document.querySelector('#yesBtn').addEventListener('click', yesFnc);
    document.querySelector('#noBtn').addEventListener('click', noFnc);
}

async function getPhotos(){
    //Fetch photos
    loadingScreen();
    let result = await fetch('https://randomuser.me/api/?gender=male&results=750');
    let photos = await result.json();
    let photosSet = new Set(); 

    await photos.results.forEach(person => {
        if(photosSet.size <= 23){
            photosSet.add(person.picture.large)
        }
    });

    await showPhotos(Array.from(photosSet));
}

function loadingScreen(){
    const loadingScreen = document.createElement('div');
    const ball = document.createElement('div');

    loadingScreen.appendChild(ball);
    loadingScreen.id = 'loadingScreen';
    ball.className = 'ball';

    document.body.appendChild(loadingScreen);
}

function hideLoadingScreen(){
    if(document.querySelector('#loadingScreen') !== null){
        const opac = 1;
        const disappear = setInterval( () => {
            document.querySelector('#loadingScreen').style.opacity = opac - 0.333
            document.querySelector('#loadingScreen').style.animation = '';
        }, 200);
    
        setTimeout( () => {
            clearInterval(disappear);
            if(document.querySelector('#loadingScreen') !== null){
                document.querySelector('#loadingScreen').remove();
            }
        }, 300);
    }
}

function showPhotos(photos){
    document.querySelector('#office').innerHTML = 
        `<div class="generalBtn" id="generateMore">
             <div><img src='../img/icons/img.png'></div>
             <div>Wygeneruj więcej zdjęć</div>
         </div>
         <div id="imageBox"></div>`;

    photos.forEach( photo => {
        const photoBox = document.createElement('div');
        photoBox.innerHTML = `<img class="person" src='${photo}'>`;
        document.querySelector('#imageBox').appendChild(photoBox);
    });

    document.querySelector('#generateMore').addEventListener('click', getPhotos);
    document.querySelector('#generateMore').addEventListener('mouseover', changeImageColorBlack);
    document.querySelector('#generateMore').addEventListener('mouseout', changeImageColorRed);    
    document.querySelectorAll('.person').forEach( person => person.addEventListener('click', choosePerson)); 

    hideLoadingScreen();
}

function changeImageColorBlack(e){
    let target;

    if(e.target.nodeName === 'IMG'){
        target = e.target.parentNode.parentNode;
    }
    else{
        if(e.target.className !== 'generalBtn'){
            target = e.target.parentNode;
        }
        else{
            target = e.target;
        }
    }

    target.children[0].children[0].src = target.children[0].children[0].src.slice(0, -4) + 'Black.png';
}

function changeImageColorRed(e){
    let target;

    if(e.target.nodeName === 'IMG'){
        target = e.target.parentNode.parentNode;
    }
    else{
        if(e.target.className !== 'generalBtn'){
            target = e.target.parentNode;
        }
        else{
            target = e.target;
        }
    }

    target.children[0].children[0].src = target.children[0].children[0].src.replace('Black', '');
}

function choosePerson(e){
    playersGame.character.img = e.target.src;

    createOfficeBox();
    choosePersonTutorial();

    playersGame.tutorial.characterChoosed = true;

    document.querySelectorAll('.personalData').forEach( input => input.addEventListener('blur', personalDataBlur));
    document.querySelectorAll('.personalData').forEach( input => input.addEventListener('focus', personalDataFocus));
    document.querySelector('#finishCreatingCharacter').addEventListener('click', createPlayersData)
}

function createOfficeBox(){
    document.querySelector('#office').innerHTML = 
        `<div id="playerCharacter">
            <div id="playersImage">
                <img src='${playersGame.character.img}'>
            </div>
            <div id="playerData">
                <input class="personalData" id="playerName" type="text" placeholder="Imię">
                <input class="personalData" id="playerSurname" type="text" placeholder="Nazwisko">
            </div>
            <input class="personalData" id="companyName" type="text" placeholder="Nazwij swoją grupę przestępczą">
            <div class="contrastBtn" id="finishCreatingCharacter">Stwórz postać</div>
        </div>`

    if(playersGame.tutorial.characterChoosed){
        document.querySelector('#finishCreatingCharacter').remove();

        document.querySelector('#playerName').value = playersGame.character.name;
        document.querySelector('#playerSurname').value = playersGame.character.surname;
        document.querySelector('#companyName').value = playersGame.character.crimeOrganisation;

        document.querySelectorAll('.personalData').forEach( input => {
            personalDataBlur(null, input);
            input.removeEventListener('blur', personalDataBlur);
            input.removeEventListener('focus', personalDataFocus);
        });

        createCheckNewsBtn();
    }
}

function createCheckNewsBtn(){
    const btn = document.createElement('div');

    btn.id = 'checkNews';
    btn.className = 'contrastBtn';
    btn.textContent = 'Sprawdź wiadomości'

    document.querySelector('#office').appendChild(btn);
    btn.addEventListener('click', checkNews);
}

function checkNews(){
    if(playersGame.news.length === 0){
        if(!playersGame.lastAction.hasOwnProperty('name')){
            noNews();
        }
        else{
            renderNews();
        }
    }
}

function renderNews(){
    const newsBox = document.createElement('div');
    const overlayer = document.createElement('div');
    
    overlayer.id = 'overlayer';
    newsBox.id = 'newsBox';
    newsBox.innerHTML = 
        `<div id="newsTitle"><h2>${getNewsTitle()}</h2></div>
            <img src='${getRenderImages()}'>
            <div id="newsContent"><p>${getNewsContent()}</p></div>
         </div>
         <div id="newsBtn" class="contrastBtn">Ok</div>`
    
    document.body.append(overlayer, newsBox);
    document.querySelector('#newsBtn').addEventListener('click', newsRed);
}

function newsRed(){
    let newNews = [];
    document.querySelector('#overlayer').remove();
    document.querySelector('#newsBox').remove();

    for(let i = 1; i < playersGame.news.length; i++){
        newNews.push(playersGame.news[i])
    }

    while(playersGame.news.length > 0){
        playersGame.news.pop();
    }

    newNews.forEach(news => playersGame.news.push(news));
    playersGame.lastAction = {};
}

function getRenderImages(){
    if(playersGame.lastAction.name.trim() === "Włamanie do mieszkania"){
        return '../img/images/apartment.jpg'
    }
    else if(playersGame.lastAction.name.trim() === "Kradzież samochodu"){
        return '../img/images/car.jpg'
    }
    else if(playersGame.lastAction.name.trim() === "Sprzedaż narkotyku"){
        return '../img/images/drug.jpg'
    }
    else if(playersGame.lastAction.name.trim() === "Napad na bank"){
        return '../img/images/bank.jpg'
    }
}

function getNewsTitle(){
    if(playersGame.lastAction.name.trim() === "Włamanie do mieszkania"){
        if(playersGame.lastAction.status === 'success'){
            return "Zeszłej nocy doszło do włamania"
        }
        else{
            return "Zeszłej nocy doszło do próby włamania"
        }
    }
    else if(playersGame.lastAction.name.trim() === "Kradzież samochodu"){
        if(playersGame.lastAction.status === 'success'){
            return "Zeszłej nocy dokonano kradzieży luksusowego samochodu"
        }
        else{
            return "Zeszłej nocy doszło do próby kradzieży luksusowego samochodu"
        }
    }
    else if(playersGame.lastAction.name.trim() === "Sprzedaż narkotyku"){
        if(playersGame.lastAction.status === 'success'){
            return "Handel narkotykami kwitnie w najlepsze"
        }
        else{
            return "Handel narkotyków przerwany nalotem policji"
        }
    }
    else if(playersGame.lastAction.name.trim() === "Napad na bank"){
        if(playersGame.lastAction.status === 'success'){
            return "Wczorajszego wieczora dokonanu napadu na bank"
        }
        else{
            return "Wczorajszego wieczora doszło do próby napadu na bank"
        }
    }    
}

function getNewsContent(){
    if(playersGame.lastAction.name.trim() === "Włamanie do mieszkania"){
        if(playersGame.lastAction.status === 'success'){
            return `Nieznany sprawca włamał się do mieszkania pod nieobecność domowników oraz dokonał rabunku, skradzione zostały głównie pieniądze w gotówce ale także biżuteria. Zrabowane przedmioty zostały wycenione na około ${playersGame.lastAction.moneyEarned}$`;
        }
        else{
            return `Włamywacz został zauważony przy próbie otwarcie zamku drzwi wytrychem. Natychmiast zbiegł z miejsca zdarzenia. Trwają poszukiwania.`
        }
    } 
    else if(playersGame.lastAction.name.trim() === "Kradzież samochodu"){
        if(playersGame.lastAction.status === 'success'){
            return `Nieznany sprawca ukradł luksusowy samochód sportowy. Sprawca nie został uchwycony na kamerach, trwają poszukiwania. Wartość skradzionego samochodu szacowana jest na ${playersGame.lastAction.moneyEarned}$`;
        }
        else{
            return `Złodziej samochodowy został przyłapany na gorącym uczynku przez właściciela luksusowego samochodu. Sprawca zamieszanie zbiegł z miejsca zdarzenia, trwają poszukiwania.`
        }
    }
    else if(playersGame.lastAction.name.trim() === "Sprzedaż narkotyku"){
        if(playersGame.lastAction.status === 'success'){
            return `Handel narkotykami w ${playersGame.country} kwitnie w najlepsze. Mówi się, że dziennie w ten sposób przepływają miliony dolarów. Na jednej takiej transkacji pośrednik może zarobić ${playersGame.lastAction.moneyEarned}$`;
        }
        else{
            return `Wczorajszego dnia policja po otrzymaniu informacji podjeła się interwencji wskazane miejsce przez informatora. Ten nie mylil się i w ciemnej uliczce dochodziło do handlu na grube tysiące dolarów policja udaremniła transkacje, niestety sprawcym udało się zbiec.`
        }
    }  
    else if(playersGame.lastAction.name.trim() === "Napad na bank"){
        if(playersGame.lastAction.status === 'success'){
            return `Wczoraj zorganizowana grupa dokonała napadu na bank centralnych. Uzbrojeni przestępcy zterroryzowali ochrone, zaś jeden przedostał się do skarbca. Zrabowano blisko ${playersGame.lastAction.moneyEarned}$`;
        }
        else{
            return `Wczoraj zorganizowana grupa dokonała próby napadu na bank centralnych. Wszystko by im się pewnie udało gdyby nie heroiczna postawa jednego z ochroniarzy, który obzewładniając pilnującego uzbrojonego przestępce zadzwonił po policje. Szybka interwencja jednostki specjalniej doprowadziła do przerwania napadu niestety nikogo nie udało się aresztować, przestępcy uciekli.`
        }
    } 
}

function noNews(){
    const popup = document.createElement('div');
    const overlayer = document.createElement('div');

    overlayer.id = 'overlayer';
    popup.id = 'popup'

    popup.innerHTML = 
        `<h2>Na chwile obecną nie ma żadnych nowych wiadomości</h2>
         <div id="buttonsBox">
            <div id="yesBtn" class="popupBtn">Ok</div>
         </div>`

    document.body.append(overlayer, popup);

    document.querySelector('#yesBtn').addEventListener('click', closePopup);
}

function personalDataBlur(e, again){
    if (e !== null) {
        if (e.target.value !== "") {
            if (again === undefined) {
                e.target.readOnly = true;
                e.target.style.background = 'transparent';
                e.target.style.color = '#ff3333';
                e.target.style.border = '2px solid #ff3333';
            }
            else {
                again.readOnly = true;
                again.style.background = 'transparent';
                again.style.color = '#ff3333';
                again.style.border = '2px solid #ff3333';
            }
        }
    }

}

function personalDataFocus(e){
    e.target.readOnly = false;
    e.target.style.background = '#fff';
    e.target.style.borderRadius = '50px';
    e.target.border = 'none'; 
}

function createPlayersData(){
    //Generate random person data
    if(document.querySelector('#playerName').value === '' || document.querySelector('#playerSurname').value === '' || document.querySelector('#companyName').value === ''){
        createPopup('Czy napewno chcesz aby dane zostały wylosowane?', generateData, closePopup)
    }
    else{
        getPlayersData()
        hireEmployees();
    }
}

function getPlayersData(){
    playersGame.character.name = document.querySelector('#playerName').value;
    playersGame.character.surname = document.querySelector('#playerSurname').value;
    playersGame.character.crimeOrganisation = document.querySelector('#companyName').value;
}

async function generateData(){
    loadingScreen();
    let result = await fetch('https://randomuser.me/api/?gender=male&results=1');
    let person = await result.json();

    await fillData();

    function fillData() {
        document.querySelector('#playerName').value = person.results[0].name.first[0].toUpperCase() + person.results[0].name.first.slice(1, );
        document.querySelector('#playerSurname').value = person.results[0].name.last[0].toUpperCase() + person.results[0].name.last.slice(1, );
        document.querySelector('#companyName').value = randomOrganisationNames();

        document.querySelector('#playerName').setAttribute('readonly', 'readonly');
        document.querySelector('#playerSurname').setAttribute('readonly', 'readonly');
        document.querySelector('#companyName').setAttribute('readonly', 'readonly');

        document.querySelector('#playerName').style = "background: transparent; border-radius: 50px; color: rgb(255, 51, 51); border: 2px solid rgb(255, 51, 51)";
        document.querySelector('#playerSurname').style = "background: transparent; border-radius: 50px; color: rgb(255, 51, 51); border: 2px solid rgb(255, 51, 51)";
        document.querySelector('#companyName').style = "background: transparent; border-radius: 50px; color: rgb(255, 51, 51); border: 2px solid rgb(255, 51, 51)";
        
        getPlayersData();
        hireEmployees();
        hideLoadingScreen();
    }
}

function randomOrganisationNames(){
    let names = [
        'Killers',
        'The twin brothers',
        'The silent',
        'Strength of revenge',
        'Honor',
        'Bringing justice',
        'Order of killers'
    ];
    let random = Math.floor(Math.random() * names.length);

    return names[random];
}

function hireEmployees(){
    if(document.querySelector('#popup') !== null){
        document.querySelector('#popup').remove();
        document.querySelector('#overlayer').remove();
    }

    document.querySelector('#finishCreatingCharacter').remove();

    document.querySelectorAll('.personalData').forEach( input => {
        personalDataBlur(null, input);
        input.removeEventListener('blur', personalDataBlur);
        input.removeEventListener('focus', personalDataFocus);
    });
    
    return hireEmployeesTutorial();
}

function createEmployees(){
    if(playersGame.hiredEmployees.length === 0 && playersGame.employees.length === 0){
        //If you don't have hired or fetched employees
        document.querySelector('#employees').innerHTML = 
            `<div id="mainBox">
                <h2>Nie posiadasz żadnych pracowników</h2>
                <div class="generalBtn" id="hireEmployees">Zatrudnij nowych prawcowników</div>
             </div>`;

        document.querySelector('#hireEmployees').addEventListener('click', () => hireNewEmployees(3))
    }  
    else if(playersGame.hiredEmployees.length === 0 && playersGame.employees.length > 0){
        //If you don't have hired employees but have you have fetched some already
        document.querySelector('#employees').innerHTML = 
            `<div id="mainBox">
                <div id="employeeBox"></div>
             </div>`;

        generateEmployeeCards(playersGame.employees)
    }
    else{
        //You have some hired employees
        generateEmployeeBox();
    } 
}

function generateEmployeeBox(){
    document.querySelector('#employees').innerHTML = 
        `<div id="employeeBoxTitle">
            <img src='../img/icons/people.png'>
            <h1>Twoi pracownicy</h1>
         </div>
         <div id="listOfEmployees"></div>
         <div id="hireBtnWrapp">
            <div class="generalBtn" id="hireEmployees">Zatrudnij nowych prawcowników</div>
         </div>`

    document.querySelector('#employees').style.flexDirection = 'column';

    document.querySelector('#hireEmployees').addEventListener('click', () => {
        document.querySelector('#employees').innerHTML = 
            `<div id="mainBox">
                <div id="employeeBox"></div>
             </div>`;
        hireNewEmployees(1, true)
    });


    generateMiniatureEmployeeCards();

    if(mobileCheck()){
        document.querySelector('.employeeCard').style.marginTop = "0%";
    }
}

function generateMiniatureEmployeeCards(){
    let numberOfCards = 0;
    let flag = true;
 
    for(let i = 0; i < playersGame.hiredEmployees.length; i++){
        if(numberOfCards >= 3){
            flag = false;
        }
        numberOfCards++;

        if(flag){
            generateNewCard(playersGame.hiredEmployees[i]);
            findOutMore();
        }
    }

    let cards = document.querySelectorAll('.employeeCard');

    if(cards.length === 2){
        if(mobileCheck()){
            document.querySelector('#listOfEmployees').style.width = "100%";
           document.querySelector("#employees").style.height = "auto";
           document.querySelector("#employeeBoxTitle").style.marginTop = "100%";
        }
    }

    if(cards.length === 3){
        if(mobileCheck()){
            document.querySelector('#listOfEmployees').style.width = "100%";
            document.querySelector("#employees").style.height = "auto";
            document.querySelector("#employeeBoxTitle").style.marginTop = "170%";
        }

        cards[0].style.transform = 'scale(0.7)';
        cards[cards.length - 1].style.transform = 'scale(0.7)';
        cards[0].style.marginLeft = '0';
        cards[cards.length - 1].style.marginLeft = '0';

        removeFindOutMoreBtn();
        giveCenterFindOutMoreBtn();
        findOutMore();
    }

    if(playersGame.hiredEmployees.length >= 4){
        createArrows(['right']);
        checkForRemoveArrows();
    }
}

function changeEmployeeCard(direction){
    const employeeCards = document.querySelectorAll('.employeeCard');
    const lastEmployee = employeeCards[2];
    const firstEmployee = employeeCards[0];
    const centerEmployee = employeeCards[1];

    if(direction === 'left'){
        let block = checkForBlock(firstEmployee, direction);

        if(block){
            return;
        }
    
        playersGame.hiredEmployees.forEach( emp => {
            if(firstEmployee.children[1].textContent.trim().includes(emp.name)){
                if(firstEmployee.children[2].textContent.trim().includes(emp.surname)){
                    lastEmployee.remove();
                    
                    generateNewCard(playersGame.hiredEmployees[playersGame.hiredEmployees.indexOf(emp) - 1], true);

                    document.querySelectorAll('.employeeCard')[2].style.transform = "scale(0.7)"
                    document.querySelectorAll('.employeeCard')[0].style.transform = "scale(0.7)"
                    document.querySelectorAll('.employeeCard')[1].style = "";
                }
            }
        });
    }
    else if(direction === 'right'){
        let block = checkForBlock(lastEmployee, direction);

        if(block){
            return;
        }

        playersGame.hiredEmployees.forEach( emp => {
            if(lastEmployee.children[1].textContent.trim().includes(emp.name)){
                if(lastEmployee.children[2].textContent.trim().includes(emp.surname)){
                    firstEmployee.remove();
                    generateNewCard(playersGame.hiredEmployees[playersGame.hiredEmployees.indexOf(emp) + 1]);

                    document.querySelectorAll('.employeeCard')[2].style.transform = "scale(0.7)"
                    document.querySelectorAll('.employeeCard')[0].style.transform = "scale(0.7)"
                    document.querySelectorAll('.employeeCard')[1].style = "";
                }
            }
        });
    }

    giveCenterFindOutMoreBtn();
    checkForRemoveArrows();
    findOutMore();
}

function giveCenterFindOutMoreBtn(){
    document.querySelectorAll('.employeeCard').forEach(card => {
        if(card.children[card.children.length - 1].className !== "employeeViewMore"){
            card.innerHTML += '<div class="employeeViewMore">Dowiedz się więcej</div>'
        }        
    });
}

function findOutMore(){
    document.querySelectorAll('.employeeViewMore').forEach( vieMore => vieMore.addEventListener('click', e => {
        playersGame.hiredEmployees.forEach( emp => {
            if(emp.id === parseInt(e.target.parentNode.dataset.id)){
                let age, name, surname, salary, skills;
                age = emp.age;
                name = emp.name;
                surname = emp.surname;
                salary = emp.salary;
                skills = emp.skills;

                employeeViewMore( e.target.parentNode.dataset.id, age, name, surname, salary, skills, true);
            }
        });
    }));
}

function removeFindOutMoreBtn(){
    document.querySelectorAll('.employeeViewMore').forEach( btn => btn.remove());
}

function checkForRemoveArrows(){
    //Check if the employee that is showed is the first one or the last one if so remove the proper arrows
    playersGame.hiredEmployees.forEach( emp => {
        if(document.querySelectorAll('.employeeCard')[2].children[1].textContent.trim().includes(emp.name)){
            if(document.querySelectorAll('.employeeCard')[2].children[2].textContent.trim().includes(emp.surname)){
                if( (playersGame.hiredEmployees.indexOf(emp) + 1) === playersGame.hiredEmployees.length){
                    document.querySelector('#rightArrow') !== null ? document.querySelector('#rightArrow').remove() : null;
                }
                else{
                    createArrows(['right']);
                }
            }
        }
        if(document.querySelectorAll('.employeeCard')[0].children[1].textContent.trim().includes(emp.name)){
            if(document.querySelectorAll('.employeeCard')[0].children[2].textContent.trim().includes(emp.surname)){
                if( playersGame.hiredEmployees.indexOf(emp) === 0 ){
                    document.querySelector('#leftArrow') !== null ? document.querySelector('#leftArrow').remove() : null;
                }
                else{
                    createArrows(['left']);
                }
            }
        }
    });
}

function createArrows(arrows){
    arrows.forEach( arrow => {
        const arrowDiv = document.createElement('div');
        arrowDiv.id = `${arrow}Arrow`;

        document.querySelector('#employees').appendChild(arrowDiv);
        document.querySelector(`#${arrow}Arrow`).innerHTML = '<img src="../img/icons/arrow.png">';

        arrowDiv.addEventListener('click', () => changeEmployeeCard(arrow));
    });
}

function generateNewCard(emp, atStart){
    let card = document.createElement('div');
    
    card.className = 'employeeCard';
    card.dataset.id = emp.id;
    card.innerHTML = 
                    `<img class="employeeImg" src="../img/icons/employee.png">
                    <div><span>Name:</span> ${emp.name}</div>
                    <div><span>Surname:</span> ${emp.surname}</div>
                    <div><span>Age:</span> ${emp.age}</div>
                    <div><span>Salary:</span> ${emp.salary}</div>
                    <div class="employeeViewMore">Dowiedz się więcej</div>`

    if(atStart !== undefined){
        document.querySelector('#listOfEmployees').insertBefore(card, document.querySelector('.employeeCard'));
    }
    else{
        document.querySelector('#listOfEmployees').appendChild(card);
    }
}

function checkForBlock(card, direction){
    //Function check for stop changing card when you get to the point where one of showed employees are first or the last one
    let searchedFor = null;

    playersGame.hiredEmployees.forEach( emp => {
        if(card.children[1].textContent.trim().includes(emp.name)){
            if(card.children[2].textContent.trim().includes(emp.surname)){
                searchedFor = emp;
            }
        }
    });

    if(direction === 'left'){
       if(playersGame.hiredEmployees.indexOf(searchedFor) === 0){
            return true;
       }
       else{
           return false;
       }
    }
    else if(direction === 'right'){
        if( (playersGame.hiredEmployees.indexOf(searchedFor) + 1) === playersGame.hiredEmployees.length){
            return true;
       }
       else{
           return false;
       }
    }
}

async function hireNewEmployees(howMany, alreadyFetched) {
    loadingScreen();
    let result;
    let people;

    document.querySelector('#mainBox').innerHTML =
        `<div id="employeeBox"></div>`;

    if (alreadyFetched === undefined) {
        result = await fetch(`https://randomuser.me/api/?gender=male&results=${howMany}`);
        people = await result.json();
    }
    else {
        result = await fetch(`https://randomuser.me/api/?gender=male&results=${howMany}`);
        people = await result.json();

        for (let i = 0; i < playersGame.employees.length; i++) {
            for (let j = 0; j < playersGame.hiredEmployees.length; j++) {
                if (playersGame.employees[i].id !== playersGame.hiredEmployees[j].id) {
                    people.results.push(
                        {
                            name: {
                                first: playersGame.employees[i].name,
                                last: playersGame.employees[i].surname
                            },
                            dob: {
                                age: playersGame.employees[i].age
                            }
                        }
                        
                    )
                }
            }
        }
    }

    await generateNewEmployeeCards(people);
}

function generateNewEmployeeCards(people){
    hideLoadingScreen();

    people.results.forEach(person => {
        let double = checkDoubledEmployees(person);
        let salary = getRandomSalary();

        if (!double) {
            playersGame.employees.push(
                {
                    id: playersGame.employeesCounter,
                    name: `${person.name.first[0].toUpperCase()}${person.name.first.slice(1)}`,
                    surname: `${person.name.last[0].toUpperCase()}${person.name.last.slice(1)}`,
                    age: person.dob.age,
                    salary: salary,
                    skills: [
                        {
                            name: 'Doświadczenie',
                            value: getRandomWidth()
                        },
                        {
                            name: 'Strzelectwo',
                            value: getRandomWidth()
                        },
                        {
                            name: 'Opinia publiczna',
                            value: getRandomWidth()
                        },
                        {
                            name: 'Zdol. przywódcze',
                            value: getRandomWidth()
                        },
                        {
                            name: 'Inteligencja',
                            value: getRandomWidth()
                        },
                        {
                            name: 'Lojalność',
                            value: getRandomWidth()
                        }
                    ]
                });

                playersGame.employeesCounter++;
        }

    });

    playersGame.tutorial.employeesChecked = true;
    generateEmployeeCards(playersGame.employees)
}

function checkDoubledEmployees(person){
    let doubleStatus = false;

    playersGame.employees.forEach( employee => {
        if(employee.name === `${person.name.first[0].toUpperCase()}${person.name.first.slice(1, )}`){
            if(employee.surname === `${person.name.last[0].toUpperCase()}${person.name.last.slice(1, )}`){
                if(employee.age === person.dob.age){
                    doubleStatus = true;
                }
            }
        }
    });

    return doubleStatus
}

function generateEmployeeCards(employees){
    let hiredEmployees = [];
    playersGame.hiredEmployees.forEach( hired => hiredEmployees.push(hired));

    hideLoadingScreen();

    employees.forEach( employee => {
        let renderFlag = true;

        hiredEmployees.forEach( hiredEmp => {
            if(employee.id === hiredEmp.id){
                renderFlag = false;
            }
        });

        if(renderFlag){
            document.querySelector('#employeeBox').innerHTML += 
            `<div data-id="${employee.id}" class="employeeCard">
                <img class="employeeImg" src='../img/icons/employee.png'>
                <div>Name: <span>${employee.name}</span></div>
                <div>Surname: <span>${employee.surname}</span></div>
                <div>Age: <span>${employee.age}</span></div>
                <div>Salary: <span>${employee.salary}</span></div>
                <div class="employeeViewMore">Dowiedz się więcej</div>
                <div class="employeesButtons">
                    <div class="contrastBtn hireThis">Zatrudnij</div>
                    <div class="contrastBtn cancelThis">Odrzuć</div>
                </div>
             </div>`
        }
    });

    if(playersGame.tutorial.budgetChecked === true){
        document.querySelectorAll('.employeeViewMore').forEach( vieMore => vieMore.addEventListener('click', e => {
            let age = playersGame.employees[parseInt(e.target.parentNode.dataset.id)].age;
            let name = playersGame.employees[parseInt(e.target.parentNode.dataset.id)].name;
            let surname = playersGame.employees[parseInt(e.target.parentNode.dataset.id)].surname;
            let salary = playersGame.employees[parseInt(e.target.parentNode.dataset.id)].salary;
            let skills = playersGame.employees[parseInt(e.target.parentNode.dataset.id)].skills;
          
            employeeViewMore( e.target.parentNode.dataset.id, age, name, surname, salary, skills, false);

        }));

        addEventsToEmployeeBtn();
     }

     mustCheckFinances();
}

async function cancelEmployee(e){
    //Remove employee that was canceled and fetched a new one
    playersGame.employees = playersGame.employees.filter(employee => {
        if(employee.id !== parseInt(e.target.parentNode.parentNode.dataset.id)){
            return employee
        }
    });

    await hireNewEmployees(1);
    await fixEmployeesId();
    await addEventsToEmployeeBtn();
}

function addEventsToEmployeeBtn(){
    document.querySelectorAll('.hireThis').forEach(hireBtn => hireBtn.addEventListener('click', hireEmployee));
    document.querySelectorAll('.cancelThis').forEach(cancelBtn => cancelBtn.addEventListener('click', cancelEmployee));
}

function fixEmployeesId(){
    let counter = 0;
   
    playersGame.employees.forEach(employee => {
        if(document.querySelector(`.employeeCard[data-id="${employee.id}"]`) !== null){
            document.querySelector(`.employeeCard[data-id="${employee.id}"]`).dataset.id = counter;
        }
        employee.id = counter;
        counter++;
    });
}

function employeeViewMore(idx, age, name, surname, salary, skills, hired){
    const popup = document.createElement('div');
    const overlayer = document.createElement('div');

    popup.id = 'employeePopup';
    overlayer.id = 'overlayer';
    popup.dataset.id = idx;

    popup.innerHTML = 
        `<img class="employeeImg" src='../img/icons/employee.png'>
         <div class="employeeRow">
            <div class="employeeDataWrap">
                Imię: 
                <div class="employeePersonal"><span>${name}</span></div>
            </div>
            <div class="employeeDataWrap">
                Nazwisko:
                <div class="employeePersonal"><span>${surname}</span></div>
            </div>
         </div>
         <div class="employeeRow">
            <div class="employeeDataWrap">
                Wiek: 
                <div class="employeePersonal"><span>${age}</span></div>
            </div>
            <div class="employeeDataWrap">
                Żądania finansowe:
                <div class="employeePersonal"><span>${salary}</span></div>
            </div>
         </div>
         <div id="employeeSkills">
            <div class="employeeRow">
                <div class="skill">
                    <div class="skillInfo">Doświadczenie</div>
                    <div class="skillBar">
                        <div class="progressBar"></div>
                    </div>
                </div>
                <div class="skill">
                    <div class="skillInfo">Strzelectwo</div>
                    <div class="skillBar">
                        <div class="progressBar"></div>
                    </div>
                </div>
                <div class="skill">
                    <div class="skillInfo">Opinia publiczna</div>
                    <div class="skillBar">
                        <div class="progressBar"></div>
                    </div>
                </div>
            </div>
            <div class="employeeRow">
                <div class="skill">
                    <div class="skillInfo">Zdol. przywódcze</div>
                    <div class="skillBar">
                        <div class="progressBar"></div>
                    </div>
                </div>
                <div class="skill">
                    <div class="skillInfo">Inteligencja</div>
                    <div class="skillBar">
                        <div class="progressBar"></div>
                    </div>
                </div>
                <div class="skill">
                    <div class="skillInfo">Lojalność</div>
                    <div class="skillBar">
                        <div class="progressBar"></div>
                    </div>
                </div>
            </div>
         </div>
         <div class="employeeRow">
            ${!hired ? "<div id='hireHim' class='contrastBtn'>Zatrudnij</div>" : ''}
            <div id="cancel" class="contrastBtn">${!hired ? "Anuluj" : "Ok"}</div>
         </div>`

    document.querySelector('#employeePopup') === null ? document.body.append(overlayer, popup) : null;

    document.querySelector('#hireHim') !== null ? document.querySelector('#hireHim').addEventListener('click', hireEmployee) : null;
    document.querySelector('#cancel') !== null ? document.querySelector('#cancel').addEventListener('click', cancelEmployeeMoreInfo) : null;
    
    getEmployeeStats(skills);
}

function cancelEmployeeMoreInfo(){
    document.querySelector('#employeePopup').remove();
    document.querySelector('#overlayer').remove();
}

function hireEmployee(e){
    let idx = e.target.parentNode.parentNode.dataset.id;
    
    document.querySelector('#employeePopup') !== null ? cancelEmployeeMoreInfo() : null;

    playersGame.hiredEmployees.push(playersGame.employees[Number(idx)]);

    for(let key in playersGame.finances.months){
        if(playersGame.finances.months[key].id === playersGame.dateTime.month){
            playersGame.finances.months[key].expenses.push(
                {
                    name: 'employeeSalary',
                    businessName: 'Wypłata pracownika',
                    employeeId: playersGame.employees[Number(idx)].id,
                    value: parseInt(playersGame.employees[Number(idx)].salary)
                }
            );
        }
    }

    playersGame.tutorial.employeeHired = true;

    createEmployees();
    firstAction();
}

function getEmployeeStats(skills){
    //View employee statictics bar
   let bars = document.querySelectorAll('.progressBar');

   for(let i = 0; i < bars.length - 1; i++){
       bars[i].style.width = `${skills[i].value}px`
   }
}

function getRandomWidth(){
    let wid = Math.floor(Math.random() * (playersGame.gameVars.gameProgress * 70 - playersGame.gameVars.gameProgress * 1 + 1) ) + 1;
    return `${wid}`
}

function getRandomSalary(){
    let salary = Math.floor(Math.random() * (playersGame.gameVars.gameProgress * 1500 - playersGame.gameVars.gameProgress * 950 + 1) ) + 950;
    return `${salary}$ /month`
}

function createTimer(){
    const timer = document.createElement('div');

    timer.id = 'timer';
    renderTimer(timer)
    document.body.appendChild(timer);

    setInterval(startTimer, 1000);
}

function renderTimer(timer){
    timer.innerHTML = 
    `<div id="weekDay">
         ${playersGame.dateTime.weekDay}
     </div>
     <div id="date">
        ${playersGame.dateTime.year}-${playersGame.dateTime.month}-${playersGame.dateTime.monthDay}
     </div>
     <div id="time">
        ${playersGame.dateTime.hour}:${playersGame.dateTime.minutes}
     </div>`

}

function startTimer(){
    playersGame.dateTime.minutes = parseInt(playersGame.dateTime.minutes) + 1;

    if(parseInt(playersGame.dateTime.minutes) >= 60){
        playersGame.dateTime.minutes = '00';
        playersGame.dateTime.hour = parseInt(playersGame.dateTime.hour) + 1
    }
    if(parseInt(playersGame.dateTime.hour) >= 23){
        playersGame.dateTime.hour = '00';
    }
    if(playersGame.dateTime.hour === '00'){
        playersGame.dateTime.hour = 1;
        playersGame.dateTime.monthDay = parseInt(playersGame.dateTime.monthDay) + 1;
        makeWeekDay();
    }

    if( parseInt(playersGame.dateTime.month) !== 2 && parseInt(playersGame.dateTime.monthDay) === 31){
        playersGame.dateTime.monthDay = '00'
        playersGame.dateTime.month = parseInt(playersGame.dateTime.month) + 1
        checkExpenses();
    }

    if( parseInt(playersGame.dateTime.month) === 2 ){
        let year = checkYear(playersGame.dateTime.year);

        if(year){
            if( parseInt(playersGame.dateTime.monthDay) === 29){
                playersGame.dateTime.monthDay = '00'
                playersGame.dateTime.month = parseInt(playersGame.dateTime.month) + 1;
                checkExpenses(); 
            }
        }
        else{
            if( parseInt(playersGame.dateTime.monthDay) === 28){
                playersGame.dateTime.monthDay = '00'
                playersGame.dateTime.month = parseInt(playersGame.dateTime.month) + 1;
                checkExpenses(); 
            }
        } 
    }

    if(parseInt(playersGame.dateTime.month) === 12 && parseInt(playersGame.dateTime.monthDay) === 31){
        playersGame.dateTime.monthDay = '00';
        playersGame.dateTime.month = '01';
        playersGame.dateTime.year = parseInt(playersGame.dateTime.year) + 1;
    }

    if(parseInt(playersGame.dateTime.minutes) < 10 && parseInt(playersGame.dateTime.minutes) !== 0){
        playersGame.dateTime.minutes = `0${playersGame.dateTime.minutes}`;
    }

    renderTimer(document.querySelector('#timer'));

    //Game progress is increasing all the time
    playersGame.gameVars.gameProgress += 0.1;
    playersGame.gameVars.gameProgress = Number(playersGame.gameVars.gameProgress.toFixed(2));

    //Each business could be unlock after passing specified gmae progress
    if(playersGame.gameVars.gameProgress >= 50){
        playersGame.avaiableBusinesses[1].avaiable = true;
    }
    if(playersGame.gameVars.gameProgress >= 350){
        playersGame.avaiableBusinesses[2].avaiable = true;
    }
    if(playersGame.gameVars.gameProgress >= 500){
        playersGame.avaiableBusinesses[3].avaiable = true;
    }

}

function checkExpenses(){
    playersGame.hiredEmployees.forEach(hiredEmployee => {
        playersGame.budget -= parseInt(hiredEmployee);

        if(playersGame.budget < 1){
            //When you budget is below 1$, game is over
            gameOver();
        }
    });
}

function gameOver(){
    const overlayer = document.createElement('div');
    const lostInfo = document.createElement('div');
    const btn = document.createElement('div');

    overlayer.id = 'overlayer';
    lostInfo.id = 'lostInfo';
    btn.id = "gameLostBtn";
    btn.className = "popupBtn";
    
    btn.textContent = "Potwierdź";
    lostInfo.innerHTML = `<h2>Gra zakończona!</h2><p>Niestety twoja organizacja zbankrutowała</p>`

    document.body.append(overlayer, lostInfo)
    lostInfo.appendChild(btn);

    document.querySelector('#gameLostBtn').addEventListener('click', () => {
        localStorage.removeItem('save');
        window.location.reload();
    });
}

function makeWeekDay(){
    switch(playersGame.dateTime.weekDay){
        case 'Mon':
            playersGame.dateTime.weekDay = 'Tue';
        case 'Tue':
            playersGame.dateTime.weekDay = 'Wed';
        case 'Wed':
            playersGame.dateTime.weekDay = 'Thu';
        case 'Thu':
            playersGame.dateTime.weekDay = 'Fri';
        case 'Fri':
            playersGame.dateTime.weekDay = 'Sat';
        case 'Sat':
            playersGame.dateTime.weekDay = 'Sun';
        case 'Sun':
            playersGame.dateTime.weekDay = 'Mon';
    }
}

function checkYear(year){
    return (year % 4 == 0 && year % 100 != 0 || year % 400 == 0);
}

function createSaveBtn(){
    const saveBtn = document.createElement('div');

    saveBtn.id = 'saveBtn';
    saveBtn.innerHTML = '<img src="../img/icons/save.png">'
    document.body.appendChild(saveBtn);


    document.querySelector('#saveBtn').addEventListener('mouseover', saveBtnAnimation);
    document.querySelector('#saveBtn').addEventListener('mouseout', removeSaveBtnAnimation);
    document.querySelector('#saveBtn').addEventListener('click', saveProgress);
}

function saveBtnAnimation(){
    document.querySelector('#saveBtn img').src = '../img/icons/saveRed.png'
}

function removeSaveBtnAnimation(){
    document.querySelector('#saveBtn img').src = '../img/icons/save.png'
}

function saveProgress(){
    localStorage.setItem('save', JSON.stringify(playersGame));
}

//Tutorial
function startTutorial(){
    const tutorial = document.createElement('div');
    tutorial.className = 'tutorialBox';

    if(checkTutorialAvability()){
        return;
    }

    document.body.appendChild(tutorial);
    tutorial.innerHTML = 
        `<div>Na początku wybierz państwo od którego zaczniesz budować swoje imperium.</div> 
         <div><b>Musisz wybrać państwo, którego tłem jest flaga.</b></div>`
}

function checkTutorialAvability(){
    if(!playersGame.tutorial.finished){
        return false;
    }
    else{
        return true;
    }
}

function checkBudget(){
    if(checkTutorialAvability()){
        return;
    }

    document.querySelector('.tutorialBox').innerHTML = 
        `<div>Twój budżet wynosi $1600. Z tą wiedzą możesz zatrudnić pracowników.</div>
         <div><b>Udaj się do zakładki 'Pracownicy', aby to zrobić</b></div>`;

    playersGame.tutorial.budgetChecked = true;
}

function choosingCountry(){
    if(checkTutorialAvability()){
        return;
    }

    closePopup();
    document.querySelector('#placeBox').remove();
    playersGame.tutorial.countryChosed = true;

    document.querySelector('.tutorialBox').innerHTML = 
        `<div>Teraz powineneś stworzyć swoją postać.</div> 
         <div><b>Udaj się do zakładki "Biuro" aby to uczynić</b></div>`
}

function switchedToOffice(){
    if (checkTutorialAvability()) {
        return;
    }
    
    document.querySelector('.tutorialBox').style.width = '20%';
    document.querySelector('.tutorialBox').innerHTML =
        `<div">Wybierz jedno z zdjęć, które będzie przedstawiać twojego bohatera</div>
        <div><b>Jeśli żadne z nich cie nie zdawala możesz wylosować nowe klikajać w przycisk</b></div>`

    getPhotos();

}

function hireEmployeesTutorial(){
    if(checkTutorialAvability()){
        return;
    }

    document.querySelector('.tutorialBox').innerHTML = 
    `<div>Pora nająć kilku pracowników do twojej organizacji</div>
     <div><b>Udaj się do zakładki 'Pracownicy' aby to zrobić</b></div>`;

    playersGame.tutorial.dataTyped = true;

    document.querySelector('.tutorialBox').style.height = 'auto';
    document.querySelector('.tutorialBox').style.padding = '20px';
    document.querySelector('.tutorialBox').style.width = '20%';
}

function mustCheckFinances(){
    if(checkTutorialAvability()){
        return;
    }

    if(!playersGame.tutorial.budgetChecked){
        document.querySelector('.tutorialBox').innerHTML = 
            `<div>Każdy zatrudniany pracownik ma pewne żądania finansowe zależne od wielu czynników. Powinieneś wpierw sprawdzić jakimi funduszami dysponujesz</div>
            <div><b>Udaj się do zakładki 'Finanse' aby to zrobić</b></div>`;
    }
    else{
        document.querySelector('.tutorialBox').innerHTML = 
            `<div>Wybierz jednego pracownika, który najbardziej spełnia twoje oczekiwania i zatrudnij go</div>
            <div><b>Kliknij "Dowiedz się więcej" by poznać szczegóły na temat potencjalnego pracownika</b></div>`;
    }
}

function choosePersonTutorial(){
    if(checkTutorialAvability()){
        return;
    }

    document.querySelector('.tutorialBox').innerHTML = 
    `<div>Podaj imię, nazwisko swojego bohatera oraz nazwij swoją organizację</div>
     <div><b>Jeżeli nie masz pomysłu pozostaw pola puste, a dane zostane wylosowane</b></div>`;
}

function firstAction(){
    if(checkTutorialAvability()){
        return;
    }

    document.querySelector('.tutorialBox').innerHTML = 
        `<div>Teraz kiedy masz już zatrudnionego pracownika pora wysłać go na pierwszą akcje</div>
        <div><b>Udaj się do zakładki "Działalności", aby to uczynić</b></div>`;
}

function switchedToBusiness(){
    if(checkTutorialAvability()){
        return;
    }

    playersGame.tutorial.switchedToBusiness = true;

    document.querySelector('.tutorialBox').innerHTML = 
        `<div>Wybierz dostępną działalność i przydziel do niej pracownika</div>
        <div><b>Z czasem odblokujesz więcej działalności</b></div>`;
}

function timeToDoAction(){
    if(checkTutorialAvability()){
        return;
    }

    playersGame.tutorial.actionToDo = true;

    document.querySelector('.tutorialBox').innerHTML = 
        `<div>Wybierz dostępną akcje i przydziel jej pracownika</div>
        <div><b>Akcje, które są przyciemnione zostaną odblokowane wraz z rozwojem twojej rozgrywki</b></div>`;
}

function businessDone(){
    if(checkTutorialAvability()){
        return;
    }

    playersGame.tutorial.businessDone = true;

    document.querySelector('.tutorialBox').innerHTML = 
        `<div>Teraz po wykonanej akcji powineneś sprawdzić jak wpłyneło to na twoje stosunki.</div>
        <div><b>Udaj się do zakładki "Relacje", aby to uczynić</b></div>`;
}

function switchedToRelations(){
    if(checkTutorialAvability()){
        return;
    }

    const overlayer = document.createElement('div');
    overlayer.id = 'overlayer';

    playersGame.tutorial.switchedToRelations = true;

    document.querySelector('.tutorialBox').className += " tutorialFinished";

    document.querySelector('.tutorialBox').innerHTML = 
        `<div>Twoja akcja nie miała większego wpływu na twoje stosunki i te pozostają neutralne.</div>
        <div><b>W ten sposób ukończyłeś tutorial, znasz podstawy poruszania się po przestępczym świecie. Czeka cię jeszcze sporo rzeczy 
        do odkrycia nim zostaniesz przywódcą największej zorganizowanej grupy przestępczej, pora ruszyć budować swoje imperium</b></div>
        <div id="tutorialBtn">Zaczynajmy!</div>`;

    document.body.appendChild(overlayer);

    document.querySelector('#tutorialBtn').addEventListener('click', () => {
        playersGame.tutorial.finished = true;
        
        document.querySelector('#overlayer').remove();
        document.querySelector('.tutorialBox').remove();

        createTimer();
        createSaveBtn();
    });
}

//Map

function createMap() {
    document.querySelector('#sea').innerHTML =
        `<svg viewBox="0 0 2000 1001" <metadata="" id="metadata8">
         <defs>
            <pattern id="usa" patternUnits="userSpaceOnUse" width="1000" height="500">
                <image xlink:href="../img/usa.png" x="0" y="0" width="1000" height="500"></image>
            </pattern>
            <pattern id="poland" patternUnits="userSpaceOnUse" width="300" height="150">
                    <image xlink:href="../img/poland.png" x="0" y="20" width="300" height="150"></image>
            </pattern>
            <pattern id="russia" patternUnits="userSpaceOnUse" width="1024" height="588">
                    <image xlink:href="../img/russia.png" x="0" y="0" width="1024" height="588"></image>
            </pattern>
            <pattern id="italy" patternUnits="userSpaceOnUse" width="66" height="42">
                <image xlink:href="../img/italy.png" x="0" y="0" width="66" height="42"></image>
            </pattern>
            <pattern id="japan" patternUnits="userSpaceOnUse" width="160" height="90">
                <image xlink:href="../img/japan.png" x="0" y="0" width="160" height="90"></image>
            </pattern>
            <pattern id="china" patternUnits="userSpaceOnUse" width="426" height="240">
                <image xlink:href="../img/china.png" x="0" y="0" width="426" height="240"></image>
            </pattern>
            <pattern id="mexico" patternUnits="userSpaceOnUse" width="300" height="180">
                <image xlink:href="../img/mexico.png" x="0" y="0" width="300" height="180"></image>
            </pattern>
            <pattern id="colombia" patternUnits="userSpaceOnUse" width="600" height="360">
                <image xlink:href="../img/colombia.png" x="0" y="0" width="600" height="360"></image>
            </pattern>
         </defs>
    <path inkscape:connector-curvature="0" id="AF" data-name="Afghanistan" data-id="AF" d="m 1369.9,333.8 -5.4,0 -3.8,-0.5 -2.5,2.9 -2.1,0.7 -1.5,1.3 -2.6,-2.1 -1,-5.4 -1.6,-0.3 0,-2 -3.2,-1.5 -1.7,2.3 0.2,2.6 -0.6,0.9 -3.2,-0.1 -0.9,3 -2.1,-1.3 -3.3,2.1 -1.8,-0.8 -4.3,-1.4 -2.9,0 -1.6,-0.2 -2.9,-1.7 -0.3,2.3 -4.1,1.2 0.1,5.2 -2.5,2 -4,0.9 -0.4,3 -3.9,0.8 -5.9,-2.4 -0.5,8 -0.5,4.7 2.5,0.9 -1.6,3.5 2.7,5.1 1.1,4 4.3,1.1 1.1,4 -3.9,5.8 9.6,3.2 5.3,-0.9 3.3,0.8 0.9,-1.4 3.8,0.5 6.6,-2.6 -0.8,-5.4 2.3,-3.6 4,0 0.2,-1.7 4,-0.9 2.1,0.6 1.7,-1.8 -1.1,-3.8 1.5,-3.8 3,-1.6 -3,-4.2 5.1,0.2 0.9,-2.3 -0.8,-2.5 2,-2.7 -1.4,-3.2 -1.9,-2.8 2.4,-2.8 5.3,-1.3 5.8,-0.8 2.4,-1.2 2.8,-0.7 -1.4,-1.9 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="AO" data-name="Angola" data-id="AO" d="m 1068.3,609.6 -16.6,-0.1 -1.9,0.7 -1.7,-0.1 -2.3,0.9 -0.5,1.2 2.8,4 1.1,4.3 1.6,6.1 -1.7,2.6 -0.3,1.3 1.3,3.8 1.5,3.9 1.6,2.2 0.3,3.6 -0.7,4.8 -1.8,2.8 -3.3,4.2 -1.3,2.6 -1.9,5.7 -0.3,2.7 -2,5.9 -0.9,5.5 0.5,4 2.7,-1.2 3.3,-1 3.6,0.1 3.2,2.9 0.9,-0.4 22.5,-0.3 3.7,3 13.4,0.9 10.3,-2.5 -3.5,-4 -3.6,-5.2 0.8,-20.3 11.6,0.1 -0.5,-2.2 0.9,-2.4 -0.9,-3 0.7,-3 -0.5,-2 -2.6,-0.4 -3.5,1 -2.4,-0.2 -1.4,0.6 0.5,-7.6 -1.9,-2.3 -0.3,-4 0.9,-3.8 -1.2,-2.4 0,-4 -6.8,0 0.5,-2.3 -2.9,0 -0.3,1.1 -3.4,0.3 -1.5,3.7 -0.9,1.6 -3,-0.9 -1.9,0.9 -3.7,0.5 -2.1,-3.3 -1.3,-2.1 -1.6,-3.8 -1.3,-4.7 z m -21.8,-1.3 0.2,-2.7 0.9,-1.7 2,-1.3 -2,-2.2 -1.8,1.1 -2.2,2.7 1.4,4.8 1.5,-0.7 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="AL" data-name="Albania" data-id="AL" d="m 1077.5,300.5 -2,3.1 0.5,1.9 0,0 1,1 -0.5,1.9 -0.1,4.3 0.7,3 3,2.1 0.2,1.4 1,0.4 2.1,-3 0.1,-2.1 1.6,-0.9 0,-1.6 -2.3,-1.6 -0.9,-2.6 0.4,-2.1 0,0 -0.5,-2.3 -1.3,-0.6 -1.3,-1.6 -1.3,0.5 -0.4,-1.2 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AE" data-name="United Arab Emirates" data-id="AE" d="m 1283.9,408.6 -1.3,-2.2 -3,3.9 -3.7,4.1 -3.3,4.3 -3.3,-0.2 -4.6,-0.2 -4.2,1 -0.3,-1.7 -1,0.3 0.4,1.5 2.6,6.4 16.8,3.2 1,-1.3 -0.1,-2.6 1.4,-2.6 -0.3,-2.6 2.4,-1.3 -1.1,-0.8 0.1,-4.2 2.8,0 -1.3,-5 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AR" data-name="Argentina" data-id="AR" d="m 669.8,920.7 0.9,-3 -7.3,-1.5 -7.7,-3.6 -4.3,-4.6 -3,-2.8 5.9,13.5 5,0 2.9,0.2 3.3,2.1 4.3,-0.3 z m -50.4,-208.1 -7.4,-1.5 -4,5.7 0.9,1.6 -1.1,6.6 -5.6,3.2 1.6,10.6 -0.9,2 2,2.5 -3.2,4 -2.6,5.9 -0.9,5.8 1.7,6.2 -2.1,6.5 4.9,10.9 1.6,1.2 1.3,5.9 -1.6,6.2 1.4,5.4 -2.9,4.3 1.5,5.9 3.3,6.3 -2.5,2.4 0.3,5.7 0.7,6.4 3.3,7.6 -1.6,1.2 3.6,7.1 3.1,2.3 -0.8,2.6 2.8,1.3 1.3,2.3 -1.8,1.1 1.8,3.7 1.1,8.2 -0.7,5.3 1.8,3.2 -0.1,3.9 -2.7,2.7 3.1,6.6 2.6,2.2 3.1,-0.4 1.8,4.6 3.5,3.6 12,0.8 4.8,0.9 2.2,0.4 -4.7,-3.6 -4.1,-6.3 0.9,-2.9 3.5,-2.5 0.5,-7.2 4.7,-3.5 -0.2,-5.6 -5.2,-1.3 -6.4,-4.5 -0.1,-4.7 2.9,-3.1 4.7,-0.1 0.2,-3.3 -1.2,-6.1 2.9,-3.9 4.1,-1.9 -2.5,-3.2 -2.2,2 -4,-1.9 -2.5,-6.2 1.5,-1.6 5.6,2.3 5,-0.9 2.5,-2.2 -1.8,-3.1 -0.1,-4.8 -2,-3.8 5.8,0.6 10.2,-1.3 6.9,-3.4 3.3,-8.3 -0.3,-3.2 -3.9,-2.8 -0.1,-4.5 -7.8,-5.5 -0.3,-3.3 -0.4,-4.2 0.9,-1.4 -1.1,-6.3 0.3,-6.5 0.5,-5.1 5.9,-8.6 5.3,-6.2 3.3,-2.6 4.2,-3.5 -0.5,-5.1 -3.1,-3.7 -2.6,1.2 -0.3,5.7 -4.3,4.8 -4.2,1.1 -6.2,-1 -5.7,-1.8 4.2,-9.6 -1.1,-2.8 -5.9,-2.5 -7.2,-4.7 -4.6,-1 -11.2,-10.4 -1,-1.3 -6.3,-0.3 -1.6,5.1 -3.7,-4.6 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AM" data-name="Armenia" data-id="AM" d="m 1219,325.1 -0.9,-4.4 -2.5,-1.1 -2.5,-1.7 1,-2 -3.1,-2.2 0.7,-1.5 -2.2,-1.1 -1.4,-1.7 -6.9,1 1.3,2.2 0,3.1 4.2,1.5 2.4,1.9 1,-0.2 1.8,1.7 2.3,0 0.2,1 2.8,3.7 1.8,-0.2 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AU" data-name="Australia" data-id="AU" d="m 1726.7,832 -3,-0.5 -1.9,2.9 -0.6,5.4 -2.1,4 -0.5,5.3 3,0.2 0.8,0.3 6.6,-4.3 0.6,1.7 4,-4.9 3.2,-2.2 4.5,-7.3 -2.8,-0.5 -4.8,1.2 -3.4,0.9 -3.6,-2.2 z m 50.1,-172.3 0.5,-2.3 0.1,-3.6 -1.6,-3.2 0.1,-2.7 -1.3,-0.8 0.1,-3.9 -1.2,-3.2 -2.3,2.4 -0.4,1.8 -1.5,3.5 -1.8,3.4 0.6,2.1 -1.2,1.3 -1.5,4.8 0.1,3.7 -0.7,1.8 0.3,3.1 -2.6,5 -1.3,3.5 -1.7,2.9 -1.7,3.4 -4.1,2.1 -4.9,-2.1 -0.5,-2 -2.5,-1.6 -1.6,0 -3.3,-3.8 -2.5,-2.2 -3.9,-2 -3.9,-3.5 -0.1,-1.8 2.5,-3.1 2.1,-3.2 -0.3,-2.6 1.9,-0.2 2.5,-2.5 2,-3.4 -2.2,-3.2 -1.5,1.2 -2,-0.5 -3.5,1.8 -3.2,-2 -1.7,0.7 -4.5,-1.6 -2.7,-2.7 -3.5,-1.5 -3.1,0.9 3.9,2.1 -0.3,3.2 -4.8,1.2 -2.8,-0.7 -3.6,2.2 -2.9,3.7 0.6,1.5 -2.7,1.7 -3.4,5.1 0.6,3.5 -3.4,-0.6 -3.5,0 -2.5,-3.8 -3.7,-2.9 -2.8,0.8 -2.6,0.9 -0.3,1.6 -2.4,-0.7 -0.3,1.8 -3,1.1 -1.7,2.5 -3.5,3.1 -1.4,4.8 -2.3,-1.3 -2.2,3.1 1.5,3 -2.6,1.2 -1.4,-5.5 -4.8,5.4 -0.8,3.5 -0.7,2.5 -3.8,3.3 -2,3.4 -3.5,2.8 -6.1,1.9 -3.1,-0.2 -1.5,0.6 -1.1,1.4 -3.5,0.7 -4.7,2.4 -1.4,-0.8 -2.6,0.5 -4.6,2.3 -3.2,2.7 -4.8,2.1 -3.1,4.4 0.4,-4.8 -3.1,4.6 -0.1,3.7 -1.3,3.2 -1.5,1.5 -1.3,3.7 0.9,1.9 0.1,2 1.6,5 -0.7,3.3 -1,-2.5 -2.3,-1.8 0.4,5.9 -1.7,-2.8 0.1,2.8 1.8,5 -0.6,5 1.7,2.5 -0.4,1.9 0.9,4.1 -1.3,3.6 -0.3,3.6 0.7,6.5 -0.7,3.7 -2.2,4.4 -0.6,2.3 -1.5,1.5 -2.9,0.8 -1.5,3.7 2.4,1.2 4,4.1 3.6,0 3.8,0.3 3.3,-2.1 3.4,-1.8 1.4,0.3 4.5,-3.4 3.8,-0.3 4.1,-0.7 4.2,1.2 3.6,-0.6 4.6,-0.2 3,-2.6 2.3,-3.3 5.2,-1.5 6.9,-3.2 5,0.4 6.9,-2.1 7.8,-2.3 9.8,-0.6 4,3.1 3.7,0.2 5.3,3.8 -1.6,1.5 1.8,2.4 1.3,4.6 -1.6,3.4 2.9,2.6 4.3,-5.1 4.3,-2.1 6.7,-5.5 -1.6,4.7 -3.4,3.2 -2.5,3.7 -4.4,3.5 5.2,-1.2 4.7,-4.4 -0.9,4.8 -3.2,3.1 4.7,0.8 1.3,2.6 -0.4,3.3 -1.5,4.9 1.4,4 4,1.9 2.8,0.4 2.4,1 3.5,1.8 7.2,-4.7 3.5,-1.2 -2.7,3.4 2.6,1.1 2.7,2.8 4.7,-2.7 3.8,-2.5 6.3,-2.7 6,-0.2 4.2,-2.3 0.9,-2 3,-4.5 3.9,-4.8 3.6,-3.2 4.4,-5.6 3.3,-3.1 4.4,-5 5.4,-3.1 5,-5.8 3.1,-4.5 1.4,-3.6 3.8,-5.7 2.1,-2.9 2.5,-5.7 -0.7,-5.4 1.7,-3.9 1.1,-3.7 0,-5.1 -2.8,-5.1 -1.9,-2.5 -2.9,-3.9 0.7,-6.7 -1.5,1 -1.6,-2.8 -2.5,1.4 -0.6,-6.9 -2.2,-4 1,-1.5 -3.1,-2.8 -3.2,-3 -5.3,-3.3 -0.9,-4.3 1.3,-3.3 -0.4,-5.5 -1.3,-0.7 -0.2,-3.2 -0.2,-5.5 1.1,-2.8 -2.3,-2.5 -1.4,-2.7 -3.9,2.4 -1.2,-5 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="AT" data-name="Austria" data-id="AT" d="m 1060.2,264 -2.3,-1.2 -2.3,0.3 -4,-1.9 -1.7,0.5 -2.6,2.5 -3.8,-2 -1.5,2.9 -1.7,0.8 1,4 -0.4,1.1 -1.7,-1.3 -2.4,-0.2 -3.4,1.2 -4.4,-0.3 -0.6,1.6 -2.6,-1.7 -1.5,0.3 0.2,1.1 -0.7,1.6 2.3,1.1 2.6,0.2 3.1,0.9 0.5,-1.2 4.8,-1.1 1.3,2.2 7.2,1.6 4.2,0.4 2.4,-1.4 4.3,-0.1 0.9,-1.1 1.3,-4 -1.1,-1.3 2.8,0 0.2,-2.6 -0.7,-2.1 0.3,-0.8 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AZ" data-name="Azerbaijan" data-id="AZ" d="m 1210.1,318.9 -1,0.2 1.2,2.4 3.2,2.9 3.7,0.9 -2.8,-3.7 -0.2,-1 -2.3,0 -1.8,-1.7 z m 10.4,-9.3 -4.3,-3.8 -1.5,-0.2 -1.1,0.9 3.2,3.4 -0.6,0.7 -2.8,-0.4 -4.2,-1.8 -1.1,1 1.4,1.7 2.2,1.1 -0.7,1.5 3.1,2.2 -1,2 2.5,1.7 2.5,1.1 0.9,4.4 5.3,-4.7 1.9,-0.5 1.9,1.9 -1.2,3.1 3.8,3.4 1.3,-0.3 -0.8,-3.2 1.7,-1.5 0.4,-2.2 -0.1,-5 4.2,-0.5 -2,-1.7 -2.5,-0.2 -3.5,-4.5 -3.4,-3.2 0,0 -2.6,2.5 -0.5,1.5 -2.4,-0.4 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BI" data-name="Burundi" data-id="BI" d="m 1148.2,590 -0.3,-2.5 0,0 -3,-0.4 -1.7,3.6 -3.5,-0.5 1.4,2.9 0.1,1.1 2,6.1 -0.1,0.3 0.6,-0.1 2.1,-2.3 2.2,-3.3 1.4,-1.4 0,-2 -1.2,-1.5 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BE" data-name="Belgium" data-id="BE" d="m 1000.7,246.2 -4.4,1.3 -3.6,-0.5 0,0 -3.8,1.2 0.7,2.2 2.2,0.1 2.4,2.4 3.4,2.9 2.5,-0.4 4.4,2.8 0.4,-3.5 1.3,-0.2 0.4,-4.2 -2.8,-1.4 -3.1,-2.7 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BJ" data-name="Benin" data-id="BJ" d="m 996.9,498 -4.3,-3.7 -2,0 -1.9,1.9 -1.2,1.9 -2.7,0.6 -1.2,2.8 -1.9,0.7 -0.7,3.3 1.7,1.9 2,2.3 0.2,3.1 1.1,1.3 -0.2,14.6 1.4,4.4 4.6,-0.8 0.3,-10.2 -0.1,-4.1 1,-4 1.7,-1.9 2.7,-4 -0.6,-1.7 1.1,-2.5 -1.2,-3.8 0.2,-2.1 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BF" data-name="Burkina Faso" data-id="BF" d="m 978.8,477.2 -3.6,0 -1.4,-1.2 -3,0.9 -5.2,2.6 -1.1,2 -4.3,2.9 -0.8,1.6 -2.3,1.3 -2.7,-0.9 -1.6,1.6 -0.8,4.4 -4.5,5.2 0.2,2.2 -1.6,2.7 0.4,3.7 2.5,1.4 1,2.1 2.5,1.3 1.9,-1.6 2.7,-0.2 3.8,1.6 -0.8,-4.8 0.2,-3.6 9.7,-0.3 2.4,0.5 1.8,-1 2.6,0.5 4.9,0.1 1.9,-0.7 1.2,-2.8 2.7,-0.6 1.2,-1.9 0.1,-4.4 -6.4,-1.4 -0.2,-3.1 -3.1,-4.1 -0.8,-2.9 0.5,-3.1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="BD" data-name="Bangladesh" data-id="BD" d="m 1486.5,431.9 -4.5,-10.1 -1.5,0.1 -0.2,4 -3.5,-3.3 1.1,-3.6 2.4,-0.4 1.6,-5.3 -3.4,-1.1 -5,0.1 -5.4,-0.9 -1.2,-4.4 -2.7,-0.4 -4.8,-2.7 -1.2,4.3 4.6,3.4 -3.1,2.4 -0.8,2.3 3.7,1.7 -0.4,3.8 2.6,4.8 1.6,5.2 2.2,0.6 1.7,0.7 0.6,-1.2 2.5,1.3 1.3,-3.5 -0.9,-2.6 5.1,0.2 2.8,3.7 1.5,3.1 0.8,3.2 2,3.3 -1.1,-5.1 2.1,1 -0.5,-4.6 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BG" data-name="Bulgaria" data-id="BG" d="m 1121.6,294.3 -3,-0.7 -4,-2.2 -5.8,1.4 -2.3,1.6 -7.5,-0.3 -4,-1 -1.9,0.5 -1.8,-2.6 -1.1,1.4 0.7,2.3 2.8,2.6 -1.7,1.9 -0.7,2 0.6,0.7 -0.7,0.9 2.8,2 0.8,4.1 3.8,0.2 3.9,-1.7 3.9,2.1 4.6,-0.6 -0.3,-3 5,-2 4.5,0.8 -2.1,-3.5 1.3,-4.4 2.2,-2.5 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BA" data-name="Bosnia and Herzegovina" data-id="BA" d="m 1062.2,284.9 -2.3,0.1 -1,1.3 -1.9,-1.4 -0.9,2.5 2.7,2.9 1.3,1.9 2.5,2.3 2,1.4 2.2,2.5 4.7,2.4 0.4,-3.4 1.5,-1.4 0.9,-0.6 1.2,-0.3 0.5,-2.9 -2.7,-2.3 1,-2.7 -1.8,0 0,0 -2.4,-1.4 -3.5,0.1 -4.4,-1 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BY" data-name="Belarus" data-id="BY" d="m 1112.8,219.4 -5.2,-1.5 -4.6,2.3 -2.6,1 0.9,2.6 -3.5,2 -0.5,3.4 -4.8,2.2 -4.6,0 0.6,2.7 1.7,2.3 0.3,2.4 -2.7,1.2 1.9,2.9 0.5,2.7 2.2,-0.3 2.4,-1.6 3.7,-0.2 5,0.5 5.6,1.5 3.8,0.1 2,0.9 1.6,-1.1 1.5,1.5 4.3,-0.3 2,0.6 -0.2,-3.1 1.2,-1.4 4.1,-0.3 0,0 -2,-3.9 -1.5,-2 0.8,-0.6 3.9,0.2 1.6,-1.3 -1.7,-1.6 -3.4,-1.1 0.1,-1.1 -2.2,-1.1 -3.7,-3.9 0.6,-1.6 -1,-2.9 -4.8,-1.4 -2.3,0.7 -1,-1.4 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="BZ" data-name="Belize" data-id="BZ" d="m 482.5,471.1 1.4,-2.2 1,-0.2 1.3,-1.7 1,-3.2 -0.3,-0.6 0.9,-2.3 -0.4,-1 1.3,-2.7 0.3,-1.8 -1.1,0 0.1,-0.9 -1,0 -2.5,3.9 -0.9,-0.8 -0.7,0.3 -0.1,1 -0.7,5 -1.2,7.2 1.6,0 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="BO" data-name="Bolivia" data-id="BO" d="m 655.7,700.5 1.6,-1.3 -0.8,-3.6 1.3,-2.8 0.5,-5 -1.6,-4 -3.2,-1.7 -0.8,-2.6 0.6,-3.6 -10.7,-0.3 -2.7,-7.4 1.6,-0.1 -0.3,-2.8 -1.2,-1.8 -0.5,-3.7 -3.3,-1.9 -3.5,0.1 -2.5,-1.9 -3.8,-1.2 -2.4,-2.4 -6.3,-1 -6.4,-5.7 0.3,-4.3 -0.9,-2.5 0.4,-4.7 -7.3,1.1 -2.8,2.3 -4.8,2.6 -1.1,1.9 -2.9,0.2 -4.2,-0.6 5.5,10.3 -1.1,2.1 0.1,4.5 0.3,5.4 -1.9,3.2 1.2,2.4 -1.1,2.1 2.8,5.3 -2.8,6.9 3.1,4.3 1.2,4.6 3.2,2.7 -1.1,6.2 3.7,7.1 3.1,8.8 3.8,-0.9 4,-5.7 7.4,1.5 3.7,4.6 1.6,-5.1 6.3,0.3 1,1.3 1.5,-7.6 -0.2,-3.4 2.1,-5.6 9.5,-1.9 5.1,0.1 5.4,3.3 0.3,1.9 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BR" data-name="Brazil" data-id="BR" d="m 659,560.1 -1.4,0.2 -3.1,-0.5 -1.8,1.7 -2.6,1.1 -1.7,0.2 -0.7,1.3 -2.7,-0.3 -3.5,-3 -0.3,-2.9 -1.4,-3.3 1,-5.4 1.6,-2.2 -1.2,-3 -1.9,-0.9 0.8,-2.8 -1.3,-1.5 -2.9,0.3 0.7,1.8 -2.1,2.4 -6.4,2.4 -4,1 -1.7,1.5 -4.4,-1.6 -4.2,-0.8 -1,0.6 2.4,1.6 -0.3,4.3 0.7,4 4.8,0.5 0.3,1.4 -4.1,1.8 -0.7,2.7 -2.3,1 -4.2,1.5 -1.1,1.9 -4.4,0.5 -3,-3.4 -1.1,0.8 -1,-3.8 -1.6,-2 -1.9,2.2 -10.9,-0.1 0,3.9 3.3,0.7 -0.2,2.4 -1.1,-0.6 -3.2,1 0,4.6 2.5,2.4 0.9,3.6 -0.1,2.8 -2.2,17.4 -5.1,-0.3 -0.7,1 -4.6,1.2 -6.2,4.3 -0.4,3 -1.3,2.2 0.7,3.4 -3.3,1.9 0.1,2.7 -1.5,1.1 2.6,5.8 3.3,3.8 -1,2.8 3.7,0.3 2.3,3.4 4.9,0.2 4.4,-3.8 0.2,9.7 2.6,0.7 3,-1.1 4.2,0.6 2.9,-0.2 1.1,-1.9 4.8,-2.6 2.8,-2.3 7.3,-1.1 -0.4,4.7 0.9,2.5 -0.3,4.3 6.4,5.7 6.3,1 2.4,2.4 3.8,1.2 2.5,1.9 3.5,-0.1 3.3,1.9 0.5,3.7 1.2,1.8 0.3,2.8 -1.6,0.1 2.7,7.4 10.7,0.3 -0.6,3.6 0.8,2.6 3.2,1.7 1.6,4 -0.5,5 -1.3,2.8 0.8,3.6 -1.6,1.3 1.9,3.6 0.4,8.6 6,1.2 2.1,-1.2 3.9,1.7 1.2,1.9 1,5.8 0.9,2.5 2,0.3 2,-1.1 2.1,1.2 0.3,3.5 -0.3,3.8 -0.7,3.6 2.6,-1.2 3.1,3.7 0.5,5.1 -4.2,3.5 -3.3,2.6 -5.3,6.2 -5.9,8.6 3.4,-0.7 6.2,4.9 1.9,-0.2 6.2,4.1 4.8,3.5 3.8,4.3 -1.9,3 2.1,3.7 2.9,-3.7 1.5,-6 3.2,-3 3.9,-5 4.5,-11.2 3.4,-3.5 0.8,-3.1 0.3,-6.4 -1.3,-3.5 0.3,-4.8 4.1,-6.3 6,-5.1 6,-1.8 3.6,-2.9 8.5,-2.4 5.9,0 1.1,-3.8 4.2,-2.8 0.6,-6.5 5.1,-8.3 0.5,-8.5 1.6,-2.6 0.3,-4.1 1.1,-9.9 -1,-11.9 1.4,-4.7 1.4,-0.1 3.9,-5.5 3.3,-7.2 7.7,-8.8 2.7,-4.2 2,-10.5 -1,-3.9 -2,-8.1 -2.1,-2 -4.8,-0.2 -4.3,-1.9 -7.3,-7.1 -8.4,-5.3 -8.4,0.3 -10.9,-3.4 -6.5,2 0.8,-3.5 -2.7,-3.8 -9.4,-3.8 -7.1,-2.3 -4.2,4.1 -0.3,-6.3 -9.9,-1 -1.7,-2 4.2,-5.2 -0.1,-4.4 -3,-1 -3,-11.2 -1.3,-3.5 -1.9,0.3 -3.5,5.8 -1.8,4.7 -2.1,2.4 -2.7,0.5 -0.8,-1.8 -1.2,-0.3 -1.8,1.8 -2.4,-1.3 -3.2,-1.4 -2.7,0.7 -2.3,-0.6 -0.5,1.8 0.9,1.3 -0.5,1.3 -3.1,-0.5 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BN" data-name="Brunei" data-id="BN" d="m 1617.8,543.4 2.7,3.3 1.1,-2.2 2.7,0.2 0.1,-4.1 0.1,-3.1 -4.6,3.5 -2.1,2.4 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="BT" data-name="Bhutan" data-id="BT" d="m 1474.7,395.5 -2.7,-1.8 -2.9,-0.1 -4.2,-1.5 -2.6,1.6 -2.6,4.8 0.3,1.2 5.5,2.5 3.2,-1 4.7,0.4 4.4,-0.2 -0.4,-3.9 -2.7,-2 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BW" data-name="Botswana" data-id="BW" d="m 1116.7,685 -1,-0.5 -3.2,1.5 -1.6,0 -3.7,2.5 -2,-2.6 -8.6,2.2 -4.1,0.2 -0.9,22.7 -5.4,0.2 -0.6,18.5 1.4,1 3,6.1 -0.7,3.8 1.1,2.3 4,-0.7 2.8,-2.8 2.7,-1.9 1.5,-3.1 2.7,-1.5 2.3,0.8 2.5,1.8 4.4,0.3 3.6,-1.5 0.6,-2 1.2,-3 3,-0.5 1.7,-2.4 2,-4.3 5.2,-4.7 8,-4.7 -3.4,-2.9 -4.2,-0.9 -1.5,-4.1 0.1,-2.2 -2.3,-0.7 -6,-7 -1.6,-3.7 -1.1,-1.1 -1.9,-5.1 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CF" data-name="Central African Republic" data-id="CF" d="m 1110.5,517.3 -0.5,-0.3 -2,-1.8 -0.3,-2 0.8,-2.6 0,-2.6 -3.3,-4 -0.7,-2.7 -3.5,1.1 -2.8,2.5 -4,7 -5.2,2.9 -5.4,-0.4 -1.6,0.6 0.6,2.3 -2.9,2.2 -2.3,2.5 -7.1,2.4 -1.4,-1.4 -0.9,-0.2 -1,1.7 -4.7,0.4 -2.7,6.5 -1.4,1.1 -0.4,5 0.6,2.7 -0.4,1.9 2.6,3.3 0.5,2.3 2.1,3.2 2.6,2.1 0.3,2.9 0.6,1.8 2.9,-5.9 3.3,-3.4 3.8,1.1 3.6,0.4 0.5,-4.5 2.2,-3.2 3,-2 4.6,2.1 3.6,2.4 4.1,0.6 4.2,1.2 1.6,-3.8 0.8,-0.5 2.6,0.6 6.2,-3.1 2.2,1.3 1.8,-0.2 0.9,-1.5 2,-0.6 4.3,0.7 3.6,0.1 1.8,-0.6 -0.9,-2.1 -4.2,-2.5 -1.5,-3.8 -2.4,-2.7 -3.8,-3.4 -0.1,-2 -3.1,-2.6 -3.8,-2.5 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="CA" data-name="Canada" data-id="CA" d="m 659,276.7 -0.7,-3 -2.5,1.9 0.5,2.1 5.6,2.6 1.9,-0.4 3.3,-2.5 -4.7,0.1 -3.4,-0.8 z m 14.4,-15.9 0.2,-1.1 -4.1,-2.6 -5.9,-1.6 -1.9,0.6 3.5,2.9 5.7,1.9 2.5,-0.1 z m -305.3,3.7 0.2,-3.4 -3.2,-2.6 -0.4,-2.9 -0.1,-2.1 -4.1,-0.7 -2.4,-0.9 -4.1,-1.4 -1.4,1.5 -0.6,3.3 4.3,1.1 -0.4,1.8 2.9,2.2 0,2.2 6.3,2.8 3,-0.9 z m 336.1,-13.5 3.9,-3.8 1.4,-1.7 -2.1,-0.3 -4.9,2.2 -4.2,3.5 -8.1,9.8 -5.3,3.7 1.6,1.7 -3.8,2.2 0.2,1.9 9.6,0.1 5.4,-0.3 4.4,1.5 -4.4,2.9 2.9,0.2 7.3,-5.4 1.2,0.8 -2.5,5.1 3,1.2 2.3,-0.2 3.5,-5.5 -0.5,-3.9 0.3,-3.3 -3.7,1.1 2.8,-4.6 -4.3,-1.9 -2.7,1.5 -3.9,-1.7 2.4,-2.1 -2.9,-1.3 -3.8,2 4.9,-5.4 z m -356.8,-21.2 -1.9,2 -1.4,2.6 0.9,1.9 -0.6,2.8 0.7,2.8 1.9,0 -0.2,-4.9 7.1,-6.9 -4.9,0.5 -1.6,-0.8 z m 280.9,-47 -0.4,-1.2 -1.7,-0.1 -2.8,1.7 -0.4,0.4 0.1,1.7 1.7,0.5 3.5,-3 z m -9.6,-3.2 0.8,-1.1 -6,-0.1 -4.9,2.7 0,1.5 3,0.2 7.1,-3.2 z m -3.1,-16.6 -2.7,-0.5 -5,5.2 -3.6,4.4 -5.7,2.8 6.3,-0.6 -0.8,3.4 8.2,-3 6.2,-3 0.8,2.6 5.9,1.3 4.9,-1.8 -1.9,-1.8 -3.4,0.4 1.3,-2.7 -3.7,-1.7 -3.4,-1.9 -1.5,-1.5 -2.8,0.9 0.9,-2.5 z m 44.6,-8.2 3.7,-1.7 1,-0.7 1.4,-2.3 -2.3,-1.5 -4.2,0.7 -3.8,3.1 -0.7,2.6 4.9,-0.2 z m -73.8,-10.7 -0.8,-2 -0.3,-1 -1.6,-1 -3,-1.5 -4.9,2.3 -5,1.7 3.5,2.4 3.8,-0.6 4.1,1.6 4.2,-1.9 z m 22.4,-2.1 -6.6,-1 5.7,-2.6 -0.4,-6 -1.9,-2.3 -4.5,-0.8 -8.1,3.8 -5.5,5.8 2.9,2.1 1.6,3.3 -6.3,5.5 -3.2,-0.2 -6.2,4.4 4.2,-5.2 -4.8,-1.8 -4.5,0.9 -2.4,3.4 -5.9,-0.1 -7.2,0.8 -5.1,-2.4 -5,0.4 -1.5,-2.9 -2.1,-1.3 -3.8,0.5 -5.2,0.3 -4.4,1.8 2,2.3 -7,2.8 -1.4,-3.3 -4.4,1 -11.8,0.6 -6.4,-1.2 8.5,-2.6 -2.8,-2.8 -4.4,0.4 -4.7,-1 -7.5,-1.9 -3.8,-2.3 -4.5,-0.3 -3.3,1.6 -5.9,0.9 3.9,-4.1 -9.4,3.6 -1.4,-4.7 -2.1,-0.6 -3.8,2.5 -4.5,1.2 -0.2,-2.2 -8.2,1.4 -8.8,2.3 -5.2,-0.6 -7,1.6 -6.2,2.3 -3.7,-0.5 -3.3,-2.6 -5.9,-1.3 0,0 -24.3,20.2 -35.4,32.4 4.2,0.1 2.7,1.6 0.6,2.6 0.2,3.9 7.6,-3.3 6.4,-1.9 -0.5,3 0.7,2.4 1.7,2.7 -1.1,4.2 -1.5,6.8 4.6,3.8 -3.1,3.7 -5.1,2.9 0,0 -2.5,3.1 2.1,4.4 -3.1,4.9 4.1,2.6 -3.6,3.7 -1.3,5.5 6.9,2.5 1.6,2.7 5.4,6.1 0.7,0 13.9,0 14.6,0 4.8,0 15,0 14.5,0 14.7,0 14.8,0 16.7,0 16.8,0 10.1,0 1.3,-2.4 1.6,0 -0.8,3.4 1,1 3.2,0.4 4.6,1 3.8,1.9 4.4,-0.8 5.3,1.6 0,0 3.2,-2.4 3.2,-1 1.8,-1.5 1.5,-0.8 4,1.2 3.3,0.2 0.8,0.8 0.1,3.5 5.2,1 -1.7,1.7 1.2,1.9 -1.9,2.3 1.8,0.8 -1.9,2.1 0,0 1.2,0.2 1.3,-0.9 0.5,1.4 3.4,0.7 3.8,0.1 3.8,0.6 4,1.2 0.8,2 1.4,4.7 -2.4,2 -3.8,-0.8 -1,-3.8 -0.9,3.9 -3.8,3.4 -0.8,2.9 -1.1,1.7 -4.1,2 0,0 -3.7,3.4 -2,2.2 2.7,0.4 4.5,-2 2.9,-1.7 1.6,-0.3 2.6,0.6 1.7,-0.9 2.8,-0.8 4.7,-0.8 0,0 0,0 0.3,-1.8 -0.3,0.1 -1.7,0.3 -1.8,-0.6 2.3,-2.1 1.9,-0.7 3.9,-0.9 4.6,-0.9 1.8,1.2 1.9,-1.4 1.9,-0.8 0.9,0.4 0.1,0.1 6.7,-4.2 2.7,-1.2 7.7,0 9.3,0 1,-1.6 1.7,-0.3 2.5,-0.9 2.7,-2.8 3.2,-4.9 5.5,-4.7 1.1,1.7 3.7,-1.1 1.5,1.8 -2.8,8.5 2.1,3.5 5.9,-0.8 8.1,-0.2 -10.4,5.1 -1.5,5.2 3.7,0.5 7.1,-4.5 5.8,-2.4 12.2,-3.7 7.5,-4.1 -2.6,-2.2 1,-4.5 -7.1,7 -8.6,0.8 -5.5,-3.1 -0.1,-4.6 0.6,-6.8 6.1,-4.1 -3.3,-3.1 -7.6,0.6 -12.1,5.2 -10.9,8.2 -4.6,1 7.8,-5.7 10.1,-8.3 7.2,-2.7 5.7,-4.4 5.2,-0.5 7.3,0.1 10,1.3 8.6,-1 7.8,-5.1 8.7,-2.2 4.2,-2.1 4.2,-2.3 2,-6.8 -1.1,-2.3 -3.4,-0.8 0,-5.1 -2.3,-1.9 -6.9,-1.6 -2.8,-3.4 -4.8,-3.4 3.4,-3.7 -2,-7.1 -2.6,-7.5 -1,-5.2 -4.3,2.7 -7.4,6.5 -8.1,3.2 -1.6,-3.4 -3.7,-1 2.2,-7.3 2.6,-4.9 -7.7,-0.5 -0.1,-2.2 -3.6,-3.3 -3,-2 -4.5,1.5 -4.2,-0.5 -6.6,-1.6 -3.9,1.3 -3.8,9 -1,5.3 -8.8,6.1 3.1,4.5 0.5,5 -1.7,4 -4.7,4.1 -7.5,4.2 -9,2.8 1.7,3.2 -2.2,9.6 -5.6,6.3 -4.6,1.9 -4.4,-5.8 -0.1,-6.8 1.7,-6 3.6,-5.2 -4.8,-0.6 -7.5,-0.4 -3.6,-2.5 -4.8,-1.6 -1.7,-2.9 -3.3,-2.2 -7,-2.6 -7.1,1.2 0.7,-4.5 1.5,-5.5 -6,-1 4.9,-6.8 4.9,-4.6 9.4,-6.5 8.6,-4.6 5.6,-0.7 2.9,-3.7 5.1,-2.4 6.4,-0.4 7.7,-3.8 2.9,-2.4 7.4,-4.7 3.2,-2.8 3.2,1.7 6.5,-0.9 10.8,-3.8 2.3,-2.7 -0.8,-2.9 5,-2.9 1.7,-2.7 -3.5,-2.6 -5.4,-0.8 -5.5,-0.4 -4.6,5.9 -6.5,4.6 -7.2,4 -1.3,-3.7 4.2,-4 -2.2,-3.5 -8.7,4.2 4.3,-5.5 z m -75.5,-18.9 -2.8,-1 -14.1,3.2 -5.1,2 -7.8,3.9 5.4,1.4 6.2,-0.1 -11.5,2.1 0,1.9 5.6,0.1 9,-0.4 6.5,1.2 -6.2,1 -5.5,-0.3 -7.1,0.9 -3.3,0.6 0.6,4.2 4.2,-0.6 4.1,1.5 -0.3,2.5 7.8,-0.5 11.2,-0.8 9.4,-1.8 5,-0.4 5.7,1.5 6.7,0.8 3.1,-1.9 -0.7,-2.1 7,-0.4 2.6,-2.4 -5,-2.5 -4.2,-2.6 2.4,-3.6 2.7,-5.1 -2.2,-2 -3,-0.9 -4.2,0.8 -2.8,5.3 -4.3,2.1 2.2,-5.1 -1.7,-1.7 -7.3,2.7 -2.6,-2.6 -10.4,1.5 4.7,-2.4 z m 39.1,-1.5 -1.7,-1.1 -5.4,0.2 -2.1,0.7 2.2,3.6 7,-3.4 z m 107.7,1.6 -4.4,-2.8 -8.4,-0.5 -2.1,0.3 -1.7,1.8 2,2.8 0.9,0.3 4.8,-0.7 4.1,0.1 4.1,0.1 0.7,-1.4 z m -39.4,-0.3 5.7,-3.2 -11.2,1.3 -5.8,2.1 -7.1,4.6 -3.3,5.2 5.6,0.1 -6.1,2.3 1.8,1.9 5.9,0.8 7.3,1.5 13.8,1.2 7.9,-0.6 3.2,-1.6 2,1.8 3.3,0.3 2,3.3 -3.5,1.4 7.1,1.8 4.6,2.6 0.5,1.9 -0.4,2.4 -8.6,5.4 -3.2,2.7 0.2,2 -9.2,0.7 -8,0.1 -5.4,4.2 2.4,1.9 13,-0.9 0.9,-1.6 4.7,2.7 4.7,2.9 -2.4,1.6 3.8,2.8 7.6,3.3 10.7,2.3 0.3,-2 -2.8,-3.5 -3.5,-4.9 8.5,4.6 4.7,1.5 3.6,-4.1 0,-5.6 -1,-1.5 -4.4,-2.5 -2.7,-3.3 2.3,-3.2 5.8,-0.7 3.8,5.4 4,2.4 10.7,-6.5 3.3,-3.9 -6.4,-0.3 -3.2,-5.1 -5.9,-1.2 -7.7,-3.5 9,-2.5 -0.8,-5 -2.2,-2.1 -8.3,-2.1 -1.9,-3.3 -8.2,1.2 1.1,-2.3 -3.6,-2.5 -6.8,-2.6 -5.2,2.1 -9,1.5 3.3,-3.4 -2.3,-5.3 -11.6,2.1 -7.1,4.1 -0.3,-3.2 z m -50,-3.4 -7.1,2.4 0.9,3.4 -7.4,-0.7 -1.7,1.7 5.8,3.9 0.9,2 3.4,0.5 8.4,-2 5.1,-4.7 -3.8,-2.2 6,-2.4 0.5,-1.5 -7.5,0.6 -3.5,-1 z m 22.3,5.4 5.6,-1 10,-4.5 -6.1,-1.2 -7.8,-0.2 -5.2,1.4 -4.2,2.1 -2.5,2.6 -1.8,4.5 4.3,0.2 7.7,-3.9 z m -114.7,7.2 2.6,-2.3 9.1,-3.6 13.8,-3.6 6.4,-1.3 -1.6,-2.1 -1.9,-1.5 -9.4,-0.2 -4.1,-1.1 -14,0.8 -0.3,3.1 -7.6,3.3 -7.4,3.8 -4.3,2.2 5.9,2.7 -0.6,2.3 13.4,-2.5 z m 124.1,-18.3 0.3,-1.6 -1.4,-1.7 -6.9,1.3 -4.4,2.2 3.2,1.3 5.1,0.4 4.1,-1.9 z m -8.7,-8.6 -1.1,0.7 -4.8,-0.3 -7.6,1.6 -3.8,-0.1 -4.3,3.8 6.6,-0.4 -3.4,2.9 3.2,0.8 6.8,-0.5 5.8,-3.7 2.8,-2.5 -0.2,-2.3 z m -39.1,2.5 1.8,-2.3 -3.1,-0.5 -5.7,1.7 -0.7,4.7 -6.1,-0.4 -2.8,-2.9 -8.2,-1.6 -5.4,1.4 -11.6,4.8 4.1,0.8 17.8,-0.5 -10.6,2.2 -1.5,1.6 5.9,-0.1 12.2,-2.2 13.8,-0.8 5.1,-2.3 2.3,-2.4 -3.7,-0.2 -4.3,0.8 0.7,-1.8 z m 55.2,-4.3 -7.1,-0.3 -3.8,2 2.6,1.5 7,0.6 1.4,2.1 -2.2,2.4 -1.5,2.8 8.5,1.6 5.5,0.6 8,-0.1 11.6,-0.8 4.3,0.6 6.7,-1 3.5,-1.4 1,-2 -2.3,-1.9 -5.8,-0.3 -8,0.4 -7,1.1 -5.1,-0.4 -4.8,-0.3 -1.2,-1.1 -3.1,-1.1 2.8,-1.9 -1.4,-1.6 -7.3,0.1 -2.3,-1.6 z m -75,-2.6 -6,0.7 -5.5,-0.1 -12.1,3.1 -11.6,3.7 0,0 3.6,1 7,-0.7 9.8,-2.1 3.8,-0.3 5.2,-1.6 5.8,-3.7 z m 80.5,0.6 1,-0.5 -1.5,-0.9 -7.2,-0.1 -0.6,1.3 6.4,0.3 1.9,-0.1 z m -58.4,-0.8 3.2,-1.4 -4.1,-0.8 -5.9,0.5 -5.1,1.5 3.3,1.5 8.6,-1.3 z m 7.8,-4.2 -3.3,-0.9 -1.6,-0.2 -5.7,1.3 -1,0.7 6,0 5.6,-0.9 z m 46.4,2.5 3,-1.7 -2.3,-1.6 -1.7,-0.3 -4.4,-0.1 -2.1,1.8 -0.7,1.8 1.6,1.1 6.6,-1 z m -13.7,-1.2 0.1,-2.2 -7.4,-1.7 -6.1,-0.6 -2.1,1.7 2.8,1.1 -5.3,1.4 7.7,0.2 4,1.5 5.2,0.5 1.1,-1.9 z m 53.7,-6.1 0.6,-2.8 -4.7,-0.8 -4.7,-0.9 -1.6,-2.2 -8.2,0.2 0.3,0.9 -3.9,0.3 -4.1,1.3 -4.9,1.9 -0.3,1.9 2,1.5 6.5,0 -4.3,1.2 -2.1,1.6 1.6,1.9 6.7,0.6 6.8,-0.4 10.5,-3.4 6.4,-1.3 -2.6,-1.5 z m 78.5,-13.8 -7,-0.2 -6.9,-0.3 -10.2,0.6 -1.4,-0.4 -10.3,0.2 -6.4,0.4 -5.1,0.6 -5,2 -2.3,-1 -3.9,-0.2 -6.7,1.4 -7.4,0.6 -4.1,0.1 -6,0.8 -1.1,1.3 2.5,1.2 0.8,1.6 4.4,1.5 12.4,-0.3 7.2,0.5 -7.2,1.5 -2.2,-0.4 -9.3,-0.2 -1.1,2.2 3,1.7 -2.8,1.6 -7.5,1.1 -4.9,1.7 4.8,0.9 1.7,3 -7.5,-2 -2.5,0.3 -2,3.4 -8,1.1 -2,2.3 6.7,0.3 4.9,0.6 11.7,-0.8 8.4,1.4 12.6,-3 1,-1.1 -6.4,0.2 0.5,-1.1 6.5,-1.4 3.6,-1.9 6.8,-1.3 5,-1.6 -0.8,-2.2 3.3,-0.8 -4.3,-0.6 11.1,-0.4 3.2,-0.9 7.9,-0.8 9.3,-3.5 6.8,-1.1 10.3,-2.5 -7.4,0 3.9,-0.9 9,-0.8 9.7,-1.6 1.1,-1.1 -5.2,-1 -6.7,-0.4 -8.5,-0.3 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CH" data-name="Switzerland" data-id="CH" d="m 1024.3,270.6 -5.4,-1.9 -1,1.4 -4.2,0 -1.3,1 -2.3,-0.6 0.2,1.6 -3.5,3.5 0,2.8 2.4,-0.9 1.8,2.7 2.2,1.3 2.4,-0.3 2.7,-2.1 0.9,1 2.4,-0.2 0.9,-2.5 3.8,0.8 2.1,-1.1 0.3,-2.5 -2.6,-0.2 -2.3,-1.1 0.7,-1.6 -0.2,-1.1 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="CL" data-name="Chile" data-id="CL" d="m 648.4,905.2 -3.7,-0.7 -3.3,2.5 0.2,4.1 -1.2,2.8 -7.2,-2.2 -8.6,-4 -4.5,-1.3 9.7,6.8 6.3,3.2 7.5,3.4 5.3,0.9 4.3,1.8 3,0.5 2.3,0.1 3.2,-1.8 0.5,-2.4 -2.9,-0.2 -5,0 -5.9,-13.5 z m -47.3,-196.3 -3.7,-7.1 1.1,-6.2 -3.2,-2.7 -1.2,-4.6 -3.1,-4.3 -1.2,3.3 -2.7,1.6 2.1,9 1.5,10.4 -0.1,14.2 0,13.2 0.9,12.3 -1.9,7.8 2.1,7.8 -0.5,5.3 3.2,9.5 -0.1,9.5 -1.2,10.2 -0.6,10.5 -2.1,0.2 2.4,7.3 3.3,6.3 -1.1,4.3 1.9,11.6 1.5,8.8 3.5,0.9 -1.1,-7.7 4,1.6 1.8,12.7 -6.4,-2.1 2,10.2 -2.7,5.5 8.2,1.8 -3.4,4.8 0.2,6 5,10.6 4.2,4.1 0.2,3.6 3.3,3.8 7.5,3.5 0,0 7.4,4.2 6.2,2 2,-0.1 -1.8,-5.7 3.4,-2.2 1.7,-1.5 4.2,0 -4.8,-0.9 -12,-0.8 -3.5,-3.6 -1.8,-4.6 -3.1,0.4 -2.6,-2.2 -3.1,-6.6 2.7,-2.7 0.1,-3.9 -1.8,-3.2 0.7,-5.3 -1.1,-8.2 -1.8,-3.7 1.8,-1.1 -1.3,-2.3 -2.8,-1.3 0.8,-2.6 -3.1,-2.3 -3.6,-7.1 1.6,-1.2 -3.3,-7.6 -0.7,-6.4 -0.3,-5.7 2.5,-2.4 -3.3,-6.3 -1.5,-5.9 2.9,-4.3 -1.4,-5.4 1.6,-6.2 -1.3,-5.9 -1.6,-1.2 -4.9,-10.9 2.1,-6.5 -1.7,-6.2 0.9,-5.8 2.6,-5.9 3.2,-4 -2,-2.5 0.9,-2 -1.6,-10.6 5.6,-3.2 1.1,-6.6 -0.9,-1.6 -3.8,0.9 -3.1,-8.8 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CN" data-name="China" data-id="CN" d="m 1587.2,453.3 0.6,-3.6 2,-2.8 -1.6,-2.5 -3.2,-0.1 -5.8,1.8 -2.2,2.8 1,5.5 4.9,2 4.3,-3.1 z m 13.2,-196.5 -6.1,-6.1 -4.4,-3.7 -3.8,-2.7 -7.7,-6.1 -5.9,-2.3 -8.5,-1.8 -6.2,0.2 -5.1,1.1 -1.7,3 3.7,1.5 2.5,3.3 -1.2,2 0.1,6.5 1.9,2.7 -4.4,3.9 -7.3,-2.3 0.6,4.6 0.3,6.2 2.7,2.6 2.4,-0.8 5.4,1 2.5,-2.3 5.1,2 7.2,4.3 0.7,2.2 -4.3,-0.7 -6.8,0.8 -2.4,1.8 -1.4,4.1 -6.3,2.4 -3.1,3.3 -5.9,-1.3 -3.2,-0.5 -0.4,4 2.9,2.3 1.9,2.1 -2.5,2 -1.9,3.3 -4.9,2.2 -7.5,0.2 -7.2,2.2 -4.4,3.3 -3.2,-2 -6.2,0.1 -9.3,-3.8 -5.5,-0.9 -6.4,0.8 -11.2,-1.3 -5.5,0.1 -4.7,-3.6 -4.9,-5.7 -3.4,-0.7 -7.9,-3.8 -7.2,-0.9 -6.4,-1 -3,-2.7 -1.3,-7.3 -5.8,-5 -8.1,-2.3 -5.7,-3.3 -3.3,-4.4 -1.7,0.5 -1.8,4.2 -3.8,0.6 2.5,6.2 -1.6,2.8 -10.7,-2 1,11.1 -2,1.4 -9,2.4 8.7,10.7 -2.9,1.6 1.7,3.5 -0.2,1.4 -6.8,3.4 -1,2.4 -6.4,0.8 -0.6,4 -5.7,-0.9 -3.2,1.2 -4,3 1.1,1.5 -1,1.5 3,5.9 1.6,-0.6 3.5,1.4 0.6,2.5 1.8,3.7 1.4,1.9 4.7,3 2.9,5 9.4,2.6 7.6,7.5 0.8,5.2 3,3.3 0.6,3.3 -4.1,-0.9 3.2,7 6.2,4 8.5,4.4 1.9,-1.5 4.7,2 6.4,4.1 3.2,0.9 2.5,3.1 4.5,1.2 5,2.8 6.4,1.5 6.5,0.6 3,-1.4 1.5,5.1 2.6,-4.8 2.6,-1.6 4.2,1.5 2.9,0.1 2.7,1.8 4.2,-0.8 3.9,-4.8 5.3,-4 4.9,1.5 3.2,-2.6 3.5,3.9 -1.2,2.7 6.1,0.9 3,-0.4 2.7,3.7 2.7,1.5 1.3,4.9 0.8,5.3 -4.1,5.3 0.7,7.5 5.6,-1 2.3,5.8 3.7,1.3 -0.8,5.2 4.5,2.4 2.5,1.2 3.8,-1.8 0.6,2.6 0.7,1.5 2.9,0.1 -1.9,-7.2 2.7,-1 2.7,-1.5 4.3,0 5.3,-0.7 4.1,-3.4 3,2.4 5.2,1.1 -0.2,3.7 3,2.6 5.9,1.6 2.4,-1 7.7,2 -0.9,2.5 2.2,4.6 3,-0.4 0.8,-6.7 5.6,-0.9 7.2,-3.2 2.5,-3.2 2.3,2.1 2.8,-2.9 6.1,-0.7 6.6,-5.3 6.3,-5.9 3.3,-7.6 2.3,-8.4 2.1,-6.9 2.8,-0.5 -0.1,-5.1 -0.8,-5.1 -3.8,-2 -2.5,-3.4 2.8,-1.7 -1.6,-4.7 -5.4,-4.9 -5.4,-5.8 -4.6,-6.3 -7.1,-3.5 0.9,-4.6 3.8,-3.2 1,-3.5 6.7,-1.8 -2.4,-3.4 -3.4,-0.2 -5.8,-2.5 -3.9,4.6 -4.9,-1.9 -1.5,-2.9 -4.7,-1 -4.7,-4.4 1.2,-3 5,-0.3 1.2,-4.1 3.6,-4.4 3.4,-2.2 4.4,3.3 -1.9,4.2 2.3,2.5 -1.4,3 4.8,-1.8 2.4,-2.9 6.3,-1.9 2.1,-4 3.8,-3.4 1,-4.4 3.6,2 4.6,0.2 -2.7,-3.3 6.3,-2.6 -0.1,-3.5 5.5,3.6 0,0 -1.9,-3.1 2.5,-0.1 -3.8,-7.3 -4.7,-5.3 2.9,-2.2 6.8,1.1 -0.6,-6 -2.8,-6.8 0.4,-2.3 -1.3,-5.6 -6.9,1.8 -2.6,2.5 -7.5,0 -6,-5.8 -8.9,-4.5 -9.9,-1.9 z" style="fill-rule: evenodd; fill: url(&quot;#china&quot;); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="CI" data-name="Côte d'Ivoire" data-id="CI" d="m 946.5,506.2 -2.3,0.9 -1.3,0.8 -0.9,-2.7 -1.6,0.7 -1,-0.1 -1,1.9 -4.3,-0.1 -1.6,-1 -0.7,0.6 -1.1,0.5 -0.5,2.2 1.3,2.6 1.3,5.1 -2,0.8 -0.6,0.9 0.4,1.2 -0.3,2.8 -0.9,0 -0.3,1.8 0.6,3.1 -1.2,2.8 1.6,1.8 1.8,0.4 2.3,2.7 0.2,2.5 -0.5,0.8 -0.5,5.2 1.1,0.2 5.6,-2.4 3.9,-1.8 6.6,-1.1 3.6,-0.1 3.9,1.3 2.6,-0.1 0.2,-2.5 -2.4,-5.5 1.5,-7.2 2.3,-5.3 -1.4,-9.1 -3.8,-1.6 -2.7,0.2 -1.9,1.6 -2.5,-1.3 -1,-2.1 -2.5,-1.4 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="CM" data-name="Cameroon" data-id="CM" d="m 1060.1,502.9 0.2,-4.3 -0.5,-4.2 -2.2,-4.1 -1.6,0.4 -0.2,2 2.3,2.6 -0.6,1.1 -0.3,2.1 -4.6,5 -1.5,4 -0.7,3.3 -1.2,1.4 -1.1,4.5 -3,2.6 -0.8,3.2 -1.2,2.6 -0.5,2.6 -3.9,2.2 -3.2,-2.6 -2.1,0.1 -3.3,3.7 -1.6,0.1 -2.7,6.1 -1.4,4.5 0,1.8 1.4,0.9 1.1,2.8 2.6,1.1 2.2,4.2 -0.8,5 9.2,0.2 2.6,-0.4 3.4,0.8 3.4,-0.8 0.7,0.3 7.1,0.3 4.5,1.7 4.5,1.5 0.4,-3.5 -0.6,-1.8 -0.3,-2.9 -2.6,-2.1 -2.1,-3.2 -0.5,-2.3 -2.6,-3.3 0.4,-1.9 -0.6,-2.7 0.4,-5 1.4,-1.1 2.7,-6.5 0.9,-1.7 -1.8,-4.4 -0.8,-2.6 -2.5,-1.1 -3.3,-3.7 1.2,-3 2.5,0.6 1.6,-0.4 3.1,0.1 -3.1,-5.8 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CD" data-name="Democratic Republic Congo" data-id="CD" d="m 1124.9,539.4 -4.3,-0.7 -2,0.6 -0.9,1.5 -1.8,0.2 -2.2,-1.3 -6.2,3.1 -2.6,-0.6 -0.8,0.5 -1.6,3.8 -4.2,-1.2 -4.1,-0.6 -3.6,-2.4 -4.6,-2.1 -3,2 -2.2,3.2 -0.5,4.5 -0.3,3.8 -1.6,3.4 -1.1,4 -0.7,5.6 0.3,3.6 -0.9,2.2 -0.2,2.4 -0.6,2 -3.7,3.1 -2.6,3.2 -2.5,6.2 0.2,5.3 -1.4,2 -3.3,3.1 -3.4,4 -2,-1.1 -0.4,-1.8 -3.1,-0.1 -1.9,2.4 -1.5,-0.6 -2,1.3 -0.9,1.7 -0.2,2.7 -1.5,0.7 0.8,2 2.3,-0.9 1.7,0.1 1.9,-0.7 16.6,0.1 1.3,4.7 1.6,3.8 1.3,2.1 2.1,3.3 3.7,-0.5 1.9,-0.9 3,0.9 0.9,-1.6 1.5,-3.7 3.4,-0.3 0.3,-1.1 2.9,0 -0.5,2.3 6.8,0 0,4 1.2,2.4 -0.9,3.8 0.3,4 1.9,2.3 -0.5,7.6 1.4,-0.6 2.4,0.2 3.5,-1 2.6,0.4 1.9,0.1 0.3,2 2.6,-0.1 3.5,0.6 1.8,2.8 4.5,0.9 3.4,-2 1.2,3.4 4.3,0.8 2,2.8 2.1,3.5 4.3,0 -0.3,-6.9 -1.5,1.2 -3.9,-2.5 -1.4,-1.1 0.8,-6.4 1.2,-7.5 -1.2,-2.8 1.6,-4.1 1.6,-0.7 7.5,-1.1 1,0.3 0.2,-1.1 -1.5,-1.7 -0.7,-3.5 -3.4,-3.5 -1.8,-4.5 1,-2.7 -1.5,-3.6 1.1,-10.2 0.1,0.1 -0.1,-1.1 -1.4,-2.9 0.6,-3.5 0.8,-0.4 0.2,-3.8 1.6,-1.8 0.1,-4.8 1.3,-2.4 0.3,-5.1 1.2,-3 2.1,-3.3 2.2,-1.7 1.8,-2.3 -2.3,-0.8 0.3,-7.5 0,0 -5,-4.2 -1.4,-2.7 -3.1,1.3 -2.6,-0.4 -1.5,1.1 -2.5,-0.8 -3.5,-5.2 -1.8,0.6 -3.6,-0.1 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="CG" data-name="Congo" data-id="CG" d="m 1080.3,549.9 -3.6,-0.4 -3.8,-1.1 -3.3,3.4 -2.9,5.9 -0.4,3.5 -4.5,-1.5 -4.5,-1.7 -7.1,-0.3 -0.4,2.8 1.5,3.3 4.2,-0.5 1.4,1.2 -2.4,7.4 2.7,3.8 0.6,4.9 -0.8,4.3 -1.7,3 -4.9,-0.3 -3,-3 -0.5,2.8 -3.8,0.8 -1.9,1.6 2.1,4.2 -4.3,3.5 4.6,6.7 2.2,-2.7 1.8,-1.1 2,2.2 1.5,0.6 1.9,-2.4 3.1,0.1 0.4,1.8 2,1.1 3.4,-4 3.3,-3.1 1.4,-2 -0.2,-5.3 2.5,-6.2 2.6,-3.2 3.7,-3.1 0.6,-2 0.2,-2.4 0.9,-2.2 -0.3,-3.6 0.7,-5.6 1.1,-4 1.6,-3.4 0.3,-3.8 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CO" data-name="Colombia" data-id="CO" d="m 578.3,497.2 1.2,-2.1 -1.3,-1.7 -2,-0.4 -2.9,3.1 -2.3,1.4 -4.6,3.2 -4.3,-0.5 -0.5,1.3 -3.6,0.1 -3.3,3 -1.4,5.4 -0.1,2.1 -2.4,0.7 -4.4,4.4 -2.9,-0.2 -0.7,0.9 1.1,3.8 -1.1,1.9 -1.8,-0.5 -0.9,3.1 2.2,3.4 0.6,5.4 -1.2,1.6 1.1,5.9 -1.2,3.7 2,1.5 -2.2,3.3 -2.5,4 -2.8,0.4 -1.4,2.3 0.2,3.2 -2.1,0.5 0.8,2 5.6,3.6 1,-0.1 1.4,2.7 4.7,0.9 1.6,-1 2.8,2.1 2.4,1.5 1.5,-0.6 3.7,3 1.8,3 2.7,1.7 3.4,6.7 4.2,0.8 3,-1.7 2.1,1.1 3.3,-0.6 4.4,3 -3.5,6.5 1.7,0.1 2.9,3.4 2.2,-17.4 0.1,-2.8 -0.9,-3.6 -2.5,-2.4 0,-4.6 3.2,-1 1.1,0.6 0.2,-2.4 -3.3,-0.7 0,-3.9 10.9,0.1 1.9,-2.2 1.6,2 1,3.8 1.1,-0.8 -1.7,-6.4 -1.4,-2.2 -2,-1.4 2.9,-3.1 -0.2,-1.5 -1.5,-1.9 -1,-4.2 0.5,-4.6 1.3,-2.1 1.2,-3.4 -2,-1.1 -3.2,0.7 -4,-0.3 -2.3,0.7 -3.8,-5.5 -3.2,-0.8 -7.2,0.6 -1.3,-2.2 -1.3,-0.6 -0.2,-1.3 0.8,-2.4 -0.4,-2.5 -1.1,-1.4 -0.6,-2.9 -2.9,-0.5 1.8,-3.7 0.9,-4.5 1.8,-2.4 2.2,-1.8 1.6,-3.2 3.7,-1.1 z" style="fill-rule: evenodd; fill: url('#colombia');"></path>
    <path inkscape:connector-curvature="0" id="CR" data-name="Costa Rica" data-id="CR" d="m 509.1,502.6 -1.4,1.3 -1.7,-0.4 -0.8,-1.3 -1.7,-0.5 -1.4,0.8 -3.5,-1.7 -0.9,0.8 -1.4,1.2 1.5,0.9 -0.9,2 -0.1,2 0.7,1.3 1.7,0.6 1.2,1.8 1.2,-1.6 -0.3,-1.8 1.4,1.1 0.3,1.9 1.9,0.8 2.1,1.3 1.5,1.5 0.1,1.4 -0.7,1.1 1.1,1.3 2.9,1.4 0.4,-1.2 0.5,-1.3 -0.1,-1.2 0.8,-0.7 -1.1,-1 0.1,-2.5 2.2,-0.6 -2.4,-2.7 -2,-2.6 -1.2,-3.4 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CU" data-name="Cuba" data-id="CU" d="m 539,427.3 -4.9,-2.1 -4.3,-0.1 -4.7,-0.5 -1.4,0.7 -4.2,0.6 -3,1.3 -2.7,1.4 -1.5,2.3 -3.1,2 2.2,0.6 2.9,-0.7 0.9,-1.6 2.3,-0.1 4.4,-3.3 5.4,0.3 -2.3,1.6 1.8,1.3 7,1 1.5,1.3 4.9,1.7 3.2,-0.2 0.8,3.6 1.7,1.8 3.5,0.4 2.1,1.7 -4.1,3.5 7.9,-0.6 3.8,0.5 3.7,-0.3 3.8,-0.8 0.8,-1.5 -3.9,-2.6 -4,-0.3 0.6,-1.7 -3.1,-1.3 -1.9,0 -3,-2.8 -4.2,-4 -1.8,-1.5 -5.2,0.8 -1.9,-2.4 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CZ" data-name="Czech Republic" data-id="CZ" d="m 1049.4,248.5 -2.1,0.6 -1.4,-0.7 -1.1,1.2 -3.4,1.2 -1.7,1.5 -3.4,1.3 1,1.9 0.7,2.6 2.6,1.5 2.9,2.6 3.8,2 2.6,-2.5 1.7,-0.5 4,1.9 2.3,-0.3 2.3,1.2 0.6,-1.4 2.2,0.1 1.6,-0.6 0.1,-0.6 0.9,-0.3 0.2,-1.4 1.1,-0.3 0.6,-1.1 1.5,0 -2.6,-3.1 -3.6,-0.3 -0.7,-2 -3.4,-0.6 -0.6,1.5 -2.7,-1.2 0.1,-1.7 -3.7,-0.6 -2.4,-1.9 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="DE" data-name="Germany" data-id="DE" d="m 1043.6,232.3 -2.4,-1.9 -5.5,-2.4 -2.5,1.7 -4.7,1.1 -0.1,-2.1 -4.9,-1.4 -0.2,-2.3 -3,0.9 -3.6,-0.8 0.4,3.4 1.2,2.2 -3,3 -1,-1.3 -3.9,0.3 -0.9,1.3 1,2 -1,5.6 -1.1,2.3 -2.9,0 1.1,6.4 -0.4,4.2 1,1.4 -0.2,2.7 2.4,1.6 7.1,1.2 -2.3,4.2 -0.5,4.5 4.2,0 1,-1.4 5.4,1.9 1.5,-0.3 2.6,1.7 0.6,-1.6 4.4,0.3 3.4,-1.2 2.4,0.2 1.7,1.3 0.4,-1.1 -1,-4 1.7,-0.8 1.5,-2.9 -2.9,-2.6 -2.6,-1.5 -0.7,-2.6 -1,-1.9 3.4,-1.3 1.7,-1.5 3.4,-1.2 1.1,-1.2 1.4,0.7 2.1,-0.6 -2.3,-3.9 0.1,-2.1 -1.4,-3.3 -2,-2.2 1.2,-1.6 -1.4,-3.1 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="DJ" data-name="Djibouti" data-id="DJ" d="m 1217.8,499.2 -2.5,-1.7 3.1,-1.5 0.1,-2.7 -1.4,-1.9 -1.6,1.5 -2.4,-0.5 -1.9,2.8 -1.8,3 0.5,1.7 0.2,2 3.1,0.1 1.3,-0.5 1.3,1.1 2,-3.4 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="DK" data-name="Denmark" data-id="DK" d="m 1035.9,221.2 -1.7,-3 -6.7,2 0.9,2.5 5.1,3.4 2.4,-4.9 z m -8.6,-5.1 -2.6,-0.9 -0.7,-1.6 1.3,-2 -0.1,-3 -3.6,1.6 -1.5,1.7 -4,0.4 -1.2,1.7 -0.7,1.6 0.4,6.1 2.1,3.4 3.6,0.8 3,-0.9 -1.5,-3 3.1,-4.3 1.4,0.7 1,-2.3 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="DO" data-name="Dominican Republic" data-id="DO" d="m 579.6,457.4 0,1.8 1.4,1 2.6,-4.4 2,-0.9 0.6,1.6 2.2,-0.4 1.1,-1.2 1.8,0.3 2.6,-0.2 2.5,1.3 2.3,-2.6 -2.5,-2.3 -2.4,-0.2 0.3,-1.9 -3,0.1 -0.8,-2.2 -1.4,0.1 -3.1,-1.6 -4.4,-0.1 -0.8,1.1 0.2,3.5 -0.7,2.4 -1.5,1.1 1.2,1.9 -0.2,1.8 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="DZ" data-name="Algeria" data-id="DZ" d="m 1021,336.9 -3.6,0.4 -2.2,-1.5 -5.6,0 -4.9,2.6 -2.7,-1 -8.7,0.5 -8.9,1.2 -5,2 -3.4,2.6 -5.7,1.2 -5.1,3.5 2,4.1 0.3,3.9 1.8,6.7 1.4,1.4 -1,2.5 -7,1 -2.5,2.4 -3.1,0.5 -0.3,4.7 -6.3,2.5 -2.1,3.2 -4.4,1.7 -5.4,1 -8.9,4.7 -0.1,7.5 0,0.4 -0.1,1.2 20.3,15.5 18.4,13.9 18.6,13.8 1.3,3 3.4,1.8 2.6,1.1 0.1,4 6.1,-0.6 7.8,-2.8 15.8,-12.5 18.6,-12.2 -2.5,-4 -4.3,-2.9 -2.6,1.2 -2,-3.6 -0.2,-2.7 -3.4,-4.7 2.1,-2.6 -0.5,-4 0.6,-3.5 -0.5,-2.9 0.9,-5.2 -0.4,-3 -1.9,-5.6 -2.6,-11.3 -3.4,-2.6 0,-1.5 -4.5,-3.8 -0.6,-4.8 3.2,-3.6 1.1,-5.3 -1,-6.2 1,-3.3 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="EC" data-name="Ecuador" data-id="EC" d="m 553.1,573.1 -2.4,-1.5 -2.8,-2.1 -1.6,1 -4.7,-0.9 -1.4,-2.7 -1,0.1 -5.6,-3.6 -3.9,2.5 -3.1,1.4 0.4,2.6 -2.2,4.1 -1,3.9 -1.9,1 1,5.8 -1.1,1.8 3.4,2.7 2.1,-2.9 1.3,2.8 -2.9,4.7 0.7,2.7 -1.5,1.5 0.2,2.3 2.3,-0.5 2.3,0.7 2.5,3.2 3.1,-2.6 0.9,-4.3 3.3,-5.5 6.7,-2.5 6,-6.7 1.7,-4.1 -0.8,-4.9 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="EG" data-name="Egypt" data-id="EG" d="m 1129.7,374.8 -5.5,-1.9 -5.3,-1.7 -7.1,0.2 -1.8,3 1.1,2.7 -1.2,3.9 2,5.1 1.3,22.7 1,23.4 22.1,0 21.4,0 21.8,0 -1,-1.3 -6.8,-5.7 -0.4,-4.2 1,-1.1 -5.3,-7 -2,-3.6 -2.3,-3.5 -4.8,-9.9 -3.9,-6.4 -2.8,-6.7 0.5,-0.6 4.6,9.1 2.7,2.9 2,2 1.2,-1.1 1.2,-3.3 0.7,-4.8 1.3,-2.5 -0.7,-1.7 -3.9,-9.2 0,0 -2.5,1.6 -4.2,-0.4 -4.4,-1.5 -1.1,2.1 -1.7,-3.2 -3.9,-0.8 -4.7,0.6 -2.1,1.8 -3.9,2 -2.6,-1 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="ER" data-name="Eritrea" data-id="ER" d="m 1198.1,474 -3.2,-3.1 -1.8,-5.9 -3.7,-7.3 -2.6,3.6 -4,1 -1.6,2 -0.4,4.2 -1.9,9.4 0.7,2.5 6.5,1.3 1.5,-4.7 3.5,2.9 3.2,-1.5 1.4,1.3 3.9,0.1 4.9,2.5 1.6,2.2 2.5,2.1 2.5,3.7 2,2.1 2.4,0.5 1.6,-1.5 -2.8,-1.9 -1.9,-2.2 -3.2,-3.7 -3.2,-3.6 -7.9,-6 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="EE" data-name="Estonia" data-id="EE" d="m 1093.2,197.5 -5.5,0.9 -5.4,1.6 0.9,3.4 3.3,2.1 1.5,-0.8 0.1,3.5 3.7,-1 2.1,0.7 4.4,2.2 3.8,0 1.6,-1.9 -2.5,-5.5 2.6,-3.4 -0.9,-1 0,0 -4.6,0.2 -5.1,-1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ET" data-name="Ethiopia" data-id="ET" d="m 1187.6,477 -1.5,4.7 -6.5,-1.3 -0.7,5.5 -2.1,6.2 -3.2,3.2 -2.3,4.8 -0.5,2.6 -2.6,1.8 -1.4,6.7 0,0.7 0.2,5 -0.8,2 -3,0.1 -1.8,3.6 3.4,0.5 2.9,3.1 1,2.5 2.6,1.5 3.5,6.9 2.9,1.1 0,3.6 2,2.1 3.9,0 7.2,5.4 1.8,0 1.3,-0.1 1.2,0.7 3.8,0.5 1.6,-2.7 5.1,-2.6 2.3,2.1 3.8,0 1.5,-2 3.6,-0.1 4.9,-4.5 7.4,-0.3 15.4,-19.1 -4.8,0.1 -18.5,-7.6 -2.2,-2.2 -2.1,-3.1 -2.2,-3.5 1.1,-2.3 -1.3,-1.1 -1.3,0.5 -3.1,-0.1 -0.2,-2 -0.5,-1.7 1.8,-3 1.9,-2.8 -2,-2.1 -2.5,-3.7 -2.5,-2.1 -1.6,-2.2 -4.9,-2.5 -3.9,-0.1 -1.4,-1.3 -3.2,1.5 -3.5,-2.9 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="FI" data-name="Finland" data-id="FI" d="m 1093.4,144.4 0.8,-3.8 -5.7,-2.1 -5.8,1.8 -1.1,3.9 -3.4,2.4 -4.7,-1.3 -5.3,0.3 -5.1,-2.9 -2.1,1.4 5.9,2.7 7.2,3.7 1.7,8.4 1.9,2.2 6.4,2.6 0.9,2.3 -2.6,1.2 -8.7,6.1 -3.3,3.6 -1.5,3.3 2.9,5.2 -0.1,5.7 4.7,1.9 3.1,3.1 7.1,-1.2 7.5,-2.1 8,-0.5 0,0 7.9,-7.4 3.3,-3.3 0.9,-2.9 -7.3,-3.9 0.9,-3.7 -4.9,-4.1 1.7,-4.8 -6.4,-6.3 2.8,-4.1 -7.2,-3.7 -0.4,-3.7 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path id="FJ" data-name="Fiji" data-id="FJ" d="m 1976.7,674.4 -3.7,2 -1.9,0.3 -3.1,1.3 0.2,2.4 3.9,-1.3 3.9,-1.6 0.7,-3.1 z m -11,8.1 -1.6,1 -2.3,-0.8 -2.7,2.2 -0.2,2.8 2.9,0.8 3.6,-0.9 1.8,-3.3 -1.5,-1.8 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);" inkscape:connector-curvature="0"></path>
    <path inkscape:connector-curvature="0" id="GA" data-name="Gabon" data-id="GA" d="m 1050.2,557.7 -0.7,-0.3 -3.4,0.8 -3.4,-0.8 -2.6,0.4 0,7.6 -8.2,0 -1.9,0.3 -1.1,4.8 -1.3,4.6 -1.3,2 -0.2,2.1 3.4,6.6 3.7,5.3 5.8,6.4 4.3,-3.5 -2.1,-4.2 1.9,-1.6 3.8,-0.8 0.5,-2.8 3,3 4.9,0.3 1.7,-3 0.8,-4.3 -0.6,-4.9 -2.7,-3.8 2.4,-7.4 -1.4,-1.2 -4.2,0.5 -1.5,-3.3 0.4,-2.8 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="GB" data-name="United Kingdom" data-id="GB" d="m 950,227.5 -4.9,-3.7 -3.9,0.3 0.8,3.2 -1.1,3.2 2.9,-0.1 3.5,1.3 2.7,-4.2 z m 13,-24.3 -5.5,0.5 -3.6,-0.4 -3.7,4.8 -1.9,6.1 2.2,3 0.1,5.8 2.6,-2.8 1.4,1.6 -1.7,2.7 1,1.6 5.7,1.1 0.1,0 3.1,3.8 -0.8,3.5 0,0 -7.1,-0.6 -1,4 2.6,3.3 -5.1,1.9 1.3,2.4 7.5,1 0,0 -4.3,1.3 -7.3,6.5 2.5,1.2 3.5,-2.3 4.5,0.7 3.3,-2.9 2.2,1.2 8.3,-1.7 6.5,0.1 4.3,-3.3 -1.9,-3.1 2.4,-1.8 0.5,-3.9 -5.8,-1.2 -1.3,-2.3 -2.9,-6.9 -3.2,-1 -4.1,-7.1 -0.4,-0.6 -4.8,-0.4 4.2,-5.3 1.3,-4.9 -5,0 -4.7,0.8 5,-6.4 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GE" data-name="Georgia" data-id="GE" d="m 1200,300.2 -7.5,-2.9 -7.7,-1 -4.5,-1.1 -0.5,0.7 2.2,1.9 3,0.7 3.4,2.3 2.1,4.2 -0.3,2.7 5.4,-0.3 5.6,3 6.9,-1 1.1,-1 4.2,1.8 2.8,0.4 0.6,-0.7 -3.2,-3.4 1.1,-0.9 -3.5,-1.4 -2.1,-2.5 -5.1,-1.3 -2.9,1 -1.1,-1.2 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GH" data-name="Ghana" data-id="GH" d="m 976.8,502.1 -2.6,-0.5 -1.8,1 -2.4,-0.5 -9.7,0.3 -0.2,3.6 0.8,4.8 1.4,9.1 -2.3,5.3 -1.5,7.2 2.4,5.5 -0.2,2.5 5,1.8 5,-1.9 3.2,-2.1 8.7,-3.8 -1.2,-2.2 -1.5,-4 -0.4,-3.2 1.2,-5.7 -1.4,-2.3 -0.6,-5.1 0.1,-4.6 -2.4,-3.3 0.4,-1.9 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="GN" data-name="Guinea" data-id="GN" d="m 912.4,493 -0.8,0.4 -3,-0.5 -0.4,0.7 -1.3,0.1 -4,-1.5 -2.7,-0.1 -0.1,2.1 -0.6,0.7 0.4,2.1 -0.8,0.9 -1.3,0 -1.4,1 -1.7,-0.1 -2.6,3.1 1.6,1.1 0.8,1.4 0.7,2.8 1.3,1.2 1.5,0.9 2.1,2.5 2.4,3.7 3,-2.8 0.7,-1.7 1,-1.4 1.5,-0.2 1.3,-1.2 4.5,0 1.5,2.3 1.2,2.7 -0.2,1.8 0.9,1.7 0,2.3 1.5,-0.3 1.2,-0.2 1.5,-0.7 2.3,3.9 -0.4,2.6 1.1,1.3 1.6,0.1 1.1,-2.6 1.6,0.2 0.9,0 0.3,-2.8 -0.4,-1.2 0.6,-0.9 2,-0.8 -1.3,-5.1 -1.3,-2.6 0.5,-2.2 1.1,-0.5 -1.7,-1.8 0.3,-1.9 -0.7,-0.7 -1.2,0.6 0.2,-2.1 1.2,-1.6 -2.3,-2.7 -0.6,-1.7 -1.3,-1.4 -1.1,-0.2 -1.3,0.9 -1.8,0.8 -1.6,1.4 -2.4,-0.5 -1.5,-1.6 -0.9,-0.2 -1.5,0.8 -0.9,0 -0.3,-2.3 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GM" data-name="Gambia" data-id="GM" d="m 882.8,488.5 5,0.1 1.4,-0.9 1,0 2.1,-1.5 2.4,1.4 2.4,0.1 2.4,-1.5 -1.1,-1.8 -1.8,1.1 -1.8,-0.1 -2.1,-1.5 -1.8,0.1 -1.3,1.5 -6.1,0.2 -0.7,2.8 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GW" data-name="Guinea-Bissau" data-id="GW" d="m 900.2,492.1 -10.3,-0.3 -1.5,0.7 -1.8,-0.2 -3,1.1 0.3,1.3 1.7,1.4 0,0.9 1.2,1.8 2.4,0.5 2.9,2.6 2.6,-3.1 1.7,0.1 1.4,-1 1.3,0 0.8,-0.9 -0.4,-2.1 0.6,-0.7 0.1,-2.1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GQ" data-name="Equatorial Guinea" data-id="GQ" d="m 1040.1,557.8 -9.2,-0.2 -1.9,7.2 1,0.9 1.9,-0.3 8.2,0 0,-7.6 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GR" data-name="Greece" data-id="GR" d="m 1101.9,344.9 -0.8,2.8 6.6,1.2 0,1.1 7.6,-0.6 0.5,-1.9 -2.8,0.8 0,-1.1 -3.9,-0.5 -4.1,0.4 -3.1,-2.2 z m 11.5,-37.4 -2.7,-1.6 0.3,3 -4.6,0.6 -3.9,-2.1 -3.9,1.7 -3.8,-0.2 -1,0.2 -0.7,1.1 -2.8,-0.1 -1.9,1.3 -3.3,0.6 0,1.6 -1.6,0.9 -0.1,2.1 -2.1,3 0.5,1.9 2.9,3.6 2.3,3 1.3,4.3 2.3,5.1 4.6,2.9 3.4,-0.1 -2.4,-5.7 3.3,-0.7 -1.9,-3.3 5,1.7 -0.4,-3.7 -2.7,-1.8 -3.2,-3 1.8,-1.4 -2.8,-3 -1.6,-3.8 0.9,-1.3 3,3.2 2.9,0 2.5,-1 -3.9,-3.6 6.1,-1.6 2.7,0.6 3.2,0.2 1.1,-0.7 1.2,-3.9 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="GL" data-name="Greenland" data-id="GL" d="m 887.4,76.3 -26,-0.4 -11.8,0.3 -5,1.3 -11.5,-0.1 -12.7,2.1 -1.6,1.7 6.7,2.1 -6.2,-1.3 -4.5,-0.3 -7,-1.4 -10.6,2.1 -2.7,-1.2 -10.4,0 -10.9,0.6 -8.9,1 -0.2,1.8 -5.3,0.5 -14.6,2.9 -4.6,1.7 8.1,1.5 -2.8,1.6 -14.9,2.2 -15.5,2.2 -2.2,1.7 6.4,2 14.5,1.2 -7.5,0.2 -10.9,1.5 3.8,3.1 3,1.5 9.4,-0.3 10.1,-0.2 7.6,0.3 8,2.9 -1.4,2.1 3.6,1.9 1.4,5.3 1,3.6 1.4,1.9 -7,4.8 2.6,1.3 4.4,-0.8 2.6,1.8 5.3,3.4 -7.5,-1.4 -3.8,0 -3,2.8 -1.5,3.6 4.2,1.8 4,-0.8 2.6,-0.8 5.5,-1.9 -2.8,4.2 -2.6,2.3 -7.1,2 -7,6.3 2,2 -3.4,4 3.7,5.2 -1.5,5 0.7,3.7 4.8,7.1 0.8,5.6 3.1,3.2 8.9,0 5,4.7 6.5,-0.3 4.1,-5.7 3.5,-4.8 -0.3,-4.4 8.6,-4.6 3.3,-3.7 1.4,-3.9 4.7,-3.5 6.5,-1.3 6.1,-1.4 3,-0.2 10.2,-3.9 7.4,-5.7 4.8,-2.1 4.6,-0.1 12.5,-1.8 12.1,-4.3 11.9,-4.6 -5.5,-0.3 -10.6,-0.2 5.3,-2.8 -0.5,-3.6 4.2,3 2.7,2.1 7.3,-1 -0.6,-4.3 -4.5,-3.1 -5,-1.3 2.4,-1.4 7.2,2.1 0.5,-2.3 -4.1,-3.4 5.4,0 5.6,-0.8 1.7,-1.8 -4,-2.1 8.6,-0.3 -4,-4.3 4.1,-0.5 0.1,-4.2 -6.2,-2.5 6.4,-1.6 5.8,-0.1 -3.6,-3.2 1.1,-5.1 3.6,-2.9 4.9,-3.2 -8,-0.2 11.3,-0.7 2.2,-1 14.6,-2.9 -1.6,-1.7 -10,-0.8 -16.9,1.5 -9.2,1.5 4.5,-2.3 -2.3,-1.4 -7,1.2 -9.7,-1.4 -12.1,0.5 -1.4,-0.7 18.3,-0.4 12.9,-0.2 6.6,-1.4 -19.7,-2.9 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GT" data-name="Guatemala" data-id="GT" d="m 482.8,458.9 -5.1,-0.1 -5.2,0 -0.4,3.6 -2.6,0 1.8,2.1 1.9,1.5 0.5,1.4 0.8,0.4 -0.4,2.1 -7.1,0 -3.3,5.2 0.7,1.2 -0.8,1.5 -0.4,1.9 2.7,2.6 2.5,1.3 3.4,0.1 2.8,1.1 0.2,-1 2.1,-1.6 1.1,-0.7 -0.2,-0.7 1.4,-0.4 1.3,-1.6 -0.3,-1.3 0.5,-1.2 2.8,-1.8 2.8,-2.4 -1.5,-0.8 -0.6,0.9 -1.7,-1.1 -1.6,0 1.2,-7.2 0.7,-5 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GY" data-name="Guyana" data-id="GY" d="m 656.1,534.2 -2.1,-2.3 -2.9,-3.1 -2.1,-0.1 -0.1,-3.3 -3.3,-4.1 -3.6,-2.4 -4.6,3.8 -0.6,2.3 1.9,2.3 -1.5,1.2 -3.4,1.1 0,2.9 -1.6,1.8 3.7,4.8 2.9,-0.3 1.3,1.5 -0.8,2.8 1.9,0.9 1.2,3 -1.6,2.2 -1,5.4 1.4,3.3 0.3,2.9 3.5,3 2.7,0.3 0.7,-1.3 1.7,-0.2 2.6,-1.1 1.8,-1.7 3.1,0.5 1.4,-0.2 -3.3,-5.6 -0.7,-3.5 -1.8,-0.1 -2.4,-4.6 1.1,-3.3 -0.3,-1.5 3.5,-1.6 1,-5.7 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="HN" data-name="Honduras" data-id="HN" d="m 514.1,476.8 -1.3,-1.8 -1.9,-1 -1.5,-1.4 -1.6,-1.2 -0.8,-0.1 -2.5,-0.9 -1.1,0.5 -1.5,0.2 -1.3,-0.4 -1.7,-0.4 -0.8,0.7 -1.8,0.7 -2.6,0.2 -2.5,-0.6 -0.9,0.4 -0.5,-0.6 -1.6,0.1 -1.3,1.1 -0.6,-0.2 -2.8,2.4 -2.8,1.8 -0.5,1.2 0.3,1.3 -1.3,1.6 1.5,0.5 1.1,1.3 1.6,1 0.1,0.9 2.5,-0.8 1.1,0.5 0.7,0.7 -0.6,2.5 1.7,0.6 0.7,2 1.8,-0.3 0.8,-1.5 0.8,0 0.2,-3.1 1.3,-0.2 1.2,0 1.4,-1.7 1.5,1.3 0.6,-0.8 1.1,-0.7 2.1,-1.8 0.3,-1.3 0.5,0.1 0.8,-1.5 0.6,-0.2 0.9,0.9 1.1,0.3 1.3,-0.8 1.4,0 2,-0.8 0.9,-0.9 1.9,0.2 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="HR" data-name="Croatia" data-id="HR" d="m 1065,280.4 -4,-2.6 -1.6,-0.8 -3.9,1.7 -0.3,2.5 -1.7,0.6 0.2,1.7 -2,-0.1 -1.8,-1 -0.8,1 -3.5,-0.2 -0.2,0.1 0,2.2 1.7,2 1.3,-2.6 3.3,1 0.3,2 2.5,2.6 -1,0.5 4.6,4.5 4.8,1.8 3.1,2.2 5,2.3 0,0 0.5,-1 -4.7,-2.4 -2.2,-2.5 -2,-1.4 -2.5,-2.3 -1.3,-1.9 -2.7,-2.9 0.9,-2.5 1.9,1.4 1,-1.3 2.3,-0.1 4.4,1 3.5,-0.1 2.4,1.4 0,0 1.7,-2.3 -1.7,-1.8 -1.5,-2.4 0,0 -1.8,0.9 -4.2,-1.2 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="HT" data-name="Haiti" data-id="HT" d="m 580.6,446.7 -4.6,-1 -3.4,-0.2 -1.4,1.7 3.4,1 -0.3,2.4 2.2,2.8 -2.1,1.4 -4.2,-0.5 -5,-0.9 -0.7,2.1 2.8,1.9 2.7,-1.1 3.3,0.4 2.7,-0.4 3.6,1.1 0.2,-1.8 -1.2,-1.9 1.5,-1.1 0.7,-2.4 -0.2,-3.5 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="HU" data-name="Hungary" data-id="HU" d="m 1079.1,263.8 -1.6,0.4 -1,1.5 -2.2,0.7 -0.6,-0.4 -2.3,1 -1.9,0.2 -0.3,1.2 -4.1,0.8 -1.9,-0.7 -2.6,-1.6 -0.2,2.6 -2.8,0 1.1,1.3 -1.3,4 0.8,0.1 1.2,2.1 1.6,0.8 4,2.6 4.2,1.2 1.8,-0.9 0,0 3.7,-1.6 3.2,0.2 3.8,-1.1 2.6,-4.3 1.9,-4.2 2.9,-1.3 -0.6,-1.6 -2.9,-1.7 -1,0.6 -5.5,-1.9 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ID" data-name="Indonesia" data-id="ID" d="m 1651.9,637.3 0.5,-1.7 -1.8,-1.9 -2.8,-2 -5.3,1.3 7,4.4 2.4,-0.1 z m 20.9,-0.6 4,-4.8 0.1,-1.9 -0.5,-1.3 -5.7,2.6 -2.8,3.9 -0.7,2.1 0.6,0.8 5,-1.4 z m -35.6,-13 -1.6,2.2 -3.1,0.1 -2.2,3.6 3,0.1 3.9,-0.9 6.6,-1.2 -1.2,-2.8 -3.5,0.6 -1.9,-1.7 z m 28.1,0 -5.2,2.3 -3.8,0.5 -3.4,-1.9 -4.5,1.3 -0.2,2.3 7.4,0.8 8.6,-1.8 1.1,-3.5 z m -79.5,-8.4 -0.7,-2.3 -2.3,-0.5 -4.4,-2.4 -6.8,-0.4 -4.1,6.1 5.1,0.4 0.8,2.8 10,2.6 2.4,-0.8 4.1,0.6 6.3,2.4 5.2,1.2 5.8,0.5 5.1,-0.2 5.9,2.5 6.6,-2.4 -6.6,-3.8 -8.3,-1.1 -1.8,-4.1 -10.3,-3.1 -1.3,2.6 -10.7,-0.6 z m 146.6,-3.6 0.2,-3 -1.2,-1.9 -1.3,2.2 -1.2,2.2 0.3,4.8 3.2,-4.3 z m -41,-17.5 -1.4,-2.1 -5.7,0.3 1,2.7 3.9,1.2 2.2,-2.1 z m 18.1,-2.4 -6.1,-1.8 -6.9,0.3 -1.5,3.5 3.9,0.2 3.2,-0.4 4.6,0.5 4.7,2.6 -1.9,-4.9 z m 21,-12.3 -0.8,-2.4 -9,-2.6 -2.9,2.1 -7.6,1.5 2.3,3.2 5,1.2 2.1,3.7 8.3,0.1 0.4,1.6 -4,-0.1 -6.2,2.3 4.2,3.1 -0.1,2.8 1.2,2.3 2.1,-0.5 1.8,-3.1 8.2,5.9 4.6,0.5 10.6,5.4 2.3,5.3 1,6.9 -3.7,1.8 -2.8,5.2 7.1,-0.2 1.6,-1.8 5.5,1.3 4.6,5.2 1.5,-20.8 1,-20.7 -6,-1.2 -4.1,-2.3 -4.7,-2.2 -5,0 -6.6,3.8 -4.9,6.8 -5.7,-3.8 -1.3,-10.3 z m -50,-16.4 -1,-1.4 -5.5,4.6 -6.5,0.3 -7.1,-0.9 -4.4,-1.9 -4.7,4.8 -1.2,2.6 -2.9,9.6 -0.9,5 -2.4,4.2 1.6,4.3 2.3,0.1 0.6,6.1 -1.9,5.9 2.3,1.9 3.6,-1 0.3,-9.1 -0.2,-7.4 3.8,-1.9 -0.7,6.2 3.9,3.7 -0.8,2.5 1.3,1.7 5.6,-2.4 -3,5.2 2.1,2.2 3.1,-1.9 0.3,-4.1 -4.7,-7.4 1.1,-2.2 -5.1,-8.1 5,-2.5 2.6,-3.7 2.4,0.9 0.5,-2.9 -10.5,2.1 -3.1,2.9 -5,-5.6 0.9,-4.8 4.9,-1 9.3,-0.3 5.4,1.3 4.3,-1.3 4.4,-6.3 z m 19.4,1.9 -0.6,-2.6 -3.3,-0.6 -0.5,-3.5 -1.8,2.3 -1,5.1 1.7,8.2 2.2,4 1.6,-0.8 -2.3,-3.3 0.9,-3.9 2.9,0.6 0.2,-5.5 z m -60.9,-4.5 0.9,-2.9 -4.3,-6 3,-5.8 -5,-1 -6.4,0 -1.7,7.2 -2,2.2 -2.7,8.9 -4.5,1.3 -5.4,-1.8 -2.7,0.6 -3.2,3.2 -3.6,-0.4 -3.6,1.2 -3.9,-3.5 -1,-4.3 -3.3,4.2 -0.6,5.9 0.8,5.6 2.6,5.4 2.8,1.8 0.7,8.5 4.6,0.8 3.6,-0.4 2,3.1 6.7,-2.3 2.8,2 4,0.4 2,3.9 6.5,-2.9 0.8,2.3 2.5,-9.7 0.3,-6.4 5.5,-4.3 -0.2,-5.8 1.8,-4.3 6.7,-0.8 -6.5,-5.9 z m -68.7,48.9 0.7,-9.8 1.7,-8 -2.6,-4 -4.1,-0.5 -1.9,-3.6 -0.9,-4.4 -2,-0.2 -3.2,-2.2 2.3,-5.2 -4.3,-2.9 -3.3,-5.3 -4.8,-4.4 -5.7,-0.1 -5.5,-6.8 -3.2,-2.7 -4.5,-4.3 -5.2,-6.2 -8.8,-1.2 -3.6,-0.3 0.6,3.2 6.1,7 4.4,3.6 3.1,5.5 5.1,4 2.2,4.9 1.7,5.5 4.9,5.3 4.1,8.9 2.7,4.8 4.1,5.2 2.2,3.8 7,5.2 4.5,5.3 6.2,-0.1 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="IN" data-name="India" data-id="IN" d="m 1414.1,380.1 -8.5,-4.4 -6.2,-4 -3.2,-7 4.1,0.9 -0.6,-3.3 -3,-3.3 -0.8,-5.2 -7.6,-7.5 -3.7,5.4 -5.7,1 -8.5,-1.6 -1.9,2.8 3.2,5.6 2.9,4.3 5,3.1 -3.7,3.7 1,4.5 -3.9,6.3 -2.1,6.5 -4.5,6.7 -6.4,-0.5 -4.9,6.6 4,2.9 1.3,4.9 3.5,3.2 1.8,5.5 -12,0 -3.2,4.2 7.1,5.4 1.9,2.5 -2.4,2.3 8,7.7 4,0.8 7.6,-3.8 1.7,5.9 0.8,7.8 2.5,8.1 3.6,12.3 5.8,8.8 1.3,3.9 2,8 3.4,6.1 2.2,3 2.5,6.4 3.1,8.9 5.5,6 2.2,-1.8 1.7,-4.4 5,-1.8 -1.8,-2.1 2.2,-4.8 2.9,-0.3 -0.7,-10.8 1.9,-6.1 -0.7,-5.3 -1.9,-8.2 1.2,-4.9 2.5,-0.3 4.8,-2.3 2.6,-1.6 -0.3,-2.9 5,-4.2 3.7,-4 5.3,-7.5 7.4,-4.2 2.4,-3.8 -0.9,-4.8 6.6,-1.3 3.7,0.1 0.5,-2.4 -1.6,-5.2 -2.6,-4.8 0.4,-3.8 -3.7,-1.7 0.8,-2.3 3.1,-2.4 -4.6,-3.4 1.2,-4.3 4.8,2.7 2.7,0.4 1.2,4.4 5.4,0.9 5,-0.1 3.4,1.1 -1.6,5.3 -2.4,0.4 -1.1,3.6 3.5,3.3 0.2,-4 1.5,-0.1 4.5,10.1 2.4,-1.5 -0.9,-2.7 0.9,-2.1 -0.9,-6.6 4.6,1.4 1.5,-5.2 -0.3,-3.1 2.1,-5.4 -0.9,-3.6 6.1,-4.4 4.1,1.1 -1.3,-3.9 1.6,-1.2 -0.9,-2.4 -6.1,-0.9 1.2,-2.7 -3.5,-3.9 -3.2,2.6 -4.9,-1.5 -5.3,4 -3.9,4.8 -4.2,0.8 2.7,2 0.4,3.9 -4.4,0.2 -4.7,-0.4 -3.2,1 -5.5,-2.5 -0.3,-1.2 -1.5,-5.1 -3,1.4 0.1,2.7 1.5,4.1 -0.1,2.5 -4.6,0.1 -6.8,-1.5 -4.3,-0.6 -3.8,-3.2 -7.6,-0.9 -7.7,-3.5 -5.8,-3.1 -5.7,-2.5 0.9,-5.9 2.8,-2.9 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="IE" data-name="Ireland" data-id="IE" d="m 947.3,231.7 -3.5,-1.3 -2.9,0.1 1.1,-3.2 -0.8,-3.2 -3.7,2.8 -6.7,4.7 2.1,6.1 -4.2,6.4 6.7,0.9 8.7,-3.6 3.9,-5.4 -0.7,-4.3 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="IR" data-name="Iran" data-id="IR" d="m 1213.5,324.4 -3.2,-2.9 -1.2,-2.4 -3.3,1.8 2.9,7.3 -0.7,2 3.7,5.2 0,0 4.7,7.8 3.7,1.9 1,3.8 -2.3,2.2 -0.5,5 4.6,6.1 7,3.4 3.5,4.9 -0.2,4.6 1.7,0 0.5,3.3 3.4,3.4 1.7,-2.5 3.7,2.1 2.8,-1 5.1,8.4 4.3,6.1 5.5,1.8 6.1,4.9 6.9,2.1 5.1,-3.1 4,-1.1 2.8,1.1 3.2,7.8 6.3,0.8 6.1,1.5 10.5,1.9 1.2,-7.4 7.4,-3.3 -0.9,-2.9 -2.7,-1 -1,-5.7 -5.6,-2.7 -2.8,-3.9 -3.2,-3.3 3.9,-5.8 -1.1,-4 -4.3,-1.1 -1.1,-4 -2.7,-5.1 1.6,-3.5 -2.5,-0.9 0.5,-4.7 0.5,-8 -1.6,-5.5 -3.9,-0.2 -7.3,-5.7 -4.3,-0.7 -6.5,-3.3 -3.8,-0.6 -2.1,1.2 -3.5,-0.2 -3,3.7 -4.4,1.2 -0.2,1.6 -7.9,1.7 -7.6,-1.1 -4.3,-3.3 -5.2,-1.3 -2.5,-4.8 -1.3,0.3 -3.8,-3.4 1.2,-3.1 -1.9,-1.9 -1.9,0.5 -5.3,4.7 -1.8,0.2 -3.7,-0.9 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="IQ" data-name="Iraq" data-id="IQ" d="m 1207.3,334.9 -6.2,-0.9 -2.1,1 -2.1,4.1 -2.7,1.6 1.2,4.7 -0.9,7.8 -11,6.7 3.1,7.7 6.7,1.7 8.5,4.5 16.7,12.7 10.2,0.5 3.2,-6.1 3.7,0.5 3.2,0.4 -3.4,-3.4 -0.5,-3.3 -1.7,0 0.2,-4.6 -3.5,-4.9 -7,-3.4 -4.6,-6.1 0.5,-5 2.3,-2.2 -1,-3.8 -3.7,-1.9 -4.7,-7.8 0,0 -2.3,1.1 -2.1,-1.6 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="IS" data-name="Iceland" data-id="IS" d="m 915.7,158.6 -6.9,-0.4 -7.3,2.9 -5.1,-1.5 -6.9,3 -5.9,-3.8 -6.5,0.8 -3.6,3.7 8.7,1.3 -0.1,1.6 -7.8,1.1 8.8,2.7 -4.6,2.5 11.7,1.8 5.6,0.8 3.9,-1 12.9,-3.9 6.1,-4.2 -4.4,-3.8 1.4,-3.6 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="IL" data-name="Israel" data-id="IL" d="m 1167.8,360.5 -1.4,0.1 -0.4,1.1 -1.8,0 -0.1,0.1 -0.6,1.6 -0.6,4.8 -1.1,2.9 0.4,0.4 -1.4,2.1 0,0 3.9,9.2 0.7,1.7 1.7,-10.2 -0.4,-2.4 -2.4,0.8 0.1,-1.7 1.2,-0.8 -1.4,-0.7 0.7,-4.3 2,0.9 0.7,-2 -0.1,0 0.6,-1 -0.3,-2.6 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="IT" data-name="Italy" data-id="IT" d="m 1057.8,328.6 -4,0.5 -5.2,0.7 -6.2,-0.6 -0.6,3.4 7.5,3.3 2.7,0.7 4.2,2.4 0.9,-3.3 -0.9,-2 1.6,-5.1 z m -33.7,-18.9 -2.5,1.9 -2.8,-0.3 1.3,3.6 0.4,7.6 2.1,1.7 2,-2.1 2.4,0.4 0.4,-8.4 -3.3,-4.4 z m 14.3,-34.3 -1.3,-2.2 -4.8,1.1 -0.5,1.2 -3.1,-0.9 -0.3,2.5 -2.1,1.1 -3.8,-0.8 -0.9,2.5 -2.4,0.2 -0.9,-1 -2.7,2.1 -2.4,0.3 -2.2,-1.3 -0.2,1.7 1.6,2.4 -1.7,1.8 1.5,4.8 2.7,0.8 -0.5,2.7 2.1,-0.5 2.8,-2.8 2.3,-0.9 4.2,2.1 2.6,0.7 1.9,6 3.6,3.6 4.9,4 4.2,2.8 3.9,0.4 2.3,2.5 3.4,1.2 1.7,2.7 2.2,0.8 1.8,3.2 2.3,3.7 -1.1,1.3 -0.8,3.5 0.1,2 2.1,-0.5 2.5,-5.6 2.1,-0.4 0.4,-3.3 -3.9,-2.3 1.9,-4.1 4.5,1 3.1,3 0.8,-2.3 -0.6,-1.2 -4.7,-3.2 -3.9,-1.9 -4.8,-2.3 1.4,-1.2 -1.4,-1.4 -4,0.1 -6,-5 -2.9,-5.1 -4.9,-3.1 -1.9,-3.1 0.5,-1.8 -0.4,-3 3.9,-2.2 4.1,0.9 -1.4,-2.7 0.3,-3 -7.2,-1.6 z" style="fill-rule: evenodd; fill: url(&quot;#italy&quot;); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="JM" data-name="Jamaica" data-id="JM" d="m 550.7,458.5 3.9,-0.1 -0.8,-1.8 -2.7,-1.5 -3.7,-0.6 -1.2,-0.2 -2.4,0.4 -0.8,1.5 2.9,2.3 3,1 1.8,-1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="JO" data-name="Jordan" data-id="JO" d="m 1186.6,367.6 -3.1,-7.7 -9.6,6.7 -6.3,-2.5 -0.7,2 0.4,3.9 -0.6,1.9 0.4,2.4 -1.7,10.2 0.3,0.9 6.1,1 2.1,-2 1.1,-2.3 4,-0.8 0.7,-2.2 1.7,-1 -6.1,-6.4 10.4,-3.1 0.9,-1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="JP" data-name="Japan" data-id="JP" d="m 1692.5,354.9 -4.5,-1.3 -1.1,2.7 -3.3,-0.8 -1.3,3.8 1.2,3 4.2,1.8 -0.1,-3.7 2.1,-1.5 3.1,2.1 1.3,-3.9 -1.6,-2.2 z m 24.4,-19.3 -3.6,-6.7 1.3,-6.4 -2.8,-5.2 -8.1,-8.7 -4.8,1.2 0.2,3.9 5.1,7.1 1,7.9 -1.7,2.5 -4.5,6.5 -5,-3.1 0,11.5 -6.3,-1.3 -9.6,1.9 -1.9,4.4 -3.9,3.3 -1.1,4 -4.3,2 4,4.3 4.1,1.9 0.9,5.7 3.5,2.5 2.5,-2.7 -0.8,-10.8 -7.3,-4.7 6.1,-0.1 5,-3 8.6,-1.4 2.4,4.8 4.6,2.4 4.4,-7.3 9.1,-0.4 5.4,-3 0.6,-4.6 -2.5,-3.2 -0.6,-5.2 z m -11.8,-44.2 -5.3,-2.1 -10.4,-6.4 1.9,4.8 4.3,8.5 -5.2,0.4 0.6,4.7 4.6,6.1 5.7,0 -1.6,-6.8 10.8,4.2 0.4,-6.1 6.4,-1.7 -6,-6.9 -1.7,2.6 -4.5,-1.3 z" style="fill-rule: evenodd; fill: url('#japan');"></path>
    <path inkscape:connector-curvature="0" id="KZ" data-name="Kazakhstan" data-id="KZ" d="m 1308.8,223.8 -9,-1.3 -3.1,2.5 -10.8,2.2 -1.7,1.5 -16.8,2.1 -1.4,2.1 5,4.1 -3.9,1.6 1.5,1.7 -3.6,2.9 9.4,4.2 -0.2,3 -6.9,-0.3 -0.8,1.8 -7.3,-3.2 -7.6,0.2 -4.3,2.5 -6.6,-2.4 -11.9,-4.3 -7.5,0.2 -8.1,6.6 0.7,4.6 -6,-3.6 -2.1,6.8 1.7,1.2 -1.7,4.7 5.3,4.3 3.6,-0.2 4.2,4.1 0.2,3.2 2.8,1 4.4,-1.3 5,-2.7 4.7,1.5 4.9,-0.3 1.9,3.9 0.6,6 -4.6,-0.9 -4,1 0.9,4.5 -5,-0.6 0.6,2 3.2,1.6 3.7,5.5 6.4,2.1 1.5,2.1 -0.7,2.6 0.7,1.5 1.8,-2 5.5,-1.3 3.8,1.7 4.9,4.9 2.5,-0.3 -6.2,-22.8 11.9,-3.6 1.1,0.5 9.1,4.5 4.8,2.3 6.5,5.5 5.7,-0.9 8.6,-0.5 7.5,4.5 1.5,6.2 2.5,0.1 2.6,5 6.6,0.2 2.3,3 1.9,0 0.9,-4.5 5.4,-4.3 2.5,-1.2 0.3,-2.7 3.1,-0.8 9.1,2.1 -0.5,-3.6 2.5,-1.3 8.1,2.6 1.6,-0.7 8.6,0.2 7.8,0.6 3.3,2.2 3.5,0.9 -1.7,-3.5 2.9,-1.6 -8.7,-10.7 9,-2.4 2,-1.4 -1,-11.1 10.7,2 1.6,-2.8 -2.5,-6.2 3.8,-0.6 1.8,-4.2 -4.3,-3.8 -6,0.9 -3.3,-2.6 -3.9,-1.2 -4.1,-3.6 -3.2,-1.1 -6.2,1.6 -8.3,-3.6 -1.1,3.3 -18.1,-15.5 -8.3,-4.7 0.8,-1.9 -9.1,5.7 -4.4,0.4 -1.2,-3.3 -7,-2.1 -4.3,1.5 -4.3,-6.3 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="KE" data-name="Kenya" data-id="KE" d="m 1211.7,547.2 -3.8,0 -2.3,-2.1 -5.1,2.6 -1.6,2.7 -3.8,-0.5 -1.2,-0.7 -1.3,0.1 -1.8,0 -7.2,-5.4 -3.9,0 -2,-2.1 0,-3.6 -2.9,-1.1 -3.8,4.2 -3.4,3.8 2.7,4.4 0.7,3.2 2.6,7.3 -2.1,4.7 -2.7,4.2 -1.6,2.6 0,0.3 1.4,2.4 -0.4,4.7 20.2,13 0.4,3.7 8,6.3 2.2,-2.1 1.2,-4.2 1.8,-2.6 0.9,-4.5 2.1,-0.4 1.4,-2.7 4,-2.5 -3.3,-5.3 -0.2,-23.2 4.8,-7.2 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="KG" data-name="Kyrgyzstan" data-id="KG" d="m 1387.2,302.6 -3.5,-0.9 -3.3,-2.2 -7.8,-0.6 -8.6,-0.2 -1.6,0.7 -8.1,-2.6 -2.5,1.3 0.5,3.6 -9.1,-2.1 -3.1,0.8 -0.3,2.7 1.8,0.6 -3.1,4.1 4.6,2.3 3.2,-1.6 7.1,3.3 -5.2,4.5 -4.1,-0.6 -1.4,2 -5.9,-1.1 0.6,3.7 5.4,-0.5 7.1,2 9.5,-0.9 1,-1.5 -1.1,-1.5 4,-3 3.2,-1.2 5.7,0.9 0.6,-4 6.4,-0.8 1,-2.4 6.8,-3.4 0.2,-1.4 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="KH" data-name="Cambodia" data-id="KH" d="m 1574.8,481.8 -5.2,-2.3 -2,4.3 -4.9,-2.4 -5.3,-1 -7.1,1.3 -3,5.2 2.1,7.7 3.4,6.6 2.6,3.3 4.7,0.9 4.7,-2.5 5.8,-0.5 -2.8,-3.8 8.9,-4.9 -0.1,-7.7 -1.8,-4.2 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="KR" data-name="Korea" data-id="KR" d="m 1637.3,331.7 6.2,5.5 -3.4,1.1 5.2,6.8 1.1,4.8 2.1,3.5 4.5,-0.5 3.2,-2.7 4.2,-1.2 0.5,-3.6 -3.4,-7.5 -3.3,-4.2 -8.2,-7.6 0.1,1.6 -2.1,0.4 -3.5,0.3 -0.7,2.9 -2.4,-0.2 -0.1,0.6 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="KW" data-name="Kuwait" data-id="KW" d="m 1235.6,381.4 -3.7,-0.5 -3.2,6.1 4.9,0.6 1.7,3.1 3.8,-0.2 -2.4,-4.8 0.3,-1.5 -1.4,-2.8 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LA" data-name="Lao PDR" data-id="LA" d="m 1574.8,481.8 0.2,-6.4 -2,-4.5 -4.8,-4.4 -4.3,-5.6 -5.7,-7.5 -7.3,-3.8 1.3,-2.3 3.3,-1.7 -3,-5.5 -6.8,-0.1 -3.4,-5.7 -4,-5.1 -2.7,1 1.9,7.2 -2.9,-0.1 -0.7,-1.5 -4.1,4.1 -0.8,2.4 2.6,1.9 0.9,3.8 3.8,0.3 -0.4,6.7 1,5.7 5.3,-3.8 1.8,1.2 3.2,-0.2 0.8,-2.2 4.3,0.4 4.9,5.2 1.3,6.3 5.2,5.5 0.5,5.4 -1.5,2.9 4.9,2.4 2,-4.3 5.2,2.3 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="LB" data-name="Lebanon" data-id="LB" d="m 1167.8,360.5 0.9,-3.5 2.6,-2.4 -1.2,-2.5 -2.4,-0.3 -0.1,0.2 -2.1,4.5 -1.3,5.2 1.8,0 0.4,-1.1 1.4,-0.1 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LR" data-name="Liberia" data-id="LR" d="m 929.4,523.3 -1.6,-0.2 -1.1,2.6 -1.6,-0.1 -1.1,-1.3 0.4,-2.6 -2.3,-3.9 -1.5,0.7 -1.2,0.2 -2.6,3 -2.6,3.4 -0.3,1.9 -1.3,2 3.7,4.1 4.8,3.5 5.1,4.8 5.7,3.1 1.5,-0.1 0.5,-5.2 0.5,-0.8 -0.2,-2.5 -2.3,-2.7 -1.8,-0.4 -1.6,-1.8 1.2,-2.8 -0.6,-3.1 0.3,-1.8 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LY" data-name="Libya" data-id="LY" d="m 1111.8,371.4 -1.5,-2.1 -5.4,-0.8 -1.8,-1.1 -2,0 -2,-2.8 -7.3,-1.3 -3.6,0.8 -3.7,3 -1.5,3.1 1.5,4.8 -2.4,3 -2.5,1.6 -5.9,-3.1 -7.7,-2.7 -4.9,-1.2 -2.8,-5.7 -7.2,-2.8 -4.5,-1.1 -2.2,0.6 -6.4,-2.2 -0.1,4.9 -2.6,1.8 -1.5,2 -3.7,2.5 0.7,2.6 -0.4,2.7 -2.6,1.4 1.9,5.6 0.4,3 -0.9,5.2 0.5,2.9 -0.6,3.5 0.5,4 -2.1,2.6 3.4,4.7 0.2,2.7 2,3.6 2.6,-1.2 4.3,2.9 2.5,4 8.8,2.8 3.1,3.5 3.9,-2.4 5.4,-3.5 22.3,12.2 22.4,12.2 0,-2.7 6.3,0 -0.5,-12.7 -1,-23.4 -1.3,-22.7 -2,-5.1 1.2,-3.9 -1.1,-2.7 1.8,-3 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LK" data-name="Sri Lanka" data-id="LK" d="m 1432.2,532.7 2.3,-1.8 0.6,-6.6 -3,-6.6 -2.9,-4.5 -4.1,-3.5 -1.9,10.3 1.4,9.1 2.8,5.1 4.8,-1.5 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="LS" data-name="Lesotho" data-id="LS" d="m 1128.1,766.5 1.1,-2 3.1,-1 1.1,-2.1 1.9,-3.1 -1.7,-1.9 -2.3,-2 -2.6,1.3 -3.1,2.5 -3.2,4 3.7,4.9 2,-0.6 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LT" data-name="Lithuania" data-id="LT" d="m 1100.4,221.2 -5,-2.9 -2.5,-0.4 -0.9,-1.3 -4.4,0.6 -7.9,-0.4 -5,1.9 1.7,5 5,1.1 2.2,0.9 -0.2,1.7 0.6,1.5 2.5,0.6 1.4,1.9 4.6,0 4.8,-2.2 0.5,-3.4 3.5,-2 -0.9,-2.6 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="LU" data-name="Luxembourg" data-id="LU" d="m 1007,258.6 0.2,-2.7 -1,-1.4 -1.3,0.2 -0.4,3.5 1.1,0.5 1.4,-0.1 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LV" data-name="Latvia" data-id="LV" d="m 1102.1,210.1 -3.8,0 -4.4,-2.2 -2.1,-0.7 -3.7,1 -0.2,4.6 -3.6,0.1 -4.4,-4.5 -4,2.1 -1.7,3.7 0.5,4.5 5,-1.9 7.9,0.4 4.4,-0.6 0.9,1.3 2.5,0.4 5,2.9 2.6,-1 4.6,-2.3 -2.1,-3.6 -1,-2.8 -2.4,-1.4 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MA" data-name="Morocco" data-id="MA" d="m 965.2,348.4 -2.3,-0.1 -5.5,-1.4 -5,0.4 -3.1,-2.7 -3.9,0 -1.8,3.9 -3.7,6.7 -4,2.6 -5.4,2.9 -3.5,4.3 -0.9,3.4 -2.1,5.4 1.1,7.9 -4.7,5.3 -2.7,1.7 -4.4,4.4 -5.1,0.7 -2.8,2.4 -0.1,0.1 -3.6,6.5 -3.7,2.3 -2.1,4 -0.2,3.3 -1.6,3.8 -1.9,1 -3.1,4 -2,4.5 0.3,2.2 -1.9,3.3 -2.2,1.7 -0.3,3 0.1,0 12.4,-0.5 0.7,-2.3 2.3,-2.9 2,-8.8 7.8,-6.8 2.8,-8.1 1.7,-0.4 1.9,-5 4.6,-0.7 1.9,0.9 2.5,0 1.8,-1.5 3.4,-0.2 -0.1,-3.4 0,0 0.8,0 0.1,-7.5 8.9,-4.7 5.4,-1 4.4,-1.7 2.1,-3.2 6.3,-2.5 0.3,-4.7 3.1,-0.5 2.5,-2.4 7,-1 1,-2.5 -1.4,-1.4 -1.8,-6.7 -0.3,-3.9 -2,-4.1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MD" data-name="Moldova" data-id="MD" d="m 1118.5,283.3 1.2,-0.7 0.5,-2.1 1.1,-2 -0.5,-1.1 1,-0.5 0.6,0.9 3,0.2 1.2,-0.5 -1,-0.6 0.2,-1 -2,-1.5 -1.1,-2.6 -1.9,-1.1 0,-2.1 -2.5,-1.6 -2,-0.3 -3.9,-1.9 -3.2,0.6 -1.1,0.9 1.6,0.6 1.8,1.9 1.9,2.6 3.4,3.7 0.6,2.7 -0.2,2.7 1.3,2.8 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="MG" data-name="Madagascar" data-id="MG" d="m 1255.7,658.4 -1.1,-4.2 -1.4,-2.7 -1.8,-2.7 -2,2.8 -0.3,3.8 -3.3,4.5 -2.3,-0.8 0.6,2.7 -1.8,3.2 -4.8,3.9 -3.4,3.7 -2.4,0 -2.2,1.2 -3.1,1.3 -2.8,0.2 -1,4.1 -2.2,3.5 0.1,5.9 0.8,4 1.1,3 -0.8,4.1 -2.9,4.8 -0.2,2.1 -2.6,1.1 -1.3,4.6 0.2,4.6 1.6,5 -0.1,5.7 1.2,3.3 4.2,2.3 3,1.7 5,-2.7 4.6,-1.5 3.1,-7.4 2.8,-8.9 4.3,-12 3.3,-8.8 2.7,-7.4 0.8,-5.4 1.6,-1.5 0.7,-2.7 -0.8,-4.7 1.2,-1.9 1.6,3.8 1.1,-1.9 0.8,-3.1 -1.3,-2.9 -0.5,-7.7 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MX" data-name="Mexico" data-id="MX" d="m 444.4,407.8 -3.6,-1.4 -3.9,-2 -0.8,-3 -0.2,-4.5 -2.4,-3.6 -1,-3.7 -1.6,-4.4 -3.1,-2.5 -4.4,0.1 -4.8,5 -4,-1.9 -2.2,-1.9 -0.4,-3.5 -0.8,-3.3 -2.4,-2.8 -2.1,-2 -1.3,-2.2 -9.3,0 -0.8,2.6 -4.3,0 -10.7,0 -10.7,-4.4 -7.1,-3.1 1,-1.3 -7,0.7 -6.3,0.5 0.2,5.7 0.7,5.1 0.7,4.1 0.8,4 2.6,1.8 2.9,4.5 -1,2.9 -2.7,2.3 -2.1,-0.3 -0.6,0.5 2.3,3.7 2.9,1.5 1,1.7 0.9,-0.9 3.1,2.9 2.1,2 0.1,3.4 -1.2,4.7 2.5,1.6 3.3,3.1 2.9,3.6 0.7,3.9 1,0 2.7,-2.3 0.4,-1.2 -1.5,-2.8 -1.6,-2.9 -2.6,-0.2 0.4,-3.4 -0.9,-3 -1,-2.8 -0.5,-5.9 -2.6,-3.2 -0.6,-2.3 -1.2,-1.6 0,-4.1 -1,0.1 -0.1,-2.2 -0.7,-0.5 -0.4,-1.4 -2.7,-4.4 -1.1,-2.6 1,-4.8 0.1,-3 1.8,-2.6 2.4,1.7 1.9,-0.2 3.1,2.5 -0.9,2.4 0.4,4.9 1.5,4.7 -0.4,2 1.7,3.1 2.3,3.4 2.7,0.5 0.3,4.4 2.4,3.1 2.5,1.5 -1.8,4 0.7,1.5 4.1,2.6 1.9,4 4.5,4.9 3.8,6.4 1.3,3.2 0,2.5 1.4,2.9 -0.3,2.2 -1.6,1.6 0.3,1.8 -1.9,0.7 0.8,3.1 2.2,4 5.3,3.6 1.9,2.9 5.4,2 3,0.4 1.2,1.7 4.2,3 5.9,3 4,0.9 4.8,2.9 4,1.2 3.7,1.7 2.9,-0.7 4.8,-2.4 3.1,-0.4 4.4,1.6 2.6,2.1 5.5,6.9 0.4,-1.9 0.8,-1.5 -0.7,-1.2 3.3,-5.2 7.1,0 0.4,-2.1 -0.8,-0.4 -0.5,-1.4 -1.9,-1.5 -1.8,-2.1 2.6,0 0.4,-3.6 5.2,0 5.1,0.1 0.1,-1 0.7,-0.3 0.9,0.8 2.5,-3.9 1,0 1.2,-0.1 1.2,1.6 2,-5 1.2,-2.7 -0.9,-1.1 1.8,-3.9 3.5,-3.8 0.6,-3.1 -1.2,-1.3 -3.4,0.5 -4.8,-0.2 -6,1.5 -4,1.7 -1.2,1.8 -1.2,5.4 -1.8,3.7 -3.9,2.6 -3.6,1.1 -4.3,1.1 -4.3,0.6 -5.1,1.8 -1.9,-2.6 -5.6,-1.7 -1.8,-3.2 -0.7,-3.6 -3,-4.7 -0.4,-5 -1.2,-3.1 -0.5,-3.4 1.1,-3.1 1.8,-8.6 1.8,-4.5 3.1,-5.6 -2.1,0.2 z" style="fill-rule: evenodd; fill: url('#mexico');"></path>
    <path inkscape:connector-curvature="0" id="MK" data-name="Macedonia" data-id="MK" d="m 1094,304.8 -2.8,-2 -2.4,0.1 -1.7,0.4 -1.1,0.2 -2.9,1 -0.1,1.2 -0.7,0 0,0 -0.4,2.1 0.9,2.6 2.3,1.6 3.3,-0.6 1.9,-1.3 2.8,0.1 0.7,-1.1 1,-0.2 -0.8,-4.1 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ML" data-name="Mali" data-id="ML" d="m 1000.3,450.3 -6.1,0.6 -0.1,-4 -2.6,-1.1 -3.4,-1.8 -1.3,-3 -18.6,-13.8 -18.4,-13.9 -8.4,0.1 2.4,27.4 2.4,27.5 1,0.8 -1.3,4.4 -22.3,0.1 -0.9,1.4 -2.1,-0.4 -3.2,1.3 -3.8,-1.8 -1.8,0.2 -1,3.7 -1.9,1.2 0.2,3.9 1.1,3.7 2.1,1.8 0.4,2.4 -0.3,2 0.3,2.3 0.9,0 1.5,-0.8 0.9,0.2 1.5,1.6 2.4,0.5 1.6,-1.4 1.8,-0.8 1.3,-0.9 1.1,0.2 1.3,1.4 0.6,1.7 2.3,2.7 -1.2,1.6 -0.2,2.1 1.2,-0.6 0.7,0.7 -0.3,1.9 1.7,1.8 0.7,-0.6 1.6,1 4.3,0.1 1,-1.9 1,0.1 1.6,-0.7 0.9,2.7 1.3,-0.8 2.3,-0.9 -0.4,-3.7 1.6,-2.7 -0.2,-2.2 4.5,-5.2 0.8,-4.4 1.6,-1.6 2.7,0.9 2.3,-1.3 0.8,-1.6 4.3,-2.9 1.1,-2 5.2,-2.6 3,-0.9 1.4,1.2 3.6,0 3.6,-0.3 2,-2.2 7.6,-0.6 4.9,-1 0.5,-3.9 3,-4.3 -0.1,-14.6 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="MM" data-name="Myanmar" data-id="MM" d="m 1533.9,435.8 -0.6,-2.6 -3.8,1.8 -2.5,-1.2 -4.5,-2.4 0.8,-5.2 -3.7,-1.3 -2.3,-5.8 -5.6,1 -0.7,-7.5 4.1,-5.3 -0.8,-5.3 -1.3,-4.9 -2.7,-1.5 -2.7,-3.7 -3,0.4 0.9,2.4 -1.6,1.2 1.3,3.9 -4.1,-1.1 -6.1,4.4 0.9,3.6 -2.1,5.4 0.3,3.1 -1.5,5.2 -4.6,-1.4 0.9,6.6 -0.9,2.1 0.9,2.7 -2.4,1.5 0.5,4.6 -2.1,-1 1.1,5.1 4.6,5.2 3.4,0.9 -0.4,2.2 5.4,7.4 1.9,5.9 -0.9,7.9 3.6,1.5 3.2,0.6 5.8,-4.6 3.2,-3.1 3.1,5.2 2,8.1 2.6,7.6 2.6,3.3 0.2,6.9 2.2,3.8 -1.3,4.8 0.9,4.8 2.2,-6.6 2.6,-5.9 -2.8,-5.8 -0.2,-3 -1,-3.5 -4.2,-5.1 -1.7,-3.2 1.7,-1.1 1.4,-5.6 -2.9,-4.2 -4.1,-4.6 -3.5,-5.6 2.2,-1.1 1.5,-6.9 3.9,-0.3 2.8,-2.8 3,-1.4 0.8,-2.4 4.1,-4.1 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ME" data-name="Montenegro" data-id="ME" d="m 1080,299.8 0.4,-0.6 -2,-1.2 -1.8,-0.7 -0.8,-0.8 -1.5,-1.1 -0.9,0.6 -1.5,1.4 -0.4,3.4 -0.5,1 0,0 2.3,1.2 1.6,2.1 1.1,0.4 0,0 -0.5,-1.9 2,-3.1 0.4,1.2 1.3,-0.5 0.8,-1.4 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MN" data-name="Mongolia" data-id="MN" d="m 1473.7,252.1 -3.7,-4.6 -6.6,-1.5 -4.8,-0.8 -6.9,-2.5 -1.3,6.4 4,3.6 -2.4,4.3 -7.9,-1.6 -5,-0.2 -4.7,-2.9 -5.1,-0.1 -5.3,-1.9 -5.9,2.9 -6.6,5.4 -4.7,1 3.3,4.4 5.7,3.3 8.1,2.3 5.8,5 1.3,7.3 3,2.7 6.4,1 7.2,0.9 7.9,3.8 3.4,0.7 4.9,5.7 4.7,3.6 5.5,-0.1 11.2,1.3 6.4,-0.8 5.5,0.9 9.3,3.8 6.2,-0.1 3.2,2 4.4,-3.3 7.2,-2.2 7.5,-0.2 4.9,-2.2 1.9,-3.3 2.5,-2 -1.9,-2.1 -2.9,-2.3 0.4,-4 3.2,0.5 5.9,1.3 3.1,-3.3 6.3,-2.4 1.4,-4.1 2.4,-1.8 6.8,-0.8 4.3,0.7 -0.7,-2.2 -7.2,-4.3 -5.1,-2 -2.5,2.3 -5.4,-1 -2.4,0.8 -2.7,-2.6 -0.3,-6.2 -0.6,-4.6 -5.5,0.5 -3.9,-2.1 -3.3,-0.7 -4.5,4.4 -5.8,1 -3.6,1.6 -6.7,-1 -4.5,0 -4.9,-3.1 -6.5,-3 -5.4,-0.8 -5.7,0.8 -3.9,1.1 -8.4,-2.6 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="MZ" data-name="Mozambique" data-id="MZ" d="m 1203,640.7 -0.8,-2.9 0,0 0,0 -4.6,3.7 -6.2,2.5 -3.3,-0.1 -2.1,1.9 -3.9,0.1 -1.4,0.8 -6.7,-1.8 -2.1,0.3 -1.6,6 0.7,7.3 0.3,0 1.9,2 2.2,4.6 0.1,8.2 -2.5,1.3 -1.9,4.5 -3.4,-4 -0.2,-4.5 1.3,-2.9 -0.3,-2.6 -2.1,-1.6 -1.6,0.6 -3,-3 -17.1,5.2 0.3,4.5 0.3,2.4 4.6,-0.1 2.6,1.3 1.1,1.6 2.6,0.5 2.8,2 -0.3,8.1 -1.3,4.4 -0.5,4.7 0.8,1.9 -0.8,3.7 -0.9,0.6 -1.6,4.6 -6.2,7.2 2.2,9 1.1,4.5 -1.4,7.1 0.4,2.3 0.6,2.9 0.3,2.8 4.1,0 0.7,-3.3 -1.4,-0.5 -0.3,-2.6 2.6,-2.4 6.8,-3.4 4.6,-2.2 2.5,-2.3 0.9,-2.6 -1.2,-1.1 1.1,-3 0.5,-6.2 -1,0.3 0,-1.9 -0.8,-3.7 -2.4,-4.8 0.7,-4.6 2.3,-1.4 4.1,-4.6 2.2,-1.1 6.7,-6.8 6.4,-3.1 5.2,-2.5 3.7,-3.9 2.4,-4.4 1.9,-4.6 -0.9,-3.1 0.2,-9.9 -0.4,-5.6 0.4,-6.3 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MR" data-name="Mauritania" data-id="MR" d="m 949.8,413.3 -20.3,-15.5 -0.2,9.7 -17.9,-0.3 -0.2,16.3 -5.2,0.5 -1.4,3.3 0.9,9.2 -21.6,-0.1 -1.2,2.2 2.8,2.7 1.4,3 -0.7,3.2 0.6,3.2 0.5,6.3 -0.8,5.9 -1.7,3.2 0.4,3.4 2,-2 2.7,0.5 2.8,-1.4 3.1,0 2.6,1.8 3.7,1.7 3.2,4.7 3.6,4.4 1.9,-1.2 1,-3.7 1.8,-0.2 3.8,1.8 3.2,-1.3 2.1,0.4 0.9,-1.4 22.3,-0.1 1.3,-4.4 -1,-0.8 -2.4,-27.5 -2.4,-27.4 8.4,-0.1 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MW" data-name="Malawi" data-id="MW" d="m 1169.2,661.5 0.1,-2.3 -1.2,-1.9 0.1,-2.8 -1.5,-4.7 1.7,-3.5 -0.1,-7.7 -1.9,-4.1 0.2,-0.7 0,0 -1.1,-1.7 -5.4,-1.2 2.6,2.8 1.2,5.4 -1,1.8 -1.2,5.1 0.9,5.3 -1.8,2.2 -1.9,5.9 2.9,1.7 3,3 1.6,-0.6 2.1,1.6 0.3,2.6 -1.3,2.9 0.2,4.5 3.4,4 1.9,-4.5 2.5,-1.3 -0.1,-8.2 -2.2,-4.6 -1.9,-2 -0.3,0 0,0.8 1.1,0.3 1,3.4 -0.2,0.8 -1.9,-2.5 -1,1.6 -0.8,-1.4 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="MY" data-name="Malaysia" data-id="MY" d="m 1543.6,532.7 -4.7,-2.8 -0.9,1.1 1.4,2.7 -0.4,4.7 2.1,3.4 1,5.3 3.4,4.3 0.8,3.2 6.7,5 5.4,4.8 4,-0.5 0.1,-2.1 -2.3,-5.6 -2.1,-1.8 -0.5,-3.8 -0.6,-2.1 0.5,-2.9 -0.5,-4.3 -2.6,-4.3 -3.5,-3.8 -1.3,-0.6 -1.7,2.6 -3.7,0.8 -0.6,-3.3 z m 99,11 -1.2,-3.1 3.8,-0.4 0.3,-2.4 -4.8,-2 -3.8,-1.7 -0.4,-2.8 -3.1,-3.2 -2.3,0 -2.5,5 -4.1,4.4 -0.1,3.1 -0.1,4.1 -2.7,-0.2 -1.1,2.2 -2.7,-3.3 -2.6,4 -3.8,5 -6.7,1.4 -2.4,1.2 -0.9,5.4 -4.4,1.2 -4.1,-2.2 1,4.3 3.9,3.5 3.6,-1.2 3.6,0.4 3.2,-3.2 2.7,-0.6 5.4,1.8 4.5,-1.3 2.7,-8.9 2,-2.2 1.7,-7.2 6.4,0 5,1 4,-2.1 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="NA" data-name="Namibia" data-id="NA" d="m 1105.4,683.7 -10.3,2.5 -13.4,-0.9 -3.7,-3 -22.5,0.3 -0.9,0.4 -3.2,-2.9 -3.6,-0.1 -3.3,1 -2.7,1.2 0.2,4.9 4.4,6.2 1.1,4 2.8,7.7 2.7,5.2 2.1,2.6 0.6,3.5 0,7.6 1.6,9.8 1.2,4.6 1,6.2 1.9,4.7 3.9,4.8 2.7,-3.2 2.1,1.8 0.8,2.7 2.4,0.5 3.3,1.2 2.9,-0.5 5,-3.2 1.1,-23.6 0.6,-18.5 5.4,-0.2 0.9,-22.7 4.1,-0.2 8.6,-2.2 2,2.6 3.7,-2.5 1.6,0 3.2,-1.5 0,-0.5 -2.1,-1.4 -3.6,-0.4 -4.6,1.5 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="NE" data-name="Niger" data-id="NE" d="m 1051.3,425.6 -8.8,-2.8 -18.6,12.2 -15.8,12.5 -7.8,2.8 0.1,14.6 -3,4.3 -0.5,3.9 -4.9,1 -7.6,0.6 -2,2.2 -3.6,0.3 -0.5,3.1 0.8,2.9 3.1,4.1 0.2,3.1 6.4,1.4 -0.1,4.4 1.9,-1.9 2,0 4.3,3.7 0.3,-5.7 1.6,-2.6 0.8,-3.6 1.4,-1.4 6,-0.8 5.6,2.4 2.1,2.4 2.9,0.1 2.6,-1.5 6.8,3.3 2.8,-0.2 3.3,-2.7 3.3,0.2 1.6,-0.9 3,0.4 4.3,1.8 4.3,-3.5 1.3,0.2 3.9,7 1,-0.2 0.2,-2 1.6,-0.4 0.5,-2.9 -3.6,-0.2 0,-4.1 -2.4,-2.3 2.3,-8.4 6.9,-6 0.2,-8.3 1.8,-12.9 1.1,-2.7 -2.3,-2.2 -0.2,-2.1 -2,-1.6 -1.6,-9.9 -3.9,2.4 -3.1,-3.5 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="NG" data-name="Nigeria" data-id="NG" d="m 1055.8,492.7 -1,0.2 -3.9,-7 -1.3,-0.2 -4.3,3.5 -4.3,-1.8 -3,-0.4 -1.6,0.9 -3.3,-0.2 -3.3,2.7 -2.8,0.2 -6.8,-3.3 -2.6,1.5 -2.9,-0.1 -2.1,-2.4 -5.6,-2.4 -6,0.8 -1.4,1.4 -0.8,3.6 -1.6,2.6 -0.3,5.7 -0.2,2.1 1.2,3.8 -1.1,2.5 0.6,1.7 -2.7,4 -1.7,1.9 -1,4 0.1,4.1 -0.3,10.2 4.9,0 4.3,0 3.9,4.2 1.9,4.6 3,3.9 4.5,0.2 2.2,-1.4 2.1,0.3 5.8,-2.3 1.4,-4.5 2.7,-6.1 1.6,-0.1 3.3,-3.7 2.1,-0.1 3.2,2.6 3.9,-2.2 0.5,-2.6 1.2,-2.6 0.8,-3.2 3,-2.6 1.1,-4.5 1.2,-1.4 0.7,-3.3 1.5,-4 4.6,-5 0.3,-2.1 0.6,-1.1 -2.3,-2.6 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="NI" data-name="Nicaragua" data-id="NI" d="m 514.1,476.8 -1.9,-0.2 -0.9,0.9 -2,0.8 -1.4,0 -1.3,0.8 -1.1,-0.3 -0.9,-0.9 -0.6,0.2 -0.8,1.5 -0.5,-0.1 -0.3,1.3 -2.1,1.8 -1.1,0.7 -0.6,0.8 -1.5,-1.3 -1.4,1.7 -1.2,0 -1.3,0.2 -0.2,3.1 -0.8,0 -0.8,1.5 -1.8,0.3 -0.4,0.4 -0.9,-1 -0.7,1 2.6,2.9 2.2,2 1,2.1 2.5,2.6 1.8,2 0.9,-0.8 3.5,1.7 1.4,-0.8 1.7,0.5 0.8,1.3 1.7,0.4 1.4,-1.3 -0.8,-1.1 -0.1,-1.7 1.2,-1.6 -0.2,-1.7 0.7,-2.7 0.9,-0.7 0.1,-2.8 -0.2,-1.7 0.4,-2.8 0.9,-2.5 1.4,-2.2 -0.3,-2.3 0.4,-1.4 0.6,-0.6 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="NL" data-name="Netherlands" data-id="NL" d="m 1005.5,243.9 2.9,0 1.1,-2.3 1,-5.6 -1,-2 -3.9,-0.2 -6.5,2.6 -3.9,8.9 -2.5,1.7 0,0 3.6,0.5 4.4,-1.3 3.1,2.7 2.8,1.4 -1.1,-6.4 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0); stroke-width: 1px;"></path>
    <path inkscape:connector-curvature="0" id="NO" data-name="Norway" data-id="NO" d="m 1088.8,133.1 -6.9,1.1 -7.3,-0.3 -5.1,4.4 -6.7,-0.3 -8.5,2.3 -10.1,6.8 -6.4,4 -8.8,10.7 -7.1,7.8 -8.1,5.8 -11.2,4.8 -3.9,3.6 1.9,13.4 1.9,6.3 6.4,3 6,-1.4 8.5,-6.8 3.3,3.6 1.7,-3.3 3.4,-4 0.9,-6.9 -3.1,-2.9 -1,-7.6 2.3,-5.3 4.3,0.1 1.3,-2.2 -1.8,-1.9 5.7,-7.9 3.4,-6.1 2.2,-3.9 4,0.1 0.6,-3.1 7.9,0.9 0,-3.5 2.5,-0.3 2.1,-1.4 5.1,2.9 5.3,-0.3 4.7,1.3 3.4,-2.4 1.1,-3.9 5.8,-1.8 5.7,2.1 -0.8,3.8 3.2,-0.5 6.4,-2.2 0,0 -5.4,-3.3 4.8,-1.4 -13.6,-3.9 z m -22.6,-33.3 -5.6,-1 -1.9,-1.7 -7.2,0.9 2.6,1.5 -2.2,1.2 6.7,1.1 7.6,-2 z m -25.4,-8.3 -4.8,-1.6 -5.1,0.2 -1,1.5 -5,0 -2.2,-1.5 -9.3,1.6 3.2,3.5 7.6,3.8 5.7,1.4 -3,1.7 8.4,2.9 4.4,-0.2 0.9,-3.9 3,-0.9 1.2,-3.4 8.5,-1.8 -12.5,-3.3 z m 24.2,-3.1 -9.1,-1 -3.2,1.2 -5.3,-1 -10.4,1.2 4.3,2 5.1,0 0.9,1.3 10.6,0.7 10.1,-0.5 4.3,-2.4 -7.3,-1.5 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="NP" data-name="Nepal" data-id="NP" d="m 1455.2,394.8 -6.5,-0.6 -6.4,-1.5 -5,-2.8 -4.5,-1.2 -2.5,-3.1 -3.2,-0.9 -6.4,-4.1 -4.7,-2 -1.9,1.5 -2.8,2.9 -0.9,5.9 5.7,2.5 5.8,3.1 7.7,3.5 7.6,0.9 3.8,3.2 4.3,0.6 6.8,1.5 4.6,-0.1 0.1,-2.5 -1.5,-4.1 -0.1,-2.7 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="NZ" data-name="New Zealand" data-id="NZ" d="m 1868.6,832.8 0.9,-2.6 -5.8,2.9 -3.4,3.4 -3.2,1.6 -5.9,4.6 -5.6,3.2 -7,3.2 -5.5,2.4 -4.3,1.1 -11.3,6.1 -6.4,4.6 -1.1,2.3 5.1,0.4 1.5,2.1 4.5,0.1 4,-1.8 6.3,-2.8 8.1,-6.2 4.7,-4.1 6.2,-2.3 4,-0.1 0.6,-2.9 4.6,-2.5 7,-4.5 4.2,-2.9 2.1,-2.6 0.5,-2.6 -5.6,2.5 0.8,-2.6 z m 28.8,-30.5 1.9,-5.7 -3.1,-1.7 -0.8,-3.6 -2.3,0.5 -0.4,4.6 0.8,5.7 0.9,2.7 -0.9,1.1 -0.6,4.4 -2.4,4.1 -4.2,5 -5.3,2.2 -1.7,2.4 3.7,2.5 -0.8,3.5 -6.9,5.1 1.4,0.9 -0.4,1.6 5.9,-2.5 5.9,-4.2 4.5,-3.4 1.6,-1.2 1.5,-2.7 2.8,-2 3.8,0.2 4.2,-3.8 5.1,-5.7 -2.1,-0.8 -4.6,2.5 -3.2,-0.5 -2.9,-2.1 2.3,-4.9 -1.2,-1.8 -2.9,4.4 0.4,-6.8 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="OM" data-name="Oman" data-id="OM" d="m 1301,437.8 2.1,-2 0.8,-1.8 1.6,-3.8 -0.1,-1.4 -2.1,-0.8 -1.6,-2.1 -2.9,-3.7 -3.3,-1.1 -4.1,-0.9 -3.3,-2.3 -2.9,-4.3 -2.8,0 -0.1,4.2 1.1,0.8 -2.4,1.3 0.3,2.6 -1.4,2.6 0.1,2.6 2.9,4.5 -2.6,12.7 -16.1,6.4 5.2,10.5 2.1,4.4 2.5,-0.3 3.6,-2.2 3.1,0.6 2.5,-1.8 -0.2,-2.5 2.1,-1.6 3.4,0 1.2,-1.3 0.2,-3.1 3.3,-2.4 2.6,0 0.4,-0.8 -1,-4.2 0.6,-3.2 1,-1.5 2.5,0.3 1.7,-4.4 z m -16.6,-30.4 0.2,-2.6 -0.7,-0.6 -1.3,2.2 1.3,2.2 0.5,-1.2 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="PK" data-name="Pakistan" data-id="PK" d="m 1388.3,346.3 -9.4,-2.6 -2.9,-5 -4.7,-3 -2.8,0.7 -2.4,1.2 -5.8,0.8 -5.3,1.3 -2.4,2.8 1.9,2.8 1.4,3.2 -2,2.7 0.8,2.5 -0.9,2.3 -5.1,-0.2 3,4.2 -3,1.6 -1.5,3.8 1.1,3.8 -1.7,1.8 -2.1,-0.6 -4,0.9 -0.2,1.7 -4,0 -2.3,3.6 0.8,5.4 -6.6,2.6 -3.8,-0.5 -0.9,1.4 -3.3,-0.8 -5.3,0.9 -9.6,-3.2 3.2,3.3 2.8,3.9 5.6,2.7 1,5.7 2.7,1 0.9,2.9 -7.4,3.3 -1.2,7.4 7.6,-0.9 8.9,-0.1 9.9,-1.2 4.9,4.8 2.1,4.6 4.2,1.6 3.2,-4.2 12,0 -1.8,-5.5 -3.5,-3.2 -1.3,-4.9 -4,-2.9 4.9,-6.6 6.4,0.5 4.5,-6.7 2.1,-6.5 3.9,-6.3 -1,-4.5 3.7,-3.7 -5,-3.1 -2.9,-4.3 -3.2,-5.6 1.9,-2.8 8.5,1.6 5.7,-1 3.7,-5.4 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PA" data-name="Panama" data-id="PA" d="m 543.5,517 -2,-1.8 -1.7,-1.9 -2.5,-1.1 -3.1,-0.2 0.3,-0.6 -3.1,-0.4 -2,1.9 -3.5,1.3 -2.5,1.6 -2.7,0.5 -1.5,-1.6 -0.5,0.5 -2.3,-0.3 0.2,-1.3 -1.9,-2.3 -2.2,0.6 -0.1,2.5 1.1,1 -0.8,0.7 0.1,1.2 -0.5,1.3 -0.4,1.2 0.6,1 0.3,-1.4 2.4,0 1.4,0.7 2.3,0.5 1,2.5 1.8,0.4 0.8,-1.1 0.8,3.8 2.6,-0.3 0.9,-0.9 1.5,-0.9 -2.5,-3.4 0.6,-1.3 1.3,-0.3 2.3,-1.6 1.2,-2.2 2.5,-0.4 2.7,1.8 1,2.1 1.4,0.4 -1.5,1.7 1,3.5 1.8,1.8 0.9,-3.1 1.8,0.5 1.1,-1.9 -1.1,-3.8 0.7,-0.9 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="PE" data-name="Peru" data-id="PE" d="m 584.3,599.5 -2.9,-3.4 -1.7,-0.1 3.5,-6.5 -4.4,-3 -3.3,0.6 -2.1,-1.1 -3,1.7 -4.2,-0.8 -3.4,-6.7 -2.7,-1.7 -1.8,-3 -3.7,-3 -1.5,0.6 0.8,4.9 -1.7,4.1 -6,6.7 -6.7,2.5 -3.3,5.5 -0.9,4.3 -3.1,2.6 -2.5,-3.2 -2.3,-0.7 -2.3,0.5 -0.2,-2.3 1.5,-1.5 -0.7,-2.7 -4.4,4 -1.6,4.5 3,6.1 -1.7,2.8 4.1,2.6 4.5,4.1 2,4.7 2.4,2.9 6,12.7 6.2,11.7 5.4,8.4 -0.8,1.8 2.8,5.3 4.6,3.9 10.7,6.9 11.6,6.4 0.7,2.6 5.9,3.7 2.7,-1.6 1.2,-3.3 2.8,-6.9 -2.8,-5.3 1.1,-2.1 -1.2,-2.4 1.9,-3.2 -0.3,-5.4 -0.1,-4.5 1.1,-2.1 -5.5,-10.3 -3,1.1 -2.6,-0.7 -0.2,-9.7 -4.4,3.8 -4.9,-0.2 -2.3,-3.4 -3.7,-0.3 1,-2.8 -3.3,-3.8 -2.6,-5.8 1.5,-1.1 -0.1,-2.7 3.3,-1.9 -0.7,-3.4 1.3,-2.2 0.4,-3 6.2,-4.3 4.6,-1.2 0.7,-1 5.1,0.3 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PH" data-name="Philippines" data-id="PH" d="m 1684.6,518.6 -0.6,-2.3 -0.8,-3.2 -4.8,-3 0.8,4.9 -3.9,0.2 -0.7,2.8 -4.2,1.7 -2.2,-2.8 -2.8,2.4 -3.4,1.7 -1.9,5.4 1.1,1.9 3.9,-3.6 2.7,0.3 1.5,-2.7 3.8,3 -1.5,3.1 1.9,4.6 6.8,3.7 1.4,-3 -2.1,-4.7 2.4,-3.2 2.5,6.4 1.5,-5.8 -0.6,-3.5 -0.8,-4.3 z m -14.5,-11.8 0,-6.1 -3.6,6.1 0.5,-4.2 -3,0.3 -0.3,4 -1.2,1.8 -1,1.7 3.8,4.4 1.6,-1.9 1.4,-4 1.8,-2.1 z m -30.1,6.1 2.6,-4.4 3.4,-3.5 -1.5,-5.2 -2.4,6.3 -2.9,4.4 -3.8,4 -2.4,4.4 7,-6 z m 17.4,-16.4 1.2,3 -0.1,3.3 0.5,2.9 3.3,-1.9 2.4,-2.7 -0.2,-2.6 -3.6,0 -3.5,-2 z m 20,-1.7 -1.8,-2.4 -5.4,-0.1 4,4.8 0.3,2.4 -3.3,-0.5 1.2,3.9 1.7,0.3 0.7,4.5 2.5,-1.4 -1.7,-4 -0.4,-2.1 4.5,1.7 -2.3,-7.1 z m -22.9,-5.8 -2.2,-2.3 -4.8,-0.2 3.4,4.8 2.8,3.2 0.8,-5.5 z m -6.4,-34.6 -3.3,0 -0.9,5.8 1.1,9.9 -2.6,-2 1.2,6 1.2,2.8 3.3,3.7 0.4,-2.3 1.8,1.4 -1.5,1.7 0.1,2.6 2.9,1.4 5,-0.9 4,3.8 1.1,-2.4 2.5,3.4 4.8,3.1 0.2,-2.9 -2,-1.6 0.1,-3.4 -7.5,-3.6 -2.3,0.8 -3.1,-0.7 -2,-5.1 0.1,-5.1 3,-2.1 0.6,-5.3 -2.7,-4.6 0.4,-2.6 -0.7,-1.6 -1.5,1.6 -3.7,-1.8 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="PG" data-name="Papua New Guinea" data-id="PG" d="m 1850.7,615.6 0.9,-1.8 -2.4,-2.2 -2.5,-4 -1.6,-1.5 -0.5,-1.9 -0.8,0.7 0.9,4.8 2.2,4 2.2,2.5 1.6,-0.6 z m -21.2,-8.6 2.1,-3.9 0.4,-3.5 -1.1,-1 -3.4,0.1 0.4,3.7 -3.3,2.3 -1.7,2.2 -3.2,0.5 -0.4,-3.4 -0.8,0.1 -1,3.1 -3.1,0.5 -5,-0.9 -0.6,1.9 3.1,1.8 4.5,1.9 2.9,0 3,-1.5 3.2,-1.6 1,-1.8 3,-0.5 z m -27.8,12.2 -0.9,-4.3 5.2,-0.7 -1.1,-3.3 -9.1,-4 -0.6,-3.7 -2.9,-3.2 -3.7,-3.3 -10.2,-3.6 -9.6,-4.4 -1,20.7 -1.5,20.8 5.7,0.2 3.1,1.1 4.6,-2.2 -0.3,-4.7 3.6,-2.1 4.9,-1.8 7,2.8 2.4,5.6 2.9,3.5 3.9,4 5.5,1 4.8,0.7 1.1,1.6 3.8,-0.4 0.8,-1.8 -5.6,-2.7 1.8,-1.2 -4.2,-1.1 0.5,-2.8 -3.2,0.2 -3,-6.8 -4.7,-4.1 z m 34.7,-18.4 -0.5,-3.3 -2,-2.1 -2.1,-2.6 -2.3,-1.5 -1.9,-1.4 -2.9,-1.8 -1.6,1.5 3.9,1.9 3.1,2.7 2.4,2.1 1.2,2.4 0.8,3.8 1.9,-1.7 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PL" data-name="Poland" data-id="PL" d="m 1069.4,228.3 -4.6,-0.1 -0.5,-1.4 -4.8,-1.1 -5.7,2.1 -7.1,2.8 -3.1,1.7 1.4,3.1 -1.2,1.6 2,2.2 1.4,3.3 -0.1,2.1 2.3,3.9 2.4,1.9 3.7,0.6 -0.1,1.7 2.7,1.2 0.6,-1.5 3.4,0.6 0.7,2 3.6,0.3 2.6,3.1 0.3,0.4 1.9,-0.9 2.7,2.2 2.8,-1.3 2.4,0.6 3.4,-0.8 4.9,2.3 1.1,0.4 -1.6,-2.8 3.8,-5.1 2.3,-0.7 0.3,-1.8 -3.1,-5.3 -0.5,-2.7 -1.9,-2.9 2.7,-1.2 -0.3,-2.4 -1.7,-2.3 -0.6,-2.7 -1.4,-1.9 -2.5,-0.6 -8.7,0.1 -5.9,-0.7 z" style="fill-rule: evenodd; fill: url('#poland');"></path>
    <path inkscape:connector-curvature="0" id="KP" data-name="Dem. Rep. Korea" data-id="KP" d="m 1644.7,302.3 0,0 -5.5,-3.6 0.1,3.5 -6.3,2.6 2.7,3.3 -4.6,-0.2 -3.6,-2 -1,4.4 -3.8,3.4 -2.1,4 3.3,1.7 3.4,0.7 0.8,1 0.4,3.5 1.1,1.2 -0.9,0.7 -0.1,2.9 1.9,1 1.6,0.6 0.8,1.2 1.3,-0.5 0,-1.3 3.1,1.3 0.1,-0.6 2.4,0.2 0.7,-2.9 3.5,-0.3 2.1,-0.4 -0.1,-1.6 -4.3,-2.8 -2.6,-1 0.2,-0.7 -1.2,-2.8 1.3,-1.7 2.9,-1 1,-1.9 0.3,-1.1 1.9,-1.4 -2.8,-4.5 0.3,-2.1 0.9,-2 2.2,0.3 0,0 0,0 0,0 -1.4,-1.1 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PT" data-name="Portugal" data-id="PT" d="m 937.6,335.9 -0.4,-2.1 2,-2.5 0.8,-1.7 -1.8,-1.9 1.6,-4.3 -2,-3.8 2.2,-0.5 0.3,-3 0.9,-0.9 0.2,-4.9 2.4,-1.7 -1.3,-3.1 -3,-0.2 -0.9,0.8 -3,0 -1.2,-3.1 -2.1,0.9 -1.9,1.6 0.1,2.1 0.9,2.2 0.1,2.7 -1.3,3.8 -0.4,2.5 -2.2,2.3 -0.6,4.2 1.2,2.4 2.3,0.6 0.4,4 -1,5.1 2.8,-0.7 2.7,0.9 2.2,-1.7 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="PY" data-name="Paraguay" data-id="PY" d="m 655.7,700.5 -0.3,-1.9 -5.4,-3.3 -5.1,-0.1 -9.5,1.9 -2.1,5.6 0.2,3.4 -1.5,7.6 11.2,10.4 4.6,1 7.2,4.7 5.9,2.5 1.1,2.8 -4.2,9.6 5.7,1.8 6.2,1 4.2,-1.1 4.3,-4.8 0.3,-5.7 0.7,-3.6 0.3,-3.8 -0.3,-3.5 -2.1,-1.2 -2,1.1 -2,-0.3 -0.9,-2.5 -1,-5.8 -1.2,-1.9 -3.9,-1.7 -2.1,1.2 -6,-1.2 -0.4,-8.6 -1.9,-3.6 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PS" data-name="Palestine" data-id="PS" d="m 1166.9,366.1 -2,-0.9 -0.7,4.3 1.4,0.7 -1.2,0.8 -0.1,1.7 2.4,-0.8 0.6,-1.9 -0.4,-3.9 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="QA" data-name="Qatar" data-id="QA" d="m 1258,415.5 0.8,-3.8 -0.5,-3.7 -1.9,-2 -1.4,0.7 -1.1,3.3 0.8,4.7 1.8,1.2 1.5,-0.4 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="RO" data-name="Romania" data-id="RO" d="m 1108.1,266.3 -2.1,0 -1,1.5 -3.6,0.6 -1.6,0.9 -2.4,-1.5 -3.2,0 -3.2,-0.7 -1.9,1.3 -2.9,1.3 -1.9,4.2 -2.6,4.3 -3.8,1.1 2.9,2.5 0.8,1.9 3.2,1.5 0.7,2.5 3.1,1.8 1.4,-1.3 1.4,0.7 -1.1,1.1 1,1 1.8,2.6 1.9,-0.5 4,1 7.5,0.3 2.3,-1.6 5.8,-1.4 4,2.2 3,0.7 0.4,-7.4 1.6,0.5 2.3,-1.3 -0.4,-1.6 -2.4,-1.1 -2.2,1 -2.4,-1.1 -1.3,-2.8 0.2,-2.7 -0.6,-2.7 -3.4,-3.7 -1.9,-2.6 -1.8,-1.9 -1.6,-0.6 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path id="RU" data-name="Russia" data-id="RU" style="fill-rule: evenodd; fill: url(&quot;#russia&quot;); stroke-width: 1px;" d="m 1332.3,95.1 -4.5,-4 -13.6,-4.1 -9.4,-2.1 -6.2,0.9 -5.3,2.9 5.8,0.8 6.6,3.2 8,1.7 11.5,1.3 7.1,-0.6 z m -178.7,-7.3 0.9,-0.6 -5.7,-0.9 -2.8,0.7 -1.3,1 -1.5,-1.2 -5.2,0.1 -6.2,0.8 7.7,0.1 -1.1,1.3 4.4,1 3.6,-0.7 0.1,-0.7 2.9,-0.3 4.2,-0.6 z m 200.5,9.9 -1.5,-1.8 -12.5,-2.6 -3,-0.3 -2.2,0.5 1.2,6 18,-1.8 z m 15.2,6.3 -9.2,-0.7 3.4,-1.2 -8.2,-1.5 -6.1,1.9 -1,2 1.5,2.1 -6.9,-0.1 -5.3,2.6 -4.3,-1.1 -9.3,0.5 0.3,1.3 -9.2,0.7 -4.9,2.4 -4.2,0.2 -1.2,3.3 5.5,2.6 -7.7,0.7 -9.5,-0.3 -5.8,1.1 4.8,5.4 6.9,4.3 -9.6,-3 -7.9,0.3 -5.1,2 4.5,3.8 -4.9,-1 -2.1,-5 -4.2,-2.8 -1.8,0.1 3.6,3.7 -4.6,3.5 8.1,4.2 0.4,5.4 2.9,2.9 4.7,0.5 0.4,3.5 4.4,3.1 -1.9,2.6 0.5,2.7 -3.7,1.4 -0.5,2 -5.3,-0.8 3.5,-7.8 -0.5,-3.6 -6.7,-3.3 -3.8,-7.3 -3.7,-3.7 -3.6,-1.6 0.8,-4.2 -2.9,-2.9 -11.3,-1.4 -2.1,1 0.5,4.7 -4.3,4.7 1.2,1.7 4.7,4.1 0.1,2.6 5.3,0.5 0.8,1.1 5.8,2.9 -1,2.8 -18.5,-6.1 -6.6,-1.7 -12.8,-1.6 -1.2,1.7 5.9,3.1 -2.7,3.6 -6.4,-3.2 -5,2.2 -7.6,0.1 -2.1,1.9 -5.3,-0.6 2.5,-3.3 -3.2,-0.2 -12.3,4.6 -7.6,2.6 0.4,3.5 -6,1.2 -4,-1.9 -1.2,-3 5,-0.7 -3.6,-3 -12.2,-1.8 4.3,3.4 -0.8,3.2 4.7,3.3 -1.1,3.8 -4.6,-1.9 -4,-0.3 -8,5.4 4.2,4.1 -3.2,1.4 -11.4,-3.5 -2.1,2.1 3.3,2.4 0.2,2.7 -3.8,-1.4 -6,-1.7 -1.9,-5.8 -1,-2.6 -8,-4 2.9,-0.7 20.1,4.2 6.4,-1.5 3.7,-2.9 -1.6,-3.6 -4,-2.6 -17.6,-6.1 -11.6,-1.3 -7.6,-3.2 -3.6,1.8 0,0 -6.4,2.2 -3.2,0.5 0.4,3.7 7.2,3.7 -2.8,4.1 6.4,6.3 -1.7,4.8 4.9,4.1 -0.9,3.7 7.3,3.9 -0.9,2.9 -3.3,3.3 -7.9,7.4 0,0 5.3,2.8 -4.5,3.2 0,0 0.9,1 -2.6,3.4 2.5,5.5 -1.6,1.9 2.4,1.4 1,2.8 2.1,3.6 5.2,1.5 1,1.4 2.3,-0.7 4.8,1.4 1,2.9 -0.6,1.6 3.7,3.9 2.2,1.1 -0.1,1.1 3.4,1.1 1.7,1.6 -1.6,1.3 -3.9,-0.2 -0.8,0.6 1.5,2 2,3.9 0,0 1.8,0.2 1,-1.4 1.5,0.3 4.8,-0.5 3.8,3.4 -0.9,1.3 0.7,1.9 4,0.2 2.2,2.7 0.2,1.2 6.6,2.2 3.5,-1 3.6,2.9 2.9,-0.1 7.6,2 0.4,1.9 -1.3,3.2 1.8,3.4 -0.3,2.1 -4.7,0.5 -2.2,1.7 0.4,2.8 4.2,-1 0.4,1.3 -6.8,2.6 3.2,2.4 -3.2,5.2 -3.4,1 5,3.6 6.2,2.4 7.4,5.1 0.5,-0.7 4.5,1.1 7.7,1 7.5,2.9 1.1,1.2 2.9,-1 5.1,1.3 2.1,2.5 3.5,1.4 1.5,0.2 4.3,3.8 2.4,0.4 0.5,-1.5 2.6,-2.5 0,0 -7.3,-7.3 -0.4,-4.1 -5.9,-5.9 3.5,-6.3 4.6,-1.1 1.4,-3.7 -2.8,-1 -0.2,-3.2 -4.2,-4.1 -3.6,0.2 -5.3,-4.3 1.7,-4.7 -1.7,-1.2 2.1,-6.8 6,3.6 -0.7,-4.6 8.1,-6.6 7.5,-0.2 11.9,4.3 6.6,2.4 4.3,-2.5 7.6,-0.2 7.3,3.2 0.8,-1.8 6.9,0.3 0.2,-3 -9.4,-4.2 3.6,-2.9 -1.5,-1.7 3.9,-1.6 -5,-4.1 1.4,-2.1 16.8,-2.1 1.7,-1.5 10.8,-2.2 3.1,-2.5 9,1.3 4.3,6.3 4.3,-1.5 7,2.1 1.2,3.3 4.4,-0.4 9.1,-5.7 -0.8,1.9 8.3,4.7 18.1,15.5 1.1,-3.3 8.3,3.6 6.2,-1.6 3.2,1.1 4.1,3.6 3.9,1.2 3.3,2.6 6,-0.9 4.3,3.8 1.7,-0.5 4.7,-1 6.6,-5.4 5.9,-2.9 5.3,1.9 5.1,0.1 4.7,2.9 5,0.2 7.9,1.6 2.4,-4.3 -4,-3.6 1.3,-6.4 6.9,2.5 4.8,0.8 6.6,1.5 3.7,4.6 8.4,2.6 3.9,-1.1 5.7,-0.8 5.4,0.8 6.5,3 4.9,3.1 4.5,0 6.7,1 3.6,-1.6 5.8,-1 4.5,-4.4 3.3,0.7 3.9,2.1 5.5,-0.5 7.3,2.3 4.4,-3.9 -1.9,-2.7 -0.1,-6.5 1.2,-2 -2.5,-3.3 -3.7,-1.5 1.7,-3 5.1,-1.1 6.2,-0.2 8.5,1.8 5.9,2.3 7.7,6.1 3.8,2.7 4.4,3.7 6.1,6.1 9.9,1.9 8.9,4.5 6,5.8 7.5,0 2.6,-2.5 6.9,-1.8 1.3,5.6 -0.4,2.3 2.8,6.8 0.6,6 -6.8,-1.1 -2.9,2.2 4.7,5.3 3.8,7.3 -2.5,0.1 1.9,3.1 0,0 1.4,1.1 0,0 0,0 0,0 -0.4,-2 4,-4.5 5.1,3 3.2,-0.1 4.4,-3.6 1,-3.7 2.1,-7.1 1.9,-7.2 -1.3,-4.3 1,-9 -5.2,-9.9 -5.5,-7.3 -1.3,-6.2 -4.7,-5.1 -12.7,-6.7 -5.6,-0.4 -0.3,3 -5.8,-1.3 -5.7,-3.8 -8,-0.7 4.9,-14.1 3.5,-11.5 13.1,-1.8 14.9,1 2.5,-2.8 7.9,0.8 4.3,4.3 6.4,-0.6 8.4,-1.6 -7.7,-3.5 0,-9.8 9.1,-1.9 12.1,7.1 3.6,-6.4 -3.2,-4.7 4.7,-0.5 6.5,8.1 -2.4,4.6 -0.8,6 0.3,7.5 -5.7,1.3 2.8,2.7 -0.1,3.6 6.4,8.3 16,13.4 10.5,8.8 5.7,4.3 1.6,-5.7 -4.5,-6.2 5.7,-1.5 -5.4,-6.9 5,-3.1 -4.7,-2.6 -3.4,-5 4.1,-0.2 -9,-8.6 -6.7,-1.4 -2.9,-2.4 -1.1,-5.6 -3.1,-3.9 7,0.8 1.3,-2.5 4.7,2.2 6.1,-4.6 11.4,4 -1.7,-2.6 2,-3.6 1.5,-4 3.1,-0.7 6.5,-4.3 9.8,1.2 -0.9,-1.5 -3.8,-2.3 -4.1,-1.6 -9.1,-4.6 -8.1,-3 6.1,0.4 2,-2.5 0,0 -32.9,-21.9 -9.4,-2.3 -15.7,-2.6 -7.9,0.3 -15.2,-1.4 1.8,2.3 8.5,3.4 -2.5,1.8 -14.2,-4.8 -6.8,0.6 -9.2,-1.1 -7,0.2 -3.9,1.1 -7.2,-1.6 -5.1,-3.8 -6.5,-2.2 -9.2,-0.9 -14.7,1 -16.1,-4 -7.8,-3 -40.1,-3.4 -2.1,2.2 9.3,4.8 -7.5,-0.7 -1,1.5 -9.7,-1.6 -5,1.4 -9.3,-2.4 3,5.5 -8.9,-2.1 -10,-4.1 -0.4,-2.2 -6,-3.3 -9.8,-2.6 -6.1,0 -9.3,-0.9 4.7,3.9 -17.2,-0.8 -3.9,-2.3 -13.3,-0.9 -5.3,0.8 -0.1,1.3 -5.8,-3.2 -2.3,0.9 -7.2,-1.2 -5.6,-0.7 1.1,-1.5 6.6,-2.8 2.3,-1.5 -2.4,-2.5 -5.5,-1.9 -11.5,-2.3 -10.8,-0.1 -1.9,1.2 -4.1,-2.4 z m -162.2,31.6 -9.9,-4.3 -3.1,-4.3 3.3,-4.9 2.8,-5 8.6,-4.7 9.8,-2.4 11.3,-2.4 1.3,-1.5 -4.2,-1.9 -6.6,0.6 -4.9,1.8 -11.7,0.9 -10.1,3.1 -6.8,2.7 2.5,2.2 -6.6,4.4 3.9,0.7 -5.4,4.3 1.6,2.8 -3.4,1.1 1.9,2.8 7.9,1.4 2.2,2.3 13.4,0.7 2.2,-0.4 z m 314,-24.7 -17.9,-2.6 -10.2,-0.2 -3.4,0.9 3.4,3.4 12.4,3.2 4.5,-1.2 14.2,0.2 -3,-3.7 z m 25.2,2.3 -11.7,-1.3 -8.2,-0.7 1.7,1.6 10.3,2 6.8,0.4 1.1,-2 z m -12.5,9.5 -2.5,-1.4 -8.3,-1.9 -4.1,0.5 -0.8,2 1.1,0.2 8.8,0.6 5.8,0 z m 162.6,12.3 -6,-3.6 -1.4,2.2 3.5,1.6 3.9,-0.2 z m -612.4,93.9 -0.6,-1.5 0.2,-1.7 -2.2,-0.9 -5,-1.1 -6.3,2 -0.7,2.6 5.9,0.7 8.7,-0.1 z m 589.7,21.8 -7.2,-6.2 -5.1,-6 -6.8,-5.8 -4.9,-4 -1.3,0.8 4.4,2.8 -1.9,2.8 6.8,8.3 7.8,6 6.4,8.3 2.4,4.6 5.5,6.8 3.8,6 4.6,5.2 -0.1,-4.8 6.5,3.8 -3,-4.4 -9.5,-6.3 -3.7,-9 8.9,2 -13.6,-10.9 z" inkscape:connector-curvature="0"></path>
    <path inkscape:connector-curvature="0" id="RW" data-name="Rwanda" data-id="RW" d="m 1147.6,579.4 -3.3,1.9 -1.4,-0.6 -1.6,1.8 -0.2,3.8 -0.8,0.4 -0.6,3.5 3.5,0.5 1.7,-3.6 3,0.4 0,0 1.6,-0.8 0.4,-3.7 -2.3,-3.6 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="EH" data-name="Western Sahara" data-id="EH" d="m 929.6,396.2 -0.8,0 0,0 0.1,3.4 -3.4,0.2 -1.8,1.5 -2.5,0 -1.9,-0.9 -4.6,0.7 -1.9,5 -1.7,0.4 -2.8,8.1 -7.8,6.8 -2,8.8 -2.3,2.9 -0.7,2.3 -12.4,0.5 -0.1,0 -0.3,2.7 1.2,-2.2 21.6,0.1 -0.9,-9.2 1.4,-3.3 5.2,-0.5 0.2,-16.3 17.9,0.3 0.2,-9.7 0.1,-1.2 0,-0.4 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="SA" data-name="Saudi Arabia" data-id="SA" d="m 1228.7,387 -10.2,-0.5 -16.7,-12.7 -8.5,-4.5 -6.7,-1.7 -0.9,1 -10.4,3.1 6.1,6.4 -1.7,1 -0.7,2.2 -4,0.8 -1.1,2.3 -2.1,2 -6.1,-1 -0.5,2.5 0,2.2 -0.6,3.5 2.7,0 3.2,4.4 3.7,5.1 2.5,4.7 1.7,1.5 1.7,3.3 -0.2,1.4 2.1,3.7 3,1.3 2.8,2.5 3.6,7 0,3.8 0.9,4.4 4,6.1 2.5,1 4.1,4.4 1.9,5.2 3.2,5.3 3,2.3 0.6,2.5 1.8,1.9 0.9,2.8 2.3,-2.1 -0.7,-2.7 1.2,-3.1 2.4,1.7 1.5,-0.6 6.4,-0.2 1,0.7 5.4,0.6 2.1,-0.3 1.6,2.1 2.5,-1 3.5,-6.7 5,-2.9 15.7,-2.4 16.1,-6.4 2.6,-12.7 -2.9,-4.5 -1,1.3 -16.8,-3.2 -2.6,-6.4 -0.4,-1.5 -1.2,-2.4 -1.5,0.4 -1.8,-1.2 -1,-1.6 -0.9,-2.1 -1.7,-1.8 -1,-2.1 0.4,-2.1 -0.6,-2.7 -4,-2.6 -1.2,-2.3 -2.9,-1.4 -2.7,-5.5 -3.8,0.2 -1.7,-3.1 -4.9,-0.6 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SD" data-name="Sudan" data-id="SD" d="m 1180.8,468.5 0.4,-4.2 1.6,-2 4,-1 2.6,-3.6 -3.1,-2.4 -2.2,-1.6 -2.5,-7.6 -1.1,-6.5 1.1,-1.2 -2.1,-6.2 -21.8,0 -21.4,0 -22.1,0 0.5,12.7 -6.3,0 0,2.7 1.1,25.2 -4.8,-0.4 -2.4,4.7 -1.4,3.9 1.2,1.5 -1.8,1.9 0.7,2.7 -1.4,2.6 -0.5,2.4 2,-0.4 1.2,2.5 0.1,3.7 2.1,1.8 0,1.6 0.7,2.7 3.3,4 0,2.6 -0.8,2.6 0.3,2 2,1.8 0.5,0.3 1.7,-0.7 1.9,-1.2 1.3,-5.7 1.5,-2.9 4,-0.9 1,1.8 3,3.7 1.5,0.5 2,-1.1 4.1,0.3 0.8,1.3 5.5,0 0.2,-1.3 2.9,-1.2 0.5,-1.9 2.1,-1.3 4.8,3.7 2.8,-0.7 2.7,-4.5 3,-3.5 -0.6,-3.9 -1.4,-1.8 3.4,-0.3 0.3,-1.5 2.6,0.5 -0.5,4.7 0.8,4.6 2.9,2.5 0.7,2.2 0,3.1 0.8,0.1 0,-0.7 1.4,-6.7 2.6,-1.8 0.5,-2.6 2.3,-4.8 3.2,-3.2 2.1,-6.2 0.7,-5.5 -0.7,-2.5 1.9,-9.4 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SS" data-name="South Sudan" data-id="SS" d="m 1166,508.7 -0.7,-2.2 -2.9,-2.5 -0.8,-4.6 0.5,-4.7 -2.6,-0.5 -0.3,1.5 -3.4,0.3 1.4,1.8 0.6,3.9 -3,3.5 -2.7,4.5 -2.8,0.7 -4.8,-3.7 -2.1,1.3 -0.5,1.9 -2.9,1.2 -0.2,1.3 -5.5,0 -0.8,-1.3 -4.1,-0.3 -2,1.1 -1.5,-0.5 -3,-3.7 -1,-1.8 -4,0.9 -1.5,2.9 -1.3,5.7 -1.9,1.2 -1.7,0.7 3.8,2.5 3.1,2.6 0.1,2 3.8,3.4 2.4,2.7 1.5,3.8 4.2,2.5 0.9,2.1 3.5,5.2 2.5,0.8 1.5,-1.1 2.6,0.4 3.1,-1.3 1.4,2.7 5,4.2 0,0 2.3,-1.7 3.5,1.4 4.5,-1.5 4,0.1 3.4,-3 3.4,-3.8 3.8,-4.2 -3.5,-6.9 -2.6,-1.5 -1,-2.5 -2.9,-3.1 -3.4,-0.5 1.8,-3.6 3,-0.1 0.8,-2 -0.2,-5 -0.8,-0.1 0,-3.1 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="SN" data-name="Senegal" data-id="SN" d="m 908.9,479.2 -3.6,-4.4 -3.2,-4.7 -3.7,-1.7 -2.6,-1.8 -3.1,0 -2.8,1.4 -2.7,-0.5 -2,2 -1.3,3.3 -2.8,4.4 -2.5,1.2 2.7,2.3 2.2,5 6.1,-0.2 1.3,-1.5 1.8,-0.1 2.1,1.5 1.8,0.1 1.8,-1.1 1.1,1.8 -2.4,1.5 -2.4,-0.1 -2.4,-1.4 -2.1,1.5 -1,0 -1.4,0.9 -5,-0.1 0.8,4.9 3,-1.1 1.8,0.2 1.5,-0.7 10.3,0.3 2.7,0.1 4,1.5 1.3,-0.1 0.4,-0.7 3,0.5 0.8,-0.4 0.3,-2 -0.4,-2.4 -2.1,-1.8 -1.1,-3.7 -0.2,-3.9 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SL" data-name="Sierra Leone" data-id="SL" d="m 919.4,518.7 -1.5,0.3 0,-2.3 -0.9,-1.7 0.2,-1.8 -1.2,-2.7 -1.5,-2.3 -4.5,0 -1.3,1.2 -1.5,0.2 -1,1.4 -0.7,1.7 -3,2.8 0.7,4.7 0.9,2.3 2.9,3.5 4.1,2.5 1.5,0.5 1.3,-2 0.3,-1.9 2.6,-3.4 2.6,-3 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SV" data-name="El Salvador" data-id="SV" d="m 487.2,487 0.6,-2.5 -0.7,-0.7 -1.1,-0.5 -2.5,0.8 -0.1,-0.9 -1.6,-1 -1.1,-1.3 -1.5,-0.5 -1.4,0.4 0.2,0.7 -1.1,0.7 -2.1,1.6 -0.2,1 1.4,1.3 3.1,0.4 2.2,1.3 1.9,0.6 3.3,0.1 0.7,-1.5 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="RS" data-name="Serbia" data-id="RS" d="m 1084.8,285.2 -3.2,-1.5 -0.8,-1.9 -2.9,-2.5 -3.2,-0.2 -3.7,1.6 0,0 1.5,2.4 1.7,1.8 -1.7,2.3 0,0 1.8,0 -1,2.7 2.7,2.3 -0.5,2.9 -1.2,0.3 1.5,1.1 0.8,0.8 1.8,0.7 2,1.2 -0.4,0.6 1.2,-0.5 0.5,-2 0.9,-0.4 0.8,0.9 1,0.4 0.8,1 0.8,0.3 1.1,1.1 0.8,0 -0.5,1.5 -0.5,0.7 0.2,0.5 1.7,-0.4 2.4,-0.1 0.7,-0.9 -0.6,-0.7 0.7,-2 1.7,-1.9 -2.8,-2.6 -0.7,-2.3 1.1,-1.4 -1,-1 1.1,-1.1 -1.4,-0.7 -1.4,1.3 -3.1,-1.8 -0.7,-2.5 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SR" data-name="Suriname" data-id="SR" d="m 668,533.8 -4.6,0.5 -0.6,1.1 -6.7,-1.2 -1,5.7 -3.5,1.6 0.3,1.5 -1.1,3.3 2.4,4.6 1.8,0.1 0.7,3.5 3.3,5.6 3.1,0.5 0.5,-1.3 -0.9,-1.3 0.5,-1.8 2.3,0.6 2.7,-0.7 3.2,1.4 1.4,-2.7 0.6,-2.9 1,-2.8 -2.1,-3.7 -0.4,-4.4 3.1,-5.5 -6,-1.7 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="SK" data-name="Slovakia" data-id="SK" d="m 1087.4,260.9 -4.9,-2.3 -3.4,0.8 -2.4,-0.6 -2.8,1.3 -2.7,-2.2 -1.9,0.9 -0.3,-0.4 -1.5,0 -0.6,1.1 -1.1,0.3 -0.2,1.4 -0.9,0.3 -0.1,0.6 -1.6,0.6 -2.2,-0.1 -0.6,1.4 -0.3,0.8 0.7,2.1 2.6,1.6 1.9,0.7 4.1,-0.8 0.3,-1.2 1.9,-0.2 2.3,-1 0.6,0.4 2.2,-0.7 1,-1.5 1.6,-0.4 5.5,1.9 1,-0.6 0.7,-2.5 1.1,-1.7 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SI" data-name="Slovenia" data-id="SI" d="m 1059.4,277 -1.2,-2.1 -0.8,-0.1 -0.9,1.1 -4.3,0.1 -2.4,1.4 -4.2,-0.4 -0.3,3 1.4,2.7 -1.1,0.5 3.5,0.2 0.8,-1 1.8,1 2,0.1 -0.2,-1.7 1.7,-0.6 0.3,-2.5 3.9,-1.7 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SE" data-name="Sweden" data-id="SE" d="m 1077.7,161.1 -1.9,-2.2 -1.7,-8.4 -7.2,-3.7 -5.9,-2.7 -2.5,0.3 0,3.5 -7.9,-0.9 -0.6,3.1 -4,-0.1 -2.2,3.9 -3.4,6.1 -5.7,7.9 1.8,1.9 -1.3,2.2 -4.3,-0.1 -2.3,5.3 1,7.6 3.1,2.9 -0.9,6.9 -3.4,4 -1.7,3.3 4.2,8.4 4.4,6.7 2,5.7 5.3,-0.3 2.2,-4.7 5.7,0.5 2,-5.5 0.6,-10 4.6,-1.3 3.3,-6.6 -4.8,-3.3 -3.6,-4 2.1,-8.1 7.7,-4.9 6.1,-4.5 -1.2,-3.5 3.4,-3.9 7,-1.5 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SZ" data-name="Swaziland" data-id="SZ" d="m 1150.5,736.6 -2.7,-1.2 -1.6,0.5 -0.7,1.8 -1.6,2.4 -0.1,2.2 3,3.5 3.3,-0.7 1.3,-2.8 -0.3,-2.8 -0.6,-2.9 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SY" data-name="Syria" data-id="SY" d="m 1183.5,359.9 11,-6.7 0.9,-7.8 -1.2,-4.7 2.7,-1.6 2.1,-4.1 -5.9,1.1 -2.8,-0.2 -5.7,2.5 -4.3,0 -3,-1.2 -5.5,1.8 -1.9,-1.3 0.1,3.6 -1.2,1.5 -1.2,1.4 -1,2.6 1.1,5 2.4,0.3 1.2,2.5 -2.6,2.4 -0.9,3.5 0.3,2.6 -0.6,1 0.1,0 6.3,2.5 9.6,-6.7 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TD" data-name="Chad" data-id="TD" d="m 1108.4,447.6 -22.4,-12.2 -22.3,-12.2 -5.4,3.5 1.6,9.9 2,1.6 0.2,2.1 2.3,2.2 -1.1,2.7 -1.8,12.9 -0.2,8.3 -6.9,6 -2.3,8.4 2.4,2.3 0,4.1 3.6,0.2 -0.5,2.9 2.2,4.1 0.5,4.2 -0.2,4.3 3.1,5.8 -3.1,-0.1 -1.6,0.4 -2.5,-0.6 -1.2,3 3.3,3.7 2.5,1.1 0.8,2.6 1.8,4.4 -0.9,1.7 4.7,-0.4 1,-1.7 0.9,0.2 1.4,1.4 7.1,-2.4 2.3,-2.5 2.9,-2.2 -0.6,-2.3 1.6,-0.6 5.4,0.4 5.2,-2.9 4,-7 2.8,-2.5 3.5,-1.1 0,-1.6 -2.1,-1.8 -0.1,-3.7 -1.2,-2.5 -2,0.4 0.5,-2.4 1.4,-2.6 -0.7,-2.7 1.8,-1.9 -1.2,-1.5 1.4,-3.9 2.4,-4.7 4.8,0.4 -1.1,-25.2 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="TG" data-name="Togo" data-id="TG" d="m 981.7,502.2 -4.9,-0.1 -0.4,1.9 2.4,3.3 -0.1,4.6 0.6,5.1 1.4,2.3 -1.2,5.7 0.4,3.2 1.5,4 1.2,2.2 4.6,-1.3 -1.4,-4.4 0.2,-14.6 -1.1,-1.3 -0.2,-3.1 -2,-2.3 -1.7,-1.9 0.7,-3.3 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TH" data-name="Thailand" data-id="TH" d="m 1562.7,481.4 1.5,-2.9 -0.5,-5.4 -5.2,-5.5 -1.3,-6.3 -4.9,-5.2 -4.3,-0.4 -0.8,2.2 -3.2,0.2 -1.8,-1.2 -5.3,3.8 -1,-5.7 0.4,-6.7 -3.8,-0.3 -0.9,-3.8 -2.6,-1.9 -3,1.4 -2.8,2.8 -3.9,0.3 -1.5,6.9 -2.2,1.1 3.5,5.6 4.1,4.6 2.9,4.2 -1.4,5.6 -1.7,1.1 1.7,3.2 4.2,5.1 1,3.5 0.2,3 2.8,5.8 -2.6,5.9 -2.2,6.6 -1.3,6.1 -0.3,3.9 1.2,3.6 0.7,-3.8 2.9,3.1 3.2,3.5 1.1,3.2 2.4,2.4 0.9,-1.1 4.7,2.8 0.6,3.3 3.7,-0.8 1.7,-2.6 -3.1,-3.3 -3.4,-0.8 -3.3,-3.6 -1.4,-5.5 -2.6,-5.8 -3.7,-0.2 -0.7,-4.6 1.4,-5.6 2.2,-9.3 -0.2,-7 4.9,-0.1 -0.3,5 4.7,-0.1 5.3,2.9 -2.1,-7.7 3,-5.2 7.1,-1.3 5.3,1 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TJ" data-name="Tajikistan" data-id="TJ" d="m 1344.1,315.7 -2.1,0.2 -1.3,-1.8 0.2,-2.9 -6.4,1.5 -0.5,4 -1.5,3.5 -4.4,-0.3 -0.6,2.8 4.2,1.6 2.4,4.7 -1.3,6.6 1.8,0.8 3.3,-2.1 2.1,1.3 0.9,-3 3.2,0.1 0.6,-0.9 -0.2,-2.6 1.7,-2.3 3.2,1.5 0,2 1.6,0.3 1,5.4 2.6,2.1 1.5,-1.3 2.1,-0.7 2.5,-2.9 3.8,0.5 5.4,0 -1.8,-3.7 -0.6,-2.5 -3.5,-1.4 -1.6,0.6 -3,-5.9 -9.5,0.9 -7.1,-2 -5.4,0.5 -0.6,-3.7 5.9,1.1 1.4,-2 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TM" data-name="Turkmenistan" data-id="TM" d="m 1325.6,334.2 -0.8,-4 -7.7,-2.7 -6.2,-3.2 -4.2,-3 -7,-4.4 -4.3,-6.4 -2,-1.2 -5.5,0.3 -2.3,-1.3 -1.9,-4.9 -7.8,-3.3 -3.3,3.6 -3.8,2.2 1.6,3.1 -5.8,0.1 -2.5,0.3 -4.9,-4.9 -3.8,-1.7 -5.5,1.3 -1.8,2 2.5,4 -0.5,-4.5 3.7,-1.6 2.4,3.6 4.6,3.7 -4,2 -5.3,-1.5 0.1,5.2 3.5,0.4 -0.4,4.4 4.5,2.1 0.7,6.8 1.8,4.5 4.4,-1.2 3,-3.7 3.5,0.2 2.1,-1.2 3.8,0.6 6.5,3.3 4.3,0.7 7.3,5.7 3.9,0.2 1.6,5.5 5.9,2.4 3.9,-0.8 0.4,-3 4,-0.9 2.5,-2 -0.1,-5.2 4.1,-1.2 0.3,-2.3 2.9,1.7 1.6,0.2 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="TL" data-name="Timor-Leste" data-id="TL" d="m 1676.8,631.9 4.9,-1.8 6,-2.8 2.2,-1.7 -2,-0.8 -1.8,0.8 -4,0.2 -4.9,1.4 -0.8,1.5 0.5,1.3 -0.1,1.9 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TN" data-name="Tunisia" data-id="TN" d="m 1038,361.4 -2,-1 -1.5,-3 -2.8,-0.1 -1.1,-3.5 3.4,-3.2 0.5,-5.6 -1.9,-1.6 -0.1,-3 2.5,-3.2 -0.4,-1.3 -4.4,2.4 0.1,-3.3 -3.7,-0.7 -5.6,2.6 -1,3.3 1,6.2 -1.1,5.3 -3.2,3.6 0.6,4.8 4.5,3.8 0,1.5 3.4,2.6 2.6,11.3 2.6,-1.4 0.4,-2.7 -0.7,-2.6 3.7,-2.5 1.5,-2 2.6,-1.8 0.1,-4.9 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TR" data-name="Turkey" data-id="TR" d="m 1166.6,308.9 -9.7,-4.4 -8.5,0.2 -5.7,1.7 -5.6,4 -9.9,-0.8 -1.6,4.8 -7.9,0.2 -5.1,6.1 3.6,3 -2,5 4.2,3.6 3.7,6.4 5.8,-0.1 5.4,3.5 3.6,-0.8 0.9,-2.7 5.7,0.2 4.6,3.5 8,-0.7 3.1,-3.7 4.6,1.5 3.2,-0.6 -1.7,2.4 2.3,3 1.2,-1.4 1.2,-1.5 -0.1,-3.6 1.9,1.3 5.5,-1.8 3,1.2 4.3,0 5.7,-2.5 2.8,0.2 5.9,-1.1 2.1,-1 6.2,0.9 2.1,1.6 2.3,-1.1 0,0 -3.7,-5.2 0.7,-2 -2.9,-7.3 3.3,-1.8 -2.4,-1.9 -4.2,-1.5 0,-3.1 -1.3,-2.2 -5.6,-3 -5.4,0.3 -5.5,3.2 -4.5,-0.6 -5.8,1 -7.8,-2.4 z m -49.6,4 2,-1.9 6.1,-0.4 0.7,-1.5 -4.7,-2 -0.9,-2.4 -4.5,-0.8 -5,2 2.7,1.6 -1.2,3.9 -1.1,0.7 0.1,1.3 1.9,2.9 3.9,-3.4 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="TW" data-name="Taiwan" data-id="TW" d="m 1642.3,427.2 1.2,-10.2 0.1,-3.9 -2.9,-1.9 -3.3,4.8 -1.9,6.3 1.5,4.7 4,5.4 1.3,-5.2 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TZ" data-name="Tanzania" data-id="TZ" d="m 1149.6,578.6 -2,0.8 2.3,3.6 -0.4,3.7 -1.6,0.8 0,0 0.3,2.5 1.2,1.5 0,2 -1.4,1.4 -2.2,3.3 -2.1,2.3 -0.6,0.1 -0.3,2.7 1.1,0.9 -0.2,2.7 1,2.6 -1.3,2.4 4.5,4.3 0.3,3.9 2.7,6.5 0,0 0.3,0.2 2.2,1.1 3.5,1.1 3.2,1.9 5.4,1.2 1.1,1.7 0,0 0.4,-1.2 2.8,3.4 0.3,6.7 1.8,2.4 0,0.1 2.1,-0.3 6.7,1.8 1.4,-0.8 3.9,-0.1 2.1,-1.9 3.3,0.1 6.2,-2.5 4.6,-3.7 0,0 -2,-1.4 -2.2,-6.3 -1.8,-3.9 0.4,-3.1 -0.3,-1.9 1.7,-3.9 -0.2,-1.6 -3.5,-2.3 -0.3,-3.6 2.8,-7.9 -8,-6.3 -0.4,-3.7 -20.2,-13 0,0 -2.8,2.8 -1.9,2.9 2.2,2.2 -3.2,1.6 -0.7,-0.8 -3.2,0.4 -2.5,1.4 -1.6,-2.4 1.1,-4.5 0.2,-3.8 0,0 0,0 -6.2,-0.1 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="UG" data-name="Uganda" data-id="UG" d="m 1167.6,545.1 -3.4,3 -4,-0.1 -4.5,1.5 -3.5,-1.4 -2.3,1.7 0,0 -0.3,7.5 2.3,0.8 -1.8,2.3 -2.2,1.7 -2.1,3.3 -1.2,3 -0.3,5.1 -1.3,2.4 -0.1,4.8 1.4,0.6 3.3,-1.9 2,-0.8 6.2,0.1 0,0 -0.3,-2.5 2.6,-3.7 3.5,-0.9 2.4,-1.5 2.9,1.2 0.3,0.5 0,-0.3 1.6,-2.6 2.7,-4.2 2.1,-4.7 -2.6,-7.3 -0.7,-3.2 -2.7,-4.4 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="UA" data-name="Ukraine" data-id="UA" d="m 1138.5,241 -4.8,0.5 -1.5,-0.3 -1,1.4 -1.8,-0.2 0,0 -4.1,0.3 -1.2,1.4 0.2,3.1 -2,-0.6 -4.3,0.3 -1.5,-1.5 -1.6,1.1 -2,-0.9 -3.8,-0.1 -5.6,-1.5 -5,-0.5 -3.7,0.2 -2.4,1.6 -2.2,0.3 3.1,5.3 -0.3,1.8 -2.3,0.7 -3.8,5.1 1.6,2.8 -1.1,-0.4 -1.1,1.7 -0.7,2.5 2.9,1.7 0.6,1.6 1.9,-1.3 3.2,0.7 3.2,0 2.4,1.5 1.6,-0.9 3.6,-0.6 1,-1.5 2.1,0 1.1,-0.9 3.2,-0.6 3.9,1.9 2,0.3 2.5,1.6 0,2.1 1.9,1.1 1.1,2.6 2,1.5 -0.2,1 1,0.6 -1.2,0.5 -3,-0.2 -0.6,-0.9 -1,0.5 0.5,1.1 -1.1,2 -0.5,2.1 -1.2,0.7 2.4,1.1 2.2,-1 2.4,1.1 3.3,-4.6 1.3,-3.4 4.5,-0.8 0.7,2.4 8,1.5 1.7,1.4 -4.5,2.1 -0.7,1.2 5.8,1.8 -0.6,2.9 3,1.3 6.3,-3.6 5.3,-1.1 0.6,-2.2 -5.1,0.4 -2.7,-1.5 -1,-3.9 3.9,-2.3 4.6,-0.3 3,-2 3.9,-0.5 -0.4,-2.8 2.2,-1.7 4.7,-0.5 0.3,-2.1 -1.8,-3.4 1.3,-3.2 -0.4,-1.9 -7.6,-2 -2.9,0.1 -3.6,-2.9 -3.5,1 -6.6,-2.2 -0.2,-1.2 -2.2,-2.7 -4,-0.2 -0.7,-1.9 0.9,-1.3 -3.8,-3.4 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="UY" data-name="Uruguay" data-id="UY" d="m 692.5,787 -2.1,-3.7 1.9,-3 -3.8,-4.3 -4.8,-3.5 -6.2,-4.1 -1.9,0.2 -6.2,-4.9 -3.4,0.7 -0.5,5.1 -0.3,6.5 1.1,6.3 -0.9,1.4 0.4,4.2 3.9,3.5 3.6,-0.2 5.4,2.7 2.7,-0.6 4.2,1.2 5.3,-3.5 1.6,-4 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="US" data-name="USA" data-id="US" d="m 116.7,450.7 2,-0.9 2.5,-1.4 0.2,-0.4 -0.9,-2.2 -0.7,-0.8 -0.8,-0.6 -1.9,-1.1 -0.4,-0.1 -0.4,0.6 0,1.3 -1.2,1 -0.4,0.7 0.4,2.3 -0.6,1.8 1.2,0.9 1,-1.1 z m -0.6,-9.9 0.6,-0.7 -1.2,-1 -1.8,-0.6 -0.7,0.5 0,0.4 0.5,0.5 0.6,1.4 2,-0.5 z m -3,-3.4 -2.6,-0.2 -0.6,0.7 2.9,0.2 0.3,-0.7 z m -4.7,-0.9 -1.1,-2.1 -0.3,-0.4 -1.7,0.9 0.1,0.2 0.4,1.5 1.8,0.2 0.4,0.1 0.4,-0.4 z m -8.3,-4.2 0.3,-1.5 -1.3,-0.1 -1,0.6 -0.4,0.5 1.6,1.1 0.8,-0.6 z m 412.1,-173.2 -1.6,0 -1.3,2.4 -10.1,0 -16.8,0 -16.7,0 -14.8,0 -14.7,0 -14.5,0 -15,0 -4.8,0 -14.6,0 -13.9,0 -1.6,5.1 -2.4,5.1 -2.3,1.6 1.1,-5.9 -5.8,-2.1 -1.4,1.2 -0.4,2.9 -1.8,5.4 -4.2,8.3 -4,5.6 -4,5.6 -5.4,5.8 -1.1,4.7 -2.8,5.3 -3.9,5.2 1,3.4 -1.9,5.2 1.5,5.4 1.3,2.2 -0.8,1.5 0.4,9 2.5,6.5 -0.8,3.5 1,1 4.6,0.7 1.3,1.7 2.8,0.3 -0.1,1.9 2.2,0.7 2.1,3.7 -0.3,3.2 6.3,-0.5 7,-0.7 -1,1.3 7.1,3.1 10.7,4.4 10.7,0 4.3,0 0.8,-2.6 9.3,0 1.3,2.2 2.1,2 2.4,2.8 0.8,3.3 0.4,3.5 2.2,1.9 4,1.9 4.8,-5 4.4,-0.1 3.1,2.5 1.6,4.4 1,3.7 2.4,3.6 0.2,4.5 0.8,3 3.9,2 3.6,1.4 2.1,-0.2 -0.6,-2.2 0.4,-3.1 1,-4.4 1.9,-2.8 3.7,-3.1 6,-2.7 6.1,-4.7 4.9,-1.5 3.5,-0.4 3.5,1.4 4.9,-0.8 3.3,3.4 3.8,0.2 2.4,-1.2 1.7,0.9 1.3,-0.8 -0.9,-1.3 0.7,-2.5 -0.5,-1.7 2.4,-1 4.2,-0.4 4.7,0.7 6.2,-0.8 3,1.5 2,3 0.9,0.3 6.1,-2.9 1.9,1 3,5.3 0.8,3.5 -2,4.2 0.4,2.5 1.6,4.9 2,5.5 1.8,1.4 0.4,2.8 2.6,0.8 1.7,-0.8 2,-3.9 0.7,-2.5 0.9,-4.3 -1.2,-7.4 0.5,-2.7 -1.5,-4.5 -0.7,-5.4 0.1,-4.4 1.8,-4.5 3.5,-3.8 3.7,-3 6.9,-4.1 1.3,-2.2 3.3,-2.3 2.8,-0.4 4.4,-3.8 6,-1.9 4.6,-4.8 0.9,-6.5 0.1,-2.2 -1.4,-0.4 1.5,-6.2 -3,-2.1 3.2,1 0,-4.1 1.9,-2.7 -1,5.3 2,2.5 -2.9,4.4 0.4,0.2 4.4,-5.1 2.4,-2.5 0.6,-2.5 -0.9,-1.1 -0.1,-3.5 1.2,1.6 1.1,0.4 -0.1,1.6 5.2,-4.9 2.5,-4.5 -1.4,-0.3 2.1,-1.8 -0.4,0.8 3.3,0 7.8,-1.9 -1.1,-1.2 -7.9,1.2 4.8,-1.8 3.1,-0.3 2.4,-0.3 4.1,-1.1 2.4,0.1 3.8,-1 1,-1.7 -1.1,-1.4 -0.2,2.2 -2.1,-0.1 -0.6,-3.3 1.1,-3.3 1.4,-1.3 3.9,-3.7 5.9,-1.8 6,-2.1 6.3,-3 -0.2,-2 -2.1,-3.5 2.8,-8.5 -1.5,-1.8 -3.7,1.1 -1.1,-1.7 -5.5,4.7 -3.2,4.9 -2.7,2.8 -2.5,0.9 -1.7,0.3 -1,1.6 -9.3,0 -7.7,0 -2.7,1.2 -6.7,4.2 0.2,0.9 -0.6,2.4 -4.6,2 -3.9,-0.5 -4,-0.2 -2.6,0.7 -0.3,1.8 0,0 -0.1,0.6 -5.8,3.7 -4.5,1.8 -2.9,0.8 -3.7,1.7 -4,0.9 -2.5,-0.3 -2.7,-1.3 2.7,-2.4 0,0 2,-2.2 3.7,-3.4 0,0 0,0 0.7,-2.5 0.5,-3.5 -1.6,-0.7 -4.3,2.8 -0.9,-0.1 0.3,-1.5 3.8,-2.5 1.6,-2.8 0.7,-2.8 -2.7,-2.4 -3.7,-1.3 -1.7,2.4 -1.4,0.6 -2.2,3.1 0.4,-2.1 -2.6,1.5 -2.1,2 -2.6,3.1 -1.3,2.6 0.1,3.8 -1.8,4 -3.3,3 -1.4,0.9 -1.6,0.7 -1.8,0 -0.3,-0.4 -0.1,-3.3 0.7,-1.6 0.7,-1.5 0.6,-3 2.5,-3.5 2.9,-4.3 4.6,-4.7 -0.7,0 -5.4,4 -0.4,-0.7 2.9,-2.3 4.7,-4 3.7,-0.5 4.4,-1.3 3.7,0.7 0.1,0 4.7,-0.5 -1.5,-2.5 0,0 -1.2,-0.2 0,0 0,0 -1.4,-0.3 -0.4,-1.7 -5.1,0.5 -5,1.4 -2.5,-2.3 -2.5,-0.8 3.1,-3.3 -5.3,2 -4.9,2.1 -4.6,1.5 -2.1,-2.1 -5.5,1.3 0.4,-0.9 4.6,-2.6 4.7,-2.5 5.9,-2.1 0,0 0,0 -5.3,-1.6 -4.4,0.8 -3.8,-1.9 -4.6,-1 -3.2,-0.4 -1,-1 0.8,-3.4 z m -240.6,-46.9 6.9,-2.8 0,-1.8 -2.6,-0.4 -3.4,0.9 -6.4,2.1 -2.2,2.7 0.7,1.6 7,-2.3 z m -38.7,-16.4 2.3,-2.3 -2.9,-0.5 -5.7,1 0.8,1.6 1.6,1.1 3.9,-0.9 z m 1.2,-22.3 -3.1,2.2 0.4,0.5 4.2,-0.4 0.3,1.1 1.7,1.2 4.9,-1.2 1.2,-0.6 -3.3,-0.8 -1.6,-1.5 -3.4,0.6 -1.3,-1.1 z m 124.9,-40.2 -4.4,-1.1 -10.2,2.8 -3.2,-0.3 -11,2.3 -4.8,0.6 -7.8,2.5 -4.8,2.6 -8.6,2.5 -7.6,0.1 -6.3,2.9 3.2,1.7 0.7,2.3 -0.8,2.7 2.3,2.1 -1.2,3.5 -9.2,0.2 4.3,-2.8 -3.4,0 -13.1,2.7 -9.1,2.3 1,3.3 -1.2,2.2 4.5,1.4 6.9,-0.7 1.8,1.3 2.9,-1.3 6.1,-1.2 2.7,0 -5.9,2.1 1.1,1 -2.5,2.6 -5.5,1.8 -2.5,-0.5 -7,2.7 -1.8,-0.9 -4.1,0.4 -5.3,3 -7.6,3.1 -5.8,3.4 0.3,2.4 -4,3.3 1.4,1.4 0.5,2.7 7.2,-1.1 0.4,2.1 -3.3,2.1 -3.6,3.5 2.8,0 7.2,-2.3 -1.6,2.9 3.6,-2.1 -0.4,3 4.8,-2.2 0.4,1.1 7.2,-1.8 -6.2,3.4 -5.7,4.5 -5.7,2.1 -2.3,1.2 -10.3,3.6 -4.9,2.4 -6.5,0.7 -8.5,3.3 -6.6,1.8 -8.1,2.8 -0.4,1 10,-1.7 6,-2 6.9,-2 6.1,-1.7 2.8,0.5 8.1,-2.6 4.5,-2.8 10.5,-3.1 3.9,-2.6 6.6,-1.8 7.6,-2.5 8.9,-4.2 -0.2,-2.9 11.1,-4.1 7.4,-3.9 9.2,-3.2 -0.4,1.4 -6.7,1.8 -8.3,5.7 -3.2,3.5 6.4,-1.3 6.1,-1.9 6.5,-1.3 2.9,-0.3 3.5,-4.1 6.3,-1.2 2.6,2.5 6,2.7 6.7,-0.5 5.7,2 3.2,1.1 3.3,6.1 3.7,1.7 7.1,0.2 4.1,0.4 -2.7,5.5 1.6,4.9 -3.3,5.2 2.5,1.9 0.6,2.2 0,0 5.1,-2.9 3.1,-3.7 -4.6,-3.8 1.5,-6.8 1.1,-4.2 -1.7,-2.7 -0.7,-2.4 0.5,-3 -6.4,1.9 -7.6,3.3 -0.2,-3.9 -0.6,-2.6 -2.7,-1.6 -4.2,-0.1 35.4,-32.4 24.3,-20.2 0,0 0,0 -3.5,-0.7 -4.1,-1.6 -6.5,0.8 -2.2,-0.7 -7.1,-0.5 -6.2,-1.6 -4.8,0.5 -4.9,-0.9 2,-1.2 -6.3,-0.3 -3.3,1 0.5,-2.4 z" style="fill-rule: evenodd; fill: url('#usa');"></path>
    <path inkscape:connector-curvature="0" id="UZ" data-name="Uzbekistan" data-id="UZ" d="m 1339.8,303.1 -2.5,1.2 -5.4,4.3 -0.9,4.5 -1.9,0 -2.3,-3 -6.6,-0.2 -2.6,-5 -2.5,-0.1 -1.5,-6.2 -7.5,-4.5 -8.6,0.5 -5.7,0.9 -6.5,-5.5 -4.8,-2.3 -9.1,-4.5 -1.1,-0.5 -11.9,3.6 6.2,22.8 5.8,-0.1 -1.6,-3.1 3.8,-2.2 3.3,-3.6 7.8,3.3 1.9,4.9 2.3,1.3 5.5,-0.3 2,1.2 4.3,6.4 7,4.4 4.2,3 6.2,3.2 7.7,2.7 0.8,4 2.9,0 4.3,1.4 1.3,-6.6 -2.4,-4.7 -4.2,-1.6 0.6,-2.8 4.4,0.3 1.5,-3.5 0.5,-4 6.4,-1.5 -0.2,2.9 1.3,1.8 2.1,-0.2 4.1,0.6 5.2,-4.5 -7.1,-3.3 -3.2,1.6 -4.6,-2.3 3.1,-4.1 -1.8,-0.6 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="VE" data-name="Venezuela" data-id="VE" d="m 642,518.9 -2.2,-1.5 -2.9,0.2 -0.7,-5.1 -4.1,-3.2 -4.4,-0.4 -1.8,-3 4.8,-1.9 -6.7,0.1 -6.9,0.4 -0.2,1.6 -3.2,1.9 -4.2,-0.7 -3.1,-2.9 -6,0.7 -5,-0.1 -0.1,-2.1 -3.5,-3.5 -3.9,-0.1 -1.7,-4.5 -2.1,2 0.6,3 -7.1,2.6 0,4.8 1.6,2.2 -1.5,4.6 -2.4,0.4 -1.9,-5 2.7,-3.7 0.3,-3.3 -1.7,-2.9 3.3,-0.8 0.3,-1.5 -3.7,1.1 -1.6,3.2 -2.2,1.8 -1.8,2.4 -0.9,4.5 -1.8,3.7 2.9,0.5 0.6,2.9 1.1,1.4 0.4,2.5 -0.8,2.4 0.2,1.3 1.3,0.6 1.3,2.2 7.2,-0.6 3.2,0.8 3.8,5.5 2.3,-0.7 4,0.3 3.2,-0.7 2,1.1 -1.2,3.4 -1.3,2.1 -0.5,4.6 1,4.2 1.5,1.9 0.2,1.5 -2.9,3.1 2,1.4 1.4,2.2 1.7,6.4 3,3.4 4.4,-0.5 1.1,-1.9 4.2,-1.5 2.3,-1 0.7,-2.7 4.1,-1.8 -0.3,-1.4 -4.8,-0.5 -0.7,-4 0.3,-4.3 -2.4,-1.6 1,-0.6 4.2,0.8 4.4,1.6 1.7,-1.5 4,-1 6.4,-2.4 2.1,-2.4 -0.7,-1.8 -3.7,-4.8 1.6,-1.8 0,-2.9 3.4,-1.1 1.5,-1.2 -1.9,-2.3 0.6,-2.3 4.6,-3.8 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="VN" data-name="Vietnam" data-id="VN" d="m 1571.6,435 -5.9,-1.6 -3,-2.6 0.2,-3.7 -5.2,-1.1 -3,-2.4 -4.1,3.4 -5.3,0.7 -4.3,0 -2.7,1.5 4,5.1 3.4,5.7 6.8,0.1 3,5.5 -3.3,1.7 -1.3,2.3 7.3,3.8 5.7,7.5 4.3,5.6 4.8,4.4 2,4.5 -0.2,6.4 1.8,4.2 0.1,7.7 -8.9,4.9 2.8,3.8 -5.8,0.5 -4.7,2.5 4.5,3.7 -1.3,4.3 2.3,4 6.6,-5.9 4.1,-5.3 6.1,-4.1 4.3,-4.2 -0.4,-11.2 -4,-11.7 -4.1,-5.1 -5.6,-4 -6.4,-8.3 -5.3,-6.7 0.5,-4.4 3.7,-6 6.5,-5.5 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="VU" data-name="Vanuatu" data-id="VU" d="m 1908.6,676.9 -2.7,-3.6 -0.6,1.7 1.3,2.8 2,-0.9 z m -2,-9.7 -2.3,-2 -0.9,4.9 0.5,1.8 1.2,-0.4 1.3,0.8 0.2,-5.1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="YE" data-name="Yemen" data-id="YE" d="m 1271.5,466.2 -2.1,-4.4 -5.2,-10.5 -15.7,2.4 -5,2.9 -3.5,6.7 -2.5,1 -1.6,-2.1 -2.1,0.3 -5.4,-0.6 -1,-0.7 -6.4,0.2 -1.5,0.6 -2.4,-1.7 -1.2,3.1 0.7,2.7 -2.3,2.1 0.4,2.7 -0.6,1.3 0.7,2.9 -1.1,0.3 1.7,2.6 1.3,4.7 1,1.9 0,3.4 1.6,3.8 3.9,0.3 1.8,-0.9 2.7,0.2 0.8,-1.7 1.5,-0.4 1.1,-1.7 1.4,-0.4 4.7,-0.3 3.5,-1.2 3.1,-2.7 1.7,0.4 2.4,-0.3 4.7,-4.5 8.8,-3 5.3,-2.7 0,-2.1 0.9,-2.9 3.9,-1.7 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ZA" data-name="South Africa" data-id="ZA" d="m 1148.2,713.7 -2.9,-0.6 -1.9,0.8 -2.6,-1.1 -2.2,-0.1 -8,4.7 -5.2,4.7 -2,4.3 -1.7,2.4 -3,0.5 -1.2,3 -0.6,2 -3.6,1.5 -4.4,-0.3 -2.5,-1.8 -2.3,-0.8 -2.7,1.5 -1.5,3.1 -2.7,1.9 -2.8,2.8 -4,0.7 -1.1,-2.3 0.7,-3.8 -3,-6.1 -1.4,-1 -1.1,23.6 -5,3.2 -2.9,0.5 -3.3,-1.2 -2.4,-0.5 -0.8,-2.7 -2.1,-1.8 -2.7,3.2 3.5,8.2 0,0.1 2.5,5.3 3.2,6 -0.2,4.8 -1.7,1.2 1.4,4.2 -0.2,3.8 0.6,1.7 0.3,-0.9 2.1,2.9 1.8,0.1 2.1,2.3 2.4,-0.2 3.5,-2.4 4.6,-1 5.6,-2.5 2.2,0.3 3.3,-0.8 5.7,1.2 2.7,-1.2 3.2,1 0.8,-1.8 2.7,-0.3 5.8,-2.5 4.3,-2.9 4.1,-3.8 6.7,-6.5 3.4,-4.6 1.8,-3.2 2.5,-3.3 1.2,-0.9 3.9,-3.2 1.6,-2.9 1.1,-5.2 1.7,-4.7 -4.1,0 -1.3,2.8 -3.3,0.7 -3,-3.5 0.1,-2.2 1.6,-2.4 0.7,-1.8 1.6,-0.5 2.7,1.2 -0.4,-2.3 1.4,-7.1 -1.1,-4.5 -2.2,-9 z m -20.1,52.8 -2,0.6 -3.7,-4.9 3.2,-4 3.1,-2.5 2.6,-1.3 2.3,2 1.7,1.9 -1.9,3.1 -1.1,2.1 -3.1,1 -1.1,2 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="ZM" data-name="Zambia" data-id="ZM" d="m 1149.2,626.7 -1.9,-0.5 0.4,-1.3 -1,-0.3 -7.5,1.1 -1.6,0.7 -1.6,4.1 1.2,2.8 -1.2,7.5 -0.8,6.4 1.4,1.1 3.9,2.5 1.5,-1.2 0.3,6.9 -4.3,0 -2.1,-3.5 -2,-2.8 -4.3,-0.8 -1.2,-3.4 -3.4,2 -4.5,-0.9 -1.8,-2.8 -3.5,-0.6 -2.6,0.1 -0.3,-2 -1.9,-0.1 0.5,2 -0.7,3 0.9,3 -0.9,2.4 0.5,2.2 -11.6,-0.1 -0.8,20.3 3.6,5.2 3.5,4 4.6,-1.5 3.6,0.4 2.1,1.4 0,0.5 1,0.5 6.2,0.7 1.7,0.7 1.9,-0.1 3.2,-4.1 5.1,-5.3 2,-0.5 0.7,-2.2 3.3,-2.5 4.2,-0.9 -0.3,-4.5 17.1,-5.2 -2.9,-1.7 1.9,-5.9 1.8,-2.2 -0.9,-5.3 1.2,-5.1 1,-1.8 -1.2,-5.4 -2.6,-2.8 -3.2,-1.9 -3.5,-1.1 -2.2,-1.1 -0.3,-0.2 0,0 0.5,1.1 -1,0.4 -1.2,-1.4 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ZW" data-name="Zimbabwe" data-id="ZW" d="m 1148.2,713.7 6.2,-7.2 1.6,-4.6 0.9,-0.6 0.8,-3.7 -0.8,-1.9 0.5,-4.7 1.3,-4.4 0.3,-8.1 -2.8,-2 -2.6,-0.5 -1.1,-1.6 -2.6,-1.3 -4.6,0.1 -0.3,-2.4 -4.2,0.9 -3.3,2.5 -0.7,2.2 -2,0.5 -5.1,5.3 -3.2,4.1 -1.9,0.1 -1.7,-0.7 -6.2,-0.7 1.9,5.1 1.1,1.1 1.6,3.7 6,7 2.3,0.7 -0.1,2.2 1.5,4.1 4.2,0.9 3.4,2.9 2.2,0.1 2.6,1.1 1.9,-0.8 2.9,0.6 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="SO" data-name="Somalia" data-id="SO" d="m 1223.4,505.7 -2.6,-2.7 -1.2,-2.6 -1.8,-1.2 -2,3.4 -1.1,2.3 2.2,3.5 2.1,3.1 2.2,2.2 18.5,7.6 4.8,-0.1 -15.4,19.1 -7.4,0.3 -4.9,4.5 -3.6,0.1 -1.5,2 -4.8,7.2 0.2,23.2 3.3,5.3 1.3,-1.5 1.3,-3.4 6.1,-7.7 5.3,-4.8 8.3,-6.4 5.6,-5.1 6.4,-8.7 4.7,-7.1 4.6,-9.3 3.2,-8.2 2.5,-7.1 1.3,-6.8 1.1,-2.3 -0.2,-3.4 0.4,-3.7 -0.2,-1.7 -2.1,0 -2.6,2.2 -2.9,0.6 -2.5,0.9 -1.8,0.2 0,0 -3.2,0.2 -1.9,1.1 -2.8,0.5 -4.8,1.9 -6.1,0.8 -5.2,1.6 -2.8,0 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="GF" data-name="French Guiana" data-id="GF" d="m 681.4,556.2 1.8,-4.7 3.5,-5.8 -0.9,-2.6 -5.8,-5.4 -4.1,-1.5 -1.9,-0.7 -3.1,5.5 0.4,4.4 2.1,3.7 -1,2.7 -0.6,2.9 -1.4,2.8 2.4,1.3 1.8,-1.8 1.2,0.3 0.8,1.8 2.7,-0.5 2.1,-2.4 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="FR" data-name="France" data-id="FR" d="m 1025.7,303.8 -1.1,-5.2 -3.2,2.3 -1,2.3 1.4,4.2 2.4,1.2 1.5,-4.8 z m -31.5,-50.9 -2.4,-2.4 -2.2,-0.1 -0.7,-2.2 -4.3,1.2 -1.4,5.1 -11.3,4.8 -4.6,-2.6 1.4,7 -8.2,-1.6 -6.4,1.3 0.4,4.6 7.5,2.4 3.6,3.1 5.1,6.5 -1,12.3 -2.7,3.7 2,2.4 9.4,2.8 1.9,-1.3 5.7,2.8 6,-0.8 0.5,-3.7 7.4,-2 10,1.6 4.5,-3.4 0.5,-2.7 -2.7,-0.8 -1.5,-4.8 1.7,-1.8 -1.6,-2.4 0.2,-1.7 -1.8,-2.7 -2.4,0.9 0,-2.8 3.5,-3.5 -0.2,-1.6 2.3,0.6 1.3,-1 0.5,-4.5 2.3,-4.2 -7.1,-1.2 -2.4,-1.6 -1.4,0.1 -1.1,-0.5 -4.4,-2.8 -2.5,0.4 -3.4,-2.9 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ES" data-name="Spain" data-id="ES" d="m 985,325.7 0,-0.2 -0.5,0 -0.3,-0.4 -0.1,0.2 -0.1,0.2 0,0.2 0.5,0 0.4,0.1 0.1,-0.1 z m -0.8,-1.6 0.3,0 0.6,-0.7 0,-0.3 -0.3,-0.2 -1.1,0.2 -0.2,0.3 0,0.3 -0.3,0.1 -0.1,0.4 0.1,0.2 0.8,0.1 0.2,-0.4 z M 967,296 l -8.2,-0.2 -4.2,0.3 -5.4,-1 -6.8,0 -6.2,-1.1 -7.4,4.5 2,2.6 -0.4,4.4 1.9,-1.6 2.1,-0.9 1.2,3.1 3,0 0.9,-0.8 3,0.2 1.3,3.1 -2.4,1.7 -0.2,4.9 -0.9,0.9 -0.3,3 -2.2,0.5 2,3.8 -1.6,4.3 1.8,1.9 -0.8,1.7 -2,2.5 0.4,2.1 4.8,1 1.4,3.7 2,2.2 2.5,0.6 2.1,-2.5 3.3,-2.3 5,0.1 6.7,0 3.8,-5 3.9,-1.3 1.2,-4.2 3,-2.9 -2,-3.7 2,-5.1 3.1,-3.5 0.5,-2.1 6.6,-1.3 4.8,-4.2 -0.3,-3.5 -6,0.8 -5.7,-2.8 -1.9,1.3 -9.4,-2.8 -2,-2.4 z m 26,22.6 0.1,-0.3 0.1,-0.2 0.1,-0.1 -0.2,-0.2 0,-0.1 0.2,-0.2 -0.2,-0.1 -1.3,0.4 -0.7,0.4 -2.1,1.5 0,0.3 0.1,0.2 0.4,0 0.2,0.4 0.4,-0.4 0.3,-0.1 0.3,0.1 0.3,0.2 0.1,0.6 0.1,0.2 0.6,0.1 0.9,0.4 0.4,-0.2 0.5,-0.3 0.2,-0.6 0.3,-0.5 0.3,-0.5 0.3,-0.4 -0.1,-0.4 -0.3,-0.1 -0.3,-0.1 -0.5,0.2 -0.5,-0.2 z m 6,-0.3 0.1,-0.4 0,-0.1 -0.5,-0.7 -0.9,-0.3 -1,0.1 -0.1,0.1 0,0.4 0.1,0.1 0.6,0.1 1.6,0.7 0.1,0 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AW" data-name="Aruba" data-id="AW" d="m 586.6,492.9 -0.1,-0.1 -0.3,-0.6 -0.3,-0.3 -0.1,0.1 -0.1,0.3 0.3,0.3 0.3,0.4 0.3,0.1 0,-0.2 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AI" data-name="Anguilla" data-id="AI" d="m 627.9,456.2 0.1,-0.2 -0.2,-0.1 -0.8,0.5 0,0.1 0.9,-0.3 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="AD" data-name="Andorra" data-id="AD" d="m 985.4,301.7 0.1,-0.2 0.1,-0.2 0,-0.1 -0.2,-0.1 -0.7,-0.2 -0.3,-0.1 -0.2,0.1 -0.2,0.2 -0.1,0.3 0.1,0.1 0,0.2 0,0.2 0.1,0.2 0.2,0 0.2,0 0.3,-0.1 0.5,-0.3 0.1,0 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="AG" data-name="Antigua and Barbuda" data-id="AG" d="m 634.3,463.8 0.2,-0.1 0,-0.1 0,-0.2 -0.1,-0.1 -0.1,-0.2 -0.4,-0.2 -0.5,0.5 0,0.2 0.1,0.3 0.6,0.1 0.2,-0.2 z m 0.2,-3.5 0,-0.5 -0.1,-0.2 -0.3,0 -0.1,-0.1 -0.1,0 -0.1,0.1 0.1,0.6 0.5,0.3 0.1,-0.2 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BS" data-name="Bahamas" data-id="BS" d="m 574.4,437.3 0.2,-0.6 -0.3,-0.1 -0.5,0.7 -0.6,0.3 -0.3,0 -0.7,-0.3 -0.5,0 -0.4,0.5 -0.6,0.1 0.1,0.1 0,0.2 -0.2,0.3 0,0.2 0.1,0.3 1.5,-0.1 1.3,-0.2 0.7,-0.9 0.2,-0.5 z m 0.8,-2 -0.4,-0.3 -0.4,0.3 0.1,0.3 0.7,-0.3 z m 0,-5.8 -0.4,-0.2 -0.3,0.5 0.3,0.1 0.7,-0.1 0.5,0.1 0.5,0.4 0.3,-0.2 -0.1,-0.1 -0.4,-0.3 -0.6,-0.1 -0.2,0 -0.3,-0.1 z m -6.6,1.3 0.7,-0.6 0.7,-0.3 0.9,-1.1 -0.1,-0.9 0.2,-0.4 -0.6,0.1 -0.1,0.3 -0.1,0.3 0.3,0.4 0,0.2 -0.2,0.4 -0.3,0.1 -0.1,0.2 -0.3,0.1 -0.4,0.5 -0.8,0.6 -0.2,0.3 0.4,-0.2 z m 1.2,-3.2 -0.6,-0.2 -0.2,-0.4 -0.4,-0.1 -0.1,0.2 0,0.2 0.1,0.4 0.2,-0.1 0.8,0.4 0.4,-0.3 -0.2,-0.1 z m -4.1,-1.1 0,-0.7 -0.4,-0.5 -0.6,-0.4 -0.1,-1.2 -0.3,-0.7 -0.2,-0.6 -0.4,-0.8 0,0.5 0.1,0.1 0.1,0.6 0.4,0.9 0.1,0.4 -0.1,0.4 -0.4,0.1 -0.1,0.2 0.5,0.3 0.8,0.3 0.5,1.3 0.1,-0.2 z m -4.1,-3.5 -0.5,-0.3 -0.2,-0.3 -0.7,-0.7 -0.3,-0.1 -0.2,0.4 0.4,0.1 0.9,0.7 0.4,0.2 0.2,0 z m 7.3,-4 -0.1,-0.3 -0.1,0 -0.3,0.1 -0.3,0.9 0.3,0 0.5,-0.7 z m -17.6,-1.1 -0.2,-0.3 -0.3,0.2 -0.5,0 -0.2,0.1 -0.4,0 -0.3,0.2 0.4,0.8 0.3,0.3 0.1,1 0.2,0.1 -0.1,0.7 1.1,0.1 0.4,-0.8 0,-0.3 0,-0.1 0,-0.2 0,-0.2 0,-0.9 -0.3,-0.5 -0.4,0.6 -0.4,-0.3 0.6,-0.4 0,-0.1 z m 12.9,0.3 -1,-1.4 0,-0.2 -0.5,-1.5 -0.3,-0.1 -0.1,0.1 -0.1,0.2 0.4,0.4 0,0.4 0.3,0.2 0.4,1.1 0.4,0.4 -0.1,0.3 -0.4,0.3 -0.1,0.2 0.1,0 0.6,-0.1 0.4,0 0,-0.3 z m -10.5,-5.2 0.5,-0.2 0,0 -0.3,-0.2 -0.7,0 -0.4,0.1 -0.2,0.2 0.1,0.1 0.4,0.1 0.6,-0.1 z m -2.4,2 -0.5,-0.6 -0.3,-0.9 -0.2,-0.4 0.1,-0.5 -0.3,-0.4 -0.6,-0.4 -0.3,0.1 0.1,1.1 -0.2,0.6 -0.8,1.1 0.1,0.4 0,0 0.1,0.2 -0.5,0.4 0,-0.3 -0.6,0.1 0.3,0.5 0.6,0.4 0.3,0.1 0.3,-0.2 0,0.5 0.3,0.4 0.1,0.4 0.3,-0.3 0.6,-0.2 0.2,-0.2 0.7,-0.4 0,-0.2 0.1,-0.6 0.1,-0.7 z m 6.7,-5 -0.3,-0.5 -0.1,0.1 -0.1,0.4 -0.3,0.4 0.5,-0.1 0.4,0.1 0.6,0.5 0.7,0.2 0.3,0.6 0.6,0.6 0,0.6 -0.4,0.6 -0.1,0.7 -0.6,0.1 0.1,0.1 0.3,0.3 0.1,0.4 0.2,0.2 0,-0.7 0.3,-0.8 0.4,-1.3 -0.1,-0.3 -0.3,-0.3 -0.7,-0.9 -0.7,-0.3 -0.8,-0.7 z m -8.8,-7.9 -0.5,-0.4 -0.2,0.4 0,0.1 -0.1,0.3 -0.5,0.4 -0.5,0.1 -0.7,-0.6 -0.2,-0.1 0.8,1.1 0.3,0.1 0.4,0 0.9,-0.3 1.6,-0.5 1.7,-0.2 0.1,-0.2 -0.1,-0.3 -0.8,0.2 -1,-0.1 -0.2,0.2 -0.4,0 -0.6,-0.2 z m 6.1,5.2 0.2,-0.3 0.4,-1.8 0.8,-0.6 0.1,-1.2 -0.5,-0.5 -0.4,-0.2 -0.1,-0.2 0.1,-0.2 -0.2,-0.1 -0.3,-0.2 -0.4,-0.6 -0.4,-0.4 -0.7,-0.1 -0.6,-0.1 -0.4,-0.1 -0.5,0.3 0.8,0 1.5,0.3 0.7,1.5 0.5,0.4 0.1,0.4 -0.2,0.4 0,0.4 -0.3,0.5 -0.1,0.8 -0.3,0.4 -0.7,0.5 0.4,0.2 0.3,0.6 0.2,-0.1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BM" data-name="Bermuda" data-id="BM" d="m 630.2,366.8 0.4,-0.6 -0.1,0 -0.5,0.5 -0.6,0.2 0.1,0.1 0.1,0 0.6,-0.2 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="BB" data-name="Barbados" data-id="BB" d="m 644.9,488.9 0.4,-0.4 -0.3,-0.3 -0.6,-0.8 -0.3,0.1 0,1 0.1,0.3 0.5,0.3 0.2,-0.2 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="KM" data-name="Comoros" data-id="KM" d="m 1221.1,650.5 -0.4,-0.4 -0.4,0 0,0.2 0.1,0.4 1.1,0.2 -0.4,-0.4 z m 3.9,-1.5 -0.1,0 -0.2,0.1 -0.1,0.2 -0.1,0.3 -0.3,0 -0.2,0 -0.4,0 0.8,0.5 0.5,0.5 0.2,0.2 0.1,-0.2 0.1,-0.7 -0.3,-0.9 z m -5.6,-1.1 0.2,-0.3 -0.2,-0.7 -0.4,-0.8 0.1,-1.4 -0.2,-0.2 -0.3,0 -0.1,0.1 -0.1,0.3 -0.3,2 0.4,0.6 0.3,0.1 0.5,0.4 0.1,-0.1 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CV" data-name="Cape Verde" data-id="CV" d="m 841.4,477.6 0.1,-0.4 -0.2,-0.6 -0.3,-0.1 -0.6,0.4 -0.1,0.3 0.1,0.3 0.3,0.3 0.3,0.1 0.4,-0.3 z m 6.3,-1.7 0.4,-0.2 0,-0.7 -0.1,-0.3 -0.4,0 -0.2,0.4 0,0.1 0,0.4 0.2,0.3 0.1,0 z m -1.4,0.8 -0.5,-0.9 -0.3,-0.1 -0.6,-0.7 0,-0.3 -0.3,-0.1 0,0.2 0,0.4 -0.2,0.5 0,0.5 0.4,0.8 0.4,0.2 0.7,0.1 0.4,-0.6 z m 3.1,-7.8 0,0.5 -0.3,0.7 0.5,0.3 0.3,0.1 0.6,-0.4 0.2,-0.5 -0.1,-0.3 -0.3,-0.3 -0.3,-0.1 -0.1,0.1 -0.5,-0.1 z m -6.4,-2.5 -1,-0.1 -0.6,-0.2 -0.1,0 0,0.3 0.4,0.8 0.2,-0.5 0.2,-0.1 0.8,0.2 0.4,-0.1 -0.1,-0.1 -0.2,-0.2 z m 6.7,-0.2 -0.1,-0.5 0,-0.7 -0.2,0 -0.3,0.2 0.1,0.7 0.1,0.1 0.2,0.5 0.2,-0.3 z m -11.1,-1 0,-0.2 -0.3,-0.5 -0.3,0.1 -0.4,0.2 -0.1,0.3 0.4,0.2 0.2,0 0.5,-0.1 z m -1.5,-0.9 0.8,-0.6 0.2,-0.3 -0.2,-0.5 -0.5,-0.1 -1.2,0.6 -0.1,0.2 0.1,0.3 0.1,0.5 0.2,0.1 0.6,-0.2 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="KY" data-name="Cayman Islands" data-id="KY" d="m 527,449.1 -0.1,-0.3 -0.1,0.1 0,0.6 0.5,0 0.2,0 0.3,-0.2 0.6,0 -0.1,-0.2 -0.8,-0.1 -0.1,0.1 -0.2,0.1 -0.2,-0.1 z m 8,-2.3 0,0 -0.1,-0.1 -0.1,0 -0.3,0.1 -0.1,0 -0.1,0 -0.1,0.1 -0.1,0.1 0.2,0 0.4,-0.2 0.2,0 0.1,0 z m 0.8,-0.1 0.5,-0.2 0,0 -0.1,-0.1 -0.1,0 -0.1,0.1 -0.1,0 -0.5,0.3 0.2,0 0.2,-0.1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="DM" data-name="Dominica" data-id="DM" d="m 635.8,475.1 0.3,-0.7 -0.1,-1 -0.2,-0.4 -0.8,-0.3 0,0.2 -0.1,0.5 0.3,0.8 0.1,1.1 0.5,-0.2 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="FK" data-name="Falkland Islands" data-id="FK" d="m 690.3,902.7 -0.1,-0.3 -0.4,-0.2 -0.2,-0.1 0.1,0.2 0.1,0.3 0.1,0.2 0.2,0.1 0.2,-0.2 z m 5.5,-1.3 -0.1,-0.1 -0.2,0 -0.1,0.2 0.2,0.3 0.4,0.1 -0.2,-0.5 z m -12.9,-1.4 -0.1,0.2 -0.4,0.1 0.2,0.3 0.6,0.4 0.4,0 0.1,-0.3 -0.1,-0.6 -0.3,0 -0.4,-0.1 z m 2.8,-2 -0.9,-0.3 -0.4,-0.3 -0.3,0 0.4,0.4 0.1,0.2 0.1,0.2 0.6,0.3 0.6,0.3 0.4,0.3 -0.1,0.1 -0.8,0.3 -0.3,0 -0.2,0.1 0.4,0.2 0.6,-0.1 0.2,-0.1 0.2,0 0.3,0.1 0,0.2 -0.1,0.2 -0.2,0.2 -0.4,0.3 -0.6,0.4 -0.8,0 -0.7,0.7 0.9,0.5 0.7,0.3 0.9,0 0,-0.1 0.2,-0.1 0.3,0 0.1,-0.1 0.2,-0.4 0,-0.6 0.2,0 0.3,0.1 0.7,-0.1 0.3,-0.1 0.6,-0.9 0.4,-0.8 0.2,-0.4 0.3,-0.2 0.1,-0.2 0.1,-0.3 0.3,-0.2 0,-0.3 -0.4,-0.2 -0.3,-0.2 -0.3,0.3 -0.2,-0.1 -0.9,0.3 -0.4,0 -0.3,-0.2 -0.4,-0.1 -0.4,0.1 -0.5,0.5 -0.8,-0.2 z m 0.7,-0.4 0.1,-0.3 -0.1,-0.2 -0.5,-0.2 -0.5,0 0.2,0.5 0.2,0.2 0.6,0 z m 5.9,-0.7 -0.4,0 0.4,0.5 -0.8,0.8 0.2,0.6 0.3,0.4 0.1,0.2 -0.1,0.1 -0.4,0.1 -0.3,0.1 -0.2,0.3 -0.9,0.9 0.2,0.2 -0.3,0.7 0.2,0.3 0.8,0.7 0.8,0.4 0,-0.7 0.4,-0.1 0.4,0.2 0.4,-0.2 -0.9,-1 0.3,0 2.5,0.5 -0.1,-0.4 -0.1,-0.2 -0.3,-0.4 1.5,-0.4 0.5,-0.3 0.2,-0.3 0.6,-0.1 0.8,-0.3 -0.1,-0.1 0.1,-0.3 -0.4,-0.2 -0.5,-0.1 0.1,-0.3 0.5,-0.1 -0.8,-0.7 -0.3,-0.1 -1,0.1 -0.3,0.1 0,0.2 0.1,0.3 0.3,0.3 0.1,0.2 -0.2,-0.1 -1.1,-0.4 -0.2,-0.1 -0.2,-0.4 0.2,-0.1 0.3,0.1 0.1,-0.3 -0.4,-0.3 -0.4,-0.1 -0.9,0.1 -0.8,-0.3 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="FO" data-name="Faeroe Island" data-id="FO" d="m 947,186.9 0,-0.3 -0.1,-0.3 0,-0.2 -0.1,0 -0.5,-0.1 -0.1,-0.2 -0.1,0 0,0.2 0.1,0.4 0.5,0.4 0.3,0.2 0.1,0 -0.1,-0.1 z m 0.5,-2.1 0,-0.1 -0.2,-0.2 -0.5,-0.2 -0.2,-0.1 -0.2,0.1 0,0.2 0.1,0.1 0.4,0.1 0.4,0.3 0.1,0 0.1,-0.2 z m -2.4,-1.9 -0.2,-0.1 -0.5,0.1 -0.3,0 0.1,0.3 0.6,0.2 0.3,0 0.3,0 0.2,-0.1 -0.1,-0.2 -0.4,-0.2 z m 2.5,-0.5 -0.8,-0.2 -0.6,-0.3 -1,0.1 0.7,1.1 0.8,0.7 0.4,0.2 0,-0.1 0,-0.2 -0.4,-0.5 -0.1,-0.1 0,-0.1 0.1,-0.1 0.2,0 0.3,0.2 0.2,0 0.2,-0.7 z m 1,-0.2 -0.3,-0.2 -0.4,-0.4 0,0.5 0,0.3 0,0.1 0.1,0 0.3,0.1 0.3,-0.4 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GD" data-name="Grenada" data-id="GD" d="m 632.1,495.7 0.5,-0.2 0.2,-1.1 -0.3,-0.1 -0.3,0.3 -0.3,0.5 0,0.4 -0.2,0.3 0.4,-0.1 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="HK" data-name="Hong Kong" data-id="HK" d="m 1604.9,430.9 0,-0.2 0,-0.2 -0.4,-0.2 -0.3,0 0.1,0.2 0.4,0.5 0.2,-0.1 z m -1.3,0 -0.1,-0.5 0.2,-0.3 -0.9,0.3 -0.1,0.3 0,0.1 0.2,0.1 0.7,0 z m 1.6,-1.2 -0.1,-0.3 -0.2,-0.1 -0.1,-0.3 -0.1,-0.2 0,0 -0.3,-0.1 -0.2,-0.1 -0.4,0 -0.1,0.1 -0.2,0 -0.2,0.2 0,0 0,0.2 -0.5,0.4 0,0.2 0.3,0.2 0.5,-0.1 0.6,0.2 0.8,0.3 0,-0.2 0,-0.3 0.2,-0.1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="KN" data-name="Saint Kitts and Nevis" data-id="KN" d="m 629.9,463.2 0,-0.3 -0.2,-0.2 -0.3,0 0,0.5 0.2,0.2 0.3,-0.2 z m -0.5,-0.7 -0.1,-0.2 -0.1,-0.1 -0.2,-0.4 -0.4,-0.4 -0.2,0.1 -0.1,0.2 0,0.1 0,0 0.3,0.3 0.4,0.1 0.2,0.4 0.2,-0.1 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LC" data-name="Saint Lucia" data-id="LC" d="m 637.4,484.2 0.1,-1.2 -0.1,-0.5 -0.2,0.1 -0.3,0.4 -0.4,0.6 -0.1,0.3 0,0.6 0.6,0.4 0.4,-0.7 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="LI" data-name="Liechtenstein" data-id="LI" d="m 1024.4,273.6 0,-0.2 0.1,-0.2 -0.1,-0.1 -0.1,-0.2 -0.1,-0.1 0,-0.2 -0.1,-0.1 0,-0.2 -0.1,-0.1 -0.2,0.6 0,0.5 0.1,0.2 0.1,0 0.4,0.1 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="MV" data-name="Maldives" data-id="MV" d="m 1389.1,551.6 0.1,-0.1 0,-0.2 -0.1,-0.1 -0.1,0 -0.1,0.2 0,0.1 0,0.1 0.2,0 z m 0.3,-5.9 0.1,-0.2 0,-0.1 0,-0.1 0,-0.1 0,-0.1 -0.1,0.1 -0.1,0.2 0,0.1 -0.1,0.1 0,0.1 0.1,0 0.1,0 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MT" data-name="Malta" data-id="MT" d="m 1053.6,344 -0.2,-0.2 -0.5,-0.5 -0.5,-0.1 0.1,0.6 0.4,0.4 0.5,0 0.2,-0.2 z m -1.4,-1.2 0,0 0,-0.2 -0.3,-0.1 -0.4,0.1 0.1,0.1 0.3,0.2 0.3,-0.1 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MS" data-name="Montserrat" data-id="MS" d="m 631.8,465.7 -0.1,-0.5 -0.1,0 -0.2,0.4 0,0.3 0.3,0.1 0.1,-0.3 z" style="fill-rule: evenodd; fill: rgb(255, 26, 26);"></path>
    <path inkscape:connector-curvature="0" id="MU" data-name="Mauritius" data-id="MU" d="m 1294.7,702.5 0.3,-0.3 0.2,-0.4 0.3,-0.3 0.1,-0.7 -0.2,-0.8 -0.4,-0.7 -0.5,0.1 -0.3,0.4 -0.2,0.5 -0.5,0.3 -0.1,0.3 -0.2,0.7 -0.1,0.4 -0.2,0.1 0,0.2 0.3,0.3 0.8,0.1 0.7,-0.2 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="NC" data-name="New Caledonia" data-id="NC" d="m 1897.3,716.1 0,-0.3 -0.4,-0.2 -0.2,0.5 0,0.1 0.2,0.1 0.2,0 0.2,-0.2 z m 4.6,-7.6 -0.1,-0.1 0,-0.3 0.1,-0.2 -0.4,0.2 -0.6,0.2 0.1,0.8 -0.1,0.4 0.3,0.1 0.1,0.3 0.2,0 0.7,-0.2 0.3,-1.1 -0.4,0 -0.2,-0.1 z m -3,-1.7 0.3,-0.5 0.1,-0.2 -0.2,-0.7 -0.3,-0.3 0.3,-1 -0.1,-0.2 -0.4,-0.2 -0.9,0.3 -0.1,0.2 0.5,0.1 0.2,0.2 -0.5,0.7 -0.5,0.1 0.1,0.5 0.2,0.4 0.7,0.2 0.3,0.4 0.3,0 z m -3.9,-2.9 0.3,-0.3 0.3,-0.4 -0.1,-0.1 0,-0.3 0.2,-0.4 0.3,-0.1 -0.2,-0.2 -0.2,-0.1 0,0.3 -0.3,0.7 -0.1,0.3 -0.5,0.6 0.3,0 z m -12.3,-2.9 -0.6,-0.7 -0.1,0.2 -0.1,0.4 0,0.3 0.3,0.2 0.1,0.2 -0.1,0.5 0,0.4 0.6,0.9 0.1,0.7 0.3,0.6 0.5,0.5 0.4,0.5 0.8,1.4 0.2,0.5 0.4,0.3 1,1.2 0.4,0.4 0.4,0.2 0.9,0.7 0.6,0.3 0.3,0.5 0.6,0.3 0.8,0.4 0.1,0.2 0,0.3 0.1,0.3 0.5,0.4 0.6,0.3 0.1,0.2 0.1,0.2 0.3,-0.1 0.3,0.1 0.9,0.7 0.4,-0.1 0.3,0 0.5,-0.2 0.3,-0.4 -0.1,-1.1 -0.5,-0.5 -0.7,-0.4 -0.4,-0.5 -0.4,-0.5 -0.8,-1 -1.1,-1 -0.5,-0.2 -0.3,-0.4 -0.3,-0.1 -0.2,-0.3 -0.5,-0.3 -0.3,-0.6 -0.6,-0.6 -0.1,-0.3 0.1,-0.3 -0.1,-0.3 -0.4,-0.3 -0.2,-0.5 -0.2,-0.3 -0.4,-0.2 -0.7,-0.4 -1.6,-1.9 -0.7,-0.6 -0.7,0.2 -0.6,-0.4 z m -22,-6 0.2,-0.4 0.1,-0.8 -0.2,0.4 -0.2,1 0.1,-0.2 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="NR" data-name="Nauru" data-id="NR" d="m 1915,575.5 0,-0.2 -0.1,0 -0.1,0 -0.1,0.2 0.1,0.1 0.1,0.1 0.1,-0.2 z" style="fill-rule: evenodd; fill: rgb(179, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PN" data-name="Pitcairn Islands" data-id="PN" d="m 274.2,727.4 0,-0.2 -0.1,-0.2 -0.2,-0.1 -0.1,0.1 0.1,0.2 0.2,0.2 0.1,0.1 0,-0.1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PR" data-name="Puerto Rico" data-id="PR" d="m 600.8,457.3 0,-0.1 0,0 0.1,0 0,-0.1 0.1,-0.1 0,0 0,-0.1 -0.1,0 0,0 -0.3,0 -0.1,0 0,0.1 0,0.1 0.2,0.1 0,0 0,0.1 0.1,0 0,0 z m 13.6,-0.3 0.7,-0.2 0,-0.1 -0.4,-0.1 -0.6,0 -0.5,0.2 0.1,0.2 0.2,0 0.5,0 z m -3.7,-2.2 -0.1,-0.2 -0.2,0 -3.5,-0.1 -1.3,-0.2 -0.3,0.1 -0.3,0.1 -0.1,0.4 -0.2,0.2 -0.3,0.2 0.1,0.3 0.1,0.2 0.2,0.4 -0.1,0.5 -0.2,1 0.3,0.2 0.7,-0.1 0.3,0.1 0.3,0.1 0.4,-0.1 0.4,-0.2 0.9,0.1 0.5,-0.1 0.6,0.3 0.4,-0.1 0.2,0.1 0.3,0 0.6,0 0.9,-0.2 0.8,-0.5 0.3,-0.5 0.4,-0.3 0.6,-0.4 0,-0.9 -0.7,-0.1 -0.6,-0.3 -1.1,-0.1 -0.1,0 0.1,0.2 -0.1,0 -0.2,-0.1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="PF" data-name="French Polynesia" data-id="PF" d="m 213.2,704.9 -0.1,-0.3 -0.2,-0.3 -0.1,0.1 0.1,0.1 0.2,0.3 0,0.2 0.1,-0.1 z m 9.3,-14.7 -0.2,-0.2 -0.4,-0.2 -0.2,-0.1 -0.2,-0.1 -0.1,0.1 0.1,0.1 0.1,0 0.3,0.2 0.3,0.1 0.2,0.1 0,0.1 0.1,-0.1 z m -24.5,-1.1 -0.6,-0.3 0.1,0.2 0.4,0.2 0.2,0.1 -0.1,-0.2 z m 20.5,-0.2 -0.4,-0.5 -0.3,0 0.7,0.6 0,-0.1 z m -21.6,-1 -0.4,-0.4 -0.2,-0.3 -0.3,-0.1 0.1,0.1 0.4,0.4 0.3,0.4 0.2,0.1 -0.1,-0.2 z m -0.3,-2.1 -0.1,-0.1 0,0 0,-0.3 0.2,-0.3 0.6,-0.4 0,-0.1 0,0 -0.2,0.1 -0.4,0.2 -0.2,0.2 -0.1,0.2 -0.1,0.3 0.1,0.2 0.1,0.1 0.2,0 -0.1,-0.1 z m -47.4,-1.1 -0.2,-0.6 -0.3,-0.5 -0.8,-0.1 -0.5,0.2 -0.1,0.2 0.1,0.4 0.5,0.7 0.5,0.1 0.8,-0.1 0.4,0.6 0.2,0.1 0.4,0.1 0.1,-0.3 -0.2,-0.5 -0.9,-0.3 z m -2.9,-0.9 0.1,-0.4 -0.2,-0.1 -0.5,0 0,0.2 0.1,0.2 0.1,0.1 0.3,0.2 0.1,-0.2 z m -9.7,-4.3 0.2,0 -0.4,-0.6 -0.3,-0.2 0,0.1 0,0.7 0.3,0.1 0.2,-0.1 z m 43.9,-1.6 -0.2,0 -0.3,0 -0.1,0 0.5,0.1 0.4,0.2 -0.3,-0.3 z m -0.7,0.1 -0.3,-0.1 -0.3,-0.2 -0.3,0 0.7,0.3 0.2,0 z m -43.8,0.1 0.1,-0.2 -0.1,-0.1 -0.4,-0.2 0.1,0.3 0,0.2 0.2,0.1 0.1,-0.1 z m 32.8,-2 -0.3,-0.4 -0.2,-0.3 -0.2,-0.4 -0.4,-0.5 0.1,0.3 0.1,0.2 0.2,0.2 0.2,0.4 0.1,0.2 0.3,0.4 0.1,0 0,-0.1 z m 16.2,-1.5 0.1,-0.5 -0.2,0 0,0.5 0.1,0 z m -14.4,-1.6 -0.6,-0.6 -0.1,0 0.1,0.2 0.5,0.5 0.1,0.2 0,-0.3 z m 30.8,-33.9 0.1,-0.2 0,-0.2 -0.1,-0.1 -0.3,-0.1 0.1,0.7 0.2,-0.1 z m -2.7,-3.7 -0.1,-0.2 -0.2,0 -0.1,0.1 0,0.5 0.4,-0.4 z m 0.1,-1.6 -0.8,0.5 0.2,0.4 0.4,0.1 0.2,-0.2 0.8,-0.1 0.3,-0.4 -0.3,0.1 -0.8,-0.4 z m -6.1,-1.7 0.2,-0.5 -0.2,-0.1 -0.4,0.2 0,0.2 0.3,0.4 0.1,-0.2 z m 2.6,-3.1 0.3,-0.1 0,-0.1 -0.2,-0.2 -0.3,-0.1 -0.1,0.1 -0.1,0.2 0.1,0.3 0.3,-0.1 z m -2.9,-0.1 0.1,-0.3 0,-0.2 -0.1,-0.2 -0.9,-0.2 -0.1,0.1 0,0.4 0.2,0.5 0.3,0 0.5,-0.1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SG" data-name="Singapore" data-id="SG" d="m 1561,563.7 0.1,-0.2 -0.2,-0.2 -0.3,-0.1 -0.5,-0.2 -0.6,0.1 -0.3,0.6 0.9,0.4 0.9,-0.4 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SB" data-name="Solomon Island" data-id="SB" d="m 1909.1,646.4 -0.2,-0.2 -0.1,-0.4 -0.3,0 -0.3,0.1 0.2,0.6 0.2,0 0.5,-0.1 z m -35.6,0.8 -0.1,-0.2 -0.5,-0.4 -1.9,-1.3 -0.4,-0.1 -0.1,0.1 -0.1,0.3 0.1,0.2 0.5,0.1 0,0.1 0.3,0.2 0.7,0.2 0.4,0.3 0.1,0.5 0.3,0.1 0.3,0.1 0.4,-0.2 z m 32,-6.6 0,-0.1 0.2,-0.3 -0.2,-0.1 -0.5,-0.1 -0.7,0.1 -0.3,0.2 -0.2,0.3 -0.2,0 0,0.2 0.1,0.4 0.2,-0.1 0.2,0.1 0.5,-0.5 0.3,0 0.1,0 0.5,-0.1 z m -24.4,-2.3 -0.1,-0.2 -0.2,-0.1 -0.9,-0.7 -0.5,-0.2 -0.5,0 -0.1,0.5 0,0.3 0.6,0 0.4,0.2 0,0.6 0.2,0.2 0,0.5 1.2,0.9 0.7,0.4 0.7,0.1 0.4,0.2 0.5,-0.1 0.5,0.2 0.4,-0.1 -0.4,-0.3 0,-0.4 -0.5,-1.3 -0.3,-0.3 -0.5,0.1 -0.5,-0.2 -0.4,0 -0.7,-0.3 z m -0.4,-4.9 -0.6,-1.6 -0.2,-0.1 0.1,0.6 0.1,0.4 -0.1,0.5 -0.1,0.6 0.2,0.2 0.2,-0.2 0.4,0.5 0,-0.2 0,-0.7 z m -9.8,-2.2 -0.3,-0.1 -0.4,0.3 -0.1,0.3 -0.1,0.7 0,0.4 0.3,0.7 0.3,0.5 0.3,0.3 0.2,0.2 0.9,0.1 1.7,0.1 0.9,0.4 0.9,0.2 0.4,-0.1 0.5,-0.2 0.1,-0.1 -0.1,-0.6 -0.2,-0.3 -0.4,-0.2 -0.2,-0.6 -0.5,-0.4 -0.9,-0.7 -1.6,0 -0.6,0.1 -1.1,-1 z m 2.6,-1.8 -0.5,0.2 0,0.3 0.4,0.1 0.4,0.2 0.1,0.3 0,0 0.2,-0.1 0.4,0.2 0.2,-0.3 -0.4,-0.5 -0.4,-0.3 -0.1,0 -0.3,-0.1 z m -5.6,0.8 0.3,-0.2 0,-0.4 -0.3,0 -0.1,-0.2 -0.2,0 -0.3,0.2 -0.2,0.3 0.1,0.2 0.4,0 0.2,0.1 0.1,0 z m -8.4,-2.3 -0.1,-0.2 -0.3,-0.2 -0.2,0 -0.5,0.1 0.1,0.1 0.6,0.3 0.3,0.1 0.1,-0.2 z m 3.1,0.4 0.3,-0.2 -0.1,-0.2 -0.1,-0.5 -0.4,0.7 0.1,0.2 0.2,0 z m -0.5,-0.9 0,-0.2 0,-0.2 -0.2,-0.1 0.4,-0.3 -0.1,-0.1 -0.6,-0.2 -0.2,0.2 -0.2,0.1 -0.1,0.1 -0.1,0.1 -0.1,0.5 0.2,0.4 0.4,0.2 0.6,-0.5 z m -4,0.2 -0.3,-0.4 0.1,-0.5 0.2,-0.1 0.2,-0.5 -0.1,-0.4 -0.2,0.1 -0.7,0.6 -0.1,0.3 0.6,0.8 0.3,0.2 0,-0.1 z m 13,-1.3 -0.2,-0.4 0,-0.2 -0.3,-0.2 -0.2,0.1 -0.1,0.3 0.1,0.2 0.4,0.3 0.3,-0.1 z m 6,-1.2 -0.2,0 -0.1,0.1 -0.2,0 -0.3,0 -0.1,0.2 0.6,1.1 -0.3,0.5 0.4,2.2 0.4,1.2 0.8,0.8 0,0.2 0.8,0.5 0.6,1.3 0.2,0.1 0.1,-0.2 0,-0.6 -0.5,-1.1 0.1,-0.8 -0.2,-0.3 0,-0.3 -0.2,-0.8 -0.6,-0.7 -0.3,-0.1 -0.2,-0.3 0.2,-0.6 0.2,-0.2 0.1,-0.3 -1.3,-1.9 z m -16.6,-0.5 -0.6,-0.2 -0.2,-0.3 0,-1 -0.6,-0.3 -0.3,0.2 -0.6,0.7 -0.2,0.4 -0.5,0.3 -0.1,0.3 0,0.4 0.4,0.1 0.3,-0.4 0.9,-0.1 0.3,0.1 0,0.4 0.1,0.7 0.3,0.3 0.5,0.2 0.4,0.6 0.1,-0.3 0.2,0 0.2,-0.4 -0.3,-1.2 -0.3,-0.5 z m -6.5,-0.4 0.1,-0.5 -0.1,-0.9 -0.2,0.1 0,0.2 -0.1,0.4 0.2,0.8 0.1,-0.1 z m 3.2,-0.4 0.2,-0.2 0,-0.4 0,-0.5 -0.2,-0.4 -0.2,-0.2 -0.5,0.1 -0.4,0.5 0,0.5 0.4,0.6 0.6,0 0.1,0 z m -2.6,-1.2 0.2,-0.3 0.5,-0.7 0.1,-0.3 -0.5,-0.2 -0.4,-0.5 -0.4,-0.2 -0.3,0.4 0,0.4 0.5,0.6 -0.1,0.4 0.2,0.1 0.1,0.4 0.1,-0.1 z m 17.5,3.9 -0.1,-0.5 -0.3,-0.4 0.4,-0.5 -2.2,-1.9 -0.3,-0.2 -0.4,-0.1 -0.5,-0.4 -0.5,-0.1 -0.5,-0.4 -0.2,-0.3 -0.6,-0.4 -0.6,-0.8 -1.5,-0.3 0.1,0.2 0.4,0.4 0.1,0.7 0.5,0.4 0.5,0.6 0.2,0.1 0.2,0.2 0.4,0.5 0.8,0.4 0.8,0.6 0.3,0.1 0.3,0.3 1.5,0.7 0.5,0.7 0.7,0.5 0,-0.1 z m -21.8,-9.2 0.2,-0.3 -0.7,-0.5 -0.2,0.3 -0.2,0.5 0.4,0.2 0.5,-0.2 z m 9.1,1.5 -0.1,-0.1 -0.3,0 -0.4,-0.2 -0.7,-0.8 -0.2,-0.3 -0.2,-1 -0.4,-0.4 -1.4,-0.8 -0.8,-0.8 -0.7,-0.2 -0.2,0.2 0,0.5 0.2,0.3 1,0.9 1.1,1.7 1,1 0.8,0.1 0.4,0 0,0.1 0.1,0.2 0.5,0.2 0.5,-0.4 -0.2,-0.2 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="ST" data-name="São Tomé and Principe" data-id="ST" d="m 1014.1,571.4 0.5,-0.8 0,-0.5 -0.3,-0.5 -0.4,0 -0.5,0.4 -0.3,0.4 0,0.3 0.1,0.7 0.1,0.3 0.3,0.2 0.5,-0.5 z m 4.3,-9.2 0.2,-0.4 0,-0.2 -0.1,-0.1 -0.1,-0.1 -0.2,0.1 -0.3,0.5 0.1,0.2 0.2,0.2 0.2,-0.2 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="SX" data-name="Sint Maarten" data-id="SX" d="m 627.1,457.2 0,0 0.2,0.2 0.3,0.1 0.1,-0.1 0,-0.2 -0.6,0 z" style="fill-rule: evenodd; fill: rgb(255, 77, 77);"></path>
    <path inkscape:connector-curvature="0" id="SC" data-name="Seychelles" data-id="SC" d="m 1288.5,602 -0.5,-0.8 -0.4,0.3 0.2,0.3 0.3,0.2 0.1,0.4 0.3,0.2 0,-0.6 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TC" data-name="Turks and Caicos Is." data-id="TC" d="m 578.7,433.1 -0.1,0.4 0,0.2 0.2,0.1 0.6,-0.1 0.1,-0.1 0.2,-0.1 0,-0.1 -0.4,0.1 -0.6,-0.4 z m 3.6,0.6 0.2,-0.2 -0.2,-0.2 -0.7,-0.2 -0.2,0.1 0,0.3 0.6,0 0.3,0.3 0,-0.1 z m -1.1,-0.5 -0.1,-0.1 -0.1,-0.6 -0.5,0 0,0.2 0.1,0.2 0.1,0 0.1,0.2 0.3,0.2 0.1,-0.1 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="TO" data-name="Tonga" data-id="TO" d="m 13.3,707.7 0,0 -0.2,0.3 0,0.2 0.4,0.4 -0.2,-0.9 z m -1.6,-0.9 -0.2,0 0.2,-0.1 -0.4,-0.2 -0.4,0 -0.2,-0.1 0,-0.2 -0.2,0.3 0.2,0.3 0.9,0.4 0.3,0.2 0.2,-0.6 0,-0.2 -0.3,0.1 0,0.1 -0.1,0 z m 2.5,-16 0.1,-0.2 0,-0.2 -0.3,-0.1 -0.1,0 -0.3,0.5 0.1,0.1 0.3,0.2 0.1,0 0.1,-0.3 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="TT" data-name="Trinidad and Tobago" data-id="TT" d="m 635.4,507.7 0.1,-0.2 0,-0.6 0.2,-0.4 -0.2,-0.4 -0.1,-0.6 0.1,-0.5 0,-0.7 0.2,-0.3 0.5,-0.8 -0.9,0 -0.6,0.2 -1.1,0.1 -0.5,0.2 -0.7,0.1 -0.4,0.2 0.1,0.1 0.5,0.2 0.2,0.2 0.1,0.2 0.1,0.4 -0.3,1.7 -0.1,0.1 -0.6,0.1 -0.2,0.3 -1.4,0.8 0.8,-0.1 0.9,0.1 2.4,-0.1 0.9,-0.3 z m 1.8,-6.7 1.2,-0.5 0.1,-0.4 -0.2,0 -0.8,0.3 -0.6,0.5 0,0.2 0.3,-0.1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="VC" data-name="Saint Vincent and Grenadines" data-id="VC" d="m 634.5,491.4 0,0 0,-0.1 0.1,0 0,-0.1 0,0 0,-0.1 -0.1,0 0,0.1 0,0 0,0.1 -0.1,0 0,0.1 0,0 0,0 0.1,0 z m 0.7,-1.9 0.1,-0.2 0.1,-0.1 0,0 0,0 -0.1,-0.1 0,0 0,0.1 -0.2,0.1 0,0 0,0.1 0,0 0,0.1 -0.1,0 -0.1,0 0,0 0.1,0 0,0 0.1,0.1 0,0 0,0 0,0 0.1,-0.1 z m 0.3,-1.1 0.3,-0.2 0.1,-0.6 -0.1,-0.4 -0.2,0 -0.3,0.1 -0.2,0.3 -0.1,0.5 0.4,0.4 0.1,-0.1 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="VG" data-name="British Virgin Islands" data-id="VG" d="m 619.2,455.1 0.3,-0.2 -0.2,-0.1 -0.4,0 -0.3,0.2 0.1,0.1 0.5,0 z m 1.1,-0.4 0.4,-0.4 -0.5,0.1 -0.2,0.2 0.1,0.1 0.1,0 0.1,0 z m 0.8,-1.8 -0.2,0 -0.5,0 0,0 0.1,0.1 0.3,0 0.3,0.1 0,0 0,-0.2 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="VI" data-name="United States Virgin Islands" data-id="VI" d="m 617.9,458.9 -0.7,0.2 -0.1,0.4 1.1,0 0.7,-0.3 -0.6,0 -0.4,-0.3 z m 0.9,-3.5 -0.5,-0.1 -0.2,0.2 0,0 0.3,0.1 0.4,-0.2 z m -1.1,0.1 -0.2,-0.2 -0.3,-0.1 -0.4,0.1 0.5,0.3 0.4,-0.1 z" style="fill-rule: evenodd; fill: rgb(204, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="CY" data-name="Cyprus" data-id="CY" d="m 1149.9,348.4 -0.3,-0.1 -0.5,0.2 -0.4,0.4 -0.4,0.3 -0.5,-0.3 0.2,0.9 0.6,1.1 0.2,0.3 0.3,0.2 1.1,0.3 0.3,0 0.6,0 0.2,0.1 0.2,0.4 0.4,0 0,-0.1 0,-0.3 0.2,-0.2 0.3,-0.2 0.3,0 0.6,-0.1 0.6,-0.2 0.5,-0.4 0.9,-1 0.3,0 0.3,0 0.6,0 0.6,-0.1 -0.2,-0.4 -0.1,-0.1 -0.4,-0.5 -0.2,-0.4 0.1,-0.6 2.5,-1.9 0.5,-0.5 -0.8,0.2 -0.6,0.4 -0.4,0.2 -0.7,0.4 -2.3,0.8 -0.8,0.1 -0.8,0 -1,-0.1 -0.9,-0.2 0,0.7 -0.2,0.6 -0.6,0.2 -0.3,-0.1 z" style="fill-rule: evenodd; fill: rgb(153, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="RE" data-name="Reunion" data-id="RE" d="m 1284,707.9 0.2,-0.4 0.1,-0.8 -0.4,-0.8 -0.4,-0.7 -0.4,-0.2 -0.8,-0.1 -0.7,0.3 -0.4,0.6 -0.2,0.3 0.4,1.1 0.2,0.3 1.1,0.6 0.5,0 0.8,-0.2 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="YT" data-name="Mayotte" data-id="YT" d="m 1228.7,654.7 0,-0.3 0.2,-0.5 0,-0.1 0.1,-0.5 -0.3,-0.3 -0.2,0 -0.2,-0.3 -0.3,0.3 0.3,0.5 -0.1,0.3 -0.1,0.4 0.1,0.4 0.2,0.2 0.3,-0.1 z" style="fill-rule: evenodd; fill: rgb(255, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="MQ" data-name="Martinique" data-id="MQ" d="m 638,479.9 -0.2,-0.7 -0.1,-0.2 -0.2,-0.3 0.1,-0.3 0,-0.1 -0.2,0 -0.3,-0.5 -0.6,-0.3 -0.3,0 -0.2,0.2 0,0.3 0.3,0.9 0.2,0.2 0.5,0.2 -0.4,0.4 0,0.1 0.1,0.3 0.9,0 0.2,0.3 0.1,-0.1 0.1,-0.4 z" style="fill-rule: evenodd; fill: rgb(128, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="GP" data-name="Guadeloupe" data-id="GP" d="m 636.4,471.1 0.2,-0.2 0,-0.3 -0.2,-0.3 -0.2,0.1 -0.2,0.3 0,0.3 0.1,0.1 0.3,0 z m -1.9,-0.8 0.2,-0.2 0,-1.2 0.1,-0.3 -0.2,-0.1 -0.2,-0.2 -0.6,-0.2 -0.1,0.1 -0.2,0.3 0.1,1.5 0.2,0.5 0.2,0.1 0.5,-0.3 z m 1.6,-1.4 0.8,-0.2 -0.9,-0.6 -0.2,-0.4 0,-0.3 -0.4,-0.3 -0.2,0.2 -0.1,0.3 0.1,0.5 -0.3,0.4 0.1,0.4 0.4,0.1 0.7,-0.1 z" style="fill-rule: evenodd; fill: rgb(255, 51, 51);"></path>
    <path inkscape:connector-curvature="0" id="CW" data-name="Curaco" data-id="CW" d="m 595.9,494.9 0,-0.6 -0.9,-0.4 0,0.3 0.1,0.2 0.3,0.1 0.1,0.2 -0.1,0.6 0.2,0.3 0.3,-0.7 z" style="fill-rule: evenodd; fill: rgb(102, 0, 0);"></path>
    <path inkscape:connector-curvature="0" id="IC" data-name="Canary Islands" data-id="IC" d="m 879.6,395.2 -0.2,-0.2 -0.7,0.5 -0.6,0 0.1,0.2 0.1,0.2 0.7,0.4 0.6,-1.1 z m 13.5,-2.1 0,-0.1 -0.1,0 -0.1,0.1 -1.3,-0.1 -0.2,0.6 -0.5,0.4 0,0.7 0.5,0.7 0.3,0.1 0.5,0.1 0.7,-0.4 0.2,-0.4 0.1,-0.8 -0.1,-0.4 0,-0.5 z m -9.7,0.8 0.5,-0.4 0,-0.2 -0.1,-0.3 -0.5,-0.3 -0.2,0 -0.2,0.2 -0.2,0.4 0.3,0.5 0.2,0.1 0.2,0 z m 4.7,-2.3 1.2,-1 0,-0.3 -1,0.1 -1.1,1 -0.3,0.1 -1,0.1 -0.5,0 -0.4,0.2 0.2,0.3 0.4,1 0.7,0.9 0.6,-0.2 0.3,-0.2 0.4,-0.6 0.5,-1.4 z m 11.6,1.3 1.5,-0.5 0.3,-1 0.3,-1.1 0,-0.7 -0.2,-0.3 -0.1,0 -0.4,0 -0.3,0.2 -0.1,0.6 -0.7,1.3 -0.5,1.2 -0.7,0.6 -0.7,0.2 0.1,0.1 0.7,0.1 0.8,-0.7 z m -19.7,-2 0.5,-0.5 0.1,-0.3 -0.1,-0.5 0.2,-0.2 -0.1,-0.4 -0.3,-0.4 -0.7,0 -0.4,0.6 0.6,1.2 0.1,0.5 0.1,0 z m 22.4,-2.7 0.9,-0.3 0.5,-0.3 0.1,-0.9 0.2,-0.3 -0.2,-0.3 -0.2,0.2 -0.2,0.4 -0.6,0.2 -0.8,0.4 -0.2,0.3 -0.2,0.9 0.4,0.1 0.3,-0.4 z" style="fill-rule: evenodd; fill: rgb(230, 0, 0);"></path>
  </svg>`

    countryHovering();
    choosingCountrySetup();
}