const initialSyllabus = {
    "Biologia": [
        {
            unit: "Unità 1 - Le basi dell'organizzazione biologica e molecolare della vita",
            topics: [
                { id: "bio_1_1", text: "L'albero della vita, teoria cellulare e proprietà della materia vivente" },
                { id: "bio_1_2", text: "I virus: struttura (capside, involucro), cicli litico/lisogenico e classi di virus" },
                { id: "bio_1_3", text: "La cellula procariotica: strutture, parete (Gram +/-) e trasferimento genico orizzontale" },
                { id: "bio_1_4", text: "La cellula eucariotica: endomembrane, origine del nucleo ed endosimbiosi mitocondriale" },
                { id: "bio_1_5", text: "Macromolecole: zuccheri, lipidi, amminoacidi, legame peptidico e proteine" },
                { id: "bio_1_6", text: "Enzimi e modificazioni post-traduzionali (fosforilazione, acetilazione, glicosilazione)" },
                { id: "bio_1_7", text: "Nucleotidi e acidi nucleici: modello di Watson e Crick, RNA codificanti e non codificanti" },
                { id: "bio_1_8", text: "Basi del metabolismo: anabolismo, catabolismo, reazioni di condensazione e idrolisi" }
            ]
        },
        {
            unit: "Unità 2 - Meccanismi cellulari di trasmissione e controllo dell'informazione genetica ed epigenetica",
            topics: [
                { id: "bio_2_1", text: "Il genoma eucariotico: cromosomi lineari, DNA centromerico e telomerico" },
                { id: "bio_2_2", text: "La cromatina: nucleosomi, istoni, eucromatina, eterocromatina e rimodellamento" },
                { id: "bio_2_3", text: "Epigenetica: metilazione del DNA, modificazioni istoniche e condensine" },
                { id: "bio_2_4", text: "Il genoma umano: sequenze singole, famiglie geniche e sequenze ripetute (LINE, SINE, retrovirus)" },
                { id: "bio_2_5", text: "Ripetizioni in tandem (minisatelliti, microsatelliti) ed elementi mobili del DNA" }
            ]
        },
        {
            unit: "Unità 3 - Il flusso dell'informazione",
            topics: [
                { id: "bio_3_1", text: "Replicazione del DNA: meccanismo semiconservativo, forcella replicativa ed enzimi coinvolti" },
                { id: "bio_3_2", text: "Filamento continuo/discontinuo, frammenti di Okazaki, telomeri e senescenza replicativa" },
                { id: "bio_3_3", text: "Anatomia del gene procariotico ed eucariotico: geni monocistronici e policistronici" },
                { id: "bio_3_4", text: "Trascrizione nei procarioti e regolazione tramite operone Lac" },
                { id: "bio_3_5", text: "Trascrizione negli eucarioti: RNA polimerasi I, II, III, TATA box e fattori di trascrizione" },
                { id: "bio_3_6", text: "Maturazione dell'mRNA: capping, poliadenilazione, splicing alternativo ed editing" },
                { id: "bio_3_7", text: "Regolazione della stabilità dell'mRNA (miRNA e RNA interference) e maturazione rRNA/tRNA" },
                { id: "bio_3_8", text: "Sintesi proteica: codice genetico, ribosomi, tRNA e fasi della traduzione" },
                { id: "bio_3_9", text: "Ripiegamento proteico, chaperon molecolari e degradazione proteasomica ubiquitina-dipendente" }
            ]
        },
        {
            unit: "Unità 4 - Meccanismi cellulari di trasmissione e controllo dei caratteri selvatici e mutati",
            topics: [
                { id: "bio_4_1", text: "Variazioni del genoma: mutazioni geniche, cromosomiche ed espansione di sequenze ripetute" },
                { id: "bio_4_2", text: "Meccanismi di riparazione del danno al DNA su singolo e doppio filamento" },
                { id: "bio_4_3", text: "Alleli e leggi di Mendel: dominanza, recessività, segregazione e assortimento indipendente" },
                { id: "bio_4_4", text: "Estensioni mendeliane: dominanza incompleta, codominanza, poliallelia, pleiotropia ed epistasi" },
                { id: "bio_4_5", text: "Associazione genica completa/incompleta, mappe genetiche e imprinting genomico" },
                { id: "bio_4_6", text: "Penetranza, espressività, caratteri poligenici ed eredità quantitativa" },
                { id: "bio_4_7", text: "Cariotipo umano, bandeggio ed alterazioni numeriche/strutturali (es. trisomia 21)" },
                { id: "bio_4_8", text: "Alberi genealogici: ereditarietà autosomica, legata a X/Y e mitocondriale" }
            ]
        },
        {
            unit: "Unità 5 - Le strutture cellulari: biogenesi, morfologia e funzioni",
            topics: [
                { id: "bio_5_1", text: "Membrane biologiche: modello a mosaico fluido, glicocalice e asimmetria" },
                { id: "bio_5_2", text: "Trasporto di membrana: diffusione, osmosi, trasportatori attivi/passivi, pompe ATPasi e ABC" },
                { id: "bio_5_3", text: "Aspetti biologici del potenziale di membrana e del potenziale d'azione" },
                { id: "bio_5_4", text: "Il nucleo: involucro nucleare, pori nucleari, importine/esportine e sistema Ran" },
                { id: "bio_5_5", text: "I mitocondri: struttura, genoma mitocondriale, bioenergetica e dinamiche (fusione/fissione)" },
                { id: "bio_5_6", text: "I perossisomi: funzioni cataboliche/detossificanti, biogenesi e sindrome di Zellweger" },
                { id: "bio_5_7", text: "Via secretoria: RET, REL, apparato di Golgi, sequenza segnale SRP e controllo di qualità" },
                { id: "bio_5_8", text: "Traffico vescicolare: proteine di rivestimento, NSF, SNARE, Rab e fosfoinositidi" },
                { id: "bio_5_9", text: "Endocitosi (fluida e mediata da recettori), endosomi, lisosomi, transcitosi e fagocitosi" },
                { id: "bio_5_10", text: "Autofagia: macroautofagia, microautofagia, autofagia chaperon-mediata e mitofagia" },
                { id: "bio_5_11", text: "Citoscheletro: microtubuli (dineine/chinesine, ciglia/flagelli), microfilamenti di actina e filamenti intermedi" }
            ]
        },
        {
            unit: "Unità 6 - La cellula e l'ambiente, la segnalazione cellulare e la trasduzione del segnale",
            topics: [
                { id: "bio_6_1", text: "Matrice extracellulare: struttura, integrine, meccanotrasduzione e fibronectina" },
                { id: "bio_6_2", text: "Comunicazione intercellulare: caderine, CAM e giunzioni (occludenti, aderenti, desmosomi, gap)" },
                { id: "bio_6_3", text: "Segnalazione cellulare: autocrina, paracrina, endocrina, sinaptica e recettori intracellulari" },
                { id: "bio_6_4", text: "Recettori accoppiati a proteine G: proteine G trimeriche, GEF/GAP, secondi messaggeri e desensitizzazione" },
                { id: "bio_6_5", text: "Recettori ad attività enzimatica: RTK, via Ras-MAP chinasi, recettore insulina/EGF ed oncogeni" }
            ]
        },
        {
            unit: "Unità 7 - Il controllo della proliferazione, della sopravvivenza e morte cellulare",
            topics: [
                { id: "bio_7_1", text: "Ciclo cellulare: cicline, CDK, punto di restrizione, via Rb/E2F e proteina p53" },
                { id: "bio_7_2", text: "Mitosi: fasi, fuso mitotico, complesso NDC80, APC/C, separazione dei cromatidi e citodieresi" },
                { id: "bio_7_3", text: "Meiosi: fasi molecolari, crossing-over, cause di aneuploidia e gametogenesi humana" },
                { id: "bio_7_4", text: "Concetto di cellula staminale" },
                { id: "bio_7_5", text: "Morte cellulare: necrosi vs apoptosi (vie intrinseca/estrinseca, caspasi e famiglia BCL2)" }
            ]
        }
    ],
    "Chimica": [
        {
            unit: "Unità 1 - Struttura dell'atomo, legami chimici e termodinamica dei sistemi aperti",
            topics: [
                { id: "chem_1_1", text: "Teoria atomica: protoni, neutroni, elettroni, numeri atomico/massa, isotopi e cenni RMN" },
                { id: "chem_1_2", text: "Numeri quantici, orbitali, principio di Pauli, regola di Hund e configurazione elettronica" },
                { id: "chem_1_3", text: "Tavola periodica e proprietà periodiche: raggio atomico, ionizzazione, elettronegatività" },
                { id: "chem_1_4", text: "Massa molecolare, mole, numero di Avogadro e Unità di Massa Atomica" },
                { id: "chem_1_5", text: "Legame chimico: covalente (puro/polare/dativo), ionico, metallico e ibridazioni (sp, sp2, sp3)" },
                { id: "chem_1_6", text: "Geometria molecolare, interazioni deboli (legame H, van der Waals) ed idrofobiche" },
                { id: "chem_1_7", text: "Numero di ossidazione, formule di struttura e nomenclatura (ossidi, idrossidi, acidi, sali)" },
                { id: "chem_1_8", text: "Stati di aggregazione: stato aeriforme (leggi dei gas perfetti), liquido (pressione di vapore) e solido" },
                { id: "chem_1_9", text: "Termodinamica: entalpia, entropia, energia libera di Gibbs (delta G) e spontaneità dei processi" }
            ]
        },
        {
            unit: "Unità 2 - Miscele, soluzioni e proprietà colligative",
            topics: [
                { id: "chem_2_1", text: "Miscele biologiche: soluzioni, sospensioni, colloidi e solubilità (Legge di Henry)" },
                { id: "chem_2_2", text: "Unità di concentrazione: percentuali, Molarità, Molalità, frazione molare ed equivalenti" },
                { id: "chem_2_3", text: "Miscele di gas e pressione parziale (Legge di Dalton) nella respirazione" },
                { id: "chem_2_4", text: "Proprietà colligative: tensione di vapore (Raoult), ebullioscopia, crioscopia e pressione osmotica" },
                { id: "chem_2_5", text: "Osmolarità, osmolalità, fattore di van't Hoff, soluzioni isotoniche/ipertoniche ed implicazioni (emolisi/edema)" }
            ]
        },
        {
            unit: "Unità 3 - Reazioni chimiche, cinetica ed equilibrio chimico",
            topics: [
                { id: "chem_3_1", text: "Bilanciamento delle reazioni e conservazione di massa, energia e carica" },
                { id: "chem_3_2", text: "Cinetica chimica: velocità di reazione, equazione di Arrhenius ed energia di attivazione" },
                { id: "chem_3_3", text: "Teoria dello stato di transizione e ruolo dei catalizzatori biologici (enzimi)" },
                { id: "chem_3_4", text: "Equilibrio chimico: legge d'azione di massa, costante Kc, principio di Le Chatelier ed equilibrio eterogeneo" }
            ]
        },
        {
            unit: "Unità 4 - Acidi, basi, pH, tamponi e reazioni REDOX",
            topics: [
                { id: "chem_4_1", text: "Teorie acido-base (Arrhenius, Brønsted-Lowry, Lewis), costante di autoprotolisi Kw e scala del pH" },
                { id: "chem_4_2", text: "Calcolo del pH per acidi/basi forti e deboli, acidi poliprotici e idrolisi salina" },
                { id: "chem_4_3", text: "Soluzioni tampone: equazione di Henderson-Hasselbalch ed efficienza tampone" },
                { id: "chem_4_4", text: "Equilibrio acido-base nei fluidi biologici: tampone bicarbonato, fosfato, proteine e stati patologici (acidosi/alcalosi)" },
                { id: "chem_4_5", text: "Reazioni di ossido-riduzione: semireazioni, potenziali redox, equazione di Nernst e lavoro chimico" },
                { id: "chem_4_6", text: "REDOX biologiche: ossigeno come accettore, reazioni di Fenton e Haber-Weiss (radicale idrossilico)" }
            ]
        },
        {
            unit: "Unità 5 - Proprietà del carbonio e reattività dei composti organici",
            topics: [
                { id: "chem_5_1", text: "Proprietà del carbonio, nomenclatura IUPAC e reattività" },
                { id: "chem_5_2", text: "Stereochimica: diastereoisomeri, enantiomeri, epimeri, miscele racemiche e convenzione Fischer/RS" },
                { id: "chem_5_3", text: "Intermedi di reazione: rottura omolitica/eterolitica, carbocationi, carboanioni, nucleofili ed elettrofili" },
                { id: "chem_5_4", text: "Alcani, cicloalcani ed alcheni: addizione elettrofila e dieni coniugati" },
                { id: "chem_5_5", text: "Composti aromatici: benzene, pirimidine, purine, regola di Hückel e tossicità" }
            ]
        },
        {
            unit: "Unità 6 - Gruppi funzionali ed isomerie",
            topics: [
                { id: "chem_6_1", text: "Alcoli, fenoli, tioli, eteri e tioeteri: acidità, reazioni di ossidazione e disidratazione" },
                { id: "chem_6_2", text: "Ammine: basicità, nucleofilicità, alchilazione e nitrosammine" },
                { id: "chem_6_3", text: "Aldeidi e chetoni: addizione nucleofila, emiacetali/acetali, tautomeria cheto-enolica e ubichinone" },
                { id: "chem_6_4", text: "Acidi carbossilici e derivati (anidridi, esteri, ammidi, tioesteri): sostituzione nucleofila acilica e decarbossilazione" }
            ]
        },
        {
            unit: "Unità 7 - Amminoacidi, proteine, carboidrati, lipidi ed acidi nucleici",
            topics: [
                { id: "chem_7_1", text: "Amminoacidi: classificazione, proprietà acido-base, punto isoelettrico e legame peptidico" },
                { id: "chem_7_2", text: "Livelli di struttura delle proteine (primaria, secondaria, terziaria, quaternaria)" },
                { id: "chem_7_3", text: "Carboidrati: monosaccaridi (ciclizzazione, anomeri), legame glicosidico e polisaccaridi (amido, glicogeno, cellulosa)" },
                { id: "chem_7_4", text: "Lipidi: acidi grassi, trigliceridi, fosfolipidi, sfingolipidi, colesterolo e derivati steroidei" },
                { id: "chem_7_5", text: "Nucleotidi e acidi nucleici: coenzimi REDOX (NAD+, FAD), legame fosfodiestere e strutture DNA/RNA" },
                { id: "chem_7_6", text: "Modificazioni non enzimatiche delle macromolecole ed antiossidanti (glutatione, tocoferolo)" }
            ]
        }
    ],
    "Fisica": [
        {
            unit: "Unità 1 - Introduzione ai metodi della fisica",
            topics: [
                { id: "phys_1_1", text: "Grandezze fisiche, Sistema Internazionale, dimensioni e conversioni delle unità" },
                { id: "phys_1_2", text: "Notazione scientifica, ordini di grandezza, grandezze scalari ed intensive/estensive" },
                { id: "phys_1_3", text: "Vettori: componenti ed operazioni (somma, differenza, prodotto scalare e vettoriale)" }
            ]
        },
        {
            unit: "Unità 2 - Meccanica del punto e dei sistemi",
            topics: [
                { id: "phys_2_1", text: "Cinematica: posizione, traiettoria, legge oraria, velocità ed accelerazione (media ed istantanea)" },
                { id: "phys_2_2", text: "Moti: rettilineo uniforme, accelerato, caduta libera, parabolico e circolare uniforme" },
                { id: "phys_2_3", text: "Principi della dinamica di Newton (I, II e III principio) ed equilibrio statico" },
                { id: "phys_2_4", text: "Forze: peso, attrito statico/dinamico, tensione e forza elastica (Legge di Hooke)" },
                { id: "phys_2_5", text: "Lavoro meccanico, potenza e Teorema dell'Energia Cinetica" },
                { id: "phys_2_6", text: "Forze conservative vs non conservative ed Energia Potenziale (gravitazionale ed elastica)" },
                { id: "phys_2_7", text: "Conservazione dell'Energia Meccanica nei sistemi ideali" },
                { id: "phys_2_8", text: "Quantità di moto, impulso e principio di conservazione nei sistemi isolati" },
                { id: "phys_2_9", text: "Corpo rigido: centro di massa, momento torcente, equilibrio rotazionale e leve nel corpo umano" }
            ]
        },
        {
            unit: "Unità 3 - Meccanica dei fluidi",
            topics: [
                { id: "phys_3_1", text: "Statica dei fluidi: densità, pressione, Legge di Stevino, Principio di Pascal e Principio di Archimede" },
                { id: "phys_3_2", text: "Misura della pressione (esperimento di Torricelli e manometro)" },
                { id: "phys_3_3", text: "Idrodinamica dei fluidi ideali: portata, equazione di continuità e Teorema di Bernoulli" },
                { id: "phys_3_4", text: "Fluidi reali: viscosità, profilo parabolico, Legge di Poiseuille e resistenze vascolari" },
                { id: "phys_3_5", text: "Fenomeni di superficie: tensione superficiale, capillarità e Legge di Laplace" }
            ]
        },
        {
            unit: "Unità 4 - Onde meccaniche ed acustica",
            topics: [
                { id: "phys_4_1", text: "Onde meccaniche: oscillatore armonico, frequenza, periodo, lunghezza d'onda e velocità" },
                { id: "phys_4_2", text: "Onde trasversali e longitudinali, sovrapposizione ed interferenza" },
                { id: "phys_4_3", text: "Energia, potenza ed intensità di un'onda (legge dell'inverso del quadrato)" },
                { id: "phys_4_4", text: "Onde acustiche: velocità del suono, intensità sonora, scala in decibel ed Effetto Doppler" }
            ]
        },
        {
            unit: "Unità 5 - Termodinamica",
            topics: [
                { id: "phys_5_1", text: "Sistemi termodinamici, temperatura, scala Kelvin ed equazione dei gas perfetti" },
                { id: "phys_5_2", text: "Calore, capacità termica, calore specifico, calori latenti di passaggio di stato e calorimetria" },
                { id: "phys_5_3", text: "Meccanismi di trasmissione del calore: conduzione, convezione ed irraggiamento" },
                { id: "phys_5_4", text: "Primo Principio della Termodinamica: energia interna, lavoro e trasformazioni canoniche" },
                { id: "phys_5_5", text: "Secondo Principio della Termodinamica: cicli, macchine termiche, rendimento ed entropia" }
            ]
        },
        {
            unit: "Unità 6 - Elettricità e magnetismo",
            topics: [
                { id: "phys_6_1", text: "Elettrostatica: carica elettrica, Legge di Coulomb, campo elettrico e linee di forza" },
                { id: "phys_6_2", text: "Energia potenziale elettrica, potenziale e differenza di potenziale" },
                { id: "phys_6_3", text: "Conduttori, dielettrici, induzione e polarizzazione" },
                { id: "phys_6_4", text: "Corrente continua, Leggi di Ohm, resistività, effetto Joule e resistenze in serie/parallelo" },
                { id: "phys_6_5", text: "Capacità elettrica, condensatore piano e condensatori in serie/parallelo" },
                { id: "phys_6_6", text: "Campo magnetico, Forza di Lorentz su cariche in moto e fili percorsi da corrente" },
                { id: "phys_6_7", text: "Induzione elettromagnetica: flusso magnetico e Legge di Faraday-Neumann-Lenz" }
            ]
        },
        {
            unit: "Unità 7 - Fisica delle radiazioni ed ottica",
            topics: [
                { id: "phys_7_1", text: "Onde elettromagnetiche e spettro elettromagnetico (da onde radio a raggi gamma)" },
                { id: "phys_7_2", text: "Quantizzazione dell'energia e fotoni (E=h*nu)" },
                { id: "phys_7_3", text: "Assorbimento della radiazione e Legge di Lambert-Beer" },
                { id: "phys_7_4", text: "Radioattività: decadimenti alfa, beta, gamma, legge del decadimento ed emivita" },
                { id: "phys_7_5", text: "Radiazioni ionizzanti vs non ionizzanti" },
                { id: "phys_7_6", text: "Ottica: riflessione, rifrazione, indice di rifrazione e lenti sottili convergenti" }
            ]
        }
    ]
};
