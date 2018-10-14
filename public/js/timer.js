paired_data = [];
var but2 = document.getElementById("timer-button-2")//button 2
var but3 = document.getElementById("timer-button-3")// button 3
//Loads assigment data
function refresh_data () {
  
    /*if(localStorage.getItem("data")!= null){
      data = localStorage.getItem("data");
      data = JSON.parse(data);//make data readable
      for (var i=0; i<data.assignments.length; i++) {
        if(data.assignments[i]+""==""){

        }else{
        paired_data.push({
          assignment : data.assignments[i],
          days_till_due : data.days_till_due[i]//retrieve data
        });
      }
    }*/

      //bubble sort
      sorted_status = false;

      while (sorted_status==false) {
        sorted_status = true;
        for (var i=0; i<paired_data.length; i++) {
          if (i+1!==paired_data.length) {
            if (paired_data[i].days_till_due>paired_data[i+1].days_till_due) {
              var d1 = paired_data[i];
              var d2 = paired_data[i+1];
              paired_data[i] = d2;
              paired_data[i+1] = d1;
              sorted_status = false;
            }
          }
        }
      }
    }
};
//clearing all data
function cleardata(){
  //paired_data = [];
  localStorage.clear();
  return 0;
}
//list assignments on console
function listassign(){
  console.log(paired_data);
}
loadInputInfo();
//Functions
//var paused = false;
//conversion between seconds and minutes
  function second_minute(i){
      var x = i;
      var y = 0;
    while(x>=60){
        x-= 60;
        y++;
    }
    return([y,x]);
  }
  function timezeros(time){
    var output = "";
    if(time<10){
      output = "0"+ time;
    }else{
      output = time;
    }
    return(output);
  };
function displaytime(t, pause = false){
  var time = second_minute(t);
  var minute = timezeros(time[0]);
  var second = timezeros(time[1]);
  var asdf = "";
  if(pause){asdf = "[PAUSED]"}
  timer.innerHTML = asdf+""+minute + " : " + second;
}
function displayassignment(input){
    timer_assignment.innerHTML = "'" + input + "'";
}
var testing = false;
var state = "init"
var time = 10;
var worktime = 25*60
var resttime = 5*60
if(testing){worktime = 5; resttime = 5;}
function init(){
}



function loop(){
  switch(state){
    case "init":
    but2.innerHTML = "Start";
    but3.style.visibility = "hidden";
    break;

    case "running":
    displaytime(time);
    displayassignment(paired_data[0].assignment);
    if(time<0){state = "endofwork"}
    time--;
    but2.innerHTML = "Pause"
    break;

    case "paused":
    displaytime(time,true);
    displayassignment(paired_data[0].assignment);
    but2.innerHTML = "Play"
    break;

    case "endofwork":
    but2.innerHTML = "Not Done";
    but3.innterHTML = "Done";
    but3.style.visibility = "initial";
    timer_assignment.innerHTML = "Done?"
    displaytime(0);
    break;

    case "break":
    but2.innerHTML = "Pause";
    but3.style.visibility = "hidden";
    timer_assignment.innerHTML = "Break";
    displaytime(time);
    time--;
    if(time<0){state = "endofbreak"}
    break;

    case "pausebreak":
    but2.innerHTML = "Play";
    timer_assignment.innerHTML = "Break";
    displaytime(time,true);
    break;

    case "endofbreak":
    state = "waiting"
    break;

    case "waiting":
    but2.innerHTML = "Start";
    displayassignment(paired_data[0].assignment);
    timer.innerHTML = "Ready?";
    break;
  }

  if(state === "endofwork"){displaytime(0);}
}


function button2(){
  switch(state){
    case "init":
    state = "running";
    time = worktime;
    break;
    case "running":
    state = "paused";
    break;
    case "paused":
    state = "running";
    break;
    case "endofwork":
    state = "break";
    time = resttime;
    break;
    case "break":
    state = "pausebreak";
    break;
    case "pausebreak":
    state = "break";
    break;
    case "waiting":
    state = "running";
    time = worktime;
    break;
  }
}

function button3(){
  state = "break";
}

function main_loop(){setInterval(loop,1000);}
window.onLoad = main_loop();
but2.addEventListener("click", button2);

but3.addEventListener("click", button3);
