// Portfolio Interactions Script

document.addEventListener('DOMContentLoaded', () => {
    // Optimisation du chargement initial
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    const menuBtn = document.getElementById('menu-btn');
    const projectsContainer = document.querySelector('.projects .box-container');

    // Animation de chargement des sections
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeIn');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Menu burger responsive
    menuBtn.addEventListener('click', () => {
        header.classList.toggle('active');
        menuBtn.classList.toggle('fa-times');
    });

    // Fermeture du menu lors du clic sur un lien de navigation
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('active');
            menuBtn.classList.remove('fa-times');
        });
    });

    // Filtrage des projets
    const createProjectFilter = () => {
        // Création dynamique des boutons de filtre
        const filterTypes = [
            'Tous',
            'Web',
            'Mobile',
            'API',
            'Jeu'
        ];

        const filterContainer = document.createElement('div');
        filterContainer.classList.add('project-filters');
        
        filterTypes.forEach(type => {
            const button = document.createElement('button');
            button.textContent = type;
            button.classList.add('filter-btn');
            
            button.addEventListener('click', () => {
                filterProjects(type);
                // Gestion de l'état actif du bouton
                document.querySelectorAll('.filter-btn').forEach(btn => 
                    btn.classList.remove('active'));
                button.classList.add('active');
            });
            
            filterContainer.appendChild(button);
        });

        projectsContainer.parentNode.insertBefore(filterContainer, projectsContainer);
    };

    const filterProjects = (type) => {
        const projects = document.querySelectorAll('.projects .box');
        
        projects.forEach(project => {
            const projectType = project.querySelector('.tech-used').textContent.toLowerCase();
            
            if (type === 'Tous' || 
                (type === 'Web' && projectType.includes('html')) ||
                (type === 'Mobile' && projectType.includes('mobile')) ||
                (type === 'API' && projectType.includes('api')) ||
                (type === 'Jeu' && projectType.includes('godot'))
            ) {
                project.style.display = 'block';
                project.classList.add('animate__animated', 'animate__fadeIn');
            } else {
                project.style.display = 'none';
            }
        });
    };

    // Initialisation des fonctionnalités
    const initPortfolio = () => {
        createProjectFilter();
        
        // Optimisation du chargement
        document.body.classList.add('loaded');
        
        // Gestion du premier filtre par défaut
        filterProjects('Tous');
        document.querySelector('.filter-btn')?.classList.add('active');
    };

    // Performance et chargement différé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolio);
    } else {
        initPortfolio();
    }
});

// Styles à ajouter dans votre CSS pour compléter les interactions
// .project-filters {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 20px;
// }
// .filter-btn {
//     margin: 0 10px;
//     padding: 10px 15px;
//     background-color: #f4f4f4;
//     border: none;
//     cursor: pointer;
// }
// .filter-btn.active {
//     background-color: var(--primary-color);
//     color: white;
// }