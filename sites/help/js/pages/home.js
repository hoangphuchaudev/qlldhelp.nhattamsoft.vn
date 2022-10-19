jQuery(document).ready(async function () {
    // console.log(1);
    await base.getData()
    base.renderVideoHTML()
    //tab video
    var tabVideo = jQuery(".tab-item > div");

    tabVideo.click(function (e) {
        console.log();
        base.openTab(e, jQuery(this).attr("data-video-id"))
    })

    // Show Popup Video & Events
    jQuery('.play-video').click(function () {
        var _this = jQuery(this);
        var src = _this.attr("src");
        jQuery('body .popup-video').remove();
        jQuery('body').append(base.htmlPopupVideo(src));

        // Sự kiện Click (X) thì đóng Popup Video
        jQuery('.pv-close').on('click', function () {
            base.closePopupVideo();
        });

        // Sự kiện nhấn phím ESC thì đóng Popup Video
        jQuery(document).bind('keydown', function (key) {
            if (key.which == 27) {
                base.closePopupVideo();
            }
        });

        jQuery('.popup-video').fadeIn(300);

        return false;
    });
});

const base = {
    // Chứa danh sách các video
    videoList: [],
    // Chứa datavideo cần làm mịn
    videoData: [],
    openTab: function (evt, tabName) {
        var i, x, tablinks;
        x = document.getElementsByClassName("tab-pane");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("small-video-ctn");
        for (i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
        // console.log(tabName);
    },
    getData: async function () {
        try {
            await jQuery.get("/amis-tien-luong/video", function (response) {
                if (response != null && response != '') {
                    var indexFirst = response.indexOf('<data_video class="data_video" data="');
                    var indexLast = response.indexOf('"></data_video>');
                    if (indexFirst != 'undefined' && indexFirst != null && indexFirst > -1 && indexLast != 'undefined' && indexLast != null && indexLast > -1) {
                        var dataRes = response.substring(indexFirst + 37, indexLast);
                        if (dataRes != null && dataRes != '') {
                            var data = JSON.parse(dataRes);
                            if (data != null && data.length > 0) {
                                base.videoData = data;
                                base.smoothData()
                            }
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    smoothData: function () {
        Object.entries(base.videoData).forEach(([key, { Category, ListVideo, SortOrder }]) => {
            Object.entries(ListVideo).forEach(([key, { Description, LinkVideo, SortOrder, ThumbnailUrl, Title }]) => {
                let videoItem = {
                    title: Title,
                    thumb: ThumbnailUrl,
                    sortOrder: SortOrder,
                    linkVideo: LinkVideo,
                    description: Description
                }
                base.videoList.push(videoItem)
            })
        });
    },
    renderVideoHTML: function () {
        var html_video_str = '';
        var html_tab_str = '';
        if (base.videoList.length <= 0) {
            jQuery(".video.common-padding").hide();
        }
        else {
            Object.entries(base.videoList).forEach(([key, { title, thumb, sortOrder, linkVideo, description }]) => {
                if (!thumb) {
                    thumb = "/amis-tien-luong/sites/help/images/pages/home/img-video-1.jpg";
                }
                if (key == 0) {
                    html_tab_str += '<li class="tab-item">'
                        + '<div class="small-video-ctn active" data-video-id="tab' + key + '">'
                        + '<a>'
                        + '<div class="hover-video">'
                        + '<img class="img-responsive" src="/amis-tien-luong/sites/help/images/pages/home/ic-play.svg" alt="' + title + '">'
                        + '</div>'
                        + '<img style="width: 100%; height: 100%;" class="img-responsive" src="' + thumb + '" alt="' + title + '">'
                        + '</a>'
                        + '<div class="video-text"><a>' + title + '</a></div>'
                        + '</div>'
                        + '</li>';

                    html_video_str += '<div id="tab' + key + '" class="tab-pane active fadeRight">'
                        + '<a src="' + linkVideo + '" class="play-video">'
                        + '<div class="hover-video">'
                        + '<img class="img-responsive" src="/amis-tien-luong/sites/help/images/pages/home/ic-play.svg" alt="' + title + '">'
                        + '</div>'
                        + '<img style="width: 100%; height: 100%;" class="img-responsive" src="' + thumb + '" alt="' + title + '">'
                        + '</a>'
                        + '<div class="video-main-title">' + title + '</div>'
                        + '</div>'
                }
                else {
                    html_tab_str += '<li class="tab-item">'
                        + '<div class="small-video-ctn" data-video-id="tab' + key + '">'
                        + '<a>'
                        + '<div class="hover-video">'
                        + '<img class="img-responsive" src="/amis-tien-luong/sites/help/images/pages/home/ic-play.svg" alt="' + title + '">'
                        + '</div>'
                        + '<img style="width: 100%; height: 100%;" class="img-responsive" src="' + thumb + '" alt="' + title + '">'
                        + '</a>'
                        + '<div class="video-text"><a>' + title + '</a></div>'
                        + '</div>'
                        + '</li>';

                    html_video_str += '<div id="tab' + key + '" class="tab-pane fadeRight">'
                        + '<a src="' + linkVideo + '" class="play-video">'
                        + '<div class="hover-video">'
                        + '<img class="img-responsive" src="/amis-tien-luong/sites/help/images/pages/home/ic-play.svg" alt="' + title + '">'
                        + '</div>'
                        + '<img style="width: 100%; height: 100%;" class="img-responsive" src="' + thumb + '" alt="' + title + '">'
                        + '</a>'
                        + '<div class="video-main-title">' + title + '</div>'
                        + '</div>'
                }
            })
        }
        jQuery(".video-main.tab-content").append(html_video_str);
        jQuery(".video-list").append(html_tab_str);
    },
    // HTML Popup Video
    htmlPopupVideo: function (src) {
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
    },

    // Close Popup Video
    closePopupVideo: function () {
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
                base.closePopupVideo();
            }
        });

        jQuery('.popup-video').fadeOut(300);
    }
}