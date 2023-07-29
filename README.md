# Tutorial

1. Install `git`
```bash
sudo dnf install git
```

2. Clone repository & pindah ke folder `lks`
```bash
git clone https://github.com/ffd114/lks && cd lks
```

3. Install nodejs minimal versi 18.x

```bash
curl -sL https://rpm.nodesource.com/setup_18.x | sudo -E bash -
```

4. Build project untuk production (jika gagal pastikan `nodejs` terinstall dengan benar)
```bash
node ace build --production
```

5. *Rename* *file* `.env.example` ke dalam folder `build/.env`

```bash
cp .env.example build/.env
```

6. Pindah ke folder `build/`

```bash
cd build
```

7. Ubah konfigurasi `.env` untuk database, sesuaikan dengan pengaturan Amazon RDS

```bash
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
node ace migration --force
```

10. Jalankan aplikasi 

```bash
node server.js
```
