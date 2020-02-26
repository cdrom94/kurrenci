function dropdownObj(obj){
    for (var currency in obj){
            var newOption = document.createElement('option');
            newOption.innerHTML = currency + ": " + obj[currency]["name"];
            newOption.value = currency;
            document.getElementById("currency").appendChild(newOption);
    }
}

var currencyList = [["AED", "UAE Dirham", "United Arab Emirates"], ["ARS",	"Argentine Peso", "Argentina"],["AUD","Australian Dollar", "Australia"],["BGN", "Bulgarian Lev", "Bulgaria"],["BRL", "Brazilian Real", "Brazil"],["BSD", "Bahamian Dollar", "Bahamas"],["CAD", "Canadian Dollar", "Canada"],["CHF", "Swiss Franc", "Switzerland"],["CLP", "Chilean Peso", "Chile"],["CNY", "Chinese Renminbi", "China"],["COP", "Colombian Peso", "Colombia"],["CZK", "Czech Koruna", "Czech Republic"],["DKK", "Danish Krone", "Denmark"],["DOP", "Dominican Peso", "Dominican Republic"],["EGP", "Egyptian Pound", "Egypt"],["EUR", "Euro", "European Union"],["FJD", "Fiji Dollar", "Fiji"],["GBP", "Pound Sterling", "United Kingdom"],["GTQ", "Guatemalan Quetzal", "Guatemala"],["HKD", "Hong Kong Dollar", "Hong Kong"],["HRK", "Croatian Kuna", "Croatian"],["HUF", "Hungarian Forint", "Hungary"],["IDR", "Indonesian Rupiah", "Indonesia"],["ILS", "Israeli Shekel", "Israel"],["INR", "Indian Rupee", "India"],["ISK", "Icelandic Krona", "Iceland"],["JPY", "Japanese Yen", "Japan"],["KRW", "South Korean Won", "Korea"],["KZT", "Kazakhstani Tenge", "Kazakhstan"],["MXN", "Mexican Peso", "Mexico"],["MYR", "Malaysian Ringgit", "Malaysia"],["NOK", "Norwegian Krone", "Norway"],["NZD", "New Zealand Dollar", "New Zealand"],["PAB", "Panamanian Balboa", "Panama"],["PEN", "Peruvian Nuevo Sol", "Peru"],["PHP", "Philippine Peso", "Philippines"],["PKR", "Pakistani Rupee", "Pakistan"],["PLN", "Polish Zloty", "Poland"],["PYG", "Paraguayan Guarani", "Paraguay"],["RON", "Romanian Leu", "Romania"],["RUB", "Russian Ruble", "Russian Federation"],["SAR", "Saudi Riyal", "Saudi Arabia"],["SEK", "Swedish Krona", "Sweden"],["SGD", "Singapore Dollar", "Singapore"],["THB", "Thai Baht", "Thailand"],["TRY", "Turkish Lira", "Turkey"],["TWD", "New Taiwan Dollar", "Taiwan"],["UAH", "Ukrainian Hryvnia", "Ukraine"],["USD", "US Dollar", "United States"],["UYU", "Uruguayan Peso", "Uruguay"],["ZAR", "South African Rand", "South Africa"]];

var currencyObj = {};
for(var i = 0; i < currencyList.length; i++){
    var properties = {"name" : currencyList[i][1], "region": currencyList[i][2]};
    currencyObj[currencyList[i][0]] = properties;
}
dropdownObj(currencyObj);

//make sure input is valid, number is not too long
function conversion() {
    var amount = document.getElementById('amount').value,
        currency = document.getElementById('currency').value;
    var URL = "https://api.exchangerate-api.com/v4/latest/" + currency;

    $.getJSON(URL, amount, function(data){
        updateDOM(amount, data);
    });
}

function updateDOM(amount, data) {
    var lastUpdate = new Date(data.time_last_updated * 1000),
        options = {hour: "numeric", minute: "2-digit", day: "2-digit", month: "long", day: "numeric", year: 'numeric', timeZoneName: "short" },
        conversions = data.rates;

    document.getElementById("results").innerHTML = ""; 
    document.getElementById("results").style.backgroundColor = "rgba(255, 255, 255, 0.521)";

    $('#update-date').html("As of " + lastUpdate.toLocaleDateString("en-US",options));

    for (var conv in conversions){
        var newCurrency = document.createElement('p'),
            newExchange = document.createElement('p'),
            currencyOptions = {style: "currency", currency : conv, currencyDisplay: "symbol"},
            conversion;

            if (conv === "DKK"|| conv === "NOK" || conv === "SEK"){
                conversion = (conversions[conv] * amount).toFixed(2) + " kr";
            }
            else {
                conversion = new Intl.NumberFormat("en-US",currencyOptions).format((conversions[conv] * amount));
            }

        newCurrency.innerHTML = currencyObj[conv]["name"] + " (" + conv + ")";
        newExchange.innerHTML = conversion;
        newCurrency.className = "currency-symbol";
        newExchange.className = "currency-exchange";
        document.getElementById("results").appendChild(newCurrency);
        document.getElementById("results").appendChild(newExchange);
    }
}

