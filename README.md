ENTIR - Dijital Lojistik Platformu
ENTIR, Türkiye'deki fiziksel nakliyecilik süreçlerini dijitalleştirerek, yük sahipleri (fabrikalar, üreticiler) ile araç sahiplerini (nakliyeciler) tek bir platformda buluşturan modern bir lojistik ağıdır. Proje, sektördeki fiyat belirsizliği, ödeme güvensizliği ve takip eksikliği gibi temel sorunlara teknoloji odaklı çözümler sunmayı hedefler.

Nội dung
Projenin Amacı
Temel Özellikler
Teknoloji Mimarisi
Backend
Mobil Uygulama
Veritabanı
Kurulum ve Başlatma
Gereksinimler
Backend Kurulumu
Mobil Kurulumu
API Mimarisi ve Endpoint'ler
Proje Yapısı
Katkıda Bulunma
Projenin Amacı
ENTIR, lojistik sektörünün en can alıcı üç sorununa çözüm getirmeyi amaçlar:

Güvensizlik: "Param Güvende" modeli ile ödemeleri, yük teslim edilene kadar havuzda tutarak hem yük sahibini hem de nakliyeciyi korur.
Belirsizlik: Sabit bir fiyat algoritması ve şeffaf süreçler ile keyfi fiyatlandırmanın önüne geçer.
Verimsizlik: Akıllı eşleştirme algoritmaları ve canlı araç takibi ile zaman ve maliyet optimizasyonu sağlar, boş dönen araç sayısını azaltır.
Temel Özellikler
Kullanıcı Yönetimi: SHIPPER (Yük Sahibi) ve CARRIER (Nakliyeci) olmak üzere iki farklı kullanıcı rolü.
Kimlik Doğrulama ve Yetkilendirme: JWT (JSON Web Token) tabanlı güvenli giriş ve rol bazlı endpoint koruması.
Yük İlanı Yönetimi (CRUD): Yük sahiplerinin yeni ilanlar oluşturabilmesi, mevcut ilanları listeleyebilmesi ve detaylarını görebilmesi.
Canlı Araç Takibi: Yükün anlık konumunun harita üzerinden izlenmesi. (Gelecek Özellik)
Güvenli Ödeme Sistemi: Ödemelerin bir havuzda (escrow) tutularak işlem güvenliğinin sağlanması. (Gelecek Özellik)
Teklif ve Anlaşma Sistemi: Nakliyecilerin ilanlara teklif verebilmesi ve yük sahiplerinin bu teklifleri kabul edebilmesi. (Gelecek Özellik)
Teknoloji Mimarisi
Proje, modern ve ölçeklenebilir teknolojiler kullanılarak "monorepo" yapısında geliştirilmiştir.

