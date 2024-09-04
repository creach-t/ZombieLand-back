document.addEventListener('DOMContentLoaded', function() {
  // Fonctionnalité de recherche
  const searchInput = document.getElementById('search');

  if (searchInput) {
    searchInput.addEventListener('keyup', function() {
      const filterValue = searchInput.value.toLowerCase();
      const reservationItems = document.querySelectorAll('.reservation-item');

      reservationItems.forEach(function(item) {
        const text = item.textContent.trim().toLowerCase();
        if (text.includes(filterValue)) {
          item.style.display = ''; // Afficher l'élément
        } else {
          item.style.display = 'none'; // Cacher l'élément
        }
      });
    });
  } else {
    console.warn('Élément de recherche introuvable.');
  }

  // Fonctionnalité de la modale de confirmation de suppression
  let reservationIdToDelete = null;
  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const modalCloseButton = deleteModal.querySelector('.delete');
  const modalCancelButton = deleteModal.querySelector('.modal-card-foot .button:not(.is-danger)');
  const deleteForm = document.getElementById('deleteForm');
  const bookingIdInput = document.getElementById('bookingIdInput');

  if (!deleteModal || !confirmDeleteBtn || !modalCloseButton || !modalCancelButton || !deleteForm || !bookingIdInput) {
    console.error('Erreur : Un ou plusieurs éléments de la modale ou du formulaire sont introuvables.');
    return;
  }

  // Fonction pour ouvrir la modale
  function openModal(reservationId) {
    reservationIdToDelete = reservationId;
    deleteModal.classList.add('is-active');
  }

  // Fonction pour fermer la modale
  function closeModal() {
    deleteModal.classList.remove('is-active');
    reservationIdToDelete = null;
  }

  // Attacher les écouteurs d'événements pour fermer la modale
  modalCloseButton.addEventListener('click', closeModal);
  modalCancelButton.addEventListener('click', closeModal);

  // Écouteur d'événements pour le bouton de confirmation de suppression
  confirmDeleteBtn.addEventListener('click', function() {
    if (reservationIdToDelete) {
      bookingIdInput.value = reservationIdToDelete;
      deleteForm.action = `/admin/delete-booking/${reservationIdToDelete}`;
      deleteForm.submit();
    }
    closeModal();
  });

  // Attacher les écouteurs d'événements à tous les boutons de suppression
  document.querySelectorAll('.button.is-danger').forEach(button => {
    button.addEventListener('click', function() {
      const reservationId = this.getAttribute('data-booking_id');
      openModal(reservationId);
    });
  });

  // Fonctionnalité d'édition
  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function() {
      // Récupérer les informations de réservation à partir des attributs de données
      const bookingId = this.getAttribute('data-booking-id');
      const clientEmail = this.getAttribute('data-client-email');
      const clientFirstName = this.getAttribute('data-client-first-name');
      const clientLastName = this.getAttribute('data-client-last-name');
      const bookingDate = this.getAttribute('data-booking-date');

      // Activer les champs de formulaire pour l'édition
      document.querySelector('select[name="user_id"]').disabled = false;
      document.getElementById('visitorCount').disabled = false;
      document.getElementById('stayDate').disabled = false;
      document.getElementById('updateReservationBtn').disabled = false;

      // Remplir les champs avec les informations de la réservation
      document.querySelector('select[name="user_id"]').value = bookingId;
      document.getElementById('visitorCount').value = 1; // Vous pouvez modifier cette valeur selon les informations de la réservation
      document.getElementById('stayDate').value = new Date(bookingDate).toISOString().split('T')[0];
      
      console.log(`Champs de formulaire activés pour l'édition de la réservation ID: ${bookingId}`);
    });
  });

});
