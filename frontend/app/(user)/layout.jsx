import '../globals.css';
import LuxuryNavbar from './components/luxury-navbar';
export const metadata = {
  title: 'Geer Internship Assignment',
  description: 'Discover the finest luxury jewelry collection with timeless elegance and exceptional craftsmanship.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-poppins"><LuxuryNavbar />{children}</body>
    </html>
  );
}
