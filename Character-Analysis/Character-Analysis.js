$(document).ready(function () {

    var Frequency = klass(function (givenString) {
        this.input = givenString;
        this.set = [{letter: "a", frequency: 0}
                   ,{letter: "b", frequency: 0}
                   ,{letter: "c", frequency: 0}
                   ,{letter: "d", frequency: 0}
                   ,{letter: "e", frequency: 0}
                   ,{letter: "f", frequency: 0}
                   ,{letter: "g", frequency: 0}
                   ,{letter: "h", frequency: 0}
                   ,{letter: "i", frequency: 0}
                   ,{letter: "j", frequency: 0}
                   ,{letter: "k", frequency: 0}
                   ,{letter: "l", frequency: 0}
                   ,{letter: "m", frequency: 0}
                   ,{letter: "n", frequency: 0}
                   ,{letter: "o", frequency: 0}
                   ,{letter: "p", frequency: 0}
                   ,{letter: "q", frequency: 0}
                   ,{letter: "r", frequency: 0}
                   ,{letter: "s", frequency: 0}
                   ,{letter: "t", frequency: 0}
                   ,{letter: "u", frequency: 0}
                   ,{letter: "v", frequency: 0}
                   ,{letter: "w", frequency: 0}
                   ,{letter: "x", frequency: 0}
                   ,{letter: "y", frequency: 0}
                   ,{letter: "z", frequency: 0}
                   /*
                   Add your own set of characters here! Simply change the value of property letter
                   */
                   ];
        minFrequency = null;
        maxFrequency = null;
    })
        .methods({
            getSet: function () { return this.set },
            getInput: function () { return this.input },
            getMinFrequency: function () { return minFrequency },
            getMaxFrequency: function () { return maxFrequency },

            // Returns an array collection of frequencies of a given letter in input
            setFrequency: function () {
                
                // Go through this.input array
                for (i = 0; i < this.input.length; i++) {
                    // Case lowering intentional, the purpose is to get frequency of both sets of letters (big and small)
                    var comparableChar = this.input.charAt(i).toLowerCase();
                    
                    // Go through this.set entries (alphabet keys on a keyboard)
                    for (n = 0; n < this.set.length; n++) {
                        // if a key matches the current input character, increment frequency
                        if (this.set[n].letter == comparableChar)
                            this.set[n].frequency++;
                    }
                }
                
                var maxCandidateValue = -1;
                var minCandidateValue = Number.POSITIVE_INFINITY;
                
                // Go through this.set frequencies
                for (i = 0; i < this.set.length; i++) {
                    if (this.set[i].frequency > maxCandidateValue) {
                        maxCandidateValue = this.set[i].frequency;
                    }
                    
                    if (this.set[i].frequency < minCandidateValue) {
                        minCandidateValue = this.set[i].frequency;
                    }
                }
                
                maxFrequency = maxCandidateValue;
                minFrequency = minCandidateValue;
            }
        });
        
    var Draw = klass(function (collectionKeys, passedMinFrequency, passedMaxFrequency) {
        this.data = collectionKeys;
        this.minFrequency = passedMinFrequency;
        this.maxFrequency = passedMaxFrequency;
    })
        .methods({
            getData: function () { return this.data },
            setData: function (argData) { this.data = argData},
            setMinFrequency: function (argMinFrequency) { this.minFrequency = argMinFrequency }, 
            setMaxFrequency: function (argMaxFrequency) { this.maxFrequency = argMaxFrequency }, 
            drawBarGraph: function () {
                
                // Introducing and defining all variables here
                var svgWidth = ($(".character").width() - 1),
                    svgHeight = 400,
                    barPadding = 1,
                    data = this.data,
                    minFrequency = this.minFrequency,
                    maxFrequency = this.maxFrequency,
                    svg = d3.select(".character")
                            .append("svg")
                            .attr("id", "graph")
                            .attr("width", svgWidth)
                            .attr("height", svgHeight),
                    labelcontainer = d3.select(".character")
                                       .append("div")
                                       .attr("id", "labels")
                                       .attr("width", svgWidth)
                                       .attr("height", 30)
                                       .style("height", "30px"),
                    scale = d3.scale.linear()
                              .domain([minFrequency, maxFrequency])
                              .range([3, svgHeight]);
                
                // Below: creating graph bars
                // Thanks to
                // http://alignedleft.com/tutorials/d3/making-a-bar-chart/
                svg.selectAll("rect")
                   .data(this.data)
                   .enter()
                   .append("rect")
                   .attr("class", "bar")
                   .attr("data-frequency", function (d) {
                        return d.frequency;
                   })
                   .attr("data-letter", function (d) {
                        return d.letter;
                   })
                   .style("transition-property", "border")
                   .style("transition-duration", "1s")
                   .style("transition-delay", "1s")
                   .transition()
                   .attr("x", function (d, i) {
                        return i * (svgWidth / data.length);
                   })
                  .attr("width", svgWidth / data.length - barPadding)
                  .attr("y", function (d) {
                        return svgHeight - scale(maxFrequency);
                  })
                  .each("end", function () {
                        d3.select(this)
                          .transition()
                          .duration(50)
                          .attr("height", function (d) {
                                return scale(maxFrequency);
                          })
                          .each("end", function () {
                                d3.select(this)
                                  .transition()
                                  .delay(200)
                                  .attr("y", function (d) {
                                    return svgHeight - scale(d.frequency);
                                  })
                          })
                  });
                
                // Labels with key letters
                labelcontainer.selectAll("div")
                              .data(this.data)
                              .enter()
                              .append("div")
                              .attr("class", "label")
                              .text(function (d) {
                                    return d.letter;
                              })
                              .style("height",30  + "px")
                              .style("width", function () {
                                    return svgWidth / data.length - barPadding + "px";
                              });
                
                this.svg = svg;
                this.labelcontainer = labelcontainer;
            },
            
            updateBarGraph: function (sortorder) {
                
                // Definitions
                var svgWidth = ($(".character").width() - 1),
                    svgHeight = 400,
                    barPadding = 1,
                    data = this.data,
                    minFrequency = this.minFrequency,
                    maxFrequency = this.maxFrequency,
                    svg = this.svg,
                    labelcontainer = this.labelcontainer,
                    scale = d3.scale.linear()
                              .domain([minFrequency, maxFrequency])
                              .range([3, svgHeight]);
                
                // Below: sort the data that we assigned from the object's property this.data
                if (sortorder == "ascend") {
                    data.sort(function (a, b) { return a.frequency - b.frequency });
                } else if (sortorder == "descend") {
                    data.sort(function (a, b) { return b.frequency - a.frequency });
                } else if (sortorder == "alphabet") {
                    data.sort(function (a, b) {
                        // Thanks to http://www.sitepoint.com/sophisticated-sorting-in-javascript/
                        var x = a.letter.toLowerCase(),
                            y = b.letter.toLowerCase();
                        
                        return (x < y) ? -1 : (x > y) ? 1 : 0;
                    });
                }
                
                svg.selectAll("rect")
                   .data(data)
                   .attr("data-frequency", function (d) {
                        return d.frequency;
                   })
                   .attr("data-letter", function (d) {
                        return d.letter;
                   })
                   .attr("fill", function (d) {
                        // Normalize to a number between 1 and 0
                        var normalizedFrequency = d.frequency / maxFrequency;
                        if (d.frequency == 0) normalizedFrequency = 0.1;
                        
                        // Assign amount for blue, limit 0 - 255
                        return "rgb(75, 180, "+ (Math.floor(255 - (255 * normalizedFrequency))) +")";
                   })
                   .transition()
                   .delay(200)
                   .attr("y", function (d) {
                        return svgHeight - scale(d.frequency);
                   });
                   
                   
                labelcontainer.selectAll("div")
                              .data(data)
                              .text(function (d) {
                                    return d.letter;
                              })
            }
        });
        
    /*
    Main logic
    */
    
    // inputstring is used throughout the program to store and pass the given user input
    var inputstring = $("#source").val();
    // Below: used throughout the program to store the mode of visualization
    var session_updatemode = "descend";
    
    InputFrequencyHandler = new Frequency(inputstring);
    InputFrequencyHandler.setFrequency();
    
    GraphicsHandler = new Draw(InputFrequencyHandler.getSet(), InputFrequencyHandler.getMinFrequency(), InputFrequencyHandler.getMaxFrequency());
    GraphicsHandler.drawBarGraph();
    
    GraphicsHandler.updateBarGraph(session_updatemode);
    
    /* 
    Textarea
    */
    
    $("#source").live("change", function () {
        inputstring = $(this).val();
        
        InputFrequencyHandler = new Frequency(inputstring);
        InputFrequencyHandler.setFrequency();
        
        GraphicsHandler.setMinFrequency(InputFrequencyHandler.getMinFrequency());
        GraphicsHandler.setMaxFrequency(InputFrequencyHandler.getMaxFrequency());
        GraphicsHandler.setData(InputFrequencyHandler.getSet());
        
        // Using the current session_updatemode as a parameter
        GraphicsHandler.updateBarGraph(session_updatemode); 
    });
    
    /* 
    Buttons
    */
    
    $("#change-to-alphabetic").live("click", function () {
        inputstring = $("#source").val();
        session_updatemode = "alphabet";
        
        InputFrequencyHandler = new Frequency(inputstring);
        InputFrequencyHandler.setFrequency();
        
        GraphicsHandler.setMinFrequency(InputFrequencyHandler.getMinFrequency());
        GraphicsHandler.setMaxFrequency(InputFrequencyHandler.getMaxFrequency());
        GraphicsHandler.setData(InputFrequencyHandler.getSet());
        
        // Using the current session_updatemode as a parameter
        GraphicsHandler.updateBarGraph(session_updatemode);
    });
    
    $("#change-to-ascending").live("click", function () {
        inputstring = $("#source").val();
        session_updatemode = "ascend";
        
        InputFrequencyHandler = new Frequency(inputstring);
        InputFrequencyHandler.setFrequency();
        
        GraphicsHandler.setMinFrequency(InputFrequencyHandler.getMinFrequency());
        GraphicsHandler.setMaxFrequency(InputFrequencyHandler.getMaxFrequency());
        GraphicsHandler.setData(InputFrequencyHandler.getSet());
        
        // Using the current session_updatemode as a parameter
        GraphicsHandler.updateBarGraph(session_updatemode);
    });
    
    $("#change-to-descending").live("click", function () {
        inputstring = $("#source").val();
        session_updatemode = "descend";
        
        InputFrequencyHandler = new Frequency(inputstring);
        InputFrequencyHandler.setFrequency();
        
        GraphicsHandler.setMinFrequency(InputFrequencyHandler.getMinFrequency());
        GraphicsHandler.setMaxFrequency(InputFrequencyHandler.getMaxFrequency());
        GraphicsHandler.setData(InputFrequencyHandler.getSet());
        
        // Using the current session_updatemode as a parameter
        GraphicsHandler.updateBarGraph(session_updatemode);        
    });
    
    /*
    Graph bars
    */
    
    $("rect").live("mouseover", function (event) {
        
            var top = "420 px",
                left = (event.pageX-220) + "px";
        
        $("#data-box").text( $(this).attr("data-letter") + " = " + $(this).attr("data-frequency") )
                      .css( "visibility", "visible" )
                      .css("top", top)
                      .css("left", left);
                      
        $(this).css("border", "1px solid #333");
        
    }).live("mousemove", function () {
            var top = "420px",
                left = (event.pageX-220) + "px";
        
        $("#data-box").css("top", top)
                      .css("left", left);
        
    }).live("mouseout", function () {
        $("#data-box").css("visibility", "hidden");
    })

}); // End of document ready