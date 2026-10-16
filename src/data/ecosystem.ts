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
      'ARToolKit NFT image tracking compiled to WebAssembly, with TypeScript types and threaded builds.',
    tags: ['WASM', 'TypeScript'],
    install: 'npm i @webarkit/jsartoolkit-nft',
    repo: 'https://github.com/webarkit/jsartoolkitNFT',
    docs: '/docs/libraries/jsartoolkitnft/',
  },
  {
    name: 'ARnft',
    category: 'tracking',
    description:
      'Event-driven NFT AR for the web, built on jsartoolkitNFT, with Three.js and A-Frame integrations.',
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
      'The next-generation NFT tracker in the webarkit monorepo, with the new .wnft marker format.',
    tags: ['TypeScript', '.wnft'],
    repo: 'https://github.com/webarkit/webarkit',
  },
  {
    name: 'WebARKitLib-rs',
    category: 'cv',
    description: 'The core tracking library, rewritten in Rust for native targets and WebAssembly.',
    tags: ['Rust', 'WASM'],
    install: 'cargo add webarkitlib-rs',
    repo: 'https://github.com/webarkit/WebARKitLib-rs',
  },
  {
    name: 'purecv',
    category: 'cv',
    description: 'Pure-Rust computer-vision primitives, tuned for WebAssembly SIMD.',
    tags: ['Rust', 'SIMD'],
    install: 'cargo add purecv',
    repo: 'https://github.com/webarkit/purecv',
  },
  {
    name: 'jsfeatNext',
    category: 'cv',
    description:
      'A modern TypeScript take on jsfeat: feature detection and descriptors for the browser.',
    tags: ['TypeScript'],
    install: 'npm i @webarkit/jsfeat-next',
    repo: 'https://github.com/webarkit/jsfeatNext',
  },
  {
    name: 'NFT Marker Creator',
    category: 'tool',
    description: 'Turn any image into an NFT marker, entirely in the browser. Nothing is uploaded.',
    tags: ['Web app'],
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
