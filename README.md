# 🚀 Uptime Tracker (Gerçek Zamanlı Servis İzleme Panosu)

Bu proje, belirlenen web sitelerinin veya API uç noktalarının (endpoints) ayakta olup olmadığını (uptime) ve yanıt sürelerini periyodik olarak kontrol eden, sonuçları gerçek zamanlı olarak modern bir arayüzde sunan tam yığın (full-stack) bir web uygulamasıdır.

Bu proje aynı zamanda **React ekosistemine attığım ilk adımdır** ve modern bir JavaScript kütüphanesinin güçlü bir .NET arka planıyla nasıl kusursuz entegre olabileceğini deneyimlediğim bir çalışma olmuştur.

---

## 🛠️ Kullanılan Teknolojiler

### Backend (Core & API)
* **.NET 8 & ASP.NET Core Web API**
* **Mimari:** Onion Architecture (Soğan Mimarisi)
* **Veritabanı:** PostgreSQL & Entity Framework Core
* **Arka Plan Görevleri:** Hangfire
* **Gerçek Zamanlı İletişim:** SignalR

### Frontend (Client)
* **React (Vite)**
* **Recharts** (Grafikler ve Veri Görselleştirme)
* **Bootstrap 5** (UI/UX)
* **Axios / Fetch API**

---

## 🏗️ Backend Mimarisi ve Odak Noktaları

Backend tarafında ölçeklenebilirlik ve performans ön planda tutularak endüstri standartlarında yaklaşımlar benimsenmiştir:

* **Onion Architecture (Soğan Mimarisi):** Proje; Core (Domain), Application, Infrastructure ve Presentation katmanlarına ayrılarak katı bağımlılık kurallarından arındırılmıştır. İş mantığı framework'lerden izole edilmiş, veritabanı veya mesajlaşma araçları değiştirilmek istendiğinde projenin çekirdeğinin etkilenmemesi sağlanmıştır.
* **PostgreSQL Entegrasyonu:** Verilerin güvenilir bir şekilde saklanması için açık kaynak dünyasının en güçlü ilişkisel veritabanlarından PostgreSQL tercih edilmiştir. EF Core migrations ile şema yönetimi standartlaştırılmıştır.
* **Performans Odaklı Sorgular (AsNoTracking):** Sadece okuma (read-only) işlemi yapılan `GET` isteklerinde (örneğin Dashboard istatistikleri veya geçmiş ping kayıtlarının çekilmesi), Entity Framework'ün varsayılan takip mekanizması devre dışı bırakılarak (`.AsNoTracking()`) bellek tüketimi minimize edilmiş ve yüksek performanslı yanıt süreleri elde edilmiştir.

---

## 🌐 React ile İlk Deneyim: Backend & Frontend Nasıl Konuşuyor?

Bu proje, React kullanarak geliştirdiğim ilk frontend uygulamasıdır. Klasik MVC veya Razor Pages yaklaşımlarının aksine, frontend ve backend'in tamamen koptuğu (decoupled) bu yapıda sistemin iletişim akışı şu şekilde tasarlanmıştır:

1. **Arka Plandaki İşçi (Hangfire):** Kullanıcının belirlediği dakika aralıklarında Hangfire tetiklenir ve hedef URL'ye bir HTTP ping isteği atar.
2. **Kayıt ve Bildirim (PostgreSQL & SignalR):** Gelen yanıt süresi ve HTTP statü kodu PostgreSQL veritabanına kaydedilir. Hemen ardından SignalR Hub devreye girer ve frontend'e *"Yeni bir güncelleme var"* (`ReceiveUpdate`) mesajını iletir.
3. **Arayüzün Tepkisi (React):** React bileşeni (Component), SignalR üzerinden gelen bu dinlemeyi `useEffect` hook'u ile yakalar. Sayfayı asla yenilemeden (Single Page Application mantığıyla) REST API'ye istek atar ve güncel verileri çeker.
4. **Dinamik Görselleştirme (Recharts):** Çekilen yeni veriler, React state'lerini günceller. Bu state değişimi sayesinde Recharts ile çizilen gecikme grafikleri (Line Chart) ve Dashboard üzerindeki "Online/Offline" istatistik kartları anında kendi kendini yeniden render eder.

Bu asenkron ve olay güdümlü (event-driven) iletişim sayesinde, kullanıcılar sistem durumunu sayfayı yenileme ihtiyacı duymadan, saniyesi saniyesine canlı bir şekilde takip edebilirler.