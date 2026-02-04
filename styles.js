// Generate star particles
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.getElementById('stars');
    if (starsContainer) {
        const starCount = 150;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random size
            const sizes = ['small', 'small', 'small', 'medium', 'medium', 'large'];
            star.classList.add(sizes[Math.floor(Math.random() * sizes.length)]);
            
            // Random position
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            
            // Random animation duration for twinkling
            star.style.animationDuration = (2 + Math.random() * 3) + 's';
            
            // Random animation delay
            star.style.animationDelay = Math.random() * 3 + 's';
            
            // Add floating animation with random duration
            const floatDuration = 20 + Math.random() * 30;
            star.style.setProperty('animation', `twinkle ${2 + Math.random() * 3}s linear infinite, float ${floatDuration}s linear infinite`);
            star.style.animationDelay = `${Math.random() * 3}s, ${Math.random() * floatDuration}s`;
            
            starsContainer.appendChild(star);
        }

        // Create shooting stars periodically
        function createShootingStar() {
            const shootingStar = document.createElement('div');
            shootingStar.className = 'shooting-star';
            
            // Random starting position (from top right area)
            shootingStar.style.left = (60 + Math.random() * 40) + '%';
            shootingStar.style.top = Math.random() * 30 + '%';
            
            // Random animation duration
            const duration = 0.5 + Math.random() * 0.5;
            shootingStar.style.animation = `shoot ${duration}s ease-out`;
            
            document.body.appendChild(shootingStar);
            
            // Remove after animation
            setTimeout(() => {
                shootingStar.remove();
            }, duration * 1000);
        }

        // Create shooting stars at random intervals
        setInterval(() => {
            if (Math.random() > 0.7) {
                createShootingStar();
            }
        }, 2000);
    }

    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Sample server data
const serversData = [
    {
        id: 1,
        game: "Minecraft Survival",
        image: null,
        status: "live",
        players: "47/100",
        ip: "play.example.com",
        region: "NA East",
        description: "Vanilla+ survival with custom economy, player shops, and weekly events. Active community with dedicated staff.",
        owner: "Steve_MC",
        members: ["Alex2023", "Creeper_King", "DiamondMiner", "RedstoneWiz"],
        isRoblox: false
    },
    {
        id: 2,
        game: "CS2 Competitive",
        image: null,
        status: "live",
        players: "10/10",
        ip: "192.168.1.100:27015",
        region: "EU West",
        description: "128-tick competitive matches. Skill-based matchmaking. Anti-cheat enabled. Regular tournaments with prizes.",
        owner: "CS_ProGamer",
        members: ["HeadshotKing", "Clutch_Master", "AWP_God", "Tactical_Tim"],
        isRoblox: false
    },
    {
        id: 3,
        game: "Rust PvP/PvE",
        image: null,
        status: "live",
        players: "83/150",
        ip: "rust.example.net",
        region: "NA West",
        description: "2x gather rates, monthly wipes, custom monuments. Balanced PvP with safe zones. Active admins 24/7.",
        owner: "RustAdmin_Mike",
        members: ["Builder_Bob", "PvP_Master", "Farmer_Joe", "Base_Designer"],
        isRoblox: false
    }
];

const partiesData = [
    {
        id: 101,
        game: "Valorant Party",
        image: null,
        status: "scheduled",
        players: "3/5",
        time: "TONIGHT 8PM",
        rank: "Gold - Platinum",
        region: "NA",
        description: "Looking for 2 more for comp grind tonight. Chill vibes, good comms. Discord required. Let's rank up together!",
        owner: "Val_Gamer",
        members: ["Jett_Main", "Sage_Healer"],
        isRoblox: false
    },
    {
        id: 102,
        game: "Apex Legends",
        image: null,
        status: "live",
        players: "2/3",
        rank: "Diamond+",
        region: "EU",
        description: "Ranked grind for Masters push. Need 1 more. Good aim and game sense required. Mic essential for callouts.",
        owner: "Apex_Pro",
        members: ["Wraith_TTV"],
        isRoblox: false
    }
];

