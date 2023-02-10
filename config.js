const status = document.querySelector('.response');
const language = document.getElementById('country');

var input = document.getElementById("input"); 
input.addEventListener("keyup", function (event) {
  if (event.key == 'Enter') { 
    event.preventDefault(); 
    document.getElementById("submit").click();
  }
});

function execute() {
  if (input.value == '') {
    swal("Inpo anjeng", "Jangan dikosongin kontol inputnya😒😒", "error");
  } else {
    $.getJSON(document.location.href +'tr?to='+ country.value +'&text='+ input.value, function(data) {
      if (data.status == true) {
        swal("info banh", "sukses translate ya cok", "success");
        status.innerHTML = data.result;
      } else {
        swal('👉👈','Ihh ayang maaf ya error😔😔', 'error');
        status.innerHTML = 'hadehhh capekkkk😪😪';
      }
    });
  }
}
