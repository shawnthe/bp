document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginCard = document.getElementById('login');
    const signupCard = document.getElementById('signup');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginSpin = document.getElementById('loginSpin');
    const signupSpin = document.getElementById('signupSpin');
    const dashboard = document.getElementById('dashboard');


    const modalEl = document.getElementById('successModal');
    const modal = new bootstrap.Modal(modalEl);
    const modalTitle = document.getElementById('modalTitle');
    const modalMsg = document.getElementById('modalMsg');
    const dashboardRedirect = document.getElementById('dashboardRedirect');


    document.querySelectorAll('.switch-form').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.target;
            document.querySelectorAll('.form').forEach(form => form.classList.remove('show'));
            document.getElementById(target).classList.add('show');
        });
    });


    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!loginForm.checkValidity()) {
            loginForm.classList.add('was-validated');
            return;
        }
        showLoading(loginBtn, loginSpin, true);
        setTimeout(() => {
            showLoading(loginBtn, loginSpin, false);
            showSuccess('Login Success!', 'Redirecting to dashboard...');
        }, 1500);
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!signupForm.checkValidity()) {
            signupForm.classList.add('was-validated');
            return;
        }
        showLoading(signupBtn, signupSpin, true);
        setTimeout(() => {
            const userData = {
                id: Date.now(),
                name: document.getElementById('signupName').value,
                email: document.getElementById('signupEmail').value,
                joined: new Date().toISOString(),
                role: 'user'
            };
            let users = JSON.parse(localStorage.getItem('users.json') || '[]');
            users.push(userData);
            localStorage.setItem('users.json', JSON.stringify(users, null, 2));
            
            showLoading(signupBtn, signupSpin, false);
            showSuccess('Account Created!', `User JSON saved! Welcome ${userData.name}`);
        }, 1500);
    });

    function showLoading(btn, spinner, show) {
        if (show) {
            spinner.classList.remove('d-none');
            btn.disabled = true;
        } else {
            spinner.classList.add('d-none');
            btn.disabled = false;
        }
    }

    function showSuccess(title, message) {
        modalTitle.textContent = title;
        modalMsg.textContent = message;
        modal.show();
    }

    dashboardRedirect.addEventListener('click', function() {
        modal.hide();
        dashboard.classList.remove('d-none');
        document.body.scrollTo(0, 0);
        initPieChart();
        showUserJson();
    });

    // Initialize Sales Distribution Pie Chart
    function initPieChart() {
        const ctx = document.getElementById('salesChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['North', 'South', 'East', 'West'],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' },
                    title: { display: true, text: 'Sales % by Region' }
                }
            }
        });
    }

    function showUserJson() {
        const users = JSON.parse(localStorage.getItem('users.json') || '[]');
        document.getElementById('jsonOutput').innerHTML = 
            '<h5>Saved Users (users.json):</h5><pre>' + JSON.stringify(users, null, 2) + '</pre>';
    }
});
