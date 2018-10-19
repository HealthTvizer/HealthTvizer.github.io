var globalData = [];
var globalContentData;
var myData = [];
var myDiseaseName = "all";
var source = "wn";
var topTermsCount = 50;
var topTerms2;
// stream graph variables declared globally to keep the scope for update
var stack;
var startDate;
var endDate;
var area;
var line;
var layers;
var timeline;
var timeline2;
var defs;
var timelineX;
var timelineY;
var xAxis, yAxis;
var catcolors = [];
var streamColor = d3.scale.category20();
var categories = ["keyword"];
var space = 45;
var lineColor = d3.scale.linear()
    .domain([0,120])
    .range(['#558', '#000']);
var mapList = [];
var  mapColorList = {};
var sizeStream={width:0,height:0};
// stack = d3.layout.stack().offset("silhouette")
//     .values(function (d) {
//         return d.monthfreq;
//     })
//     .x(function (d) {
//         return d.month;
//     })
//     .y(function (d) {
//         return d.freq;
//     });
stack = d3.layout.stack().offset("zero")
    .values(function (d) {
        return d.monthfreq;
    })
    .x(function (d) {
        return d.month;
    })
    .y(function (d) {
        return d.freq;
    });

//Mouse click delay variables
var DELAY = 300, clicks = 0, timer = null;

// An array of dates in which all frequencies are zero. Used to hide a term
// in the streamgraph (as opposed to completely deleting it).
var zeroSeries = [{freq: 0, month: endDate}];
zeroSeries = fillData(zeroSeries, startDate, endDate);

//cloud svg width and height
var cloudWidth1 ;
var cloudHeight ;
//tag CLoud
var svg ;

/* Initialize tooltip */
var wordTip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "<strong>" + d.term + " :" + d.freq + "</strong>";
    });

var cloudmessages;
var parse = d3.time.format("%Y %m %d");
var start = parse.parse("2017 01 01");
var end = parse.parse("2017 02 01");
// var topTerms;
var wnrawdata = [];
var hprawdata = [];
var myWordCloud;
var myWordCloud2;
var fill = d3.scale.category20();
var personcolor = [];
var misccolor = [];
var orgcolor = [];
var locationcolor = [];
var color1 = d3.hsl("#cdf6d2");
var brush;
var sizeScale = d3.scale.linear()
    .range([5, 80]);
$(document).ready(function () {
    var termsData;
    //Create a new instance of the word cloud visualisation.

    //myWordCloud2 = wordCloud2('#tagCloud2');

    loadData("data/diseaseData.csv", "wn");


});


var  diseasesList =[];
var  KeywordsList =[];

function loadData(filename, source) {

    var data = preProcessData();

    // var data2 = preProcessData2();
    var data2 = preProcessData2();
    // console.log(data2);
    data.startProcess(filename, function (data,datarf) {
        var localallTermsArray = [];
        var localallTermsMap;
        //cloudmessages.attr("opacity", 1);
        localallTermsMap = data;
        var monthly = [];
        var currmonth;
        for (var term in data) {
            // console.log(data)
            monthly = []
            var entry = {};
            entry.term = term;
            entry.values = {};
            for (var val in data[term]) {
                if (val == "frequency") {
                    entry.values.frequency = data[term][val];
                }
                else if (val == "category") {
                    entry.values.category = data[term][val];
                }
                else {
                    currmonth = parse.parse(val);
                    monthly.push({
                        "month": currmonth,
                        "freq": data[term][val].freq,
                        "blogs": data[term][val].blogs
                    })
                }
            }
            entry.values.monthfreq = monthly;


            localallTermsArray.push(entry)
        }

        wnallTermsArray = localallTermsArray;
        wnallTermsMap = localallTermsMap;
        allTermsArray = wnallTermsArray;
        allTermsMap = wnallTermsMap
        topTerms = getTopTerms(allTermsArray);
        diseasesList = topTerms;
        //showNewWords(myWordCloud, datarf);
        //Set stream graph, topterms.monthfreq contains monthly frequency
        //setStreamGraph(topTerms);
        //console.log(topTerms);
        //cloudmessages.attr("opacity", 0);
        data2.startProcess2(filename, function (data) {
            globalContentData = data;
            var localallTermsArray = [];
            var localallTermsMap;
            // console.log(data)
            //cloudmessages.attr("opacity", 1);
            localallTermsMap = data.all;
            var monthly = [];
            var currmonth;
            for (var term in data.all) {
                monthly = [];
                var entry = {};
                entry.term = term;
                entry.values = {};
                for (var val in data.all[term]) {
                    if (val == "frequency") {
                        entry.values.frequency = data.all[term][val];
                    }
                    else if (val == "category") {
                        entry.values.category = data.all[term][val];
                    }
                    else {
                        currmonth = parse.parse(val);
                        monthly.push({
                            "month": currmonth,
                            "freq": data.all[term][val].freq,
                            "blogs": data.all[term][val].blogs
                        })
                    }
                }
                entry.values.monthfreq = monthly;
                localallTermsArray.push(entry)
            }

            wnallTermsArray = localallTermsArray;
            wnallTermsMap = localallTermsMap;
            var allTermsArray = wnallTermsArray;
            allTermsMap = wnallTermsMap;
            topTerms2 = getTopTerms(allTermsArray);
            KeywordsList = topTerms2;
            //console.log(topTerms2);
            setStreamGraph(diseasesList);
            showNewWords(myWordCloud, convertterm2Date(topTerms2));
            showMap("all","#aaa");
            console.log(topTerms);
            //showNewWords2(myWordCloud2, topTerms2);
            //Set stream graph, topterms.monthfreq contains monthly frequency
            //setStreamGraph2(topTerms2);
            //cloudmessages.attr("opacity", 0);


            // Tommy 2017 ************************************
            var svg8 = d3.select('.container8')
                .append("svg")
                .attr("width", d3.select('.container8').node().offsetWidth)
                .attr("height", 700);

            var width = +svg8.attr("width"),
                height = +svg8.attr("height");


            var force = d3.layout.force()
                .gravity(0.08)
                .distance(40)
                .charge(-150)
                .linkStrength(0.2)
                .size([width, height]);



            var nodes = [];
            var links = [];
            diseasesList.forEach( function (d){
                var obj ={};
                obj.term =  d.term;
                obj.freq =  d.freq;
                obj.category = "disease";
                nodes.push(obj);
            });

            KeywordsList.forEach( function (d){
                var obj ={};
                obj.term =  d.term;
                obj.freq =  d.freq;
                obj.category = "keyword";
                nodes.push(obj);
            });

            var minF =  1000000;
            var maxF = 0;
            for (var i=0; i< diseasesList.length;i++){
                for (var j=0; j< KeywordsList.length;j++){
                    var di = diseasesList[i].term;
                    var ke = KeywordsList[j].term;
                    if (disease_keywords[di][ke] != undefined){
                        var lin = {};
                        lin.source = i;
                        lin.target = diseasesList.length+j;
                        lin.value = disease_keywords[di][ke].frequency;
                        if (lin.value <minF) minF = lin.value;
                        if (lin.value >maxF) maxF = lin.value;
                        if (lin.value>100)
                            links.push(lin);
                    }
                }
            }

            var minD =  1000000;
            var maxD = 0;
            for (var i=0; i< diseasesList.length;i++){
                if (diseasesList[i].freq <minD) minD = diseasesList[i].freq;
                if (diseasesList[i].freq >maxD) maxD = diseasesList[i].freq;
            }
            var minK =  1000000;
            var maxK = 0;
            for (var j=0; j< KeywordsList.length;j++){
                if (KeywordsList[j].freq <minK) minK = KeywordsList[j].freq;
                if (KeywordsList[j].freq >maxK) maxK = KeywordsList[j].freq;
            }

            // console.log("minF="+minF+"  maxF="+maxF);
            // console.log("minD="+minD+"  maxF="+maxD);
            // console.log("minD="+minK+"  maxF="+maxK);
            lineColor.domain([minK, maxK]);

            var wScale = d3.scale.linear()
                .domain([minF,maxF])
                .range([1,6]);
            var dScale = d3.scale.linear()
                .domain([minD,maxD])
                .range([17,25]);

            var kScale = d3.scale.linear()
                .domain([minK,maxK])
                .range([10,17]);


            force
                .nodes(nodes)
                .links(links)
                .start();
            // console.log(links);
            var link = svg8.selectAll(".link")
                .data(links)
                .enter().append("line")
                .attr("class", "link")
                .attr("stroke-opacity", 0.25)
                .attr("stroke-width", function(d){
                    return wScale(d.value);
                })
                .attr("stroke", "#000");
            // console.log(nodes);
            var node = svg8.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .attr("fill", function(d,i){
                    if (d.category == "disease")
                        return streamColor(i);
                    else
                        return "#000";
                })
                .call(force.drag);

            // node.append("image")
            //    .attr("xlink:href", "https://github.com/favicon.ico")
            //    .attr("x", -8)
            //    .attr("y", -8)
            //    .attr("width", 16)
            //    .attr("height", 16);

            node.append("text")
                .style("text-shadow", function(d){if (d.category == "disease")
                    return "1px 1px 0 rgba(0, 0, 0, 0.5"})
                .style("font-size",function(d) {
                    if (d.category == "disease")
                        return dScale(d.freq)+"px";
                    else
                        return kScale(d.freq)+"px";
                })
                .attr("fill", function(d){
                    if(d.category!="disease")
                        return lineColor(d.freq);
                })
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(function(d) { return d.term });

            force.on("tick", function() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
            });



        });
    });

}




