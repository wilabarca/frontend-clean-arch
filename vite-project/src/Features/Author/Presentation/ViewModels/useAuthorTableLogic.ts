import { AuthorDTO } from "../../Data/Models/AuthorTO";
import { AuthorViewModel } from "./Authorview";

export const useAuthorTableLogic = (viewModel: AuthorViewModel) => {
  const handleEdit = (author: AuthorDTO) => {
    viewModel.authorToEdit = author;
  };

  const handleDelete = async (authorId: number) => {
    const confirmDelete = window.confirm("¿Desea eliminar este autor?");
    if (confirmDelete) {
      await viewModel.doDeleteAuthor(authorId);
    }
  };

  const closeModal = () => {
    viewModel.authorToEdit = null;
  };

  const handleChange = (field: keyof AuthorDTO, value: string) => {
    viewModel.setAuthorToEditField(field, value);
  };

  const handleSave = () => {
    viewModel.saveEditedAuthor(closeModal);
  };

  return {
    handleEdit,
    handleDelete,
    closeModal,
    handleChange,
    handleSave
  };
};
