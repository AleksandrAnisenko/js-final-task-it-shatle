const login = document.getElementById('login');
const signin = document.getElementById('signin');
const changeLogSign = document.querySelectorAll('.changeLogSign');

changeLogSign[0].addEventListener('click',function(){
    signin.style.display = 'flex';
    login.style.display = 'none';
});

changeLogSign[1].addEventListener('click',function(){
    signin.style.display = 'none';
    login.style.display = 'flex';
});
