jQuery(document).ready(function ($) {
    // Show Popup Video & Events
    jQuery('.play-video').click(function () {
        var _this = jQuery(this);
        var src = _this.attr("src");
        jQuery('body .popup-video').remove();
        jQuery('body').append(htmlPopupVideo(src));

        // Sự kiện Click (X) thì đóng Popup Video
        jQuery('.pv-close').on('click', function () {
            closePopupVideo();
        });

        // Sự kiện nhấn phím ESC thì đóng Popup Video
        jQuery(document).bind('keydown', function (key) {
            if (key.which == 27) {
                closePopupVideo();
            }
        });

        jQuery('.popup-video').fadeIn(300);

        return false;
    });

    // region custom menu
    // Tạo menu màn hình desktop
    htmlMenuDesktop();

    // Tạo menu màn hình mobile
    htmlMenuMobile();

    customSubMenu();
    // Scroll khi ở nhấn menu tab (ở những trang có menu tab)
    jQuery(".banner-tab-select a").click(function () {
        jQuery("html,body").animate(
            { scrollTop: jQuery(this.hash).offset().top - 50 },
            400
        );
        return false;
    });

    // Sticky menu
    stickyMenu();
    // end region 
});

// HTML Popup Video
function htmlPopupVideo(src) {
    var html = '<div class="popup-video">'
        + '<div class="pv-content">'
        + '<div class="pv-border">'
        + '<div class="pv-close"></div>'
        + '<div class="embed-responsive-16by9 embed-responsive">'
        + '<iframe src="' + src + '" allow="autoplay" allowfullscreen></iframe>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    return html;
};

// Close Popup Video
function closePopupVideo() {
    var frame = jQuery('.popup-video iframe');
    try {
        if (frame) {
            var src = frame.attr('src');
            if (src) {
                if (src.includes("autoplay")) {
                    var arr = src.split("?");
                    if (arr && arr.length > 0) {
                        src = arr[0] + "?autoplay=0";
                        frame.attr('src', src);
                    }
                }
                else {
                    src += "?autoplay=0"
                    frame.attr('src', src);
                }
            }
        }
    } catch (e) {
        console.log(e);
    }

    // Hủy sự kiện keyDown keyASC
    jQuery(document).unbind('keydown', function (key) {
        if (key.which == 27) {
            closePopupVideo();
        }
    });

    jQuery('.popup-video').fadeOut(300);
};
///////////////////////////////////////////////

function customSubMenu() {
    if (window.innerWidth >= 980) {
        jQuery(".site-header__banner")
            .unbind("mouseover", ".header")
            .bind("mouseover", ".header", function (e) {
                var feature = "Sản phẩm",
                    news = "Kiến thức";

                var menuFeature = jQuery('a[class="sf-with-ul"]:contains("Sản phẩm")'),
                    menuNews = jQuery('a[class="sf-with-ul"]:contains("Kiến thức")');

                if (
                    e.target.innerText.toLowerCase() === feature.toLowerCase() ||
                    e.target.innerText.toLowerCase() === news.toLowerCase() ||
                    jQuery(e.target).hasClass("box-content-menu") ||
                    (jQuery("#feature-menu-panel").find(e.target) &&
                        jQuery("#feature-menu-panel").find(e.target).length > 0) ||
                    jQuery(e.target).attr("id") === "cooporateMenu" ||
                    jQuery("#cooporateMenu").has(e.target).length > 0
                ) {
                    if (jQuery(e.target)[0].tagName.toLowerCase() === "a") {
                        jQuery(e.target.parentElement).find("ul").remove();
                    }
                    if (e.target.innerText.toLowerCase() === feature.toLowerCase()) {
                        jQuery("#news-menu-panel").hide();
                        subMenuFeatureWeb();

                        changeIconUpDown(menuFeature, menuNews);
                        if (menuFeature != undefined && menuFeature.length > 0) {
                            menuFeature.find("i").attr("class", "td-icon-menu-up");
                            menuFeature
                                .find("i")
                                .attr(
                                    "style",
                                    "position: absolute; top: 50%; margin-top: -5px; padding-left: 2px; font-size: 8px;"
                                );
                        }
                    } else if (e.target.innerText.toLowerCase() === news.toLowerCase()) {
                        jQuery("#feature-menu-panel").hide();
                        generateNewsMenu(e.target);
                        changeIconUpDown(menuFeature, menuNews);
                        if (menuNews != undefined && menuNews.length > 0) {
                            menuNews.find("i").attr("class", "td-icon-menu-up");
                            menuNews
                                .find("i")
                                .attr(
                                    "style",
                                    "position: absolute; top: 50%; margin-top: -5px; padding-left: 2px; font-size: 8px;"
                                );
                        }
                    }
                } else {
                    jQuery("#feature-menu-panel").hide();
                    jQuery("#news-menu-panel").hide();

                    changeIconUpDown(menuFeature, menuNews);
                }
            });

        //Sự kiện di chuột ra ngoài thì ẩn menu đi
        jQuery(".site-header__banner")
            .unbind("mouseleave", ".header")
            .bind("mouseleave", ".header", function (e) {
                jQuery("#feature-menu-panel").hide();
                jQuery("#news-menu-panel").hide();
                changeIconUpDown(
                    jQuery('a[class="sf-with-ul"]:contains("Sản phẩm")'),
                    jQuery('a[class="sf-with-ul"]:contains("Kiến thức")')
                );
            });
    }
};

