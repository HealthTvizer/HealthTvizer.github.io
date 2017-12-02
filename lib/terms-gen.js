/**
 * Created by Manohar on 25-Oct-16.
 */
function preProcessData() {
  var topTerms = new Hashtable();
  //var allTerms = new Hashtable();
  var orgTerms = new Hashtable();
  var personsTerms = new Hashtable();
  var miscTerms = new Hashtable();
  var locationTerms = new Hashtable();
  var wnOrgTerms = new Hashtable();
  var wnpersonsTerms = new Hashtable();
  var wnmiscTerms = new Hashtable();
  var wnlocationTerms = new Hashtable();
  var allTerms = new Object();
  var lines = 0;
  var formatDate = d3.time.format("%Y-%m-%d %H:%M:%S");
  var parse2 = d3.time.format("%Y %m %d %H");

  this.startProcess = function (filename, callback) {
    d3.csv(filename, function (data) {
      // console.log(data);
      data.forEach(function (d) {
        d.person = d.content;
         var persons = d.diseaseName;
        var timeStamp = d.timestamp;
        var timeNow = new Date(Date.parse(timeStamp));
        var time = formatDate(timeNow);
        d.time = time;
        var month = parse2(timeNow);
        // var month = d.time.substring(0, 4) + " " + d.time.substring(5, 7);
        ++lines;
        var personsArray = persons.split(",");
        personsArray.forEach(function (d) {
          // console.log(d);
          if (d.length >0) {
            //allTerms consideration.
            if (allTerms[d]) {
              var freq = allTerms[d].frequency;
              allTerms[d].frequency = freq + 1;
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }
            }
            else {
              allTerms[d] = new Object();
              allTerms[d].frequency = 1;
              allTerms[d].category = "Person";
              if (allTerms[d][month]) {
                allTerms[d][month].freq = allTerms[d][month].freq + 1;
                allTerms[d][month].blogs.push(lines);
              }
              else {
                allTerms[d][month] = new Object();
                allTerms[d][month].freq = 1;
                allTerms[d][month].blogs = [];
                allTerms[d][month].blogs.push(lines);

              }

            }

          }

        })




      });

      callback(allTerms);
      console.log(lines);
      console.log(allTerms.chemo);
        // debugger;

    });


  }

  this.getRelated = function (term) {
    //
    //var termDetails = allTerms.get(term);
    //var related = [];
    //var blogs = termDetails.blogs;
    //allTerms.each(function (key, value) {
    //    if (term != key) {
    //        var count = 0;
    //        var currblogs = value.blogs;
    //        for (var i = 0; i < blogs.length; i++) {
    //            if (currblogs.indexOf(blogs[i]) > -1) {
    //                ++count;
    //            }
    //        }
    //        if (count > 0) {
    //            var term = {};
    //            term.term = key;
    //            term.freq = count;
    //            related.push(term);
    //        }
    //    }
    //})
    //related.sort(function (a, b) {
    //    return b.freq - a.freq;
    //})
    //return related.slice(0, 49);

  }
  this.getMonthFreq = function (term) {
    //
    var termDetails = allTerms.get(term);
    var result = [];
    var Months = termDetails.monthfreq;
    Months.each(function (key, value) {
      result.push({"month": key, "freq": value})
    });
    return result;
    //allTerms.each(function (key, value) {
    //    if (term != key) {
    //        var count = 0;
    //        var currblogs = value.blogs;
    //        for (var i = 0; i < blogs.length; i++) {
    //            if (currblogs.indexOf(blogs[i]) > -1) {
    //                ++count;
    //            }
    //        }
    //        if (count > 0) {
    //            var term = {};
    //            term.term = key;
    //            term.freq = count;
    //            related.push(term);
    //        }
    //    }
    //})
    //related.sort(function (a, b) {
    //    return b.freq - a.freq;
    //})
    //return related.slice(0, 49);

  }
  this.getPersonTerms = function () {
    return personsTerms.entries();
  }
  this.getOrganizationTerms = function () {
    return orgTerms.entries();
  }
  this.getMiscTerms = function () {
    return miscTerms.entries();
  }
  this.getLocationTerms = function () {
    return locationTerms.entries();
  }
  this.getTerm = function (iterm) {
    return allTerms.get('gop');
  }
  return this;
}