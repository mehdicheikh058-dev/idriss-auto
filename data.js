/* Idriss Auto — parts, guides & mechanics knowledge base.
   Demo/starter data — extend with your own real fitment data.
   Idea & developed by Idriss Romdhani. */

window.CATEGORIES = {
  engine:     { en:'Engine',        fr:'Moteur',          ar:'المحرك',   icon:'⚙️', img:'images/cat-engine.png' },
  brakes:     { en:'Brakes',        fr:'Freinage',        ar:'الفرامل',  icon:'🛑', img:'images/cat-brakes.png' },
  filters:    { en:'Filters',       fr:'Filtres',         ar:'الفلاتر',  icon:'🧽', img:'images/cat-filters.png' },
  electrical: { en:'Electrical',    fr:'Électrique',      ar:'الكهرباء', icon:'🔌', img:'images/cat-electrical.png' },
  suspension: { en:'Suspension',    fr:'Suspension',      ar:'التعليق',  icon:'🪛', img:'images/cat-suspension.png' },
  ignition:   { en:'Ignition',      fr:'Allumage',        ar:'الإشعال',  icon:'⚡', img:'images/cat-ignition.png' },
  cooling:    { en:'Cooling',       fr:'Refroidissement', ar:'التبريد',  icon:'❄️', img:'images/cat-cooling.png' },
  belts:      { en:'Belts & Chains',fr:'Courroies',       ar:'السيور',   icon:'🔗', img:'images/cat-belts.png' },
  transmission:{en:'Transmission',  fr:'Transmission',    ar:'ناقل الحركة',icon:'🔧', img:'images/cat-transmission.png' },
  exhaust:    { en:'Exhaust',       fr:'Échappement',     ar:'العادم',   icon:'💨', img:'images/cat-exhaust.png' }
};

