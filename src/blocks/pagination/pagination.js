window.onload = function(){
    let paginationPage = parseInt($('.pagination').attr('current-page'), 10);
    $('.pagination__item').on('click', function(){
        let go = $(this).attr('page-number');
        if (go === '+1') {
            paginationPage++;
        } else if (go === '-1') {
            paginationPage--;
        }else{
            paginationPage = parseInt(go, 10);
        }
        $('.pagination').attr('current-page', paginationPage);
    });
};