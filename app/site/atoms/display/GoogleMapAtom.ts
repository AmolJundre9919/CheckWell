// import { BaseComponent } from "../../BaseComponent";

// // Declare the google namespace
// declare global {
//   interface Window {
//     google: typeof import('googlemaps');
//   }
// }

// interface GoogleMapProps {
//   lat: number;
//   lng: number;
//   zoom: number;
//   useCurrentLocation: boolean;
//   height?: string;
//   width?: string;
// }

// export class GoogleMapAtom extends BaseComponent implements GoogleMapProps {
//   lat: number = 0;
//   lng: number = 0;
//   zoom: number = 12;
//   useCurrentLocation: boolean = false;
//   height: string = '400px';
//   width: string = '100%';

//   private mapElement: HTMLElement | null = null;
//   private map: google.maps.Map | null = null;
//   private marker: google.maps.Marker | null = null;

//   static get observedAttributes(): string[] {
//     return ['lat', 'lng', 'zoom', 'useCurrentLocation', 'height', 'width'];
//   }

//   constructor() {
//     super();
//     this.createStyles(`
//       :host {
//         display: block;
//       }
//     `);
//   }

//   connectedCallback() {
//     super.connectedCallback();
//     this.initializeMap();
//   }

//   private async initializeMap() {
//     await this.loadGoogleMapsScript();
//     this.render();
//     this.setupMap();
//   }

//   private async loadGoogleMapsScript(): Promise<void> {
//     return new Promise((resolve) => {
//       if (window.google && window.google.maps) {
//         resolve();
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
//       script.async = true;
//       script.defer = true;
//       script.onload = () => resolve();
//       document.head.appendChild(script);
//     });
//   }

//   private setupMap() {
//     if (!window.google || !window.google.maps || !this.mapElement) {
//       console.error('Google Maps JavaScript API is not loaded or map element is not found.');
//       return;
//     }

//     const mapOptions: google.maps.MapOptions = {
//       zoom: this.zoom,
//       center: { lat: this.lat, lng: this.lng },
//     };

//     this.map = new window.google.maps.Map(this.mapElement, mapOptions);

//     if (this.useCurrentLocation) {
//       this.getCurrentLocation();
//     } else {
//       this.addMarker(this.lat, this.lng);
//     }
//   }

//   private getCurrentLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           this.updateMapCenter(latitude, longitude);
//           this.addMarker(latitude, longitude);
//         },
//         (error) => {
//           console.error('Error fetching current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }

//   private updateMapCenter(lat: number, lng: number) {
//     if (this.map) {
//       this.map.setCenter({ lat, lng });
//     }
//   }

//   private addMarker(lat: number, lng: number) {
//     if (this.map && window.google) {
//       if (this.marker) {
//         this.marker.setMap(null);
//       }
//       this.marker = new window.google.maps.Marker({
//         position: { lat, lng },
//         map: this.map,
//         title: 'Current Location',
//       });
//     }
//   }

//   protected render(): void {
//     this._shadowRoot.innerHTML = `
//       <div 
//         id="map"
//         style="height: ${this.height}; width: ${this.width};"
//       ></div>
//     `;
//     this.mapElement = this._shadowRoot.getElementById('map');
//   }

//   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
//     super.attributeChangedCallback(name, oldValue, newValue);
//     if (this.map) {
//       switch (name) {
//         case 'lat':
//         case 'lng':
//           this.updateMapCenter(this.lat, this.lng);
//           this.addMarker(this.lat, this.lng);
//           break;
//         case 'zoom':
//           this.map.setZoom(this.zoom);
//           break;
//         case 'useCurrentLocation':
//           if (this.useCurrentLocation) {
//             this.getCurrentLocation();
//           }
//           break;
//         case 'height':
//         case 'width':
//           this.render();
//           this.setupMap();
//           break;
//       }
//     }
//   }
// }

// customElements.define('ui-google-map', GoogleMapAtom);









////#####################2222222222222222222222222222222222222222222






// import { BaseComponent } from "app/site/BaseComponent";
// import { Loader } from "@googlemaps/js-api-loader";

// declare global {
//   interface Window {
//     google: typeof google;
//   }
// }

// interface GoogleMapProps {
//   lat: number;
//   lng: number;
//   zoom: number;
//   useCurrentLocation: boolean;
//   height?: string;
//   width?: string;
// }

// export class GoogleMapAtom extends BaseComponent implements GoogleMapProps {
//   lat: number = 0;
//   lng: number = 0;
//   zoom: number = 12;
//   useCurrentLocation: boolean = false;
//   height: string = '400px';
//   width: string = '100%';

//   private mapElement: HTMLElement | null = null;
//   private map: google.maps.Map | null = null;
//   private marker: google.maps.Marker | null = null;

//   static get observedAttributes(): string[] {
//     return ['lat', 'lng', 'zoom', 'useCurrentLocation', 'height', 'width'];
//   }

