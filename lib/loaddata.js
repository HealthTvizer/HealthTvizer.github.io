function loadBlogPostData(draw, space){
    var topics = [];
        //rawData;
        topics = categories;
        //Filter and take only dates in 2013
        // rawData = rawData.filter(function(d){
        //     var time = Date.parse(d.time);
        //     var startDate =  inputFormat.parse('2011-06-01T00:00:00');
        //     var endDate = inputFormat.parse('2013-07-01T00:00:00');
        //     //2011 for CrooksAndLiars
        //     if(fileName.indexOf("Liars")>=0){
        //         startDate = inputFormat.parse('2010-01-01T00:00:00');
        //         endDate = inputFormat.parse('2010-07-01T00:00:00');
        //     }
        //     return      time  >= startDate && time < endDate;
        //
        // });
        var data = {};
        d3.map(rawData, function(d, i){
            var date = Date.parse(d.time);
            date = outputFormat(new Date(date));
            topics.forEach(topic => {
                if(!data[date]) data[date] = {};
                data[date][topic] = data[date][topic] ? (data[date][topic] + '|' +d[topic]): (d[topic]); 
            });
        });
        var data = d3.keys(data).map(function(date, i){
            var words = {};
            topics.forEach(topic => {
                var raw = {};
                raw[topic] = data[date][topic].split('|');
                //Count word frequencies
                var counts = raw[topic].reduce(function(obj, word){
                    if(!obj[word]){
                        obj[word] = 0;
                    }
                    obj[word]++;
                    return obj;
                }, {});
                //Convert to array of objects
                words[topic] = d3.keys(counts).map(function(d){
                    return{
                        sudden: 0,
                        text: d,
                        frequency: counts[d],
                        topic: topic
                    }
                })
                    .sort(function(a, b){//sort the terms by frequency
                    return b.frequency-a.frequency;
                }).filter(function(d){return d.text; });//filter out empty words
                words[topic] = words[topic].slice(0, Math.min(words[topic].length, space));

                // words[topic] = words[topic].slice(0, Math.min(words[topic].length, 100));
                // Uncomment above line if processSuddenFreq()
            });
            return {
                date: date,
                words: words
            }
        }).sort(function(a, b){//sort by date
            return outputFormat.parse(a.date) - outputFormat.parse(b.date);
        });

        // processSuddenFreq(data);
        //
        // var sub = d3.keys(data[0].words).map(d => d);
        // for (let i = 0; i < data.length; i ++){
        //     for (let j in sub){
        //         data[i].words[sub[j]].sort(function(a, b){//sort the terms by frequency
        //             return b.sudden-a.sudden;
        //         }).filter(function(d){return d.text; })//filter out empty words
        //          .slice(0, Math.min(data[i].words[sub[j]].length, space));
        //     }
        // }
        draw(data);

}