window.PARTS = [
  { id:'p1', partNo:'04465-33471', barcode:'4901234567894', category:'brakes',
    name:{en:'Front brake pad set',fr:'Plaquettes de frein avant',ar:'طقم تيل فرامل أمامي'},
    fits:[ {make:'Toyota',model:'Camry',years:'2012-2017'}, {make:'Toyota',model:'Avalon',years:'2013-2018'}, {make:'Lexus',model:'ES350',years:'2013-2018'} ] },
  { id:'p2', partNo:'90915-YZZD1', barcode:'4987415043210', category:'filters',
    name:{en:'Engine oil filter',fr:'Filtre à huile moteur',ar:'فلتر زيت المحرك'},
    fits:[ {make:'Toyota',model:'Corolla',years:'2009-2019'}, {make:'Toyota',model:'Yaris',years:'2007-2018'}, {make:'Scion',model:'xB',years:'2008-2015'} ] },
  { id:'p3', partNo:'17801-0H050', category:'filters',
    name:{en:'Engine air filter',fr:'Filtre à air moteur',ar:'فلتر هواء المحرك'},
    fits:[ {make:'Toyota',model:'Camry',years:'2007-2017'}, {make:'Toyota',model:'RAV4',years:'2006-2018'} ] },
  { id:'p4', partNo:'90919-01253', category:'ignition',
    name:{en:'Iridium spark plug',fr:'Bougie iridium',ar:'بوجي إريديوم'},
    fits:[ {make:'Toyota',model:'Corolla',years:'2009-2019'}, {make:'Toyota',model:'Matrix',years:'2009-2014'} ] },
  { id:'p5', partNo:'06401-EW80A', category:'ignition',
    name:{en:'Ignition coil',fr:'Bobine d’allumage',ar:'كويل الإشعال'},
    fits:[ {make:'Nissan',model:'Altima',years:'2007-2013'}, {make:'Nissan',model:'Sentra',years:'2007-2012'}, {make:'Nissan',model:'Rogue',years:'2008-2013'} ] },
  { id:'p6', partNo:'31200-RNA-A51', category:'electrical',
    name:{en:'Alternator',fr:'Alternateur',ar:'الدينامو (المولّد)'},
    fits:[ {make:'Honda',model:'Civic',years:'2006-2011'} ] },
  { id:'p7', partNo:'56029-768AA', barcode:'0884131667231', category:'electrical',
    name:{en:'12V starter motor',fr:'Démarreur 12V',ar:'مارش (بادئ الحركة)'},
    fits:[ {make:'Jeep',model:'Wrangler',years:'2012-2018'}, {make:'Dodge',model:'Durango',years:'2011-2019'} ] },
  { id:'p8', partNo:'13568-09070', category:'belts',
    name:{en:'Timing belt',fr:'Courroie de distribution',ar:'سير التوقيت (الكاتينة)'},
    fits:[ {make:'Toyota',model:'Tacoma',years:'2005-2015'}, {make:'Toyota',model:'4Runner',years:'2003-2009'} ] },
  { id:'p9', partNo:'11287-SAA', category:'belts',
    name:{en:'Serpentine / accessory belt',fr:'Courroie d’accessoires',ar:'سير الأكسسوارات'},
    fits:[ {make:'Honda',model:'Accord',years:'2008-2012'}, {make:'Honda',model:'CR-V',years:'2007-2014'} ] },
  { id:'p10', partNo:'16400-5X00A', category:'cooling',
    name:{en:'Radiator',fr:'Radiateur',ar:'الراديتر (المبرّد)'},
    fits:[ {make:'Nissan',model:'Frontier',years:'2005-2019'}, {make:'Nissan',model:'Xterra',years:'2005-2015'} ] },
  { id:'p11', partNo:'25100-2B000', category:'cooling',
    name:{en:'Water pump',fr:'Pompe à eau',ar:'طرمبة الماء'},
    fits:[ {make:'Hyundai',model:'Elantra',years:'2011-2016'}, {make:'Kia',model:'Soul',years:'2012-2016'} ] },
  { id:'p12', partNo:'48510-9BU0A', category:'suspension',
    name:{en:'Front shock absorber',fr:'Amortisseur avant',ar:'مساعد أمامي'},
    fits:[ {make:'Nissan',model:'Altima',years:'2013-2018'} ] },
  { id:'p13', partNo:'51726-2H000', category:'suspension',
    name:{en:'Strut mount bearing',fr:'Butée d’amortisseur',ar:'كرسي المساعد'},
    fits:[ {make:'Hyundai',model:'Elantra',years:'2007-2012'}, {make:'Kia',model:'Forte',years:'2010-2013'} ] },
  { id:'p14', partNo:'43512-06090', category:'brakes',
    name:{en:'Front brake rotor / disc',fr:'Disque de frein avant',ar:'هوب فرامل أمامي'},
    fits:[ {make:'Toyota',model:'Camry',years:'2007-2011'} ] },
  { id:'p15', partNo:'45028-XX', category:'brakes',
    name:{en:'Rear brake caliper',fr:'Étrier de frein arrière',ar:'كاليبر خلفي'},
    fits:[ {make:'Ford',model:'Focus',years:'2012-2018'} ] },
  { id:'p16', partNo:'GDB1330', category:'brakes',
    name:{en:'Performance brake pads',fr:'Plaquettes performance',ar:'تيل فرامل عالي الأداء'},
    fits:[ {make:'Volkswagen',model:'Golf',years:'2010-2014'}, {make:'Audi',model:'A3',years:'2009-2013'} ] },
  { id:'p17', partNo:'06A115561B', category:'filters',
    name:{en:'Oil filter (VAG)',fr:'Filtre à huile (VAG)',ar:'فلتر زيت (VAG)'},
    fits:[ {make:'Volkswagen',model:'Jetta',years:'2005-2014'}, {make:'Audi',model:'A4',years:'2005-2012'} ] },
  { id:'p18', partNo:'12605565', category:'engine',
    name:{en:'Camshaft position sensor',fr:'Capteur arbre à cames',ar:'حساس عمود الكامات'},
    fits:[ {make:'Chevrolet',model:'Cruze',years:'2011-2016'}, {make:'Chevrolet',model:'Malibu',years:'2013-2016'} ] },
  { id:'p19', partNo:'0280155784', category:'engine',
    name:{en:'Fuel injector',fr:'Injecteur de carburant',ar:'بخاخ الوقود'},
    fits:[ {make:'BMW',model:'3 Series (E46)',years:'1999-2006'} ] },
  { id:'p20', partNo:'31430-XX', category:'transmission',
    name:{en:'Clutch kit',fr:'Kit d’embrayage',ar:'طقم دبرياج (كلتش)'},
    fits:[ {make:'Subaru',model:'Impreza',years:'2008-2014'}, {make:'Subaru',model:'Forester',years:'2009-2013'} ] },
  { id:'p21', partNo:'24236933', category:'transmission',
    name:{en:'Automatic transmission filter',fr:'Filtre de boîte auto',ar:'فلتر ناقل الحركة الأوتوماتيك'},
    fits:[ {make:'Chevrolet',model:'Silverado',years:'2007-2013'}, {make:'GMC',model:'Sierra',years:'2007-2013'} ] },
  { id:'p22', partNo:'18307536959', category:'exhaust',
    name:{en:'Oxygen (O2) sensor',fr:'Sonde à oxygène (O2)',ar:'حساس الأكسجين'},
    fits:[ {make:'BMW',model:'3 Series (E90)',years:'2006-2011'} ] },
  { id:'p23', partNo:'226A0-XX', category:'exhaust',
    name:{en:'Catalytic converter',fr:'Pot catalytique',ar:'المحول الحفاز (الكتلايزر)'},
    fits:[ {make:'Honda',model:'Accord',years:'2008-2012'} ] },
  { id:'p24', partNo:'13627566984', category:'electrical',
    name:{en:'Mass air flow (MAF) sensor',fr:'Débitmètre d’air (MAF)',ar:'حساس تدفق الهواء'},
    fits:[ {make:'BMW',model:'5 Series',years:'2004-2010'} ] },
  { id:'p25', partNo:'90919-05060', category:'engine',
    name:{en:'Crankshaft position sensor',fr:'Capteur vilebrequin',ar:'حساس عمود المرفق'},
    fits:[ {make:'Toyota',model:'Camry',years:'2002-2009'} ] },
  { id:'p26', partNo:'04152-YZZA1', category:'filters',
    name:{en:'Cabin air filter',fr:'Filtre d’habitacle',ar:'فلتر المكيف (المقصورة)'},
    fits:[ {make:'Toyota',model:'Corolla',years:'2009-2019'}, {make:'Toyota',model:'RAV4',years:'2013-2018'} ] }
];

