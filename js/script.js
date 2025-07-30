    // Liste de mots par niveau de difficulté
        const wordLists = {
            easy: [
                "bon", "sel", "mer", "ciel", "sol", "vent", "feu", "eau", "jour", "nuit",
                "main", "pied", "tête", "bras", "dos", "rue", "ville", "pont", "arbre", "fleur",
                "chat", "chien", "oiseau", "poisson", "lune", "étoile", "pluie", "neige", "sable", "terre",
                "pain", "lait", "œuf", "riz", "sucre", "sel", "poivre", "thé", "café", "eau",
                "lit", "table", "chaise", "porte", "fenêtre", "mur", "toit", "clé", "livre", "stylo"
            ],
            medium: [
                "bonjour", "soleil", "maison", "forêt", "rivière", "montagne", "chemin", "pierre", "sable", "horizon",
                "amour", "joie", "paix", "espoir", "rêve", "vie", "bonheur", "liberté", "force", "courage",
                "temps", "lumière", "ombre", "aube", "crépuscule", "voyage", "aventure", "découverte", "mystère", "secret",
                "histoire", "légende", "magie", "destin", "énergie", "esprit", "pensée", "sourire", "silence", "bruit",
                "jardin", "fleur", "ciel", "étoile", "lune", "vent", "pluie", "neige", "soleil", "nuage"
            ],
            hard: [
                "philosophie", "démocratie", "révolution", "astronomie", "psychologie", "architecture", "civilisation", "technologie", "exploration", "inspiration",
                "persévérance", "imagination", "créativité", "authentique", "méditation", "contemplation", "réflexion", "introspection", "évolution", "transformation",
                "paradoxe", "symbiose", "équilibre", "harmonie", "sérénité", "prospérité", "authenticité", "générosité", "solidarité", "fraternité",
                "astronaute", "scientifique", "philosophe", "explorateur", "inventeur", "artisan", "poète", "écrivain", "musicien", "peintre",
                "constellation", "galaxie", "nébuleuse", "planétaire", "orbite", "gravité", "écosystème", "biodiversité", "environnement", "patrimoine"
            ]
        };

        // Variables globales
        let gameState = {
            active: false,
            paused: false,
            currentWordIndex: 0,
            score: 0,
            correctWords: 0,
            totalWords: 0,
            timeLeft: 120,
            difficulty: 'easy',
            currentWords: [],
            startTime: null,
            wpm: 0,
            accuracy: 100
        };

        let gameTimer;
        let wpmTimer;

        // DOM Elements
        const elements = {
            wordInput: document.getElementById('wordInput'),
            currentWord: document.getElementById('currentWord'),
            score: document.getElementById('score'),
            timer: document.getElementById('timer'),
            wordsRemaining: document.getElementById('wordsRemaining'),
            progressBar: document.getElementById('progressBar'),
            startGameBtn: document.getElementById('startGame'),
            pauseGameBtn: document.getElementById('pauseGame'),
            resetGameBtn: document.getElementById('resetGame'),
            messageArea: document.getElementById('messageArea'),
            gameResults: document.getElementById('gameResults')
        };

        // Modals
        const gameOverModal = document.getElementById('gameOverModal');

        // Initialize app
        document.addEventListener('DOMContentLoaded', () => {
            setupEventListeners();
            resetGameState();
        });

        // Setup event 
        function setupEventListeners() {
            // Game controls
            elements.startGameBtn.addEventListener('click', startGame);
            elements.pauseGameBtn.addEventListener('click', togglePause);
            elements.resetGameBtn.addEventListener('click', resetGame);
            elements.wordInput.addEventListener('input', handleWordInput);
            elements.wordInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && gameState.active && !gameState.paused) checkWord();
            });

            // Difficulty selection
            document.querySelectorAll('.difficulty-option').forEach(option => {
                option.addEventListener('click', () => selectDifficulty(option.dataset.difficulty));
            });

            // Close mode
            document.getElementById('closeModal').addEventListener('click', () => {
                gameOverModal.classList.add('hidden');
            });

            // Keyboard 
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.key === ' ') {
                    e.preventDefault();
                    if (!gameState.active) startGame();
                    else togglePause();
                }
                if (e.key === 'Escape' && gameState.active) togglePause();
            });

            
            document.getElementById('play').addEventListener('contextmenu', (e) => {
                e.preventDefault();
            });
        }

        //  sections
        function showSection(sectionName) {
            const sections = ['home', 'play'];
            sections.forEach(section => {
                const element = document.getElementById(section);
                if (section === sectionName) {
                    element.classList.remove('hidden');
                } else {
                    element.classList.add('hidden');
                }
            });
        }

        // level de difficulté
        function selectDifficulty(difficulty) {
            if (gameState.active) return;
            gameState.difficulty = difficulty;
            document.querySelectorAll('.difficulty-option').forEach(option => {
                option.classList.remove('active', 'border-primary');
                option.classList.add('border-gray-200');
            });
            const selectedOption = document.querySelector(`[data-difficulty="${difficulty}"]`);
            selectedOption.classList.add('active', 'border-primary');
            selectedOption.classList.remove('border-gray-200');
            const timeMap = { easy: 120, medium: 90, hard: 60 };
            gameState.timeLeft = timeMap[difficulty];
            gameState.currentWords = [...wordLists[difficulty]].sort(() => Math.random() - 0.5).slice(0, 50);
            resetGameState();
            elements.timer.textContent = gameState.timeLeft;
            elements.currentWord.textContent = 'Appuyez sur Démarrer';
            showMessage(`Niveau ${difficulty.toUpperCase()} sélectionné !`, 'success');
        }

        // Start game
        function startGame() {
            if (gameState.active) return;
            gameState = {
                active: true,
                paused: false,
                currentWordIndex: 0,
                score: 0,
                correctWords: 0,
                totalWords: 0,
                timeLeft: gameState.difficulty === 'easy' ? 120 : gameState.difficulty === 'medium' ? 90 : 60,
                difficulty: gameState.difficulty,
                currentWords: [...wordLists[gameState.difficulty]].sort(() => Math.random() - 0.5).slice(0, 50),
                startTime: Date.now(),
                wpm: 0,
                accuracy: 100
            };
            elements.startGameBtn.classList.add('hidden');
            elements.pauseGameBtn.classList.remove('hidden');
            elements.wordInput.disabled = false;
            elements.wordInput.focus();
            displayNextWord();
            startTimer();
            startWPMCalculation();
            showMessage('Jeu commencé ! Bonne chance !', 'success');
        }

        // Toggle pause
        function togglePause() {
            if (!gameState.active) return;
            gameState.paused = !gameState.paused;
            if (gameState.paused) {
                clearInterval(gameTimer);
                clearInterval(wpmTimer);
                elements.pauseGameBtn.innerHTML = '<i class="fas fa-play mr-2"></i>Reprendre';
                elements.wordInput.disabled = true;
                showMessage('Jeu en pause', 'warning');
            } else {
                startTimer();
                startWPMCalculation();
                elements.pauseGameBtn.innerHTML = '<i class="fas fa-pause mr-2"></i>Pause';
                elements.wordInput.disabled = false;
                elements.wordInput.focus();
                showMessage('Jeu repris !', 'success');
            }
        }

        // Reset game
        function resetGame() {
            endGame(false);
        }

        // Start timer
        function startTimer() {
            gameTimer = setInterval(() => {
                gameState.timeLeft--;
                elements.timer.textContent = gameState.timeLeft;
                if (gameState.timeLeft <= 0) endGame(true);
                elements.timer.style.color = gameState.timeLeft <= 10 ? '#ef4444' :
                                           gameState.timeLeft <= 30 ? '#f59e0b' : '';
            }, 1000);
        }

        // Start calculation
        function startWPMCalculation() {
            wpmTimer = setInterval(() => {
                const timeElapsed = (Date.now() - gameState.startTime) / 1000 / 60;
                gameState.wpm = Math.round((gameState.correctWords / timeElapsed) || 0);
                elements.wpm.textContent = gameState.wpm;
            }, 1000);
        }

        // next word
        function displayNextWord() {
            if (gameState.currentWordIndex < gameState.currentWords.length) {
                elements.currentWord.textContent = gameState.currentWords[gameState.currentWordIndex];
                elements.wordInput.value = '';
                elements.wordInput.classList.remove('correct-pulse', 'incorrect-shake');
            } else {
                endGame(true);
            }
        }

        // word input
        function handleWordInput() {
            const typed = elements.wordInput.value.trim().toLowerCase();
            const target = elements.currentWord.textContent.toLowerCase();
            if (typed.length === target.length) {
                checkWord();
            } else if (target.startsWith(typed)) {
                elements.wordInput.classList.remove('incorrect-shake');
            } else {
                elements.wordInput.classList.add('incorrect-shake');
                elements.wordInput.classList.remove('correct-pulse');
            }
        }

        //  word
        function checkWord() {
            const typed = elements.wordInput.value.trim().toLowerCase();
            const target = elements.currentWord.textContent.toLowerCase();
            if (typed === target) {
                gameState.score += getDifficultyPoints();
                gameState.correctWords++;
                elements.wordInput.classList.add('correct-pulse');
                elements.wordInput.classList.remove('incorrect-shake');
                showMessage(`Correct ! +${getDifficultyPoints()} points`, 'success');
            } else {
                gameState.score = Math.max(0, gameState.score - 5);
                elements.wordInput.classList.add('incorrect-shake');
                elements.wordInput.classList.remove('correct-pulse');
                showMessage('Incorrect... -5 points', 'error');
            }
            gameState.totalWords++;
            gameState.currentWordIndex++;
            gameState.accuracy = Math.round((gameState.correctWords / gameState.totalWords) * 100);
            updateGameDisplay();
            displayNextWord();
        }

        // Get points based on partie
        function getDifficultyPoints() {
            return { easy: 10, medium: 15, hard: 25 }[gameState.difficulty];
        }

        // Update
        function updateGameDisplay() {
            elements.score.textContent = gameState.score;
            elements.wordsRemaining.textContent = gameState.currentWords.length - gameState.currentWordIndex;
            const progress = (gameState.currentWordIndex / gameState.currentWords.length) * 100;
            elements.progressBar.style.width = `${progress}%`;
        }

        // End game
        function endGame(completed) {
            gameState.active = false;
            gameState.paused = false;
            clearInterval(gameTimer);
            clearInterval(wpmTimer);
            elements.startGameBtn.classList.remove('hidden');
            elements.pauseGameBtn.classList.add('hidden');
            elements.wordInput.disabled = true;
            elements.timer.style.color = '';
            if (completed) {
                showGameOverModal();
            } else {
                elements.currentWord.textContent = 'Appuyez sur Démarrer';
                showMessage('Jeu réinitialisé', 'warning');
            }
            resetGameState();
        }

        // Reset game
        function resetGameState() {
            gameState.currentWordIndex = 0;
            gameState.score = 0;
            gameState.correctWords = 0;
            gameState.totalWords = 0;
            gameState.timeLeft = gameState.difficulty === 'easy' ? 120 : gameState.difficulty === 'medium' ? 90 : 60;
            gameState.wpm = 0;
            gameState.accuracy = 100;
            gameState.currentWords = [...wordLists[gameState.difficulty]].sort(() => Math.random() - 0.5).slice(0, 50);
            updateGameDisplay();
            elements.wpm.textContent = gameState.wpm;
            elements.currentWord.textContent = 'Appuyez sur Démarrer';
        }

        // if game over modal
        function showGameOverModal() {
            const results = `
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mb-6">
                    <div class="p-4 bg-blue-50 rounded-xl">
                        <span class="text-3xl font-bold text-primary">${gameState.score}</span>
                        <div class="mt-1 text-gray-600">Score Final</div>
                    </div>
                    <div class="p-4 bg-green-50 rounded-xl">
                        <span class="text-3xl font-bold text-green-500">${gameState.correctWords}</span>
                        <div class="mt-1 text-gray-600">Mots Corrects</div>
                    </div>
                    <div class="p-4 bg-yellow-50 rounded-xl">
                        <span class="text-3xl font-bold text-yellow-500">${gameState.wpm}</span>
                        <div class="mt-1 text-gray-600">Mots/Min</div>
                    </div>
                    <div class="p-4 bg-blue-50 rounded-xl">
                        <span class="text-3xl font-bold text-blue-500">${gameState.accuracy}%</span>
                        <div class="mt-1 text-gray-600">Précision</div>
                    </div>
                </div>
                <div class="text-center">
                    <p class="text-gray-600">Difficulté: <span class="font-bold">${gameState.difficulty.toUpperCase()}</span></p>
                </div>
            `;
            elements.gameResults.innerHTML = results;
            gameOverModal.classList.remove('hidden');
        }

        // Start game
        function startNewGame() {
            gameOverModal.classList.add('hidden');
            resetGameState();
            setTimeout(startGame, 500);
        }

        // display
        function updateDisplay() {
            elements.score.textContent = gameState.score;
            elements.timer.textContent = gameState.timeLeft;
            elements.wordsRemaining.textContent = gameState.currentWords.length - gameState.currentWordIndex;
            elements.wpm.textContent = gameState.wpm;
        }

        // message
        function showMessage(text, type) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message-slide p-4 rounded-xl text-center font-medium ${type === 'success' ? 'bg-green-100 text-green-700' : type === 'error' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`;
            messageDiv.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'exclamation'}-circle mr-2"></i>${text}`;
            elements.messageArea.innerHTML = '';
            elements.messageArea.appendChild(messageDiv);
            setTimeout(() => messageDiv.remove(), 3000);
        }