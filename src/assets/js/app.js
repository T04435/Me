$(document).foundation();

const tthUser = 'fideltorres';
const tthDataURL = `https://teamtreehouse.com/${tthUser}.json`;


$(document).ready(function () {
  $.getJSON(tthDataURL, function (res) {
    let badgesHTML = '<div class="row align-bottom">';
    // let colWidth = $(window).width() > 1024 ? '3' : '4';
    $.each(res, function (key, value) {
      if (key === 'points') {
        $.each(value, function (topic, points) {
          if (points > 1500 && topic !== 'total') {
            badgesHTML += `
              <div class="small-3 columns tth__badged">
                <div class="tth__badged--title">
                  <h5>${topic}</h5>
                </div>
                <div class="tth__badged--image">
                  <img src="./assets/img/badges/${topic.split(' ').join('_').toLowerCase()}.png" alt="Team Tree House ${topic} Badged"/>
                </div>
                <div class="tth__badged--value">
                  <p>${points} pts</p>
                </div>
              </div>`
          }
        }); // end each on value
      }
    }); // end each on res
    badgesHTML+= '</div>';
    $('#addTTHData').html(badgesHTML);
  })
    .fail(function () {
      $('#addTTHData').html('<h6> Please check Profile name</h6>');
    }); // end getJSON
}); // end ready

