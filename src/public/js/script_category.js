document.addEventListener('DOMContentLoaded', function () {
  // ============================
  // Initial Setup and Variables
  // ============================

  let categoryIdToDelete = null; // Variable pour stocker l'ID de la catégorie à supprimer

  // DOM Elements
  const deleteModal = document.getElementById('deleteModal'); // Modale de confirmation de suppression
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn'); // Bouton de confirmation de suppression
  const deleteForm = document.getElementById('deleteForm'); // Formulaire de suppression caché
  const deleteCategoryId = document.getElementById('deleteCategoryId'); // Champ caché pour l'ID de la catégorie
  const modalCloseButtons = document.querySelectorAll(
    '.delete, .cancel, .modal-background'
  ); // Boutons de fermeture de la modale

  // ============================
  // Utility Functions
  // ============================

  // Function to toggle modal visibility
  function toggleModal(modal, show) {
    if (modal) {
      modal.classList.toggle('is-active', show); // Ajoute ou retire la classe 'is-active' pour ouvrir ou fermer la modale
    }
  }

  // ============================
  // Event Handlers
  // ============================

  // Confirmation de la suppression de la catégorie
  confirmDeleteBtn.addEventListener('click', function () {
    if (categoryIdToDelete) {
      deleteCategoryId.value = categoryIdToDelete; // Assigne l'ID de la catégorie au champ caché du formulaire
      deleteForm.action = `/admin/delete-category/${categoryIdToDelete}`; // Définit l'action du formulaire
      deleteForm.submit(); // Soumet le formulaire pour supprimer la catégorie
    }
    toggleModal(deleteModal, false); // Ferme la modale après confirmation
  });

  // Ouverture de la modale lorsque l'utilisateur clique sur un bouton de suppression
  document.querySelectorAll('.delete-button').forEach((button) => {
    button.addEventListener('click', function () {
      categoryIdToDelete = this.getAttribute('data-category_id'); // Récupère l'ID de la catégorie à supprimer
      toggleModal(deleteModal, true); // Ouvre la modale de confirmation
    });
  });

  // Fermeture de la modale lorsque l'utilisateur clique sur la croix, "Annuler", ou l'arrière-plan
  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', function () {
      toggleModal(deleteModal, false); // Ferme la modale
    });
  });

  // ============================
  // Initialization
  // ============================

  // Vérification que les éléments critiques du DOM sont présents
  if (!deleteModal || !confirmDeleteBtn || !deleteForm || !deleteCategoryId) {
    console.warn('Certains éléments nécessaires sont manquants dans le DOM.');
    return; // Arrête l'exécution du script si des éléments manquent
  }
});
