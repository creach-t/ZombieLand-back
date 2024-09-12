document.addEventListener('DOMContentLoaded', function () {
  let reviewIdToDelete = null;
  let reviewIdToValidate = null;

  const deleteModal = document.getElementById('deleteModal');
  const validateModal = document.getElementById('validateModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmValidateBtn = document.getElementById('confirmValidateBtn');
  const deleteForm = document.getElementById('deleteForm');
  const updateForm = document.getElementById('updateForm');
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  );

  // Fonction pour ouvrir et fermer une modale
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  // Fonction pour afficher la modale de suppression
  function handleDeleteReview(reviewId) {
    reviewIdToDelete = reviewId;
    toggleModal(deleteModal, true);
  }

  // Fonction pour afficher la modale de validation
  function handleValidateReview(reviewId) {
    reviewIdToValidate = reviewId;
    toggleModal(validateModal, true);
  }

  // Gestion de la confirmation de suppression
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      if (reviewIdToDelete) {
        deleteReviewId.value = reviewIdToDelete;
        deleteForm.action = `/admin/delete-review/${reviewIdToDelete}`;
        deleteForm.submit();
      }
      toggleModal(deleteModal, false);
    });
  }

  // Gestion de la confirmation de validation
  if (confirmValidateBtn) {
    confirmValidateBtn.addEventListener('click', function () {
      if (updateForm && reviewIdToValidate) {
        console.log(updateForm);
        updateForm.action = `/admin/update-review/${reviewIdToValidate}`;
        updateForm.submit();
      }
      toggleModal(validateModal, false);
    });
  }

  // Fermeture des modales sur clic des boutons "Annuler" ou "Fermer"
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', function () {
      toggleModal(button.closest('.modal'), false);
    });
  });

  // Attachement des événements aux boutons de suppression
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      handleDeleteReview(this.getAttribute('data-review-id'));
    });
  });

  // Attachement des événements aux boutons de validation
  document.querySelectorAll('.validate-button').forEach((button) => {
    button.addEventListener('click', function () {
      handleValidateReview(this.getAttribute('data-review-id'));
    });
  });
});
