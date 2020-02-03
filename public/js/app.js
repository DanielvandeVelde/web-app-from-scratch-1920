//4921adba-8213-4159-950e-35edf261684a

function GetMoney(req, url) {
  return new Promise(function(resolve, reject) {
    const request = new XMLHttpRequest();
    request.open(req, url);
    request.onload = resolve;
    request.onerror = reject;
    request.send();
  });
}

routie("*", function() {
  GetMoney("GET", "sandbox-api.coinmarketcap.com/latest")
    .then(function(e) {
      const data = JSON.parse(e.target.response);
      if (data.statusCode) {
        errorHandler(data);
        return;
      }
      doMoney(data);
    })
    .catch(error => {
      errorHandler();
    });
  return;
});

function errorHandler(error) {
  console.log(error);
}

function doMoney(data) {
  console.log(data);
}
