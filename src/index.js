import example from './images/example.png'
import './styles/main.scss'
import './scripts/logout.js'
import './scripts/changeLogInSignIn.js'
import './scripts/signInForm.js'

const next = document.getElementById('next');
next.addEventListener('click', function(){
    document.location.href = "index2.html";
});
const back = document.getElementById('back');
back.addEventListener('click', function(){
    document.location.href = "index.html";
})