window.GUIDES = [
  { id:'g1', category:'filters',
    title:{en:'Change engine oil & filter',fr:'Vidange + filtre à huile',ar:'تغيير الزيت والفلتر'},
    interval:{en:'Every 8,000–10,000 km',fr:'Tous les 8 000–10 000 km',ar:'كل 8000–10000 كم'},
    tools:{en:'Wrench, drain pan, oil filter wrench, funnel',fr:'Clé, bac de vidange, clé à filtre, entonnoir',ar:'مفتاح، حوض تصريف، مفتاح فلتر، قمع'},
    steps:{
      en:['Warm the engine for 2 minutes, then switch off.','Lift and secure the car; place a pan under the drain plug.','Remove the drain plug and let the oil drain fully.','Unscrew the old filter; lightly oil the new gasket and fit hand-tight.','Reinstall the drain plug. Refill with the correct oil grade.','Start, check for leaks, then verify level with the dipstick.'],
      fr:['Chauffe le moteur 2 minutes puis coupe-le.','Lève et cale la voiture ; place un bac sous le bouchon.','Retire le bouchon et laisse l’huile s’écouler.','Dévisse l’ancien filtre ; huile le joint neuf et visse à la main.','Remets le bouchon. Refais le plein avec la bonne huile.','Démarre, vérifie les fuites, contrôle le niveau à la jauge.'],
      ar:['شغّل المحرك دقيقتين ثم أطفئه.','ارفع السيارة وثبّتها؛ ضع حوضاً تحت السدادة.','انزع السدادة واترك الزيت ينزل بالكامل.','فك الفلتر القديم؛ ادهن الجوان وركّبه باليد.','أعد السدادة واملأ بالزيت المناسب.','شغّل، تحقق من التسريب، وافحص المستوى بالمقياس.']
    } },
  { id:'g2', category:'brakes',
    title:{en:'Replace front brake pads',fr:'Changer les plaquettes avant',ar:'تغيير تيل الفرامل الأمامي'},
    interval:{en:'Inspect every 20,000 km',fr:'Inspection tous les 20 000 km',ar:'افحص كل 20000 كم'},
    tools:{en:'Jack, lug wrench, C-clamp, socket set',fr:'Cric, clé à roue, serre-joint, douilles',ar:'رافعة، مفتاح عجل، كلامب، طقم بوكسات'},
    steps:{
      en:['Loosen wheel bolts, lift the car, remove the wheel.','Unbolt the caliper and lift it off the rotor.','Slide out old pads; compress the piston with a C-clamp.','Fit new pads with anti-squeal shims/grease.','Reinstall caliper and wheel; torque the bolts.','Pump the pedal until firm before driving.'],
      fr:['Desserre les boulons, lève la voiture, retire la roue.','Déboulonne l’étrier et dégage-le du disque.','Sors les plaquettes ; comprime le piston au serre-joint.','Monte les neuves avec graisse anti-bruit.','Remonte l’étrier et la roue ; serre au couple.','Pompe la pédale jusqu’à ce qu’elle soit ferme.'],
      ar:['فك صواميل العجل، ارفع السيارة، انزع العجل.','فك الكاليبر وارفعه عن الهوب.','اسحب التيل القديم؛ اضغط المكبس بالكلامب.','ركّب التيل الجديد مع شحم مانع للصرير.','أعد الكاليبر والعجل؛ اربط بالعزم.','اضغط الدواسة حتى تتماسك قبل القيادة.']
    } },
  { id:'g3', category:'ignition',
    title:{en:'Replace spark plugs',fr:'Changer les bougies',ar:'تغيير البوجيهات'},
    interval:{en:'Iridium: every 100,000 km',fr:'Iridium : tous les 100 000 km',ar:'إريديوم: كل 100000 كم'},
    tools:{en:'Spark plug socket, ratchet, gap gauge, torque wrench',fr:'Douille à bougie, cliquet, jauge, clé dynamométrique',ar:'بوكس بوجي، مفك، مقياس فجوة، مفتاح عزم'},
    steps:{
      en:['Let the engine cool completely.','Remove the coil/plug wire from the first cylinder.','Unscrew the old plug with a spark plug socket.','Check the gap on the new plug, then hand-thread it in.','Torque to spec; reconnect the coil. Do one cylinder at a time.','Start and confirm a smooth idle.'],
      fr:['Laisse le moteur refroidir.','Retire la bobine/fil du 1er cylindre.','Dévisse l’ancienne bougie avec la douille.','Vérifie l’écartement de la neuve puis visse à la main.','Serre au couple ; rebranche. Un cylindre à la fois.','Démarre et vérifie le ralenti.'],
      ar:['اترك المحرك يبرد تماماً.','انزع الكويل/السلك من الأسطوانة الأولى.','فك البوجي القديم بالبوكس.','تحقق من الفجوة وركّب الجديد باليد.','اربط بالعزم؛ أعد التوصيل. أسطوانة تلو أخرى.','شغّل وتأكد من ثبات الرلنتي.']
    } },
  { id:'g4', category:'cooling',
    title:{en:'Coolant flush basics',fr:'Remplacement du liquide de refroidissement',ar:'تغيير سائل التبريد'},
    interval:{en:'Every 60,000 km or 2 years',fr:'Tous les 60 000 km ou 2 ans',ar:'كل 60000 كم أو سنتين'},
    tools:{en:'Drain pan, funnel, fresh coolant, gloves',fr:'Bac, entonnoir, liquide neuf, gants',ar:'حوض، قمع، سائل جديد، قفازات'},
    steps:{
      en:['Work only on a COLD engine — never open a hot system.','Open the radiator drain and empty old coolant.','Close the drain; refill with the correct coolant mix.','Run the engine with the cap off to burp air.','Top up to the cold line and refit the cap.','Dispose of old coolant responsibly.'],
      fr:['Moteur FROID uniquement — jamais à chaud.','Ouvre le robinet et vide l’ancien liquide.','Referme ; refais le plein avec le bon mélange.','Fais tourner bouchon ouvert pour purger l’air.','Complète au repère froid et remets le bouchon.','Élimine l’ancien liquide proprement.'],
      ar:['اعمل والمحرك بارد فقط — لا تفتحه ساخناً.','افتح صنبور الراديتر وفرّغ السائل القديم.','أغلق الصنبور؛ املأ بالخليط الصحيح.','شغّل المحرك والغطاء مفتوح لإخراج الهواء.','أكمل حتى علامة البارد وأعد الغطاء.','تخلّص من السائل القديم بشكل سليم.']
    } },
  { id:'g5', category:'filters',
    title:{en:'Swap the engine air filter',fr:'Remplacer le filtre à air',ar:'تغيير فلتر الهواء'},
    interval:{en:'Every 25,000–30,000 km',fr:'Tous les 25 000–30 000 km',ar:'كل 25000–30000 كم'},
    tools:{en:'Usually none, or a screwdriver',fr:'Souvent aucun, ou un tournevis',ar:'غالباً بدون أدوات، أو مفك'},
    steps:{
      en:['Locate the air box near the engine.','Release the clips or screws on the lid.','Lift out the old filter; note its orientation.','Wipe the housing clean of dust and leaves.','Seat the new filter the same way and close the lid.','Make sure all clips are fully latched.'],
      fr:['Repère le boîtier d’air près du moteur.','Détache les clips ou vis du couvercle.','Retire l’ancien filtre ; note son sens.','Nettoie le boîtier (poussière, feuilles).','Place le neuf dans le même sens et referme.','Vérifie que tous les clips sont enclenchés.'],
      ar:['حدد علبة الهواء قرب المحرك.','افتح المشابك أو البراغي.','ارفع الفلتر القديم؛ لاحظ اتجاهه.','نظّف العلبة من الغبار والأوراق.','ركّب الجديد بنفس الاتجاه وأغلق.','تأكد من إغلاق كل المشابك.']
    } },
  { id:'g6', category:'electrical',
    title:{en:'Test & replace a 12V battery',fr:'Tester & changer la batterie 12V',ar:'فحص وتغيير بطارية 12 فولت'},
    interval:{en:'Lifespan 3–5 years',fr:'Durée de vie 3–5 ans',ar:'العمر 3–5 سنوات'},
    tools:{en:'Multimeter, 10mm wrench, gloves',fr:'Multimètre, clé 10mm, gants',ar:'أفوميتر، مفتاح 10مم، قفازات'},
    steps:{
      en:['Engine off, measure: ~12.6V healthy, under 12.2V weak.','Disconnect negative (–) first, then positive (+).','Remove the hold-down bracket and lift the battery.','Clean the tray and terminals of corrosion.','Fit the new battery; positive (+) first, then negative (–).','Start and re-check charging (~13.8–14.4V).'],
      fr:['Moteur coupé : ~12,6V bon, sous 12,2V faible.','Débranche négatif (–) d’abord puis positif (+).','Retire la bride et sors la batterie.','Nettoie le bac et les bornes.','Monte la neuve ; positif (+) d’abord, puis (–).','Démarre et revérifie la charge (~13,8–14,4V).'],
      ar:['والمحرك متوقف: ~12.6 جيد، أقل من 12.2 ضعيف.','افصل السالب (–) أولاً ثم الموجب (+).','انزع الحامل وارفع البطارية.','نظّف القاعدة والأقطاب.','ركّب الجديدة؛ الموجب (+) أولاً ثم (–).','شغّل وأعد فحص الشحن (~13.8–14.4 فولت).']
    } },
  { id:'g7', category:'suspension',
    title:{en:'Decode a tire size',fr:'Décoder une taille de pneu',ar:'فك رموز مقاس الإطار'},
    interval:{en:'Reference',fr:'Référence',ar:'مرجع'},
    tools:{en:'Just your eyes — read the sidewall',fr:'Tes yeux — lis le flanc',ar:'عيناك فقط — اقرأ جانب الإطار'},
    steps:{
      en:['Example: 205/55 R16 91V','205 = tread width in mm.','55 = aspect ratio (sidewall height = 55% of width).','R = radial construction.','16 = wheel diameter in inches.','91 = load index, V = speed rating (max 240 km/h).'],
      fr:['Exemple : 205/55 R16 91V','205 = largeur de bande en mm.','55 = rapport hauteur/largeur (55%).','R = construction radiale.','16 = diamètre jante en pouces.','91 = indice de charge, V = indice de vitesse (240 km/h).'],
      ar:['مثال: 205/55 R16 91V','205 = عرض الإطار بالمليمتر.','55 = نسبة ارتفاع الجانب (55% من العرض).','R = بناء شعاعي (راديال).','16 = قطر الجنط بالبوصة.','91 = مؤشر الحمل، V = مؤشر السرعة (240 كم/س).']
    } }
];