function loadDataUpdate(dName) {
    var localallTermsArray = [];
    var localallTermsMap;
    // console.log(data)
    cloudmessages.attr("opacity", 1);
    localallTermsMap = globalContentData[dName];
    // console.log(localallTermsMap)
    var monthly = [];
    var currmonth;
    for (var term in localallTermsMap) {
        monthly = []
        var entry = {};
        entry.term = term;
        entry.values = {};
        for (var val in globalContentData[dName][term]) {
            if (val == "frequency") {
                entry.values.frequency = globalContentData[dName][term][val];
            }
            else if (val == "category") {
                entry.values.category = globalContentData[dName][term][val];
            }
            else {
                currmonth = parse.parse(val);
                monthly.push({
                    "month": currmonth,
                    "freq": globalContentData[dName][term][val].freq,
                    "blogs": globalContentData[dName][term][val].blogs
                })
            }
        }
        entry.values.monthfreq = monthly;


        localallTermsArray.push(entry)
    }

    wnallTermsArray = localallTermsArray;
    wnallTermsMap = localallTermsMap;
    var allTermsArray = wnallTermsArray;
    allTermsMap = wnallTermsMap
    var topTerms3 = getTopTerms(allTermsArray);
    // updateStreamGraph(topTerms3, false);
    topTerms3 = convertterm2Date (topTerms3);
    showNewWords(myWordCloud, topTerms3);
    //Set stream graph, topterms.monthfreq contains monthly frequency
    // setStreamGraph2(topTerms3);

    cloudmessages.attr("opacity", 0);



}
function convertterm2Date (topTerms3){
    topTerms3.sort(function(a,b){return b.freq - a.freq});
    var outputFormat = d3.time.format('%b %d %Y');
    var datarf =[];
    topTerms3.forEach(function(d) {
        d.monthfreq.forEach(function (m) {
            var date = outputFormat(new Date(m.month));
            var item = {
                sudden: 0,
                text: d.term,
                frequency: m.freq,
                topic: 'keyword'
            };
            if (!datarf[date]) datarf[date] = {};
            if (!datarf[date]['keyword']) datarf[date]['keyword'] = [item];
            else datarf[date]['keyword'].push(item) ;
        })
    });
    datarf = d3.keys(datarf).map(function(date, i) {
        return {date: date,
                words: datarf[date]};
    })
    return datarf;
}
//getTopTerms based on start and end dates
function getTopTerms(allTermsArray) {
    var monthlyData = [];
    var currmonth;
    var blogs = [];
    var monthfreq = [];
// console.log(allTermsArray);
    allTermsArray.forEach(function (d, i) {
        var months = d.values.monthfreq;
        var freq = 0;
        blogs = [];
        monthfreq = [];
        for (var i = 0; i < months.length; i++) {
            currmonth = months[i].month;
            if (currmonth >= start && currmonth <= end) {
                freq = freq + months[i].freq;

                months[i].blogs.forEach(function (b) {
                    blogs.push(b);

                })
                monthfreq.push(months[i]);
            }
        }
        if (freq > 0)

            monthlyData.push({
                "term": d.term,
                "freq": freq,
                "blogs": blogs,
                "monthfreq": monthfreq,
                "category": d.values.category
            });
    });

    monthlyData.sort(function (a, b) {
        return b.freq - a.freq;
    })
    //
    //get top 50 terms
    topTerms = monthlyData.slice(0, topTermsCount)
    //sort by month
    topTerms.forEach(function (currterm) {
        currterm.monthfreq.sort(function (a, b) {
            return a.month - b.month;
        })
    })

    topTerms.sort(function (a, b) {
        if (a.category == b.category) {
            return (a.freq < b.freq) ? -1 : (a.freq > b.freq) ? 1 : 0;
        }
        else {
            return (a.category < b.category) ? -1 : 1;
        }
    });

    personcolor = [];
    locationcolor = [];
    misccolor = [];
    orgcolor = [];
    var personcount = 0;
    var locationcount = 0;
    var misccount = 0;
    var orgcount = 0;
    for (var i = 0; i < topTerms.length; i++) {
        var cat = topTerms[i].category;
        if (cat == "Person")
            personcount++
        else if (cat == "Location")
            locationcount++
        else if (cat == "Misc")
            misccount++
        else if (cat == "Organization")
            orgcount++
    }
    var currpersinc = 0.1;
    var currlocinc = 0.1;
    var currmiscinc = 0.1;
    var currorginc = 0.1;
    var colorP = d3.hsl("#d62728");
    var colorM = d3.hsl("#ff7f0e");
    var colorO = d3.hsl("#1f77b4");
    var colorL = d3.hsl("#008400");
    var persinc = 1 / personcount;
    var locinc = 1 / locationcount;
    var miscinc = 1 / misccount;
    var orginc = 1 / orgcount;
    for (var i = 0; i < topTerms.length; i++) {
        var cat = topTerms[i].category;
        if (cat == "Person") {
            currpersinc = currpersinc + persinc;
            personcolor[topTerms[i].term] = colorP.darker(currpersinc)
        }
    }

    // console.log(topTerms);
    // debugger;
    return topTerms;
}

function minDate(data) {
    return d3.min(data, function (d) {
        var localMin = d3.min(d.monthfreq, function (d) {
            return d.month;
        });
        return localMin;
    });
}

function maxDate(data) {
    return d3.max(data, function (d) {
        var localMax = d3.max(d.monthfreq, function (d) {
            return d.month;
        });
        return localMax;
    });
}

function showNewWords(vis, words) {


    vis.update(words)
}
function showNewWords2(vis, words) {
    vis.update(words)
}
// Encapsulate the word cloud functionality

