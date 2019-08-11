function wordCloud(selector) {
    mappingDiseaseNameColor = {diseaseName: '', color : ''};
    mapList = [];
    mapColorList = {};
    k = 0;
    var dataWidth;
    var width = cloudWidth1;
    // document.getElementById("mainsvg").setAttribute("width",width);
    var font = "Impact";
    var interpolation = "cardinal";
    var bias = 200;
    var offsetLegend = 50;
    var axisPadding = 10;
    var margins = {left: 10, top: 5, right: 10, bottom: 30};
    width = width - margins.left-margins.right;
    var height = cloudHeight;
    height = height - margins.left-margins.right;

    //set svg data.
    svg.attr({
        width: width + margins.left + margins.top,
        height: height + margins.top + margins.bottom + axisPadding +  bias
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
    var axisGroup = svg.append('g').attr('transform', 'translate(' + (margins.left) + ',' + (height+margins.top+axisPadding) + ')');
    var xGridlinesGroup = svg.append('g');
    var mainGroup = svg.append('g').attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
    var wordStreamG = mainGroup.append('g');

    function draw(data, pop){
        k = 0;
        if (pop) {dataWidth = data.length*20}
        else {dataWidth = data.length*100;}

        width = (dataWidth > cloudWidth1) ? dataWidth:cloudWidth1;
        //Layout data
        var ws = d3.layout.wordStream()
            .size([width, height])
            .interpolate(interpolation)
            .fontScale(d3.scale.linear())
            .minFontSize(8)
            .maxFontSize(40)
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
        var xAxis = d3.svg.axis().orient('bottom').scale(xAxisScale);
        axisGroup.attr('transform', 'translate(' + (margins.left) + ',' + (height+margins.top+axisPadding) + ')');
        var axisNodes = axisGroup.call(xAxis);
        styleAxis(axisNodes);
        //Display the vertical gridline
        var xGridlineScale = d3.scale.ordinal().domain(d3.range(0, dates.length+1)).rangeBands([0, width+width/boxes.data.length]);
        var xGridlinesAxis = d3.svg.axis().orient('bottom').scale(xGridlineScale);
        xGridlinesGroup.attr('transform', 'translate(' + (margins.left-width/boxes.data.length/2) + ',' + (height+margins.top + axisPadding+margins.bottom) + ')');
        var gridlineNodes = xGridlinesGroup.call(xGridlinesAxis.tickSize(-height-axisPadding-margins.bottom, 0, 0).tickFormat(''));
        styleGridlineNodes(gridlineNodes);

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
            .range([0.4,1]);

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
                'fill': function(d){return color(d.topicIndex);},
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
                'fill': function(d){return color(d.topicIndex);},
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
            if (d.topic == "diseaseName"){
                mapList[d.text] = {diseaseName: d.text, color: streamColor(d.text) };
                mapColorList[d.text] = mapColorList[d.text] ? streamColor(d.text) : streamColor(d.text);
                return streamColor(d.text);
            }
        });
        mainGroup.selectAll('text').on('click', function(d){
            if (d.topic=="diseaseName") {
                diseaseNameMap = d.text;
                myDiseaseName = d.text;
                for (i in mapList) {
                    if (mapList[d.text].diseaseName == diseaseNameMap) {
                        mapColor = mapList[d.text].color;
                        break;
                    }
                }
                // debugger;
                showMap(diseaseNameMap, mapColor);
            }
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

    };


    return {
        update: function (words) {
            draw(words,1);
        }
    }
}