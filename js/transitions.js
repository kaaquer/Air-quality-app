document.addEventListener('DOMContentLoaded', () => {
    // Handle navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            
            // Add exit animation
            document.querySelector('.page-transition-wrapper').classList.add('page-exit');
            
            // Navigate after animation
            setTimeout(() => {
                window.location.href = target;
            }, 300);
        });
    });
}); 