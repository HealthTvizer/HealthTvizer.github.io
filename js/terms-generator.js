/**
 * Created by Manohar on 25-Oct-16.
 */
var globalAllDiseaseTerms = new Object();
var disease_keywords ={};
var user_user ={};
var disease_keywords_array = {};
allDiseaseKeywords = "all";
disease_keywords_array[allDiseaseKeywords] = {};
function preProcessData() {
  var stopWordList = ["republicans","republican","democrats","democratic","democrat","americans","american","america","hey","ok","wanna","lmao","lot","ur","im","thank","you?","&amp;","dm","just","dont","lol","lil","gonna","rt","...","..","--","about","above","according","accordingly","across","actually","adj","adv","after","afterwards","again","against","ago","ah","aint","al","albeit","all","almost","alone","along","already","also","alt","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apparently","appear","apply","are","area","areas","arent","around","as","aside","ask","asked","asking","asks","at","available","ave","away","aye","ba","back","backed","backing","backs","basic","basis","be","became","because","become","becomes","becoming","been","before","beforehand","began","begin","behind","being","beings","below","beside","besides","best","better","between","beyond","bi","big","both","brief","but","by","call","called","came","can","cannot","cant","certain","certainly","cf","clear","clearly","cm","co","come","comes","concerning","consequently","considering","contain","containing","contains","contrariwise","corresponding","could","couldnt","course","currently","date","dc","de","definitely","describe","described","describes","despite","determine","determined","di","did","didnt","differ","different","differently","do","does","doesnt","doing","done","dont","double","down","downed","downing","downs","downwards","dr","dual","during","each","early","ed","eg","eight","either","eleven","else","elsewhere","empty","end","ended","ending","ends","enough","entirely","especially","est","et","etc","even","evenly","ever","every","everybody","everyone","everything","everywhere","everywhere","exactly","example","except","excepted","excepting","exception","exclude","excluding","exclusive","face","faces","fact","facts","far","felt","few","fifteen","fifth","find","finds","first","five","for","forth","forty","forward","found","four","fr","free","from","front","ft","full","fully","further","furthered","furthering","furthermore","furthers","furthest","gave","general","generally","get","gets","getting","give","given","gives","go","goes","going","gone","good","goods","got","gotten","great","greater","greatest","group","grouped","grouping","groups","had","hadnt","half","halves","happens","hardly","has","hasnt","hast","hath","have","having","he","hear","heard","hed","hello","help","hence","henceforth","her","here","hereabouts","hereafter","hereby","herein","hereto","hereupon","hers","herself","hes","high","higher","highest","him","himself","hindmost","his","hither","hitherto","hopefully","how","howbeit","however","howsoever","hr","hundred","hyper","id","ie","if","ii","iii","im","immediate","important","in","inasmuch","inc","including","indeed","indicate","indicated","indicates","insofar","insomuch","instead","int","interest","interested","interesting","interests","into","intra","intro","inward","inwards","is","isnt","it","itd","item","itll","its","itself","iv","ive","ix","just","keep","keeps","kept","kg","km","knew","know","known","knows","large","largely","last","lat","lately","later","latest","latter","latterly","least","left","less","lest","let","lets","like","likely","little","ll","lon","long","longer","longest","look","looks","ltd","lt","made","made","mainly","make","making","man","many","may","maybe","md","me","mean","means","meant","meantime","meanwhile","merely","micro","might","mine","mm","more","moreover","morning","most","mostly","move","mph","mr","mrs","ms","mt","much","multi","must","mustnt","my","myself","name","namely","near","nearly","necessary","need","needed","needing","neednt","needs","neither","never","nevertheless","new","newer","newest","news","next","nine","no","nobody","non","none","nonetheless","noone","nope","nor","normally","not","nothing","notwithstanding","novel","now","nowadays","nowhere","nt","number","obs","obviously","of","off","often","oh","okay","old","older","oldest","on","once","one","ones","only","onto","op","open","opened","opening","opens","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","oz","page","part","parted","particular","particularly","parting","parts","per","perhaps","phr","pl","please","plus","pm","possible","pre","presumably","pro","probably","provided","pt","put","puts","quite","rather","re","really","reasonably","regarding","regardless","regards","related","relatively","required","respectively","results","right","said","saith","same","saw","say","saying","says","sec","second","secondly","seconds","see","seeing","seem","seemed","seeming","seems","seen","sees","seldom","self","selves","semi","seven","several","shall","shalt","she","shes","should","shouldnt","show","showed","showing","shown","shows","side","sides","since","sir","sixty","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","st","still","such","supposing","sure","take","tell","tends","th","than","thank","thanks","thanx","that","thatd","thatll","thats","the","thee","their","theirs","them","themselves","then","thence","thenceforth","there","thereabout","thereabouts","thereafter","thereby","thered","therefore","therein","thereof","thereon","theres","thereto","thereupon","therll","these","they","theyve","thine","thing","things","think","thinks","third","this","thorough","thoroughly","those","thou","though","three","thrice","through","throughout","thru","thus","thy","thyself","till","time","tm","to","today","together","told","too","took","toward","towards","trans","tried","tries","truly","trying","turn","turned","turning","turns","twelve","twenty","twice","two","under","unless","unlike","unlikely","until","unto","up","upon","upward","upwards","us","use","used","useful","uses","using","usually","various","ve","very","vi","vii","viii","via","viz","vs","was","wasnt","way","ways","we","well","wells","went","were","werent","weve","what","whatever","whatsoever","when","whence","whenever","whensoever","where","whereabouts","whereafter","whereas","whereat","whereby","wherefore","wherefrom","wherein","whereinto","whereof","whereon","wheresoever","whereto","whereunto","whereupon","wherever","wherewith","whether","whew","which","whichever","whichsoever","while","whilst","whither","who","whoa","whoever","whole","whom","whomever","whomsoever","whose","whosoever","why","will","willing","wilt","wish","with","within","without","wonder","wont","work","worked","working","works","worse","worst","would","wouldnt","wt","xi","xii","xiii","xiv","xv","xvi","xvii","xviii","xix","xx","yd","ye","year","years","yes","yet","yippee","you","youd","youll","young","younger","youngest","your","youre","yours","yourself","yourselves","youve","yup","zero"];
  

      var stopObj = {};
      for (var i = 0; i < stopWordList.length; ++i)
        stopObj[stopWordList[i]] = 1;


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
      // console.log(globalData)
      data.forEach(function (d) {
        // globalData.push(d);
        if(d.diseaseName.length>0){
        var timeStamp = d.timestamp;
        var timeNow = new Date(Date.parse(timeStamp));
        var time = formatDate(timeNow);
        d.time = time;
        var month = parse2(timeNow);
        ++lines;
        // var contentTerms;

        var diseaseName = d.diseaseName.split(",");
        diseaseName.forEach(function (d) {
          if(stopObj[d]!=1){
          if (d) {

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
          }

        })
      }

      });

      callback(allTerms);
    });
  }

  this.getRelated = function (term) {
  }
  this.getMonthFreq = function (term) {
    var termDetails = allTerms.get(term);
    var result = [];
    var Months = termDetails.monthfreq;
    Months.each(function (key, value) {
      result.push({"month": key, "freq": value})
    });
    return result;
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

function preProcessData2() {
  var stopWordList = ["republicans","republican","democrats","democratic","democrat","americans","american","america","hey","ok","wanna","lmao","lot","ur","im","thank","you?","&amp;","dm","just","dont","lol","lil","gonna","rt","...","..","--","about","above","according","accordingly","across","actually","adj","adv","after","afterwards","again","against","ago","ah","aint","al","albeit","all","almost","alone","along","already","also","alt","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apparently","appear","apply","are","area","areas","arent","around","as","aside","ask","asked","asking","asks","at","available","ave","away","aye","ba","back","backed","backing","backs","basic","basis","be","became","because","become","becomes","becoming","been","before","beforehand","began","begin","behind","being","beings","below","beside","besides","best","better","between","beyond","bi","big","both","brief","but","by","call","called","came","can","cannot","cant","certain","certainly","cf","clear","clearly","cm","co","come","comes","concerning","consequently","considering","contain","containing","contains","contrariwise","corresponding","could","couldnt","course","currently","date","dc","de","definitely","describe","described","describes","despite","determine","determined","di","did","didnt","differ","different","differently","do","does","doesnt","doing","done","dont","double","down","downed","downing","downs","downwards","dr","dual","during","each","early","ed","eg","eight","either","eleven","else","elsewhere","empty","end","ended","ending","ends","enough","entirely","especially","est","et","etc","even","evenly","ever","every","everybody","everyone","everything","everywhere","everywhere","exactly","example","except","excepted","excepting","exception","exclude","excluding","exclusive","face","faces","fact","facts","far","felt","few","fifteen","fifth","find","finds","first","five","for","forth","forty","forward","found","four","fr","free","from","front","ft","full","fully","further","furthered","furthering","furthermore","furthers","furthest","gave","general","generally","get","gets","getting","give","given","gives","go","goes","going","gone","good","goods","got","gotten","great","greater","greatest","group","grouped","grouping","groups","had","hadnt","half","halves","happens","hardly","has","hasnt","hast","hath","have","having","he","hear","heard","hed","hello","help","hence","henceforth","her","here","hereabouts","hereafter","hereby","herein","hereto","hereupon","hers","herself","hes","high","higher","highest","him","himself","hindmost","his","hither","hitherto","hopefully","how","howbeit","however","howsoever","hr","hundred","hyper","id","ie","if","ii","iii","im","immediate","important","in","inasmuch","inc","including","indeed","indicate","indicated","indicates","insofar","insomuch","instead","int","interest","interested","interesting","interests","into","intra","intro","inward","inwards","is","isnt","it","itd","item","itll","its","itself","iv","ive","ix","just","keep","keeps","kept","kg","km","knew","know","known","knows","large","largely","last","lat","lately","later","latest","latter","latterly","least","left","less","lest","let","lets","like","likely","little","ll","lon","long","longer","longest","look","looks","ltd","lt","made","made","mainly","make","making","man","many","may","maybe","md","me","mean","means","meant","meantime","meanwhile","merely","micro","might","mine","mm","more","moreover","morning","most","mostly","move","mph","mr","mrs","ms","mt","much","multi","must","mustnt","my","myself","name","namely","near","nearly","necessary","need","needed","needing","neednt","needs","neither","never","nevertheless","new","newer","newest","news","next","nine","no","nobody","non","none","nonetheless","noone","nope","nor","normally","not","nothing","notwithstanding","novel","now","nowadays","nowhere","nt","number","obs","obviously","of","off","often","oh","okay","old","older","oldest","on","once","one","ones","only","onto","op","open","opened","opening","opens","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","oz","page","part","parted","particular","particularly","parting","parts","per","perhaps","phr","pl","please","plus","pm","possible","pre","presumably","pro","probably","provided","pt","put","puts","quite","rather","re","really","reasonably","regarding","regardless","regards","related","relatively","required","respectively","results","right","said","saith","same","saw","say","saying","says","sec","second","secondly","seconds","see","seeing","seem","seemed","seeming","seems","seen","sees","seldom","self","selves","semi","seven","several","shall","shalt","she","shes","should","shouldnt","show","showed","showing","shown","shows","side","sides","since","sir","sixty","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","st","still","such","supposing","sure","take","tell","tends","th","than","thank","thanks","thanx","that","thatd","thatll","thats","the","thee","their","theirs","them","themselves","then","thence","thenceforth","there","thereabout","thereabouts","thereafter","thereby","thered","therefore","therein","thereof","thereon","theres","thereto","thereupon","therll","these","they","theyve","thine","thing","things","think","thinks","third","this","thorough","thoroughly","those","thou","though","three","thrice","through","throughout","thru","thus","thy","thyself","till","time","tm","to","today","together","told","too","took","toward","towards","trans","tried","tries","truly","trying","turn","turned","turning","turns","twelve","twenty","twice","two","under","unless","unlike","unlikely","until","unto","up","upon","upward","upwards","us","use","used","useful","uses","using","usually","various","ve","very","vi","vii","viii","via","viz","vs","was","wasnt","way","ways","we","well","wells","went","were","werent","weve","what","whatever","whatsoever","when","whence","whenever","whensoever","where","whereabouts","whereafter","whereas","whereat","whereby","wherefore","wherefrom","wherein","whereinto","whereof","whereon","wheresoever","whereto","whereunto","whereupon","wherever","wherewith","whether","whew","which","whichever","whichsoever","while","whilst","whither","who","whoa","whoever","whole","whom","whomever","whomsoever","whose","whosoever","why","will","willing","wilt","wish","with","within","without","wonder","wont","work","worked","working","works","worse","worst","would","wouldnt","wt","xi","xii","xiii","xiv","xv","xvi","xvii","xviii","xix","xx","yd","ye","year","years","yes","yet","yippee","you","youd","youll","young","younger","youngest","your","youre","yours","yourself","yourselves","youve","yup","zero"];

      var stopObj = {};
      for (var i = 0; i < stopWordList.length; ++i)
        stopObj[stopWordList[i]] = 1;


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
  this.startProcess2 = function (filename, callback) {
    d3.csv(filename, function (data) {
      data.forEach(function (d) {
        if(d.diseaseName.length>0){
        var timeStamp = d.timestamp;
        var timeNow = new Date(Date.parse(timeStamp));
        var time = formatDate(timeNow);
        d.time = time;
        var month = parse2(timeNow);
        ++lines;


        var globalObj = {};
        globalObj.diseaseName = d.diseaseName;
        globalObj.keyword = d.keyword;
        globalObj.location = d.location;
        globalObj.timestamp = d.timestamp;
        globalObj.time = time;
        var globalContent = [];


        var contentArray = d.content.split(",");
        var diseaseNameObj = d.diseaseName;
        if(!disease_keywords_array[diseaseNameObj])
         disease_keywords_array[diseaseNameObj] = {};

        //debugger;
        //    console.log("tweet="+d);
        contentArray.forEach(function (d) {
            //if (d.indexOf("@")==0)
            //    console.log(d);


          if(alphanumeric(d)){
          if(stopObj[d]!=1){

              // Tommy 2017  ********************************************
              // Network of disease and keywords
              if (disease_keywords[globalObj.diseaseName]==undefined) disease_keywords[globalObj.diseaseName]={};

              if (disease_keywords[globalObj.diseaseName][d]==undefined) {
                disease_keywords[globalObj.diseaseName][d]={};
                  disease_keywords[globalObj.diseaseName][d].frequency = 0;
              }
              disease_keywords[globalObj.diseaseName][d].frequency++;



              // Tommy END ********************************************

              if (d.length >0) {
            globalContent.push(d);
            //allTerms consideration.
            if (disease_keywords_array[allDiseaseKeywords][d]) {
              var freq = disease_keywords_array[allDiseaseKeywords][d].frequency;
              disease_keywords_array[allDiseaseKeywords][d].frequency = freq + 1;
              if (disease_keywords_array[allDiseaseKeywords][d][month]) {
                disease_keywords_array[allDiseaseKeywords][d][month].freq = disease_keywords_array[allDiseaseKeywords][d][month].freq + 1;
                disease_keywords_array[allDiseaseKeywords][d][month].blogs.push(lines);
              }
              else {
                disease_keywords_array[allDiseaseKeywords][d][month] = new Object();
                disease_keywords_array[allDiseaseKeywords][d][month].freq = 1;
                disease_keywords_array[allDiseaseKeywords][d][month].blogs = [];
                disease_keywords_array[allDiseaseKeywords][d][month].blogs.push(lines);

              }
            }
            else {
              disease_keywords_array[allDiseaseKeywords][d] = new Object();
              disease_keywords_array[allDiseaseKeywords][d].frequency = 1;
              disease_keywords_array[allDiseaseKeywords][d].category = "Person";
              if (disease_keywords_array[allDiseaseKeywords][d][month]) {
                disease_keywords_array[allDiseaseKeywords][d][month].freq = disease_keywords_array[allDiseaseKeywords][d][month].freq + 1;
                disease_keywords_array[allDiseaseKeywords][d][month].blogs.push(lines);
              }
              else {
                disease_keywords_array[allDiseaseKeywords][d][month] = new Object();
                disease_keywords_array[allDiseaseKeywords][d][month].freq = 1;
                disease_keywords_array[allDiseaseKeywords][d][month].blogs = [];
                disease_keywords_array[allDiseaseKeywords][d][month].blogs.push(lines);

              }

            }
          }
           if (d.length >0) {
            //allTerms consideration.
            if (disease_keywords_array[diseaseNameObj][d]) {
              var freq = disease_keywords_array[diseaseNameObj][d].frequency;
              disease_keywords_array[diseaseNameObj][d].frequency = freq + 1;
              if (disease_keywords_array[diseaseNameObj][d][month]) {
                disease_keywords_array[diseaseNameObj][d][month].freq = disease_keywords_array[diseaseNameObj][d][month].freq + 1;
                disease_keywords_array[diseaseNameObj][d][month].blogs.push(lines);
              }
              else {
                disease_keywords_array[diseaseNameObj][d][month] = new Object();
                disease_keywords_array[diseaseNameObj][d][month].freq = 1;
                disease_keywords_array[diseaseNameObj][d][month].blogs = [];
                disease_keywords_array[diseaseNameObj][d][month].blogs.push(lines);

              }
            }
            else {
              disease_keywords_array[diseaseNameObj][d] = new Object();
              disease_keywords_array[diseaseNameObj][d].frequency = 1;
              disease_keywords_array[diseaseNameObj][d].category = "Person";
              if (disease_keywords_array[diseaseNameObj][d][month]) {
                disease_keywords_array[diseaseNameObj][d][month].freq = disease_keywords_array[diseaseNameObj][d][month].freq + 1;
                disease_keywords_array[diseaseNameObj][d][month].blogs.push(lines);
              }
              else {
                disease_keywords_array[diseaseNameObj][d][month] = new Object();
                disease_keywords_array[diseaseNameObj][d][month].freq = 1;
                disease_keywords_array[diseaseNameObj][d][month].blogs = [];
                disease_keywords_array[diseaseNameObj][d][month].blogs.push(lines);

              }

            }
          }

          }
        }

        })


        var diseaseName = d.diseaseName.split(",");
        diseaseName.forEach(function (d) {
          if(stopObj[d]!=1){
          if (d) {

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
          }

        })
        

        globalObj.content = globalContent;
        globalData.push(globalObj);
      }
      });
      globalAllDiseaseTerms = allTerms;
      callback(disease_keywords_array);
      
      
    });
  }

  this.getRelated = function (term) {
  }
  this.getMonthFreq = function (term) {
    var termDetails = allTerms.get(term);
    var result = [];
    var Months = termDetails.monthfreq;
    Months.each(function (key, value) {
      result.push({"month": key, "freq": value})
    });
    return result;
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

function preProcessData3(dName) {
  var stopWordList = ["republicans","republican","democrats","democratic","democrat","americans","american","america","hey","ok","wanna","lmao","lot","ur","im","thank","you?","&amp;","dm","just","dont","lol","lil","gonna","rt","...","..","--","about","above","according","accordingly","across","actually","adj","adv","after","afterwards","again","against","ago","ah","aint","al","albeit","all","almost","alone","along","already","also","alt","although","always","am","among","amongst","an","and","another","any","anybody","anyhow","anyone","anything","anyway","anyways","anywhere","apparently","appear","apply","are","area","areas","arent","around","as","aside","ask","asked","asking","asks","at","available","ave","away","aye","ba","back","backed","backing","backs","basic","basis","be","became","because","become","becomes","becoming","been","before","beforehand","began","begin","behind","being","beings","below","beside","besides","best","better","between","beyond","bi","big","both","brief","but","by","call","called","came","can","cannot","cant","certain","certainly","cf","clear","clearly","cm","co","come","comes","concerning","consequently","considering","contain","containing","contains","contrariwise","corresponding","could","couldnt","course","currently","date","dc","de","definitely","describe","described","describes","despite","determine","determined","di","did","didnt","differ","different","differently","do","does","doesnt","doing","done","dont","double","down","downed","downing","downs","downwards","dr","dual","during","each","early","ed","eg","eight","either","eleven","else","elsewhere","empty","end","ended","ending","ends","enough","entirely","especially","est","et","etc","even","evenly","ever","every","everybody","everyone","everything","everywhere","everywhere","exactly","example","except","excepted","excepting","exception","exclude","excluding","exclusive","face","faces","fact","facts","far","felt","few","fifteen","fifth","find","finds","first","five","for","forth","forty","forward","found","four","fr","free","from","front","ft","full","fully","further","furthered","furthering","furthermore","furthers","furthest","gave","general","generally","get","gets","getting","give","given","gives","go","goes","going","gone","good","goods","got","gotten","great","greater","greatest","group","grouped","grouping","groups","had","hadnt","half","halves","happens","hardly","has","hasnt","hast","hath","have","having","he","hear","heard","hed","hello","help","hence","henceforth","her","here","hereabouts","hereafter","hereby","herein","hereto","hereupon","hers","herself","hes","high","higher","highest","him","himself","hindmost","his","hither","hitherto","hopefully","how","howbeit","however","howsoever","hr","hundred","hyper","id","ie","if","ii","iii","im","immediate","important","in","inasmuch","inc","including","indeed","indicate","indicated","indicates","insofar","insomuch","instead","int","interest","interested","interesting","interests","into","intra","intro","inward","inwards","is","isnt","it","itd","item","itll","its","itself","iv","ive","ix","just","keep","keeps","kept","kg","km","knew","know","known","knows","large","largely","last","lat","lately","later","latest","latter","latterly","least","left","less","lest","let","lets","like","likely","little","ll","lon","long","longer","longest","look","looks","ltd","lt","made","made","mainly","make","making","man","many","may","maybe","md","me","mean","means","meant","meantime","meanwhile","merely","micro","might","mine","mm","more","moreover","morning","most","mostly","move","mph","mr","mrs","ms","mt","much","multi","must","mustnt","my","myself","name","namely","near","nearly","necessary","need","needed","needing","neednt","needs","neither","never","nevertheless","new","newer","newest","news","next","nine","no","nobody","non","none","nonetheless","noone","nope","nor","normally","not","nothing","notwithstanding","novel","now","nowadays","nowhere","nt","number","obs","obviously","of","off","often","oh","okay","old","older","oldest","on","once","one","ones","only","onto","op","open","opened","opening","opens","or","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","own","oz","page","part","parted","particular","particularly","parting","parts","per","perhaps","phr","pl","please","plus","pm","possible","pre","presumably","pro","probably","provided","pt","put","puts","quite","rather","re","really","reasonably","regarding","regardless","regards","related","relatively","required","respectively","results","right","said","saith","same","saw","say","saying","says","sec","second","secondly","seconds","see","seeing","seem","seemed","seeming","seems","seen","sees","seldom","self","selves","semi","seven","several","shall","shalt","she","shes","should","shouldnt","show","showed","showing","shown","shows","side","sides","since","sir","sixty","so","some","somebody","somehow","someone","something","sometime","sometimes","somewhat","somewhere","st","still","such","supposing","sure","take","tell","tends","th","than","thank","thanks","thanx","that","thatd","thatll","thats","the","thee","their","theirs","them","themselves","then","thence","thenceforth","there","thereabout","thereabouts","thereafter","thereby","thered","therefore","therein","thereof","thereon","theres","thereto","thereupon","therll","these","they","theyve","thine","thing","things","think","thinks","third","this","thorough","thoroughly","those","thou","though","three","thrice","through","throughout","thru","thus","thy","thyself","till","time","tm","to","today","together","told","too","took","toward","towards","trans","tried","tries","truly","trying","turn","turned","turning","turns","twelve","twenty","twice","two","under","unless","unlike","unlikely","until","unto","up","upon","upward","upwards","us","use","used","useful","uses","using","usually","various","ve","very","vi","vii","viii","via","viz","vs","was","wasnt","way","ways","we","well","wells","went","were","werent","weve","what","whatever","whatsoever","when","whence","whenever","whensoever","where","whereabouts","whereafter","whereas","whereat","whereby","wherefore","wherefrom","wherein","whereinto","whereof","whereon","wheresoever","whereto","whereunto","whereupon","wherever","wherewith","whether","whew","which","whichever","whichsoever","while","whilst","whither","who","whoa","whoever","whole","whom","whomever","whomsoever","whose","whosoever","why","will","willing","wilt","wish","with","within","without","wonder","wont","work","worked","working","works","worse","worst","would","wouldnt","wt","xi","xii","xiii","xiv","xv","xvi","xvii","xviii","xix","xx","yd","ye","year","years","yes","yet","yippee","you","youd","youll","young","younger","youngest","your","youre","yours","yourself","yourselves","youve","yup","zero"];
  

      var stopObj = {};
      for (var i = 0; i < stopWordList.length; ++i)
        stopObj[stopWordList[i]] = 1;



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
  this.startProcess3 = function (dName, callback) {
    
     var myData = myLocalData(dName);
      var count = 0;
    // d3.csv(filename, function (data) {
      
      myData.forEach(function (d) {
        if(d.diseaseName == dName){
          count = 100;
          var timeStamp = d.timestamp;
        var timeNow = new Date(Date.parse(timeStamp));
        var time = formatDate(timeNow);
        var month = parse2(timeNow);
        ++lines;
        var contentArray = d.content;
        contentArray.forEach(function (d) {
        if(alphanumeric(d)){
          if(stopObj[d]!=1){
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
          }
        }

        })
      }
      });
      if(count==0){
       myData.forEach(function (d) {
        if(d.diseaseName.length>0){
        // console.log("working elseif");
        var timeStamp = d.timestamp;
        var timeNow = new Date(Date.parse(timeStamp));
        var time = formatDate(timeNow);
        d.time = time;
        console.log(timeNow)
        var month = parse2(timeNow);
        ++lines;

        var contentArray = d.content;
        contentArray.forEach(function (d) {
          if(stopObj[d]!=1){
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
          }

        })
      }
      });

    }
      

      callback(allTerms);
      
  }

  this.getRelated = function (term) {
  }
  this.getMonthFreq = function (term) {
    var termDetails = allTerms.get(term);
    var result = [];
    var Months = termDetails.monthfreq;
    Months.each(function (key, value) {
      result.push({"month": key, "freq": value})
    });
    return result;
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
function alphanumeric(inputtxt)  
{   
    var letters = /^[a-z]+$/;  
    //if you want upper and numbers too 
    //letters = /^[A-Za-z0-9]+$/;
    //if you only want some letters
    // letters = /^[azertyuiop]+$/;
    if(inputtxt.match(letters))  
    {  
        // alert('Your registration number have accepted : you can try another');  
        // document.form1.text1.focus();  
        return true;  
    }  
    else  
    {  
        // alert('Please input alphanumeric characters only');  
        return false;  
    }  
} 