/* ---- Knowledge base: dashboard warning lights ---- */
window.WARNING_LIGHTS = [
  { icon:'🛑', sev:'high',  name:{en:'Brake warning',fr:'Alerte freinage',ar:'تحذير الفرامل'},
    meaning:{en:'Low brake fluid, worn pads, or parking brake on. Stop safely if it stays on while driving.',fr:'Niveau de liquide bas, plaquettes usées ou frein à main serré. Arrête-toi si elle reste allumée.',ar:'سائل فرامل منخفض، تيل مهترئ، أو فرامل اليد مرفوعة. توقّف بأمان إن بقيت مضاءة.'} },
  { icon:'🔋', sev:'med',   name:{en:'Battery / charging',fr:'Batterie / charge',ar:'البطارية / الشحن'},
    meaning:{en:'Charging system fault — failing alternator, loose belt or bad battery.',fr:'Défaut de charge — alternateur, courroie lâche ou batterie HS.',ar:'خلل في نظام الشحن — دينامو، سير مرتخٍ، أو بطارية تالفة.'} },
  { icon:'🌡️', sev:'high', name:{en:'Engine temperature',fr:'Température moteur',ar:'حرارة المحرك'},
    meaning:{en:'Engine overheating. Pull over and shut off to avoid serious damage.',fr:'Surchauffe moteur. Arrête-toi et coupe le moteur.',ar:'ارتفاع حرارة المحرك. توقّف وأطفئ المحرك فوراً.'} },
  { icon:'🛢️', sev:'high', name:{en:'Oil pressure',fr:'Pression d’huile',ar:'ضغط الزيت'},
    meaning:{en:'Low oil pressure. Stop immediately — running risks engine seizure.',fr:'Pression d’huile basse. Arrête immédiatement.',ar:'ضغط زيت منخفض. أوقف فوراً لتجنب تلف المحرك.'} },
  { icon:'⚙️', sev:'med',   name:{en:'Check engine',fr:'Moteur (Check)',ar:'فحص المحرك'},
    meaning:{en:'Engine/emissions fault. Read the OBD-II code to find the cause.',fr:'Défaut moteur/émissions. Lis le code OBD-II.',ar:'خلل في المحرك/الانبعاثات. اقرأ كود OBD-II لمعرفة السبب.'} },
  { icon:'🛞', sev:'low',   name:{en:'Tire pressure (TPMS)',fr:'Pression pneus (TPMS)',ar:'ضغط الإطارات'},
    meaning:{en:'One or more tires under-inflated. Check and inflate to spec.',fr:'Pneu sous-gonflé. Vérifie et regonfle.',ar:'إطار أو أكثر بضغط منخفض. افحص وانفخ للضغط الصحيح.'} },
  { icon:'⚠️', sev:'med',   name:{en:'ABS',fr:'ABS',ar:'نظام ABS'},
    meaning:{en:'Anti-lock brakes fault. Brakes still work but without ABS.',fr:'Défaut ABS. Les freins marchent mais sans ABS.',ar:'خلل في نظام ABS. الفرامل تعمل لكن دون ABS.'} },
  { icon:'🔧', sev:'low',   name:{en:'Service due',fr:'Entretien dû',ar:'موعد الصيانة'},
    meaning:{en:'Scheduled maintenance reminder — usually an oil service.',fr:'Rappel d’entretien — souvent la vidange.',ar:'تذكير بالصيانة المجدولة — غالباً تغيير الزيت.'} }
];

