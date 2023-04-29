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
