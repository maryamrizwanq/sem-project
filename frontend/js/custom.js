/******************************************
    File Name: custom.js
/****************************************** */

(function($) {
    "use strict";

    /* ==============================================
    AFFIX
    =============================================== */
    $('.megamenu').affix({
        offset: {
            top: 0,
            bottom: function() {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    })

    /* ==============================================
    BACK TOP
    =============================================== */
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > 1) {
            jQuery('.dmtop').css({
                bottom: "75px"
            });
        } else {
            jQuery('.dmtop').css({
                bottom: "-100px"
            });
        }
    });

    /* ==============================================
       LOADER -->
        =============================================== */

    $(window).load(function() {
        $("#preloader").on(500).fadeOut();
        $(".preloader").on(600).fadeOut("slow");
    });

    /* ==============================================
     FUN FACTS -->
     =============================================== */

    function count($this) {
        var current = parseInt($this.html(), 10);
        current = current + 50; /* Where 50 is increment */
        $this.html(++current);
        if (current > $this.data('count')) {
            $this.html($this.data('count'));
        } else {
            setTimeout(function() {
                count($this)
            }, 30);
        }
    }
    $(".stat_count, .stat_count_download").each(function() {
        $(this).data('count', parseInt($(this).html(), 10));
        $(this).html('0');
        count($(this));
    });

    /* ==============================================
     TOOLTIP -->
     =============================================== */
    $('[data-toggle="tooltip"]').tooltip()
    $('[data-toggle="popover"]').popover()

    /* ==============================================
     CONTACT -->
     =============================================== */
    jQuery(document).ready(function() {
        $('#contactform').submit(function() {
            var action = $(this).attr('action');
            $("#message").slideUp(750, function() {
                $('#message').hide();
                $('#submit')
                    .after('<img src="images/ajax-loader.gif" class="loader" />')
                    .attr('disabled', 'disabled');
                $.post(action, {
                        first_name: $('#first_name').val(),
                        last_name: $('#last_name').val(),
                        email: $('#email').val(),
                        phone: $('#phone').val(),
                        select_service: $('#select_service').val(),
                        select_price: $('#select_price').val(),
                        comments: $('#comments').val(),
                        verify: $('#verify').val()
                    },
                    function(data) {
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#contactform img.loader').fadeOut('slow', function() {
                            $(this).remove()
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') != null) $('#contactform').slideUp('slow');
                    }
                );
            });
            return false;
        });
    });

    /* ==============================================
     Book appointment -->
     =============================================== */
    jQuery(document).ready(function() {
        $('#appForm').submit(function() {
            var action = $(this).attr('action');
            $.post(baseUrl_ + action, {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    appointment_day: $('#appointment_day').val(),
                    appointment_time: $('#appointment_time').val(),
                    patient_message: $('#textarea_message').val(),
                    doc_id: $('#docList').val()
                },
                function(data) {
                    alert(data.info);
                    window.location.href = "index.html";
                }
            );
            return false;
        });
    });

    /* ==============================================
     Get working hours and doctors list-->
     =============================================== */
     jQuery(document).ready(function() {
        $.ajax({url: baseUrl_ + 'workinghours', success: function(result){
            $("#timing1").html(`<span class="left">${result.workHours[0].day}</span><span class="right">${result.workHours[0].time}</span>`);
            $("#timing2").html(`<span class="left">${result.workHours[1].day}</span><span class="right">${result.workHours[1].time}</span>`);
            $("#timing3").html(`<span class="left">${result.workHours[2].day}</span><span class="right">${result.workHours[2].time}</span>`);
        }});

        $.ajax({url: baseUrl_ + 'doctor', success: function(result){
            let ddList = result.list, docListHtml = '<option>Doctor Name</option>';
            for (let i = 0; i < ddList.length && i < 3; i++) {
                $(`#doc${i}`).html(`
                    <img src="images/${ddList[i].pictureName}.jpg" alt="" class="img-responsive img-rounded">
                    <div class="widget-title">
                        <h3>${ddList[i].name}</h3>
                        <small>${ddList[i].designation}</small>
                    </div>
                    <!-- end title -->
                    <p>${ddList[i].desc}</p>

                    <div class="footer-social">
                        <a href="${ddList[i].fbLink}" class="btn grd1"><i class="fa fa-facebook"></i></a>
                        <a href="${ddList[i].twitterLink}" class="btn grd1"><i class="fa fa-twitter"></i></a>
                        <a href="${ddList[i].linkedInLink}" class="btn grd1"><i class="fa fa-linkedin"></i></a>
                    </div>
                `);                
            }

            ddList.forEach(element => {
                docListHtml += `<option value="${element.id}">${element.name}</option>`;
            });

            $("#docList").html(docListHtml);
        }});
    });

    /* ==============================================
     CODE WRAPPER -->
     =============================================== */

    $('.code-wrapper').on("mousemove", function(e) {
        var offsets = $(this).offset();
        var fullWidth = $(this).width();
        var mouseX = e.pageX - offsets.left;

        if (mouseX < 0) {
            mouseX = 0;
        } else if (mouseX > fullWidth) {
            mouseX = fullWidth
        }

        $(this).parent().find('.divider-bar').css({
            left: mouseX,
            transition: 'none'
        });
        $(this).find('.design-wrapper').css({
            transform: 'translateX(' + (mouseX) + 'px)',
            transition: 'none'
        });
        $(this).find('.design-image').css({
            transform: 'translateX(' + (-1 * mouseX) + 'px)',
            transition: 'none'
        });
    });
    $('.divider-wrapper').on("mouseleave", function() {
        $(this).parent().find('.divider-bar').css({
            left: '50%',
            transition: 'all .3s'
        });
        $(this).find('.design-wrapper').css({
            transform: 'translateX(50%)',
            transition: 'all .3s'
        });
        $(this).find('.design-image').css({
            transform: 'translateX(-50%)',
            transition: 'all .3s'
        });
    });

})(jQuery);

/*= text auto writer ==*/
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

/*== map js ==*/

    function myMap() {
        var mapProp= {
            center:new google.maps.LatLng(51.508742,-0.120850),
            zoom:5,
        };
        var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
    }
	
/*== map js ==*/	