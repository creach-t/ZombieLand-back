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
    
    function setInitialFormValues() {
      const activityNameInput = document.getElementById('name');
      const activityAgeInput = document.getElementById('minimal_age');
      const activityCapacityInput = document.getElementById('capacity');
      const activityDescriptionShortInput = document.getElementById('description_short');
      const activityDescriptionInput = document.getElementById('description');
      const activityXInput = document.getElementById('x');
      const activityYInput = document.getElementById('y');

      const initialCheckedCategories = getCheckedCategories();
  
      initialFormValues = {
        activityName: activityNameInput.value,
        activityAge: activityAgeInput.value,
        activityCapacity: activityCapacityInput.value,
        activityDescriptionShort: activityDescriptionShortInput.value,
        activityDescription: activityDescriptionInput.value,
        activityX: activityXInput.value,
        activityY: activityYInput.value,
        categories: initialCheckedCategories,
      };
    }

    function hasFormChanged() {
      const activityNameInput = document.getElementById('name');
      const activityAgeInput = document.getElementById('minimal_age');
      const activityCapacityInput = document.getElementById('capacity');
      const activityDescriptionShortInput = document.getElementById('description_short');
      const activityDescriptionInput = document.getElementById('description');
      const activityXInput = document.getElementById('x');
      const activityYInput = document.getElementById('y');

      const currentCheckedCategories = getCheckedCategories();

      const categoriesChanged = JSON.stringify(currentCheckedCategories) !== JSON.stringify(initialFormValues.categories);
  
      return (
        activityNameInput.value !== initialFormValues.activityName ||
        activityAgeInput.value !== initialFormValues.activityAge ||
        activityCapacityInput.value !== initialFormValues.activityCapacity ||
        activityDescriptionShortInput.value !== initialFormValues.activityDescriptionShort ||
        activityDescriptionInput.value !== initialFormValues.activityDescription ||
        activityXInput.value !== initialFormValues.activityX ||
        activityYInput.value !== initialFormValues.activityY ||
        categoriesChanged
      );
            
    }
  
  
    function enableFormEditing(activityData) {
      const activityNameInput = document.getElementById('name');
      const activityAgeInput = document.getElementById('minimal_age');
      const activityCapacityInput = document.getElementById('capacity');
      const activityDescriptionShortInput = document.getElementById('description_short');
      const activityDescriptionInput = document.getElementById('description');
      const activityXInput = document.getElementById('x');
      const activityYInput = document.getElementById('y');
      const categoriesInput = document.getElementById('categories');
    

      const categories = activityData.categories.split(',');    
  
      if (activityNameInput && activityAgeInput && activityCapacityInput && activityDescriptionShortInput && activityDescriptionInput && activityXInput && activityYInput && categoriesInput) {
        activityNameInput.disabled = false;
        activityAgeInput.disabled = false;
        activityCapacityInput.disabled = false;
        activityDescriptionShortInput.disabled = false;
        activityDescriptionInput.disabled = false;
        activityXInput.disabled = false;
        activityYInput.disabled = false;
        updateButton.disabled = false;
        categoriesInput.disabled = false;
  
        activityNameInput.value = activityData.name;
        activityAgeInput.value = activityData.minimal_age;
        activityCapacityInput.value = activityData.capacity;
        activityDescriptionShortInput.value = activityData.description_short;
        activityDescriptionInput.value = activityData.description;
        activityXInput.value = activityData.x;
        activityYInput.value = activityData.y;

        // Reset all checkboxes
        resetCategoryCheckboxes();

        // Check the checkboxes for the categories of the activity
        categories.forEach(category => {
        const categoryCheckbox = document.getElementById(category);
            if (categoryCheckbox) {
                categoryCheckbox.checked = true;
            }
        });
  
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
      resetCategoryCheckboxes();
    }

    function resetCategoryCheckboxes() {
        const checkboxes = document.querySelectorAll('#categories input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.checked = false;
        });
      }

      function getCheckedCategories() {
        const checkedCategories = [];
        const checkboxes = document.querySelectorAll('#categories input[type="checkbox"]:checked');
        checkboxes.forEach(checkbox => {
          const categoryId = checkbox.value;
          checkedCategories.push(categoryId);
        });
        return checkedCategories;
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
        updateButton.textContent = 'Mettre à jour';
        const activityData = {
        activity_id: this.getAttribute('data-activity-id'),
        name: this.getAttribute('data-name'),
        minimal_age: this.getAttribute('data-minimal-age'),
        capacity: this.getAttribute('data-capacity'),
        description_short: this.getAttribute('data-description-short'),
        description: this.getAttribute('data-description'),
        x: this.getAttribute('data-x'),
        y: this.getAttribute('data-y'),
        categories: this.getAttribute('data-categories'),
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
          const checkedCategories = getCheckedCategories();

          let categoriesInput = document.getElementById('selectedCategories');

          if(!categoriesInput) { 
            categoriesInput = document.createElement('input');
            categoriesInput.setAttribute('type', 'hidden');
            categoriesInput.setAttribute('name', 'categories');
            categoriesInput.setAttribute('id', 'selectedCategories');
            updateForm.appendChild(categoriesInput);
          }

          categoriesInput.value = JSON.stringify(checkedCategories);

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
        const categoriesInputs = document.getElementById('categories')
  
        if (activityNameInput && activityAgeInput && activityCapacityInput && activityDescriptionShortInput && activityDescriptionInput && activityXInput && activityYInput && categoriesInputs) {
          resetForm();
          activityNameInput.disabled = false;
          activityAgeInput.disabled = false;
          activityCapacityInput.disabled = false;
          activityDescriptionShortInput.disabled = false;
          activityDescriptionInput.disabled = false;
          activityXInput.disabled = false;
          activityYInput.disabled = false;
          categoriesInputs.disabled = false;
  
          updateButton.disabled = false;
          updateButton.textContent = 'Créer activité';
  
          updateForm.action = '/admin/create-activity';

          const checkedCategories = getCheckedCategories();
          let categoriesInput = document.getElementById('selectedCategories');

          if(!categoriesInput) { 
            categoriesInput = document.createElement('input');
            categoriesInput.setAttribute('type', 'hidden');
            categoriesInput.setAttribute('name', 'categories');
            categoriesInput.setAttribute('id', 'selectedCategories');
            updateForm.appendChild(categoriesInput);
          }

          categoriesInput.value = JSON.stringify(checkedCategories);
  
          updateButton.addEventListener('click', function() {
            const checkedCategories = getCheckedCategories();
            let categoriesInput = document.getElementById('selectedCategories');

            if(!categoriesInput) { 
              categoriesInput = document.createElement('input');
              categoriesInput.setAttribute('type', 'hidden');
              categoriesInput.setAttribute('name', 'categories');
              categoriesInput.setAttribute('id', 'selectedCategories');
              updateForm.appendChild(categoriesInput);
            }

            categoriesInput.value = JSON.stringify(checkedCategories);
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