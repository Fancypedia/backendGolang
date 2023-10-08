document.getElementById('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Mengambil nilai dari elemen input pada HTML
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;

    // Membuat objek yang berisi data pendaftaran pengguna
    const userData = {
        First_name: firstName,
        Last_name: lastName,
        Email: email,
        Password: password,
        Phone: phone,
        user_type: 'USER' // Tetapkan nilai "USER" sebagai default
    };

    // Kirim permintaan HTTP (pendaftaran) dengan data pengguna
    fetch('http://localhost:9000/user/signup', {
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
            throw new Error('Pendaftaran gagal');
        }
    })
    .then(data => {
        // Handle respons dari server (misalnya, tampilkan pesan sukses)
        console.log('Pendaftaran berhasil:', data);
        // Redirect ke halaman login setelah pendaftaran berhasil
        window.location.href = 'index.html'; // Ganti dengan nama file halaman login yang sesuai
    })
    .catch(error => {
        // Handle kesalahan (misalnya, tampilkan pesan kesalahan)
        console.error('Pendaftaran error:', error);
    });
});
