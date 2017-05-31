$(document).foundation();

const tthUser = 'fideltorres';
const tthDataURL = `https://teamtreehouse.com/${tthUser}.json`;
/**
 * badge HTML template
 * <div class="small-4 columns tth__badged">
 *   <div class="tth__badged--image"></div>// add BG image based on topic URL ./assets/img/badges/TOPIC.png
 *   <div class="tth__badged--value">
 *     <p>VALUE</p>// add value
 *   </div>
 *   <div class="tth__badged--title">
 *     <h5>TOPIC</h5>// ADD TOPIC
 *   </div>
 * </div>
 */

$(document).ready(function () {
  $.getJSON(tthDataURL, function (res) {
    let badgesHTML = '<div class="row align-bottom">';
    let colWidth = $(window).width() > 1024 ? '3' : '4';
    $.each(res, function (key, value) {
      if (key === 'points') {
        $.each(value, function (topic, points) {
          if (points > 1500 && topic !== 'total') {
            badgesHTML += `
              <div class="small-${colWidth} columns tth__badged">
                <div class="tth__badged--title">
                  <h5>${topic}</h5>
                </div>
                <div class="tth__badged--image" style="background-image: url('./assets/img/badges/${topic.split(' ').join('_').toLowerCase()}.png')"></div>
                <div class="tth__badged--value">
                  <p>${points} XP</p>
                </div>
              </div>`
          }
        }); // end each on value
      }
    }); // end each on res
    badgesHTML+= '</div>';
    $('#addTTHData').html(badgesHTML);
  }); // end getJSON
}); // end ready
