(function() {

const template = document.createElement('template');
template.innerHTML = `<div class="logo" style="line-height: 0"></div>`;

    window.customElements.define('p4-logo', class AnysolsLogo extends HTMLElement {

        get scale() {
            return this.getAttribute('scale');
        }
    
        get animate() {
            return this.hasAttribute('animate');
        }
    
        get firstColor() {
            return this.getAttribute('first-color');
        }
    
        get secondColor() {
            return this.getAttribute('second-color');
        }
    
        static get observedAttributes() {
            return ["scale", 'first-color', 'second-color'];
        }
    
        // Can define constructor arguments if you wish.
        constructor() {
            // If you define a constructor, always call super() first!
            // This is specific to CE and required by the spec.
            super();
            this.attachShadow({mode: 'open'});
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            const el = this;
    
            function getLoadLogo() {
                el.render();
            }
    
            if (typeof window.anime === 'undefined') {
                const script = document.createElement('script');
                document.head.appendChild(script);
                script.type = 'text/javascript';
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.js";
                script.onload = getLoadLogo;
            }
    
            if (typeof window.anime === 'undefined') {
                const script = document.createElement('script');
                document.head.appendChild(script);
                script.type = 'text/javascript';
                script.src = 'https://cdnjs.cloudflare.com/ajax/libs/svg.js/2.7.1/svg.min.js';
                script.onload = getLoadLogo;
            }
    
        }
    
        attributeChangedCallback(name, oldValue, newValue) {
            if ((name === 'scale' || name === 'first-color' || name === 'second-color') && oldValue && oldValue !== newValue) {
                this.render();
            }
        }
    
        render() {
            if (window.anime && window.SVG) {
                this.drawLogo();
                if (this.animate)
                    this.animateLogo();
            }
        }

        getLogoContainer() {
            return this.shadowRoot.querySelector('.logo');
        }

        setScaleToPoints(points, scale) {
            points.forEach(function (a) {
                a[0] = scale * a[0];
                a[1] = scale * a[1] ;
            });
        }
    
        drawLogo() {

            const scale = this.scale || 10;
            const lineSize = 2.5 * scale;
            const firstColor = this.firstColor || "#83aff6";
            const secondColor = this.secondColor || "#ffc04d";
            let polyline;
            let points;

            this.getLogoContainer().innerHTML = '';
            const SVG = window.SVG;
            const draw = SVG(this.getLogoContainer()).size((10 * scale) + (4 * lineSize), (10 * scale) + (4 * lineSize));

            // first line
            points = [[2.5, 0], [0, 0]];
            this.setScaleToPoints(points, scale);
            polyline = draw.polyline(points);
            polyline.fill('none').move((lineSize / 2) + (1.5 * scale),  (lineSize * 2) + (5 * scale));
            polyline.stroke({color: firstColor, width: lineSize, linecap: 'butt', linejoin: 'butt'});

            // second line
            points = [[0, 10], [0, 0], [5, 5], [0, 5]];
            this.setScaleToPoints(points, scale);
            polyline  = draw.polyline(points);
            polyline.stroke({color: secondColor, width: lineSize, linecap: 'round', linejoin: 'butt'});
            polyline.fill('none').move((lineSize /2) + (5 * scale), (lineSize * 2));



        }
    
        animateLogo() {
            const anime = window.anime;
            var els = this.shadowRoot.querySelectorAll('polyline');
            anime({
                targets: els[1],
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 1500
            });

            anime({
                targets: els[0],
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                delay: 1400,
                duration: 300
            });
        }
    
    });
})();