//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.createStyles();
//   }

//   private createStyles() {
//     const style = document.createElement('style');
//     style.textContent = `
//       :host {
//         display: block;
//       }
//     `;
//     this.shadowRoot?.appendChild(style);
//   }

//   connectedCallback() {
//     this.initializeMap();
//   }

//   private async initializeMap() {
//     await this.loadGoogleMapsScript();
//     this.render();
//     this.setupMap();
//   }

//   private async loadGoogleMapsScript(): Promise<void> {
//     const loader = new Loader({
//       apiKey: "YOUR_API_KEY",
//       version: "weekly",
//       libraries: ["places"]
//     });

//     await loader.load();
//   }

//   private setupMap() {
//     if (!this.mapElement) {
//       console.error('Map element is not found.');
//       return;
//     }

//     const mapOptions: google.maps.MapOptions = {
//       zoom: this.zoom,
//       center: { lat: this.lat, lng: this.lng },
//     };

//     this.map = new google.maps.Map(this.mapElement, mapOptions);

//     if (this.useCurrentLocation) {
//       this.getCurrentLocation();
//     } else {
//       this.addMarker(this.lat, this.lng);
//     }
//   }

//   private getCurrentLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           this.updateMapCenter(latitude, longitude);
//           this.addMarker(latitude, longitude);
//         },
//         (error) => {
//           console.error('Error fetching current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }

//   private updateMapCenter(lat: number, lng: number) {
//     if (this.map) {
//       this.map.setCenter({ lat, lng });
//     }
//   }

//   private addMarker(lat: number, lng: number) {
//     if (this.map) {
//       if (this.marker) {
//         this.marker.setMap(null);
//       }
//       this.marker = new google.maps.Marker({
//         position: { lat, lng },
//         map: this.map,
//         title: 'Current Location',
//       });
//     }
//   }

//   protected render(): void {
//     if (this.shadowRoot) {
//       this.shadowRoot.innerHTML = `
//         <div 
//           id="map"
//           style="height: ${this.height}; width: ${this.width};"
//         ></div>
//       `;
//       this.mapElement = this.shadowRoot.getElementById('map');
//     }
//   }

//   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
//     if (this.map) {
//       switch (name) {
//         case 'lat':
//         case 'lng':
//           this.updateMapCenter(this.lat, this.lng);
//           this.addMarker(this.lat, this.lng);
//           break;
//         case 'zoom':
//           this.map.setZoom(this.zoom);
//           break;
//         case 'useCurrentLocation':
//           if (this.useCurrentLocation) {
//             this.getCurrentLocation();
//           }
//           break;
//         case 'height':
//         case 'width':
//           this.render();
//           this.setupMap();
//           break;
//       }
//     }
//   }
// }

// customElements.define('ui-google-map', GoogleMapAtom);


















////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#333333333333333333333333333333333333



// import { BaseComponent } from "app/site/BaseComponent";
// import { Loader } from "@googlemaps/js-api-loader";

// declare global {
//   interface Window {
//     google: typeof google;
//   }
// }

// interface GoogleMapProps {
//   lat: number;
//   lng: number;
//   zoom: number;
//   useCurrentLocation: boolean;
//   height?: string;
//   width?: string;
// }

// export class GoogleMapAtom extends BaseComponent implements GoogleMapProps {
//   lat: number = 0;
//   lng: number = 0;
//   zoom: number = 12;
//   useCurrentLocation: boolean = false;
//   height: string = '400px';
//   width: string = '100%';

//   private mapElement: HTMLElement | null = null;
//   private map: google.maps.Map | null = null;
//   private marker: google.maps.Marker | null = null;

//   static get observedAttributes(): string[] {
//     return ['lat', 'lng', 'zoom', 'useCurrentLocation', 'height', 'width'];
//   }

//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//     this.createStyles();
//   }

//   protected createStyles() {
//     const style = document.createElement('style');
//     style.textContent = `
//       :host {
//         display: block;
//       }
//     `;
//     this.shadowRoot?.appendChild(style);
//   }

//   connectedCallback() {
//     this.initializeMap();
//   }

//   private async initializeMap() {
//     await this.loadGoogleMapsScript();
//     this.render();
//     this.setupMap();
//   }

//   private async loadGoogleMapsScript(): Promise<void> {
//     const loader = new Loader({
//       apiKey: "YOUR_API_KEY",
//       version: "weekly",
//       libraries: ["places"]
//     });

//     await loader.load();
//   }

//   private setupMap() {
//     if (!this.mapElement) {
//       console.error('Map element is not found.');
//       return;
//     }

//     const mapOptions: google.maps.MapOptions = {
//       zoom: this.zoom,
//       center: { lat: this.lat, lng: this.lng },
//     };

//     this.map = new google.maps.Map(this.mapElement, mapOptions);

//     if (this.useCurrentLocation) {
//       this.getCurrentLocation();
//     } else {
//       this.addMarker(this.lat, this.lng);
//     }
//   }

