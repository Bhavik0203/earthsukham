import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Post Your Property Free in Pune | Get Genuine Buyers' },
  description:
    'List your property for free on PropertyDrone Realty. Reach genuine buyers & investors across Pune. Quick & easy listing process.',
  keywords: [
    'post property free Pune',
    'list property Pune',
    'sell property Pune',
    'property listing PropertyDrone',
  ],
  alternates: {
    canonical: 'https://propertydronerealty.com/post-property',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function PostPropertyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
