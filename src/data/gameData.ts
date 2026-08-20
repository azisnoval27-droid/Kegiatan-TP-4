import { Product, DistributionDilemma, QuizQuestion, GlossaryItem } from '../types/game';

export const INITIAL_MONEY = 1500000; // Rp 1.500.000 (Modal awal pengusaha desa)
export const INITIAL_SOCIAL_SCORE = 60; // 60/100 (Status awal netral-stabil)

export const PRODUCTS: Product[] = [
  {
    id: 'bambu_lestari',
    name: 'Kerajinan Anyaman Bambu',
    category: 'Kerajinan Lokal & Ramah Lingkungan',
    baseCost: 20000,
    suggestedPrice: 45000,
    iconName: 'Package',
    description: 'Peralatan makan & tas anyaman dari bambu desa Sukamaju yang terbarukan.',
    minBatch: 10,
    maxBatch: 100,
    ecoFactor: 'Bahan baku lokal lestari, memberdayakan pengrajin bambu tradisional.'
  },
  {
    id: 'keripik_singkong',
    name: 'Keripik Singkong Renyah Aneka Rasa',
    category: 'Olahan Hasil Pertanian',
    baseCost: 8000,
    suggestedPrice: 18000,
    iconName: 'Utensils',
    description: 'Makanan ringan olahan singkong segar langsung dari kebun petani desa.',
    minBatch: 20,
    maxBatch: 150,
    ecoFactor: 'Menyerap hasil panen singkong warga agar bernilai tambah tinggi.'
  },
  {
    id: 'jamu_herbal',
    name: 'Jamu Rimpang Segar Tradisional',
    category: 'Minuman Kesehatan & Tradisi',
    baseCost: 12000,
    suggestedPrice: 28000,
    iconName: 'Sparkles',
    description: 'Minuman jahe, kunyit, dan temulawak kaya khasiat dari apotek hidup pekarangan.',
    minBatch: 15,
    maxBatch: 120,
    ecoFactor: 'Memanfaatkan kebun toga warga tanpa bahan kimia pengawet.'
  },
  {
    id: 'batik_alam',
    name: 'Kain Batik Tulis Pewarna Alam',
    category: 'Ekonomi Kreatif & Budaya',
    baseCost: 50000,
    suggestedPrice: 120000,
    iconName: 'Palette',
    description: 'Batik motif khas flora desa yang diwarnai ekstrak kulit kayu mahoni dan daun mangga.',
    minBatch: 5,
    maxBatch: 50,
    ecoFactor: 'Ramah lingkungan tanpa limbah kimia pewarna sintesis.'
  }
];

