/**
 * Packages and tools shown in the "Ecosystem" grid on the home page.
 * Keep descriptions to one sentence. `docs` points into /docs once a page exists.
 */
export type Category = 'tracking' | 'cv' | 'tool';

export interface EcosystemItem {
  name: string;
  category: Category;
  status?: 'next' | 'experimental';
  description: string;
  tags: string[];
  install?: string;
  repo?: string;
  docs?: string;
  app?: string;
}

export const CATEGORY_LABEL: Record<Category, string> = {
  tracking: 'Tracking',
  cv: 'CV core',
  tool: 'Tool',
};

export const ECOSYSTEM: EcosystemItem[] = [
  {
    name: 'jsartoolkitNFT',
    category: 'tracking',
    description:
      'Emscripten port of WebARKitLib: NFT image tracking compiled to WebAssembly, with TypeScript types, SIMD and experimental threaded builds.',
    tags: ['WASM', 'TypeScript'],
    install: 'npm i @webarkit/jsartoolkit-nft',
    repo: 'https://github.com/webarkit/jsartoolkitNFT',
    docs: '/docs/libraries/jsartoolkitnft/',
  },
  {
    name: 'ARnft',
    category: 'tracking',
    description:
      'A small JavaScript library for NFT WebAR, built on jsartoolkitNFT: tracking in a Web Worker, SIMD and Three.js rendering.',
    tags: ['TypeScript', 'Three.js'],
    install: 'npm i @webarkit/ar-nft',
    repo: 'https://github.com/webarkit/ARnft',
    docs: '/docs/libraries/arnft/',
  },
  {
    name: 'nft-tracker',
    category: 'tracking',
    status: 'next',
    description:
      'Natural-feature tracking for planar image targets, in TypeScript, with the new .wnft marker format. Pre-release, not on npm yet.',
    tags: ['TypeScript', '.wnft'],
    repo: 'https://github.com/webarkit/webarkit/tree/master/packages/nft-tracker',
  },
  {
    name: 'WebARKitLib-rs',
    category: 'cv',
    description:
      'A memory-safe Rust port of WebARKitLib (ARToolKit): the full NFT tracking engine, for native targets and WebAssembly.',
    tags: ['Rust', 'WASM'],
    install: 'cargo add webarkitlib-rs',
    repo: 'https://github.com/webarkit/WebARKitLib-rs',
  },
  {
    name: 'purecv',
    category: 'cv',
    description:
      'A pure-Rust reimplementation of OpenCV modules: memory-safe, SIMD-accelerated, portable from WebAssembly to no_std.',
    tags: ['Rust', 'SIMD'],
    install: 'cargo add purecv',
    repo: 'https://github.com/webarkit/purecv',
  },
  {
    name: 'jsfeatNext',
    category: 'cv',
    description:
      'A TypeScript port of jsfeat: FAST and ORB features, matching, homography and pose estimation, with full type definitions.',
    tags: ['TypeScript'],
    install: 'npm i @webarkit/jsfeat-next',
    repo: 'https://github.com/webarkit/jsfeatNext',
  },
  {
    name: 'NFT Marker Creator',
    category: 'tool',
    description:
      'Turn any image into an NFT marker in your browser, nothing uploaded. Also a threaded Node.js app, a Python package and a Docker image.',
    tags: ['Web app', 'Node.js', 'Python', 'Docker'],
    app: '/tools/NFT_Marker_Creator/',
    docs: '/docs/tools/nft-marker-creator/',
  },
  {
    name: 'FeatureSet Display',
    category: 'tool',
    description:
      'Inspect the feature points of a marker to see how well it will track before you print it.',
    tags: ['Web app'],
    app: '/tools/FeatureSet-Display/',
    docs: '/docs/tools/featureset-display/',
  },
];
