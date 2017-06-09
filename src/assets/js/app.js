$(document).foundation();

const tthUser = 'fideltorres';
const tthDataURL = `https://teamtreehouse.com/${tthUser}.json`;
const zapierHook = 'https://hooks.zapier.com/hooks/catch/2296246/9fg041/';

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
                  <p>${points}</p>
                </div>
              </div>`
          }
        }); // end each on value
      }
    }); // end each on res
    badgesHTML += '</div>';
    $('#addTTHData').html(badgesHTML);
  })
    .fail(function () {
      $('#addTTHData').html('<h6> Please check Profile name</h6>');
    }); // end getJSON


}); // end ready

$(document).ready(function () {//ES6 code for demonstrations proposes

//get all work__item elements
  const portfolioItems = document.querySelectorAll('#portfolio .work__item');
//get their 'data-tag' attr value into array
  let tagsAll = [];
  for (const item of portfolioItems) {// iterate over each item
    for (const tag of item.getAttribute('data-tag').split(' ')) {// iterate over each tag attr
      tagsAll.push(tag);
    }
  }
//clean array from duplicates
  const tags = Array.from(new Set(tagsAll));
//add new tags to #tags
  const tagFilter = document.querySelector('#tags');
  let tagsHTML = `<span class="selected">all</span>`;
  for (const newTag of tags.sort()) {
    tagsHTML += `<span>${newTag}</span>`;
  }
  tagFilter.innerHTML = tagsHTML;
  // filter the portfolio
  tagFilter.addEventListener('click', (event) => {
    filterPortfolio(event.target);
  });
});

const filterPortfolio = filter => {
  const myWork = document.querySelectorAll('#portfolio .work__item');

  // remove class selected [only one item will be .selected at any time]
  for (const item of filter.parentNode.childNodes) {
    if (item.classList.contains('selected')) {
      item.classList.remove('selected');
      break;
    }
  }
  // add selected to filter
  filter.classList.add('selected');

  for (const workItem of myWork) {
    let hasTag = false;
    for (const tag of workItem.getAttribute('data-tag').split(' ')) {// iterate over each tag attr
      if (tag == filter.innerHTML || filter.innerHTML == 'all') {
        hasTag = true;
        Foundation.Motion.animateIn(workItem, 'scale-in-up');
      }
    }
    if (!hasTag) {
      Foundation.Motion.animateOut(workItem, 'scale-out-down');
    }
  }
}