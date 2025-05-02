// START: Simulated Data Store for Admin Panel

// Initialize mock seller and listing data if it doesn't exist
if (!localStorage.getItem('sellers')) {
  localStorage.setItem('sellers', JSON.stringify([
    { id: 1, name: 'JaneDoeNursery', status: 'pending' },
    { id: 2, name: 'TinyAngels', status: 'pending' }
  ]));
}

if (!localStorage.getItem('listings')) {
  localStorage.setItem('listings', JSON.stringify([
    { id: 101, name: 'Sweet Baby Emma', status: 'pending' },
    { id: 102, name: 'Little Star Boy', status: 'pending' }
  ]));
}

function getSellers() {
  return JSON.parse(localStorage.getItem('sellers')) || [];
}

function updateSeller(id, newStatus) {
  const sellers = getSellers().map(seller =>
    seller.id === id ? { ...seller, status: newStatus } : seller
  );
  localStorage.setItem('sellers', JSON.stringify(sellers));
  renderSellers();
}

function getListings() {
  return JSON.parse(localStorage.getItem('listings')) || [];
}

function updateListing(id, newStatus) {
  const listings = getListings().map(listing =>
    listing.id === id ? { ...listing, status: newStatus } : listing
  );
  localStorage.setItem('listings', JSON.stringify(listings));
  renderListings();
}

function renderSellers() {
  const container = document.getElementById('sellerList');
  container.innerHTML = '';
  getSellers().forEach(seller => {
    if (seller.status === 'pending') {
      const card = document.createElement('div');
      card.className = 'admin-card';
      card.innerHTML = `
        <p><strong>Seller:</strong> ${seller.name}</p>
        <button onclick="updateSeller(${seller.id}, 'approved')">Approve</button>
        <button onclick="updateSeller(${seller.id}, 'rejected')">Reject</button>
      `;
      container.appendChild(card);
    }
  });
}

function renderListings() {
  const container = document.getElementById('listingList');
  container.innerHTML = '';
  getListings().forEach(listing => {
    if (listing.status === 'pending') {
      const card = document.createElement('div');
      card.className = 'admin-card';
      card.innerHTML = `
        <p><strong>Doll:</strong> ${listing.name}</p>
        <button onclick="updateListing(${listing.id}, 'approved')">Approve</button>
        <button onclick="updateListing(${listing.id}, 'rejected')">Reject</button>
        <button onclick="updateListing(${listing.id}, 'sold')">Mark Sold</button>
        <button onclick="updateListing(${listing.id}, 'reserved')">Mark Reserved</button>
        <button onclick="updateListing(${listing.id}, 'available')">Mark Available</button>
      `;
      container.appendChild(card);
    }
  });
}

// Auto-render on load
window.addEventListener('DOMContentLoaded', () => {
  renderSellers();
  renderListings();
});
