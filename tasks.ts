// global providerdə refetchOrders funksiyasında səhv var. sifarişi olduğu kimi çəkib burada filter edib bu satıcıya aid olmayan sifarişləri çıxarıram. lakin methodu dəyişib serverdən bura ancaq buna aid olanları göndərmək lazımdır

// unpaid orders hesablanarkən sifarişin statusunun fulfilled olduğu, sifarişin updatedAt tarixindən 5 gün keçdiyi və mağazanın təhvil verdim qeyd etməsi və məhsulların accept olması nəzərə alınır. təhvil verdim dəyəri ona görə ki hansısa mağazadan məhsul almadan sifariş tamamlanarsa həmin sifarişə görə ödəniş almasın lakin bir məsələ var. satıcı sifarişi təhvil vermədən təhvil verdim vurarsa nə olacaq. buna görə də sifarişin təhvil alınmasını yoxlamaq lazımdır. sifarişi kuryer və ya təyinat nöqtəsi qəbul edərkən təhvil aldım vurmalıdır. məhsulları accept edir təyinat nöqtəsi.

// notifyproviderdə projectid istifadə etmişəm açıq şəkildə
// əgər ehtiyac olarsa aksiyalar üçün mağazanı çıxarmaq olar
