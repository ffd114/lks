# Notes

Sebelum menjalankan aplikasi pastikan terlebih dahulu hal-hal berikut sudah berhasil:

1. Setup Database Amazon RDS (mysql-compatible) dan buat database dengan nama `lks`
2. Sudah memiliki IP Public
3. *Instance* EC2 sudah live dengan OS Amazon Linux 2023 (open port http)
4. Dapat terkoneksi ke *instance* EC2 menggunakan SSH

# Instruksi Menjalankan Aplikasi

1. Install `git`
```bash
sudo dnf install git
```

2. Clone repository & pindah ke folder `lks`
```bash
git clone https://github.com/ffd114/lks
cd lks
```

3. Install nodejs minimal versi 18.x

```bash
curl -sL https://rpm.nodesource.com/setup_18.x | sudo -E bash -
sudo dnf install nodejs
```

4. Build project untuk production (jika gagal pastikan `nodejs` terinstall dengan benar)
```bash
npm install
node ace build --production
```

5. *Copy* *file* `.env.example` ke dalam folder `build/.env`

```bash
cp .env.example build/.env
```

6. Pindah ke folder `build/`

```bash
cd build
```

7. Ubah konfigurasi *file* `.env` untuk database, sesuaikan dengan pengaturan Amazon RDS

```
MYSQL_HOST=<host>
MYSQL_PORT=<port>
MYSQL_USER=<user>
MYSQL_PASSWORD=<password>
MYSQL_DB_NAME=lks
```

8. Instal pustaka `nodejs`

```bash
npm ci --production
```

9. Lakukan migrasi database (jika gagal pastikan pengaturan `.env` sudah benar)

```base
node ace migration:run --force
```

10. Jalankan aplikasi dengan menggunakan `pm2`

```bash
sudo npm install -g pm2
pm2 start server.js
```

11. Aplikasi telah jalan pada *port* `3333`, selanjutnya ikuti instruksi pada soal
