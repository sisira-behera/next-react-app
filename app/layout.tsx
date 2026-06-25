
import { AuthProvider } from './providers';
import Breadcrumbs from './components/share/breadcrumb/breadcrumb';
import './globals.css';

export default function RootLayout({ 
  children
}: { 
  children: React.ReactNode;
}) {
  return (
    <>
    { /* This is commented out because the CartProvider is not currently being used.
     If you want to use it, uncomment this line and the closing tag below.
     <CartProvider> */ }
      <AuthProvider>
        <Breadcrumbs />
        {children}
      </AuthProvider>
    { /* </CartProvider> */ }
   </>
  );
}
