var selectCtl = $('#control');
var numDays = 0, numTrips = 0, numStations = 0;
var studentFare = false, seniorFare = false;

$(function() {
    
    $('#btnTraveler').click(func_travelerNumDays);
    
    $('#div-commuter :not(#btnTraveler)').click(function() {
        $('#control *').remove();
        selectCtl.append('<h1>Coming soon...</h1>');
    });
});



/**
 *  Appends a control asking the how many days a traveller will stay.
 *  Returns the number of days to calculate.
 */
 
function func_travelerNumDays () {
    
    $('#control *').remove();
    
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
            alert('Please enter a number of value higher than 0 and try again.');
            return false;
        } else if (numDaysval > 30) {
            alert('We do not currently support planning for duration exceeding a month, sir. Please try again.');
            return false;
        } else {
            numDays = numDaysval;
            func_numTrips('On average, how many BTS trips do you plan to take per day?');
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
        func_numTrips('On average, how many BTS trips do you plan to take per day?');
    });

}



/**
 *  Appends a control asking the number of trips one usually travels.
 *  Returns the number of trips to calculate.
 */

function func_numTrips(header) {
    $('#control *').remove();
    
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
            alert('Please enter a number of value higher than 0 and try again.');
            return false;
        } else {
            numTrips = numTripsval;
            func_numStations('On average, how many stations do you plan to commute per trip?');
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
        func_numStations('On average, how many stations do you plan to commute per trip?');
    });
}



/**
 *  Appends a control asking the number of stations one usually travels.
 *  Returns the number of stations to calculate.
 */

function func_numStations(header) {
    $('#control *').remove();
    
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

function calculate() {
    
    var numTripsDay = numTrips;
    numTrips *= numDays;
    var numTotalStations = numStations * numTrips;
    var fareTripTotal = 0, fareTripBeforeTotal = 0, numTripsBeforeTotal = 0, numTripsLeftOver = 0;

    // each loop is for finding out the prices of the total number of trips.
    // included in the loop are several variables for different functionalities, including:
    
    // numTripsBeforeTotal: holds value of the total number of trips (cuz numTrips is being reduced in each iteration).
    // numTripsLeftOver: holds value of the next lower number of total trips, for multiple tickets functionality.
    
    if (studentFare == false) {
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
                fareTripBeforeTotal += numTrips - 40 > 0 ? 1250 : 0;
                fareTripTotal += 1250;
                numTrips -= 50;
            } else if (numTrips > 25) {
                numTripsBeforeTotal += 40;
                numTripsLeftOver += 25;
                fareTripBeforeTotal += numTrips - 25 > 0 ? 1040 : 0;
                fareTripTotal += 1040;
                numTrips -= 40;
            } else if (numTrips > 15) {
                numTripsBeforeTotal += 25;
                numTripsLeftOver += 15;
                fareTripBeforeTotal += numTrips - 15 > 0 ? 700 : 0;
                fareTripTotal += 700;
                numTrips-= 25;
            } else {
                numTripsBeforeTotal += 15;
                numTripsLeftOver += numTrips;
                fareTripBeforeTotal += numTrips > 0 ? 450 : 0;
                fareTripTotal += 450;
                numTrips -= 15;
            }
        }
    } else {
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
                fareTripBeforeTotal += numTrips - 40 > 0 ? 900 : 0;
                fareTripTotal += 900;
                numTrips -= 50;
            } else if (numTrips > 25) {
                numTripsBeforeTotal += 40;
                numTripsLeftOver += 25;
                fareTripBeforeTotal += numTrips - 25 > 0 ? 760 : 0;
                fareTripTotal += 760;
                numTrips -= 40;
            } else if (numTrips > 15) {
                numTripsBeforeTotal += 25;
                numTripsLeftOver += 15;
                fareTripBeforeTotal += numTrips - 15 > 0 ? 525 : 0;
                fareTripTotal += 525;
                numTrips -= 25;
            } else {
                numTripsBeforeTotal += 15;
                numTripsLeftOver += numTrips;
                fareTripBeforeTotal += numTrips > 0 ? 345 : 0;
                fareTripTotal += 345;
                numTrips -= 15;
            }
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
    
    // find the fare commuter has to pay per month if he uses normal ticket
    var fareStationTotal = fareStationTrip * numTripsDay * numDays;
    var fareStationLeftOver = fareStationTrip * (numTripsBeforeTotal - numTripsLeftOver);
    var fareType, cardType = '', numTripsLoop = 0, numTimes50 = 1, numTimes40 = 1, numTimes25 = 1, numTimes15 = 1, numTimes0 = 1, numCheck = 1;

    if (fareStationTotal > fareTripTotal) {
        for (; numTripsBeforeTotal > 0;) {
            if (numTripsBeforeTotal > 50) {
                numTripsLoop = numTripsBeforeTotal - 50 > 0 ? 50 : 0;
                if (cardType !== '') {
                    cardType += '<br>+<br>';
                }
                
                if (numCheck == 50) {
                    numTimes50++;
                    cardType = cardType.substring(0, cardType.length - 1 - 44);
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
                    cardType += numTimes40 + '-';
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
                    cardType += numTimes25 + '-';
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
                    cardType += numTimes15 + '-';
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
                    cardType += numTimes0 + '-';
                } else {
                    numCheck = 0;
                }
                cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                numTripsBeforeTotal -= 15;
            }
        }
        fareType = fareTripTotal;
    } else if (fareStationTotal - 50 > fareTripTotal) {
        for (; numTripsBeforeTotal > 0;) {
            if (numTripsBeforeTotal > 50) {
                numTripsLoop = numTripsBeforeTotal - 50 > 0 ? 50 : 0;
                if (cardType !== '') {
                    cardType += '<br>+<br>';
                }
                
                if (numCheck == 50) {
                    numTimes50++;
                    cardType = cardType.substring(0, cardType.length - 1 - 44);
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
                    cardType += numTimes40 + '-';
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
                    cardType += numTimes25 + '-';
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
                    cardType += numTimes15 + '-';
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
                    cardType += numTimes0 + '-';
                } else {
                    numCheck = 0;
                }
                cardType += numTripsLoop + ' Trips Ticket (Rabbit Card Type B)';
                numTripsBeforeTotal -= 25;
            }
        }
        fareType = fareTripTotal - 50;
    } else if (fareTripTotal > fareStationTotal - 50) {
        if (fareStationTotal - 50 > fareTripBeforeTotal + fareStationLeftOver) {
            cardType = numTripsBeforeTotal + ' Trips Ticket (Rabbit Card Type B)<br>+<br>Single Journey Ticket';
        } else {
            cardType = 'Single Journey Ticket';
        }
        fareType = fareStationTotal - 50;
    } else if (fareTripTotal > fareStationTotal) {
        if (fareStationTotal > fareTripBeforeTotal + fareStationLeftOver) {
            cardType = numTripsBeforeTotal + ' Trips Ticket (Rabbit Card Type B)<br>+<br>Single Journey Ticket';
        } else {
            cardType = 'Single Journey Ticket or Stored Value Card (Rabbit Card Type A)';
        }
        fareType = fareStationTotal;
    }
    
    if (fareType / numDays > 140) {
        cardType = 'One-Day Pass';
    }
    
    display(cardType);
}

function display(cardType) {
    $('#control *').remove();
    selectCtl.append('<h3>The ticket type recommended is:</h3><h1><b>' + cardType + '</b></h1>');
}