var clickTerms = "a";
var clickNo = 0;
function wordCloud(selector) {

    function draw(data, pop){
        d3.select(selector).select('svg').selectAll('g').remove();
        //...
        mappingDiseaseNameColor = {diseaseName: '', color : ''};
        //mapList  = [];
        //mapColorList = {};
        k = 0;
        var dataWidth;
        var width = cloudWidth1;
        // document.getElementById("mainsvg").setAttribute("width",width);
        var font = "Impact";
        var interpolation = "cardinal";
        var bias = 200;
        var offsetLegend = 50;
        var axisPadding = 10;
        var margins = {top: 0, right: 0, bottom: 0, left: 0};
        var min = 5;
        var max =30;
        lineColor.domain([min, max]);
        width = sizeStream.width ;
        console.log(width);
        var height = sizeStream.height;
        height = height - margins.top-margins.bottom;

        //set svg data.
        svg.attr({
            width: width,
            height: height
        });
        var area = d3.svg.area()
            .interpolate(interpolation)
            .x(function(d){return (d.x);})
            .y0(function(d){return d.y0;})
            .y1(function(d){return (d.y0 + d.y); });
        //Draw the word cloud
        function color(n) {
            var colores = ["#008fd0", "#FC660F", "#489d4c", "#E00D37", "#8D6BB8", "#85584E" , "#8d6bb8", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707", "#651067", "#329262", "#5574a6", "#3b3eac"];
            return colores[n % colores.length];
        }
        //var axisGroup = svg.append('g').attr('transform', 'translate(' + (margins.left) + ',' + (height+margins.top+axisPadding) + ')');
        //var xGridlinesGroup = svg.append('g');
        var mainGroup = svg.append('g').attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
        var wordStreamG = mainGroup.append('g');
        //;;;
        k = 0;
        if (pop) {dataWidth = data.length*20}
        else {dataWidth = data.length*100;}

        //width = (dataWidth > cloudWidth1) ? dataWidth:cloudWidth1;
        //width = cloudWidth1;
        //Layout data
        var ws = d3.layout.wordStream()
            .size([width- margins.left-margins.right, height])
            .interpolate(interpolation)
            .fontScale(d3.scale.linear())
            .minFontSize(5)
            .maxFontSize(30)
            .data(data)
            .font(font);
        var boxes = ws.boxes(),
            minFreq = ws.minFreq(),
            maxFreq = ws.maxFreq();

        //Display data

        // var color = d3.scale.category10();
        //Display time axes
        var dates = [];
        boxes.data.forEach(row =>{
            dates.push(row.date);});

        var xAxisScale = d3.scale.ordinal().domain(dates).rangeBands([0, width]);
        // var xAxis = d3.svg.axis().orient('bottom').scale(xAxisScale);
        //axisGroup.attr('transform', 'translate(' + (margins.left) + ',' + (height+margins.top+axisPadding) + ')');
        //var axisNodes = axisGroup.call(xAxis);
        //styleAxis(axisNodes);
        //Display the vertical gridline
        // var xGridlineScale = d3.scale.ordinal().domain(d3.range(0, dates.length+1)).rangeBands([0, width+width/boxes.data.length]);
        // var xGridlinesAxis = d3.svg.axis().orient('bottom').scale(xGridlineScale);
        // xGridlinesGroup.attr('transform', 'translate(' + (margins.left-width/boxes.data.length/2) + ',' + (height+margins.top + axisPadding+margins.bottom) + ')');
        // var gridlineNodes = xGridlinesGroup.call(xGridlinesAxis.tickSize(-height-axisPadding-margins.bottom, 0, 0).tickFormat(''));
        // styleGridlineNodes(gridlineNodes);

        //Main group
        mainGroup.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

        // =============== Get BOUNDARY and LAYERPATH ===============
        var lineCardinal = d3.svg.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; })
            .interpolate("cardinal");

        var boundary = [];
        for (var i = 0; i < boxes.layers[0].length; i ++){
            var tempPoint = Object.assign({}, boxes.layers[0][i]);
            tempPoint.y = tempPoint.y0;
            boundary.push(tempPoint);
        }

        for (var i = boxes.layers[boxes.layers.length-1].length-1; i >= 0; i --){
            var tempPoint2 = Object.assign({}, boxes.layers[boxes.layers.length-1][i]);
            tempPoint2.y = tempPoint2.y + tempPoint2.y0;
            boundary.push(tempPoint2);
        }       // Add next (8) elements

        var lenb = boundary.length;

        // Get the string for path

        var combined = lineCardinal( boundary.slice(0,lenb/2))
            + "L"
            + lineCardinal( boundary.slice(lenb/2, lenb))
                .substring(1,lineCardinal( boundary.slice(lenb/2, lenb)).length)
            + "Z";


        // ============== DRAW CURVES =================
        var topics = boxes.topics;
        var stokepath = mainGroup.selectAll('.stokepath')
            .data(boxes.layers)
            .attr('d', area)
            .style('fill', function (d, i) {
                return color(i);
            })
            .attr({
                'fill-opacity': 0,      // = 1 if full color
                // stroke: 'black',
                'stroke-width': 0.3,
                topic: function(d, i){return topics[i];}
            });
        stokepath.exit().remove();
        stokepath
            .enter()
            .append('path')
            .attr('class','stokepath')
            .attr('d', area)
            .style('fill', function (d, i) {
                return color(i);
            })
            .attr({
                'fill-opacity': 0,      // = 1 if full color
                // stroke: 'black',
                'stroke-width': 0.3,
                topic: function(d, i){return topics[i];}
            });
        // ARRAY OF ALL WORDS
        var allWords = [];
        d3.map(boxes.data, function(row){
            boxes.topics.forEach(topic=>{
                allWords = allWords.concat(row.words[topic]);
        });
        });
        //Color based on term
        var terms = [];
        for(i=0; i< allWords.length; i++){
            terms.concat(allWords[i].text);
        }

        // Unique term de to mau cho cac chu  cung noi dung co cung mau


        var opacity = d3.scale.log()
            .domain([minFreq, maxFreq])
            .range([0,1]);

        // Add moi chu la 1 element <g>, xoay g dung d.rotate
        var placed = true; // = false de hien thi nhung tu ko dc dien

        var gtext = mainGroup.selectAll('.gtext')
            .data(allWords)
            .attr({transform: function(d){return 'translate('+d.x+', '+d.y+')rotate('+d.rotate+')';}});

        gtext.selectAll('text')
            .text(function(d){return d.text;})
            .transition().attr('font-size', function(d){return d.fontSize + "px";} )// add text vao g
            .attr({
                topic: function(d){return d.topic;},
                visibility: function(d){ return d.placed ? (placed? "visible": "hidden"): (placed? "hidden": "visible");}
            })
            .style({
                'font-family': font,
                'font-size': function(d){return d.fontSize + "px";},
                'fill': function(d){return lineColor(d.fontSize)},//function(d){return color(d.topicIndex);},
                'fill-opacity': function(d){return opacity(d.frequency)},
                'text-anchor': 'middle',
                'alignment-baseline': 'middle'
            });
        console.log(data);
        gtext.enter()
            .append('g')
            .attr('class','gtext')
            .attr({transform: function(d){return 'translate('+d.x+', '+d.y+')rotate('+d.rotate+')';}})
            .append('text')
            .text(function(d){return d.text;})
            .transition().attr('font-size', function(d){return d.fontSize + "px";} )// add text vao g
            .attr({
                topic: function(d){return d.topic;},
                visibility: function(d){ return d.placed ? (placed? "visible": "hidden"): (placed? "hidden": "visible");}
            })
            .style({
                'font-family': font,
                'font-size': function(d){return d.fontSize + "px";},
                'fill': function(d){return lineColor(d.fontSize)},
                'fill-opacity': function(d){return opacity(d.frequency)},
                'text-anchor': 'middle',
                'alignment-baseline': 'middle'
            });
        gtext.exit().selectAll('*').remove();
        gtext.exit().remove();
        // When click a term
        //Try
        var prevColor;
        //Highlight
        mainGroup.selectAll('text').on('mouseenter', function(){
            var thisText = d3.select(this);
            thisText.style('cursor', 'pointer');
            prevColor = thisText.attr('fill');

            var text = thisText.text();
            var topic = thisText.attr('topic');
            var allTexts = mainGroup.selectAll('text').filter(t =>{
                return t && t.text === text &&  t.topic === topic;
        });
            allTexts.attr({
                stroke: prevColor,
                'stroke-width': 1.5
            });
        });

        mainGroup.selectAll('text').on('mouseout', function(){
            var thisText = d3.select(this);
            thisText.style('cursor', 'default');
            var text = thisText.text();
            var topic = thisText.attr('topic');
            var allTexts = mainGroup.selectAll('text').filter(t =>{
                return t && !t.cloned && t.text === text &&  t.topic === topic;
        });
            allTexts.attr({
                stroke: 'none',
                'stroke-width': '0'
            });
        });
        //Click
        mainGroup.selectAll('text').style("fill", function (d, i) {
            // if (d.topic == "diseaseName"){
            //     mapList[d.text] = {diseaseName: d.text, color: streamColor(d.text) };
            //     mapColorList[d.text] = mapColorList[d.text] ? streamColor(d.text) : streamColor(d.text);
            //     return streamColor(d.text);
            // }
        });
        mainGroup.selectAll('text').on('click', function(d){
            // if (d.topic=="diseaseName") {
            //     diseaseNameMap = d.text;
            //     myDiseaseName = d.text;
            //     for (i in mapList) {
            //         if (mapList[d.text].diseaseName == diseaseNameMap) {
            //             mapColor = mapList[d.text].color;
            //             break;
            //         }
            //     }
            //     // debugger;
            //     showMap(diseaseNameMap, mapColor);
            // }
            // if(clickNo==0){
            //     highlightLayer({term: d.text});
            //     highlightWord3(d);
            //     loadDataUpdate(d.text);
            //     clickNo = 1;
            //     console.log("click if")
            // }
            // else
            // {
            //     console.log("click else")
            //     d3.select(this).attr("opacity", "1");
            //     unhighlightLayer();
            //     unHighlightWord();
            //     clickNo = 0;
            //     wordTip.hide();
            //     /*showNewWords2(myWordCloud2, topTerms2);
            //     //Set stream graph, topterms.monthfreq contains monthly frequency
            //     updateStreamGraph(topTerms2, false);*/
            // }
            var thisText = d3.select(this);
            var text = thisText.text();
            var topic = thisText.attr('topic');
            var allTexts = mainGroup.selectAll('text').filter(t =>{
                return t && t.text === text &&  t.topic === topic;
        });
            //Select the data for the stream layers
            var streamLayer = d3.select("path[topic='"+ topic+"']" )[0][0].__data__;
            //Push all points
            var points = Array();
            //Initialize all points
            streamLayer.forEach(elm => {
                points.push({
                x: elm.x,
                y0: 0,//elm.y0+elm.y,//+elm.y,//elm.y0+elm.y,
                y: 0//zero as default
            });
            });
            // console.log(points);
            allTexts[0].forEach(t => {
                var data = t.__data__;
            var fontSize = data.fontSize;
            //The point
            var thePoint = points[data.timeStep+1];//+1 since we added 1 to the first point and 1 to the last point.
            thePoint.y = data.streamHeight;
            //Set it to visible.
            //Clone the nodes.
            var clonedNode = t.cloneNode(true);
            d3.select(clonedNode).attr({
                visibility: "visible",
                stroke: 'none',
                'stroke-size': 0,
            });
            var clonedParentNode = t.parentNode.cloneNode(false);
            clonedParentNode.appendChild(clonedNode);

            t.parentNode.parentNode.appendChild(clonedParentNode);
            d3.select(clonedParentNode).attr({
                cloned: true,
                topic: topic
            }).transition().duration(300).attr({
                transform: function(d, i){return 'translate('+thePoint.x+','+(thePoint.y0+thePoint.y+fontSize/2)+')';},
            });
        });
            //Add the first and the last points
            points[0].y = points[1].y;//First point
            points[points.length-1].y = points[points.length-2].y;//Last point
            //Append stream
            wordStreamG.append('path')
                .datum(points)
                .attr('d', area)
                .style('fill', prevColor)
                .attr({
                    'fill-opacity': 1,
                    stroke: 'black',
                    'stroke-width': 0.3,
                    topic: topic,
                    wordStream: true
                });
            //Hide all other texts
            var allOtherTexts = mainGroup.selectAll('text').filter(t =>{
                return t && !t.cloned &&  t.topic === topic;
        });
            allOtherTexts.attr('visibility', 'hidden');
        });



        topics.forEach(topic=>{
            d3.select("path[topic='"+ topic+"']" ).on('click', function(){
            mainGroup.selectAll('text').filter(t=>{
                return t && !t.cloned && t.placed && t.topic === topic;
        }).attr({
                visibility: 'visible'
            });
            //Remove the cloned element
            document.querySelectorAll("g[cloned='true'][topic='"+topic+"']").forEach(node=>{
                node.parentNode.removeChild(node);
        });
            //Remove the added path for it
            document.querySelectorAll("path[wordStream='true'][topic='"+topic+"']").forEach(node=>{
                node.parentNode.removeChild(node);
        });
        });

    });

    }


    return {
        update: function (words) {
            draw(words,1);
        }
    }
}


