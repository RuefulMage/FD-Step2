window.onload = function(){
    let paginationPage = parseInt($('.js-pagination').attr('data-current-page'), 10);
    $('.js-pagination__item').on('click', function(){
        let go = $(this).attr('data-page-number');
        if (go === '+1') {
            paginationPage++;
        } else if (go === '-1') {
            paginationPage--;
        }else{
            paginationPage = parseInt(go, 10);
        }
        $('.js-pagination').attr('data-current-page', paginationPage);
    });
};