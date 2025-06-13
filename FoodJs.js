document.querySelectorAll('.toggle-button').forEach(button => {
      button.addEventListener('click', () => {
        const recipe = button.closest('.food-content').querySelector('.food-recipe');
        const isOpen = recipe.classList.toggle('open');
        button.classList.toggle('open', isOpen);
        button.setAttribute('aria-expanded', isOpen);
        recipe.setAttribute('aria-hidden', !isOpen);
        button.innerHTML = isOpen ? '&#x2796;' : '&#x2795;';
      });
    });