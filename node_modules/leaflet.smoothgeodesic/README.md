# 🌎 Leaflet.SmoothGeodesic

## [Demo](https://leaflet-smoothgeodesic.netlify.app/)

![Image of smooth geodesic path](https://raw.githubusercontent.com/hunter547/leaflet-smooth-geodesic-gatsby-site/main/static/ogImage.png)

## Purpose

Draw smooth geodesic (Great Circle) paths from a source latitude/longitude to a destination latitude/longitude.

<br />

<div id="top"></div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#nodejs">Node.js</a></li>
      </ul>
    </li>	  
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#parameters">Parameters</a></li>
	<li><a href="#examples">Examples</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<br />

### Built With

- [Leaflet.js](https://leafletjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [rollup.js](https://rollupjs.org/guide/en/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Setup

You need to have a leaflet map setup before usage. Follow the setup guide here:
<br />
Vanilla Javasciprt: https://leafletjs.com/SlavaUkraini/examples/quick-start/
<br />
React: https://react-leaflet.js.org/docs/start-installation/

## Installation

### Node.js

```
npm i leaflet.smoothgeodesic
```

Import leaflet FIRST, then leaflet.smoothgeodesic:

```javascript
import L from "leaflet"; // import { smoothGeodesic, SmoothGeodesic } from 'leaflet'; // for TypeScript
import "leaflet.smoothgeodesic";
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Give a source coordinate and destination coordinate (with options) and optionally animate it.

### Parameters

```
L.smoothGeodesic(Source coordinates, Destination coordinates, Number of midpoints, Options)
```

1. <b>Source coordinates</b>
   <table>
     <tr>
     	<td> Purpose </td> <td> Available Data Types </td><td> Example </td>
     </tr>
     <tr>
       <td>The starting location of the curve.</td>
       <td><code>[number, number]</code> and <code>L.LatLng(lat, lng)</code></td>
       <td><code>[0, 0]</code> or <code>new L.LatLng(0, 0)</code></td>
     </tr>
   </table>
2. <b>Destination coordinates</b>
   <table>
     <tr>
     	<td> Purpose </td> <td> Available Data Types </td><td> Example </td>
     </tr>
     <tr>
       <td>The ending location of the curve.</td>
       <td><code>[number, number]</code> and <code>L.LatLng(lat, lng)</code></td>
       <td><code>[0, 0]</code> or <code>new L.LatLng(0, 0)</code></td>
     </tr>
   </table>
3. <b>Number of midpoints</b>
   <table>
     <tr>
     	<td> Purpose </td> <td> Available Data Types </td><td> Example </td>
     </tr>
     <tr>
       <td> The number of calculated points along the geodesic path for use by the curve. The higher the number, the more accurate the curve, but more intensive the total calculation. 65 points seems to be a good balance of true geodesic accuracy and calculation intensity. 100+ for really accurate lines. </td>
       <td><code>number (integer)</code></td>
       <td><code>65</code></td>
     </tr>
   </table>
4. <b>Options</b>
   <table>
   <tr>
   <td> Purpose </td> <td> Available Data Types </td><td> Example </td>
   </tr>
   <tr>
   <td> Allow for customization of the geodesic path. This options object is an extension of the <a href="https://leafletjs.com/SlavaUkraini/reference.html#path">Leaflet Path Options</a>. All options listed there can be used here, as well as an <code>animate:{}</code> property, which is of type <a href="https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.keyframeanimationoptions.html">KeyframeAnimationOptions</a>, or just a number. This gives the user the ability to both customize the path and animate it from point A to point B with keyframes, or just a number defining the duration of the point A to pont B "flight" time.</td>
   <td><code>{...<a href="https://leafletjs.com/SlavaUkraini/reference.html#path">Leaflet Path Options</a>, animate: <a href="https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.keyframeanimationoptions.html">KeyframeAnimationOptions</a> or number</code>.</td>
   <td>
   
   ```json
   {
   	"weight": 4,
   	"color": "darkslateblue",
   	"animate": { "duration": 3000, "delay": 1000 }
   }
   ```
   
   </td>
   </tr>
   </table>

### Examples
```javascript
L.smoothGeodesic(
  [40, -99], // <- Source coordinates
  [27, 30],  // <- Destination coordinates
  65,        // <- Number of midpoint calculations
  { 
    weight: 4, 
    color: "teal", 
    animate: 3000 
  }          // <- Options
).addTo(map) // map is an instance of L.Map

////////////////////////////////////////////////////////

new L.SmoothGeodesic(
  L.latLng(60, 100), 
  L.latLng(40, -4), 
  65, 
  { 
    className: "customPathClass", 
    animate: {
      duration: 3000,
      delay: 3000
    }
  }
).addTo(map)

////////////////////////////////////////////////////////

L.smoothGeodesic(
  new L.LatLng(24, -76), 
  new L.LatLng(31, 36), 
  100, 
  { 
    opacity: 0.5, 
    lineCap: "square", 
    dashArray: "4 1" 
  }
).addTo(map)
```

<!-- ROADMAP -->
## Roadmap

- [ ] Add Changelog.
- [ ] Add CDN delivery of the src code for vanilla javascript support.
- [ ] Add methods to allow setting of new source and destination coordinates on an existing path.
- [ ] Extend off the Leaflet Path class instead of extending using the extend method (better typing / more readable)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See [`LICENSE`](https://github.com/hunter547/Leaflet.SmoothGeodesic/blob/main/LICENSE) for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Hunter Evanoff - hunter@evanoff.dev

Project Link: [https://github.com/hunter547/Leaflet.SmoothGeodesic](https://github.com/hunter547/Leaflet.SmoothGeodesice)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

This repo wouldn't be possible without the work of these repos:

- How to get under the hood of L.Path and customize it: [Leaflet.curve](https://github.com/onikiienko/Leaflet.curve)
- Geodesic calculations: [arc.js](https://github.com/springmeyer/arc.js/)

<p align="right">(<a href="#top">back to top</a>)</p>
