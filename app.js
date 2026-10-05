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
    loadState();
    initSyllabusData();
    if (!appState.userName) showWelcomeModal();
    else applyUserProfile();

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
        try { appState = Object.assign(appState, JSON.parse(saved)); } 
        catch(e) { console.error(e); }
    }
}

function saveState() {
    localStorage.setItem("medstudio_state", JSON.stringify(appState));
    updateDashboard();
}

function showWelcomeModal() { document.getElementById("welcomeOverlay").style.display = "flex"; }

function selectUserProfile(name, color, customGreeting) {
    appState.userName = name;
    appState.userColor = color;
    appState.userCustomGreeting = customGreeting;
    saveState();
    applyUserProfile();
    document.getElementById("welcomeOverlay").style.display = "none";
}

function applyUserProfile() {
    if (appState.userName) {
        document.documentElement.style.setProperty('--accent', appState.userColor);
        document.getElementById("userBadge").innerText = appState.userName;
        document.getElementById("userBadge").style.color = appState.userColor;
        document.getElementById("welcomeGreeting").innerText = appState.userCustomGreeting || `Ok ${appState.userName}, iniziamo!`;
    }
}

function initSyllabusData() {
    for (let sub in initialSyllabus) {
        initialSyllabus[sub].forEach(u => {
            u.topics.forEach(t => {
                if (!appState.topicsData[t]) {
                    appState.topicsData[t] = {
                        subject: sub, status: 'todo', priority: 'med',
                        nextReview: null, notes: ''
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
        if (appState.collapsedUnits[unitKey]) {
            compContainer.classList.add("collapsed");
            chevron.className = "fa-solid fa-chevron-down";
        } else {
            compContainer.classList.remove("collapsed");
            chevron.className = "fa-solid fa-chevron-up";
        }
    } else {
        renderSyllabus();
    }
}

function renderSyllabus() {
    const container = document.getElementById("syllabusContainer");
    container.innerHTML = "";
    
    const dueTodayContainer = document.getElementById("dueTodayList");
    dueTodayContainer.innerHTML = "";
    let dueTodayCount = 0;

    const completedContainer = document.getElementById("completedContainer");
    completedContainer.innerHTML = "";
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

            u.topics.forEach(t => {
                const tData = appState.topicsData[t] || {};
                const itemHtml = createTopicItemElement(t, tData, sub);

                if (tData.status === 'done') {
                    completedCount++;
                    completedContainer.appendChild(itemHtml);
                } else {
                    if (tData.nextReview && tData.nextReview <= todayStr && tData.status === 'review') {
                        dueTodayCount++;
                        dueTodayContainer.innerHTML += `<div style="padding: 0.2rem 0;"><b>[${sub}]</b> ${t}</div>`;
                    }
                    topicList.appendChild(itemHtml);
                }
            });

            uCard.appendChild(uHeader);
            uCard.appendChild(topicList);
            container.appendChild(uCard);
        });
    }

    document.getElementById("completedCount").innerText = completedCount;
    if (completedCount === 0) {
        completedContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Nessun argomento completato al momento.</p>`;
    }

    if (dueTodayCount === 0) {
        dueTodayContainer.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Nessun argomento in scadenza oggi. Ottimo lavoro!</p>`;
    }

    if (appState.collapsedUnits['completedSection']) {
        completedContainer.classList.add("collapsed");
        document.getElementById("completedChevron").className = "fa-solid fa-chevron-down";
    } else {
        completedContainer.classList.remove("collapsed");
        document.getElementById("completedChevron").className = "fa-solid fa-chevron-up";
    }

    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

function createTopicItemElement(t, tData, sub) {
    const item = document.createElement("div");
    item.className = `topic-item ${tData.status === 'done' ? 'status-done' : ''}`;

    item.innerHTML = `
        <div class="topic-info">
            <span class="priority-badge priority-${tData.priority || 'med'}"></span>
            <span class="topic-text" style="font-size: 0.95rem; font-weight: 500;"><b>[${sub}]</b> ${t}</span>
        </div>
        <div class="topic-controls">
            <select onchange="updateTopicPriority('${t}', this.value)">
                <option value="low" ${tData.priority==='low'?'selected':''}>🟢 Facile</option>
                <option value="med" ${tData.priority==='med'?'selected':''}>🟡 Medio</option>
                <option value="high" ${tData.priority==='high'?'selected':''}>🔴 Critico</option>
            </select>

            <select onchange="updateTopicStatus('${t}', this.value)">
                <option value="todo" ${tData.status==='todo'?'selected':''}>Da Studiare</option>
                <option value="review" ${tData.status==='review'?'selected':''}>In Ripasso</option>
                <option value="done" ${tData.status==='done'?'selected':''}>Completato ✅</option>
            </select>

            <input type="text" placeholder="Note..." value="${tData.notes || ''}" onchange="updateTopicNotes('${t}', this.value)" style="width: 130px;">
        </div>
    `;
    return item;
}

function updateTopicStatus(topic, status) {
    appState.topicsData[topic].status = status;
    if (status === 'review') {
        const next = new Date();
        next.setDate(next.getDate() + 3);
        appState.topicsData[topic].nextReview = next.toISOString().split('T')[0];
    }
    saveState();
    renderSyllabus();
}

function updateTopicPriority(topic, priority) {
    appState.topicsData[topic].priority = priority;
    saveState();
    renderSyllabus();
}

function updateTopicNotes(topic, notes) {
    appState.topicsData[topic].notes = notes;
    saveState();
}

function populateFlashcardTopicSelectors() {
    const fcSelect = document.getElementById("fcTopicSelect");
    const filterSelect = document.getElementById("fcSpecificTopicSelect");
    
    fcSelect.innerHTML = "";
    filterSelect.innerHTML = "";

    for (let sub in initialSyllabus) {
        let group1 = document.createElement("optgroup");
        group1.label = sub;
        let group2 = document.createElement("optgroup");
        group2.label = sub;

        initialSyllabus[sub].forEach(u => {
            u.topics.forEach(t => {
                let opt1 = document.createElement("option");
                opt1.value = t;
                opt1.innerText = t;
                group1.appendChild(opt1);

                let opt2 = document.createElement("option");
                opt2.value = t;
                opt2.innerText = t;
                group2.appendChild(opt2);
            });
        });

        fcSelect.appendChild(group1);
        filterSelect.appendChild(group2);
    }
}

function toggleFcTopicFilter() {
    const mode = document.getElementById("fcSourceSelect").value;
    const container = document.getElementById("specificTopicFilterContainer");
    container.style.display = (mode === 'specific_topic') ? 'block' : 'none';
}

function updateDashboard() {
    const examDate = new Date('2026-12-10');
    const now = new Date();
    const diffDays = Math.ceil((examDate - now) / (1000 * 60 * 60 * 24));
    document.getElementById("examCountdown").innerText = diffDays > 0 ? diffDays : 0;

    let total = 0, completed = 0;
    for (let key in appState.topicsData) {
        total++;
        if (appState.topicsData[key].status === 'done') completed++;
    }
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById("completionRate").innerText = rate + "%";

    const remaining = total - completed;
    const daily = diffDays > 0 ? (remaining / diffDays).toFixed(1) : remaining;
    document.getElementById("dailyGoal").innerText = daily;
    document.getElementById("studyStreak").innerText = (appState.streak || 0) + " 🔥";
}

function setTimerPreset(mins) {
    if (appState.timerRunning) resetTimer();
    const parsedMins = parseInt(mins);
    appState.timerSeconds = parsedMins * 60;
    appState.activeSessionDurationMinutes = parsedMins;
    document.getElementById("customMinutes").value = "";
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
    if (appState.timerRunning) {
        clearInterval(appState.timerInterval);
        appState.timerRunning = false;
        document.getElementById("startTimerBtn").innerHTML = `<i class="fa-solid fa-play"></i> Avvia`;
    } else {
        appState.timerRunning = true;
        document.getElementById("startTimerBtn").innerHTML = `<i class="fa-solid fa-pause"></i> Pausa`;
        
        appState.timerInterval = setInterval(() => {
            appState.timerSeconds--;
            if (appState.timerSeconds <= 0) {
                clearInterval(appState.timerInterval);
                appState.timerRunning = false;
                alert("Sessione Completata!");
                
                const selectedSub = document.getElementById("timerSubjectSelect").value;
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
    document.getElementById("startTimerBtn").innerHTML = `<i class="fa-solid fa-play"></i> Avvia`;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const mins = Math.floor(appState.timerSeconds / 60);
    const secs = appState.timerSeconds % 60;
    document.getElementById("timerDisplay").innerText = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateStudyHoursDisplay() {
    document.getElementById("timeBio").innerText = (appState.studyHours["Biologia"] || 0).toFixed(1) + "h";
    document.getElementById("timeChem").innerText = (appState.studyHours["Chimica"] || 0).toFixed(1) + "h";
    document.getElementById("timePhys").innerText = (appState.studyHours["Fisica"] || 0).toFixed(1) + "h";
}

function addCustomFlashcard() {
    const topic = document.getElementById("fcTopicSelect").value;
    const front = document.getElementById("fcFrontInput").value.trim();
    const back = document.getElementById("fcBackInput").value.trim();

    if (!front || !back) { alert("Compila sia la domanda che la risposta!"); return; }

    if (!appState.customFlashcards) appState.customFlashcards = [];
    const subject = appState.topicsData[topic] ? appState.topicsData[topic].subject : 'Generale';

    appState.customFlashcards.push({ topic, front, back, subject });
    saveState();

    document.getElementById("fcFrontInput").value = "";
    document.getElementById("fcBackInput").value = "";
    alert("Flashcard aggiunta con successo all'argomento: " + topic);
}

function flipCard() { document.getElementById("flashcardBox").classList.toggle("flipped"); }

function drawRandomFlashcard() {
    document.getElementById("flashcardBox").classList.remove("flipped");
    const sourceMode = document.getElementById("fcSourceSelect").value;
    const targetTopic = document.getElementById("fcSpecificTopicSelect").value;
    
    let pool = [];

    if (sourceMode === 'custom') {
        if (appState.customFlashcards && appState.customFlashcards.length > 0) {
            pool = appState.customFlashcards.map(c => ({ title: c.front, notes: c.back, topic: c.topic }));
        }
    } else if (sourceMode === 'specific_topic') {
        if (appState.customFlashcards) {
            appState.customFlashcards.filter(c => c.topic === targetTopic).forEach(c => {
                pool.push({ title: c.front, notes: c.back, topic: c.topic });
            });
        }
        const td = appState.topicsData[targetTopic];
        if (td) {
            pool.push({ title: targetTopic, notes: td.notes || "Nessuna nota aggiuntiva nel Syllabus.", topic: targetTopic });
        }
    } else if (sourceMode === 'all') {
        if (appState.customFlashcards) {
            appState.customFlashcards.forEach(c => {
                pool.push({ title: c.front, notes: c.back, topic: c.topic });
            });
        }
        Object.keys(appState.topicsData).forEach(t => {
            const td = appState.topicsData[t];
            pool.push({ title: t, notes: td.notes || "Nessuna nota aggiuntiva nel Syllabus.", topic: t });
        });
    }

    if (pool.length === 0) {
        document.getElementById("fcSubject").innerText = "INFO";
        document.getElementById("fcTopicTitle").innerText = "Nessuna carta trovata!";
        document.getElementById("fcNotes").innerText = "Non ci sono carte per i filtri selezionati.";
        return;
    }

    const card = pool[Math.floor(Math.random() * pool.length)];

    setTimeout(() => {
        document.getElementById("fcSubject").innerText = card.topic || "Generale";
        document.getElementById("fcTopicTitle").innerText = card.title;
        document.getElementById("fcNotes").innerText = card.notes;
    }, 200);
}

function addSimulation() {
    const correct = parseFloat(document.getElementById("simCorrect").value) || 0;
    const wrong = parseFloat(document.getElementById("simWrong").value) || 0;
    const omitted = parseFloat(document.getElementById("simOmitted").value) || 0;

    const score = (correct * 1.5) - (wrong * 0.4);
    appState.simulations.unshift({ date: new Date().toLocaleDateString('it-IT'), score: score.toFixed(1), correct, wrong, omitted });
    saveState();
    renderSimulationsHistory();
}

function renderSimulationsHistory() {
    const hist = document.getElementById("simulationsHistory");
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
    document.getElementById(tabId).classList.add("active");
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
    document.getElementById("themeBtn").innerHTML = appState.theme === 'dark' ? `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`;
}