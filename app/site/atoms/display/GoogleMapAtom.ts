import { BaseComponent } from "../../BaseComponent";

interface GoogleMapProps {
    lat: number;
    lng: number;
    zoom: number;
}

export class GoogleMapAtom extends BaseComponent implements GoogleMapProps {
    lat: number = 0;
    lng: number = 0;
    zoom: number = 1;

    static get observedAttributes(): string[] {
        return ['lat', 'lng', 'zoom'];
    }

    constructor() {
        super();
        this.createStyles(`
            :host {
                display: block;
                width: 100%;
                height: 400px; /* Set a default height */
            }
        `);
    }

    protected render(): void {
        this._shadowRoot.innerHTML = `
            <div class="relative w-full h-full">
                <div class="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <p>Map Center: Lat: ${this.lat}, Lng: ${this.lng}</p>
                    <p>Zoom Level: ${this.zoom}</p>
                </div>
            </div>
        `;
    }
}

customElements.define('ui-google-map', GoogleMapAtom); 