/* ---- Common OBD-II trouble codes ---- */
window.OBD_CODES = [
  { code:'P0300', name:{en:'Random/multiple misfire',fr:'Ratés multiples',ar:'احتراق غير منتظم'},
    fix:{en:'Check spark plugs, coils, fuel injectors and vacuum leaks.',fr:'Vérifie bougies, bobines, injecteurs et fuites d’air.',ar:'افحص البوجيهات، الكويلات، البخاخات وتسريب الهواء.'} },
  { code:'P0171', name:{en:'System too lean (Bank 1)',fr:'Mélange trop pauvre (Banc 1)',ar:'الخليط فقير جداً'},
    fix:{en:'Vacuum leak, dirty MAF sensor, or weak fuel pump.',fr:'Fuite d’air, débitmètre sale, ou pompe faible.',ar:'تسريب هواء، حساس MAF متسخ، أو طرمبة بنزين ضعيفة.'} },
  { code:'P0420', name:{en:'Catalyst efficiency low',fr:'Rendement catalyseur bas',ar:'كفاءة الكتلايزر منخفضة'},
    fix:{en:'Often a failing catalytic converter or O2 sensor.',fr:'Souvent catalyseur ou sonde O2 défaillante.',ar:'غالباً كتلايزر أو حساس أكسجين تالف.'} },
  { code:'P0128', name:{en:'Coolant below thermostat temp',fr:'Liquide sous température',ar:'حرارة المبرّد منخفضة'},
    fix:{en:'Usually a stuck-open thermostat.',fr:'Souvent un thermostat bloqué ouvert.',ar:'غالباً ثرموستات عالق مفتوحاً.'} },
  { code:'P0455', name:{en:'EVAP large leak',fr:'Grande fuite EVAP',ar:'تسريب كبير EVAP'},
    fix:{en:'Loose or faulty fuel cap is the #1 cause.',fr:'Bouchon de réservoir mal serré, cause n°1.',ar:'غطاء خزان الوقود غير محكم هو السبب الأول.'} },
  { code:'P0301', name:{en:'Cylinder 1 misfire',fr:'Raté cylindre 1',ar:'احتراق ناقص أسطوانة 1'},
    fix:{en:'Swap the coil/plug to that cylinder and re-test.',fr:'Permute bobine/bougie et re-teste.',ar:'بدّل الكويل/البوجي لتلك الأسطوانة وأعد الفحص.'} },
  { code:'P0440', name:{en:'EVAP system fault',fr:'Défaut EVAP',ar:'خلل نظام EVAP'},
    fix:{en:'Check fuel cap, purge valve and EVAP hoses.',fr:'Vérifie bouchon, valve de purge et durites.',ar:'افحص الغطاء، صمام التنفيس وخراطيم EVAP.'} },
  { code:'P0113', name:{en:'Intake air temp sensor high',fr:'Capteur temp. air admission',ar:'حساس حرارة هواء السحب'},
    fix:{en:'Inspect the IAT sensor and its wiring/connector.',fr:'Inspecte le capteur IAT et son câblage.',ar:'افحص حساس IAT وأسلاكه وموصله.'} }
];

