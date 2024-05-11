(function ($) {
  "use strict";

  /*-------------------------------------
      Sidebar Toggle Menu
    -------------------------------------*/
  $('.sidebar-toggle-view').on('click', '.sidebar-nav-item .nav-link', function (e) {
    if (!$(this).parents('#wrapper').hasClass('sidebar-collapsed')) {
      var animationSpeed = 300,
        subMenuSelector = '.sub-group-menu',
        $this = $(this),
        checkElement = $this.next();
      if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
        });
        checkElement.parent(".sidebar-nav-item").removeClass("active");
      } else if ((checkElement.is(subMenuSelector)) && (!checkElement.is(':visible'))) {
        var parent = $this.parents('ul').first();
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        ul.removeClass('menu-open');
        var parent_li = $this.parent("li");
        checkElement.slideDown(animationSpeed, function () {
          checkElement.addClass('menu-open');
          parent.find('.sidebar-nav-item.active').removeClass('active');
          parent_li.addClass('active');
        });
      }
      if (checkElement.is(subMenuSelector)) {
        e.preventDefault();
      }
    } else {
      if ($(this).attr('href') === "#") {
        e.preventDefault();
      }
    }
  });

  /*-------------------------------------
      Sidebar Menu Control
    -------------------------------------*/
  $(".sidebar-toggle").on("click", function () {
    window.setTimeout(function () {
      $("#wrapper").toggleClass("sidebar-collapsed");
    }, 500);
  });

  /*-------------------------------------
      Sidebar Menu Control Mobile
    -------------------------------------*/
  $(".sidebar-toggle-mobile").on("click", function () {
    $("#wrapper").toggleClass("sidebar-collapsed-mobile");
    if ($("#wrapper").hasClass("sidebar-collapsed")) {
      $("#wrapper").removeClass("sidebar-collapsed");
    }
  });

  /*-------------------------------------
      jquery Scollup activation code
   -------------------------------------*/
  $.scrollUp({
    scrollText: '<i class="fa fa-angle-up"></i>',
    easingType: "linear",
    scrollSpeed: 900,
    animation: "fade"
  });

  /*-------------------------------------
      jquery Scollup activation code
    -------------------------------------*/
  $("#preloader").fadeOut("slow", function () {
    $(this).remove();
  });

  $(function () {
    /*-------------------------------------
          Data Table init
      -------------------------------------*/
    if ($.fn.DataTable !== undefined) {
      $('.data-table').DataTable({
        paging: true,
        searching: false,
        info: false,
        lengthChange: false,
        lengthMenu: [20, 50, 75, 100],
        columnDefs: [{
          targets: [0, -1], // column or columns numbers
          orderable: false // set orderable for selected columns
        }],
      });
    }

    /*-------------------------------------
          All Checkbox Checked
      -------------------------------------*/
    $(".checkAll").on("click", function () {
      $(this).parents('.table').find('input:checkbox').prop('checked', this.checked);
    });

    /*-------------------------------------
          Tooltip init
      -------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip();

    /*-------------------------------------
          Select 2 Init
      -------------------------------------*/
    if ($.fn.select2 !== undefined) {
      $('.select2').select2({
        width: '100%'
      });
    }

    /*-------------------------------------
          Date Picker
      -------------------------------------*/
    if ($.fn.datepicker !== undefined) {
      $('.air-datepicker').datepicker({
        language: {
          days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
          months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          today: 'Today',
          clear: 'Clear',
          dateFormat: 'dd/mm/yyyy',
          firstDay: 0
        }
      });
    }

    /*-------------------------------------
          Counter
      -------------------------------------*/
    var counterContainer = $(".counter");
    if (counterContainer.length) {
      counterContainer.counterUp({
        delay: 50,
        time: 1000
      });
    }

    /*-------------------------------------
          Vector Map 
      -------------------------------------*/
    if ($.fn.vectorMap !== undefined) {
      $('#world-map').vectorMap({
        map: 'world_mill',
        zoomButtons: false,
        backgroundColor: 'transparent',

        regionStyle: {
          initial: {
            fill: '#0070ba'
          }
        },
        focusOn: {
          x: 0,
          y: 0,
          scale: 1
        },
        series: {
          regions: [{
            values: {
              CA: '#41dfce',
              RU: '#f50056',
              US: '#f50056',
              IT: '#f50056',
              AU: '#fbd348'
            }
          }]
        }
      });
    }

    /*-------------------------------------
          Line Chart 
      -------------------------------------*/
      let myArray = [];
      if ($("#earning-line-chart").length) {

        
        function top5CoursesNames() {
          fetch('http://localhost:8080/api/getTopEnrolledCourses',{
              
              headers: {
                  'Content-Type': 'application/json', // Example: Sending JSON data
                  'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
                  // Add any other custom headers as needed
                }
          })
              .then(response => response.json())
              
              .then(data => {
                myArray = data.slice(0, 5);
                 
                // Update barChartData.labels with fetched data
                barChartData.labels = myArray;


                // Refresh the chart
                earningChart.update();
              })
              
              .catch(error => {
                  console.error('Error fetching data: ' + error);
              });
      }
      top5CoursesNames();

      function top5CoursesCount() {
        fetch('http://localhost:8080/api/enrollment/count',{
            
            headers: {
                'Content-Type': 'application/json', // Example: Sending JSON data
                'Authorization': `Bearer ${getToken}`, // Example: Sending an authorization token
                // Add any other custom headers as needed
              }
        })
            .then(response => response.json())
            
            .then(data => {
              const top5Courses = data.slice(0, 5);
               // Update barChartData.datasets[0].data with the counts of the first 5 courses
              barChartData.datasets[0].data = top5Courses.map(course => course.count);
               
              // Refresh the chart
               earningChart.update();
            })
            
            .catch(error => {
                console.error('Error fetching data: ' + error);
            });
    }
    top5CoursesCount();
      
      
        var barChartData = {
          // labels: ["AI", "Cyber Security", "Data Science", "Digital Marketing", "Web-Develop"],
          labels:[],
          datasets: [
            {
              label: "Top Courses",
              data: [1000, 500, 200, 100, 50],
              backgroundColor: '#417dfc', // Color for Fees Collection
              borderColor: '#417dfc', // Optional border color for bars
              borderWidth: 1
            }
          ]
        };
      
        var barChartOptions = {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 4000
          },
          scales: {
            xAxes: [{
              display: true,
              ticks: {
                fontColor: "#222222",
                fontSize: 16,
                padding: 20
              },
              gridLines: {
                display: true,
                drawBorder: true,
                color: 'blue',
                borderDash: [5, 5]
              }
            }],
            yAxes: [{
              display: true,
              ticks: {
                fontColor: "#646464",
                fontSize: 16,
                stepSize: 100, // Set the step size based on your data
                padding: 20
              },
              gridLines: {
                display: true,
                drawBorder: false,
                color: '#cccccc',
                borderDash: [5, 5],
                zeroLineBorderDash: [5, 5],
              }
            }]
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: true
          }
        };
      
        var earningCanvas = $("#earning-line-chart").get(0).getContext("2d");
        var earningChart = new Chart(earningCanvas, {
          type: 'bar', // Change type from 'line' to 'bar'
          data: barChartData,
          options: barChartOptions
        });
      }

    /*-------------------------------------
          Bar Chart 
      -------------------------------------*/
    if ($("#expense-bar-chart").length) {

      var barChartData = {
        labels: ["Jan", "Feb", "Mar"],
        datasets: [{
          backgroundColor: ["#40dfcd", "#417dfc", "#ffaa01"],
          data: [125000, 100000, 75000, 50000, 150000],
          label: "Expenses (millions)"
        }, ]
      };
      var barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 2000
        },
        scales: {

          xAxes: [{
            display: false,
            maxBarThickness: 100,
            ticks: {
              display: false,
              padding: 0,
              fontColor: "#646464",
              fontSize: 14,
            },
            gridLines: {
              display: true,
              color: '#e1e1e1',
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              display: true,
              autoSkip: false,
              fontColor: "#646464",
              fontSize: 14,
              stepSize: 25000,
              padding: 20,
              beginAtZero: true,
              callback: function (value) {
                var ranges = [{
                    divider: 1e6,
                    suffix: 'M'
                  },
                  {
                    divider: 1e3,
                    suffix: 'k'
                  }
                ];

                function formatNumber(n) {
                  for (var i = 0; i < ranges.length; i++) {
                    if (n >= ranges[i].divider) {
                      return (n / ranges[i].divider).toString() + ranges[i].suffix;
                    }
                  }
                  return n;
                }
                return formatNumber(value);
              }
            },
            gridLines: {
              display: true,
              drawBorder: true,
              color: '#e1e1e1',
              zeroLineColor: '#e1e1e1'

            }
          }]
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        },
        elements: {}
      };
      var expenseCanvas = $("#expense-bar-chart").get(0).getContext("2d");
      var expenseChart = new Chart(expenseCanvas, {
        type: 'bar',
        data: barChartData,
        options: barChartOptions
      });
    }

    /*-------------------------------------
          Doughnut Chart 
      -------------------------------------*/
    if ($("#student-doughnut-chart").length) {

      var doughnutChartData = {
        labels: ["Female Students", "Male Students"],
        datasets: [{
          backgroundColor: ["#304ffe", "#ffa601"],
          data: [45000, 105000],
          label: "Total Students"
        }, ]
      };
      var doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 65,
        rotation: -9.4,
        animation: {
          duration: 4000
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
      };
      var studentCanvas = $("#student-doughnut-chart").get(0).getContext("2d");
      var studentChart = new Chart(studentCanvas, {
        type: 'doughnut',
        data: doughnutChartData,
        options: doughnutChartOptions
      });
    }

    /*-------------------------------------
          Calender initiate 
      -------------------------------------*/
    if ($.fn.fullCalendar !== undefined) {
      $('#fc-calender').fullCalendar({
        header: {
          center: 'basicDay,basicWeek,month',
          left: 'title',
          right: 'prev,next',
        },
        fixedWeekCount: false,
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        aspectRatio: 1.8,
        events: [{
            title: 'All Day Event',
            start: '2024-01-01'
          },

          {
            title: 'Meeting',
            start: '2019-04-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2019-04-15T17:30:00'
          },
          {
            title: 'Birthday Party',
            start: '2019-04-20T07:00:00'
          }
        ]
      });
    }
  });

})(jQuery);