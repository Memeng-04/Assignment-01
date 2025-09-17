const generateButton = document.getElementById('generateButton');
const tableBody = document.getElementById('userTable');
const nameOptionSelect = document.getElementById('nameOption');
const countInput = document.getElementById('userCount');

let users = [];
let selectedIndex = null;
const userModal = new bootstrap.Modal(document.getElementById('userModal'));

generateButton.addEventListener('click', async () => {
  const count = Number(countInput.value);
  if (isNaN(count) || count < 1 || count > 1000) return alert("Enter 1-1000");

  generateButton.textContent = "Loading...";
  generateButton.disabled = true;

  try {
    const res = await fetch(`http://localhost:3001/api?results=${count}`);
    const data = await res.json();
    users = data.results; 
    renderTable(nameOptionSelect.value);
  } catch (err) {
    console.error(err);
    alert("Error fetching users");
  } finally {
    generateButton.textContent = "Generate";
    generateButton.disabled = false;
  }
});

function renderTable(nameOption) {
  tableBody.innerHTML = '';
  if (!users.length) {
    tableBody.innerHTML = '<tr><td colspan="4">No users found</td></tr>';
    return;
  }

  users.forEach((user, i) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${nameOption === 'first' ? user.name.first : user.name.last}</td>
      <td>${user.gender}</td>
      <td>${user.email}</td>
      <td>${user.location.country}</td>
    `;
    row.addEventListener('dblclick', () => openModal(i));
    tableBody.appendChild(row);
  });
}

function openModal(i) {
  const u = users[i];
  selectedIndex = i;
  document.getElementById('userImage').src = u.picture.large;
  document.getElementById('modalName').textContent = `${u.name.title} ${u.name.first} ${u.name.last}`;
  document.getElementById('modalEmail').textContent = u.email;
  document.getElementById('modalGender').textContent = u.gender;
  document.getElementById('modalDob').textContent = new Date(u.dob.date).toLocaleDateString();
  document.getElementById('modalPhone').textContent = `${u.phone} / ${u.cell}`;
  document.getElementById('modalAddress').textContent = `${u.location.street.number} ${u.location.street.name}, ${u.location.city}, ${u.location.state}, ${u.location.country}, ${u.location.postcode}`;
  userModal.show();
}

document.getElementById('nameOption').addEventListener('change', () => {
  renderTable(nameOptionSelect.value);
});

  


