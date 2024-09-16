document.addEventListener('DOMContentLoaded', function () {
  // ============================
  // Initial Setup and Variables
  // ============================

  // Variables
  let reviewIdToDelete = null;
  let reviewIdToValidate = null;

  // DOM Elements
  const searchInput = document.getElementById('searchInput');
  const deleteModal = document.getElementById('deleteModal');
  const validateModal = document.getElementById('validateModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmValidateBtn = document.getElementById('confirmValidateBtn');
  const deleteForm = document.getElementById('deleteForm');
  const updateForm = document.getElementById('updateForm');
  const deleteReviewId = document.getElementById('deleteReviewId');
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  );
  const reviewsList = document.getElementById('reviewsList');
  const reviewsItems = reviewsList
    ? reviewsList.querySelectorAll('.review-item')
    : [];

  // ============================
  // Utility Functions
  // ============================

  // Function to toggle modal visibility
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  // Function to filter reviews based on search input
  function filterReviews() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    reviewsItems.forEach((item) => {
      const reviewContent = item
        .getAttribute('data-review-content')
        .toLowerCase();
      const reviewClient = item
        .getAttribute('data-review-client')
        .toLowerCase();

      // Vérification si le contenu ou le client contient la recherche
      if (reviewContent.includes(query) || reviewClient.includes(query)) {
        item.style.display = ''; // Affiche l'élément
      } else {
        item.style.display = 'none'; // Cache l'élément
      }
    });
  }

  // ============================
  // Event Handlers
  // ============================

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
      reviewIdToDelete = this.getAttribute('data-review-id');
      toggleModal(deleteModal, true);
    });
  });

  // Attachement des événements aux boutons de validation
  document.querySelectorAll('.validate-button').forEach((button) => {
    button.addEventListener('click', function () {
      reviewIdToValidate = this.getAttribute('data-review-id');
      toggleModal(validateModal, true);
    });
  });

  // Search input filtering
  if (searchInput) {
    searchInput.addEventListener('input', filterReviews);
  }

  // ============================
  // Initialization and DOM checks
  // ============================

  // Vérifie que tous les éléments critiques du DOM sont présents
  if (
    !deleteModal ||
    !validateModal ||
    !confirmDeleteBtn ||
    !confirmValidateBtn ||
    !deleteForm ||
    !updateForm ||
    !searchInput ||
    reviewsItems.length === 0
  ) {
    console.warn('Certains éléments critiques du DOM sont manquants.');
    return; // Stop script execution si des éléments critiques manquent
  }
});
