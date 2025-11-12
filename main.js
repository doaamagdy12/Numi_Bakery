document.addEventListener('DOMContentLoaded', function() {
    const orderButton = document.querySelector('.btn-order');
    const viewButtons = document.querySelectorAll('.btn-view');
    const productCards = document.querySelectorAll('.product-card');
    
    orderButton.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        setTimeout(() => {
            alert('Thank you for your order! We will contact you soon to confirm.');
            this.innerHTML = 'Order Now';
        }, 1500);
    });
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h4').textContent;
            alert(`Viewing details for: ${productName}`);
        });
    });
    
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h4').textContent;
            const productPrice = this.querySelector('.price').textContent;
            
            const modal = document.createElement('div');
            modal.className = 'product-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
            `;
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 400px;">
                    <h3>${productName}</h3>
                    <p style="color: #d2691e; font-size: 1.5rem; font-weight: bold;">${productPrice}</p>
                    <p>Would you like to add this item to your cart?</p>
                    <button class="btn btn-success me-2">Add to Cart</button>
                    <button class="btn btn-secondary">Close</button>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('.btn-success').addEventListener('click', function() {
                alert(`${productName} added to cart!`);
                document.body.removeChild(modal);
            });
            
            modal.querySelector('.btn-secondary').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
        });
    });
    
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p:last-child');
    if (yearElement) {
        yearElement.textContent = `All rights reserved © Numi Bakery ${currentYear}`;
    }
    
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .location-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }
    
    const animatedElements = document.querySelectorAll('.product-card, .location-card');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    let currentSlide = 0;
    function rotateSpecialOffer() {
        const offers = [
            "Get 50% discount on our premium coffee with any chocolate cake purchase!",
            "Buy 2 artisan breads and get 1 free!",
            "Free delivery on orders over $30!",
            "Weekend special: 20% off all pastries!"
        ];
        
        const offerText = document.querySelector('.special-offer .lead');
        if (offerText) {
            currentSlide = (currentSlide + 1) % offers.length;
            offerText.style.opacity = '0';
            
            setTimeout(() => {
                offerText.textContent = offers[currentSlide];
                offerText.style.opacity = '1';
            }, 500);
        }
    }
    
    setInterval(rotateSpecialOffer, 4000);
});