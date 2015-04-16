document.addEventListener("DOMContentLoaded", function(event) {
	document.getElementById("loadersign").style.display = "none";
	});

var colors = [
											['#fff', '#2980b9'], ['#fff', '#2980b9'], ['#fff', '#2980b9'], ['#fff', '#2980b9']
										];
									<!-- for (var i = 1; i <= 10; i++) { -->
									function makeSkillCircle(i){
										var child = document.getElementById('circles-' + i),
											percentage = i * 10;
											
										Circles.create({
											id:         child.id,
											percentage: percentage,
											radius:     80,
											width:      15,
											number:   	percentage,
											text:       '%',
											colors:     colors[i - 1]
										});
									}
							makeSkillCircle(10);
							makeSkillCircle(8);
							makeSkillCircle(6);
							makeSkillCircle(7);

// You can also use "$(window).load(function() {"
					    $(function () {
					      // Slideshow 4
					      $("#slider4").responsiveSlides({
					        auto: true,
					        pager: true,
					        nav: true,
					        speed: 500,
					        namespace: "callbacks",
					        before: function () {
					          $('.events').append("<li>before event fired.</li>");
					        },
					        after: function () {
					          $('.events').append("<li>after event fired.</li>");
					        }
					      });
					
					    });