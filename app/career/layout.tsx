import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Careers in Real Estate Pune | PropertyDrone' },
  description:
    'Join PropertyDrone Realty and grow your career in sales, marketing & consulting. Apply now for exciting opportunities.',
  keywords: [
    'real estate jobs Pune',
    'career in real estate',
    'PropertyDrone Realty careers',
    'real estate sales jobs Pune',
  ],
  alternates: {
    canonical: 'https://propertydronerealty.com/career',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CareerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
