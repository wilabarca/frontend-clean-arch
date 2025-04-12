import { useState } from "react";
import { runInAction } from "mobx";
import { BookViewModel } from "./Bookview";


export const useBookFormLogic = (viewModel: BookViewModel) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await viewModel.doCreateBook();

    if (viewModel.isValid) {
      await viewModel.loadBooks();
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        runInAction(() => (viewModel.isValid = false));
      }, 5000);
    }
  };

  return { showSuccessMessage, setShowSuccessMessage, handleSubmit };
};
