document.addEventListener('DOMContentLoaded', function() {
    console.log("Page loaded"); // Debug log
    document.getElementById('currentDate').textContent = getCurrentDate();
    loadSales();
    
    // Add event listener to the button
    document.querySelector('.sales-form button').addEventListener('click', addSale);
    
    // Also allow Enter key to add sales
    document.getElementById('saleAmount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSale();
        }
    });
});

function getCurrentDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
}

let sales = [];

function addSale() {
    const amountInput = document.getElementById('saleAmount');
    const amount = parseFloat(amountInput.value);
    
    console.log("Add sale clicked, amount:", amount); // Debug log
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than 0');
        amountInput.focus();
        return;
    }
    
    const newSale = {
        amount: amount,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    sales.push(newSale);
    console.log("New sale added:", newSale); // Debug log
    console.log("All sales:", sales); // Debug log
    
    updateSalesList();
    amountInput.value = '';
    amountInput.focus();
}

// ... rest of the script.js remains the same ...