// Fills in missing dates in 'data'. 'data' must be non-empty.
// Assumes that 'data' is sorted by date in chronological order.
function fillData(data, endDate, startDate) {
    var d = [],
        len = data.length,
        now = new Date(startDate),
        last = new Date(endDate),
        iterator = 0,
        y;

    while (now <= last) {
        y = 0;
        try {
            var presenttime = new Date(data[iterator].month);
            if (iterator < len && (now.getTime() == presenttime.getTime())) {
                y = data[iterator].freq;
                ++iterator;
            }
        }
        catch (exc) {
            // console.log(iterator);
            // debugger;
        }
        d.push({"month": new Date(now), "freq": y});
        now["setDate"](now.getDate() + 1);
    }

    return d;
}

// function updateStreamGraph(topTerms, hasTransition) {
//     // console.log("here");
//     startDate = maxDate(topTerms);
//
//     endDate = minDate(topTerms);
//
//     topTerms.forEach(function (d) {
//         d.monthfreq = fillData(d.monthfreq, startDate, endDate);
//     });
//
//     layers = stack(topTerms);
//     stack = stack.offset("silhouette");
//
//     timelineX.domain([endDate, startDate]);
//     timelineY.domain([0, d3.max(layers, function (d) {
//         var localMax = d3.max(d.monthfreq, function (d) {
//             return d.y0 + d.y;
//         });
//         return localMax;
//     })]);
//
//     // TODO: Sort topTerms by category.
//     topTerms.sort(function(a, b) {
//         return a.freq - b.freq;
//     });
//     lineColor.domain([topTerms[0].freq, topTerms[49].freq]);
//     // Stacked layers.
//     var stackLayers = timeline2.selectAll(".layer")
//         .data(layers);
//     stackLayers.enter().append("path")
//         .attr("clip-path", "url(#sideClip)")
//         .attr("class", "layer")
//         .call(updateLayer2)
//         .on("mouseover", function (d) {
//             highlightLayer(d);
//             highlightWord(d);
//         })
//         .on("mouseout", function () {
//             unhighlightLayer();
//             unHighlightWord();
//         });
//
//     // Lines separating stacked layers.
//     var layerLines = timeline2.selectAll(".layerLine")
//         .data(layers);
//     layerLines.enter().append("path")
//         .attr("clip-path", "url(#sideClip)")
//         .attr("class", "layerLine")
//         .call(updateLayerLine);
//
//     if (hasTransition) {
//         timeline2.selectAll(".layer")
//             .transition()
//             .call(updateLayer2);
//
//         timeline2.selectAll(".layerLine")
//             .transition()
//             .call(updateLayerLine);
//     } else {
//         timeline2.selectAll(".layer")
//             .call(updateLayer2);
//
//         timeline2.selectAll(".layerLine")
//             .call(updateLayerLine);
//     }
//
//     // Remove layers that should no longer be there.
//     stackLayers.exit().remove();
//     layerLines.exit().remove();
//
//     // Add axes.
//
//     timeline2.select(".x.axis")
//         .call(xAxis);
//
//     timeline2.select(".y.axis")
//         .call(yAxis);
//
// }

// Updates the stacked layers with their current data.
function updateLayer() {
    this.attr("d", function (d) {
        return area(d.monthfreq);
    })
    .style("fill", function (d, i) {
        return streamColor(i);
    });
}

function updateLayer2() {
    this.attr("d", function (d) {
        return area(d.monthfreq);
    })
        .style("fill", function (d, i) {
            // console.log(d);
            return lineColor(d.freq);
        });
}

// Updates the lines with their current data.
function updateLayerLine() {
    this.attr("d", function (d) {
        return line(d.monthfreq);
    });
}

function highlightLayer(d) {
    timeline.selectAll(".layer")
        .attr("opacity", function (d1) {
            if (d.term == d1.term) {
                return "1";
            } else {
                return "0.2";
            }
        });
    timeline.selectAll(".layerLine")
        .attr("opacity", function (d1) {
            if (d.term == d1.term) {
                return "1";
            } else {
                return "0.2";
            }
        });
    timeline.selectAll(".label")
        .attr("opacity", function (d1) {
            if (d.term == d1.term) {
                return "1";
            } else {
                return "0.2";
            }
        });
}
function highlightLayer2(d) {
    timeline2.selectAll(".layer")
        .attr("opacity", function (d1) {
            if (d.term == d1.term) {
                return "1";
            } else {
                return "0.2";
            }
        });
    timeline2.selectAll(".layerLine")
        .attr("opacity", function (d1) {
            if (d.term == d1.term) {
                return "1";
            } else {
                return "0.2";
            }
        });
}

function highlightWord(d) {
    var cloudText = svg.selectAll("g text")
        .each(function (d1) {
            var currentText = d3.select(this);
            if (d1.text == d.term) {
                wordTip.show(d1, this);
                currentText.attr("opacity", "1");
            } else {
                currentText.attr("opacity", "0.1");
            }
        });
    if ($("#relationshipChart").hasClass("active")) {
        wordTip.hide();

        container.selectAll("path.chord").style("opacity", function (p) {
            // COMPARE CHORD IDS
            return (p.source._id === d.term || p.target._id == d.term) ? 1 : 0.1;


        });
        container.selectAll(".group").select("path").style("opacity", function (p) {
            if (p._id == d.term)
                return 1
            else
                return 0.1

        });

    }
}
function highlightWord3(d) {
    var cloudText = svg.selectAll("g text")
        .each(function (d1) {
            var currentText = d3.select(this);
            if (d1.text == d.text) {
                wordTip.show(d1, this);
                currentText.attr("opacity", "1");
            } else {
                currentText.attr("opacity", "0.1");
            }
        });
    if ($("#relationshipChart").hasClass("active")) {
        wordTip.hide();

        container.selectAll("path.chord").style("opacity", function (p) {
            // COMPARE CHORD IDS
            return (p.source._id === d.term || p.target._id == d.term) ? 1 : 0.1;


        });
        container.selectAll(".group").select("path").style("opacity", function (p) {
            if (p._id == d.term)
                return 1
            else
                return 0.1

        });

    }
}
function highlightWord2(d) {
    var cloudText = svg2.selectAll("g text")
        .each(function (d1) {
            var currentText = d3.select(this);
            if (d1.text == d.text) {
                wordTip.show(d1, this);
                currentText.attr("opacity", "1");
            } else {
                currentText.attr("opacity", "0.1");
            }
        });
    if ($("#relationshipChart").hasClass("active")) {
        wordTip.hide();

        container.selectAll("path.chord").style("opacity", function (p) {
            // COMPARE CHORD IDS
            return (p.source._id === d.term || p.target._id == d.term) ? 1 : 0.1;


        });
        container.selectAll(".group").select("path").style("opacity", function (p) {
            if (p._id == d.term)
                return 1
            else
                return 0.1

        });

    }
}

