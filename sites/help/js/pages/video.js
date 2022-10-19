/**
 * js xử lý trang video
 * Created by: NTSON - 02/04/2021
 */
jQuery(document).ready(function ($) {
    actionTab();

    //Sau khi collapse thif remove div cha
    jQuery('.loadmore-content').on("shown.bs.collapse ", function (e) {
        jQuery('.loadmore-content li').unwrap();
    });
});

/**
 * Sự kiện nhấn tab
 * Created by: NTSON 03/04/2021
 */
function actionTab() {
    jQuery('.video-tab li a').on('click', function () {
        jQuery('.video-tab li').removeClass('active');
        jQuery(this).parent().addClass('active');
        var id = jQuery(this)[0].getAttribute('tab');
        if (id != null) {
            jQuery('.tab-pane').hide();
            jQuery('#' + id).show();
        }
    });
}