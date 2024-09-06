document.addEventListener('DOMContentLoaded', function () {
  // ============================
  // Variables
  // ============================
  let currentCategoryId = null;
  let categoryIdToDelete = null;

  // DOM Elements
  const createButton = document.getElementById('create-button');
  const updateButton = document.getElementById('updateButton');
  const categoryNameInput = document.querySelector(
    'input[name="name_category"]'
  );
  const updateForm = document.getElementById('updateForm');
  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const deleteForm = document.getElementById('deleteForm');
  const deleteCategoryIdInput = document.getElementById('deleteCategorieId');
  const successModal = document.getElementById('successModal');
  const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  );

  // ============================
  // Utility Functions
  // ============================

  // Toggle modal visibility
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  // Enable form for creating or updating a category
  function enableCategoryForm(action, categoryName = '', categoryId = null) {
    categoryNameInput.disabled = false;
    categoryNameInput.value = categoryName;
    updateButton.textContent =
      action === 'create' ? 'Créer une catégorie' : 'Mettre à jour';
    updateButton.disabled = false;
    updateForm.action =
      action === 'create'
        ? '/admin/create-category'
        : `/admin/update-category/${categoryId}`;
  }

  // Handle form submission for creating or updating a category
  function handleFormSubmission(event) {
    if (categoryNameInput.value.trim() === '') {
      alert('Le nom de la catégorie est requis.');
      event.preventDefault();
    } else {
      updateForm.submit();
    }
  }

  // Handle category deletion
  function handleCategoryDeletion() {
    if (categoryIdToDelete) {
      fetch(`/admin/delete-category/${categoryIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error('Erreur lors de la suppression');
          return response.json();
        })
        .then((data) => {
          toggleModal(deleteModal, false); // Fermer la modale de confirmation
          toggleModal(successModal, true); // Ouvrir la modale de succès
        })
        .catch((error) => {
          console.error('Erreur:', error);
          alert('Une erreur est survenue lors de la suppression.');
        });
    }
  }

  // ============================
  // Event Handlers
  // ============================

  // Handle click on "Créer une nouvelle catégorie"
  createButton.addEventListener('click', () => enableCategoryForm('create'));

  // Handle click on "Modifier la catégorie"
  document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', function () {
      const categoryId = this.getAttribute('data-category_id');
      const categoryName = this.getAttribute('data-category_name');
      enableCategoryForm('update', categoryName, categoryId);
    });
  });

  // Handle form submission
  updateButton.addEventListener('click', handleFormSubmission);

  // Handle click on "Supprimer la catégorie"
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      categoryIdToDelete = this.getAttribute('data-category_id');
      deleteCategoryIdInput.value = categoryIdToDelete;
      toggleModal(deleteModal, true);
    });
  });

  // Handle deletion confirmation
  confirmDeleteBtn.addEventListener('click', handleCategoryDeletion);

  // Close success modal
  closeSuccessModalBtn.addEventListener('click', function () {
    toggleModal(successModal, false);
    window.location.reload(); // Recharger la page après la fermeture de la modale de succès
  });

  // Close modals on cancel or close button click
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => toggleModal(deleteModal, false));
  });
});