function unHighlightWord() {
    svg.selectAll("g text")
        .attr("opacity", "1")
        .call(wordTip.hide);
    if ($("#relationshipChart").hasClass("active")) {

        container.selectAll("path.chord").style("opacity", function (p) {
            // COMPARE CHORD IDS
            return 1;


        });
        container.selectAll(".group").select("path").style("opacity", function (p) {
            return 1;

        });

    }
}
function unHighlightWord2() {
    svg2.selectAll("g text")
        .attr("opacity", "1")
        .call(wordTip.hide);
    if ($("#relationshipChart").hasClass("active")) {

        container.selectAll("path.chord").style("opacity", function (p) {
            // COMPARE CHORD IDS
            return 1;


        });
        container.selectAll(".group").select("path").style("opacity", function (p) {
            return 1;

        });

    }
}
function unhighlightLayer() {
    timeline.selectAll(".layer")
        .attr("opacity", "1");
    timeline.selectAll(".layerLine")
        .attr("opacity", "1");
    timeline.selectAll(".label")
        .attr("opacity", "1");
}
function unhighlightLayer2() {
    timeline2.selectAll(".layer")
        .attr("opacity", "1");
    timeline2.selectAll(".layerLine")
        .attr("opacity", "1");
}
function getColor(category, term) {
    if (category == "Person")
        return personcolor[term];
    else if (category == "Misc")
        return misccolor[term];
    else if (category == "Location")
        return locationcolor[term];
    else if (category == "Organization")
        return orgcolor[term];
    else
        return fill(i);
}



///Map
function dedupe(arr) {
    return arr.reduce(function (p, c) {

        // create an identifying id from the object values
        var id = [c.lat, c.long].join('|');

        // if the id is not found in the temp array
        // add the object to the output array
        // and add the key to the temp array
        if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
        }
        return p;

        // return the deduped array
    }, { temp: [], out: [] }).out;
}

function uniq_fast(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
        var item = a[i];
        if(seen[item] !== 1) {
            seen[item] = 1;
            out[j++] = item;
        }
    }
    return out;
}

