import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: Props) {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-purple-500 to-indigo-600 p-6 text-gray-900">
        <h2>{title}</h2>
        {children}
      </main>
      <Footer />
    </div>
  );
}
