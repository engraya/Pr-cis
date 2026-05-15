import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-200">
      <Header />
      <main className="flex-1 pt-16 md:pt-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