export const CYCLE_DILEMMAS: DistributionDilemma[] = [
  {
    id: 'cycle_1_koperasi',
    title: 'Siklus 1: Pilihan Jalur Distribusi Pertama',
    context: 'Produk sudah selesai diproduksi di bengkel desa. Sekarang saatnya mengirim barang ke pasar kecamatan.',
    scenarioDescription: 'Pak Maman dari Koperasi Unit Desa (KUD) menawarkan armada bersama. Di sisi lain, ada tawaran menggunakan jalur pintas tak resmi milik calo sambil mencoba memotong antrian pasar pedagang lain.',
    associativeOption: {
      title: 'Bekerja Sama dengan Koperasi Desa (Kooperasi)',
      type: 'Kerja Sama (Kooperasi)',
      description: 'Menitipkan distribusi ke armada KUD. Biaya patungan transparan, pengiriman tepat waktu, dan memperkuat solidaritas sesama warga desa.',
      costMultiplier: 0.9,
      socialImpact: 15,
      distributionSuccessRate: 0.98,
      explanation: 'Kerja sama (Kooperasi) adalah bentuk interaksi sosial asosiatif. Melalui kerja sama dengan Koperasi, distribusi menjadi efisien, risiko kerusakan rendah, dan hubungan dengan warga desa makin erat.'
    },
    dissociativeOption: {
      title: 'Perang Tarif Murah & Blokir Rute Pesaing',
      type: 'Persaingan Tidak Sehat',
      description: 'Memotong jalur angkutan pengrajin lain dan membayar calo untuk memonopoli bak muatan pick-up pasar.',
      costMultiplier: 0.75,
      socialImpact: -20,
      distributionSuccessRate: 0.7,
      explanation: 'Tindakan ini merupakan interaksi disosiatif (persaingan tidak sehat & pertentangan). Warga dan pedagang lain merasa dirugikan, memicu kemarahan, penolakan pengiriman, dan rusaknya reputasi tokomu.'
    }
  },
  {
    id: 'cycle_2_jembatan',
    title: 'Siklus 2: Tantangan Jembatan Penghubung Rusak',
    context: 'Hujan deras semalam merusak jembatan kayu penghubung desa dengan jalan raya antar-kota.',
    scenarioDescription: 'Distribusi barang terancam mandek. Pak RT mengajak musyawarah dan gotong royong perbaikan darurat.',
    associativeOption: {
      title: 'Ikut Iuran & Gotong Royong Musyawarah (Akomodasi)',
      type: 'Akomodasi (Musyawarah)',
      description: 'Menyumbang dana distribusi untuk bahan jembatan dan bahu-membahu bersama warga menyelesaikan jembatan darurat.',
      costMultiplier: 0.95,
      socialImpact: 20,
      distributionSuccessRate: 0.95,
      explanation: 'Akomodasi melalui musyawarah dan kerja gotong royong menyelesaikan masalah bersama secara damai. Pengiriman lancar dan masyarakat menghargai kepedulian sosial tokomu.'
    },
    dissociativeOption: {
      title: 'Menerobos Jalur Kebun Warga Tanpa Izin',
      type: 'Pertentangan / Konflik',
      description: 'Memaksa truk distribusi menerobos pekarangan dan tanaman kebun warga lain secara sepihak agar barangmu sampai lebih dulu.',
      costMultiplier: 0.8,
      socialImpact: -25,
      distributionSuccessRate: 0.6,
      explanation: 'Memaksa kehendak memicu konflik terbuka (disosiatif). Warga menghadang truk, terjadi pertengkaran, dan sebagian barang rusak di jalan karena ditahan warga yang marah.'
    }
  },
  {
    id: 'cycle_3_festival',
    title: 'Siklus 3: Festival Budaya & Pasar Raya Kabupaten',
    context: 'Kabupaten mengadakan pameran akbar UMKM Desa. Ratusan calon pembeli dan wisatawan akan datang.',
    scenarioDescription: 'Stan pameran terbatas. Panitia membuka pendaftaran stan bersama antar-pengrajin desa.',
    associativeOption: {
      title: 'Bentuk Paguyuban Stan Bersama Desa (Asimilasi & Kolaborasi)',
      type: 'Asimilasi & Akulturasi',
      description: 'Menggabungkan stan dengan pengrajin batik & kuliner lain sehingga tampak megah, saling mempromosikan produk tetangga.',
      costMultiplier: 0.85,
      socialImpact: 20,
      distributionSuccessRate: 1.0,
      explanation: 'Kolaborasi dan asimilasi karya menghasilkan sinergi positif (asosiatif). Pengunjung senang karena produk bervariasi dan tokomu dinobatkan sebagai pahlawan ekonomi desa.'
    },
    dissociativeOption: {
      title: 'Sebarkan Gosip Miring Produk Tetangga (Kontravensi)',
      type: 'Kontravensi',
      description: 'Menyebarkan kabar bohong bahwa produk pesaing desa menggunakan bahan beracun agar stanmu paling ramai.',
      costMultiplier: 0.9,
      socialImpact: -30,
      distributionSuccessRate: 0.55,
      explanation: 'Kontravensi (hasutan/fitnah rahasia) merusak keharmonisan masyarakat. Saat kebohongan terungkap, konsumen memboikot produkmu dan hubungan sosial anjlok drastis.'
    }
  }
];

