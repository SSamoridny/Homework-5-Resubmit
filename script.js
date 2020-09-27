// Added date to the top of the page
var currentDate = moment().format("dddd, MMMM Do");
$("#currentDay").text(currentDate);

// Saved tasks local storage set up
var savedTasks = JSON.parse(localStorage.getItem(currentDate)) || [];
 
var showTasks = function () {

    for (var i=0; i < savedTasks.length; i++) { 
        $(".container").children().each(function() {
            if ($(this).find(".get-hour").text() === savedTasks[i].hour) {
                $(this).find(".task-text").val(savedTasks[i].text)
            }
        }  
    )}
    checkTasks();
};


$(".saveBtn").on("click", function() {
    var savedTasksArr = [];

    
    $(".container").children().each(function() {
    
        savedTasksArr.push({
          text: $(this)
            .find(".task-text")
            .val()
            .trim(),
          hour: $(this)
            .find(".get-hour")
            .text()
            .trim()
        })
    
    if (!(localStorage.getItem(currentDate))) {
        localStorage.setItem(currentDate, JSON.stringify(savedTasksArr));
    }
    else {
        localStorage.removeItem(currentDate);
        localStorage.setItem(currentDate, JSON.stringify(savedTasksArr));
        }
    });
})

var checkTasks = function () {
    var currentHour = moment().hours()
    $(".container").children().each(function() {
        var pageHour = $(this).find(".get-hour").text().trim();

        // grabs only the number
        var hour = parseInt(pageHour.split(" ")[0]);

        if (hour < 6) {
            hour = hour+12;
        }

        //remove any current classes
        $(this).find(".task-text").removeClass("present");
        $(this).find(".task-text").removeClass("future");
        $(this).find(".task-text").removeClass("past");


        if (hour === currentHour) {
            $(this).find(".task-text").addClass("present");
        } 
        
        else if (hour > currentHour) {
            $(this).find(".task-text").addClass("future");
        }
        else {
            $(this).find(".task-text").addClass("past");
        }
    })
};

setInterval(checkTasks, ((1000*60))*60);

showTasks();