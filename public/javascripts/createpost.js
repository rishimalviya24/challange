var next = document.querySelector('#next');
var prev = document.querySelector('#prev');

var btn = document.querySelector("#btn-inpt")


  function myfunction(){

      document.querySelector("#inpt").click();
  }

document.querySelector("#inpt").addEventListener('change',function(){
  document.querySelector('#box-p').style.transform = `translateX(-100%)`;
  document.querySelector('#box-p2').style.transform = `translateX(-100%)`;
  next.style.display = 'initial';
  next.addEventListener('click',function(){
    document.querySelector('#box-p').style.transform = `translateX(-100%)`;
    document.querySelector('#box-p2').style.transform = `translateX(-100%)`;
  })

  prev.addEventListener('click',function(){
    document.querySelector('#box-p').style.transform = `translateX(0%)`;
    document.querySelector('#box-p2').style.transform = `translateX(0%)`;
  })
})