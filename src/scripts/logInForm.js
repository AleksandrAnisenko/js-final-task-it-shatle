const logInButt = document.getElementById('logInButt');
const logInEmail = document.getElementById('logInEmail');
const logInPass = document.getElementById('logInPass');

logInEmail.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        logInEmail.style.borderColor = 'yellowgreen';
    } else {
        logInEmail.style.borderColor = 'rgba(153, 205, 50, 0.2)';
    }
    activateButton()
});

logInPass.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        logInPass.style.borderColor = 'yellowgreen';
    } else {
        logInPass.style.borderColor = 'rgba(153, 205, 50, 0.2)';
    }
    activateButton()
});

function activateButton() {
    if (logInEmail.value !== '' && logInPass.value !== '') {
        logInButt.classList.add('disabled-false');
        logInButt.classList.remove('disabled-true');
        logInButt.disabled = false;
    }  else {
        logInButt.classList.remove('disabled-false');
        logInButt.classList.add('disabled-true');
        logInButt.disabled = true;
    } 
}

logInButt.addEventListener('click', function(evt){
    evt.preventDefault();
    checkUser();
})

async function checkUser(){
    let user = {
            email: logInEmail.value,
            password: logInPass.value
        };
        console.log(user)
    let response = await fetch('https://anisenko-api.herokuapp.com/check-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    if(response.ok){
        let result = await response.json();
        console.log(result.description)
        if (result.status == 0){
            alert('Такого юзера нету')
        }
        if (result.status == 1){
            alert('Неверный пароль')
        }
        if (result.status == 2){
            alert('Красава, такой юзер есть))')
        }
    }
}