function frequencyUser(list){
    var counts = {};

    for(var i = 0; i< list.length; i++) {
        var num = list[i].userId;
        counts[num] = counts[num] ? counts[num]+1 : 1;
    }

    var sortable = [];
    for (var user in counts) {
        sortable.push([user, counts[user]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });


    return sortable[0];//.slice(0,20);
}
function showMap(diseaseName, colorMap){
    var locationSort
    firstColor = colorMap;
    lastColor = "#000000";
// secondColor = colorRange(firstColor, lastColor, 0.7)
// thirdColor = colorRange(secondColor, lastColor,0.55)

    color = d3.scale.linear()
        .domain([-1,0,1])
        .range([firstColor,lastColor]);

    secondColor = color(-0.5);
    thirdColor = color(-0.25);

    d3.csv("data/diseaseDatalonglan.csv", function(error, dict) {
        newDict = [];
        for(i = 0 ;i < dict.length; i++){
            usLocation = dict[i].location.split(',');
            if(usLocation[1] != undefined)
                if(usLocation[1].length < 5 )
                    newDict.push(dict[i]);
        }
        dict = newDict;
        for(i = 0 ; i < dict.length; i++){
            if(dict[i].location == "Texas, USA"){
                dict[i].long = -99.9018;
                dict[i].lan = 31.9686;
            }else if(dict[i].location == "Manhattan, NY"){
                dict[i].long = -73.9712;
                dict[i].lan = 40.7831;
            }else if(dict[i].location == "Florida, USA"){
                dict[i].long = -81.5158;
                dict[i].lan = 27.6648;
            }else if(dict[i].location == "Georgia, USA"){
                dict[i].long = -82.9001;
                dict[i].lan = 32.1656;
            }else if(dict[i].location == "Pennsylvania, USA"){
                dict[i].long = -77.1945;
                dict[i].lan = 41.2033;
            }else if(dict[i].location == "Ohio, USA"){
                dict[i].long = -82.9071;
                dict[i].lan = 40.4173;
            }else if(dict[i].location == "Virginia, USA"){
                dict[i].long = -78.6569
                dict[i].lan = 37.4316
            }else if(dict[i].location == "North Carolina, USA"){
                dict[i].long = -79.0193
                dict[i].lan = 35.7596
            }else if(dict[i].location == "New York, USA"){
                dict[i].long = -74.0059
                dict[i].lan = 40.7128
            }else if(dict[i].location == "California, USA"){
                dict[i].long = -119.4179
                dict[i].lan = 36.7783
            }else if(dict[i].location == "Queens, NY"){
                dict[i].long = -73.7949
                dict[i].lan = 40.7282
            }else if(dict[i].location == "South Carolina, USA"){
                dict[i].long = -81.1637
                dict[i].lan = 33.8361
            }else if(dict[i].location == "Kentucky, USA"){
                dict[i].lan = 37.8393
                dict[i].long = -84.2700
            }else if(dict[i].location == "Michigan, USA"){
                dict[i].lan = 44.3148
                dict[i].long = -85.6024
            }else if(dict[i].location == "Indiana, USA"){
                dict[i].lan = 40.2672
                dict[i].long = -86.1349
            }else if(dict[i].location == "Missouri, USA"){
                dict[i].lan = 37.9643
                dict[i].long = -91.8318
            }else if(dict[i].location == "Illinois, USA"){
                dict[i].lan = 40.6331
                dict[i].long = -89.3985
            }else if(dict[i].location == "Tennessee, USA"){
                dict[i].lan = 35.5175
                dict[i].long = -86.5804
            }else if(dict[i].location == "Wisconsin, USA"){
                dict[i].lan = 43.7844
                dict[i].long = -88.7879
            }else if(dict[i].location == "Maryland, USA"){
                dict[i].lan = 39.0458
                dict[i].long = -76.6413
            }else if(dict[i].location == "Alabama, USA"){
                dict[i].lan = 32.3182
                dict[i].long = -86.9023
            }else if(dict[i].location == "Colorado, USA"){
                dict[i].lan = 39.5501
                dict[i].long = -105.7821
            }else if(dict[i].location == "Mississippi, USA"){
                dict[i].lan = 32.3547
                dict[i].long = -89.3985
            }else if(dict[i].location == "Fond du Lac, WI"){
                dict[i].lan = 43.7730
                dict[i].long = -88.4471
            }else if(dict[i].location == "Paradise, NV"){
                dict[i].lan = 36.0972
                dict[i].long = -115.1467
            }else if(dict[i].location == "Louisiana, USA"){
                dict[i].lan = 30.9843
                dict[i].long = -91.9623
            }else if(dict[i].location == "Minnesota, USA"){
                dict[i].lan = 46.7296
                dict[i].long = -94.6859
            }else if(dict[i].location == "Kansas, USA"){
                dict[i].lan = 39.0119
                dict[i].long = -98.4842
            }else if(dict[i].location == "West Virginia, USA"){
                dict[i].lan = 38.5976
                dict[i].long = -80.4549
            }else if(dict[i].location == "Delaware, USA"){
                dict[i].lan = 38.9108
                dict[i].long = -75.5277
            }else if(dict[i].location == "New Jersey, USA"){
                dict[i].lan = 40.0583
                dict[i].long = -74.4057
            }else if(dict[i].location == "Arizona, USA"){
                dict[i].lan = 34.0489
                dict[i].long = -111.0937
            }else if(dict[i].location == "Massachusetts, USA"){
                dict[i].lan =  42.407211
                dict[i].long = -71.382439
            }else if(dict[i].location == "Iowa, USA"){
                dict[i].lan =  41.8780
                dict[i].long = -93.0977
            }
            else if(dict[i].location == "Washington, USA"){
                dict[i].lan =  47.7511
                dict[i].long = -120.7401
            }
            else if(dict[i].location == "Arkansas, USA"){
                dict[i].lan =  35.2010
                dict[i].long = -91.8318
            }
            else if(dict[i].location == "Oregon, USA"){
                dict[i].lan =  43.8041
                dict[i].long = -120.5542
            }
            else if(dict[i].location == "Honolulu, HI"){
                dict[i].lan =  21.3069
                dict[i].long = -157.8583
            }else if(dict[i].location == "Miami, FL"){
                dict[i].lan =  25.7617
                dict[i].long = -80.1918
            }
        }


        top20 = [];
        top20Color = [];
        if(diseaseName != "all"){
            //////
            var cancers = []
            for(i=0;i<dict.length;i++){
                if(dict[i].diseaseName == diseaseName){
                    cancers.push(dict[i]);
                }

            }

            userCount={};
            for(i = 0 ; i < cancers.length;i++){
                userCount[cancers[i].userId] = userCount[cancers[i].userId] ? userCount[cancers[i].userId]+1 : 1
            }

            sortable = [];
            for(obj in userCount){
                sortable.push([obj,userCount[obj]]);
            }

            sortable.sort(function(a,b){
                return b[1] - a[1]
            })

            var locations = [];
            for(i=0;i<cancers.length;i++){
                locations.push([cancers[i].long,cancers[i].lan,cancers[i].location].join('|'));
            }

            countLoc = {};
            for(i=0;i<locations.length;i++){
                countLoc[locations[i]] = countLoc[locations[i]] ? countLoc[locations[i]]+1 :1
            }


            locationSort = [];
            for(obj in countLoc){
                locationSort.push([obj,countLoc[obj]]);
            }

            locationSort.sort(function(a,b){
                return b[1] - a[1]
            })
        }else {
            diseasesList.forEach(function(disease,i){
                    cancers = [];
                for (i = 0; i < dict.length; i++) {
                    if (dict[i].diseaseName == disease.term) {
                        cancers.push(dict[i]);
                    }

                }
                userCount = {};
                for (i = 0; i < cancers.length; i++) {
                    userCount[cancers[i].userId] = userCount[cancers[i].userId] ? userCount[cancers[i].userId] + 1 : 1
                }

                sortable = [];
                for (obj in userCount) {
                    sortable.push([obj, userCount[obj]]);
                }

                sortable.sort(function (a, b) {
                    return b[1] - a[1]
                });
                var needitem = sortable[0];
                needitem.push(disease.term);
                top20.push(needitem);
            });
//////------countLoc = {}
            locations = []
            for(j=0;j<top20.length;j++){
                for(i=0;i<dict.length;i++){
                    if(top20[j][0] == dict[i].userId){
                        locations.push([dict[i].long,dict[i].lan,dict[i].location,dict[i].diseaseName].join('|'))
                    }
                }
            }

            countLoc = {}
            for(i=0;i<locations.length;i++){
                countLoc[locations[i]] = countLoc[locations[i]] ? countLoc[locations[i]]+1 :1
            }
            locationSort = [];
            for(obj in countLoc){
                locationSort.push([obj,countLoc[obj]]);
            }

            locationSort.sort(function(a,b){
                return b[1] - a[1]
            });

        }
/////


        freData = {cnt:[]}



        maxLegend = locationSort[0][1];
        minLegend = (locationSort[locationSort.length-1][1])/2;
        portion = (maxLegend + minLegend) / 4;
        if(diseaseName != "all")
            legendDemo();

        if(diseaseName == "all"){
            for(obj in countLoc){
                freData.cnt.push({
                    name: obj.split('|')[2] ,
                    freq: countLoc[obj],
                    fillKey: obj.split('|')[3],
                    radius: Math.sqrt(countLoc[obj])/2+1,
                    latitude: obj.split('|')[1],
                    longitude: obj.split('|')[0]

                })
            }
        }else{
            for(obj in countLoc){
                if(countLoc[obj] < minLegend + portion){
                    freData.cnt.push({
                        name: obj.split('|')[2],
                        freq: countLoc[obj],
                        fillKey: 'first',
                        radius: Math.sqrt(countLoc[obj])/2+1,
                        latitude: obj.split('|')[1],
                        longitude: obj.split('|')[0]

                    })
                }
                if(countLoc[obj] < minLegend + (2*portion) && countLoc[obj]>= minLegend + portion){
                    freData.cnt.push({
                        name: obj.split('|')[2] ,
                        freq: countLoc[obj],
                        fillKey: 'second',
                        radius: Math.sqrt(countLoc[obj])/2+1,
                        latitude: obj.split('|')[1],
                        longitude: obj.split('|')[0]

                    })
                }
                if(countLoc[obj] < minLegend + (3*portion) && countLoc[obj]>= minLegend + (2*portion)){
                    freData.cnt.push({
                        name: obj.split('|')[2] ,
                        freq: countLoc[obj],
                        fillKey: 'third',
                        radius: Math.sqrt(countLoc[obj])/2+1,
                        latitude: obj.split('|')[1],
                        longitude: obj.split('|')[0]

                    })
                }
                if(countLoc[obj] >= minLegend + (3*portion)){
                    freData.cnt.push({
                        name: obj.split('|')[2] ,
                        freq: countLoc[obj],
                        fillKey: 'forth',
                        radius: Math.sqrt(countLoc[obj])/2+1,
                        latitude: obj.split('|')[1],
                        longitude: obj.split('|')[0]

                    })
                }
            }
        }

        a = d3.selectAll('.datamaps-hoverover')
        if(a[0].length > 0)
            a = d3.selectAll('.datamaps-hoverover').remove()

        if(document.getElementById('mapSvg') != null)
            document.getElementById('mapSvg').remove()

        var freqMap = new Datamap({
            element: document.getElementById('container'),
            scope: 'usa',
            data_width: '100',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true
            },
            bubblesConfig: {
            borderWidth: 0.05,
            borderOpacity: 1,
            fillOpacity: 0.75,},
            fills: {
                'first': firstColor,
                'second': secondColor,
                'third': thirdColor,
                'forth': lastColor,
                'cancer' : mapColorList["cancer"],
                'blood' : mapColorList["blood"],
                'Endocrine' : mapColorList["Endocrine"],
                'Multiple': mapColorList["Multiple"],
                'Musculoskeletal': mapColorList["Musculoskeletal"],
                'Psych': mapColorList["Psych"],
                'Skin': mapColorList["Skin"],
                'SenseOrgansSkin': mapColorList["SenseOrgansSkin"],
                'Neurological': mapColorList["Neurological"],
                'Injury': mapColorList["Injury"],
                'Excretory': mapColorList["Excretory"],
                'Immune': mapColorList["Immune"],
                'InfectiousParasitic' : mapColorList["InfectiousParasitic"],
                'RareDiseases': mapColorList["RareDiseases"],
                'Respiratory': mapColorList["Respiratory"],
                'Reproductive': mapColorList["Reproductive"],
                'Digestive': mapColorList["Digestive"],
                'CongenitalAnomolies': mapColorList["CongenitalAnomolies"],
                'Lymphatic': mapColorList["Lymphatic"],
                'cardiovascular': mapColorList["cardiovascular"],
                defaultFill: '#ccc'
            }
        });



        var frequencyData = freData.cnt;


//draw bubbles for frequencyData
        freqMap.bubbles(frequencyData, {
            popupTemplate: function (geo, data) {
                return ['<div class="hoverinfo">' +  data.name,
                    '<br/>Frequency: ' +  data.freq + ' tweet(s)',
                    '</div>'].join('');
            }
        });

        if(diseaseName == "all")
            showUser(diseaseName,top20,colorMap)
        else
            showUser(diseaseName, sortable.slice(0,20), colorMap)

    });




}



