import React from 'react';

const Error404: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-6">Página no encontrada</p>
      <p className="text-gray-500 mb-8">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded"
      >
        Volver a la página principal
      </a>
    </div>
  );
};

export default Error404;