// src/ViewModels/useBookTableLogic.ts
import { useState } from "react";

import { BookViewModel } from "./Bookview";
import { BookDTO } from "../../Data/Models/BookTO";

export const useBookTableLogic = (viewModel: BookViewModel) => {
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null);

  const handleEdit = (book: BookDTO) => {
    setSelectedBook(book); 
  };

  const handleDelete = async (bookId: number) => {
    await viewModel.doDeleteBook(bookId);
    alert("¿Desea Eliminar Libro?");
  };

  const closeModal = () => {
    setSelectedBook(null); 
  };

  return { selectedBook, handleEdit, handleDelete, closeModal };
};
