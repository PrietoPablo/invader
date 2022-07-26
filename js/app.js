const app = {
    gridSize: 5,
    pixelSize: 30,
    colorsList: ['blue', 'green', 'red', 'yellow'],
    currentColor: 'blue',

    drawBoard: function(gridSizeWanted, pixelSizeWanted) {

        const invaderHTMLElement = document.getElementById('invader');

        invaderHTMLElement.textContent = '';

        for (let i = 0; i < gridSizeWanted; i++) {

            const line = document.createElement('div');

            line.classList.add('line');
        
            for(let j = 0; j < gridSizeWanted; j++) {

                const pixel = document.createElement('div');

                pixel.classList.add('pixel');

                pixel.style.width = `${pixelSizeWanted}px`;
                pixel.style.height = `${pixelSizeWanted}px`;

                pixel.addEventListener('click', app.handleClick);

                line.appendChild(pixel);
            }

            invaderHTMLElement.appendChild(line);
        }
    },

    handleClick: function(event) {

        const pixelClicked = event.target;

        const classList = pixelClicked.classList;

        if (classList.contains(app.currentColor)) {
            pixelClicked.className = 'pixel';
        } else {
            pixelClicked.className = `pixel ${app.currentColor}`;
        }
    },

    drawForm: function() {

        const formHTMLElement = document.getElementsByClassName('configuration')[0];

        const gridSizeInputHTMLElement = document.createElement('input');

        gridSizeInputHTMLElement.placeholder = 'Taille de la grille';
        gridSizeInputHTMLElement.type = 'number';

        formHTMLElement.appendChild(gridSizeInputHTMLElement);

        const pixelSizeInputHTMLElement = document.createElement('input');

        pixelSizeInputHTMLElement.placeholder = 'Taille des pixels';
        pixelSizeInputHTMLElement.type = 'number';

        formHTMLElement.appendChild(pixelSizeInputHTMLElement);

        const buttonHTMLElement = document.createElement('button');

        buttonHTMLElement.textContent = 'Valider';

        formHTMLElement.appendChild(buttonHTMLElement);

        formHTMLElement.addEventListener('submit', function(event) {

            event.preventDefault();

            const newGridSize = gridSizeInputHTMLElement.value;

            if(newGridSize !== '') {

                app.gridSize = Number(newGridSize);
            }

            const newPixelSize = pixelSizeInputHTMLElement.value;

            if(newPixelSize !== '') {
                app.pixelSize = Number(newPixelSize);
            }

            app.drawBoard(app.gridSize, app.pixelSize);
        });
    },

    drawColorPalette: function() {

        const paletteContainer = document.createElement('div');
        
        paletteContainer.id = 'palette-container';

        for (let color of app.colorsList) {
        
            const paletteColorHTMLElement = document.createElement('a');
        
            paletteColorHTMLElement.classList.add('palette-color');

            paletteColorHTMLElement.dataset.color = color;
        
            paletteColorHTMLElement.classList.add(color);

            paletteColorHTMLElement.addEventListener('click', function(event) {

                const oldChoosenColorHTMLElement = document.getElementsByClassName('palette-color--active')[0];

                if (oldChoosenColorHTMLElement) {
                    oldChoosenColorHTMLElement.classList.remove('palette-color--active');
                }

                const clickedColorHTMLElement = event.target;

                clickedColorHTMLElement.classList.add('palette-color--active');

                app.currentColor = clickedColorHTMLElement.classList[1];

            });
        
            paletteContainer.appendChild(paletteColorHTMLElement);
        
        }
        
        document.body.appendChild(paletteContainer);
        
    },

    init: function() {
        app.drawBoard(app.gridSize, app.pixelSize);

        app.drawForm();

        app.drawColorPalette();
    }
};

// On exécute notre fonction init() afin que notre application se lance dès que la page
// s'affiche
app.init();
