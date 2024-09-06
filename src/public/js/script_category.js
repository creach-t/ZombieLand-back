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
    tooltip.classList.remove('is-hidden');
    setTimeout(() => {
      tooltip.classList.add('is-hidden');
    }, 5000);
  }

  // Handle category deletion
  function handleCategoryDeletion(categoryId) {
    fetch(`/admin/delete-category/${categoryId}`, {
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
        showTooltip('Catégorie supprimée avec succès.', 'success');
        setTimeout(() => {
          window.location.reload(); // Reload page to reflect changes
        }, 1000);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        showTooltip('Une erreur est survenue lors de la suppression.', 'error');
      });
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
      const categoryId = this.getAttribute('data-category_id');
      handleCategoryDeletion(categoryId);
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
    !successTooltip
  ) {
    console.warn('Some critical elements are missing in the DOM.');
    return; // Stop script execution if critical elements are missing
  }
});
