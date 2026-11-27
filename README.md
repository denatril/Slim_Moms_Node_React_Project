# SlimMom

Mobil, tablet ve masaüstünde çalışan bir kalori hesaplayıcı ve yemek günlüğü. Arayüz React ve Vite, API Express ve MongoDB kullanır.

## Yerel kurulum

Node.js 25 ve erişilebilir bir MongoDB veritabanı ile test edilmiştir. İlk terminalde:

```sh
cd backend
npm ci
cp .env.template .env
```

`backend/.env` içinde `DB_HOST` için proje veritabanının bağlantı adresini, `JWT_SECRET` için rastgele bir gizli değer girin. Varsayılan API portu 3000’dir. Ürünleri yükleyip API’yi başlatın:

```sh
npm run seed
npm run dev
```

İkinci terminalde, proje kökünde:

```sh
npm ci
cp .env.template .env
npm run dev
```

Vite’ın terminalde verdiği adresi açın. Frontend farklı bir API kullanacaksa kökteki `VITE_API_URL` değerini değiştirin. Swagger arayüzü varsayılan olarak http://localhost:3000/api-docs/ adresindedir.

## Kontrol

Proje kökünde `npm run lint` ve `npm run build` çalıştırın. Misafir olarak kalori hesaplayabilir, kayıt olup giriş yaptıktan sonra günlükte ürün arayabilir, ekleyebilir ve silebilirsiniz.
