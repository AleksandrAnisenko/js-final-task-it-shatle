const regEmail = document.getElementById('reg-email');
const signInButt = document.getElementById('signInButt');
const signInEmail = document.getElementById('signInEmail');
let validEmail;
const signInPass = document.getElementById('signInPass');
const passRules = document.querySelectorAll('.passRules');
let validPass;
const signInConfirmPass = document.getElementById('signInConfirmPass');
let validConfirmPass;

signInEmail.addEventListener('input', function(){
    regEmail.style.opacity = '0';
    setTimeout(() => {
        regEmail.style.display = 'none';
    },500);
    setTimeout(() => {
        signInButt.style.display = 'block';
    },500);
});

signInEmail.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        let reg = /^[^@]+@[^@.]+\.[^@]+$/;
        validEmail = reg.test(testing)
        validEmail ? signInEmail.style.borderColor = '#6fa500' : signInEmail.style.borderColor = 'red';
        activateButton();
    } else {
        signInEmail.style.borderColor = '#3a4425';
    }
});

signInPass.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        let regLowUpCase = /^(?=.*[a-z])(?=.*[A-Z])/;
        let regNum = /^(?=.*[0-9])/;
        let regNumAmount = /^.{8,}/;

        regLowUpCase.test(testing) ? passRules[0].style.color = '#6fa500' : passRules[0].style.color = 'red';
        regNum.test(testing) ? passRules[1].style.color = '#6fa500' : passRules[1].style.color = 'red';
        regNumAmount.test(testing) ? passRules[2].style.color = '#6fa500' : passRules[2].style.color = 'red';

        validPass = (regLowUpCase.test(testing) && regNum.test(testing) && regNumAmount.test(testing));
        validPass ? signInPass.style.borderColor = '#6fa500' : signInPass.style.borderColor = 'red';
        activateButton() 
    } else {
        signInPass.style.borderColor = '#3a4425';
    }
})

signInConfirmPass.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        validConfirmPass = this.value == signInPass.value;
        validConfirmPass ? signInConfirmPass.style.borderColor = '#6fa500' : signInConfirmPass.style.borderColor = 'red';
        activateButton(); 
    } else {
        signInConfirmPass.style.borderColor = '#3a4425';
    }
});

function activateButton() {
    if (validEmail == true && validPass == true && validConfirmPass == true) {
        signInButt.classList.add('disabled-false');
        signInButt.classList.remove('disabled-true');
        signInButt.disabled = false;
    }  else {
        signInButt.classList.remove('disabled-false');
        signInButt.classList.add('disabled-true');
        signInButt.disabled = true;
    } 
}

signInButt.addEventListener('click', function(evt){
    evt.preventDefault();
    createUser();
})

async function createUser(){
    let user = {
            email: signInEmail.value.toLowerCase(),
            password: signInPass.value
        };
    let response = await fetch('https://anisenko-api.herokuapp.com/create-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    if(response.ok){
        let result = await response.json();
        if (result.status == 1){
            signInButt.style.display = 'none';
            regEmail.style.display = 'block';
            setTimeout(() => {
                regEmail.style.opacity = '1';
            },200);
        } 
        if (result.status == 0){
            localStorage.setItem('user', signInEmail.value)
            document.location.href = "index2.html";
        }
    }
}