const regEmail = document.getElementById('regEmail');
const signInButt = document.getElementById('signInButt');
const signInEmail = document.getElementById('signInEmail');
let validEmail;
const signInPass = document.getElementById('signInPass');
const passRules = document.querySelectorAll('.passRules');
let validPass;
const signInConfirmPass = document.getElementById('signInConfirmPass');
let validConfirmPass;

signInEmail.addEventListener('focus', function(){
    regEmail.style.opacity = '0';
    setTimeout(() => {
        regEmail.style.display = 'none';
    },800);
});

signInEmail.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        let reg = /^[^@]+@[^@.]+\.[^@]+$/;
        validEmail = reg.test(testing)
        validEmail ? signInEmail.style.borderColor = 'yellowgreen' : signInEmail.style.borderColor = 'red';
        activateButton();
    } else {
        signInEmail.style.borderColor = 'rgba(153, 205, 50, 0.2)';
    }
});

signInPass.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        let regLowUpCase = /^(?=.*[a-z])(?=.*[A-Z])/;
        let regNum = /^(?=.*[0-9])/;
        let regNumAmount = /^.{8,}/;

        regLowUpCase.test(testing) ? passRules[0].style.color = 'yellowgreen' : passRules[0].style.color = 'red';
        regNum.test(testing) ? passRules[1].style.color = 'yellowgreen' : passRules[1].style.color = 'red';
        regNumAmount.test(testing) ? passRules[2].style.color = 'yellowgreen' : passRules[2].style.color = 'red';

        validPass = (regLowUpCase.test(testing) && regNum.test(testing) && regNumAmount.test(testing));
        validPass ? signInPass.style.borderColor = 'yellowgreen' : signInPass.style.borderColor = 'red';
        activateButton() 
    } else {
        signInPass.style.borderColor = 'rgba(153, 205, 50, 0.2)';
    }
})

signInConfirmPass.addEventListener('blur', function(){
    let testing = this.value;
    if (testing !== '') {
        validConfirmPass = this.value == signInPass.value;
        validConfirmPass ? signInConfirmPass.style.borderColor = 'yellowgreen' : signInConfirmPass.style.borderColor = 'red';
        activateButton(); 
    } else {
        signInConfirmPass.style.borderColor = 'rgba(153, 205, 50, 0.2)';
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
    checkUser();
})

async function checkUser(){
    let user = {
            email: 'signInEmail.value',
            password: 'signInPass.value'
        };
    let result = await fetch('https://anisenko-api.herokuapp.com/create-user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
    if (result == 1){
        regEmail.style.display = 'block';
        setTimeout(() => {
            regEmail.style.opacity = '1';
        },1);
    } else {
        alert('Юзер создан');
    }
}