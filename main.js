document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Mengambil nilai email dan password dari elemen input pada HTML
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Membuat objek yang berisi data pengguna
    const userData = {
        Email: email,
        Password: password
    };

    // Kirim permintaan HTTP (login) dengan data pengguna
    fetch('http://localhost:9000/user/login', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login gagal');
        }
    })
    .then(data => {
        // Handle respons dari server di sini
        // Cek jenis pengguna (USER atau ADMIN) berdasarkan data yang diterima
        if (data.user_type === 'USER') {
            // Pengguna adalah USER
            window.location.href = 'user_dashboard.html'; 
            console.log('sebagai user' + data);
        } else if (data.user_type === 'ADMIN') {
            // Pengguna adalah ADMIN
            window.location.href = 'admin_dashboard.html'; 
            console.log('sebagai admin' + data);
            // Ganti dengan halaman ADMIN yang sesuai
        } else {
            // Jenis pengguna tidak dikenali
            console.error('Jenis pengguna tidak dikenali:', data);
        }
    })
    .catch(error => {
        // Handle kesalahan (misalnya, tampilkan pesan kesalahan)
        console.error('Login error:', error);
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
            console.log('Jumlah pengguna aktif:', activeUsersCountt);
            const activeUsersElementr = document.getElementById('ss');
            activeUsersElementr.textContent = `Pengguna Aktif: ${activeUsersCountt}`;
        })
        .catch(error => {
            console.error('Terjadi kesalahan:', error);
        });
});