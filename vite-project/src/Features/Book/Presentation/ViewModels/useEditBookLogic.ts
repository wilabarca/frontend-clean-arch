
import { useState } from "react";
import { BookViewModel } from "./Bookview";
import { BookDTO } from "../../Data/Models/BookTO";


export const useEditBookLogic = (viewModel: BookViewModel, book: BookDTO, onClose: () => void) => {
  const [updatedBook, setUpdatedBook] = useState<BookDTO>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await viewModel.doUpdateBook(updatedBook); 
    onClose(); 
    alert("¡El libro ha sido actualizado exitosamente!"); 
  };

  return { updatedBook, handleChange, handleSave };
};
