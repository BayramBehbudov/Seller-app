// global providerdə refetchOrders funksiyasında səhv var. sifarişi olduğu kimi çəkib burada filter edib bu satıcıya aid olmayan sifarişləri çıxarıram. lakin methodu dəyişib serverdən bura ancaq buna aid olanları göndərmək lazımdır

// giriş zamanı şifrə email səhv olarsa düzgün alert çıxarılsın. şifrə səhv olanda role erroru çıxarır


// sifarişin ödənişləri satıcılara edilərkən sifarişin statusunun fullfilled olduğu və üzərindən 5 gün keçdiyi yoxlanılacaq. əgər sifarişdə bir neçə mağazadan məhsul olarsa və mağazalardan hansısa sifarişi təhvil vermədən sifariş tamamlanarsa sifariş üçün həmin mağaza ödəniş almamalıdır. ya məhsulu yola salarkən, ya da sifariş statusu və createdat dəyərləri hesablanarkən bu hal nəzərə alınsın 

// ödənilməmiş sifarişlər səhifəsində stores status yoxlanılır burada storesdə olan bütün mağazaların statusuna baxır every ilə. əgər bir mağaza ödənilib digəri ödənilməyibsə həmin sifarişə baxılmayacaq. və ödənilməmiş sifariş ödənilməyəcək. hərçənd belə hal olmaya da bilər. yoxlamaq lazımdır


/*çıxış zamanı error verir */