// Function to create server card HTML
function createServerCard(server) {
    const isFull = server.players && server.players.split('/')[0] === server.players.split('/')[1];
    
    return `
        <div class="server-card" onclick="openServerChat(${server.id})">
            <div class="server-image">
                ${server.image ? `<img src="${server.image}" alt="${server.game}">` : '<span>No Image Available</span>'}
            </div>
            <div class="server-content">
                <div class="server-header">
                    <div>
                        <h3 class="game-title">${server.game}</h3>
                    </div>
                    <span class="status-badge status-${server.status}">
                        ${server.status === 'live' ? '● LIVE' : '⏰ ' + (server.time || 'SCHEDULED')}
                    </span>
                </div>
                <div class="server-info">
                    ${server.players ? `<div><strong>Players:</strong> ${server.players}</div>` : ''}
                    ${server.ip ? `<div><strong>IP:</strong> ${server.ip}</div>` : ''}
                    ${server.rank ? `<div><strong>Rank:</strong> ${server.rank}</div>` : ''}
                    ${server.region ? `<div><strong>Region:</strong> ${server.region}</div>` : ''}
                </div>
                <p class="server-description">${server.description}</p>
                <button class="join-btn" onclick="event.stopPropagation(); openServerChat(${server.id})">
                    ${server.status === 'scheduled' ? 'Join Party' : 'Join Server'}
                </button>
            </div>
        </div>
    `;
}

// Function to load featured servers on homepage
function loadFeaturedServers() {
    const container = document.getElementById('featuredServers');
    if (container) {
        const featured = serversData.slice(0, 3);
        container.innerHTML = featured.map(server => createServerCard(server)).join('');
    }
}

// Function to load all servers
function loadServers() {
    const container = document.getElementById('allServers');
    if (container) {
        container.innerHTML = serversData.map(server => createServerCard(server)).join('');
    }
}

// Function to load parties (excluding full ones from broadcast)
function loadParties() {
    const container = document.getElementById('allParties');
    if (container) {
        const availableParties = partiesData.filter(party => {
            if (!party.players) return true;
            const [current, max] = party.players.split('/').map(Number);
            return current < max; // Only show parties that aren't full
        });
        container.innerHTML = availableParties.map(party => createServerCard(party)).join('');
    }
}

// Function to open server chat modal
function openServerChat(serverId) {
    // Find server in either servers or parties data
    let server = serversData.find(s => s.id === serverId) || partiesData.find(p => p.id === serverId);
    
    if (!server) return;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'chatModal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close" onclick="closeChatModal()">&times;</button>
            <div class="chat-container">
                <div class="chat-sidebar">
                    <h3>Members</h3>
                    <ul class="member-list">
                        <li class="member-item owner">
                            <span class="role">Owner</span>
                            ${server.owner}
                        </li>
                        ${server.members.map(member => `
                            <li class="member-item">
                                <span class="role">Member</span>
                                ${member}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="chat-main">
                    <div class="chat-header">
                        <h2>${server.game}</h2>
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        <div class="message">
                            <div>
                                <span class="message-author owner">${server.owner}</span>
                                <span class="message-time">2 hours ago</span>
                            </div>
                            <div class="message-text">
                                Welcome to the server! Feel free to ask any questions.
                            </div>
                        </div>
                        ${server.members.slice(0, 2).map((member, i) => `
                            <div class="message">
                                <div>
                                    <span class="message-author">${member}</span>
                                    <span class="message-time">${i + 1} hour ago</span>
                                </div>
                                <div class="message-text">
                                    ${i === 0 ? 'Thanks! Looking forward to playing!' : 'What time does the event start?'}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="chat-input">
                        <input type="text" id="chatInput" placeholder="Type a message...">
                        <button onclick="sendMessage()">Send</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeChatModal();
        }
    });
}

function closeChatModal() {
    const modal = document.getElementById('chatModal');
    if (modal) {
        modal.remove();
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (input.value.trim()) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `
            <div>
                <span class="message-author">You</span>
                <span class="message-time">Just now</span>
            </div>
            <div class="message-text">${input.value}</div>
        `;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        input.value = '';
    }
}

// Load content based on page
if (document.getElementById('featuredServers')) {
    loadFeaturedServers();
}

if (document.getElementById('allServers')) {
    loadServers();
}

if (document.getElementById('allParties')) {
    loadParties();
}

// Image preview function for forms
function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    const file = input.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Form submission handlers
function handleServerSubmit(event) {
    event.preventDefault();
    alert('Server submission received! In production, this would send to your backend.');
    // Here you would send the form data to your backend
    return false;
}

function handlePartySubmit(event) {
    event.preventDefault();
    alert('Party listing created! In production, this would send to your backend.');
    return false;
}
