/**
 * Created by Manohar on 25-Oct-16.
 */
function preProcessData() {
    var topTerms = new Hashtable();
    var allTerms = new Hashtable();
    var orgTerms=new Hashtable();
    var personsTerms=new Hashtable();
    var miscTerms=new Hashtable();
    var locationTerms=new Hashtable();
    var wnOrgTerms=new Hashtable();
    var wnpersonsTerms=new Hashtable();
    var wnmiscTerms=new Hashtable();
    var wnlocationTerms=new Hashtable();

    var lines=0;
    this.start = function (callback) {
        d3.tsv("data/americablog.tsv", function (data) {


            data.forEach(function (d) {
                var persons = d.person;
                ++lines;
                var personsArray = persons.split("|");
                personsArray.forEach(function (d) {

                    if (d != "") {
                        //allTerms consideration.
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            // value.category="person"
                            allTerms.put(d, value);
                        }


                    }

                })

                //Organization Terms
                var orgs = d.organization;
                var orgsArray = orgs.split("|");
                orgsArray.forEach(function (d) {
                    if (d != "") {

                        //allterms
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            //value.category="organization"
                            allTerms.put(d, value);
                        }

                    }
                })

                //Misc Terms
                var misc = d.miscellaneous;
                var miscArray = misc.split("|");
                miscArray.forEach(function (d) {
                    if (d != "") {

                        //allterms
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            //value.category="organization"
                            allTerms.put(d, value);
                        }

                    }
                })

                //Location Terms
                var location = d.location;
                var locationArray = location.split("|");
                locationArray.forEach(function (d) {
                    if (d != "") {

                        //allterms
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            //value.category="organization"
                            allTerms.put(d, value);
                        }

                    }
                })

            });

            //

            //
           // callback();
            /* d3.tsv("data/huffington.tsv", function (data) {


             data.forEach(function (d) {
             var persons = d.person;
             var personsArray = persons.split("|");
             personsArray.forEach(function (d) {
             if(d!="") {
             //allTerms consideration.
             if (allTerms.containsKey(d) == true) {
             var temp = allTerms.get(d);
             temp.frequency = temp.frequency + 1;
             allTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             // value.category="person"
             allTerms.put(d, value);
             }
             //Persons array
             if (personsTerms.containsKey(d) == true) {
             var temp = personsTerms.get(d);
             temp.frequency = temp.frequency + 1;
             personsTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             // value.category="person"
             personsTerms.put(d, value);
             }
             //wikinews Persons array
             if (wnpersonsTerms.containsKey(d) == true) {
             var temp = wnpersonsTerms.get(d);
             temp.frequency = temp.frequency + 1;
             wnpersonsTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             // value.category="person"
             wnpersonsTerms.put(d, value);
             }

             }

             })

             //Organization Terms
             var orgs=d.organization;
             var orgsArray = orgs.split("|");
             orgsArray.forEach(function (d) {
             if(d!="") {

             //allterms
             if (allTerms.containsKey(d) == true) {
             var temp = allTerms.get(d);
             temp.frequency = temp.frequency + 1;
             allTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             //value.category="organization"
             allTerms.put(d, value);
             }
             //organization Terms
             if (orgTerms.containsKey(d) == true) {
             var temp = orgTerms.get(d);
             temp.frequency = temp.frequency + 1;
             orgTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             //value.category="organization"
             orgTerms.put(d, value);
             }
             //wikinews organisation array
             if (wnOrgTerms.containsKey(d) == true) {
             var temp = wnOrgTerms.get(d);
             temp.frequency = temp.frequency + 1;
             wnOrgTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             //value.category="organization"
             wnOrgTerms.put(d, value);
             }
             }
             })

             //Misc Terms
             var misc=d.miscellaneous;
             var miscArray = misc.split("|");
             miscArray.forEach(function (d) {
             if(d!="") {

             //allterms
             if (allTerms.containsKey(d) == true) {
             var temp = allTerms.get(d);
             temp.frequency = temp.frequency + 1;
             allTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             //value.category="organization"
             allTerms.put(d, value);
             }
             //Misc Terms
             if (miscTerms.containsKey(d) == true) {
             var temp = miscTerms.get(d);
             temp.frequency = temp.frequency + 1;
             miscTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             miscTerms.put(d, value);
             }
             //wiki news Misc Terms
             if (wnmiscTerms.containsKey(d) == true) {
             var temp = wnmiscTerms.get(d);
             temp.frequency = temp.frequency + 1;
             wnmiscTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             wnmiscTerms.put(d, value);
             }
             }
             })

             //Location Terms
             var location=d.location;
             var locationArray = location.split("|");
             locationArray.forEach(function (d) {
             if(d!="") {

             //allterms
             if (allTerms.containsKey(d) == true) {
             var temp = allTerms.get(d);
             temp.frequency = temp.frequency + 1;
             allTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             //value.category="organization"
             allTerms.put(d, value);
             }
             //location Terms
             if (locationTerms.containsKey(d) == true) {
             var temp = locationTerms.get(d);
             temp.frequency = temp.frequency + 1;
             locationTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             locationTerms.put(d, value);
             }
             //wiki location Terms
             if (wnlocationTerms.containsKey(d) == true) {
             var temp = wnlocationTerms.get(d);
             temp.frequency = temp.frequency + 1;
             wnlocationTerms.put(d, temp);
             }
             else {
             var value = {};
             value.frequency = 1;
             wnlocationTerms.put(d, value);
             }
             }
             })

             });

             callback();

             });*/
        });

        // huffingpost
        d3.tsv("data/huffington.tsv", function (data) {
            data.forEach(function (d) {
                var persons = d.person;
                ++lines;
                var personsArray = persons.split("|");
                personsArray.forEach(function (d) {

                    if (d != "") {
                        //allTerms consideration.
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            // value.category="person"
                            allTerms.put(d, value);
                        }


                    }

                })

                //Organization Terms
                var orgs = d.organization;
                var orgsArray = orgs.split("|");
                orgsArray.forEach(function (d) {
                    if (d != "") {

                        //allterms
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            //value.category="organization"
                            allTerms.put(d, value);
                        }

                    }
                })

                //Misc Terms
                var misc = d.miscellaneous;
                var miscArray = misc.split("|");
                miscArray.forEach(function (d) {
                    if (d != "") {

                        //allterms
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            //value.category="organization"
                            allTerms.put(d, value);
                        }

                    }
                })

                //Location Terms
                var location = d.location;
                var locationArray = location.split("|");
                locationArray.forEach(function (d) {
                    if (d != "") {

                        //allterms
                        if (allTerms.containsKey(d) == true) {
                            var temp = allTerms.get(d);
                            temp.frequency = temp.frequency + 1;
                            temp.blogs.push(lines);
                            allTerms.put(d, temp);
                        }
                        else {
                            var value = {};
                            value.frequency = 1;
                            value.blogs = [];
                            value.blogs.push(lines);
                            //value.category="organization"
                            allTerms.put(d, value);
                        }

                    }
                })

            });
            //
            callback();

        });
    }

    this.getRelated = function(term) {
        //
       var termDetails=allTerms.get(term);
        var related=[];
        var blogs=termDetails.blogs;
        allTerms.each(function (key,value) {
            if(term!=key) {
                var count = 0;
                var currblogs = value.blogs;
                for (var i = 0; i < blogs.length; i++) {
                    if (currblogs.indexOf(blogs[i]) > -1) {
                        ++count;
                    }
                }
                if (count > 0) {
                    var term = {};
                    term.term = key;
                    term.freq = count;
                    related.push(term);
                }
            }
        })
        related.sort(function (a,b) {
            return b.freq-a.freq;
        })
        return related.slice(0,49);

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
    this.getTerm=function(iterm) {
        return allTerms.get('gop');
    }
    return this;
}