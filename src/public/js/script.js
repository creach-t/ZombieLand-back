document.addEventListener('DOMContentLoaded', function() {
  // Variables
  let initialFormValues = {};
  let bookingIdToDelete = null;
  let currentBookingId = null;

  // DOM Elements
  const searchInput = document.getElementById('search');
  const deleteModal = document.getElementById('deleteModal');
  const editConfirmModal = document.getElementById('editConfirmModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const confirmEditBtn = document.getElementById('confirmEditBtn');
  const updateButton = document.getElementById('updateButton');
  const deleteForm = document.getElementById('deleteForm');
  const deleteBookingId = document.getElementById('deleteBookingId');
  const updateForm = document.getElementById('updateForm');
  const modalCloseButtons = document.querySelectorAll('.modal .delete, .modal-card-foot .button.cancel');

  // Vérification de la présence des éléments critiques
  if (!deleteModal || !editConfirmModal || !confirmDeleteBtn || !confirmEditBtn || !updateButton || !deleteForm || !deleteBookingId || !updateForm) {
    console.warn('Certains éléments nécessaires sont manquants dans le DOM.');
    return; // Arrête le script si des éléments nécessaires sont manquants
  }

  // Gestion de la recherche
  function filterReservations() {
    const query = searchInput.value.toLowerCase();
    document.querySelectorAll('.reservation-item').forEach(item => {
      const text = item.textContent.trim().toLowerCase();
      item.style.display = text.includes(query) ? '' : 'none';
    });
  }

  // Vérifier les changements de formulaire
  function hasFormChanged() {
    const clientSelect = document.getElementById('clientSelect');
    const visitorsInput = document.getElementById('visitors');
    const stayDateInput = document.getElementById('stayDate');

    if (!clientSelect || !visitorsInput || !stayDateInput) {
      console.warn('Champs de formulaire manquants.');
      return false;
    }

    return clientSelect.value !== initialFormValues.client || 
           visitorsInput.value !== initialFormValues.visitors || 
           stayDateInput.value !== initialFormValues.date;
  }

  // Activer l'édition de formulaire
  function enableFormEditing(bookingData) {
    const clientSelect = document.getElementById('clientSelect');
    const visitorsInput = document.getElementById('visitors');
    const stayDateInput = document.getElementById('stayDate');

    if (clientSelect && visitorsInput && stayDateInput && updateButton) {
      clientSelect.disabled = false;
      visitorsInput.disabled = false;
      stayDateInput.disabled = false;
      updateButton.disabled = false;

      clientSelect.value = bookingData.clientId;
      visitorsInput.value = bookingData.visitors;
      stayDateInput.value = new Date(bookingData.date).toISOString().split('T')[0];

      initialFormValues = {
        client: clientSelect.value,
        visitors: visitorsInput.value,
        date: stayDateInput.value
      };

      currentBookingId = bookingData.id;
      updateForm.action = `/admin/update-booking/${currentBookingId}`;
    } else {
      console.warn('Impossible d\'activer l\'édition, certains éléments du formulaire sont manquants.');
    }
  }

  // Gestion des modales
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }

  // Suppression
  confirmDeleteBtn.addEventListener('click', function() {
    if (bookingIdToDelete) {
      deleteBookingId.value = bookingIdToDelete;
      deleteForm.action = `/admin/delete-booking/${bookingIdToDelete}`;
      deleteForm.submit();
    }
    toggleModal(deleteModal, false);
  });

  // Enregistrement des modifications
  confirmEditBtn.addEventListener('click', function() {
    if (updateForm) updateForm.submit();
    toggleModal(editConfirmModal, false);
  });

  // Fermeture des modales
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', function() {
      toggleModal(button.closest('.modal'), false);
    });
  });

  // Recherche
  if (searchInput) {
    searchInput.addEventListener('keyup', filterReservations);
  } else {
    console.warn('Input de recherche manquant.');
  }

  // Édition de réservation
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function() {
      const bookingData = {
        id: this.getAttribute('data-booking-id'),
        clientId: this.getAttribute('data-client-id'),
        visitors: this.getAttribute('data-nb-tickets'),
        date: this.getAttribute('data-booking-date')
      };

      enableFormEditing(bookingData);
    });
  });

  // Mise à jour de la réservation
  updateButton.addEventListener('click', function(event) {
    event.preventDefault();
    if (hasFormChanged()) {
      toggleModal(editConfirmModal, true);
    } else {
      alert('Aucune modification détectée.');
    }
  });

  // Gestion de l'événement pour créer une nouvelle réservation
document.querySelector('#create-button').addEventListener('click', function() {
  // Vider les champs de formulaire
  document.getElementById('clientSelect').disabled = false;
  document.getElementById('clientSelect').value = ''; // Réinitialiser la sélection
  document.getElementById('visitors').disabled = false;
  document.getElementById('visitors').value = ''; // Réinitialiser le nombre de visiteurs
  document.getElementById('stayDate').disabled = false;
  document.getElementById('stayDate').value = ''; // Réinitialiser la date

  // Mettre à jour le bouton de formulaire
  const updateButton = document.getElementById('updateButton');
  updateButton.disabled = false;
  updateButton.textContent = 'Créer réservation'; // Changer le texte du bouton

  // Changer l'action du formulaire pour création
  updateForm.action = '/admin/create-booking'; // Assurez-vous que cette route existe sur le serveur

  confirmEditBtn.addEventListener('click', function() {
    // Vérifier l'action actuelle
    if (updateForm.action.includes('create-booking')) {
      // Logique pour créer une nouvelle réservation
      // Envoyer le formulaire au serveur avec l'action définie pour créer une nouvelle réservation
      updateForm.submit();
    } else {
      // Logique pour mettre à jour la réservation existante
      updateForm.submit();
    }
    closeModal(editConfirmModal);
});

  // Ouvrir la modale de confirmation pour la création
  updateButton.addEventListener('click', function() {
    openModal(editConfirmModal);
  });
});

  // Suppression de réservation
  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
      bookingIdToDelete = this.getAttribute('data-booking_id');
      toggleModal(deleteModal, true);
    });
  });
});