// Menu sản phẩm
function subMenuFeatureWeb(e) {
    if (jQuery("#feature-menu-panel .content-menu").length === 0) {
        var html = "";
        html = html.concat(
            '<div class="content-menu">' +
            '<div class="container">' +
            '<div class="col-md-24 clear-padding">' +
            '<div class="box-content-menu">' +

            // Cột 1
            '<div class="col-md-12 clear-padding content-second-col">' +
            '<div class="menu-row content-menu-item fourth-menu-item top-submenu">' +
            '<div class="menu-item-group"><a >Khối cơ quan Nhà nước</a>' +
            '</div>' +
            "</div>" +
            '<div class="menu-row content-menu-item fifth-menu-item">' +
            '<a href="#"><div class="menu-product-detail" style="background-image: url(/sites/library/images/icon-menu/amis-cong-viec.svg)"><div class="menu-name">Phần mềm Quản lý nhuận bút</div>' +
            "</div></a>" +
            '<a href="#"><div class="menu-product-detail" style="background-image: url(/sites/library/images/icon-menu/amis-mxh.svg)"><div class="menu-name">Phần mềm Quản lý bán hàng</div>' +
            "</div></a>" +
            '<a href="#"><div class="menu-product-detail" style="background-image: url(/sites/library/images/icon-menu/amis-mxh.svg)"><div class="menu-name">Phần mềm Kế toán doanh nghiệp</div>' +
            "</div></a>" +
            "</div>" +
            "</div>" +


            // Cột 2
            '<div class="col-md-12 clear-padding content-second-col">' +
            '<div class="menu-row content-menu-item fourth-menu-item top-submenu">' +
            '<div class="menu-item-group"><a >Khối doanh nghiệp</a>' +
            '</div>' +
            "</div>" +
            '<div class="menu-row content-menu-item fifth-menu-item">' +
            '<a href="#"><div class="menu-product-detail" style="background-image: url(/sites/library/images/icon-menu/amis-tuyen-dung.svg)"><div class="menu-name">Phần mềm Quản lý phòng khám</div>' +
            "</div></a>" +
            '<a href="/amis-thong-tin-nhan-su/"><div class="menu-product-detail" style="background-image: url(/sites/library/images/icon-menu/amis-thong-tin-nhan-su.svg)"><div class="menu-name">Phần mềm Quản lý vé số</div>' +
            "</div></a>" +
            "</div>" +
            "</div>"
        );
        jQuery("#feature-menu-panel").append(html);
        jQuery("#feature-menu-panel").show(); //#feature-menu-panel được thêm trong file /Newspaper/parts/header/header-style-7.php
    } else {
        jQuery("#feature-menu-panel").show();
    }
};