/* ---- Fluids reference ---- */
window.FLUIDS = [
  { icon:'🛢️', name:{en:'Engine oil',fr:'Huile moteur',ar:'زيت المحرك'},
    use:{en:'Lubricates & cools the engine. Use the grade in your manual (e.g. 5W-30).',fr:'Lubrifie et refroidit le moteur. Grade du manuel (ex. 5W-30).',ar:'يزيّت ويبرّد المحرك. استخدم اللزوجة المحددة (مثل 5W-30).'},
    interval:{en:'8,000–10,000 km',fr:'8 000–10 000 km',ar:'8000–10000 كم'} },
  { icon:'❄️', name:{en:'Coolant / antifreeze',fr:'Liquide de refroidissement',ar:'سائل التبريد'},
    use:{en:'Prevents overheating & freezing. Mix 50/50 with distilled water.',fr:'Évite surchauffe et gel. Mélange 50/50 eau distillée.',ar:'يمنع السخونة والتجمد. اخلط 50/50 مع ماء مقطّر.'},
    interval:{en:'60,000 km / 2 yrs',fr:'60 000 km / 2 ans',ar:'60000 كم / سنتين'} },
  { icon:'🛑', name:{en:'Brake fluid',fr:'Liquide de frein',ar:'سائل الفرامل'},
    use:{en:'Transfers pedal force to the brakes. DOT 3/4 — absorbs moisture over time.',fr:'Transmet la force au freinage. DOT 3/4 — absorbe l’humidité.',ar:'ينقل قوة الدواسة للفرامل. DOT 3/4 — يمتص الرطوبة.'},
    interval:{en:'2 years',fr:'2 ans',ar:'سنتان'} },
  { icon:'🔧', name:{en:'Transmission fluid (ATF)',fr:'Huile de boîte (ATF)',ar:'زيت ناقل الحركة'},
    use:{en:'Lubricates the gearbox & enables shifting. Use the exact spec.',fr:'Lubrifie la boîte et permet le passage des rapports.',ar:'يزيّت الجير ويمكّن تبديل السرعات. استخدم المواصفة الدقيقة.'},
    interval:{en:'60,000–100,000 km',fr:'60 000–100 000 km',ar:'60000–100000 كم'} },
  { icon:'🪛', name:{en:'Power steering fluid',fr:'Huile de direction',ar:'زيت الدركسيون'},
    use:{en:'Assists steering effort in hydraulic systems.',fr:'Assiste la direction hydraulique.',ar:'يساعد في توجيه المقود الهيدروليكي.'},
    interval:{en:'Check yearly',fr:'Vérifier chaque année',ar:'افحص سنوياً'} },
  { icon:'💧', name:{en:'Windshield washer',fr:'Lave-glace',ar:'سائل المساحات'},
    use:{en:'Cleans the windshield. Use winter-grade in cold climates.',fr:'Nettoie le pare-brise. Version hiver au froid.',ar:'ينظّف الزجاج. استخدم نوعاً شتوياً في البرد.'},
    interval:{en:'Top up as needed',fr:'Compléter au besoin',ar:'أكمل عند الحاجة'} }
];

