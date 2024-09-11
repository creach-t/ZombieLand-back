document.addEventListener('DOMContentLoaded', function () {
  let initialFormValues = {};
  let ReviewIdToDelete = null;
  let currentReviewId = null;

  const searchInput = document.getElementById('search');
  const deleteModal = document.getElementById('deleteModal');
  const editConfirmModal = document.getElementById('editConfirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmEditBtn = document.getElementById('confirmEditBtn');
  const updateButton = document.getElementById('updateButton');
  const createButton = document.querySelector('#create-button');
  const deleteForm = document.getElementById('deleteForm');
  const deleteReviewId = document.getElementById('deleteReviewId');
  const updateForm = document.getElementById('updateForm');
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  );
  const errorTooltip = document.getElementById('error-tooltip');
  const successTooltip = document.getElementById('success-tooltip');

  if (errorTooltip && !errorTooltip.classList.contains('is-hidden')) {
    setTimeout(() => {
      errorTooltip.classList.add('is-hidden');
    }, 5000);
  }

  if (successTooltip && !successTooltip.classList.contains('is-hidden')) {
    setTimeout(() => {
      successTooltip.classList.add('is-hidden');
    }, 5000);
  }

  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  function setInitialFormValues() {
    const ReviewNameInput = document.getElementById('name');
    const ReviewAgeInput = document.getElementById('minimal_age');
    const ReviewCapacityInput = document.getElementById('capacity');
    const ReviewDescriptionShortInput =
      document.getElementById('description_short');
    const ReviewDescriptionInput = document.getElementById('description');
    const ReviewXInput = document.getElementById('x');
    const ReviewYInput = document.getElementById('y');

    const initialCheckedCategories = getCheckedCategories();

    initialFormValues = {
      ReviewName: ReviewNameInput.value,
      ReviewAge: ReviewAgeInput.value,
      ReviewCapacity: ReviewCapacityInput.value,
      ReviewDescriptionShort: ReviewDescriptionShortInput.value,
      ReviewDescription: ReviewDescriptionInput.value,
      ReviewX: ReviewXInput.value,
      ReviewY: ReviewYInput.value,
      categories: initialCheckedCategories,
    };
  }

  function hasFormChanged() {
    const ReviewNameInput = document.getElementById('name');
    const ReviewAgeInput = document.getElementById('minimal_age');
    const ReviewCapacityInput = document.getElementById('capacity');
    const ReviewDescriptionShortInput =
      document.getElementById('description_short');
    const ReviewDescriptionInput = document.getElementById('description');
    const ReviewXInput = document.getElementById('x');
    const ReviewYInput = document.getElementById('y');

    const currentCheckedCategories = getCheckedCategories();

    const categoriesChanged =
      JSON.stringify(currentCheckedCategories) !==
      JSON.stringify(initialFormValues.categories);

    return (
      ReviewNameInput.value !== initialFormValues.ReviewName ||
      ReviewAgeInput.value !== initialFormValues.ReviewAge ||
      ReviewCapacityInput.value !== initialFormValues.ReviewCapacity ||
      ReviewDescriptionShortInput.value !==
        initialFormValues.ReviewDescriptionShort ||
      ReviewDescriptionInput.value !== initialFormValues.ReviewDescription ||
      ReviewXInput.value !== initialFormValues.ReviewX ||
      ReviewYInput.value !== initialFormValues.ReviewY ||
      categoriesChanged
    );
  }

  function enableFormEditing(ReviewData) {
    const ReviewNameInput = document.getElementById('name');
    const ReviewAgeInput = document.getElementById('minimal_age');
    const ReviewCapacityInput = document.getElementById('capacity');
    const ReviewDescriptionShortInput =
      document.getElementById('description_short');
    const ReviewDescriptionInput = document.getElementById('description');
    const ReviewXInput = document.getElementById('x');
    const ReviewYInput = document.getElementById('y');
    const categoriesInput = document.getElementById('categories');

    const categories = ReviewData.categories.split(',');

    if (
      ReviewNameInput &&
      ReviewAgeInput &&
      ReviewCapacityInput &&
      ReviewDescriptionShortInput &&
      ReviewDescriptionInput &&
      ReviewXInput &&
      ReviewYInput &&
      categoriesInput
    ) {
      ReviewNameInput.disabled = false;
      ReviewAgeInput.disabled = false;
      ReviewCapacityInput.disabled = false;
      ReviewDescriptionShortInput.disabled = false;
      ReviewDescriptionInput.disabled = false;
      ReviewXInput.disabled = false;
      ReviewYInput.disabled = false;
      updateButton.disabled = false;
      categoriesInput.disabled = false;

      ReviewNameInput.value = ReviewData.name;
      ReviewAgeInput.value = ReviewData.minimal_age;
      ReviewCapacityInput.value = ReviewData.capacity;
      ReviewDescriptionShortInput.value = ReviewData.description_short;
      ReviewDescriptionInput.value = ReviewData.description;
      ReviewXInput.value = ReviewData.x;
      ReviewYInput.value = ReviewData.y;

      // Reset all checkboxes
      resetCategoryCheckboxes();

      // Check the checkboxes for the categories of the Review
      categories.forEach((category) => {
        const categoryCheckbox = document.getElementById(category);
        if (categoryCheckbox) {
          categoryCheckbox.checked = true;
        }
      });

      setInitialFormValues();
      currentReviewId = ReviewData.Review_id;
      updateForm.action = `/admin/update-Review/${currentReviewId}`;
    } else {
      console.warn('Champs de formulaire manquants.');
    }
  }

  function resetForm() {
    const ReviewNameInput = document.getElementById('name');
    const ReviewAgeInput = document.getElementById('minimal_age');
    const ReviewCapacityInput = document.getElementById('capacity');
    const ReviewDescriptionShortInput =
      document.getElementById('description_short');
    const ReviewDescriptionInput = document.getElementById('description');
    const ReviewXInput = document.getElementById('x');
    const ReviewYInput = document.getElementById('y');

    ReviewNameInput.value = '';
    ReviewAgeInput.value = '';
    ReviewCapacityInput.value = '';
    ReviewDescriptionShortInput.value = '';
    ReviewDescriptionInput.value = '';
    ReviewXInput.value = '';
    ReviewYInput.value = '';
    resetCategoryCheckboxes();
  }

  function resetCategoryCheckboxes() {
    const checkboxes = document.querySelectorAll(
      '#categories input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }

  function getCheckedCategories() {
    const checkedCategories = [];
    const checkboxes = document.querySelectorAll(
      '#categories input[type="checkbox"]:checked'
    );
    checkboxes.forEach((checkbox) => {
      const categoryId = checkbox.value;
      checkedCategories.push(categoryId);
    });
    return checkedCategories;
  }

  function handleDeleteReview(ReviewId) {
    console.log("Suppression du commentaire avec l'ID :", ReviewId);
    ReviewIdToDelete = ReviewId;
    toggleModal(deleteModal, true);
  }

  function filterReviews() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    document.querySelectorAll('.Review-item').forEach((item) => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  }

  // ============================

  // Event Handlers

  // Delete Review confirmation
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      if (ReviewIdToDelete) {
        deleteReviewId.value = ReviewIdToDelete;
        deleteForm.action = `/admin/delete-Review/${ReviewIdToDelete}`;
        deleteForm.submit();
      }
      toggleModal(deleteModal, false);
    });
  }

  // Confirm edit action
  if (confirmEditBtn) {
    confirmEditBtn.addEventListener('click', function () {
      if (updateForm) updateForm.submit();
      toggleModal(editConfirmModal, false);
    });
  }

  // Close modals on cancel or close button click
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', function () {
      toggleModal(button.closest('.modal'), false);
    });
  });

  // Search input filtering
  if (searchInput) {
    searchInput.addEventListener('keyup', filterReviews);
  }

  // Delete Review button click event
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      handleDeleteReview(this.getAttribute('data-Review_id'));
    });
  });

  // ============================
  // Initialization
  // ============================

  // Ensure all critical DOM elements are present
  if (
    !deleteModal ||
    !editConfirmModal ||
    !confirmDeleteBtn ||
    !confirmEditBtn ||
    !updateButton ||
    !deleteForm ||
    !deleteReviewId ||
    !updateForm
  ) {
    console.warn('Certains éléments nécessaires sont manquants dans le DOM.');
    return; // Stop script execution if critical elements are missing
  }
});