function showUser(diseaseName, diseaseList, mapColor){

    diseaseUser = {diseaseName:'', value:[]};
    diseaseUser.diseaseName = diseaseName;

    diseaseUser.value = diseaseList.sort(function(a,b){return b[1]-a[1];});


    data = [];

    data.push(diseaseUser);

    d3.selectAll('#userFreq svg').remove();


    var axisMargin = 20,
        margin = 15,
        valueMargin = 4,
        width = d3.select('#userList').node().offsetWidth,
        height = 400,
        barHeight = (height-axisMargin-margin*2)* 0.04/data.length,
        barPadding = (height-axisMargin-margin*2)*0.01/data.length,
        data, bar, svg, scale, xAxis, labelWidth = 0;

    max = d3.max(data[0].value, function(d) { return d[1]; });

    var tip2 = d3.tip()
        .attr('class', 'd3-tip d3-tooltip')
        .offset([0, 20])
        .direction('e')
        .html(function(d) {
            // console.log(d.meta);
            return '<table id="tiptable" cellpadding="1" cellspacing="1" align="center">' + '<tr align="center" style="padding:5px;"><td style="padding:5px;"> <b>User ID</td><td style="padding:5px; width:600px;"> <b>Tweets</td><td style="padding:5px;"> <b>Time</b> </td><td style="padding:5px;"> <b>Location</b> </td><td style="padding:5px;"> <b>Disease Name</b> </td></tr>' + d + "</table>";
        });

    svg = d3.select('.chart')
        .append("svg")
        .attr("width", width)
        .attr("height", height);


    svg.call(tip2);
    bar = svg.selectAll("g")
        .data(data[0].value)
        .enter()
        .append("g");

    bar.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

    bar.append("text")
        .attr("class", "label")
        .attr("y", barHeight / 2)
        .attr("fill", "#000000")
        .attr("dy", ".35em") //vertical align middle
        .style("font-weight","bold")
        .text(function(d){
            return d[0];
        }).each(function() {
        labelWidth = Math.ceil(Math.max(labelWidth, this.getBBox().width));
    })
    // .on('click', tip.hide)
        .on('mouseover', function(d){

            d3.csv("data/diseaseUserData.csv", function(error, contentData){
                var count = 0;
                var tweetContent = "";
                for(i=0;i<contentData.length;i++){
                    if(myDiseaseName == "all" && contentData[i].userId == d[0]){
                        // console.log(contentData.userId)
                        tweetContent = tweetContent + '<tr><td align="left" style="padding:5px;">' + contentData[i].userId + "</td>" + '<td align="left" style="padding:5px; width:450px;">' +contentData[i].content + '</td><td align="left" style="padding:5px;">' +contentData[i].timestamp.substring(0, 19) + '</td><td align="left" style="padding:5px;">' +contentData[i].location +'</td><td align="left" style="padding:5px;">' +contentData[i].diseaseName +"</td></tr>";
                        count++;
                    }
                    else if(contentData[i].userId == d[0] && contentData[i].diseaseName ==myDiseaseName){
                        // console.log(contentData.userId)
                        tweetContent = tweetContent + '<tr><td align="left" style="padding:5px;">' + contentData[i].userId + "</td>" + '<td align="left" style="padding:5px; width:450px;">' +contentData[i].content + '</td><td align="left" style="padding:5px;">' +contentData[i].timestamp.substring(0, 19) + '</td><td align="left" style="padding:5px;">' +contentData[i].location +'</td><td align="left" style="padding:5px;">' +contentData[i].diseaseName +"</td></tr>";

                        count++;
                    }


                    if(count>19)
                        break;
                }

                tip2.show(tweetContent, this);
            })

        })
        .on('mouseout', tip2.hide);

    scale = d3.scale.linear()
        .domain([0, max])
        .range([0, width -50- margin*2 - labelWidth]);

    xAxis = d3.svg.axis()
        .scale(scale)
        .tickSize(-height + 2*margin + axisMargin)
        .orient("bottom");

    bar.append("rect")
        .attr("transform", "translate("+labelWidth+", 0)")
        .attr("height", barHeight)
        .attr("width", function(d){
            return scale(d[1]);
        })
        // .on('click', tip.hide)
        .on('click', function(d){
            d3.select(this).attr("fill","#c1c1c1");
            d3.csv("data/diseaseUserData.csv", function(error, contentData){
                var count = 0;
                var tweetContent = "";
                for(i=0;i<contentData.length;i++){
                    if(myDiseaseName == "all" && contentData[i].userId == d[0]){
                        // console.log(contentData.userId)
                        tweetContent = tweetContent + '<tr><td align="left" style="padding:5px;">' + contentData[i].userId + "</td>" + '<td align="left" style="padding:5px; width:450px;">' +contentData[i].content + '</td><td align="left" style="padding:5px;">' +contentData[i].timestamp.substring(0, 19) + '</td><td align="left" style="padding:5px;">' +contentData[i].location +'</td><td align="left" style="padding:5px;">' +contentData[i].diseaseName +"</td></tr>";
                        count++;
                    }
                    else if(contentData[i].userId == d[0] && contentData[i].diseaseName ==myDiseaseName){
                        // console.log(contentData.userId)
                        tweetContent = tweetContent + '<tr><td align="left" style="padding:5px;">' + contentData[i].userId + "</td>" + '<td align="left" style="padding:5px; width:450px;">' +contentData[i].content + '</td><td align="left" style="padding:5px;">' +contentData[i].timestamp.substring(0, 19) + '</td><td align="left" style="padding:5px;">' +contentData[i].location +'</td><td align="left" style="padding:5px;">' +contentData[i].diseaseName +"</td></tr>";

                        count++;
                    }


                    if(count>20)
                        break;
                }
                console.log(tweetContent);
                //tip2.show(tweetContent, this);
            })

        })
        .on('mouseout', function(d){
            if(diseaseName != "all")
                d3.select(this).attr("fill", mapColor)
            else{
                d3.select(this).attr("fill",function(d){return mapColorList[d[2]]});
            }
            tip2.hide;});

    bar.append("text")
        .attr("class", "value")
        .attr("y", barHeight / 2)
        .attr("dx", -valueMargin + labelWidth+5) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "begin")
        .text(function(d){

            return (d[1]);
        })
        .attr("x", function(d){
            // var width = this.getBBox().width;
            return Math.max(valueMargin, scale(d[1]));
        });



    svg.insert("g",":first-child")
        .attr("class", "axisHorizontal")
        .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
        .call(xAxis);

    if(diseaseName != "all")
        svg.selectAll('rect').attr("fill", mapColor)
    else{
        svg.selectAll('rect').attr("fill",function(d){return mapColorList[d[2]]});
    }
}

function legendDemo() {

    sampleNumerical = [minLegend + portion ,minLegend + (2*portion) , minLegend + (3*portion) ,maxLegend];
    sampleThreshold=d3.scale.threshold().domain(sampleNumerical).range(
        [firstColor,secondColor,thirdColor,lastColor]);
    horizontalLegend = d3.svg.legend().units("Freq").cellWidth(45).cellHeight(15).inputScale(sampleThreshold).cellStepping(100);

    arr = d3.selectAll('#footer4 svg');
    if (arr[0].length > 0)
        d3.selectAll('#footer4 svg').remove()

    d3.select("#footer4").append("svg:svg").attr("width",300).attr("height",50).append("g").attr("transform", "translate(100,20)").attr("class", "legend").call(horizontalLegend);

}
function loadDatav2(){
    // START: loader spinner settings ****************************
    var opts = {
        lines: 25, // The number of lines to draw
        length: 15, // The length of each line
        width: 5, // The line thickness
        radius: 25, // The radius of the inner circle
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 2, // Rounds per second
        trail: 50, // Afterglow percentage
        className: 'spinner', // The CSS class to assign to the spinner
    };
    // var target = document.getElementById('loadingSpinner');
    // spinner = new Spinner(opts).spin(target);
    // END: loader spinner settings ****************************


        categories = categories = ["userId","location","diseaseName"];
        //loadBlogPostData(draw, 45);
}

function styleAxis(axisNodes){
    axisNodes.selectAll('.domain').attr({
        fill: 'none'
    });
    axisNodes.selectAll('.tick line').attr({
        fill: 'none',
    });
    axisNodes.selectAll('.tick text').attr({
        'font-family': 'serif',
        'font-size': 10
    });
}
function styleGridlineNodes(gridlineNodes){
    gridlineNodes.selectAll('.domain').attr({
        fill: 'none',
        stroke: 'none'
    });
    gridlineNodes.selectAll('.tick line').attr({
        fill: 'none',
        'stroke-width': 0.7,
        stroke: 'lightgray'
    });
}

// path:      an SVG <path> element
// threshold: a 'close-enough' limit (ignore subdivisions with area less than this)
// segments:  (optional) how many segments to subdivisions to create at each level
// returns:   a new SVG <polygon> element
function pathToPolygonViaSubdivision(path,threshold,segments){
    if (!threshold) threshold = 0.0001; // Get really, really close
    if (!segments)  segments = 3;       // 2 segments creates 0-area triangles

    var points = subdivide( ptWithLength(0), ptWithLength( path.node().getTotalLength() ) );
    for (var i=points.length;i--;) points[i] = [points[i].x,points[i].y];

    var poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
    poly.setAttribute('points',points.join(' '));
    return poly;

    // Record the distance along the path with the point for later reference
    function ptWithLength(d) {
        var pt = path.node().getPointAtLength(d); pt.d = d; return pt;
    }

    // Create segments evenly spaced between two points on the path.
    // If the area of the result is less than the threshold return the endpoints.
    // Otherwise, keep the intermediary points and subdivide each consecutive pair.
    function subdivide(p1,p2){
        let pts=[p1];
        for (let i=1,step=(p2.d-p1.d)/segments;i<segments;i++){
            pts[i] = ptWithLength(p1.d + step*i);
        }
        pts.push(p2);
        if (polyArea(pts)<=threshold) return [p1,p2];
        else {
            let result = [];
            for (let j=1;j<pts.length;++j){
                let mids = subdivide(pts[j-1], pts[j]);
                mids.pop(); // We'll get the last point as the start of the next pair
                result = result.concat(mids)
            }
            result.push(p2);
            return result;
        }
    }

    // Calculate the area of an polygon represented by an array of points
    function polyArea(points){
        var p1,p2;
        for(var area=0,len=points.length,i=0;i<len;++i){
            p1 = points[i];
            p2 = points[(i-1+len)%len]; // Previous point, with wraparound
            area += (p2.x+p1.x) * (p2.y-p1.y);
        }
        return Math.abs(area/2);
    }
}
function getArea(points){       // duplicate of polyArea(points)
    var p1,p2;
    for(var area=0,len=points.length,i=0;i<len;++i){
        p1 = points[i];
        p2 = points[(i-1+len)%len]; // Previous point, with wraparound
        area += (p2.x+p1.x) * (p2.y-p1.y);
    }
    return Math.abs(area/2);
}

