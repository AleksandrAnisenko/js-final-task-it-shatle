const MAIN = document.getElementById('main');
const CLIENTS = document.getElementById('clients');
const MAP = document.getElementById('map');
const SECTION_MAIN = document.getElementById('section-main');
const SECTION_CLIENTS = document.getElementById('section-clients');
const SECTION_MAP = document.getElementById('section-map');
const HELLO_USER = document.getElementById('hello-user');
const USER_DEVICE = document.getElementById('user-device');
const CLIENTS_LIST = document.getElementById('clients-list');
const GENDER_MAN = document.getElementById('gender-man');
const GENDER_WOMAN = document.getElementById('gender-woman');
const MAX_BALANCE = document.getElementById('max-balance');





let userDeviceArray = [
    {device: 'Android', platform: /Android/},
    {device: 'iPhone', platform: /iPhone/},
    {device: 'iPad', platform: /iPad/},
    {device: 'Symbian', platform: /Symbian/},
    {device: 'Windows Phone', platform: /Windows Phone/},
    {device: 'Tablet OS', platform: /Tablet OS/},
    {device: 'Linux', platform: /Linux/},
    {device: 'Windows', platform: /Windows NT/},
    {device: 'Macintosh', platform: /Macintosh/}
];

let platform = navigator.userAgent;

function getPlatform() {
    for (let i in userDeviceArray) {
        if (userDeviceArray[i].platform.test(platform)) {
            return userDeviceArray[i].device;
        }
    }
    return platform;
}

import {checkUserOnline} from './functions.js';

HELLO_USER.innerHTML = checkUserOnline();
USER_DEVICE.innerHTML = getPlatform();



async function getClients() {
    
    let result = await fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json').then(response =>
    response.json());
    let manAmount = 0;
    let maxBalance = 0;
        for (let i = 0; i < result.length; i++) {

            if (result[i].gender == 'male') {
                manAmount+= 1;
            };

            let balance = Number(result[i].balance.replace('$','').replace(',',''));
            
            if (balance > maxBalance) {
                maxBalance = balance;
            }

            let tr = document.createElement('tr');

            for (let j = 0; j < 6; j++) {
                let td = document.createElement('td');

                switch (j) {
                    case 0:
                        td.innerHTML = result[i].name;
                        break;
                    case 1:
                        td.innerHTML = result[i].company;
                        break;
                    case 2:
                        td.innerHTML = result[i].email;
                        break;
                    case 3:
                        td.innerHTML = result[i].phone;
                        break;
                    case 4:
                        td.innerHTML = result[i].balance;
                        break;
                    case 5:
                        let date = result[i].registered.slice(0, 10);
                        let arrDate = date.split('-');
                        let strDate = `${arrDate[2]}-${arrDate[1]}-${arrDate[0]}`;
                        td.innerHTML = strDate;
                        td.style.position = 'relative';
                        let closeDiv = document.createElement('div');
                        closeDiv.innerHTML = 'DELETE';
                        closeDiv.classList.add('del');
                        td.appendChild(closeDiv);
                        let popUpDel = document.createElement('div');
                        popUpDel.classList.add('popUpDel');
                        td.appendChild(popUpDel);
                        break;
                  };
                
                  result[i].isActive ? td.classList.remove('inactive') : td.classList.add('inactive');

                tr.appendChild(td);
            }
            GENDER_MAN.innerHTML = `MALE: ${manAmount}`;
            GENDER_WOMAN.innerHTML = `FEMALE: ${result.length - manAmount}`;
            MAX_BALANCE.innerHTML = `MAX BALANCE: $${maxBalance}`;
            CLIENTS_LIST.appendChild(tr);
        }
        const DELETE_BUTTON = document.querySelectorAll('.del');
        const POP_UP_DEL = document.querySelectorAll('.popUpDel');
        
        for (let i = 0; i < DELETE_BUTTON.length; i++) {
        DELETE_BUTTON[i].addEventListener('click', function(){
            POP_UP_DEL[i].style.display = 'block';
        // this.parentElement.parentElement.remove();
    });
};
}

getClients();




MAIN.addEventListener('click', function(){
    SECTION_CLIENTS.style.display = 'none';
    SECTION_MAP.style.display = 'none';
    SECTION_MAIN.style.display = 'flex';
    this.style.color = '#dddddd';
    this.style.backgroundColor = '#3a4425';
    CLIENTS.style.backgroundColor = '#222222';
    MAP.style.backgroundColor = '#222222';
    CLIENTS.style.color = '#7f7f7f';
    MAP.style.color = '#7f7f7f';
});

CLIENTS.addEventListener('click', function(){
    SECTION_MAIN.style.display = 'none';
    SECTION_MAP.style.display = 'none';
    SECTION_CLIENTS.style.display = 'block';
    this.style.backgroundColor = '#3a4425';
    MAIN.style.backgroundColor = '#222222';
    MAP.style.backgroundColor = '#222222';
    this.style.color = '#dddddd';
    MAIN.style.color = '#7f7f7f';
    MAP.style.color = '#7f7f7f';
});

MAP.addEventListener('click', function(){
    SECTION_MAIN.style.display = 'none';
    SECTION_CLIENTS.style.display = 'none';
    SECTION_MAP.style.display = 'block';
    this.style.backgroundColor = '#3a4425';
    MAIN.style.backgroundColor = '#222222';
    CLIENTS.style.backgroundColor = '#222222';
    this.style.color = '#dddddd';
    MAIN.style.color = '#7f7f7f';
    CLIENTS.style.color = '#7f7f7f';
});