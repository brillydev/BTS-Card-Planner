var selectCtl = $('#control');
var numDays = 0, numTrips = 0, numStations = 0;
var studentFare = false, seniorFare = false;

$(function() {
    
    $('#info').click(function() {
       $('#div-info').toggle();
       return false;
    });
    $('#btnTraveler').click(func_travelerNumDays);
    $('#btnAdult').click(function() {func_normalNumDays();});
    $('#btnStudent').click(function() {studentFare = true; func_normalNumDays();});
    $('#btnSenior').click(function() {seniorFare = true; func_normalNumDays();});
    $('#btnChildren').click(func_childrenQuery);
    
});

/**
 *  Appends a control asking the how many days a traveller will stay.
 *  Returns the number of days to calculate.
 */
 
function func_childrenQuery() {
    
    selectCtl.children().remove();
    
    // append numDays options
    var content = '<h3>Are you taller than 90 cm?</h3><div id="div-children"><button type="button" value=1 class="btn btn-xl btn-success">Yes</button><button type="button" value=0 class="btn btn-xl btn-success">No</button></div>';
       
    selectCtl.append(content);

    /* --------------- */

    $('button[class~="btn-success"]').click(function() {
        
        switch ($(this).attr("value")) {
            case ('1'):
                func_normalNumDays(false, false);
                break;
            case ('0'):
                selectCtl.children().remove();
                selectCtl.append('<h1><b>You are eligible for free travel.</b></h1><h3>No ticket needed.</h3>');
                break;
        }
    });

}


/**
 *  Appends a control asking the how many days a traveller will stay.
 *  Returns the number of days to calculate.
 */
 
function func_normalNumDays() {
    
    selectCtl.children().remove();
    
    // append numDays options
    var content = '<h3>How often do you commute per month?</h3><div class="div-sep"><div class="div-btnsep"><button type="button" value=30 class="btn btn-xl btn-success">Everyday</button><button type="button" value=20 class="btn btn-xl btn-success">Every Weekday</button><button type="button" value=8 class="btn btn-xl btn-success">Every Weekend</button>';
    
    content += '</div><div id="options-sep"><form role="form"><h3>or</h3><div class="form-group"><div id="div-inputsep"><label class="sr-only" for="numDays">Specify number of days</label><div class="input-group input-group-lg"><input type="number" class="form-control" placeholder="Specify" id="numDays"><span class="input-group-addon">days</span></div><button type="submit" class="btn btn-default btn-lg">Go</button></div></div></form></div></div>';
        
    selectCtl.append(content);

    /* --------------- */

    $('form').submit(function() {
        var numDaysval = $('#numDays').val();
        
        if (numDaysval <= 0 || numDaysval == null) {
            alert('Please enter a number greater than 0 and try again.');
            return false;
        } else if (numDaysval > 30) {
            alert('We do not currently support planning for duration exceeding a month, sir. Please try again.');
            return false;
        } else {
            numDays = numDaysval;
            func_numTrips('On average, how many BTS trips do you take per day?');
            return false;
        }
    });

    $('button[class~="btn-success"]').click(function() {
        
        switch ($(this).attr("value")) {
            case ('30'):
                numDays = 30;
                break;
            case ('20'):
                numDays = 20;
                break;
            case ('8'): 
                numDays = 8;
                break;
        }
        func_numTrips('On average, how many BTS trips do you take per day?');
    });

}


/**
 *  Appends a control asking the how many days a traveller will stay.
 *  Returns the number of days to calculate.
 */
 
function func_travelerNumDays () {
    
    selectCtl.children().remove();
    
    // append numDays options
    var content = '<h3>How long will you be staying in Bangkok?</h3><div class="div-sep"><div class="div-btnsep"><button type="button" value=1 class="btn btn-xl btn-success">1 day</button>';
    
    for (var i = 2; i <= 5; i++) {
        content+= '<button type="button" value=' + i + ' class="btn btn-xl btn-success">' + i + ' days</button>';
    }
    
    content += '</div><div id="options-sep"><form role="form"><h3>or</h3><div class="form-group"><div id="div-inputsep"><label class="sr-only" for="numDays">Specify number of days</label><div class="input-group input-group-lg"><input type="number" class="form-control" placeholder="Specify" id="numDays"><span class="input-group-addon">days</span></div><button type="submit" class="btn btn-default btn-lg">Go</button></div></div></form></div></div>';
        
    selectCtl.append(content);

    /* --------------- */

    $('form').submit(function() {
        var numDaysval = $('#numDays').val();
        
        if (numDaysval <= 0 || numDaysval == null) {
            alert('Please enter a number greater than 0 and try again.');
            return false;
        } else if (numDaysval > 30) {
            alert('We do not currently support planning for duration exceeding a month, sir. Please try again.');
            return false;
        } else {
            numDays = numDaysval;
            func_numTrips('On average, how many BTS trips do you plan to take per day?', true);
            return false;
        }
    });

    $('button[class~="btn-success"]').click(function() {
        
        switch ($(this).attr("value")) {
            case ('1'):
                numDays = 1;
                break;
            case ('2'):
                numDays = 2;
                break;
            case ('3'): 
                numDays = 3;
                break;
            case ('4'):
                numDays = 4;
                break;
            case ('5'):
                numDays = 5;
                break;
        }
        func_numTrips('On average, how many BTS trips do you plan to take per day?', true);
    });

}



