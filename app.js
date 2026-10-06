let appState = {
    userName: null,
    userColor: '#ff2986',
    userCustomGreeting: '',
    topicsData: {},
    timerSeconds: 25 * 60,
    activeSessionDurationMinutes: 25,
    timerRunning: false,
    timerInterval: null,
    studyHours: { "Biologia": 0, "Chimica": 0, "Fisica": 0 },
    simulations: [],
    customFlashcards: [],
    collapsedUnits: { 'completedSection': true },
    streak: 0,
    theme: 'dark'
};

document.addEventListener("DOMContentLoaded", () => {
    // Gestione pulizia della vecchia cache incompatibile
    if (window.location.search.includes('reset=1')) {
        localStorage.removeItem("medstudio_state");
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    loadState();
    initSyllabusData();
    
    if (!appState.userName) {
        showWelcomeModal();
    } else {
        applyUserProfile();
    }

    renderSyllabus();
    populateFlashcardTopicSelectors();
    updateDashboard();
    updateTimerDisplay();
    updateStudyHoursDisplay();
    renderSimulationsHistory();
    applyTheme();
});

function loadState() {
    const saved = localStorage.getItem("medstudio_state");
    if (saved) {
        try { 
            const parsed = JSON.parse(saved);
            // Verifica se i dati in memoria sono strutturati con i nuovi ID (es. bio_1_1)
            if (parsed.topicsData && Object.keys(parsed.topicsData).some(k => k.startsWith('bio_'))) {
                appState = Object.assign(appState, parsed); 
            } else {
                // Se trova la vecchia struttura del syllabus, cancella i dati incompatibili
                localStorage.removeItem("medstudio_state");
            }
        } catch(e) { 
            console.error("Errore caricamento dati:", e); 
            localStorage.removeItem("medstudio_state");
        }
    }
}

function saveState() {
    localStorage.setItem("medstudio_state", JSON.stringify(appState));
    updateDashboard();
}

function showWelcomeModal() { 
    const overlay = document.getElementById("welcomeOverlay");
    if (overlay) overlay.style.display = "flex"; 
}

function selectUserProfile(name, color, customGreeting) {
    appState.userName = name;
    appState.userColor = color;
    appState.userCustomGreeting = customGreeting;
    saveState();
    applyUserProfile();
    const overlay = document.getElementById("welcomeOverlay");
    if (overlay) overlay.style.display = "none";
}

function applyUserProfile() {
    if (appState.userName) {
        document.documentElement.style.setProperty('--accent', appState.userColor);
        const badge = document.getElementById("userBadge");
        if (badge) {
            badge.innerText = appState.userName;
            badge.style.color = appState.userColor;
        }
        const greeting = document.getElementById("welcomeGreeting");
        if (greeting) {
            greeting.innerText = appState.userCustomGreeting || `Ok ${appState.userName}, iniziamo!`;
        }
    }
}

function initSyllabusData() {
    if (typeof initialSyllabus === "undefined") return;
    
    for (let sub in initialSyllabus) {
        initialSyllabus[sub].forEach(u => {
            u.topics.forEach(tObj => {
                if (!appState.topicsData[tObj.id]) {
                    appState.topicsData[tObj.id] = {
                        text: tObj.text,
                        subject: sub,
                        status: 'todo',
                        nextReview: null,
                        notes: ''
                    };
                }
            });
        });
    }
}

function toggleUnit(unitKey) {
    appState.collapsedUnits[unitKey] = !appState.collapsedUnits[unitKey];
    saveState();
    
    if (unitKey === 'completedSection') {
        const compContainer = document.getElementById("completedContainer");
        const chevron = document.getElementById("completedChevron");
        if (compContainer && chevron) {
            if (appState.collapsedUnits[unitKey]) {
                compContainer.classList.add("collapsed");
                chevron.className = "fa-solid fa-chevron-down";
            } else {
                compContainer.classList.remove("collapsed");
                chevron.className = "fa-solid fa-chevron-up";
            }
        }
    } else {
        renderSyllabus();
    }
}

function renderSyllabus() {
    const container = document.getElementById("syllabusContainer");
    if (!container) return;
    container.innerHTML = "";
    
    const dueTodayContainer = document.getElementById("dueTodayList");
    if (dueTodayContainer) dueTodayContainer.innerHTML = "";
    let dueTodayCount = 0;

    const completedContainer = document.getElementById("completedContainer");
    if (completedContainer) completedContainer.innerHTML = "";
    let completedCount = 0;

    const todayStr = new Date().toISOString().split('T')[0];

    for (let sub in initialSyllabus) {
        const subTitle = document.createElement("h2");
        subTitle.className = "subject-title";
        subTitle.innerText = sub;
        container.appendChild(subTitle);

        initialSyllabus[sub].forEach(u => {
            const uCard = document.createElement("div");
            uCard.className = "card";
            uCard.style.padding = "0.75rem";

            const isCollapsed = !!appState.collapsedUnits[u.unit];

            const uHeader = document.createElement("div");
            uHeader.className = "unit-header";
            uHeader.onclick = () => toggleUnit(u.unit);
            uHeader.innerHTML = `<span>${u.unit}</span> <i class="fa-solid fa-chevron-${isCollapsed ? 'down' : 'up'}"></i>`;
            
            const topicList = document.createElement("div");
            topicList.className = `topic-list ${isCollapsed ? 'collapsed' : ''}`;

            u.topics.forEach(tObj => {
                const tData = appState.topicsData[tObj.id] || { text: tObj.text, status: 'todo' };
                const itemHtml = createTopicItemElement(tObj.id, tData, sub);

                if (tData.status === 'done') {
                    completedCount++;
                    if (completedContainer) completedContainer.appendChild(itemHtml);
                } else {
                    if (tData.nextReview && tData.nextReview <= todayStr && tData.status === 'review') {
                        dueTodayCount++;
                        if (dueTodayContainer) {
                            dueTodayContainer.innerHTML += `<div style="padding: 0.2rem 0;"><b>[${sub}]</b> ${tData.text}</div>`;
                        }
                    }
                    topicList.appendChild(itemHtml);
                }
            });

            uCard.appendChild(uHeader);
            uCard.appendChild(topicList);
            container.appendChild(uCard);
        });
    }

    const countElem = document.getElementById("completedCount");
    if (countElem) countElem.innerText = completedCount;

    if (completedContainer && completedCount === 0) {
        completedContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Nessun argomento completato al momento.</p>`;
    }

    if (dueTodayContainer && dueTodayCount === 0) {
        dueTodayContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Nessun argomento in scadenza oggi. Ottimo lavoro!</p>`;
    }

    if (completedContainer && document.getElementById("completedChevron")) {
        if (appState.collapsedUnits['completedSection']) {
            completedContainer.classList.add("collapsed");
            document.getElementById("completedChevron").className = "fa-solid fa-chevron-down";
        } else {
            completedContainer.classList.remove("collapsed");
            document.getElementById("completedChevron").className = "fa-solid fa-chevron-up";
        }
    }

    if (window.MathJax && typeof MathJax.typesetPromise === "function") {
        MathJax.typesetPromise();
    }
}

function createTopicItemElement(topicId, tData, sub) {
    const item = document.createElement("div");
    item.className = `topic-item ${tData.status === 'done' ? 'status-done' : ''}`;

    item.innerHTML = `
        <div class="topic-info">
            <span class="topic-text" style="font-size: 0.95rem; font-weight: 500;"><b>[${sub}]</b> ${tData.text}</span>
        </div>
        <div class="topic-controls">
            <select onchange="updateTopicStatus('${topicId}', this.value)">
                <option value="todo" ${tData.status==='todo'?'selected':''}>Da Studiare</option>
                <option value="review" ${tData.status==='review'?'selected':''}>In Ripasso</option>
                <option value="done" ${tData.status==='done'?'selected':''}>Completato ✅</option>
            </select>

            <input type="text" placeholder="Note..." value="${tData.notes || ''}" onchange="updateTopicNotes('${topicId}', this.value)" style="width: 130px;">
        </div>
    `;
    return item;
}

function updateTopicStatus(topicId, status) {
    if (appState.topicsData[topicId]) {
        appState.topicsData[topicId].status = status;
        if (status === 'review') {
            const next = new Date();
            next.setDate(next.getDate() + 3);
            appState.topicsData[topicId].nextReview = next.toISOString().split('T')[0];
        }
        saveState();
        renderSyllabus();
    }
}

function updateTopicNotes(topicId, notes) {
    if (appState.topicsData[topicId]) {
        appState.topicsData[topicId].notes = notes;
        saveState();
    }
}

function populateFlashcardTopicSelectors() {
    const fcSelect = document.getElementById("fcTopicSelect");
    const filterSelect = document.getElementById("fcSpecificTopicSelect");
    
    if (!fcSelect || !filterSelect || typeof initialSyllabus === "undefined") return;

    fcSelect.innerHTML = "";
    filterSelect.innerHTML = "";

    for (let sub in initialSyllabus) {
        let group1 = document.createElement("optgroup");
        group1.label = sub;
        let group2 = document.createElement("optgroup");
        group2.label = sub;

        initialSyllabus[sub].forEach(u => {
            u.topics.forEach(tObj => {
                let opt1 = document.createElement("option");
                opt1.value = tObj.id;
                opt1.innerText = tObj.text;
                group1.appendChild(opt1);

                let opt2 = document.createElement("option");
                opt2.value = tObj.id;
                opt2.innerText = tObj.text;
                group2.appendChild(opt2);
            });
        });

        fcSelect.appendChild(group1);
        filterSelect.appendChild(group2);
    }
}

function toggleFcTopicFilter() {
    const modeSelect = document.getElementById("fcSourceSelect");
    const container = document.getElementById("specificTopicFilterContainer");
    if (modeSelect && container) {
        container.style.display = (modeSelect.value === 'specific_topic') ? 'block' : 'none';
    }
}

function updateDashboard() {
    const examDate = new Date('2026-12-10');
    const now = new Date();
    const diffDays = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
    
    const countElem = document.getElementById("examCountdown");
    if (countElem) countElem.innerText = diffDays > 0 ? diffDays : 0;

    let total = 0, completed = 0;
    for (let key in appState.topicsData) {
        total++;
        if (appState.topicsData[key].status === 'done') completed++;
    }
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const rateElem = document.getElementById("completionRate");
    if (rateElem) rateElem.innerText = rate + "%";

    const remaining = total - completed;
    const daily = diffDays > 0 ? (remaining / diffDays).toFixed(1) : remaining;
    
    const goalElem = document.getElementById("dailyGoal");
    if (goalElem) goalElem.innerText = daily;
    
    const streakElem = document.getElementById("studyStreak");
    if (streakElem) streakElem.innerText = (appState.streak || 0) + " 🔥";
}

function setTimerPreset(mins) {
    if (appState.timerRunning) resetTimer();
    const parsedMins = parseInt(mins);
    appState.timerSeconds = parsedMins * 60;
    appState.activeSessionDurationMinutes = parsedMins;
    
    const customInp = document.getElementById("customMinutes");
    if (customInp) customInp.value = "";
    updateTimerDisplay();
}

function setCustomTimer(mins) {
    if (!mins || mins <= 0) return;
    if (appState.timerRunning) resetTimer();
    const parsedMins = parseInt(mins);
    appState.timerSeconds = parsedMins * 60;
    appState.activeSessionDurationMinutes = parsedMins;
    updateTimerDisplay();
}

function toggleTimer() {
    const btn = document.getElementById("startTimerBtn");
    if (appState.timerRunning) {
        clearInterval(appState.timerInterval);
        appState.timerRunning = false;
        if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i> Avvia`;
    } else {
        appState.timerRunning = true;
        if (btn) btn.innerHTML = `<i class="fa-solid fa-pause"></i> Pausa`;
        
        appState.timerInterval = setInterval(() => {
            appState.timerSeconds--;
            if (appState.timerSeconds <= 0) {
                clearInterval(appState.timerInterval);
                appState.timerRunning = false;
                alert("Sessione Completata!");
                
                const selectedSubElem = document.getElementById("timerSubjectSelect");
                const selectedSub = selectedSubElem ? selectedSubElem.value : "Biologia";
                const minsDone = appState.activeSessionDurationMinutes || 25;
                appState.studyHours[selectedSub] = (appState.studyHours[selectedSub] || 0) + (minsDone / 60);
                updateStudyHoursDisplay();
                saveState();
                resetTimer();
            }
            updateTimerDisplay();
        }, 1000);
    }
}

function resetTimer() {
    if (appState.timerRunning) clearInterval(appState.timerInterval);
    appState.timerRunning = false;
    const currentMins = appState.activeSessionDurationMinutes || 25;
    appState.timerSeconds = currentMins * 60;
    const btn = document.getElementById("startTimerBtn");
    if (btn) btn.innerHTML = `<i class="fa-solid fa-play"></i> Avvia`;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(appState.timerSeconds / 60);
    const secs = appState.timerSeconds % 60;
    const timerElem = document.getElementById("timerDisplay");
    if (timerElem) {
        timerElem.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
}

function updateStudyHoursDisplay() {
    const bio = document.getElementById("timeBio");
    const chem = document.getElementById("timeChem");
    const phys = document.getElementById("timePhys");
    if (bio) bio.innerText = (appState.studyHours["Biologia"] || 0).toFixed(1) + "h";
    if (chem) chem.innerText = (appState.studyHours["Chimica"] || 0).toFixed(1) + "h";
    if (phys) phys.innerText = (appState.studyHours["Fisica"] || 0).toFixed(1) + "h";
}

function addCustomFlashcard() {
    const topicSelect = document.getElementById("fcTopicSelect");
    const frontInp = document.getElementById("fcFrontInput");
    const backInp = document.getElementById("fcBackInput");

    if (!topicSelect || !frontInp || !backInp) return;

    const topicId = topicSelect.value;
    const front = frontInp.value.trim();
    const back = backInp.value.trim();

    if (!front || !back) { alert("Compila sia la domanda che la risposta!"); return; }

    if (!appState.customFlashcards) appState.customFlashcards = [];
    const tData = appState.topicsData[topicId];
    const topicText = tData ? tData.text : 'Generale';
    const subject = tData ? tData.subject : 'Generale';

    appState.customFlashcards.push({ topicId, topicText, front, back, subject });
    saveState();

    frontInp.value = "";
    backInp.value = "";
    alert("Flashcard aggiunta con successo all'argomento!");
}

function flipCard() { 
    const box = document.getElementById("flashcardBox");
    if (box) box.classList.toggle("flipped"); 
}

function drawRandomFlashcard() {
    const box = document.getElementById("flashcardBox");
    if (box) box.classList.remove("flipped");
    
    const sourceModeElem = document.getElementById("fcSourceSelect");
    const targetTopicElem = document.getElementById("fcSpecificTopicSelect");
    
    if (!sourceModeElem || !targetTopicElem) return;

    const sourceMode = sourceModeElem.value;
    const targetTopicId = targetTopicElem.value;
    
    let pool = [];

    if (sourceMode === 'custom') {
        if (appState.customFlashcards && appState.customFlashcards.length > 0) {
            pool = appState.customFlashcards.map(c => ({ title: c.front, notes: c.back, topic: c.topicText }));
        }
    } else if (sourceMode === 'specific_topic') {
        if (appState.customFlashcards) {
            appState.customFlashcards.filter(c => c.topicId === targetTopicId).forEach(c => {
                pool.push({ title: c.front, notes: c.back, topic: c.topicText });
            });
        }
        const td = appState.topicsData[targetTopicId];
        if (td) {
            pool.push({ title: td.text, notes: td.notes || "Nessuna nota aggiuntiva nel Syllabus.", topic: td.text });
        }
    } else if (sourceMode === 'all') {
        if (appState.customFlashcards) {
            appState.customFlashcards.forEach(c => {
                pool.push({ title: c.front, notes: c.back, topic: c.topicText });
            });
        }
        Object.keys(appState.topicsData).forEach(tId => {
            const td = appState.topicsData[tId];
            pool.push({ title: td.text, notes: td.notes || "Nessuna nota aggiuntiva nel Syllabus.", topic: td.text });
        });
    }

    const fcSub = document.getElementById("fcSubject");
    const fcTitle = document.getElementById("fcTopicTitle");
    const fcNotes = document.getElementById("fcNotes");

    if (pool.length === 0) {
        if (fcSub) fcSub.innerText = "INFO";
        if (fcTitle) fcTitle.innerText = "Nessuna carta trovata!";
        if (fcNotes) fcNotes.innerText = "Non ci sono carte per i filtri selezionati.";
        return;
    }

    const card = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
        if (fcSub) fcSub.innerText = card.topic || "Generale";
        if (fcTitle) fcTitle.innerText = card.title;
        if (fcNotes) fcNotes.innerText = card.notes;
    }, 200);
}

function addSimulation() {
    const correctInp = document.getElementById("simCorrect");
    const wrongInp = document.getElementById("simWrong");
    const omittedInp = document.getElementById("simOmitted");

    const correct = parseFloat(correctInp ? correctInp.value : 0) || 0;
    const wrong = parseFloat(wrongInp ? wrongInp.value : 0) || 0;
    const omitted = parseFloat(omittedInp ? omittedInp.value : 0) || 0;

    const score = (correct * 1.5) - (wrong * 0.4);
    appState.simulations.unshift({ date: new Date().toLocaleDateString('it-IT'), score: score.toFixed(1), correct, wrong, omitted });
    saveState();
    renderSimulationsHistory();
}

function renderSimulationsHistory() {
    const hist = document.getElementById("simulationsHistory");
    if (!hist) return;
    
    if (!appState.simulations || appState.simulations.length === 0) {
        hist.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Nessuna simulazione ancora registrata.</p>`;
        return;
    }

    hist.innerHTML = appState.simulations.map(s => `
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding: 0.5rem 0;">
            <div><b>Punteggio: ${s.score} pt</b> <span style="font-size: 0.8rem; color: var(--text-muted);">(${s.date})</span></div>
            <div style="font-size: 0.85rem;">🟢 ${s.correct} | 🔴 ${s.wrong} | ⚪ ${s.omitted}</div>
        </div>
    `).join('');
}

function switchTab(btnElement, tabId) {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach(el => el.classList.remove("active"));
    
    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add("active");
    if (btnElement) btnElement.classList.add("active");
}

function exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medstudio_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importData(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(e) {
        try {
            appState = JSON.parse(e.target.result);
            saveState();
            location.reload();
        } catch(err) { alert("File di backup non valido!"); }
    };
    fileReader.readAsText(event.target.files[0]);
}

function toggleTheme() {
    appState.theme = appState.theme === 'dark' ? 'light' : 'dark';
    applyTheme();
    saveState();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', appState.theme);
    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        themeBtn.innerHTML = appState.theme === 'dark' ? `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`;
    }
}