/* ---- Tools glossary ---- */
window.TOOLS_GLOSSARY = [
  { icon:'🔧', name:{en:'Socket & ratchet set',fr:'Jeu de douilles & cliquet',ar:'طقم بوكسات ومفك بسن'},
    use:{en:'The backbone of most jobs — loosen/tighten bolts fast.',fr:'L’essentiel — serrer/desserrer rapidement.',ar:'أساس معظم الأعمال — فك وربط البراغي بسرعة.'} },
  { icon:'🪛', name:{en:'Torque wrench',fr:'Clé dynamométrique',ar:'مفتاح عزم'},
    use:{en:'Tightens bolts to an exact spec — critical for wheels & heads.',fr:'Serre au couple exact — vital pour roues et culasse.',ar:'يربط البراغي بعزم دقيق — مهم للعجلات والرأس.'} },
  { icon:'🔌', name:{en:'OBD-II scanner',fr:'Scanner OBD-II',ar:'جهاز فحص OBD-II'},
    use:{en:'Reads & clears engine fault codes from the car’s computer.',fr:'Lit/efface les codes défaut du calculateur.',ar:'يقرأ ويمسح أكواد الأعطال من كمبيوتر السيارة.'} },
  { icon:'⚡', name:{en:'Multimeter',fr:'Multimètre',ar:'أفوميتر'},
    use:{en:'Measures volts, resistance & continuity for electrical faults.',fr:'Mesure tension, résistance, continuité.',ar:'يقيس الفولت والمقاومة والاستمرارية للأعطال الكهربائية.'} },
  { icon:'🛞', name:{en:'Floor jack & stands',fr:'Cric & chandelles',ar:'رافعة وحوامل'},
    use:{en:'Lift the car safely. Never work under a car on the jack alone.',fr:'Lève la voiture en sécurité. Jamais sous le seul cric.',ar:'ارفع السيارة بأمان. لا تعمل تحتها على الرافعة وحدها.'} },
  { icon:'🔦', name:{en:'Inspection light',fr:'Lampe d’inspection',ar:'كشاف فحص'},
    use:{en:'See into the dark corners of the engine bay.',fr:'Éclaire les recoins du moteur.',ar:'يضيء الزوايا المظلمة في حجرة المحرك.'} },
  { icon:'🧲', name:{en:'Magnetic pickup',fr:'Ramasse-pièces magnétique',ar:'ممغنط لالتقاط القطع'},
    use:{en:'Retrieve dropped bolts from tight spots.',fr:'Récupère les boulons tombés.',ar:'يلتقط البراغي الساقطة من الأماكن الضيقة.'} },
  { icon:'🧤', name:{en:'Gloves & safety glasses',fr:'Gants & lunettes',ar:'قفازات ونظارات أمان'},
    use:{en:'Protect hands and eyes from fluids, heat and debris.',fr:'Protège mains et yeux.',ar:'تحمي اليدين والعينين من السوائل والحرارة والشظايا.'} }
];
