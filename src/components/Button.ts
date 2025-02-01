import styled from "styled-components";

//vamos a crear un componente basado en el elemento button de html pero con estilos

// Colores inspirados en Wallapop
const primaryColor = "#2DBE60"; // Verde Wallapop
const hoverColor = "#27A956";  // Verde más oscuro para hover

const Button = styled.button`
  background-color: ${primaryColor};
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: ${hoverColor};
    transform: scale(1.05);
  }

  &:active {
    background-color: ${hoverColor};
    transform: scale(0.95);
  }

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default Button;