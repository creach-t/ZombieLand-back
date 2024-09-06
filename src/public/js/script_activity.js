document.addEventListener('DOMContentLoaded', function() {
    let initialFormValues = {};
    let activityIdToDelete = null;
    let currentActivityId = null;
  
    const searchInput = document.getElementById('search');
    const deleteModal = document.getElementById('deleteModal');
    const editConfirmModal = document.getElementById('editConfirmModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const confirmEditBtn = document.getElementById('confirmEditBtn');
    const updateButton = document.getElementById('updateButton');
    const createButton = document.querySelector('#create-button');
    const deleteForm = document.getElementById('deleteForm');
    const deleteActivityId = document.getElementById('deleteActivityId');
    const updateForm = document.getElementById('updateForm');
    const modalCloseButtons = document.querySelectorAll('.delete, .cancel, .modal-background');
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
  
    function hasFormChanged() {
      const activityNameInput = document.getElementById('name');
      const activityAgeInput = document.getElementById('minimal_age');
      const activityCapacityInput = document.getElementById('capacity');
      const activityDescriptionShortInput = document.getElementById('description_short');
      const activityDescriptionInput = document.getElementById('description');
      const activityXInput = document.getElementById('x');
      const activityYInput = document.getElementById('y');
  
      return (
        activityNameInput.value !== initialFormValues.activityName ||
        activityAgeInput.value !== initialFormValues.activityAge ||
        activityCapacityInput.value !== initialFormValues.activityCapacity ||
        activityDescriptionShortInput.value !== initialFormValues.activityDescriptionShort ||
        activityDescriptionInput.value !== initialFormValues.activityDescription ||
        activityXInput.value !== initialFormValues.activityX ||
        activityYInput.value !== initialFormValues.activityY
      );
    }
  
    function setInitialFormValues() {
      const activityNameInput = document.getElementById('name');
      const activityAgeInput = document.getElementById('minimal_age');
      const activityCapacityInput = document.getElementById('capacity');
      const activityDescriptionShortInput = document.getElementById('description_short');
      const activityDescriptionInput = document.getElementById('description');
      const activityXInput = document.getElementById('x');
      const activityYInput = document.getElementById('y');
  
      initialFormValues = {
        activityName: activityNameInput.value,
        activityAge: activityAgeInput.value,
        activityCapacity: activityCapacityInput.value,
        activityDescriptionShort: activityDescriptionShortInput.value,
        activityDescription: activityDescriptionInput.value,
        activityX: activityXInput.value,
        activityY: activityYInput.value,
      };
    }
  
    function enableFormEditing(activityData) {
      const activityNameInput = document.getElementById('name');
      const activityAgeInput = document.getElementById('minimal_age');
      const activityCapacityInput = document.getElementById('capacity');
      const activityDescriptionShortInput = document.getElementById('description_short');
      const activityDescriptionInput = document.getElementById('description');
      const activityXInput = document.getElementById('x');
      const activityYInput = document.getElementById('y');
  
      if (activityNameInput && activityAgeInput && activityCapacityInput && activityDescriptionShortInput && activityDescriptionInput && activityXInput && activityYInput) {
        activityNameInput.disabled = false;
        activityAgeInput.disabled = false;
        activityCapacityInput.disabled = false;
        activityDescriptionShortInput.disabled = false;
        activityDescriptionInput.disabled = false;
        activityXInput.disabled = false;
        activityYInput.disabled = false;
        updateButton.disabled = false;
  
        activityNameInput.value = activityData.name;
        activityAgeInput.value = activityData.minimal_age;
        activityCapacityInput.value = activityData.capacity;
        activityDescriptionShortInput.value = activityData.description_short;
        activityDescriptionInput.value = activityData.description;
        activityXInput.value = activityData.x;
        activityYInput.value = activityData.y;
  
        setInitialFormValues();
        currentActivityId = activityData.activity_id;
        updateForm.action = `/admin/update-activity/${currentActivityId}`;
  
      } else {
        console.warn('Champs de formulaire manquants.');
      }
    }
  
    function resetForm() {
      const activityNameInput = document.getElementById('name');
      const activityAgeInput = document.getElementById('minimal_age');
      const activityCapacityInput = document.getElementById('capacity');
      const activityDescriptionShortInput = document.getElementById('description_short');
      const activityDescriptionInput = document.getElementById('description');
      const activityXInput = document.getElementById('x');
      const activityYInput = document.getElementById('y');
  
      activityNameInput.value = '';
      activityAgeInput.value = '';
      activityCapacityInput.value = '';
      activityDescriptionShortInput.value = '';
      activityDescriptionInput.value = '';
      activityXInput.value = '';
      activityYInput.value = '';
    }
    
    function handleDeleteActivity(activityId) {
      activityIdToDelete = activityId;
      toggleModal(deleteModal, true);
    }
  
    function filterActivities() {
      const query = searchInput ? searchInput.value.toLowerCase() : '';
      document.querySelectorAll('.activity-item').forEach(item => {
        const text = item.textContent.trim().toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    }
  
    // ============================
  
    // Event Handlers
  
    // Delete activity confirmation
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener('click', function() {
        if (activityIdToDelete) {
          deleteActivityId.value = activityIdToDelete;
          deleteForm.action = `/admin/delete-activity/${activityIdToDelete}`;
          deleteForm.submit();
        }
        toggleModal(deleteModal, false);
      });
    }
  
    // Confirm edit action
    if (confirmEditBtn) {
      confirmEditBtn.addEventListener('click', function() {
        if (updateForm) updateForm.submit();
        toggleModal(editConfirmModal, false);
      });
    }
  
    // Close modals on cancel or close button click
    modalCloseButtons.forEach(button => {
      button.addEventListener('click', function() {
        toggleModal(button.closest('.modal'), false);
      });
    });
  
    // Search input filtering
    if (searchInput) {
      searchInput.addEventListener('keyup', filterActivities);
    }
  
    // Edit activity button click event
    document.querySelectorAll('.edit-button').forEach(button => {
      button.addEventListener('click', function() {
        const activityData = {
          activity_id: this.getAttribute('data-activity-id'),
          name: this.getAttribute('data-name'),
          minimal_age: this.getAttribute('data-minimal-age'),
          capacity: this.getAttribute('data-capacity'),
          description_short: this.getAttribute('data-description-short'),
          description: this.getAttribute('data-description'),
          x: this.getAttribute('data-x'),
          y: this.getAttribute('data-y'),
        };
  
        enableFormEditing(activityData);
      });
    });
  
    // Update button click event
    if (updateButton) {
      updateButton.addEventListener('click', function(event) {
        event.preventDefault();
        if (!currentActivityId) {
          if (errorTooltip) {
            errorTooltip.textContent = 'Aucune activité sélectionnée pour la mise à jour.';
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
  
            // Masquer l'infobulle après 5 secondes
            setTimeout(() => {
              errorTooltip.classList.add('is-hidden');
            }, 5000);
          }
        }
      });
    }
  
    // Create activity button click event
    if (createButton) {
      createButton.addEventListener('click', function() {
        const activityNameInput = document.getElementById('name');
        const activityAgeInput = document.getElementById('minimal_age');
        const activityCapacityInput = document.getElementById('capacity');
        const activityDescriptionShortInput = document.getElementById('description_short');
        const activityDescriptionInput = document.getElementById('description');
        const activityXInput = document.getElementById('x');
        const activityYInput = document.getElementById('y');
  
        if (activityNameInput && activityAgeInput && activityCapacityInput && activityDescriptionShortInput && activityDescriptionInput && activityXInput && activityYInput) {
          resetForm();
          activityNameInput.disabled = false;
          activityAgeInput.disabled = false;
          activityCapacityInput.disabled = false;
          activityDescriptionShortInput.disabled = false;
          activityDescriptionInput.disabled = false;
          activityXInput.disabled = false;
          activityYInput.disabled = false;
  
          updateButton.disabled = false;
          updateButton.textContent = 'Créer activité';
  
          updateForm.action = '/admin/create-activity';
  
          updateButton.addEventListener('click', function() {
            toggleModal(editConfirmModal, true);
          });
        }      
      });
    }
  
    // Delete activity button click event
    document.querySelectorAll('.delete-button').forEach(button => {
      button.addEventListener('click', function() {
        handleDeleteActivity(this.getAttribute('data-activity-id'));
      });
    });
  
    // ============================
    // Initialization
    // ============================
  
    // Ensure all critical DOM elements are present
    if (!deleteModal || !editConfirmModal || !confirmDeleteBtn || !confirmEditBtn || !updateButton || !deleteForm || !deleteActivityId || !updateForm) {
      console.warn('Certains éléments nécessaires sont manquants dans le DOM.');
      return; // Stop script execution if critical elements are missing
    }
  });