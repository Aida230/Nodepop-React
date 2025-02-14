import React from "react";

const Error404: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <p className="mb-6 text-2xl text-gray-600">Página no encontrada</p>
      <p className="mb-8 text-gray-500">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <a
        href="/"
        className="rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-700"
      >
        Volver a la página principal
      </a>
    </div>
  );
};

export default Error404;