// Return the area for an SVG <polygon> or <polyline>
// Self-crossing polys reduce the effective 'area'
function polyArea(poly){
    var area=0,pts=poly.points,len=pts.numberOfItems;
    for(var i=0;i<len;++i){
        var p1 = pts.getItem(i), p2=pts.getItem((i+len-1)%len);
        area += (p2.x+p1.x) * (p2.y-p1.y);
    }
    return Math.abs(area/2);
}


function setStreamGraph(topTerms) {
    // TODO(manorepo): Remove below comment.
    // stream code change - Moved the sub functions out of this function to make available for update.

    startDate = maxDate(topTerms);

    endDate = minDate(topTerms);

    topTerms.forEach(function (d) {
        d.monthfreq = fillData(d.monthfreq, startDate, endDate);
    });

    zeroSeries = [{freq: 0, month: endDate}];
    zeroSeries = fillData(zeroSeries, startDate, endDate);

    // Define dimensions.
    var margin = {top: 20, right: 0, bottom: 30, left: 40};
    var svgWidth = $("#timeline").width();
    var svgHeight = 600;
    var width = svgWidth * 0.98 - margin.left - margin.right;
    var height = svgHeight - margin.bottom - margin.top;

    // Define scales.
    timelineX = d3.time.scale()
        .range([0, width]);

    timelineY = d3.scale.linear()
        .range([height/2, 0]);

    // Define axes.
    xAxis = d3.svg.axis()
        .scale(timelineX)
        .orient("top")
        .ticks(15)
        .tickFormat(d3.time.format("%b %d"));

    yAxis = d3.svg.axis()
        .scale(timelineY)
        .orient("left")
        .ticks(7);

    // Define stacked areas and lines that separate the areas.
    area = d3.svg.area()
        .interpolate("cardinal")
        .x(function (d) {
            return timelineX(d.month);
        })
        .y0(function (d) {
            return timelineY(d.y0);
        })
        .y1(function (d) {
            return timelineY(d.y0+ d.y);
        });

    line = d3.svg.line()
        .interpolate("cardinal")
        .x(function (d) {
            // console.log(d.month)
            return timelineX(d.month);
        })
        .y(function (d) {
            return timelineY(d.y0);
        });

    // TODO: Sort topTerms by category.
    topTerms.sort(function(a, b) {
        return  -a.freq + b.freq;
    });
// console.log(topTerms);
    layers = stack(topTerms);

    timelineX.domain([endDate, startDate]);
    timelineY.domain([0, d3.max(layers, function (d) {
        var localMax = d3.max(d.monthfreq, function (d) {
            return d.y0 + d.y;
        });
        return localMax;
    })]);

    timeline = d3.select("#timeline").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg = timeline.append("g")
        .attr("transform", "translate(" + 0 + "," + height/2 + ")")
        .attr("id","tagCloud")
        .append("svg")
        .attr("width", width)
        .attr("height", height/2);
    myWordCloud = wordCloud('#tagCloud');
    sizeStream = {width: width,height: height/2};
    /* Initialize tooltip */
    svg.call(wordTip);
    cloudmessages = svg.append("p")
        .attr("class", "messages")
        .attr("transform", "translate(10, 10)")
        .html("Updating...")
    // Define a clip path to prevent the graph from going out of its region on zoom.
    defs = timeline.append("defs");
    defs.append("clipPath")
        .attr("id", "sideClip")
        .append("rect")
        .attr("transform", "translate(0,-" + margin.top + ")")
        .attr("width", width)
        .attr("height", height + margin.top);

    // Stacked layers.
    timeline.selectAll(".layer")
        .data(layers)
        .enter().append("path")
        .attr("clip-path", "url(#sideClip)")
        .attr("class", "layer")
        .attr('id',function(d){return 'layer'+d.term;})
        .call(updateLayer)
        .on("mouseover", function (d) {
            // highlightLayer(d);
            // highlightWord(d);
        })
        .on("mouseout", function () {
            // unhighlightLayer();
            // unHighlightWord();
        });
    var label = [];
    layers.forEach(function(d,i){
        var max = 0;
        var index = 0;
        d.monthfreq.forEach(function(e,i){
            if (e.freq>max) {
                max = e.freq;
                index = i;
            }
        });
        label.push({term: d.term,
            freq:d.freq,
            month: d.monthfreq[index].month,
            y0: d.monthfreq[index].y0,
            y: d.monthfreq[index].y});
        mapList[d.term] = {'diseaseName': d.term, 'color': streamColor(i)};
        mapColorList[d.term] = streamColor(i);
    });
    var scalefont = d3.scale.linear().domain([topTerms[topTerms.length-1].freq,topTerms[0].freq]).range([8, 40]);
    var opacity = d3.scale.log()
        .domain([topTerms[topTerms.length-1].freq, topTerms[0].freq])
        .range([0.4,1]);
    timeline.selectAll(".label")
        .data(label)
        .enter().append('text')
        .attr('class','label')
        .text(function(d){
            return d.term;
        })
        .attr("text-anchor","middle")
        .attr("alignment-baseline","middle")
        .attr("x", function(d) {
            return timelineX(d.month); })
        .attr("y", function(d) {
            return timelineY(d.y0+d.y/2); })
        .style({
            'font-family': "Impact",
            'font-size': function(d) {return scalefont(d.freq)},
            fill: function(d,i){return d3.hsl(streamColor(i)).darker(3);},
            'fill-opacity': function(d){return opacity(d.freq)},
            'text-anchor': 'middle',
            'alignment-baseline': 'middle',
            topic: function(d){return d.topic;}
        }).on("mousemove", function (d) {
        //  d3.select(this).attr("opacity", "0.6");
        wordTip.show(d, this);
        // highlightLayer({term: d.text});
    })        .on("mouseout", function (d) {
            // d3.select(this).attr("opacity", "1");
            wordTip.hide();

        })
        .on('click',function (d){
            diseaseNameMap = d.term;
            myDiseaseName = d.term;
            for (i in mapList) {
                if (mapList[d.term].diseaseName == diseaseNameMap) {
                    mapColor = mapList[d.term].color;
                    break;
                }
            }
            // debugger;
            console.log("click");
            if(clickNo==0){
                highlightLayer({term: d.term});
                //highlightWord3(d);
                var Size=d3.select(('#layer'+ d.term)).node().getBBox();
                sizeStream = {width: Size.width,height: Size.height};
                loadDataUpdate(d.term);
                showMap(diseaseNameMap, mapColor);
                clickNo = 1;
                console.log("click if")
            }
            else
            {
                console.log("click else")
                d3.select(this).attr("opacity", "1");
                unhighlightLayer();
                //unHighlightWord();
                clickNo = 0;
                wordTip.hide();
                sizeStream = {width: width,height: height/2};
                showNewWords(myWordCloud, convertterm2Date(topTerms2));
                showMap("all","#aaa");
                //Set stream graph, topterms.monthfreq contains monthly frequency
                // updateStreamGraph(topTerms2, false);
            }
        });
    // Lines separating stacked layers.
    timeline.selectAll(".layerLine")
        .data(layers)
        .enter().append("path")
        .attr('id',function(d){return 'layerline'+d.term;})
        .attr("clip-path", "url(#sideClip)")
        .attr("class", "layerLine")
        .call(updateLayerLine);

    // Add axes.
    timeline.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height/2 + ")")
        .call(xAxis);

    timeline.append("g")
        .attr("class", "y axis")
        .call(yAxis);
    timeline.append("text")
        .attr("transform","rotate(-90)")
        .attr("y",0 - margin.left-4)
        .attr("x",0 - (height / 4))
        .attr("dy","1em")
        .style("text-anchor","middle")
        .text("Frequency");
    // timeline.append("text")
    //     .attr("transform", "translate(" + (width / 2) + " ," + (height/2-20) + ")")
    //     .style("text-anchor", "middle")
    //     .text("Date")
    //     .attr("class", "axis-label")

    // Create legend.
    var legend = timeline.append("g")
        .attr("transform", "translate(" + (width - 100) + "," + (-margin.top + 2) + ")")
        .style("fill", "rgb(255, 142, 44)");

    var categoryColors = [
        { category: "Person", color: "#d62728" },
        { category: "Location", color: "rgb(44, 160, 44)" },
        { category: "Organization", color: "#1f77b4" },
        { category: "Miscellaneous", color: "#ff7f0e" }
    ];



}