export const MOCK_REPORTS = [
    // --- NEW REPORTS (5) ---
    {
        id: 'ECO-20231212-N001',
        title: 'Xazon yoqish holati',
        address: 'Toshkent sh., Chilonzor t., 19-mavze',
        date: '12 Dekabr, 14:30',
        status: 'new',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80'
        ],
        lat: 41.2858,
        lon: 69.2033,
        description: 'Ko\'p qavatli uylar orqasida xazonlar yoqilmoqda. Tutey atrofga tarqalib, nafas olishni qiyinlashtiryapti.',
        ai_risk: 'Havoning ifloslanishi va nafas yo\'llari kasalliklari xavfi yuqori.',
        ai_actions: ['Yong\'in xavfsizligi xizmatiga xabar berish', 'Mahalla qo\'mitasini ogohlantirish']
    },
    {
        id: 'ECO-20231212-N002',
        title: 'Noqonuniy qurilish chiqindisi',
        address: 'Toshkent sh., Yunusobod t., 4-mavze',
        date: '12 Dekabr, 12:15',
        status: 'new',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80',
            'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&q=80'
        ],
        lat: 41.3645,
        lon: 69.2890,
        description: 'Qurilish firmasi tomonidan katta miqdorda beton va g\'isht bo\'laklari yashil hududga to\'kib ketilgan.',
        ai_risk: 'Tuproq unumdorligining pasayishi va landshaft buzilishi.',
        ai_actions: ['Ekologiya inspeksiyasiga xabar berish', 'Jarima qo\'llash']
    },
    {
        id: 'ECO-20231211-N003',
        title: 'Daraxtlar kesilishi',
        address: 'Toshkent sh., Shayxontohur t., Gulobod ko\'chasi',
        date: '11 Dekabr, 09:45',
        status: 'new',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80'
        ],
        lat: 41.3200,
        lon: 69.2500,
        description: 'Sog\'lom chinor daraxtlari ruxsatsiz kesilmoqda. Hech qanday ruxsatnoma ko\'rsatishmadi.',
        ai_risk: 'Yashil qoplamaning kamayishi, issiqlik oroli effekti.',
        ai_actions: ['Daraxtlarni himoya qilish moratoriysi bo\'yicha ishonch telefoniga qo\'ng\'iroq qilish']
    },
    {
        id: 'ECO-20231211-N004',
        title: 'Zavoddan badbo\'y hid',
        address: 'Toshkent sh., Sergeli t., Sanoat zonasi',
        date: '11 Dekabr, 18:20',
        status: 'new',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80'
        ],
        lat: 41.2200,
        lon: 69.2500,
        description: 'Kechki payt zavod quvurlaridan qora tutun va o\'tkir kimyoviy hid chiqmoqda.',
        ai_risk: 'Atmosfera havosining zararli moddalar bilan ifloslanishi.',
        ai_actions: ['Ekologik laboratoriya tahlilini o\'tkazish']
    },
    {
        id: 'ECO-20231210-N005',
        title: 'Kanalga chiqindi tashlash',
        address: 'Toshkent sh., Yashnobod t., Qorasuv kanali',
        date: '10 Dekabr, 10:00',
        status: 'new',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80'
        ],
        lat: 41.2950,
        lon: 69.3500,
        description: 'Aholi tomonidan maishiy chiqindilar to\'g\'ridan-to\'g\'ri kanalga tashlanmoqda. Suv ifloslangan.',
        ai_risk: 'Suv resurslarining ifloslanishi va infektsiya tarqalishi.',
        ai_actions: ['Chiqindi tashlashni taqiqlash belgilarini o\'rnatish', 'Aholini ogohlantirish']
    },

    // --- PENDING REPORTS (5) ---
    {
        id: 'ECO-20231209-P006',
        title: 'Daraxtga reklama ilish',
        address: 'Toshkent sh., Mirzo Ulug\'bek t., Mustaqillik shoh ko\'chasi',
        date: '09 Dekabr, 11:30',
        status: 'pending',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80'
        ],
        lat: 41.3250,
        lon: 69.3300,
        description: 'Katta reklama banneri mixlar bilan daraxtga qoqilgan. Daraxtga zarar yetgan.',
        ai_risk: 'Daraxtning kasallanishi va qurishi.',
        ai_actions: ['Reklamani olib tashlash', 'Tadbirkorga tushuntirish ishlarini olib borish']
    },
    {
        id: 'ECO-20231208-P007',
        title: 'Daryoda mashina yuvish',
        address: 'Toshkent sh., Bektemir t., Chirchiq daryosi bo\'yi',
        date: '08 Dekabr, 15:45',
        status: 'pending',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80'
        ],
        lat: 41.2400,
        lon: 69.3800,
        description: 'Haydovchilar daryo bo\'yida mashinalarini yuvmoqda, yog\' va kimyoviy moddalar suvga oqyapti.',
        ai_risk: 'Suv ekotizimining buzilishi.',
        ai_actions: ['Nazorat reydlarini o\'tkazish']
    },
    {
        id: 'ECO-20231208-P008',
        title: 'To\'lib toshgan chiqindi qutisi',
        address: 'Toshkent sh., Uchtepa t., 12-mavze',
        date: '08 Dekabr, 08:15',
        status: 'pending',
        images: [
            'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&q=80',
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80'
        ],
        lat: 41.2900,
        lon: 69.1800,
        description: 'Chiqindi qutilari to\'lib ketgan, atrofga badbo\'y hid tarqalmoqda. Maxsustrans olib ketmayapti.',
        ai_risk: 'Antisanitariya holati.',
        ai_actions: ['Maxsustransga so\'rov yuborish']
    },
    {
        id: 'ECO-20231207-P009',
        title: 'Neft to\'kilishi',
        address: 'Toshkent sh., Mirobod t., Temir yo\'l vokzali yaqinida',
        date: '07 Dekabr, 13:20',
        status: 'pending',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80',
            'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800&q=80'
        ],
        lat: 41.2930,
        lon: 69.2700,
        description: 'Katta yuk mashinasidan yo\'lga va ariqqa neft mahsulotlari to\'kilgan.',
        ai_risk: 'Tuproq va suvning zaharli moddalar bilan ifloslanishi.',
        ai_actions: ['Maxsus texnika yordamida tozalash']
    },
    {
        id: 'ECO-20231207-P010',
        title: 'Sug\'orish tizimi nosozligi',
        address: 'Toshkent sh., Yakkasaroy t., Bobur bog\'i',
        date: '07 Dekabr, 17:00',
        status: 'pending',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80'
        ],
        lat: 41.2800,
        lon: 69.2400,
        description: 'Bog\'dagi sug\'orish quvuri yorilgan, katta miqdorda ichimlik suvi isrof bo\'lmoqda.',
        ai_risk: 'Suv resurslarining isrof bo\'lishi.',
        ai_actions: ['Ta\'mirlash brigadasini chaqirish']
    },

    // --- RESOLVED REPORTS (5) ---
    {
        id: 'ECO-20231205-R011',
        title: 'Noqonuniy chiqindixona',
        address: 'Toshkent sh., Olmazor t., Qoraqamish',
        date: '05 Dekabr, 10:30',
        status: 'resolved',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80'
        ],
        resolvedImages: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'
        ],
        lat: 41.3500,
        lon: 69.2200,
        description: 'Mahalla chetida noqonuniy chiqindixona paydo bo\'lgan.',
        officialComment: 'Hudud to\'liq tozalandi. Chiqindi tashlagan shaxslar aniqlanib, jarimaga tortildi. Hududga kuzatuv kamerasi o\'rnatildi.',
        ai_risk: 'Kasallik tarqalish xavfi bartaraf etildi.',
        ai_actions: ['Tozalash ishlari yakunlandi']
    },
    {
        id: 'ECO-20231204-R012',
        title: 'Qurigan daraxtlar o\'rniga ko\'chat',
        address: 'Toshkent sh., Mirobod t., Nukus ko\'chasi',
        date: '04 Dekabr, 14:00',
        status: 'resolved',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80'
        ],
        resolvedImages: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'
        ],
        lat: 41.2980,
        lon: 69.2650,
        description: 'Yo\'l chetidagi bir nechta daraxtlar qurib qolgan va xavf tug\'dirmoqda.',
        officialComment: 'Qurigan daraxtlar olib tashlandi va o\'rniga 50 tup yangi manzarali daraxt ko\'chatlari ekildi. Agrotexnik tadbirlar olib borilmoqda.',
        ai_risk: 'Daraxt qulash xavfi bartaraf etildi.',
        ai_actions: ['Yashillashtirish ishlari bajarildi']
    },
    {
        id: 'ECO-20231203-R013',
        title: 'Kanal tozalandi',
        address: 'Toshkent sh., Shayxontohur t., Anhor kanali',
        date: '03 Dekabr, 09:00',
        status: 'resolved',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80'
        ],
        resolvedImages: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'
        ],
        lat: 41.3150,
        lon: 69.2300,
        description: 'Kanal yuzasida oqib kelayotgan plastik idishlar to\'planib qolgan.',
        officialComment: 'Obodonlashtirish bo\'limi xodimlari tomonidan kanal tozalandi. 2 tonna chiqindi olib chiqib ketildi.',
        ai_risk: 'Suv ifloslanishi kamaytirildi.',
        ai_actions: ['Suv havzasini tozalash ishlari bajarildi']
    },
    {
        id: 'ECO-20231202-R014',
        title: 'Zavod filtr o\'rnatdi',
        address: 'Toshkent sh., Yunusobod t., Sanoat hududi',
        date: '02 Dekabr, 11:45',
        status: 'resolved',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80'
        ],
        resolvedImages: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'
        ],
        lat: 41.3700,
        lon: 69.2900,
        description: 'Zavod mo\'rilaridan qora tutun chiqmoqda.',
        officialComment: 'Ekologiya inpeksiyasi tekshiruvidan so\'ng, zavodga zamonaviy chang-gaz tozalash uskunalari o\'rnatildi. Havo ifloslanishi me\'yor darajasiga keltirildi.',
        ai_risk: 'Havo sifati yaxshilandi.',
        ai_actions: ['Texnologik jarayon modernizatsiya qilindi']
    },
    {
        id: 'ECO-20231201-R015',
        title: 'Chiqindilar olib ketildi',
        address: 'Toshkent sh., Sergeli t., 8-mavze',
        date: '01 Dekabr, 08:30',
        status: 'resolved',
        images: [
            'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&q=80',
            'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=800&q=80'
        ],
        resolvedImages: [
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'
        ],
        lat: 41.2150,
        lon: 69.2200,
        description: 'Chiqindi shaxobchasi atrofida chiqindilar sochilib yotibdi.',
        officialComment: 'Maxsustrans tomonidan qo\'shimcha reyslar tashkil etildi. Hudud tozalandi va dezinfektsiya qilindi.',
        ai_risk: 'Sanitariya holati yaxshilandi.',
        ai_actions: ['Tozalash ishlari bajarildi']
    }
];