function changeIconUpDown(menuFeature, menuNews) {
    if (menuFeature != undefined && menuFeature.length > 0) {
        menuFeature.find("i").attr("class", "td-icon-menu-down");
    }
    if (menuNews != undefined && menuNews.length > 0) {
        menuNews.find("i").attr("class", "td-icon-menu-down");
    }
};


/*
 *  Truncate string
 *  NHHAI - 28/10/2020
 */
function truncateString(str, length) {
    if (str.split(" ").length >= length) {
        return str.split(" ").splice(0, length).join(" ") + "...";
    }
    return str;
};
/*
 *   HTML Menu Đăng nhập, Đăng ký
 *   NVTUAN1 - 23/03/2020
 */
function htmlMenuDesktop() {
    var html = "";
    html =
        '<ul id="menu-desktop" class="sf-menu">' +
        '<li class="menu-item">' +
        '<a href="https://amisapp.misa.vn" class="sf-width-ul" target="_blank">Đăng nhập</a>' +
        "</li>" +
        '<li class="menu-item">' +
        '<a href="https://amisapp.misa.vn/register" class="sf-width-ul" target="_blank">Đăng ký</a>' +
        "</li>" +
        "</ul>";
    jQuery("#td-header-menu .menu-menu-container").append(html);
};


/*
 *   HTML Menu Đăng nhập, Đăng ký
 *   NVTUAN1 - 23/03/2020
 */
function htmlMenuMobile() {
    var html = "";
    html =
        '<ul id="menu-mobile" class="sf-menu">' +
        '<li class="menu-item">' +
        '<a href="https://amisapp.misa.vn" class="sf-width-ul" target="_blank">Đăng nhập</a>' +
        "</li>" +
        '<li class="menu-item">' +
        '<a href="https://amisapp.misa.vn/register" class="sf-width-ul" target="_blank">Đăng ký</a>' +
        "</li>" +
        "</ul>";
    jQuery("#td-mobile-nav .menu-menu-container").append(html);
};

/*
 *  Sticky menu
 *  NHHAI - 27/10/2020
 */
function stickyMenu() {
    var stickyMenu = document.getElementById("stickyMenu");
    if (stickyMenu) {
        var lastScrollTop = 0;
        var stickyTop = stickyMenu.offsetTop;
        jQuery(window).scroll(function (event) {
            var st = jQuery(this).scrollTop();
            if (st > lastScrollTop) {
                if (window.pageYOffset + 59 >= stickyTop) {
                    stickyMenu.classList.add("sticky");
                    if (window.innerWidth < 768) {
                        stickyMenu.style.top = "59px";
                    } else {
                        stickyMenu.style.top = "89px";
                    }
                    activeTab(59);
                } else {
                    defaultStickyMenu(stickyMenu);
                }
            } else {
                if (window.pageYOffset + 100 >= stickyTop) {
                    stickyMenu.classList.add("sticky");
                    if (window.innerWidth < 768) {
                        stickyMenu.style.top = "100px";
                    } else {
                        stickyMenu.style.top = "130px";
                    }
                    activeTab(100);
                } else {
                    defaultStickyMenu(stickyMenu);
                }
            }
            lastScrollTop = st;
        });
    }
};

/*
 *  Active tab sticky menu
 *  NHHAI - 27/10/2020
 */
function activeTab(number) {
    jQuery('#stickyMenu[name!="crm"] li').removeClass("active");
    var tabs = [
        "overview_tab",
        "feature_tab",
        "benefit_tab",
        "success_story_tab",
    ];
    tabs.forEach(function (t) {
        var tab = document.getElementById(t);
        if (tab) {
            var top = tab.offsetTop;
            var bottom = tab.offsetTop + tab.offsetHeight;
            if (
                window.pageYOffset + number >= top &&
                window.pageYOffset + number < bottom
            ) {
                jQuery('#stickyMenu li a[href="#' + t + '"]')
                    .parent()
                    .addClass("active");
            }
        }
    });
};

/*
 *  Default sticky menu
 *  NHHAI - 27/10/2020
 */
function defaultStickyMenu(stickyMenu) {
    stickyMenu.classList.remove("sticky");
    stickyMenu.style.top = "0";
    jQuery('#stickyMenu[name!="crm"] li').removeClass("active");
};