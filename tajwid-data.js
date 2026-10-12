/**
 * Anti-Gravity Tajwid Challenge - Pangkalan Data Tajwid
 * Kandungan Kursus Tajwid Peringkat Universiti
 */

const TAJWID_ARCHIVE = [
  {
    id: "izhar-halqi",
    title: "1. Izhar Halqi (إظهار حلقي)",
    definition: "Dari segi bahasa bermaksud 'nyata' atau 'jelas'. Dari segi istilah tajwid, melafazkan sebutan huruf Nun Sakinah (نْ) atau Tanwin (ً ٍ ٌ) dengan jelas dan nyata tanpa dengung (tanpa ghunnah berpanjangan) apabila bertemu salah satu daripada 6 huruf halqi.",
    letters: ["ء (Hamzah)", "هـ (Ha')", "ع ('Ain)", "ح (Ha')", "غ (Ghain)", "خ (Kha')"],
    makhraj: "Huruf-huruf ini keluar dari kawasan kerongkong (Halaq / الحلق).",
    exampleFocus: "أَنْعَمْتَ - Nun mati bertemu huruf 'Ain (ع). Nun dilafazkan secara jelas tanpa mendengungkannya.",
    tip: "Perhatikan tanda sukun (نْ) yang tertulis jelas di atas huruf nun dalam mushaf rasm Uthmani."
  },
  {
    id: "idgham-maal-ghunnah",
    title: "2. Idgham Ma'al Ghunnah (إدغام مع الغنة)",
    definition: "Dari segi bahasa bermaksud 'memasukkan'. Dari segi istilah, memasukkan bunyi Nun Sakinah (نْ) atau Tanwin ke dalam huruf berikutnya berserta dengung (ghunnah) sebanyak 2 harakat.",
    letters: ["ي (Ya)", "ن (Nun)", "م (Mim)", "و (Wau)"],
    mnemonic: "Tergolong dalam perkataan: يَنمُو (Yanmu)",
    exampleFocus: "لَهَبٍ وَتَبَّ - Tanwin pada huruf Ba' bertemu dengan huruf Wau (و). Tanwin dimasukkan ke dalam sebutan Wau berserta dengung 2 harakat.",
    tip: "Hukum ini hanya berlaku dalam dua kalimah yang berasingan. Sekiranya bertemu dalam satu kalimah, ia menjadi Izhar Mutlaq (contoh: دُنْيَا)."
  },
  {
    id: "ikhfa-haqiqi",
    title: "3. Ikhfa' Haqiqi (إخفاء حقيقي)",
    definition: "Dari segi bahasa bermaksud 'menyembunyikan'. Dari segi istilah, melafazkan sebutan Nun Sakinah (نْ) atau Tanwin di antara sifat Izhar dan Idgham (tanpa sabdu) berserta dengung (ghunnah) sebanyak 2 harakat pada huruf ikhfa'.",
    letters: ["ت", "ث", "ج", "د", "ذ", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ف", "ق", "ك"],
    mnemonic: "15 huruf terangkum dalam bait syair: صِفْ ذَا ثَنَا كَمْ جَادَ شَخْصٌ قَدْ سَمَا...",
    exampleFocus: "مَنْ ثَقُلَتْ - Nun mati bertemu huruf Tsa' (ث). Sebutan nun disamarkan ke makhraj huruf Tsa' berserta dengung 2 harakat.",
    tip: "Tebal atau nipisnya dengung ikhfa' bergantung kepada huruf selepasnya (Tafkhim jika bertemu huruf isti'la seperti ص, ض, ط, ظ, ق)."
  },
  {
    id: "qalqalah",
    title: "4. Qalqalah (قلقلة)",
    definition: "Dari segi bahasa bermaksud 'goncangan' atau 'getaran'. Dari segi istilah, bunyi lantunan atau getaran yang kuat pada makhraj huruf qalqalah apabila ia berbaris sukun (mati asli atau sukun kerana waqaf).",
    letters: ["ق (Qaf)", "ط (Tha)", "ب (Ba)", "ج (Jim)", "د (Dal)"],
    mnemonic: "قُطْبُ جَدٍّ (Qutbu Jaddin)",
    categories: [
      "Qalqalah Sughra: Huruf qalqalah sukun di pertengahan kalimah (lantunan sederhana).",
      "Qalqalah Kubra: Huruf qalqalah sukun di hujung kalimah kerana waqaf/berhenti (lantunan kuat).",
      "Qalqalah Akbar: Huruf qalqalah bersabdu di hujung kalimah ketika waqaf (lantunan paling kuat, contoh: وَتَبَّ)."
    ],
    exampleFocus: "أَحَدٌ - Huruf Dal (د) disukunkan kerana diwaqafkan (dibaca: Ahad-d). Ini merupakan contoh Qalqalah Kubra yang menghasilkan lantunan kuat di hujung bacaan.",
    tip: "Lantunan qalqalah tidak boleh dipengaruhi oleh sebarang baris (fathah, kasrah, atau dammah)."
  }
];

const GAME_LEVELS = [
  {
    level: 1,
    title: "Zon 1: Sfera Izhar Halqi",
    subtitle: "Mengenal Pasti Hukum Nun Sakinah & Huruf Kerongkong",
    ruleBadge: "Izhar Halqi (إظهار حلقي)",
    description: "Kapal angkasa anda mula ditarik graviti lohong hitam! Kenal pasti lafaz sebutan nyata tanpa dengung untuk mengaktifkan enjin tujahan pertama.",
    questions: [
      {
        id: "lvl1-q1",
        verseArabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ",
        verseRef: "Surah Al-Fatihah : 7",
        highlightWord: "أَنْعَمْتَ",
        questionText: "Apakah hukum tajwid pada kalimah [ أَنْعَمْتَ ] dan apakah sebab berlakunya hukum tersebut?",
        options: [
          { text: "Izhar Halqi — Nun mati (نْ) bertemu huruf 'Ain (ع)", isCorrect: true },
          { text: "Ikhfa' Haqiqi — Nun mati (نْ) bertemu huruf Mim (م)", isCorrect: false },
          { text: "Idgham Ma'al Ghunnah — Nun mati dimasukkan ke dalam 'Ain", isCorrect: false },
          { text: "Iqlab — Nun mati ditukarkan bunyinya kepada Mim", isCorrect: false }
        ],
        explanation: "Hukumnya adalah Izhar Halqi. Huruf Nun sakinah (نْ) bertemu dengan huruf 'Ain (ع) yang merupakan salah satu daripada 6 huruf Halqi (kerongkong). Cara bacaannya adalah menyebut bunyi Nun secara jelas dan nyata tanpa dengung berpanjangan."
      },
      {
        id: "lvl1-q2",
        verseArabic: "الَّذِي أَطْعَمَهُم مِّن جُوعٍ وَآمَنَهُم مِّنْ خَوْفٍ",
        verseRef: "Surah Quraisy : 4",
        highlightWord: "مِّنْ خَوْفٍ",
        questionText: "Berdasarkan kalimah [ مِّنْ خَوْفٍ ], mengapakah ia dihukumkan sebagai Izhar Halqi?",
        options: [
          { text: "Kerana Nun mati bertemu huruf Kha' (خ) yang makhrajnya dari kerongkong", isCorrect: true },
          { text: "Kerana Tanwin bertemu huruf Wau (و) dengan dengung 2 harakat", isCorrect: false },
          { text: "Kerana huruf Kha' dilafazkan secara samar-samar di bibir mulut", isCorrect: false },
          { text: "Kerana Nun mati diwaqafkan pada akhir ayat", isCorrect: false }
        ],
        explanation: "Tepat! Huruf Kha' (خ) adalah huruf Halqi bahagian atas (Adnal Halaq). Pertemuan Nun mati (نْ) dengan huruf Kha' mewajibkan sebutan secara Izhar Halqi (nyata tanpa dengung)."
      },
      {
        id: "lvl1-q3",
        verseArabic: "وَهُمْ يَنْأَوْنَ عَنْهُ وَيَنْأَوْنَ",
        verseRef: "Surah Al-An'am : 26",
        highlightWord: "يَنْأَوْنَ",
        questionText: "Manakah antara berikut menghuraikan 6 huruf yang menyebabkan berlakunya hukum Izhar Halqi?",
        options: [
          { text: "ء ، هـ ، ع ، ح ، غ ، خ (Hamzah, Ha, 'Ain, Ha, Ghain, Kha)", isCorrect: true },
          { text: "ي ، ن ، م ، و (Ya, Nun, Mim, Wau)", isCorrect: false },
          { text: "ق ، ط ، ب ، ج ، د (Qaf, Tha, Ba, Jim, Dal)", isCorrect: false },
          { text: "ل ، ر (Lam, Ra)", isCorrect: false }
        ],
        explanation: "Huruf Izhar Halqi terdiri daripada 6 huruf kerongkong: Hamzah (ء), Ha' (هـ), 'Ain (ع), Ha' (ح), Ghain (غ), dan Kha' (خ)."
      }
    ]
  },
  {
    level: 2,
    title: "Zon 2: Pusaran Idgham Ma'al Ghunnah",
    subtitle: "Memasukkan Sebutan Berserta Dengung 2 Harakat",
    ruleBadge: "Idgham Ma'al Ghunnah (إدغام مع الغنة)",
    description: "Tarikan graviti semakin kuat! Salurkan tenaga plasma dengan mengenal pasti gabungan Tanwin dan Nun Sakinah yang mendengung.",
    questions: [
      {
        id: "lvl2-q1",
        verseArabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
        verseRef: "Surah Al-Masad : 1",
        highlightWord: "لَهَبٍ وَتَبَّ",
        questionText: "Apakah hukum tajwid pada pertemuan kalimah [ لَهَبٍ وَتَبَّ ] dan bagaimanakah cara bacaannya?",
        options: [
          { text: "Idgham Ma'al Ghunnah — Tanwin bertemu Wau (و), dibaca memasukkan tanwin berserta dengung 2 harakat", isCorrect: true },
          { text: "Izhar Halqi — Tanwin dibaca jelas tanpa dengung", isCorrect: false },
          { text: "Idgham Bila Ghunnah — Tanwin dimasukkan terus tanpa dengung", isCorrect: false },
          { text: "Ikhfa' Haqiqi — Sebutan disamarkan di antara izhar dan idgham", isCorrect: false }
        ],
        explanation: "Hukumnya adalah Idgham Ma'al Ghunnah. Baris dua di bawah (tanwin kasratain) pada huruf Ba' bertemu dengan huruf Wau (و). Bunyi tanwin dimasukkan ke dalam sebutan huruf Wau berserta dengung (ghunnah) 2 harakat."
      },
      {
        id: "lvl2-q2",
        verseArabic: "وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
        verseRef: "Surah Az-Zalzalah : 7",
        highlightWord: "وَمَن يَعْمَلْ",
        questionText: "Apakah gabungan 4 huruf yang membentuk hukum Idgham Ma'al Ghunnah?",
        options: [
          { text: "ي ، ن ، م ، و (diringkaskan: يَنمُو / Yanmu)", isCorrect: true },
          { text: "ل ، ر (diringkaskan: لَر / Lar)", isCorrect: false },
          { text: "ف ، ق ، ك (Fa, Qaf, Kaf)", isCorrect: false },
          { text: "ء ، هـ ، ع ، ح (Huruf Halaq)", isCorrect: false }
        ],
        explanation: "Empat huruf Idgham Ma'al Ghunnah dihimpunkan dalam kalimah يَنْمُو (Yanmu) iaitu Ya (ي), Nun (ن), Mim (م), dan Wau (و)."
      },
      {
        id: "lvl2-q3",
        verseArabic: "قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ",
        verseRef: "Surah Al-Kahf : 110",
        highlightWord: "بَشَرٌ مِّثْلُكُمْ",
        questionText: "Apakah syarat utama berlakunya hukum Idgham Ma'al Ghunnah dalam ilmu tajwid?",
        options: [
          { text: "Nun Sakinah atau Tanwin mesti bertemu huruf idgham dalam DUA kalimah yang berasingan", isCorrect: true },
          { text: "Nun Sakinah mesti berada dalam SATU kalimah yang sama sahaja", isCorrect: false },
          { text: "Huruf selepas Nun mati mestilah berbaris sukun asli", isCorrect: false },
          { text: "Dibaca dengan dengung 4 hingga 6 harakat secara wajib", isCorrect: false }
        ],
        explanation: "Tepat! Idgham Ma'al Ghunnah disyaratkan berlaku dalam dua kalimah berasingan. Jika berlaku dalam satu kalimah (seperti دُنْيَا atau قِنْوَان), hukumnya bertukar menjadi Izhar Mutlaq dan dilarang mengidghamkannya."
      }
    ]
  },
  {
    level: 3,
    title: "Zon 3: Nebula Ikhfa' Haqiqi",
    subtitle: "Menyamarkan Sebutan Antara Izhar & Idgham",
    ruleBadge: "Ikhfa' Haqiqi (إخفاء حقيقي)",
    description: "Sensitiviti sensor kapal angkasa mengesan medan gas nebula! Kuasai 15 huruf Ikhfa' untuk melonjakkan kapal ke orbit pertengahan.",
    questions: [
      {
        id: "lvl3-q1",
        verseArabic: "فَأَمَّا مَن ثَقُلَتْ مَوَازِينُهُ",
        verseRef: "Surah Al-Qari'ah : 6",
        highlightWord: "مَن ثَقُلَتْ",
        questionText: "Apakah hukum tajwid pada lafaz [ مَن ثَقُلَتْ ] dan mengapakah ia berlaku?",
        options: [
          { text: "Ikhfa' Haqiqi — Nun mati (نْ) bertemu dengan huruf Tsa' (ث)", isCorrect: true },
          { text: "Izhar Halqi — Nun mati disebut secara jelas dan terang", isCorrect: false },
          { text: "Qalqalah Sughra — Terdapat lantunan pada huruf Tsa'", isCorrect: false },
          { text: "Idgham Bila Ghunnah — Nun mati dimasukkan ke dalam Tsa' tanpa dengung", isCorrect: false }
        ],
        explanation: "Hukumnya adalah Ikhfa' Haqiqi. Huruf Nun mati (نْ) bertemu dengan huruf Tsa' (ث) yang merupakan salah satu daripada 15 huruf Ikhfa'. Sebutan nun disamarkan menghampiri makhraj huruf Tsa' berserta dengung 2 harakat."
      },
      {
        id: "lvl3-q2",
        verseArabic: "كَلَّا إِنَّ الإِنسَانَ لَيَطْغَىٰ",
        verseRef: "Surah Al-'Alaq : 6",
        highlightWord: "الإِنسَانَ",
        questionText: "Berapakah bilangan huruf Ikhfa' Haqiqi dan bagaimanakah sifat dengungnya apabila bertemu huruf Isti'la (seperti ص ، ض ، ط ، ظ ، ق)?",
        options: [
          { text: "15 huruf; dengungnya dibaca secara tebal (Tafkhim)", isCorrect: true },
          { text: "6 huruf; dengungnya sentiasa dibaca secara nipis (Tarqiq)", isCorrect: false },
          { text: "4 huruf; dengungnya dibaca panjang 6 harakat", isCorrect: false },
          { text: "8 huruf; tidak mempunyai sebarang dengung", isCorrect: false }
        ],
        explanation: "Terdapat 15 huruf Ikhfa' Haqiqi. Apabila Nun mati/Tanwin bertemu huruf isti'la (seperti ق dalam مِّن قَبْلُ atau ط dalam مِن طِينٍ), dengung ikhfa' tersebut wajib ditebalkan (Tafkhim)."
      },
      {
        id: "lvl3-q3",
        verseArabic: "جَزَاءً وِفَاقًا",
        verseRef: "Surah An-Naba' : 26",
        highlightWord: "جَزَاءً وِفَاقًا",
        questionText: "Manakah antara contoh berikut BUKAN merupakan Ikhfa' Haqiqi?",
        options: [
          { text: "جَزَاءً وِفَاقًا (Tanwin bertemu Wau — Idgham Ma'al Ghunnah)", isCorrect: true },
          { text: "مِن دُونِ (Nun mati bertemu Dal)", isCorrect: false },
          { text: "أَن كَانَ (Nun mati bertemu Kaf)", isCorrect: false },
          { text: "عَن صَلَاتِهِمْ (Nun mati bertemu Sad)", isCorrect: false }
        ],
        explanation: "[ جَزَاءً وِفَاقًا ] adalah Idgham Ma'al Ghunnah (Tanwin bertemu Wau), bukan Ikhfa' Haqiqi. Tiga pilihan lain kesemuanya adalah contoh Ikhfa' Haqiqi yang sahih."
      }
    ]
  },
  {
    level: 4,
    title: "Zon 4: Medan Resonans Qalqalah",
    subtitle: "Lantunan & Getaran Makhraj Huruf Sukun",
    ruleBadge: "Qalqalah (قلقلة)",
    description: "Gelombang graviti bergetar kuat! Kuasai hukum lantunan huruf Qutbu Jaddin (قطب جد) untuk membebaskan kapal daripada cengkaman lohong hitam.",
    questions: [
      {
        id: "lvl4-q1",
        verseArabic: "قُلْ هُوَ اللَّهُ أَحَدٌ (1) اللَّهُ الصَّمَدُ (2)",
        verseRef: "Surah Al-Ikhlas : 1",
        highlightWord: "أَحَدٌ",
        questionText: "Apakah hukum qalqalah pada kalimah [ أَحَدٌ ] apabila dibaca secara waqaf (berhenti pada akhir ayat)?",
        options: [
          { text: "Qalqalah Kubra — Huruf Dal (د) disukunkan kerana waqaf di hujung ayat", isCorrect: true },
          { text: "Qalqalah Sughra — Huruf Dal dibaca dengan lantunan sangat perlahan", isCorrect: false },
          { text: "Izhar Halqi — Kerana huruf Dal dibaca dengan jelas", isCorrect: false },
          { text: "Bukan Qalqalah — Kerana asalnya Dal berbaris dammahtain (tanwin)", isCorrect: false }
        ],
        explanation: "Hukumnya adalah Qalqalah Kubra! Walaupun asalnya berbaris tanwin (أَحَدٌ), apabila diwaqafkan, huruf Dal disukunkan (mati mendadak) di hujung kalimah, menghasilkan lantunan getaran yang kuat dan nyata."
      },
      {
        id: "lvl4-q2",
        verseArabic: "اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ",
        verseRef: "Surah Al-'Alaq : 1",
        highlightWord: "اقْرَأْ ... خَلَقَ",
        questionText: "Apakah perbezaan ketara antara Qalqalah Sughra dan Qalqalah Kubra?",
        options: [
          { text: "Sughra: Huruf sukun di pertengahan kalimah (lantunan sederhana); Kubra: Huruf sukun di hujung kalimah kerana waqaf (lantunan kuat)", isCorrect: true },
          { text: "Sughra: Huruf bertasydid; Kubra: Huruf berbaris fathah", isCorrect: false },
          { text: "Sughra dibaca dengan dengung 2 harakat; Kubra tanpa dengung", isCorrect: false },
          { text: "Tiada perbezaan langsung dari segi kekuatan lantunan", isCorrect: false }
        ],
        explanation: "Qalqalah Sughra berlaku apabila huruf qalqalah sukun berada di pertengahan kalimah (seperti huruf Qaf dalam [ اقْرَأْ ]), manakala Qalqalah Kubra berlaku apabila huruf qalqalah sukun di hujung kalimah ketika waqaf (seperti huruf Qaf dalam [ خَلَقَ ])."
      },
      {
        id: "lvl4-q3",
        verseArabic: "تَبَّتْ يَدَا أَبِي لَهَبٍ وَتَبَّ",
        verseRef: "Surah Al-Masad : 1",
        highlightWord: "وَتَبَّ",
        questionText: "Apakah martabat qalqalah yang tertinggi (Qalqalah Akbar) menurut sebahagian ulama tajwid kontemporari, dan contoh ayat manakah yang tepat?",
        options: [
          { text: "Qalqalah Akbar — Huruf qalqalah bertasydid (bersabdu) yang diwaqafkan seperti [ وَتَبَّ ]", isCorrect: true },
          { text: "Qalqalah Akbar — Huruf qalqalah berbaris sukun di awal kalimah", isCorrect: false },
          { text: "Qalqalah Akbar — Huruf qalqalah yang dibaca secara wasal tanpa waqaf", isCorrect: false },
          { text: "Qalqalah Akbar — Pertemuan dua huruf Dal dalam satu ayat", isCorrect: false }
        ],
        explanation: "Menurut ulama qiraat, Qalqalah Akbar adalah martabat paling kuat, berlaku apabila huruf qalqalah bersabdu (bertasydid) diwaqafkan seperti huruf Ba' dalam [ وَتَبَّ ], di mana terdapat penekanan makhraj sebelum lantunan dilepaskan."
      }
    ]
  },
  {
    level: 5,
    title: "Zon 5: Cabaran Kelajuan Lepas (Peringkat Universiti)",
    subtitle: "Analisis Kritis & Sintesis Hukum Tajwid Kompaun",
    ruleBadge: "Cabaran Integrasi Universiti",
    description: "AMARAN KELAJUAN LEPAS! Pecut melepasi graviti lohong hitam dengan menganalisis hukum tajwid dalam ayat-ayat Al-Quran bertaraf akademik tinggi.",
    questions: [
      {
        id: "lvl5-q1",
        verseArabic: "مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ",
        verseRef: "Surah Al-Baqarah : 255 (Ayat al-Kursi)",
        highlightWord: "مَن ذَا ... عِندَهُ",
        questionText: "Perhatikan potongan ayat al-Kursi di atas. Apakah hukum tajwid yang sama berulang pada kedua-dua lafaz [ مَن ذَا ] dan [ عِندَهُ ]?",
        options: [
          { text: "Ikhfa' Haqiqi — Nun mati bertemu Dzal (ذ) dan Nun mati bertemu Dal (د)", isCorrect: true },
          { text: "Izhar Halqi — Kedua-duanya dibaca secara jelas tanpa dengung", isCorrect: false },
          { text: "Idgham Ma'al Ghunnah — Kedua-duanya dimasukkan dengan sabdu", isCorrect: false },
          { text: "Qalqalah Sughra — Terdapat getaran makhraj pada huruf Dal", isCorrect: false }
        ],
        explanation: "Kedua-dua lafaz tersebut adalah Ikhfa' Haqiqi! Dalam [ مَن ذَا ], nun mati bertemu huruf Dzal (ذ) dalam dua kalimah. Dalam [ عِندَهُ ], nun mati bertemu huruf Dal (د) dalam satu kalimah. Kedua-duanya dibaca samar berserta dengung 2 harakat."
      },
      {
        id: "lvl5-q2",
        verseArabic: "فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ",
        verseRef: "Surah Az-Zalzalah : 7",
        highlightWord: "فَمَن يَعْمَلْ ... ذَرَّةٍ خَيْرًا",
        questionText: "Analisis secara tertib dua hukum tajwid yang terdapat pada [ فَمَن يَعْمَلْ ] dan [ ذَرَّةٍ خَيْرًا ]:",
        options: [
          { text: "1. Idgham Ma'al Ghunnah  |  2. Izhar Halqi", isCorrect: true },
          { text: "1. Izhar Halqi  |  2. Idgham Ma'al Ghunnah", isCorrect: false },
          { text: "1. Ikhfa' Haqiqi  |  2. Qalqalah Sughra", isCorrect: false },
          { text: "1. Qalqalah Kubra  |  2. Iqlab", isCorrect: false }
        ],
        explanation: "Hukum pertama pada [ فَمَن يَعْمَلْ ] ialah Idgham Ma'al Ghunnah (Nun mati bertemu Ya). Hukum kedua pada [ ذَرَّةٍ خَيْرًا ] ialah Izhar Halqi (Tanwin bertemu huruf Kha' yang merupakan huruf halaq)."
      },
      {
        id: "lvl5-q3",
        verseArabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (1) مِن شَرِّ مَا خَلَقَ (2)",
        verseRef: "Surah Al-Falaq : 1-2",
        highlightWord: "الْفَلَقِ ... مِن شَرِّ ... خَلَقَ",
        questionText: "Padanan manakah yang TEPAT merumuskan ketiga-tiga hukum tajwid yang berturutan dalam ayat di atas?",
        options: [
          { text: "الْفَلَقِ (Qalqalah Kubra ketika waqaf) -> مِن شَرِّ (Ikhfa' Haqiqi) -> خَلَقَ (Qalqalah Kubra ketika waqaf)", isCorrect: true },
          { text: "الْفَلَقِ (Izhar Halqi) -> مِن شَرِّ (Idgham Bila Ghunnah) -> خَلَقَ (Qalqalah Sughra)", isCorrect: false },
          { text: "الْفَلَقِ (Qalqalah Akbar) -> مِن شَرِّ (Iqlab) -> خَلَقَ (Izhar Mutlaq)", isCorrect: false },
          { text: "الْفَلَقِ (Idgham Ma'al Ghunnah) -> مِن شَرِّ (Izhar Halqi) -> خَلَقَ (Ikhfa' Syafawi)", isCorrect: false }
        ],
        explanation: "Tepat sekali! Huruf Qaf pada akhir ayat 1 [ الْفَلَقِ ] dan ayat 2 [ خَلَقَ ] adalah Qalqalah Kubra kerana diwaqafkan, manakala [ مِن شَرِّ ] adalah Ikhfa' Haqiqi (Nun mati bertemu huruf Syin)."
      }
    ]
  }
];
