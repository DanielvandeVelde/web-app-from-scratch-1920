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
  GetMoney(
    "GET",
    "https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=100&convert=USD&CMC_PRO_API_KEY=9a7aa090-0a69-4aca-8857-af28026f3b7e"
  )
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