/**
 *  Appends a control asking the number of trips one usually travels.
 *  Returns the number of trips to calculate.
 */

function func_numTrips(header, traveler) {
    selectCtl.children().remove();
    
    // append numTrips options
    var content = '<h3>' + header + '</h3><div class="div-sep"><div class="div-btnsep"><button type="button" value=1 class="btn btn-xl btn-success">1 trip</button>';
    
    for (var i = 2; i <= 5; i++) {
        content+= '<button type="button" value=' + i + ' class="btn btn-xl btn-success">' + i + ' trips</button>';
    }
    
    content += '</div><div id="options-sep"><form role="form"><h3>or</h3><div class="form-group"><div id="div-inputsep"><label class="sr-only" for="numTrips">Specify number of trips</label><div class="input-group input-group-lg"><input type="number" class="form-control" placeholder="Specify" id="numTrips"><span class="input-group-addon">trips</span></div><button type="submit" class="btn btn-default btn-lg">Go</button></div></div></form></div></div>';
        
    selectCtl.append(content);

    /* --------------- */

    $('form').submit(function() {
        var numTripsval = $('#numTrips').val();
        
        if (numTripsval <= 0 || numTripsval == null) {
            alert('Please enter a number greater than 0 and try again.');
            return false;
        } else {
            numTrips = numTripsval;
            if (traveler === true) {
                func_numStations('On average, how many stations do you plan to commute per trip?');
            } else {
                func_numStations('On average, how many stations do you commute per trip?');
            }
            return false;
        }
    });

    $('button[class~="btn-success"]').click(function() {
        
        switch ($(this).attr("value")) {
            case ('1'):
                numTrips = 1;
                break;
            case ('2'):
                numTrips = 2;
                break;
            case ('3'): 
                numTrips = 3;
                break;
            case ('4'):
                numTrips = 4;
                break;
            case ('5'):
                numTrips = 5;
                break;
        }
        if (traveler === true) {
                func_numStations('On average, how many stations do you plan to commute per trip?');
            } else {
                func_numStations('On average, how many stations do you commute per trip?');
            }
    });
}



/**
 *  Appends a control asking the number of stations one usually travels.
 *  Returns the number of stations to calculate.
 */

function func_numStations(header) {
    selectCtl.children().remove();
    
    // append numStations options
    var content = '<h3>' + header + '</h3><div id="div-numStations"><button type="button" value=1 class="btn btn-xl btn-success">1 station</button>';
    
    for (var i = 2; i <= 7; i++) {
        content+= '<button type="button" value=' + i + ' class="btn btn-xl btn-success">' + i + ' stations</button>';
    }
    
    content += '<button type="button" value=8 class="btn btn-xl btn-success">>7 stations</button><button type="button" value=18 class="btn btn-xl btn-success">>17 stations</button></div>';
        
    selectCtl.append(content);
    
    /* ------------------------------ */
    
    $('button[class~="btn-success"]').click(function() {
        
        switch ($(this).attr("value")) {
            case ('1'):
                numStations = 1;
                break;
            case ('2'):
                numStations = 2;
                break;
            case ('3'): 
                numStations = 3;
                break;
            case ('4'):
                numStations = 4;
                break;
            case ('5'):
                numStations = 5;
                break;
            case ('6'):
                numStations = 6;
                break;
            case ('7'):
                numStations = 7;
                break;
            case ('8'): 
                numStations = 8;
                break;
            case ('18'):
                numStations = 18;
                break;
        }
        calculate();
    });
}

/**
 *  Calculates the type of ticket one should use.
 */

