// Dungeon and Level System for Solo Leveling

'use strict';

// Initialize dungeon system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dungeon database
    const dungeons = [
        {
            id: 1,
            name: "Forest of Shadows",
            difficulty: "E-RANK",
            description: "A dark forest filled with low-level monsters. Perfect for beginners.",
            monsterTypes: ["Wolf", "Goblin", "Slime", "Bat"],
            bossName: "Alpha Wolf",
            clearExp: 100,
            clearGold: 200,
            clearChance: 0.9, // 90% chance of success for beginners
            progressRequired: 100,
            progressPerExplore: 10
        },
        {
            id: 2,
            name: "Abandoned Mine",
            difficulty: "D-RANK",
            description: "An old mine infested with monsters and containing valuable minerals.",
            monsterTypes: ["Kobold", "Spider", "Skeleton", "Zombie"],
            bossName: "Mine Overseer",
            clearExp: 200,
            clearGold: 350,
            clearChance: 0.75, // 75% chance of success
            progressRequired: 100,
            progressPerExplore: 8
        },
        {
            id: 3,
            name: "Ancient Temple",
            difficulty: "C-RANK",
            description: "A mysterious temple with powerful guardians and ancient treasures.",
            monsterTypes: ["Guardian Statue", "Cultist", "Mummy", "Phantom"],
            bossName: "Temple High Priest",
            clearExp: 350,
            clearGold: 500,
            clearChance: 0.6, // 60% chance of success
            progressRequired: 100,
            progressPerExplore: 5
        }
    ];

    // Cache DOM elements
    const dungeonBtns = document.querySelectorAll('.enter-dungeon');
    const dungeonScreen = document.getElementById('dungeon-screen');
    const dungeonBackBtn = document.getElementById('dungeon-back-btn');
    const dungeonName = document.getElementById('dungeon-name');
    const dungeonStatusText = document.getElementById('dungeon-status-text');
    const dungeonProgressFill = document.querySelector('.dungeon-progress-fill');
    const dungeonProgressText = document.querySelector('.dungeon-progress-fill + .progress-text');
    const dungeonLogContainer = document.getElementById('dungeon-log-container');
    
    // Dungeon action buttons
    const exploreBtn = document.getElementById('explore-btn');
    const fightBtn = document.getElementById('fight-btn');
    const restBtn = document.getElementById('rest-btn');
    const clearDungeonBtn = document.getElementById('clear-dungeon-btn');
    
    // Audio elements
    const buttonClickSound = document.getElementById('button-click');
    const questCompleteSound = document.getElementById('quest-complete');
    const dungeonClearSound = document.getElementById('dungeon-clear');
    
    // Current dungeon state
    let currentDungeon = null;
    let dungeonProgress = 0;
    let currentMonster = null;
    let playerHP = 100;
    let playerMaxHP = 100;
    let playerMP = 50;
    let playerMaxMP = 50;
    
    // Add event listeners to dungeon buttons
    dungeonBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            const dungeonId = parseInt(e.target.getAttribute('data-dungeon-id'));
            enterDungeon(dungeonId);
        });
    });
    
    // Back button event listener
    dungeonBackBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        leaveDungeon();
    });
    
    // Explore button event listener
    exploreBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        exploreDungeon();
    });
    
    // Fight button event listener
    fightBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        fightMonster();
    });
    
    // Rest button event listener
    restBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        rest();
    });
    
    // Clear dungeon button event listener
    clearDungeonBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        clearDungeon();
    });
    
    // Enter a dungeon
    function enterDungeon(dungeonId) {
        // Find the dungeon data
        currentDungeon = dungeons.find(d => d.id === dungeonId);
        if (!currentDungeon) return;
        
        // Reset dungeon state
        dungeonProgress = 0;
        currentMonster = null;
        playerHP = 100; // Reset HP for dungeon
        playerMP = 50;  // Reset MP for dungeon
        
        // Update UI
        dungeonName.textContent = currentDungeon.name;
        dungeonStatusText.textContent = "Ready to begin exploration.";
        updateDungeonProgress();
        
        // Clear log
        dungeonLogContainer.innerHTML = '';
        addLogEntry("System: Dungeon exploration ready to begin.");
        
        // Reset buttons
        exploreBtn.disabled = false;
        fightBtn.disabled = true;
        restBtn.disabled = true;
        clearDungeonBtn.disabled = true;
        
        // Show dungeon screen with transition
        document.getElementById('player-screen').classList.remove('active');
        dungeonScreen.classList.add('active');
        dungeonScreen.classList.add('page-transition');
    }
    
    // Leave dungeon
    function leaveDungeon() {
        // Hide dungeon screen
        dungeonScreen.classList.remove('active');
        document.getElementById('player-screen').classList.add('active');
        
        // Reset dungeon state
        currentDungeon = null;
        dungeonProgress = 0;
        currentMonster = null;
    }
    
    // Explore the dungeon
    function exploreDungeon() {
        // Disable explore button temporarily
        exploreBtn.disabled = true;
        
        // Add log entry
        addLogEntry("You: Exploring the dungeon...");
        
        // Simulate exploration delay
        setTimeout(() => {
            // Increase progress
            dungeonProgress += currentDungeon.progressPerExplore;
            if (dungeonProgress > currentDungeon.progressRequired) {
                dungeonProgress = currentDungeon.progressRequired;
            }
            
            // Update progress bar
            updateDungeonProgress();
            
            // Random events during exploration
            const eventRoll = Math.random();
            
            if (eventRoll < 0.6) {
                // Encounter monster (60% chance)
                encounterMonster();
            } else if (eventRoll < 0.8) {
                // Find item (20% chance)
                findItem();
            } else {
                // Nothing happens (20% chance)
                addLogEntry("You explore the area but find nothing of interest.");
                exploreBtn.disabled = false;
            }
            
            // Check if dungeon can be cleared
            if (dungeonProgress >= currentDungeon.progressRequired) {
                clearDungeonBtn.disabled = false;
                addLogEntry("System: Dungeon exploration complete. You can now clear the dungeon.");
            }
        }, 1500); // 1.5 second delay for exploration
    }
    
    // Encounter a monster
    function encounterMonster() {
        // Select random monster type from dungeon
        const monsterType = currentDungeon.monsterTypes[Math.floor(Math.random() * currentDungeon.monsterTypes.length)];
        
        // Create monster data
        currentMonster = {
            type: monsterType,
            hp: 30 + Math.floor(Math.random() * 20), // 30-50 HP
            damage: 5 + Math.floor(Math.random() * 5) // 5-10 damage
        };
        
        // Update UI
        addLogEntry(`You encountered a ${currentMonster.type}!`);
        dungeonStatusText.textContent = `Fighting ${currentMonster.type} (HP: ${currentMonster.hp})`;
        
        // Enable fight and rest buttons
        fightBtn.disabled = false;
        restBtn.disabled = false;
        exploreBtn.disabled = true;
    }
    
    // Find an item
    function findItem() {
        const items = ["Health Potion", "Mana Potion", "Gold Coins", "Magic Scroll"];
        const item = items[Math.floor(Math.random() * items.length)];
        
        addLogEntry(`You found a ${item}!`);
        
        // Apply item effects
        if (item === "Health Potion") {
            playerHP = Math.min(playerHP + 30, playerMaxHP);
            addLogEntry(`You used the Health Potion and recovered 30 HP. (Current HP: ${playerHP}/${playerMaxHP})`);
        } else if (item === "Mana Potion") {
            playerMP = Math.min(playerMP + 20, playerMaxMP);
            addLogEntry(`You used the Mana Potion and recovered 20 MP. (Current MP: ${playerMP}/${playerMaxMP})`);
        } else if (item === "Gold Coins") {
            const goldAmount = 10 + Math.floor(Math.random() * 20); // 10-30 gold
            addLogEntry(`You collected ${goldAmount} Gold Coins.`);
            // In a real implementation, we would update the player's gold count here
        } else if (item === "Magic Scroll") {
            addLogEntry("You found a Magic Scroll. It might be useful later.");
            // In a real implementation, we would add this to the player's inventory
        }
        
        // Re-enable explore button
        exploreBtn.disabled = false;
    }
    
    // Fight the current monster
    function fightMonster() {
        // Disable buttons during fight
        fightBtn.disabled = true;
        restBtn.disabled = true;
        
        // Player attacks monster
        const playerDamage = 10 + Math.floor(Math.random() * 5); // 10-15 damage
        currentMonster.hp -= playerDamage;
        
        addLogEntry(`You attack the ${currentMonster.type} for ${playerDamage} damage!`);
        
        // Check if monster is defeated
        if (currentMonster.hp <= 0) {
            defeatMonster();
            return;
        }
        
        // Monster attacks player
        const monsterDamage = currentMonster.damage;
        playerHP -= monsterDamage;
        
        addLogEntry(`The ${currentMonster.type} attacks you for ${monsterDamage} damage!`);
        addLogEntry(`Your HP: ${playerHP}/${playerMaxHP}`);
        
        // Check if player is defeated
        if (playerHP <= 0) {
            playerDefeated();
            return;
        }
        
        // Update status
        dungeonStatusText.textContent = `Fighting ${currentMonster.type} (HP: ${currentMonster.hp})`;
        
        // Re-enable buttons after delay
        setTimeout(() => {
            fightBtn.disabled = false;
            restBtn.disabled = false;
        }, 1000);
    }
    
    // Defeat the current monster
    function defeatMonster() {
        addLogEntry(`You defeated the ${currentMonster.type}!`);
        
        // Award EXP and gold
        const expGain = 10 + Math.floor(Math.random() * 10); // 10-20 EXP
        const goldGain = 5 + Math.floor(Math.random() * 10); // 5-15 gold
        
        addLogEntry(`You gained ${expGain} EXP and ${goldGain} Gold.`);
        
        // In a real implementation, we would update the player's EXP and gold here
        // and check for level up
        
        // Reset monster
        currentMonster = null;
        
        // Update status
        dungeonStatusText.textContent = "Monster defeated. Continue exploring.";
        
        // Re-enable explore button
        exploreBtn.disabled = false;
    }
    
    // Player is defeated
    function playerDefeated() {
        addLogEntry("You have been defeated!");
        
        // Reset dungeon progress (penalty for defeat)
        dungeonProgress = Math.max(0, dungeonProgress - 20);
        updateDungeonProgress();
        
        // Reset monster
        currentMonster = null;
        
        // Restore some HP
        playerHP = Math.max(20, playerMaxHP * 0.2); // Restore to 20% of max HP or 20, whichever is higher
        
        // Update status
        dungeonStatusText.textContent = "You were defeated. Rest to recover.";
        
        // Enable rest button only
        restBtn.disabled = false;
        fightBtn.disabled = true;
        exploreBtn.disabled = true;
    }
    
    // Rest to recover HP and MP
    function rest() {
        // Disable buttons during rest
        restBtn.disabled = true;
        fightBtn.disabled = true;
        exploreBtn.disabled = true;
        
        addLogEntry("You are resting...");
        
        // Simulate rest delay
        setTimeout(() => {
            // Recover HP and MP
            const hpRecovery = Math.floor(playerMaxHP * 0.3); // Recover 30% of max HP
            const mpRecovery = Math.floor(playerMaxMP * 0.3); // Recover 30% of max MP
            
            playerHP = Math.min(playerHP + hpRecovery, playerMaxHP);
            playerMP = Math.min(playerMP + mpRecovery, playerMaxMP);
            
            addLogEntry(`You recovered ${hpRecovery} HP and ${mpRecovery} MP.`);
            addLogEntry(`Your HP: ${playerHP}/${playerMaxHP}, MP: ${playerMP}/${playerMaxMP}`);
            
            // Update status
            dungeonStatusText.textContent = "Rested and recovered. Continue exploring.";
            
            // Re-enable explore button
            exploreBtn.disabled = false;
        }, 2000); // 2 second delay for resting
    }
    
    // Clear the dungeon
    function clearDungeon() {
        // Disable all buttons
        clearDungeonBtn.disabled = true;
        exploreBtn.disabled = true;
        fightBtn.disabled = true;
        restBtn.disabled = true;
        
        addLogEntry("Attempting to clear the dungeon...");
        
        // Add loading class to dungeon screen
        dungeonScreen.classList.add('loading-quest');
        
        // Simulate clearing delay
        setTimeout(() => {
            // Remove loading class
            dungeonScreen.classList.remove('loading-quest');
            
            // Determine if dungeon clear is successful based on clearChance
            const clearRoll = Math.random();
            
            if (clearRoll <= currentDungeon.clearChance) {
                // Success
                dungeonCleared();
            } else {
                // Failure
                dungeonClearFailed();
            }
        }, 3000); // 3 second delay for clearing attempt
    }
    
    // Successfully clear the dungeon
    function dungeonCleared() {
        // Play dungeon clear sound
        if (dungeonClearSound) dungeonClearSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Add cleared class to dungeon screen
        dungeonScreen.classList.add('dungeon-cleared');
        
        addLogEntry(`Congratulations! You cleared the ${currentDungeon.name}!`);
        addLogEntry(`You gained ${currentDungeon.clearExp} EXP and ${currentDungeon.clearGold} Gold.`);
        
        // In a real implementation, we would update the player's EXP and gold here
        // and check for level up
        
        // Update status
        dungeonStatusText.textContent = "Dungeon cleared successfully!";
        
        // Simulate delay before returning to player screen
        setTimeout(() => {
            // Remove cleared class
            dungeonScreen.classList.remove('dungeon-cleared');
            
            // Return to player screen
            leaveDungeon();
            
            // Show level up popup (for demonstration)
            showLevelUpPopup();
        }, 3000); // 3 second delay to show cleared message
    }
    
    // Fail to clear the dungeon
    function dungeonClearFailed() {
        addLogEntry(`Failed to clear the dungeon. The ${currentDungeon.bossName} was too powerful!`);
        
        // Reduce player HP as penalty
        playerHP = Math.max(10, playerHP - 50);
        
        addLogEntry(`You took heavy damage. HP: ${playerHP}/${playerMaxHP}`);
        
        // Update status
        dungeonStatusText.textContent = "Failed to clear the dungeon. Recover and try again.";
        
        // Re-enable buttons
        exploreBtn.disabled = false;
        restBtn.disabled = false;
        
        // Only re-enable clear button if progress is still 100%
        if (dungeonProgress >= currentDungeon.progressRequired) {
            clearDungeonBtn.disabled = false;
        }
    }
    
    // Update dungeon progress bar
    function updateDungeonProgress() {
        const progressPercent = (dungeonProgress / currentDungeon.progressRequired) * 100;
        dungeonProgressFill.style.width = `${progressPercent}%`;
        dungeonProgressText.textContent = `${Math.floor(progressPercent)}%`;
    }
    
    // Add entry to dungeon log
    function addLogEntry(text) {
        const entry = document.createElement('p');
        entry.className = 'log-entry';
        entry.textContent = text;
        dungeonLogContainer.appendChild(entry);
        
        // Scroll to bottom
        dungeonLogContainer.scrollTop = dungeonLogContainer.scrollHeight;
    }
    
    // Show level up popup
    function showLevelUpPopup() {
        const levelUpPopup = document.getElementById('level-up-popup');
        const newLevelSpan = document.getElementById('new-level');
        const levelUpConfirmBtn = document.getElementById('level-up-confirm');
        const levelUpSound = document.getElementById('level-up-sound');
        
        // Set new level (for demonstration)
        const newLevel = 2;
        newLevelSpan.textContent = newLevel;
        
        // Play level up sound
        if (levelUpSound) levelUpSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Show popup with animation
        levelUpPopup.style.display = 'block';
        levelUpPopup.classList.add('level-up-animation');
        
        // Add event listener to confirm button
        levelUpConfirmBtn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            // Hide popup
            levelUpPopup.style.display = 'none';
            
            // Update player level in UI
            document.getElementById('player-level').textContent = newLevel;
            document.getElementById('player-level').classList.add('level-up-animation');
            
            // Check if new skills are unlocked
            if (newLevel === 5) {
                // Show skill popup after a delay
                setTimeout(showSkillPopup, 1000);
            }
        });
    }
    
    // Show skill acquisition popup
    function showSkillPopup() {
        const skillPopup = document.getElementById('skill-popup');
        const newSkillName = document.getElementById('new-skill-name');
        const newSkillDescription = document.getElementById('new-skill-description');
        const acquireSkillBtn = document.getElementById('acquire-skill-btn');
        const declineSkillBtn = document.getElementById('decline-skill-btn');
        const skillUnlockSound = document.getElementById('skill-unlock');
        
        // Set skill details (for demonstration)
        newSkillName.textContent = "Shadow Extraction";
        newSkillDescription.textContent = "Extract shadows from defeated enemies to create loyal servants.";
        
        // Play skill unlock sound
        if (skillUnlockSound) skillUnlockSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Show popup with animation
        skillPopup.style.display = 'block';
        skillPopup.classList.add('skill-unlock-animation');
        
        // Add event listener to acquire button
        acquireSkillBtn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            // Hide popup
            skillPopup.style.display = 'none';
            
            // Unlock the skill in UI
            const shadowExtractionSkill = document.querySelector('.skill[data-skill-id="3"]');
            shadowExtractionSkill.classList.remove('locked');
            shadowExtractionSkill.classList.add('skill-unlock-animation');
            
            // Update skill info
            const skillIcon = shadowExtractionSkill.querySelector('.skill-icon');
            skillIcon.innerHTML = ''; // Remove lock icon
            
            const skillLevel = shadowExtractionSkill.querySelector('.skill-level');
            skillLevel.textContent = 'Level 1';
            
            const skillUnlock = shadowExtractionSkill.querySelector('.skill-unlock');
            skillUnlock.innerHTML = '<span>Active</span>';
        });
        
        // Add event listener to decline button
        declineSkillBtn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            // Hide popup
            skillPopup.style.display = 'none';
        });
    }
});
