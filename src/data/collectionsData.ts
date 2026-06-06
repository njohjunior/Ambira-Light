export interface LampProduct {
  id: string
  name: string
  tagline: string
  price: string
  imageOff: string
  imageOn: string
}

// Replace image paths with actual product photos when available.
const collectionsData: LampProduct[] = [
  {
    id: 'soko',
    name: 'Soko',
    tagline: 'Grounded in oak, lifted by light.',
    price: '€189',
    imageOff: '/images/collections/soko-off.webp',
    imageOn: '/images/collections/soko-on.webp',
  },
  {
    id: 'shizen',
    name: 'Shizen',
    tagline: 'Natural form, honest light.',
    price: '€219',
    imageOff: '/images/collections/shizen-off.webp',
    imageOn: '/images/collections/shizen-on.webp',
  },
  {
    id: 'mugen',
    name: 'Mugen',
    tagline: 'Light without limit, calm without end.',
    price: '€249',
    imageOff: '/images/collections/mugen-off.webp',
    imageOn: '/images/collections/mugen-on.webp',
  },
  {
    id: 'kira',
    name: 'Kira',
    tagline: 'A gentle gleam for quiet mornings.',
    price: '€199',
    imageOff: '/images/collections/kira-off.webp',
    imageOn: '/images/collections/kira-on.webp',
  },
  {
    id: 'hana',
    name: 'Hana',
    tagline: 'Where wood blooms into warmth.',
    price: '€229',
    imageOff: '/images/collections/hana-off.webp',
    imageOn: '/images/collections/hana-on.webp',
  },
  {
    id: 'nami',
    name: 'Nami',
    tagline: 'A ripple of light across the desk.',
    price: '€239',
    imageOff: '/images/collections/nami-off.webp',
    imageOn: '/images/collections/nami-on.webp',
  },
]

export default collectionsData
