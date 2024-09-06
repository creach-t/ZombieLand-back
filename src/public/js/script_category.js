document.addEventListener('DOMContentLoaded', function () {
  let categoryIdToDelete = null; // Stocke l'ID de la catégorie à supprimer

  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelBtn = document.querySelector('.cancel');
  const modalCloseBtn = document.querySelector('.delete');

  // Ouvrir la modale au clic sur le bouton de suppression
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      categoryIdToDelete = this.getAttribute('data-category_id'); // Stocker l'ID de la catégorie
      toggleModal(deleteModal, true); // Ouvrir la modale
    });
  });

  // Confirmer la suppression
  confirmDeleteBtn.addEventListener('click', function () {
    if (categoryIdToDelete) {
      // Envoyer la requête DELETE
      fetch(`/admin/delete-category/${categoryIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erreur lors de la suppression');
          }
          return response.json();
        })
        .then((data) => {
          alert(data.message);
          window.location.reload(); // Recharger la page après suppression
        })
        .catch((error) => {
          console.error('Erreur:', error);
          alert('Une erreur est survenue lors de la suppression.');
        });

      toggleModal(deleteModal, false); // Fermer la modale
    }
  });

  // Fermer la modale (Annuler ou croix)
  cancelBtn.addEventListener('click', function () {
    toggleModal(deleteModal, false);
  });
  modalCloseBtn.addEventListener('click', function () {
    toggleModal(deleteModal, false);
  });

  // Fonction pour ouvrir/fermer la modale
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show);
    }
  }
});
