var app = new Vue({
    el: '.visual1', 
    data: {
      message: 'Hello Vue!',
      googleSearch: ''
    }
  });

var app2 = new Vue({
    el: 'body', 
    data: {
        results: 'results',
        czyZmienic: true
      }
  });

document.getElementById("klasa").value = app2.czyZmienic;

