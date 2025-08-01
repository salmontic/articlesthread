// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
    loadSales();
    
    // Set up event listeners
    document.getElementById('addButton').addEventListener('click', addSale);
    document.getElementById('clearButton').addEventListener('click', clearSales);
    
    // Also allow Enter key to add sales
    document.getElementById('saleAmount').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addSale();
        }
    });
});

let sales = [];

function addSale() {
    const amountInput = document.getElementById('saleAmount');
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount greater than 0');
        return;
    }
    
    sales.push({
        amount: amount,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    
    updateSalesList();
    amountInput.value = '';
    amountInput.focus();
}

function updateSalesList() {
    const list = document.getElementById('salesList');
    const totalElement = document.getElementById('totalSales');
    
    list.innerHTML = '';
    let total = 0;
    
    sales.forEach((sale, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Sale #${index + 1}</span>
            <span>$${sale.amount.toFixed(2)}</span>
            <small>${sale.time}</small>
        `;
        list.appendChild(li);
        total += sale.amount;
    });
    
    totalElement.textContent = total.toFixed(2);
    saveSales();
}

function clearSales() {
    if (confirm('Are you sure you want to clear all sales?')) {
        sales = [];
        updateSalesList();
    }
}

function saveSales() {
    localStorage.setItem('dailySales', JSON.stringify(sales));
}

function loadSales() {
    const savedSales = localStorage.getItem('dailySales');
    if (savedSales) {
        sales = JSON.parse(savedSales);
        updateSalesList();
    }
}