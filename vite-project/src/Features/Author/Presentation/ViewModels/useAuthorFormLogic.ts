import { useState } from "react";
import { runInAction } from "mobx";
import { AuthorViewModel } from "./Authorview";


export const useAuthorFormLogic = (viewModel: AuthorViewModel) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await viewModel.doCreateAuthor();

    if (viewModel.isValid) {
      await viewModel.loadAuthors();
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
        runInAction(() => (viewModel.isValid = false));
      }, 5000);
    }
  };

  return {
    handleSubmit,
    showSuccessMessage,
  };
};
