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
  const deleteForm = document.getElementById('deleteForm');
  const deleteCategoryIdInput = document.getElementById('deleteCategorieId');
  const errorTooltip = document.getElementById('error-tooltip');
  const successTooltip = document.getElementById('success-tooltip');
  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  ); // Modal close buttons

  // ============================
  // Utility Functions
  // ============================

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
      showTooltip('Le nom de la catégorie est requis.', 'error');
      event.preventDefault();
    } else {
      updateForm.submit();
    }
  }

  // Function to show a tooltip for success or error
  function showTooltip(message, type) {
    const tooltip = type === 'error' ? errorTooltip : successTooltip;
    tooltip.textContent = message;
    tooltip.style.display = 'block';
    tooltip.classList.remove('is-hidden');

    // Automatically hide tooltip after 5 seconds
    setTimeout(() => {
      tooltip.classList.add('is-hidden');
      if (type === 'success') {
        window.location.href = '/admin/categories';
      }
    }, 5000);
  }

  // Function to toggle modal visibility
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
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
          toggleModal(deleteModal, false);
          showTooltip('Catégorie supprimée avec succès.', 'success');
        })
        .catch((error) => {
          console.error('Erreur:', error);
          showTooltip(
            'Une erreur est survenue lors de la suppression.',
            'error'
          );
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
      toggleModal(deleteModal, true);
    });
  });

  // Handle deletion confirmation
  confirmDeleteBtn.addEventListener('click', handleCategoryDeletion);

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', function () {
      toggleModal(deleteModal, false);
    });
  });

  // ============================
  // Initialization
  // ============================

  // Ensure all critical DOM elements are present
  if (
    !createButton ||
    !updateButton ||
    !categoryNameInput ||
    !updateForm ||
    !deleteForm ||
    !deleteCategoryIdInput ||
    !errorTooltip ||
    !successTooltip ||
    !deleteModal ||
    !confirmDeleteBtn
  ) {
    console.warn('Some critical elements are missing in the DOM.');
    return;
  }
});
