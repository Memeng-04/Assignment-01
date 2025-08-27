// Elements and event listener
document.getElementById('generateButton').addEventListener('click', async () => {
  const button = document.getElementById('generateButton')
  const count = Number(document.getElementById('userCount').value)
  const nameOption = document.getElementById('nameOption').value
  const tableBody = document.getElementById('userTable')

  // Clear previous table rows
  tableBody.innerHTML = ''

  // Check if user input is valid
  if (!count || isNaN(count) || count < 0 || count > 1000) {
    alert("Please enter a valid number between 0 and 1000")
    return;
  }

  // Change button text to indicate loading
  const originalText = button.textContent
  button.textContent = "Loading..."
  button.disabled = true

   // Fetch users from the API
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`)
    if (!response.ok) {
      throw new Error("Please check your Wi-Fi connection")
    }
    const data = await response.json()

     // Create all rows first using map
    const rows = data.results.map(user => {
      const row = document.createElement('tr')
    
     // Decide which name to show
      const name = nameOption === 'first' ? user.name.first : user.name.last

     // Create and append individual cells
      const nameCell = document.createElement('td')
      nameCell.textContent = name
      row.appendChild(nameCell)

      const genderCell = document.createElement('td')
      genderCell.textContent = user.gender
      row.appendChild(genderCell)

      const emailCell = document.createElement('td')
      emailCell.textContent = user.email
      row.appendChild(emailCell)

      const countryCell = document.createElement('td')
      countryCell.textContent = user.location.country
      row.appendChild(countryCell)

      return row
    });

     // Append all rows to the table
    rows.forEach(row => tableBody.appendChild(row))


  } catch (error) {
    alert("Unable to load users. Please try again later.")
    console.error(error);
  } finally {
    // Restore original button text and enable it again
    button.textContent = originalText
    button.disabled = false
  }
});
