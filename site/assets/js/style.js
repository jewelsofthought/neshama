// http://belowthebenthic.com/bulma-burger/
new Vue({
  el: '#navbar-vue-app',
  data: {
    isOpen: false,
  },
})

// toggle function
function showhide(toggleID) {
  var toggleNote = document.getElementById(toggleID)
  if (toggleNote.style.display != 'none') {
    toggleNote.style.display = 'none'
  } else {
    toggleNote.style.display = 'block'
  }
}

// To use:
// Javascript to set active tab
// And a bit of javascript to set current tab

/****
const Tabs = document.querySelectorAll("[data-tab]");
const FirstLocation = "contacts";

window.location.hash = FirstLocation;

Tabs.forEach((element) => {
  element.addEventListener("click", (event) => {
    let selectedTab = event.currentTarget;
    updateActiveTab(selectedTab);
  });
});

let updateActiveTab = (newActiveTab) => {
  Tabs.forEach((tab) => {
    tab.classList.remove("is-active");
  });
  
  newActiveTab.classList.add("is-active");
};
****/

// Limited: Only works for 1 case per page.
// KISS: Just paste in actual command to take place @onclick.
// function popFunction() {
//   var popup = document.getElementById('popID1')
//   popup.classList.toggle('show')
// }

// Couldn't get this to work
// Error: popID.slice undefined.
// function popFunction(popID) {
//   var popIDx = popID.slice(7, 13)
//   var popup = document.getElementById(popIDx)
//   popup.classList.toggle('show')
// }

/****
$(window).scroll(function () {
  if ($(window).scrollTop() > 75) {
    $('#navbar-vue-app').css('opacity', 0.3)
  } else {
    $('#navbar-vue-app').css('opacity', 1)
  }
})

$(document).ready(function () {
  $('#navbar-vue-app').live('mouseover', function () {
    $(this).css('opacity', 1)
  })

  $('#navbar-vue-app').live('mouseleave', function () {
    if ($(window).scrollTop() > 75) {
      // this here
      $(this).css('opacity', 0.3)
    }
  })
})
****/
