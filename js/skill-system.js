// Skill Acquisition System for Solo Leveling

'use strict';

// Initialize skill system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize skill database
    const skills = [
        {
            id: 1,
            name: "Basic Strike",
            description: "A basic attack that deals physical damage.",
            unlockLevel: 2,
            icon: "basic_strike.png",
            type: "Active",
            cooldown: "3 seconds",
            effects: ["Deals 20 physical damage to a single target"],
            locked: true,
            level: 0
        },
        {
            id: 2,
            name: "Mana Shield",
            description: "Creates a protective barrier using mana.",
            unlockLevel: 3,
            icon: "mana_shield.png",
            type: "Active",
            cooldown: "10 seconds",
            effects: ["Absorbs 30 damage", "Costs 15 MP"],
            locked: true,
            level: 0
        },
        {
            id: 3,
            name: "Shadow Extraction",
            description: "Extract shadows from defeated enemies.",
            unlockLevel: 5,
            icon: "shadow_extraction.png",
            type: "Active",
            cooldown: "30 seconds",
            effects: ["Extract shadow from defeated enemy", "Shadow serves as ally in combat", "Costs 40 MP"],
            locked: true,
            level: 0
        },
        {
            id: 4,
            name: "Stealth",
            description: "Become invisible to enemies for a short time.",
            unlockLevel: 7,
            icon: "stealth.png",
            type: "Active",
            cooldown: "45 seconds",
            effects: ["Become invisible for 10 seconds", "First attack from stealth deals 50% more damage", "Costs 25 MP"],
            locked: true,
            level: 0
        },
        {
            id: 5,
            name: "Shadow Monarch's Domain",
            description: "Establish dominance over an area, weakening all enemies within.",
            unlockLevel: 10,
            icon: "shadow_domain.png",
            type: "Active",
            cooldown: "120 seconds",
            effects: ["Reduce enemy damage by 30%", "Reduce enemy defense by 20%", "Lasts 15 seconds", "Costs 60 MP"],
            locked: true,
            level: 0
        }
    ];

    // Cache DOM elements
    const skillsContainer = document.querySelector('.skills-container');
    const skillPopup = document.getElementById('skill-popup');
    const newSkillName = document.getElementById('new-skill-name');
    const newSkillDescription = document.getElementById('new-skill-description');
    const acquireSkillBtn = document.getElementById('acquire-skill-btn');
    const declineSkillBtn = document.getElementById('decline-skill-btn');
    const skillUnlockSound = document.getElementById('skill-unlock');
    const buttonClickSound = document.getElementById('button-click');

    // Initialize skill system
    initializeSkillSystem();

    // Initialize skill system
    function initializeSkillSystem() {
        // Clear existing skills
        skillsContainer.innerHTML = '';

        // Add skills to the container
        skills.forEach(skill => {
            addSkillToUI(skill);
        });

        // Add event listeners to skill elements
        setupSkillEventListeners();
    }

    // Add a skill to the UI
    function addSkillToUI(skill) {
        const skillElement = document.createElement('div');
        skillElement.className = `skill ${skill.locked ? 'locked' : ''}`;
        skillElement.setAttribute('data-skill-id', skill.id);

        skillElement.innerHTML = `
            <div class="skill-icon">
                ${skill.locked ? '<div class="lock-icon"></div>' : ''}
            </div>
            <div class="skill-info">
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level">Level ${skill.level}</div>
                <div class="skill-description">${skill.description}</div>
                <div class="skill-unlock">
                    <span>${skill.locked ? `Unlocks at Level ${skill.unlockLevel}` : 'Active'}</span>
                </div>
            </div>
        `;

        skillsContainer.appendChild(skillElement);
    }

    // Setup event listeners for skills
    function setupSkillEventListeners() {
        const skillElements = document.querySelectorAll('.skill');

        skillElements.forEach(skillElement => {
            skillElement.addEventListener('click', () => {
                const skillId = parseInt(skillElement.getAttribute('data-skill-id'));
                const skill = skills.find(s => s.id === skillId);

                if (!skill.locked) {
                    showSkillDetails(skill);
                }
            });
        });
    }

    // Show skill details in a modal
    function showSkillDetails(skill) {
        // Create modal if it doesn't exist
        let skillModal = document.getElementById('skill-detail-modal');
        if (!skillModal) {
            skillModal = document.createElement('div');
            skillModal.id = 'skill-detail-modal';
            skillModal.className = 'modal';
            
            skillModal.innerHTML = `
                <div class="modal-content pixel-sort">
                    <span class="close-modal">&times;</span>
                    <div class="modal-header">
                        <h3 id="modal-skill-name" class="rgb-split">Skill Name</h3>
                    </div>
                    <div class="modal-body">
                        <div class="modal-skill-image">
                            <div class="skill-placeholder"></div>
                        </div>
                        <div class="modal-skill-details">
                            <div class="modal-skill-type">Type: <span id="modal-skill-type">Active</span></div>
                            <div class="modal-skill-cooldown">Cooldown: <span id="modal-skill-cooldown">10s</span></div>
                            <div class="modal-skill-description" id="modal-skill-description">
                                Skill description goes here.
                            </div>
                            <div class="modal-skill-effects" id="modal-skill-effects">
                                <div class="effect">Effect 1</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-btn upgrade-btn glow-border hover-glow" id="modal-upgrade-btn">UPGRADE</button>
                        <button class="modal-btn close-btn hover-glow">CLOSE</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(skillModal);
            
            // Add event listeners to modal
            const closeModalBtn = skillModal.querySelector('.close-modal');
            const closeBtn = skillModal.querySelector('.close-btn');
            const upgradeBtn = skillModal.querySelector('#modal-upgrade-btn');
            
            closeModalBtn.addEventListener('click', () => {
                skillModal.classList.remove('active');
            });
            
            closeBtn.addEventListener('click', () => {
                skillModal.classList.remove('active');
            });
            
            upgradeBtn.addEventListener('click', () => {
                // Play button click sound
                if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
                
                upgradeSkill(skill.id);
                skillModal.classList.remove('active');
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', (e) => {
                if (e.target === skillModal) {
                    skillModal.classList.remove('active');
                }
            });
        }
        
        // Update modal content
        const modalSkillName = document.getElementById('modal-skill-name');
        const modalSkillType = document.getElementById('modal-skill-type');
        const modalSkillCooldown = document.getElementById('modal-skill-cooldown');
        const modalSkillDescription = document.getElementById('modal-skill-description');
        const modalSkillEffects = document.getElementById('modal-skill-effects');
        const modalUpgradeBtn = document.getElementById('modal-upgrade-btn');
        
        modalSkillName.textContent = skill.name;
        modalSkillType.textContent = skill.type;
        modalSkillCooldown.textContent = skill.cooldown;
        modalSkillDescription.textContent = skill.description;
        
        // Clear previous effects
        modalSkillEffects.innerHTML = '';
        
        // Add effects
        skill.effects.forEach(effect => {
            const effectElement = document.createElement('div');
            effectElement.className = 'effect';
            effectElement.textContent = effect;
            modalSkillEffects.appendChild(effectElement);
        });
        
        // Enable/disable upgrade button based on skill level
        if (skill.level < 5) {
            modalUpgradeBtn.disabled = false;
            modalUpgradeBtn.textContent = `UPGRADE (Level ${skill.level + 1})`;
        } else {
            modalUpgradeBtn.disabled = true;
            modalUpgradeBtn.textContent = 'MAX LEVEL';
        }
        
        // Show modal
        skillModal.classList.add('active');
    }

    // Upgrade a skill
    function upgradeSkill(skillId) {
        const skill = skills.find(s => s.id === skillId);
        if (!skill || skill.level >= 5) return;
        
        // Increase skill level
        skill.level++;
        
        // Update skill in UI
        const skillElement = document.querySelector(`.skill[data-skill-id="${skillId}"]`);
        const skillLevelElement = skillElement.querySelector('.skill-level');
        skillLevelElement.textContent = `Level ${skill.level}`;
        
        // Add upgrade animation
        skillElement.classList.add('skill-unlock-animation');
        setTimeout(() => {
            skillElement.classList.remove('skill-unlock-animation');
        }, 1500);
        
        // Show notification
        showNotification('Skill Upgraded', `${skill.name} is now level ${skill.level}!`);
    }

    // Check for skill unlocks when player levels up
    function checkSkillUnlocks(playerLevel) {
        // Find skills that unlock at this level
        const unlockedSkills = skills.filter(skill => skill.locked && skill.unlockLevel === playerLevel);
        
        if (unlockedSkills.length > 0) {
            // Show skill unlock popup for the first skill
            showSkillUnlockPopup(unlockedSkills[0]);
        }
    }

    // Show skill unlock popup
    function showSkillUnlockPopup(skill) {
        // Set skill details
        newSkillName.textContent = skill.name;
        newSkillDescription.textContent = skill.description;
        
        // Play skill unlock sound
        if (skillUnlockSound) skillUnlockSound.play().catch(e => console.log("Audio play failed:", e));
        
        // Show popup with animation
        skillPopup.style.display = 'block';
        skillPopup.classList.add('skill-unlock-animation');
        
        // Clear previous event listeners
        const newAcquireBtn = acquireSkillBtn.cloneNode(true);
        const newDeclineBtn = declineSkillBtn.cloneNode(true);
        acquireSkillBtn.parentNode.replaceChild(newAcquireBtn, acquireSkillBtn);
        declineSkillBtn.parentNode.replaceChild(newDeclineBtn, declineSkillBtn);
        
        // Add event listener to acquire button
        newAcquireBtn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            // Hide popup
            skillPopup.style.display = 'none';
            
            // Unlock the skill
            unlockSkill(skill.id);
        });
        
        // Add event listener to decline button
        newDeclineBtn.addEventListener('click', () => {
            // Play button click sound
            if (buttonClickSound) buttonClickSound.play().catch(e => console.log("Audio play failed:", e));
            
            // Hide popup
            skillPopup.style.display = 'none';
        });
    }

    // Unlock a skill
    function unlockSkill(skillId) {
        const skill = skills.find(s => s.id === skillId);
        if (!skill) return;
        
        // Unlock the skill
        skill.locked = false;
        skill.level = 1;
        
        // Update skill in UI
        const skillElement = document.querySelector(`.skill[data-skill-id="${skillId}"]`);
        skillElement.classList.remove('locked');
        skillElement.classList.add('skill-unlock-animation');
        
        // Update skill info
        const skillIcon = skillElement.querySelector('.skill-icon');
        skillIcon.innerHTML = ''; // Remove lock icon
        
        const skillLevel = skillElement.querySelector('.skill-level');
        skillLevel.textContent = 'Level 1';
        
        const skillUnlock = skillElement.querySelector('.skill-unlock');
        skillUnlock.innerHTML = '<span>Active</span>';
        
        // Show notification
        showNotification('Skill Unlocked', `You have acquired the ${skill.name} skill!`);
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

    // Expose functions to global scope for use by other scripts
    window.skillSystem = {
        checkSkillUnlocks,
        unlockSkill,
        upgradeSkill,
        showSkillDetails
    };
});
