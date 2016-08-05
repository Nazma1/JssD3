var fs = require('fs');
var data = fs.readFileSync('../csv/Production-Department_of_Agriculture_and_Cooperation_1.csv', { encoding: 'utf8' }).toString();
var lines = data.split("\r\n");
var particulars = [];
var production = [];
var particulars1 = [];
var production1 = [];
var j = 0;
var str = "";

//Take all data for particulars and production
j = 0;
for (var i = 0; i < lines.length - 1; i++) {
    var line = lines[i].split(",");
    particulars[j] = line[0];
    production[j] = line[line.length - 2];
    j++;
}

//for only oilseeds purpose
j = 0;
for (var i = 0; i < particulars.length; i++) {
    if (particulars[i].includes("Foodgrains")) {
        particulars1[j] = particulars[i];
        production1[j] = production[i];
        j++;
    }
}


//store in string
for (i = 0; i < particulars1.length; i++) {
    str = str + '\n{\n"Oilseed crop type" : "' + particulars1[i] + '",\n"Production" : "' + production1[i] + '"\n},\n';
}
fs.writeFileSync('../Data/Foodgrains.json', str);
