(function() {

    window.addEventListener('load', function() {
        const pageEnd = performance.mark('pageEnd')
        const loadTime = pageEnd.startTime / 1000
        let footer = document.getElementById('time');
        
        footer.textContent = 'Page load time: ' + loadTime.toFixed(2) + ' seconds';
    });
})();

function myFunction(url) {
    window.location = url
}