// Main JavaScript for Solo Leveling System

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const welcomeScreen = document.getElementById('welcome-screen');
    const playerScreen = document.getElementById('player-screen');
    const declineScreen = document.getElementById('decline-screen');
    const finalDeclineScreen = document.getElementById('final-decline-screen');
    const dungeonScreen = document.getElementById('dungeon-screen');
    
    const becomePlayerBtn = document.getElementById('become-player');
    const declinePlayerBtn = document.getElementById('decline-player');
    const reconsiderBtn = document.getElementById('reconsider-btn');
    const finalDeclineBtn = document.getElementById('final-decline-btn');
    const lastChanceBtn = document.getElementById('last-chance-btn');
    const permanentDeclineBtn = document.getElementById('permanent-decline-btn');
    const playerBackBtn = document.getElementById('player-back-btn');
    const finalDeclineBackBtn = document.getElementById('final-decline-back-btn');
    
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');
    
    const questBtns = document.querySelectorAll('.accept-quest');
    const inventorySlots = document.querySelectorAll('.inventory-slot');
    const itemUseBtn = document.querySelector('.item-use-btn');
    
    const playerLevel = document.getElementById('player-level');
    const expFill = document.querySelector('.exp-fill');
    const expText = document.querySelector('.exp-fill + .progress-text');
    
    const systemTime = document.getElementById('system-time');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Audio elements
    const buttonClickSound = document.getElementById('button-click');
    const levelUpSound = document.getElementById('level-up-sound');
    const questCompleteSound = document.getElementById('quest-complete');
    const skillUnlockSound = document.getElementById('skill-unlock');
    const backgroundMusic = document.getElementById('background-music');
    
    // Game state
    let playerExp = 0;
    let playerMaxExp = 100;
    let currentLevel = 1;
    let questsCompleted = 0;
    let inventoryItems = [];
    
    // Initialize the system
    initSystem();
    
    // Initialize the system
    function initSystem() {
        // Show loading overlay
        loadingOverlay.style.display = 'flex';
        
        // Generate floating particles
        generateParticles();
        
        // Update system time
        updateSystemTime();
        setInterval(updateSystemTime, 1000);
        
        // Hide loading overlay after 2 seconds
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            
            // Play background music (if enabled)
            if (backgroundMusic) {
                backgroundMusic.volume = 0.3; // Set volume to 30%
                backgroundMusic.play().catch(e => console.log("Audio play failed:", e));
            }
            
            // Add welcome-screen-active class to system-container
            document.querySelector('.system-container').classList.add('welcome-screen-active');
        }, 2000);
    }
    
    // Generate floating particles
    function generateParticles() {
        const particlesContainer = document.getElementById('particles-container');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size (1-3px)
            const size = 1 + Math.random() * 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            
            // Random delay
            particle.style.animationDelay = `${Math.random() * 15}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Update system time
    function updateSystemTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        systemTime.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('button').forEach(button => {
        button.classList.add('ripple');
        
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Event Listeners
    
    // Become Player button
    becomePlayerBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide welcome screen, show player screen
        welcomeScreen.classList.remove('active');
        playerScreen.classList.add('active');
        playerScreen.classList.add('page-transition');
        
        // Remove welcome-screen-active class and add player-screen-active class
        document.querySelector('.system-container').classList.remove('welcome-screen-active');
        document.querySelector('.system-container').classList.add('player-screen-active');
        
        // Initialize inventory with some items
        addItemToInventory('Health Potion', 'Consumable', 'Restores 30 HP when used.', ['HP +30'], 'potion_red.png');
        addItemToInventory('Mana Potion', 'Consumable', 'Restores 20 MP when used.', ['MP +20'], 'potion_blue.png');
        addItemToInventory('Ancient Artifact', 'Quest Item', 'A mysterious artifact with unknown powers.', ['???'], 'artifact.png');
    });
    
    // Decline Player button
    declinePlayerBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide welcome screen, show decline screen
        welcomeScreen.classList.remove('active');
        declineScreen.classList.add('active');
        declineScreen.classList.add('page-transition');
    });
    
    // Reconsider button
    reconsiderBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide decline screen, show welcome screen
        declineScreen.classList.remove('active');
        welcomeScreen.classList.add('active');
        welcomeScreen.classList.add('page-transition');
    });
    
    // Final Decline button
    finalDeclineBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide decline screen, show final decline screen
        declineScreen.classList.remove('active');
        finalDeclineScreen.classList.add('active');
        finalDeclineScreen.classList.add('page-transition');
    });
    
    // Last Chance button
    lastChanceBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide final decline screen, show player screen
        finalDeclineScreen.classList.remove('active');
        playerScreen.classList.add('active');
        playerScreen.classList.add('page-transition');
        
        // Remove welcome-screen-active class and add player-screen-active class
        document.querySelector('.system-container').classList.remove('welcome-screen-active');
        document.querySelector('.system-container').classList.add('player-screen-active');
        
        // Initialize inventory with some items
        addItemToInventory('Health Potion', 'Consumable', 'Restores 30 HP when used.', ['HP +30'], 'potion_red.png');
        addItemToInventory('Mana Potion', 'Consumable', 'Restores 20 MP when used.', ['MP +20'], 'potion_blue.png');
        addItemToInventory('Ancient Artifact', 'Quest Item', 'A mysterious artifact with unknown powers.', ['???'], 'artifact.png');
    });
    
    // Permanent Decline button
    permanentDeclineBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Show a final message
        finalDeclineScreen.innerHTML = `
            <div class="final-decline-message">
                <h2 class="glitch-text system-alert" data-text="SYSTEM SHUTDOWN">SYSTEM SHUTDOWN</h2>
                <p>You have permanently declined the System's offer.</p>
                <p>The System will now shut down.</p>
                <p>Goodbye, human.</p>
                <button class="restart-btn glow-border hover-glow" id="restart-btn">RESTART SYSTEM</button>
            </div>
        `;
        
        // Add event listener to restart button
        document.getElementById('restart-btn').addEventListener('click', () => {
            // Reload the page
            window.location.reload();
        });
    });
    
    // Player Back button
    playerBackBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide player screen, show welcome screen
        playerScreen.classList.remove('active');
        welcomeScreen.classList.add('active');
        welcomeScreen.classList.add('page-transition');
        
        // Remove player-screen-active class and add welcome-screen-active class
        document.querySelector('.system-container').classList.remove('player-screen-active');
        document.querySelector('.system-container').classList.add('welcome-screen-active');
    });
    
    // Final Decline Back button
    finalDeclineBackBtn.addEventListener('click', () => {
        // Play button click sound
        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Hide final decline screen, show decline screen
        finalDeclineScreen.classList.remove('active');
        declineScreen.classList.add('active');
        declineScreen.classList.add('page-transition');
    });
    
    // Navigation buttons
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            const targetId = btn.getAttribute('data-target');
            
            // Remove active class from all buttons and sections
            navBtns.forEach(b => b.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked button and target section
            btn.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            document.getElementById(targetId).classList.add('page-transition');
        });
    });
    
    // Quest buttons
    questBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            const quest = btn.closest('.quest');
            const questId = quest.getAttribute('data-quest-id');
            
            // Change button text and disable
            btn.textContent = 'IN PROGRESS';
            btn.disabled = true;
            btn.classList.remove('accept-quest');
            btn.classList.add('complete-quest');
            
            // Add loading class to quest
            quest.classList.add('loading-quest');
            
            // After a delay, complete the quest
            setTimeout(() => {
                // Remove loading class
                quest.classList.remove('loading-quest');
                
                // Change button text and re-enable
                btn.textContent = 'COMPLETE QUEST';
                btn.disabled = false;
                
                // Add event listener for completing quest
                btn.addEventListener('click', () => {
                    // Play quest complete sound
                    if (questCompleteSound) questCompleteSound.play().catch(e => console.log("Audio play failed:", e));
                    
                    // Get reward values
                    const expReward = parseInt(quest.querySelector('.reward-value').textContent);
                    
                    // Add experience
                    addExperience(expReward);
                    
                    // Add item to inventory if quest has item reward
                    const itemReward = quest.querySelector('.reward-value:last-child');
                    if (itemReward && itemReward.textContent.includes('Potion')) {
                        if (itemReward.textContent.includes('Healing')) {
                            addItemToInventory('Health Potion', 'Consumable', 'Restores 30 HP when used.', ['HP +30'], 'potion_red.png');
                        } else {
                            addItemToInventory('Mana Potion', 'Consumable', 'Restores 20 MP when used.', ['MP +20'], 'potion_blue.png');
                        }
                    } else if (itemReward && itemReward.textContent.includes('Artifact')) {
                        addItemToInventory('Mystery Artifact', 'Quest Item', 'A mysterious artifact with unknown powers.', ['???'], 'artifact.png');
                    }
                    
                    // Reset quest
                    btn.textContent = 'QUEST COMPLETED';
                    btn.disabled = true;
                    quest.classList.add('dungeon-cleared');
                    
                    // Increment quests completed
                    questsCompleted++;
                    
                    // Show notification
                    showNotification('Quest Completed', `You have completed the quest and gained ${expReward} EXP!`, 'success');
                    
                    // After a delay, reset the quest
                    setTimeout(() => {
                        quest.classList.remove('dungeon-cleared');
                        btn.textContent = 'ACCEPT QUEST';
                        btn.disabled = false;
                        btn.classList.add('accept-quest');
                        btn.classList.remove('complete-quest');
                        
                        // Remove all event listeners
                        const newBtn = btn.cloneNode(true);
                        btn.parentNode.replaceChild(newBtn, btn);
                        
                        // Re-add event listener for accepting quest
                        newBtn.addEventListener('click', () => {
                            // Play button click sound
                            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
                            
                            const quest = newBtn.closest('.quest');
                            const questId = quest.getAttribute('data-quest-id');
                            
                            // Change button text and disable
                            newBtn.textContent = 'IN PROGRESS';
                            newBtn.disabled = true;
                            newBtn.classList.remove('accept-quest');
                            newBtn.classList.add('complete-quest');
                            
                            // Add loading class to quest
                            quest.classList.add('loading-quest');
                            
                            // After a delay, complete the quest
                            setTimeout(() => {
                                // Remove loading class
                                quest.classList.remove('loading-quest');
                                
                                // Change button text and re-enable
                                newBtn.textContent = 'COMPLETE QUEST';
                                newBtn.disabled = false;
                                
                                // Add event listener for completing quest
                                newBtn.addEventListener('click', completeQuest);
                            }, 2000);
                        });
                    }, 3000);
                }, { once: true });
            }, 2000);
        });
    });
    
    // Complete quest function
    function completeQuest() {
        // Play quest complete sound
        if (questCompleteSound) questCompleteSound.play().catch(e => console.log("Audio play failed:", e));
        
        const btn = this;
        const quest = btn.closest('.quest');
        
        // Get reward values
        const expReward = parseInt(quest.querySelector('.reward-value').textContent);
        
        // Add experience
        addExperience(expReward);
        
        // Add item to inventory if quest has item reward
        const itemReward = quest.querySelector('.reward-value:last-child');
        if (itemReward && itemReward.textContent.includes('Potion')) {
            if (itemReward.textContent.includes('Healing')) {
                addItemToInventory('Health Potion', 'Consumable', 'Restores 30 HP when used.', ['HP +30'], 'potion_red.png');
            } else {
                addItemToInventory('Mana Potion', 'Consumable', 'Restores 20 MP when used.', ['MP +20'], 'potion_blue.png');
            }
        } else if (itemReward && itemReward.textContent.includes('Artifact')) {
            addItemToInventory('Mystery Artifact', 'Quest Item', 'A mysterious artifact with unknown powers.', ['???'], 'artifact.png');
        }
        
        // Reset quest
        btn.textContent = 'QUEST COMPLETED';
        btn.disabled = true;
        quest.classList.add('dungeon-cleared');
        
        // Increment quests completed
        questsCompleted++;
        
        // Show notification
        showNotification('Quest Completed', `You have completed the quest and gained ${expReward} EXP!`, 'success');
        
        // After a delay, reset the quest
        setTimeout(() => {
            quest.classList.remove('dungeon-cleared');
            btn.textContent = 'ACCEPT QUEST';
            btn.disabled = false;
            btn.classList.add('accept-quest');
            btn.classList.remove('complete-quest');
            
            // Remove all event listeners
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            // Re-add event listener for accepting quest
            newBtn.addEventListener('click', () => {
                // Play button click sound
                if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
                
                const quest = newBtn.closest('.quest');
                const questId = quest.getAttribute('data-quest-id');
                
                // Change button text and disable
                newBtn.textContent = 'IN PROGRESS';
                newBtn.disabled = true;
                newBtn.classList.remove('accept-quest');
                newBtn.classList.add('complete-quest');
                
                // Add loading class to quest
                quest.classList.add('loading-quest');
                
                // After a delay, complete the quest
                setTimeout(() => {
                    // Remove loading class
                    quest.classList.remove('loading-quest');
                    
                    // Change button text and re-enable
                    newBtn.textContent = 'COMPLETE QUEST';
                    newBtn.disabled = false;
                    
                    // Add event listener for completing quest
                    newBtn.addEventListener('click', completeQuest);
                }, 2000);
            });
        }, 3000);
    }
    
    // Inventory slots
    inventorySlots.forEach(slot => {
        slot.addEventListener('click', () => {
            // If slot is not empty
            if (!slot.classList.contains('empty')) {
                // Get item data
                const itemIndex = parseInt(slot.getAttribute('data-slot')) - 1;
                const item = inventoryItems[itemIndex];
                
                // Update item details
                const itemDetails = document.querySelector('.item-details');
                const noItemMessage = itemDetails.querySelector('.no-item-message');
                const itemInfo = itemDetails.querySelector('.item-info');
                
                noItemMessage.classList.add('hidden');
                itemInfo.classList.remove('hidden');
                
                itemInfo.querySelector('.item-name').textContent = item.name;
                itemInfo.querySelector('.item-type').textContent = `Type: ${item.type}`;
                itemInfo.querySelector('.item-description').textContent = item.description;
                
                // Clear previous effects
                const itemEffects = itemInfo.querySelector('.item-effects');
                itemEffects.innerHTML = '';
                
                // Add effects
                item.effects.forEach(effect => {
                    const effectElement = document.createElement('div');
                    effectElement.className = 'effect';
                    effectElement.textContent = effect;
                    itemEffects.appendChild(effectElement);
                });
                
                // Show/hide use button based on item type
                const useBtn = itemInfo.querySelector('.item-use-btn');
                if (item.type === 'Consumable') {
                    useBtn.classList.remove('hidden');
                    
                    // Add event listener to use button
                    useBtn.onclick = () => {
                        // Play button click sound
                        if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
                        
                        // Use item
                        useItem(itemIndex);
                    };
                } else {
                    useBtn.classList.add('hidden');
                }
            }
        });
    });
    
    // Add experience
    function addExperience(amount) {
        playerExp += amount;
        
        // Check if player leveled up
        if (playerExp >= playerMaxExp) {
            levelUp();
        } else {
            // Update experience bar
            const expPercent = (playerExp / playerMaxExp) * 100;
            expFill.style.width = `${expPercent}%`;
            expText.textContent = `${playerExp}/${playerMaxExp}`;
        }
    }
    
    // Level up
    function levelUp() {
        // Play level up sound
        if (levelUpSound) levelUpSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Calculate new level and excess experience
        const excessExp = playerExp - playerMaxExp;
        currentLevel++;
        
        // Update level display
        playerLevel.textContent = currentLevel;
        playerLevel.classList.add('level-up-animation');
        
        // Reset experience and increase max experience
        playerExp = excessExp;
        playerMaxExp = Math.floor(playerMaxExp * 1.5);
        
        // Update experience bar
        const expPercent = (playerExp / playerMaxExp) * 100;
        expFill.style.width = `${expPercent}%`;
        expText.textContent = `${playerExp}/${playerMaxExp}`;
        
        // Show level up popup
        const levelUpPopup = document.getElementById('level-up-popup');
        const newLevelSpan = document.getElementById('new-level');
        const levelUpConfirmBtn = document.getElementById('level-up-confirm');
        
        newLevelSpan.textContent = currentLevel;
        levelUpPopup.style.display = 'block';
        levelUpPopup.classList.add('level-up-animation');
        
        // Add event listener to confirm button
        levelUpConfirmBtn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            // Hide popup
            levelUpPopup.style.display = 'none';
            
            // Remove animation class
            playerLevel.classList.remove('level-up-animation');
            
            // Check if new skills are unlocked
            checkSkillUnlocks();
        }, { once: true });
    }
    
    // Check if new skills are unlocked
    function checkSkillUnlocks() {
        // Check if skill system is available
        if (window.skillSystem && typeof window.skillSystem.checkSkillUnlocks === 'function') {
            window.skillSystem.checkSkillUnlocks(currentLevel);
        } else {
            // Fallback for when skill system is not loaded
            if (currentLevel === 2) {
                unlockSkill(1); // Basic Strike
            } else if (currentLevel === 3) {
                unlockSkill(2); // Mana Shield
            } else if (currentLevel === 5) {
                showSkillPopup();
            }
        }
    }
    
    // Unlock a skill
    function unlockSkill(skillId) {
        const skill = document.querySelector(`.skill[data-skill-id="${skillId}"]`);
        if (!skill) return;
        
        // Play skill unlock sound
        if (skillUnlockSound) skillUnlockSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Unlock the skill
        skill.classList.remove('locked');
        skill.classList.add('skill-unlock-animation');
        
        // Update skill info
        const skillIcon = skill.querySelector('.skill-icon');
        skillIcon.innerHTML = ''; // Remove lock icon
        
        const skillLevel = skill.querySelector('.skill-level');
        skillLevel.textContent = 'Level 1';
        
        const skillUnlock = skill.querySelector('.skill-unlock');
        skillUnlock.innerHTML = '<span>Active</span>';
        
        // Show notification
        const skillName = skill.querySelector('.skill-name').textContent;
        showNotification('Skill Unlocked', `You have acquired the ${skillName} skill!`, 'success');
    }
    
    // Show skill popup
    function showSkillPopup() {
        const skillPopup = document.getElementById('skill-popup');
        const acquireSkillBtn = document.getElementById('acquire-skill-btn');
        const declineSkillBtn = document.getElementById('decline-skill-btn');
        
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
            
            // Unlock the skill
            unlockSkill(3); // Shadow Extraction
        }, { once: true });
        
        // Add event listener to decline button
        declineSkillBtn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            // Hide popup
            skillPopup.style.display = 'none';
        }, { once: true });
    }
    
    // Add item to inventory
    function addItemToInventory(name, type, description, effects, image) {
        // Find first empty slot
        const emptySlot = document.querySelector('.inventory-slot.empty');
        if (!emptySlot) {
            showNotification('Inventory Full', 'You cannot carry any more items!', 'warning');
            return;
        }
        
        // Create item object
        const item = {
            name,
            type,
            description,
            effects,
            image
        };
        
        // Add item to inventory array
        const slotIndex = parseInt(emptySlot.getAttribute('data-slot')) - 1;
        inventoryItems[slotIndex] = item;
        
        // Update slot appearance
        emptySlot.classList.remove('empty');
        emptySlot.style.backgroundImage = `url('images/${image}')`;
        
        // Show notification
        showNotification('Item Acquired', `You have acquired ${name}!`, 'success');
    }
    
    // Use item
    function useItem(itemIndex) {
        const item = inventoryItems[itemIndex];
        if (!item) return;
        
        // Apply item effects
        if (item.name === 'Health Potion') {
            showNotification('Item Used', 'You used a Health Potion and recovered 30 HP!', 'success');
        } else if (item.name === 'Mana Potion') {
            showNotification('Item Used', 'You used a Mana Potion and recovered 20 MP!', 'success');
        }
        
        // Remove item from inventory
        inventoryItems[itemIndex] = null;
        
        // Update slot appearance
        const slot = document.querySelector(`.inventory-slot[data-slot="${itemIndex + 1}"]`);
        slot.classList.add('empty');
        slot.style.backgroundImage = '';
        
        // Reset item details
        const itemDetails = document.querySelector('.item-details');
        const noItemMessage = itemDetails.querySelector('.no-item-message');
        const itemInfo = itemDetails.querySelector('.item-info');
        
        noItemMessage.classList.remove('hidden');
        itemInfo.classList.add('hidden');
    }
    
    // Show notification
    function showNotification(title, message, type = 'success') {
        const notificationContainer = document.getElementById('notification-container');
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }
});
