import Button from "./Button";

interface NewAdvertFormProps {
  name: string;
  setName: (value: string) => void;
  saleType: string;
  setSaleType: (value: string) => void;
  tag: string;
  setTag: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  photo: File | null;
  setPhoto: (value: File | null) => void;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
}

const availableTags = ["lifestyle", "mobile", "motor", "work"]; // Lista de tags disponibles

const NewAdvertForm = ({
  name,
  setName,
  saleType,
  setSaleType,
  tag,
  setTag,
  price,
  setPrice,
  setPhoto,
  error,
  handleSubmit,
}: NewAdvertFormProps) => {
  const isFormValid = name && saleType && tag && price; // Validación del formulario

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Mostrar mensaje de error si existe */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Input para el nombre */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* Selector de tipo de venta */}
      <select value={saleType} onChange={(e) => setSaleType(e.target.value)} className="w-full p-2 border rounded">
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>

      {/* Selector de tags */}
      <select value={tag} onChange={(e) => setTag(e.target.value)} className="w-full p-2 border rounded">
        <option value="">Select a tag</option>
        {availableTags.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {/* Input para el precio */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {/* Input para subir una foto */}
      <input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} className="w-full p-2 border rounded" />

      {/* Botón de envío */}
      <Button type="submit" disabled={!isFormValid} className="w-full p-2 rounded disabled:bg-gray-300">
        Create Advert
      </Button>
    </form>
  );
};

export default NewAdvertForm;