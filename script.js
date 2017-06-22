
(function(){

  var levels = [
    "Very Easy",
    "Easy",
    "Moderate",
    "Hard",
    "Very Hard"
  ];

  window.onload = function() {

    function showChart(tasks) {


      if (tasks.length == 0) {
        return;
      }
      var counts = [];


      for (var k=0; k<levels.length; k++){
        counts.push(0);
      }


      for (var i = 0; i < tasks.length; i++) {
        counts[tasks[i].level]++;
      }


      var rows = new Array();
      for (var j = 0; j < counts.length; j++) {

        rows.push( [levels[j], counts[j]] );
      }



      google.charts.load('current', {
        'packages': ['corechart']
      });


      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {


        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Difficulty');
        data.addColumn('number', 'Level');
        data.addRows(rows);

        // Set chart options
        var options = {
          'title': '% of Difficulty',
          'width': 400,
          'height': 300
        };

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }
    }



    function addTask(event) {
      event.preventDefault();
      console.log("Task added!")
      // get form values

      let form = document.forms[0];
      let task = form["task"].value;
      let assignTo = form["assignTo"].value;
      let level = form["level"].value;

      // add new item to tasks
      tasks.push({
        task: task,
        assignTo: assignTo,
        level: level
      });

      // update list
      showList();
      showChart(tasks);

      // reset form
      form.reset();
    }


    function showList() {
      // clear existing content
      let ul = document.querySelector('ul');
      ul.innerText = "";

      // go through each task
      for (var i = 0; i < tasks.length; i++) {
        // create list item and text
        var li = document.createElement("li");
        li.innerText = tasks[i].assignTo + " needs to do " + tasks[i].task+ " , which should be " + levels[tasks[i].level]
                        + " thing to do"

        // add the list item to the list
        ul.appendChild(li);
      }
    }


    // container for tasks
    let tasks = [];

    // wire up submit button
    let form = document.forms[0];
    form.addEventListener("submit", addTask);

  }

})();
