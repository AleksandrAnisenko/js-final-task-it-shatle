const logInButt = document.getElementById('logInButt');
const logInEmail = document.getElementById('logInEmail');
const logInPass = document.getElementById('logInPass');
const checkEmail = document.getElementById('check-email');
const checkPass = document.getElementById('check-pass');

logInEmail.addEventListener('input', function(){
    checkEmail.style.display = 'none';
    logInEmail.style.borderColor = '#3a4425';
});

logInPass.addEventListener('input', function(){
    checkPass.style.display = 'none';
    logInpass.style.borderColor = '#3a4425';
});

logInEmail.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        logInEmail.style.borderColor = '#6fa500';
    } else {
        logInEmail.style.borderColor = '#3a4425';
    }
    activateButton()
});

logInPass.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        logInPass.style.borderColor = '#6fa500';
    } else {
        logInPass.style.borderColor = '#3a4425';
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
            email: logInEmail.value.toLowerCase(),
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
            logInEmail.style.borderColor = 'red';
            checkEmail.style.display = 'block';
        }
        if (result.status == 1){
            logInPass.style.borderColor = 'red';
            checkPass.style.display = 'block';
        }
        if (result.status == 2){
            localStorage.setItem('user', logInEmail.value)
            document.location.href = "index2.html";
        }
    }
}