function calculate() {
    
    var numTripsDay = numTrips;
    numTrips *= numDays;
    var fareTripTotal = 0, fareTripBeforeTotal = 0, numTripsBeforeTotal = 0, numTripsLeftOver = 0;
    var multipleCards = 0, multipleCardsValue = 0, fareMultipleCards = 0;

    // each loop is for finding out the prices of the total number of trips.
    // included in the loop are several variables for different functionalities, including:
    
    // numTripsBeforeTotal: holds value of the total number of trips (cuz numTrips is being reduced in each iteration).
    // numTripsLeftOver: holds value of the next lower number of total trips, for multiple tickets functionality.
    
    if (!studentFare) {
        
        if (numTrips % 50 == 0) {
            fareMultipleCards = 1250 * (numTrips / 50);
            multipleCards = numTrips / 50;
            multipleCardsValue = 50;
        } else if (numTrips % 40 == 0) {
            fareMultipleCards = 1040 * (numTrips / 40);
            multipleCards = numTrips / 40;
            multipleCardsValue = 40;
        } else if (numTrips % 25 == 0) {
            fareMultipleCards = 700 * (numTrips / 25);
            multipleCards = numTrips / 25;
            multipleCardsValue = 25;
        } else if (numTrips % 15 == 0) {
            fareMultipleCards = 450 * (numTrips / 15);
            multipleCards = numTrips / 15;
            multipleCardsValue = 15;
        }
        
        for (; numTrips > 0;) {
            if (numTrips > 50) {
                numTripsBeforeTotal += 50;
                numTripsLeftOver += 50;
                fareTripBeforeTotal += numTrips - 50 > 0 ? 1250 : 0;
                fareTripTotal += 1250;
                numTrips -= 50;
            } else if (numTrips > 40) {
                numTripsBeforeTotal += 50;
                numTripsLeftOver += 40;
                fareTripBeforeTotal += numTrips - 50 > 0 ? 1250 : 0;
                fareTripTotal += 1250;
                numTrips -= 50;
            } else if (numTrips > 25) {
                numTripsBeforeTotal += 40;
                numTripsLeftOver += 25;
                fareTripBeforeTotal += numTrips - 40 > 0 ? 1040 : 0;
                fareTripTotal += 1040;
                numTrips -= 40;
            } else if (numTrips > 15) {
                numTripsBeforeTotal += 25;
                numTripsLeftOver += 15;
                fareTripBeforeTotal += numTrips - 25 > 0 ? 700 : 0;
                fareTripTotal += 700;
                numTrips-= 25;
            } else {
                numTripsBeforeTotal += 15;
                fareTripBeforeTotal += numTrips - 15 > 0 ? 450 : 0;
                fareTripTotal += 450;
                numTrips -= 15;
            }
        }
    
        if (fareTripTotal > fareMultipleCards) {
            fareTripTotal = fareMultipleCards;
        } else {
            multipleCards = 0;
        }
    
    } else {
        
        if (numTrips % 50 == 0) {
            fareMultipleCards = 900 * (numTrips / 50);
            multipleCards = numTrips / 50;
            multipleCardsValue = 50;
        } else if (numTrips % 40 == 0) {
            fareMultipleCards = 760 * (numTrips / 40);
            multipleCards = numTrips / 40;
            multipleCardsValue = 40;
        } else if (numTrips % 25 == 0) {
            fareMultipleCards = 525 * (numTrips / 25);
            multipleCards = numTrips / 25;
            multipleCardsValue = 25;
        } else if (numTrips % 15 == 0) {
            fareMultipleCards = 345 * (numTrips / 15);
            multipleCards = numTrips / 15;
            multipleCardsValue = 15;
        }
            
        for (; numTrips > 0;) {
            if (numTrips > 50) {
                numTripsBeforeTotal += 50;
                numTripsLeftOver += 50;
                fareTripBeforeTotal += numTrips - 50 > 0 ? 900 : 0;
                fareTripTotal += 900;
                numTrips -= 50;
            } else if (numTrips > 40) {
                numTripsBeforeTotal += 50;
                numTripsLeftOver += 40;
                fareTripBeforeTotal += numTrips - 50 > 0 ? 900 : 0;
                fareTripTotal += 900;
                numTrips -= 50;
            } else if (numTrips > 25) {
                numTripsBeforeTotal += 40;
                numTripsLeftOver += 25;
                fareTripBeforeTotal += numTrips - 40 > 0 ? 760 : 0;
                fareTripTotal += 760;
                numTrips -= 40;
            } else if (numTrips > 15) {
                numTripsBeforeTotal += 25;
                numTripsLeftOver += 15;
                fareTripBeforeTotal += numTrips - 25 > 0 ? 525 : 0;
                fareTripTotal += 525;
                numTrips -= 25;
            } else {
                numTripsBeforeTotal += 15;
                fareTripBeforeTotal += numTrips - 15 > 0 ? 345 : 0;
                fareTripTotal += 345;
                numTrips -= 15;
            }
        }
        
        if (fareTripTotal > fareMultipleCards) {
                fareTripTotal = fareMultipleCards;
        } else {
            multipleCards = 0;
        }
            
    }
    
    var fareStationTrip = numStations === 1 ? 15 : 22;

    if (fareStationTrip == 22) {
        if (numStations >= 8) {
            fareStationTrip = 42;
        } else {
            for (var i = 2; i < numStations; i++, fareStationTrip += 3) {}
        }
    }
    
    if (seniorFare) {
        switch (fareStationTrip) {
            case 15:
                fareStationTrip = 7;
                break;
            case 22:
                fareStationTrip = 11;
                break;
            case 25:
                fareStationTrip = 13;
                break;
            case 28:
                fareStationTrip = 14;
                break;
            case 31:
                fareStationTrip = 16;
                break;
            case 34:
                fareStationTrip = 17;
                break;
            case 37:
                fareStationTrip = 19;
                break;
            case 42:
                fareStationTrip = 21;
                break;
        }
    }

    
    // find the fare commuter has to pay per month if he uses normal ticket
    var fareStationTotal = fareStationTrip * numTripsDay * numDays;
    var fareStationLeftOver = fareStationTrip * ((numTripsDay * numDays) - numTripsLeftOver);
    var fareType, cardType = '', numTripsLoop = 0, numTimes50 = 1, numTimes40 = 1, numTimes25 = 1, numTimes15 = 1, numTimes0 = 1, numCheck = 1;


    // actual comparison
    
    // for Rabbit Type A > Rabbit Type B
    if (fareStationTotal > fareTripTotal) {
        
        if (multipleCards != 0) {
            cardType = multipleCards + '-' + multipleCardsValue + ' Trips Ticket (Rabbit Card Type B)';
        } else {
            
            for (; numTripsBeforeTotal > 0;) {
                if (numTripsBeforeTotal > 50) {
                    numTripsLoop = numTripsBeforeTotal - 50 > 0 ? 50 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 50) {
                        numTimes50++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes50 + '-';
                    } else {
                        numCheck = 50;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 50;
                } else if (numTripsBeforeTotal > 40) {
                    numTripsLoop = numTripsBeforeTotal - 40 > 0 ? 50 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 40) {
                        numTimes40++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes40 + '-';
                    } else if (numCheck == 50 && numTripsBeforeTotal- 50 == 0) {
                        numTimes50++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes50 + '-';
                        numCheck = 50;
                    } else {
                        numCheck = 40;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 50;
                } else if (numTripsBeforeTotal > 25) {
                    numTripsLoop = numTripsBeforeTotal - 25 > 0 ? 40 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 25) {
                        numTimes25++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes25 + '-';
                    } else if (numCheck == 40 && numTripsBeforeTotal- 40 == 0) {
                        numTimes40++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes40 + '-';
                        numCheck = 40;
                    } else {
                        numCheck = 25;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 40;
                } else if (numTripsBeforeTotal > 15) {
                    numTripsLoop = numTripsBeforeTotal - 15 > 0 ? 25 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 15) {
                        numTimes15++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes15 + '-';
                    } else if (numCheck == 25 && numTripsBeforeTotal- 25 == 0) {
                        numTimes25++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes25 + '-';
                        numCheck = 25;
                    } else {
                        numCheck = 15;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 25;
                } else {
                    numTripsLoop = numTripsBeforeTotal > 0 ? 15 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 0) {
                        numTimes0++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes0 + '-';
                    } else if (numCheck == 15 && numTripsBeforeTotal- 15 == 0) {
                        numTimes15++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes15 + '-';
                        numCheck = 15;
                    } else {
                        numCheck = 0;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 15;
                }
            }
        }
        fareType = fareTripTotal;
        
        
    // for Single Journey > Rabbit Type B
    
    } else if (fareStationTotal - 50 > fareTripTotal) {
        if (multipleCards != 0) {
            cardType = multipleCards + '-' + multipleCardsValue + ' Trips Ticket (Rabbit Card Type B)';
        } else {
            for (; numTripsBeforeTotal > 0;) {
                if (numTripsBeforeTotal > 50) {
                    numTripsLoop = numTripsBeforeTotal - 50 > 0 ? 50 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 50) {
                        numTimes50++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes50 + '-';
                    } else {
                        numCheck = 50;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 50;
                } else if (numTripsBeforeTotal > 40) {
                    numTripsLoop = numTripsBeforeTotal - 40 > 0 ? 50 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 40) {
                        numTimes40++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes40 + '-';
                    } else if (numCheck == 50 && numTripsBeforeTotal- 50 == 0) {
                        numTimes50++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes50 + '-';
                        numCheck = 50;
                    } else {
                        numCheck = 40;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 50;
                } else if (numTripsBeforeTotal > 25) {
                    numTripsLoop = numTripsBeforeTotal - 25 > 0 ? 40 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 25) {
                        numTimes25++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes25 + '-';
                    } else if (numCheck == 40 && numTripsBeforeTotal- 40 == 0) {
                        numTimes40++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes40 + '-';
                        numCheck = 40;
                    } else {
                        numCheck = 25;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 40;
                } else if (numTripsBeforeTotal > 15) {
                    numTripsLoop = numTripsBeforeTotal - 15 > 0 ? 25 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 15) {
                        numTimes15++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes15 + '-';
                    } else if (numCheck == 25 && numTripsBeforeTotal- 25 == 0) {
                        numTimes25++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes25 + '-';
                        numCheck = 25;
                    } else {
                        numCheck = 15;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 25;
                } else {
                    numTripsLoop = numTripsBeforeTotal > 0 ? 15 : 0;
                    if (cardType !== '') {
                        cardType += '<br>+<br>';
                    }
                    
                    if (numCheck == 0) {
                        numTimes0++;
                        cardType = cardType.substring(0, cardType.length - 1 - 44);
                        if (cardType.substr(cardType.length - 1, 1) === '-') {
                            cardType = cardType.substring(0, cardType.length - 1 - 2);
                        }
                        cardType += numTimes0 + '-';
                    } else if (numCheck == 15 && numTripsBeforeTotal- 15 == 0) {
                        numTimes15++;
                        cardType = cardType.substring(0, cardType.length - 1 - 46);
                        cardType += numTimes15 + '-';
                        numCheck = 15;
                    } else {
                        numCheck = 0;
                    }
                    cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                    numTripsBeforeTotal -= 15;
                }
            }
        }
        fareType = fareTripTotal - 50;
        
        
    // for Rabbit Type B > Rabbit Type A
        
    } else if (fareTripTotal > fareStationTotal) {
        if (fareStationTotal > fareTripBeforeTotal + fareStationLeftOver) {
            cardType = numTripsLeftOver + ' Trips Ticket (Rabbit Card Type B) + Single Journey Ticket<br><br></b>or<br><br><b>' + numTripsLeftOver + ' Trips + ' + fareStationLeftOver + ' Baht Hybrid Ticket (Rabbit Card Type A+B)';
        } else if (fareStationTotal == fareTripBeforeTotal + fareStationLeftOver) {
            cardType = numTripsLeftOver + ' Trips Ticket (Rabbit Card Type B) + Single Journey Ticket<br><br></b>or<br><br><b>Single Journey Ticket<br><br></b>or<br><br><b>' + fareStationLeftOver + ' Baht Stored Value Card (Rabbit Card Type A)<br><br></b>or<br><br><b>' + numTripsLeftOver + ' Trips + ' + fareStationLeftOver + ' Baht Hybrid Ticket (Rabbit Card Type A+B)';
        } else {
            cardType = 'Single Journey Ticket<br><br></b>or<br><br><b>' + fareStationTotal + ' Baht Stored Value Card (Rabbit Card Type A)';
        }
        fareType = fareStationTotal;
        
        
    // for Rabbit Type B > Single Journey
        
    } else if (fareTripTotal > fareStationTotal - 50) {
        if (fareStationTotal - 50 > fareTripBeforeTotal + fareStationLeftOver) {
            cardType = numTripsLeftOver + ' Trips Ticket (Rabbit Card Type B) + Single Journey Ticket<br><br></b>or<br><br><b>' + numTripsLeftOver + ' Trips + ' + fareStationLeftOver + ' Baht Hybrid Ticket (Rabbit Card Type A+B)';
        } else if (fareStationTotal - 50 == fareTripBeforeTotal + fareStationLeftOver) {
            cardType = numTripsLeftOver + ' Trips Ticket (Rabbit Card Type B) + Single Journey Ticket<br><br></b>or<br><br><b>Single Journey Ticket';
        } else {
            cardType = 'Single Journey Ticket';
        }
        fareType = fareStationTotal - 50;
    }
    
    if (fareType / numDays > 140) {
        cardType = 'One-Day Pass';
    }
    
    display(cardType);
}

/**
 *  Append the result of the calculation to the DOM.
 */

function display(cardType) {
    selectCtl.children().remove();
    selectCtl.append('<h3>The ticket type recommended is:</h3><h1><b>' + cardType + '</b></h1>');
}

