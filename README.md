# SlimMom

Mobil, tablet ve masaüstünde çalışan bir kalori hesaplayıcı ve yemek günlüğü. Arayüz React ve Vite, API Express ve MongoDB kullanır.

## Teslim bağlantıları

- [SlimMom uygulamasını aç](https://denatril.github.io/Slim_Moms_Node_React_Project/)
- [Swagger üzerinden canlı API uç noktalarını incele](https://slim-moms-node-react-project.onrender.com/api-docs/)
- [Canlı site için PageSpeed Insights analizi başlat](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdenatril.github.io%2FSlim_Moms_Node_React_Project%2F)

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

## Yayın

Render üzerinde bu depodan bir Blueprint oluşturun. Üretim MongoDB adresini Render’ın istediği `DB_HOST` alanına girin ve veritabanında servisin bağlantısına izin verin. JWT anahtarı Render tarafından oluşturulur. Başlangıçta ürün kataloğu mevcut kimlikler üzerinden güncellenir. Servisin HTTPS adresinde `/api-docs/` açılmalıdır.

GitHub deposunda Pages kaynağını **GitHub Actions** olarak seçin. Actions repository variable olarak `VITE_API_URL` değerini canlı API adresine ayarlayın (sonu `/api`). Ardından **Deploy frontend** iş akışını `main` dalında çalıştırın. Proje alt yolu Pages ayarlarından alınır. İç sayfalara doğrudan gidildiğinde Pages’in özel 404 belgesi React uygulamasını yükler; ilk HTML isteğinin HTTP durum kodu 404 olur.
