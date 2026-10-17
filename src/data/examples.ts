/**
 * Live demos listed in the examples gallery (/examples/).
 * The demos themselves are static apps under public/examples/ and keep their old URLs.
 */
export interface Marker {
  name: string;
  /** Printable image, under /public */
  image: string;
}

export interface Example {
  id: string;
  title: string;
  library: string;
  description: string;
  /** URL of the demo page */
  url: string;
  /** Source on GitHub */
  source: string;
  markers: Marker[];
  /**
   * Uses WebAssembly threads (SharedArrayBuffer). The page must be top-level and
   * cross-origin isolated, so the gallery opens it in a new tab instead of an iframe.
   */
  isolated?: boolean;
  /** Short hint shown under the description */
  note?: string;
}

const SRC = 'https://github.com/webarkit/webarkit.github.io/blob/master/public';

const PINBALL: Marker = { name: 'Pinball', image: '/examples/Data/pinball.jpg' };
const CHALK: Marker = { name: 'Chalk', image: '/examples/Data/chalk_multi.jpg' };
const KUVA: Marker = { name: 'Kuva', image: '/examples/Data/kuva.jpg' };

// Grouped by library, in alphabetical order: ARnft, jsartoolkitNFT, webarkit-testing.
// The home page shows the first four.
export const EXAMPLES: Example[] = [
  {
    id: 'arnft',
    title: 'ARnft + Three.js',
    library: 'ARnft',
    description: 'A red cube on the Pinball image, driven by ARnft events.',
    url: '/examples/arNFT_example.html',
    source: `${SRC}/examples/arNFT_example.html`,
    markers: [PINBALL],
  },
  {
    id: 'nft-es6',
    title: 'NFT tracking, ES6 modules',
    library: 'jsartoolkitNFT',
    description:
      'Tracks the Pinball image and anchors a sphere on it, using the ES6 module build of jsartoolkitNFT and Three.js.',
    url: '/examples/ARToolkitNFT_ES6_example.html',
    source: `${SRC}/examples/ARToolkitNFT_ES6_example.html`,
    markers: [PINBALL],
  },
  {
    id: 'nft-threads',
    title: 'NFT tracking with threads',
    library: 'jsartoolkitNFT',
    description:
      'The same demo on WebAssembly threads (pthreads), served with COOP/COEP headers for cross-origin isolation.',
    url: '/examples/ARToolkitNFT_ES6_threading_example.html',
    source: `${SRC}/examples/ARToolkitNFT_ES6_threading_example.html`,
    markers: [PINBALL],
    isolated: true,
    note: 'Opens in a new tab: threads need a cross-origin isolated page.',
  },
  {
    id: 'multi-nft',
    title: 'Multi-NFT, ES6 modules',
    library: 'jsartoolkitNFT',
    description:
      'Three NFT markers loaded together, each with its own 3D shape: a sphere on Pinball, a cube on Chalk and a cone on Kuva.',
    url: '/examples/ARtoolkitNFT_multi_ES6_example.html',
    source: `${SRC}/examples/ARtoolkitNFT_multi_ES6_example.html`,
    markers: [PINBALL, CHALK, KUVA],
  },
  {
    id: 'feature-trackers',
    title: 'Feature trackers: FREAK, ORB, AKAZE, TEBLID',
    library: 'webarkit-testing',
    description:
      'Experimental feature-based trackers from webarkit-testing. Wait until a blue rectangle appears around the image.',
    url: '/examples/webarkit-testing/feature_trackers_example.html',
    source: 'https://github.com/webarkit/webarkit-testing',
    markers: [PINBALL],
    note: 'Works best on desktop for now.',
  },
  {
    id: 'teblid-three',
    title: 'TEBLID tracker + Three.js',
    library: 'webarkit-testing',
    description: 'The TEBLID tracker with a GL right-handed pose matrix, rendering a Three.js scene.',
    url: '/examples/webarkit-testing/threejs_teblid_webcam_ES6_example.html',
    source: 'https://github.com/webarkit/webarkit-testing',
    markers: [PINBALL],
    note: 'Works best on desktop for now. Hold the camera very close to the Pinball marker.',
  },
];
