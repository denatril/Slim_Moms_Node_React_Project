# SlimMom

Mobil, tablet ve masaüstünde çalışan bir kalori hesaplayıcı ve yemek günlüğü. Arayüz React ve Vite, API Express ve MongoDB kullanır.

## Teslim bağlantıları

- [SlimMom uygulamasını aç](https://denatril.github.io/Slim_Moms_Node_React_Project/)
- [Swagger üzerinden canlı API uç noktalarını incele](https://slim-moms-node-react-project.onrender.com/api-docs/)
- 27 Kasım 2026 PageSpeed Insights ana sayfa ölçümünde her iki cihazda performans 100, erişilebilirlik 96, en iyi uygulamalar 100 ve SEO 100 puan aldı. [Mobil rapor](https://pagespeed.web.dev/analysis/https-denatril-github-io-Slim_Moms_Node_React_Project/6p0detyo60wre8kk1vwigk?form_factor=mobile) · [Masaüstü raporu](https://pagespeed.web.dev/analysis/https-denatril-github-io-Slim_Moms_Node_React_Project/6p0detyo60wre8kk1vwigk?form_factor=desktop)

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

### Backend · Render

Canlı API, Render üzerinde `main` dalını izleyen bir **Web Service** olarak çalışır.

| Ayar | Değer |
| --- | --- |
| Root Directory | `backend` |
| Build Command | `npm ci` |
| Start Command | `npm run seed && npm start` |
| Ortam değişkenleri | `DB_HOST`, `JWT_SECRET` |

`DB_HOST` bağlantı adresinde uygulamanın veritabanı adını belirtin. Render servisinin çıkış IP aralıklarına MongoDB Atlas’ta erişim izni verin. `JWT_SECRET` için Render’da rastgele bir değer üretin. Başlangıç komutu önce ürün kataloğunu kimliklerine göre günceller, ardından API’yi başlatır. Yeni bir servis kurarken aynı komutları içeren [Blueprint dosyasını](render.yaml) da kullanabilirsiniz.

Ücretsiz Render planında, bir süre kullanılmayan API ilk istekte yeniden başlatılır. Bu yüzden ilk giriş işlemi daha uzun sürebilir.

### Frontend · GitHub Pages

GitHub Pages kaynağını **GitHub Actions** olarak seçin. GitHub deposunda **Settings → Secrets and variables → Actions → Variables** altında `VITE_API_URL` değerini `https://slim-moms-node-react-project.onrender.com/api` olarak ayarlayın. **Deploy frontend** iş akışını `main` dalında çalıştırın.

İş akışı uygulamayı depo alt yoluna göre derler. Yayın çıktısında `login/`, `register/`, `diary/` ve `calculator/` için ayrı giriş belgeleri oluşturur. Böylece GitHub Pages bu adresler doğrudan açıldığında veya yenilendiğinde uygulamayı HTTP 200 ile sunabilir. Oturum gerektiren sayfalarda erişimi React Router denetler.
