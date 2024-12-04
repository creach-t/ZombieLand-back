document.addEventListener('DOMContentLoaded', function () {
  // ============================
  // Initial Setup and Variables
  // ============================

  // Variables
  let initialFormValues = {};
  let priceIdToDelete = null;
  let currentPriceId = null;

  // DOM Elements
  const searchInput = document.getElementById('search');
  const priceInput = document.getElementById('price');
  const activePriceInput = document.getElementById('isActive');
  const deleteModal = document.getElementById('deleteModal');
  const editConfirmModal = document.getElementById('editConfirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmEditBtn = document.getElementById('confirmEditBtn');
  const updateButton = document.getElementById('updateButton');
  const createButton = document.querySelector('#create-button');
  const deleteForm = document.getElementById('deleteForm');
  const deletePriceId = document.getElementById('deletePriceId');
  const updateForm = document.getElementById('updateForm');
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  );
  const errorTooltip = document.getElementById('error-tooltip');
  const successTooltip = document.getElementById('success-tooltip');

  // ============================
  // Error and Success Handling
  // ============================

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

  // ============================
  // Utility Functions
  // ============================

  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  function hasFormChanged() {
    const priceInput = document.getElementById('price');
    const activePriceInput = document.getElementById('isActive');

    if (!priceInput) {
      console.warn('Form fields are missing.');
      return false;
    }

    return (
      priceInput.value !== initialFormValues.price ||
      activePriceInput.checked !== initialFormValues.is_active
    );
  }

  function enableFormEditing(priceData) {
    const priceInput = document.getElementById('price');
    const activePriceInput = document.getElementById('isActive');

    if (priceInput && activePriceInput && updateButton) {
      priceInput.disabled = false;
      activePriceInput.disabled = false;
      updateButton.disabled = false;

      priceInput.value = priceData.price;
      activePriceInput.checked = priceData.is_active === 'true' ? true : false;
      activePriceInput.value = activePriceInput.checked;

      initialFormValues = {
        price: priceInput.value,
        is_active: activePriceInput.checked,
      };

      currentPriceId = priceData.id;
      updateForm.action = `/admin/update-price/${currentPriceId}`;
    } else {
      console.warn(
        'Unable to activate editing; some form elements are missing.'
      );
    }
  }

  function filterPrices() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    document.querySelectorAll('.price-item').forEach((item) => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  }

  // ============================
  // Event Handlers
  // ============================

  // Delete price confirmation
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      if (priceIdToDelete) {
        deletePriceId.value = priceIdToDelete;
        deleteForm.action = `/admin/delete-price/${priceIdToDelete}`;
        deleteForm.submit();
      }
      toggleModal(deleteModal, false);
    });
  }

  // Confirm edit action
  if (confirmEditBtn) {
    confirmEditBtn.addEventListener('click', function () {
      if (updateForm) {
        updateForm.submit();
      }
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
    searchInput.addEventListener('keyup', filterPrices);
  }

  // Edit price button click event
  document.querySelectorAll('.edit-button').forEach((button) => {
    button.addEventListener('click', function () {
      const priceData = {
        id: this.getAttribute('data-price-id'),
        price: this.getAttribute('data-price'),
        is_active: this.getAttribute('data-is-active'),
      };

      enableFormEditing(priceData);
    });
  });

  // Update button click event
  if (updateButton) {
    updateButton.addEventListener('click', function (event) {
      event.preventDefault();
      if (!currentPriceId) {
        if (errorTooltip) {
          errorTooltip.textContent =
            'Veuillez sélectionner un prix à modifier.';
          errorTooltip.classList.remove('is-hidden');

          setTimeout(() => {
            errorTooltip.classList.add('is-hidden');
          }, 5000);
        }
        return;
      }

      if (hasFormChanged()) {
        toggleModal(editConfirmModal, true);
      } else {
        if (errorTooltip) {
          errorTooltip.textContent = 'Aucune modification détectée.';
          errorTooltip.classList.remove('is-hidden');

          setTimeout(() => {
            errorTooltip.classList.add('is-hidden');
          }, 5000);
        }
      }
    });
  }

  if (createButton) {
    createButton.addEventListener('click', function () {
      if (priceInput && activePriceInput) {
        priceInput.disabled = false;
        activePriceInput.disabled = false;

        updateButton.disabled = false;
        updateButton.textContent = 'Créer un prix';

        updateForm.action = '/admin/create-price';

        updateButton.addEventListener('click', function () {
          toggleModal(editConfirmModal, true);
        });
      }
    });
  }

  // Delete price button click event
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      priceIdToDelete = this.getAttribute('data-price-id');
      toggleModal(deleteModal, true);
    });
  });

  // ============================
  // Initialization
  // ============================

  if (
    !deleteModal ||
    !editConfirmModal ||
    !confirmDeleteBtn ||
    !confirmEditBtn ||
    !updateButton ||
    !deleteForm ||
    !deletePriceId ||
    !updateForm ||
    !createButton ||
    !searchInput ||
    !priceInput
  ) {
    console.warn(
      'Some critical elements are missing in the DOM for booking panel admin.'
    );
    return; // Stop script execution if critical elements are missing
  }
});