Backend
Framework: NestJS (Node.js) - Modüler, ölçeklenebilir ve sağlam bir mimari sunar. TypeScript ile geliştirilmiştir.
Veritabanı Etkileşimi (ORM): TypeORM - Veritabanı tablolarını TypeScript class'ları (Entity) olarak modellemeyi sağlar.
Kimlik Doğrulama: Passport.js (passport-jwt stratejisi) - JWT tabanlı yetkilendirme altyapısını yönetir.
Veri Doğrulama: class-validator & class-transformer - Gelen API isteklerinin (DTO) doğruluğunu ve tutarlılığını garanti eder.
Şifreleme: bcrypt - Kullanıcı şifrelerini güvenli bir şekilde hash'lemek için kullanılır.
Mobil Uygulama
Framework: React Native - Tek bir kod tabanı ile hem iOS hem de Android için native uygulamalar geliştirmeyi sağlar.
Dil: TypeScript ve JavaScript (ES6+)
State Yönetimi: React Context API - Uygulama genelinde kullanıcı kimlik doğrulama durumunu (auth state) yönetir.
Navigasyon: React Navigation - Uygulama içi ekran geçişlerini ve yönlendirme mantığını yönetir.
API İletişimi: Axios - Backend API'leri ile iletişim kurmak için kullanılan HTTP istemcisi.
Lokal Depolama: AsyncStorage - JWT gibi verileri cihaz hafızasında güvenli bir şekilde saklamak için kullanılır.
Veritabanı
Sistem: PostgreSQL - Güçlü, güvenilir ve ilişkisel bir veritabanı yönetim sistemidir.
Kurulum ve Başlatma
Gereksinimler
Node.js (v16 veya üstü)
npm veya yarn
PostgreSQL Server
React Native Geliştirme Ortamı (Resmi Döküman)
VS Code (önerilir)
Postman (API testi için)
Backend Kurulumu
Proje ana dizinindeyken backend klasörüne gidin:
Generated bash
cd entir-backend
content_copy
download
Use code with caution.
Bash
Gerekli paketleri yükleyin:
Generated bash
npm install
content_copy
download
Use code with caution.
Bash
.env dosyasını oluşturun. .env.example dosyasını kopyalayarak başlayabilirsiniz.
Generated bash
cp .env.example .env
content_copy
download
Use code with caution.
Bash
.env dosyasını kendi PostgreSQL ayarlarınızla güncelleyin.
Geliştirme sunucusunu başlatın:
Generated bash
npm run start:dev
content_copy
download
Use code with caution.
Bash
Sunucu http://localhost:3000 adresinde çalışmaya başlayacaktır.
Mobil Kurulumu
Proje ana dizinindeyken mobil klasörüne gidin:
Generated bash
cd entir-mobile
content_copy
download
Use code with caution.
Bash
Gerekli paketleri yükleyin:
Generated bash
npm install
content_copy
download
Use code with caution.
Bash
iOS için pod'ları yükleyin:
Generated bash
cd ios && pod install && cd ..
content_copy
download
Use code with caution.
Bash
Bir Android emülatörü veya iOS simülatörü çalıştırın.
Uygulamayı başlatın:
Generated bash
# Android için
npx react-native run-android

# iOS için
npx react-native run-ios
content_copy
download
Use code with caution.
Bash
API Mimarisi ve Endpoint'ler
Tüm endpoint'ler http://localhost:3000 adresi altındadır. Korumalı rotalar geçerli bir Bearer Token gerektirir.

POST /auth/register - Yeni kullanıcı kaydı oluşturur.
POST /auth/login - Kullanıcı girişi yapar ve JWT döndürür.
GET /auth/profile - (Korumalı) Giriş yapmış kullanıcının profil bilgilerini döndürür.
POST /loads - (Korumalı, Sadece SHIPPER) Yeni bir yük ilanı oluşturur.
GET /loads - (Korumalı) Tüm yük ilanlarını listeler.
GET /loads/:id - (Korumalı) Belirli bir ID'ye sahip yük ilanının detaylarını getirir.
Proje Yapısı
Proje, iki ana klasörden oluşan bir monorepo yapısındadır:

Generated code
/entir-project
├── /entir-backend      # NestJS Backend projesi
│   ├── /src
│   │   ├── /auth       # Kimlik doğrulama, JWT, Guards
│   │   ├── /loads      # Yük yönetimi modülü
│   │   └── /users      # Kullanıcı yönetimi modülü
│   └── ...
└── /entir-mobile       # React Native Mobil Uygulama projesi
    ├── /src
    │   ├── /context    # Global State (AuthContext)
    │   ├── /navigation # React Navigation yönlendiricileri
    │   ├── /screens    # Uygulama ekranları (Login, Home vb.)
    │   ├── /services   # API iletişim katmanı
    │   └── /utils      # Yardımcı fonksiyonlar (AsyncStorage vb.)
    └── ...
content_copy
download
Use code with caution.
Katkıda Bulunma
Proje şu anda aktif geliştirme aşamasındadır. Katkıda bulunmak için lütfen bir "issue" açın veya "pull request" gönderin.

Depoyu forklayın.
Yeni özelliğiniz için bir branch oluşturun (git checkout -b feature/yeni-ozellik).
Değişikliklerinizi commit'leyin (git commit -am 'feat: Yeni bir özellik ekle').
Branch'inizi push'layın (git push origin feature/yeni-ozellik).
Bir Pull Request oluşturun.