//   private getCurrentLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           this.updateMapCenter(latitude, longitude);
//           this.addMarker(latitude, longitude);
//         },
//         (error) => {
//           console.error('Error fetching current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }

//   private updateMapCenter(lat: number, lng: number) {
//     if (this.map) {
//       this.map.setCenter({ lat, lng });
//     }
//   }

//   private addMarker(lat: number, lng: number) {
//     if (this.map) {
//       if (this.marker) {
//         this.marker.setMap(null);
//       }
//       this.marker = new google.maps.Marker({
//         position: { lat, lng },
//         map: this.map,
//         title: 'Current Location',
//       });
//     }
//   }

//   protected render(): void {
//     if (this.shadowRoot) {
//       this.shadowRoot.innerHTML = `
//         <div 
//           id="map"
//           style="height: ${this.height}; width: ${this.width};"
//         ></div>
//       `;
//       this.mapElement = this.shadowRoot.getElementById('map');
//     }
//   }

//   attributeChangedCallback(name: string, oldValue: string, newValue: string) {
//     if (this.map) {
//       switch (name) {
//         case 'lat':
//         case 'lng':
//           this.updateMapCenter(this.lat, this.lng);
//           this.addMarker(this.lat, this.lng);
//           break;
//         case 'zoom':
//           this.map.setZoom(this.zoom);
//           break;
//         case 'useCurrentLocation':
//           if (this.useCurrentLocation) {
//             this.getCurrentLocation();
//           }
//           break;
//         case 'height':
//         case 'width':
//           this.render();
//           this.setupMap();
//           break;
//       }
//     }
//   }
// }

// customElements.define('ui-google-map', GoogleMapAtom);



////////////////@@@@@@@@@@@@@######################444444444444444444444444444444444444444444444444

import { BaseComponent } from "app/site/BaseComponent";
import { Loader } from "@googlemaps/js-api-loader";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom: number;
  useCurrentLocation: boolean;
  height?: string;
  width?: string;
}

export class GoogleMapAtom extends BaseComponent implements GoogleMapProps {
  lat: number = 0;
  lng: number = 0;
  zoom: number = 12;
  useCurrentLocation: boolean = false;
  height: string = '400px';
  width: string = '100%';

  private mapElement: HTMLElement | null = null;
  private map: google.maps.Map | null = null;
  private marker: google.maps.Marker | null = null;

  static get observedAttributes(): string[] {
    return ['lat', 'lng', 'zoom', 'useCurrentLocation', 'height', 'width'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.createStyles();
  }

  protected createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
      }
    `;
    this.shadowRoot?.appendChild(style);
  }

  connectedCallback() {
    this.initializeMap();
  }

  private async initializeMap() {
    await this.loadGoogleMapsScript();
    this.render();
    this.setupMap();
  }

  private async loadGoogleMapsScript(): Promise<void> {
    const loader = new Loader({
      apiKey: "YOUR_API_KEY",  // Ensure this is a valid API key
      version: "weekly",
      libraries: ["places"]
    });

    await loader.load();
    console.log('Google Maps API loaded successfully');
  }

  private setupMap() {
    if (!this.mapElement) {
      console.error('Map element is not found.');
      return;
    }

    const mapOptions: google.maps.MapOptions = {
      zoom: this.zoom,
      center: { lat: this.lat, lng: this.lng },
    };

    this.map = new google.maps.Map(this.mapElement, mapOptions);

    if (this.useCurrentLocation) {
      this.getCurrentLocation();
    } else {
      this.addMarker(this.lat, this.lng);
    }
  }

  private getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('Current Location:', latitude, longitude);  // Log coordinates
          this.updateMapCenter(latitude, longitude);
          this.addMarker(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  private updateMapCenter(lat: number, lng: number) {
    if (this.map) {
      this.map.setCenter({ lat, lng });
    }
  }

  private addMarker(lat: number, lng: number) {
    if (this.map) {
      if (this.marker) {
        this.marker.setMap(null);  // Remove previous marker if it exists
      }
      this.marker = new google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: 'Current Location',
      });
    }
  }

  protected render(): void {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <div 
          id="map"
          style="height: ${this.height}; width: ${this.width};"
        ></div>
      `;
      this.mapElement = this.shadowRoot.getElementById('map');
    }
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (this.map) {
      switch (name) {
        case 'lat':
        case 'lng':
          this.updateMapCenter(this.lat, this.lng);
          this.addMarker(this.lat, this.lng);
          break;
        case 'zoom':
          this.map.setZoom(this.zoom);
          break;
        case 'useCurrentLocation':
          if (this.useCurrentLocation) {
            this.getCurrentLocation();
          }
          break;
        case 'height':
        case 'width':
          this.render();
          this.setupMap();
          break;
      }
    }
  }
}

customElements.define('ui-google-map', GoogleMapAtom);
