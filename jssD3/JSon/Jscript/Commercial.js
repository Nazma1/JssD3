var fs = require('fs');

var data = fs.readFileSync('../csv/Production-Department_of_Agriculture_and_Cooperation_1.csv', { encoding: 'utf8' }).toString();

var s = data.split("\r\n");

var total = [];

var j = 0;

for (var i = 1; i < s.length; i++) {
    s[i] = s[i].replace("Annual,", "Annual");
}

var particulars = [];
var y2004 = [];
var y2005 = [];
var y2006 = [];
var y2007 = [];
var y2008 = [];
var y2009 = [];
var y2010 = [];
var y2011 = [];
var y2012 = [];
var y2013 = [];
var y2014 = [];
var j = 0;
for (var i = 0; i < s.length - 1; i++) {
    var line = s[i].split(",");

    particulars[j] = line[0];
    y2004[j] = line[line.length - 11];
    y2005[j] = line[line.length - 10];
    y2006[j] = line[line.length - 9];
    y2007[j] = line[line.length - 8];
    y2008[j] = line[line.length - 7];
    y2009[j] = line[line.length - 6];
    y2010[j] = line[line.length - 5];
    y2011[j] = line[line.length - 4];
    y2012[j] = line[line.length - 3];
    y2013[j] = line[line.length - 2];
    y2014[j] = line[line.length - 1];

    j++;
}
//console.log(particulars.length);
//console.log(line.length);
var oil = [];
j = 0;
for (var i = 0; i < particulars.length; i++) {
    var line = particulars[i].split(" ");

    for (var k = 0; k < line.length; k++) {
        // if(line[k]=="Foodgrains")
        // {
        //   break;
        // }
        if (line[k] == "Commercial") {
            oil[j] = i;
            j++;
            break;
        }
    }

}

// console.log(oil);
//onsole.log(oil.length);
var oilseed = [];
var year2004 = [];
var year2005 = [];
var year2006 = [];
var year2007 = [];
var year2008 = [];
var year2009 = [];
var year2010 = [];
var year2011 = [];
var year2012 = [];
var year2013 = [];
var year2014 = [];
for (var i = 0; i < oil.length; i++) {
    // if(i==0)
    // {
    //   oilseed[i]=particulars[0];
    //   year2013[i]=y2013[0];
    //   continue;
    // }
    oilseed[i] = particulars[oil[i]];
    year2004[i] = y2004[oil[i]];
    year2005[i] = y2005[oil[i]];
    year2006[i] = y2006[oil[i]];
    year2007[i] = y2007[oil[i]];
    year2008[i] = y2008[oil[i]];
    year2009[i] = y2009[oil[i]];
    year2010[i] = y2010[oil[i]];
    year2011[i] = y2011[oil[i]];
    year2012[i] = y2012[oil[i]];
    year2013[i] = y2013[oil[i]];
    year2014[i] = y2014[oil[i]];

}

// console.log(oilseed);
//console.log(year2004);
// console.log(year2005);
// console.log(year2006);
// console.log(year2007);
// console.log(year2008);
// console.log(year2009);
// console.log(year2010);
// console.log(year2011);
// console.log(year2012);
// console.log(year2013);
// console.log(year2014);

var sum2004 = 0;
var sum2005 = 0;
var sum2006 = 0;
var sum2007 = 0;
var sum2008 = 0;
var sum2009 = 0;
var sum2010 = 0;
var sum2011 = 0;
var sum2012 = 0;
var sum2013 = 0;
var sum2014 = 0;

for (var i = 0; i < year2013.length; i++) {
    year2004[i] = parseFloat(year2004[i]);
    year2005[i] = parseFloat(year2005[i]);
    year2006[i] = parseFloat(year2006[i]);
    year2007[i] = parseFloat(year2007[i]);
    year2008[i] = parseFloat(year2008[i]);
    year2009[i] = parseFloat(year2009[i]);
    year2010[i] = parseFloat(year2010[i]);
    year2011[i] = parseFloat(year2011[i]);
    year2012[i] = parseFloat(year2012[i]);
    year2013[i] = parseFloat(year2013[i]);
    year2014[i] = parseFloat(year2014[i]);

    sum2005 = sum2005 + year2005[i];
    sum2006 = sum2006 + year2006[i];
    sum2007 = sum2007 + year2007[i];
    sum2008 = sum2008 + year2008[i];
    sum2009 = sum2009 + year2009[i];
    sum2010 = sum2010 + year2010[i];
    sum2011 = sum2011 + year2011[i];
    sum2012 = sum2012 + year2012[i];
    sum2013 = sum2013 + year2013[i];
    sum2014 = sum2014 + year2014[i];
}

var year = [];
var sum = [];
sum.push(sum2005);
sum.push(sum2006);
sum.push(sum2007);
sum.push(sum2008);
sum.push(sum2009);
sum.push(sum2010);
sum.push(sum2011);
sum.push(sum2012);
sum.push(sum2013);
sum.push(sum2014);


var m = 0;
for (var i = 1993; i <= 2014; i++) {
    year[m] = i;
    m++;

}

// console.log(sum2014);
var v = 0;
var str = "";
for (i = 0; i < year.length; i++) {
    if (i < 12) {
        if (i == 0) {
            str = str + '[\n{\n"Year" : "' + year[i] + '",\n"Agregated Value" : "' + v + '"\n},\n\r';
            continue;
        }
        str = str + '\n{\n"Year" : "' + year[i] + '",\n"Agregated Value" : "' + v + '"\n},\n\r';
        continue;

    }
    if (i == year.length - 1) {
        str = str + '{\n"Year" : "' + year[i] + '",\n"Agregated Value" : "' + sum[i - 12] + '"\n}\n]';
        continue;
    }
    str = str + '\n{\n"Year" : "' + year[i] + '",\n"Agregated Value" : "' + sum[i - 12] + '"\n},\n\r';
}

fs.writeFileSync('../Data/commercialcrop.json', str);
