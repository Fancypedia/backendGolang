document.getElementById('logoutButton').addEventListener('click', function () {
    // Redirect ke halaman login saat tombol keluar diklik
    window.location.href = 'index.html'; // Ganti dengan nama file halaman login yang sesuai
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:9000/userss')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Gagal mengambil data pengguna aktif');
            }
        })
        .then(data => {
            // Menampilkan jumlah pengguna aktif ke dalam elemen HTML
            const activeUsersCount = data.data.data.length;
            console.log('Jumlah pengguna aktif:', activeUsersCount);
            const activeUsersElement = document.getElementById('activeUsers');
            activeUsersElement.textContent = `Pengguna Aktif: ${activeUsersCount}`;
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:9000/userss')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Gagal mengambil data pengguna aktif');
            }
        })
        .then(data => {
            // Mendapatkan semua data pengguna aktif
            const usersData = data.data.data;

            // Membagi data pengguna menjadi dua kelompok: user dan admin
            const users = usersData.filter(userData => userData.user_type === 'USER');
            const admins = usersData.filter(userData => userData.user_type === 'ADMIN');

            // Mengambil referensi ke elemen tabel untuk pengguna
            const userTableBody = document.querySelector('#userTable tbody');

            // Iterasi melalui data pengguna dan tambahkan baris ke dalam tabel pengguna
            users.forEach(userData => {
                const row = userTableBody.insertRow();

                // Menambahkan data ke dalam baris tabel
                const firstNameCell = row.insertCell(0);
                firstNameCell.textContent = userData.first_name;

                const lastNameCell = row.insertCell(1);
                lastNameCell.textContent = userData.last_name;

                const emailCell = row.insertCell(2);
                emailCell.textContent = userData.email;

                const phoneCell = row.insertCell(3);
                phoneCell.textContent = userData.phone;

                const userTypeCell = row.insertCell(4);
                userTypeCell.textContent = userData.user_type;
            });

            // Mengambil referensi ke elemen tabel untuk admin
            const adminTableBody = document.querySelector('#adminTable tbody');

            // Iterasi melalui data admin dan tambahkan baris ke dalam tabel admin
            admins.forEach(adminData => {
                const row = adminTableBody.insertRow();

                // Menambahkan data ke dalam baris tabel
                const firstNameCell = row.insertCell(0);
                firstNameCell.textContent = adminData.first_name;

                const lastNameCell = row.insertCell(1);
                lastNameCell.textContent = adminData.last_name;

                const emailCell = row.insertCell(2);
                emailCell.textContent = adminData.email;

                const phoneCell = row.insertCell(3);
                phoneCell.textContent = adminData.phone;

                const userTypeCell = row.insertCell(4);
                userTypeCell.textContent = adminData.user_type;
            });
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:9000/userss')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Gagal mengambil data pengguna aktif');
            }
        })
        .then(data => {
            // Memisahkan admin dan user yang aktif
            const users = data.data.data;
            const activeAdmins = users.filter(user => user.user_type === "ADMIN");
            const activeUserss = users.filter(user => user.user_type === "USER");

            // Menampilkan jumlah pengguna aktif dan admin ke dalam elemen HTML
            const activeAdminsCount = activeAdmins.length;
            const activeUsersCount = activeUserss.length;
            console.log('Jumlah pengguna aktif:', activeUsersCount);
            console.log('Jumlah admin aktif:', activeAdminsCount);

            const activeUsersElement = document.getElementById('activeUsers');
            const activeAdminsElement = document.getElementById('activeAdmins');

            activeUsersElement.textContent = `Pengguna Aktif user: ${activeUsersCount}`;
            activeAdminsElement.textContent = `Admin Aktif: ${activeAdminsCount}`;
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
        });
});


document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:9000/userss')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Gagal mengambil data pengguna aktif');
            }
        })
        .then(data => {
            // Menampilkan jumlah pengguna aktif ke dalam elemen HTML
            const activeUsersCountt = data.data.data.length;
            console.log('Jumlah pengguna aktif all:', activeUsersCountt);
            const activeUsersElementr = document.getElementById('ss');
            activeUsersElementr.textContent = `Pengguna Aktif all: ${activeUsersCountt}`;
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
        });
});

document.addEventListener('DOMContentLoaded', function () {
    const itaLink = document.getElementById('itaLink');
    const daftarIta = document.getElementById('daftarIta');

    itaLink.addEventListener('click', function (event) {
        event.preventDefault();
        daftarIta.style.display = 'block'; // Menampilkan daftar Ita saat tautan diklik
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // ...
    
    // Menambahkan event listener ke elemen input filter
    const filterFirstNameInput = document.getElementById('filterFirstName');
    filterFirstNameInput.addEventListener('input', function () {
        const filterValue = filterFirstNameInput.value.toLowerCase();
        const rows = document.querySelectorAll('#userTable tbody tr');

        rows.forEach(row => {
            const firstName = row.cells[0].textContent.toLowerCase(); // Mengambil teks dari kolom Nama Depan

            // Menyembunyikan atau menampilkan baris berdasarkan filter
            if (firstName.includes(filterValue)) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // ...
});

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data dari API
    fetch('http://localhost:9000/userss')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Gagal mengambil data pengguna');
            }
        })
        .then(data => {
            // Mengambil jumlah pengguna admin dan user dari data API
            const users = data.data.data;
            const adminCount = users.filter(user => user.user_type === 'ADMIN').length;
            const userCount = users.filter(user => user.user_type === 'USER').length;

            // Mendapatkan elemen canvas untuk grafik
            const chartCanvas = document.getElementById('userAdminChart');

            // Membuat grafik dengan Chart.js
            const userAdminChart = new Chart(chartCanvas, {
                type: 'doughnut',
                data: {
                    labels: ['Admin', 'User'],
                    datasets: [{
                        data: [adminCount, userCount],
                        backgroundColor: ['#FF5733', '#3498db'],
                    }],
                },
            });
            // Menampilkan jumlah pengguna aktif ke dalam elemen HTML
            const activeUsersElement = document.getElementById('activeUsers');
            activeUsersElement.textContent = `Pengguna Aktif: ${adminCount + userCount}`;
            const activeAdminsElement = document.getElementById('activeAdmins');
            activeAdminsElement.textContent = `Admin Aktif: ${adminCount}`;
            const activeUsersAdminsElement = document.getElementById('ss');
            activeUsersAdminsElement.textContent = `Pengguna Aktif antara admin dan user : ${userCount}`;
        })
        
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
        });
});



