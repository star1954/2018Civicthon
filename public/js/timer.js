paired_data = [];
var but2 = document.getElementById("timer-button-2")//button 2
var but3 = document.getElementById("timer-button-3")// button 3
//Loads assigment data
function refresh_data () {
    if(localStorage.getItem("data")!= null){
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
      }
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
var paused = false;
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

function displaytime(t){
  var time = second_minute(t);
  var minute = timezeros(time[0]);
  var second = timezeros(time[1]);
  timer.innerHTML = minute + " : " + second;
}
function displayassignment(input){
    assignment_display.innerHTML = "'" + input + "'";
}

var state = "init"
var time = 10;

function loop(){
  displaytime(time)
  displayassignment(paired_data[0].assignment)
}


function button2(){

}

function button3(){

}

but2.addEventListener("click", button2);

but3.addEventListener("click", button3);