export const IPS_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kegiatan membuat kerajinan anyaman bambu dari bahan mentah menjadi barang siap pakai termasuk dalam kegiatan ekonomi...',
    concept: 'Produksi',
    options: [
      'A. Konsumsi',
      'B. Distribusi',
      'C. Produksi',
      'D. Reklamasi'
    ],
    correctIndex: 2,
    explanation: 'Produksi adalah kegiatan menambah nilai guna suatu benda atau menciptakan benda baru yang berguna untuk memenuhi kebutuhan manusia.'
  },
  {
    id: 2,
    question: 'Penyaluran barang dagangan dari pengrajin di desa Sukamaju menuju pasar kota melalui Koperasi Unit Desa (KUD) adalah contoh kegiatan...',
    concept: 'Distribusi',
    options: [
      'A. Distribusi',
      'B. Konsumsi',
      'C. Eksploitasi',
      'D. Produksi'
    ],
    correctIndex: 0,
    explanation: 'Distribusi adalah kegiatan menyalurkan barang dan jasa dari produsen kepada konsumen yang membutuhkan.'
  },
  {
    id: 3,
    question: 'Bekerja sama dengan warga untuk gotong royong memperbaiki rute jalan dan bermusyawarah di koperasi merupakan bentuk interaksi sosial...',
    concept: 'Interaksi Asosiatif',
    options: [
      'A. Disosiatif',
      'B. Asosiatif',
      'C. Konfliktif',
      'D. Oposisional'
    ],
    correctIndex: 1,
    explanation: 'Interaksi sosial Asosiatif adalah bentuk interaksi sosial positif yang mengarah pada kesatuan, kerja sama, dan keharmonisan masyarakat.'
  },
  {
    id: 4,
    question: 'Menyebarkan desas-desus buruk atau fitnah tentang kejelekan produk pedagang lain di pasar tanpa bukti nyata tergolong bentuk interaksi...',
    concept: 'Interaksi Disosiatif',
    options: [
      'A. Akomodasi',
      'B. Asimilasi',
      'C. Kontravensi (Disosiatif)',
      'D. Akulturasi'
    ],
    correctIndex: 2,
    explanation: 'Kontravensi adalah bentuk interaksi disosiatif berupa rasa tidak senang yang disembunyikan, fitnah, atau menghasut yang dapat merusak persatuan.'
  },
  {
    id: 5,
    question: 'Mengapa hubungan sosial yang harmonis dan asosiatif sangat penting dalam keberhasilan usaha ekonomi di masyarakat?',
    concept: 'Interaksi Asosiatif',
    options: [
      'A. Karena usaha bisa memonopoli semua keuntungan sendiri',
      'B. Karena menciptakan kepercayaan pasar, kelancaran distribusi, dan dukungan konsumen jangka panjang',
      'C. Agar tidak perlu membayar pajak ke pemerintah',
      'D. Supaya pesaing bisnis segera bangkrut'
    ],
    correctIndex: 1,
    explanation: 'Modal sosial (kepercayaan, gotong royong, relasi baik) menurunkan biaya konflik, menjamin kelancaran pasokan, serta meningkatkan loyalitas konsumen.'
  }
];

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Produksi',
    category: 'Kegiatan Ekonomi',
    definition: 'Kegiatan menghasilkan atau menambah nilai guna suatu barang/jasa untuk memenuhi kebutuhan hidup.',
    example: 'Mengolah bambu mentah menjadi perabot anyaman bernilai jual tinggi.',
    icon: 'Hammer'
  },
  {
    term: 'Distribusi',
    category: 'Kegiatan Ekonomi',
    definition: 'Kegiatan menyalurkan barang dan jasa dari produsen sampai ke tangan konsumen secara tepat waktu.',
    example: 'Mengirimkan hasil panen singkong desa ke pasar swalayan menggunakan armada koperasi.',
    icon: 'Truck'
  },
  {
    term: 'Konsumsi',
    category: 'Kegiatan Ekonomi',
    definition: 'Kegiatan menggunakan, memakai, atau menghabiskan nilai guna barang dan jasa untuk kebutuhan.',
    example: 'Wisatawan membeli dan menikmati jamu herbal segar di warung oleh-oleh.',
    icon: 'ShoppingBag'
  },
  {
    term: 'Interaksi Asosiatif',
    category: 'Interaksi Sosial',
    definition: 'Bentuk interaksi sosial yang mengarah pada persatuan, kerja sama, dan penguatan hubungan antar-anggota masyarakat.',
    example: 'Kerja sama (kooperasi), Musyawarah (akomodasi), dan saling bantu saat bencana.',
    icon: 'Users'
  },
  {
    term: 'Interaksi Disosiatif',
    category: 'Interaksi Sosial',
    definition: 'Bentuk interaksi sosial yang mengarah pada perpecahan, pertentangan, persaingan tidak sehat, dan konflik.',
    example: 'Perang harga curang, fitnah dagang (kontravensi), dan perselisihan perebutan pelanggan.',
    icon: 'ShieldAlert'
  },
  {
    term: 'Prinsip Ekonomi',
    category: 'Prinsip & Motif',
    definition: 'Pedoman melakukan tindakan ekonomi dengan pengorbanan tertentu untuk memperoleh hasil yang maksimal, secara etis dan bertanggung jawab.',
    example: 'Memilih bahan baku lokal berkualitas tanpa merusak alam dan menghargai upah tenaga kerja secara adil.',
    icon: 'TrendingUp'
  }
];
