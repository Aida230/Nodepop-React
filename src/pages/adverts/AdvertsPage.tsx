//import './AdvertsPage.css' creo que este no lo oy a utilizar, solo el module
import styles from './AdvertsPage.module.css'
//import clsx from 'clsx';
import Button from "../../components/Button.ts"

//vamos a crear un componente, que es una funcion con un nombre que se pueda reutilazar
const adverts = [
  {
    content:
    "Aida",
    userId: 1,
    id: 1,
  },
  {
    content:
    "Rober",
    userId: 1,
    id: 2,
  },
];

//pruebas de estilos de css

//const blue = true



function AdvertsPage() {
  return (
    //<div className={clsx("AdvertsPage", { blue })}>
    <div className={styles.AdvertsPage}>
      <h1 className="text-green-600">Adverts Page</h1>
      <ul style={{ color: "red" }}>
        {adverts.map((advert) => (
          <li key={advert.id}>{advert.content}</li>
        ))} 
      </ul>
      <Button onClick={() => {console.log("Cliked")}}>Click me!</Button>
    </div>
  )

}

export default AdvertsPage