import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 p-6 text-gray-900">
        {children}
      </main>
      <Footer />
    </div>
  );
}
