const swiper = new Swiper(".swiper", {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false
    }
});
let todaysMenuTopTimer;

async function main () {
    $(".footer-page-top").click(() => {
        $("html,body").animate({ scrollTop: 0 }, 500);
    });

    $(window).resize(()=>{
        clearTimeout(todaysMenuTopTimer);
        todaysMenuTopTimer = setTimeout(()=>{
            todaysMenuTop();
        }, 50);
    });
    todaysMenuTop();

    $(window).scroll(() => {
        let height = $(window).height();
        let scrollTop = $(window).scrollTop();
        
        $(".salute img").each((index, element) => {
            let salute = $(element);
            let position = salute.offset().top - height;

            let attr = salute.attr("src");
            attr = attr.split(".");
            attr.splice(-1);
            attr = attr.join(".");

            if (scrollTop > position + 150) {
                if (salute.hasClass('active')) {
                } else {
                    attr += ".gif?" + new Date().getTime();
                    salute.attr("src", attr);
                    salute.addClass('active');
                }
            } else if ($(window).scrollTop() <= position) {
                if (salute.hasClass('active')) {
                    attr += ".png";
                    salute.attr("src", attr);
                    salute.removeClass("active");
                }
            }
        });

        $(".is-hidden").each((index, element) => {
            let content = $(element);
            let position = content.offset().top - height;
            if (scrollTop > position + 150) {
                content.addClass("is-fadein");
            }
        });
    
    });

    setTimeout(() => {
        let today = new Date();
        let textDate = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
        let title = "ミスチルナイト";
        let detail = "12月18日（日）はミスチルナイトを開催します。<br>月に一度の恒例行事。<br>どこよりも熱い夜を過ごしませんか？";
        $("#new-informaition-date").text(textDate);
        $("#new-informaition-title").text(title);
        $("#new-informaition-detail").html(detail);
        $("#new-informaition-link").attr("title", title);
        
        $(".new-informaition-spinner").addClass("d-none");
        $(".new-informaition-wrapper").removeClass("d-none");
    }, 500);

    setTimeout(() => {
        let today = new Date();
        let textDate = today.getFullYear() + "年" + (today.getMonth() + 1) + "月" + today.getDate() + "日";
        let menu = "きのこのクリームパスタ";

        $("#new-todaysmenu-date").text(textDate);
        $("#new-todaysmenu-menu").text(menu);

        $(".new-todaysmenu-spinner").addClass("d-none");
        $(".new-todaysmenu-wrapper").removeClass("d-none"); 
    }, 600);
}

$(document).ready(function(){
    let sliders = $(".swiper-slide");
    sliders.each((index, element) => {
        let image = $(element).css("background-image");
        image = image.replace('")', '?' + new Date().getTime() + `")`);
        $(element).css("background-image", image);
    });
    $(".swiper-pagination-bullet").each((index, element) => {
        let image = $(sliders[index+1]).css("background-image");
        $(element).css("background-image", image);
    });

    main();
    // if ($(window).scrollTop() > 0) {
    //     $("html,body").scrollTop(0);
    //     $(window).on("scroll", () => {
    //         if ($(window).scrollTop() <= 0) {
    //             $(window).off("scroll");
    //             main();
    //         }
    //     });
    // } else {
    //     main();
    // }
});

async function todaysMenuTop () {
    let swiperContainer = $(".swiper-container");
    let newTodaysMenu = $(".new-todaysmenu");
    let mainVisual = $(".main-visual");
    const mediaQuery = window.matchMedia('screen and (max-width: 768px)');
    if (mediaQuery.matches) {
        newTodaysMenu.css({top: ""});
        mainVisual.css({height: ""});
    } else {
        let top = swiperContainer.height() - newTodaysMenu.height() - 64;
        newTodaysMenu.css({top: top});
        mainVisual.height(swiperContainer.height());            
    }
}

async function waitTime (sec) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve();
        }, sec * 1000);
    });

    return promise;
}
