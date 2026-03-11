// ===================================
//   SENAI CONNECT — Script Principal
// ===================================

// =====================
// ESTADO GLOBAL
// =====================
const App = {
  currentUser: null,
  currentPage: 'feed',
  posts: [],
  users: [],
  notifications: [],
  messages: [],
  activeChat: null,
};

// =====================
// USUÁRIOS FICTÍCIOS
// =====================
const FAKE_USERS = [
  { id: 2, name: 'Ana Beatriz', handle: '@anabeatriz', avatar: '👩‍💻', course: 'Análise e Desenvolvimento', followers: 1240, following: 340, verified: true },
  { id: 3, name: 'Carlos Silva', handle: '@carlossilva', avatar: '👨‍🔧', course: 'Mecatrônica', followers: 890, following: 220, verified: false },
  { id: 4, name: 'Marina Costa', handle: '@marinacosta', avatar: '🎨', course: 'Design Gráfico', followers: 2100, following: 180, verified: true },
  { id: 5, name: 'Pedro Alves', handle: '@pedroalves', avatar: '⚡', course: 'Eletrotécnica', followers: 560, following: 410, verified: false },
  { id: 6, name: 'Julia Mendes', handle: '@juliamendes', avatar: '🧑‍🍳', course: 'Gastronomia', followers: 3400, following: 250, verified: true },
  { id: 7, name: 'Rafael Nunes', handle: '@rafaelnunes', avatar: '🏗️', course: 'Edificações', followers: 720, following: 300, verified: false },
  { id: 8, name: 'Larissa Ferreira', handle: '@larissaferreira', avatar: '💊', course: 'Enfermagem', followers: 1850, following: 420, verified: true },
  { id: 9, name: 'Bruno Lopes', handle: '@brunolopes', avatar: '🔌', course: 'Redes de Computadores', followers: 945, following: 180, verified: false },
];

// =====================
// POSTS INICIAIS
// =====================
const INITIAL_POSTS = [
  {
    id: 1, userId: 4,
    content: 'Finalizei o projeto de identidade visual para o meu TCC! 🎨 Foram semanas de trabalho mas valeu a pena. Obrigada a todos pelo apoio! #Design #SENAI #TCC',
    image: null, emoji: '🖼️',
    likes: 87, comments: 14, shares: 5,
    liked: false, time: '2h atrás', saved: false,
  },
  {
    id: 2, userId: 2,
    content: 'Acabei de deployar meu primeiro app em React! 🚀 Quem quiser testar o sistema de gestão de estoque, manda mensagem. Feito do zero no curso de ADS no SENAI! #Programação #React #SENAI',
    image: null, emoji: '💻',
    likes: 143, comments: 31, shares: 18,
    liked: false, time: '4h atrás', saved: false,
  },
  {
    id: 3, userId: 3,
    content: 'Hoje foi dia de prática em CNC! Maquinamos peças para o projeto final do semestre. A tecnologia na indústria é impressionante 🤖⚙️ #Mecatrônica #Indústria40',
    image: null, emoji: '⚙️',
    likes: 56, comments: 8, shares: 3,
    liked: false, time: '5h atrás', saved: false,
  },
  {
    id: 4, userId: 6,
    content: 'Aula prática de confeitaria hoje! Fizemos entremet de maracujá com mousse de chocolate belga 😍🍫 O SENAI tem os melhores laboratórios de Gastronomia do país! #Gastronomia #Confeitaria',
    image: null, emoji: '🍰',
    likes: 212, comments: 45, shares: 29,
    liked: false, time: '7h atrás', saved: false,
  },
  {
    id: 5, userId: 8,
    content: 'Simulação de emergência hospitalar com o manequim de alta fidelidade. Cada simulado nos prepara para salvar vidas de verdade! 💉❤️ Orgulho do curso de Enfermagem SENAI! #Enfermagem #Saúde',
    image: null, emoji: '🏥',
    likes: 198, comments: 27, shares: 14,
    liked: false, time: '9h atrás', saved: false,
  },
  {
    id: 6, userId: 5,
    content: 'Instalação de painel fotovoltaico concluída! ☀️⚡ Energia limpa e renovável é o futuro. Aprendi na prática aqui no SENAI e já estou aplicando no mercado! #Energia #Solar #Eletrotécnica',
    image: null, emoji: '☀️',
    likes: 76, comments: 12, shares: 7,
    liked: false, time: '12h atrás', saved: false,
  },
];

// =====================
// MENSAGENS INICIAIS
// =====================
const INITIAL_MESSAGES = [
  {
    id: 1, userId: 4, unread: 2,
    preview: 'Oi! Vi seu projeto e adorei 😍',
    messages: [
      { id: 1, from: 4, text: 'Oi! Vi seu projeto e adorei 😍', time: '10:32' },
      { id: 2, from: 4, text: 'Como você fez essa parte do gradiente?', time: '10:33' },
    ]
  },
  {
    id: 2, userId: 2, unread: 0,
    preview: 'Boa sorte no TCC! 🚀',
    messages: [
      { id: 1, from: 2, text: 'Ei, vai apresentar quando?', time: 'ontem' },
      { id: 2, from: 1, text: 'Na sexta-feira, às 14h!', time: 'ontem' },
      { id: 3, from: 2, text: 'Boa sorte no TCC! 🚀', time: 'ontem' },
    ]
  },
  {
    id: 3, userId: 9, unread: 1,
    preview: 'Você toparia fazer uma parceria?',
    messages: [
      { id: 1, from: 9, text: 'Você toparia fazer uma parceria no projeto de redes?', time: '09:15' },
    ]
  },
  {
    id: 4, userId: 3, unread: 0,
    preview: 'Valeu parceiro! 💪',
    messages: [
      { id: 1, from: 1, text: 'Que baita projeto no CNC hein!', time: '2 dias' },
      { id: 2, from: 3, text: 'Valeu parceiro! 💪', time: '2 dias' },
    ]
  },
];

// =====================
// NOTIFICAÇÕES
// =====================
const INITIAL_NOTIFICATIONS = [
  { id: 1, userId: 4, type: 'like', text: 'curtiu sua publicação', time: '2 min', unread: true },
  { id: 2, userId: 2, type: 'comment', text: 'comentou: "Incrível! Me manda o link!"', time: '15 min', unread: true },
  { id: 3, userId: 6, type: 'follow', text: 'começou a te seguir', time: '1h', unread: true },
  { id: 4, userId: 8, type: 'like', text: 'curtiu sua foto de perfil', time: '2h', unread: false },
  { id: 5, userId: 3, type: 'mention', text: 'mencionou você em uma publicação', time: '3h', unread: false },
  { id: 6, userId: 9, type: 'comment', text: 'comentou: "Parabéns pelo projeto!"', time: '5h', unread: false },
  { id: 7, userId: 5, type: 'follow', text: 'começou a te seguir', time: '8h', unread: false },
  { id: 8, userId: 7, type: 'like', text: 'curtiu seu comentário', time: '1 dia', unread: false },
];

// =====================
// TRENDING TAGS
// =====================
const TRENDING = [
  { tag: '#SENAI2025', count: '12.4k posts' },
  { tag: '#Tecnologia', count: '9.8k posts' },
  { tag: '#TCC', count: '7.2k posts' },
  { tag: '#Indústria4.0', count: '5.6k posts' },
  { tag: '#ProgramaçãoWeb', count: '4.1k posts' },
  { tag: '#Design', count: '3.8k posts' },
  { tag: '#Gastronomia', count: '2.9k posts' },
];

// =====================
// DOM HELPERS
// =====================
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function getUserById(id) {
  if (id === 1) return App.currentUser;
  return FAKE_USERS.find(u => u.id === id);
}

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

// =====================
// TOAST NOTIFICATIONS
// =====================
function showToast(message, type = '') {
  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// =====================
// LOADER
// =====================
function hideLoader() {
  const loader = $('#pageLoader');
  if (loader) {
    loader.style.opacity = '0';
    loader.style.transition = 'opacity 0.5s';
    setTimeout(() => loader.remove(), 500);
  }
}

// =====================
// AUTH
// =====================
function initAuth() {
  // Login
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#loginName').value.trim();
    const pass = $('#loginPass').value.trim();
    if (!name || !pass) { showToast('Preencha todos os campos!'); return; }
    const users = JSON.parse(localStorage.getItem('sc_users') || '[]');
    const found = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === pass);
    if (!found) { showToast('Usuário ou senha inválidos!'); return; }
    loginUser(found);
  });

  // Register
  $('#registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#regName').value.trim();
    const email = $('#regEmail').value.trim();
    const course = $('#regCourse').value;
    const pass = $('#regPass').value;
    const pass2 = $('#regPass2').value;
    if (!name || !email || !course || !pass) { showToast('Preencha todos os campos!'); return; }
    if (pass !== pass2) { showToast('As senhas não conferem!'); return; }
    if (pass.length < 6) { showToast('Senha deve ter pelo menos 6 caracteres!'); return; }
    const users = JSON.parse(localStorage.getItem('sc_users') || '[]');
    if (users.find(u => u.email === email)) { showToast('E-mail já cadastrado!'); return; }
    const newUser = {
      id: 1, name, email, course, password: pass,
      handle: '@' + name.toLowerCase().replace(/\s/g, ''),
      avatar: '😊', bio: 'Aluno SENAI | ' + course,
      followers: 0, following: 0,
    };
    users.push(newUser);
    localStorage.setItem('sc_users', JSON.stringify(users));
    showToast('Conta criada! Faça login.', 'success');
    switchAuth('login');
  });

  // Switch tabs
  $$('[data-switch-auth]').forEach(btn => {
    btn.addEventListener('click', () => switchAuth(btn.dataset.switchAuth));
  });

  // Toggle password visibility
  $$('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-group').querySelector('input');
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁️' : '🙈';
    });
  });

  // Check existing session
  const savedUser = localStorage.getItem('sc_session');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    loginUser(user, true);
  }
}

function switchAuth(tab) {
  $$('.auth-tab-content').forEach(t => { t.classList.remove('active'); t.style.display = 'none'; });
  const target = $(`#${tab}Tab`);
  if (target) { target.classList.add('active'); target.style.display = 'block'; }
}

function loginUser(user, silent = false) {
  App.currentUser = { ...user, id: 1 };
  localStorage.setItem('sc_session', JSON.stringify(user));
  $('#authPage').style.display = 'none';
  const layout = $('#appLayout');
  layout.classList.add('active');
  renderAll();
  if (!silent) showToast(`Bem-vindo(a) de volta, ${user.name}! 👋`, 'success');
}

function logout() {
  localStorage.removeItem('sc_session');
  App.currentUser = null;
  location.reload();
}

// =====================
// RENDER ALL
// =====================
function renderAll() {
  App.posts = [...INITIAL_POSTS];
  App.notifications = [...INITIAL_NOTIFICATIONS];
  App.messages = [...INITIAL_MESSAGES];
  updateHeaderUser();
  renderSidebar();
  renderFeed();
  renderProfile();
  renderNotifications();
  renderMessages();
  renderExplore();
  renderTrending();
  renderSuggestions();
  updateNotifBadge();
  navigateTo('feed');
}

// =====================
// HEADER
// =====================
function updateHeaderUser() {
  const u = App.currentUser;
  const av = $('#headerAvatar');
  if (av) {
    if (u.avatarImg) {
      av.innerHTML = `<img src="${u.avatarImg}" alt="">`;
    } else {
      av.innerHTML = `<span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:18px">${u.avatar}</span>`;
    }
  }
}

// =====================
// SIDEBAR
// =====================
function renderSidebar() {
  const u = App.currentUser;
  const sidebar = $('#sidebarUserInfo');
  if (!sidebar) return;
  sidebar.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:var(--radius-sm);background:var(--dark-3);margin-bottom:8px;">
      <div style="width:40px;height:40px;border-radius:50%;background:var(--dark-4);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;border:2px solid var(--red)">${u.avatar}</div>
      <div>
        <div style="font-size:14px;font-weight:600">${u.name}</div>
        <div style="font-size:12px;color:var(--gray-mid)">${u.handle}</div>
      </div>
    </div>
  `;
}

// =====================
// NAVIGATION
// =====================
function navigateTo(page) {
  App.currentPage = page;
  $$('.page').forEach(p => p.classList.remove('active'));
  $$('.nav-item').forEach(n => n.classList.remove('active'));
  $$('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
  const target = $(`#page-${page}`);
  if (target) target.classList.add('active');
  $$(`[data-page="${page}"]`).forEach(el => el.classList.add('active'));
}

// =====================
// FEED
// =====================
function renderFeed() {
  renderStories();
  renderPosts();
}

function renderStories() {
  const wrap = $('#storiesWrap');
  if (!wrap) return;
  const u = App.currentUser;
  let html = `
    <div class="story-item add-story" onclick="showToast('Funcionalidade em breve! 📸', 'info')">
      <div class="story-avatar-wrap">
        <div class="story-avatar"><span>+</span></div>
      </div>
      <span class="story-name">Seu story</span>
    </div>
  `;
  FAKE_USERS.slice(0, 6).forEach(user => {
    html += `
      <div class="story-item" onclick="viewStory(${user.id})">
        <div class="story-avatar-wrap">
          <div class="story-avatar"><span>${user.avatar}</span></div>
        </div>
        <span class="story-name">${user.name.split(' ')[0]}</span>
      </div>
    `;
  });
  wrap.innerHTML = html;
}

function viewStory(userId) {
  const user = getUserById(userId);
  showToast(`Story de ${user.name} — Em breve! 🎥`, 'info');
}

function renderPosts() {
  const feed = $('#postsFeed');
  if (!feed) return;
  feed.innerHTML = App.posts.map(post => buildPostCard(post)).join('');
}

function buildPostCard(post) {
  const user = getUserById(post.userId);
  if (!user) return '';
  const verifiedBadge = user.verified ? '<span class="post-badge">✓ Destaque</span>' : '';
  const imgHtml = post.image ? `<img class="post-image" src="${post.image}" alt="" onclick="openImageModal('${post.image}')">` : '';
  const emojiPlaceholder = !post.image && post.emoji ? `
    <div style="background:var(--dark-3);display:flex;align-items:center;justify-content:center;height:120px;font-size:60px">${post.emoji}</div>
  ` : '';
  return `
    <div class="post-card" id="post-${post.id}">
      <div class="post-header">
        <div class="post-avatar" onclick="navigateTo('profile')">
          <span style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;font-size:20px;background:var(--dark-3)">${user.avatar}</span>
        </div>
        <div class="post-user-info">
          <div class="post-username" onclick="navigateTo('profile')">${user.name} ${verifiedBadge}</div>
          <div class="post-meta">${user.course || user.handle} · <span>${post.time}</span></div>
        </div>
        <button class="post-options-btn" onclick="showPostOptions(${post.id})">⋯</button>
      </div>
      <div class="post-body">
        <p class="post-text">${formatPostText(post.content)}</p>
      </div>
      ${emojiPlaceholder}${imgHtml}
      <div class="post-footer">
        <button class="post-action ${post.liked ? 'liked' : ''}" onclick="toggleLike(${post.id})">
          <span class="action-icon">${post.liked ? '❤️' : '🤍'}</span>
          <span>${formatNumber(post.likes)}</span>
        </button>
        <button class="post-action" onclick="openComments(${post.id})">
          <span class="action-icon">💬</span>
          <span>${post.comments}</span>
        </button>
        <button class="post-action" onclick="sharePost(${post.id})">
          <span class="action-icon">🔗</span>
          <span>${post.shares}</span>
        </button>
        <button class="post-action" onclick="savePost(${post.id})">
          <span class="action-icon">${post.saved ? '🔖' : '📌'}</span>
        </button>
      </div>
    </div>
  `;
}

function formatPostText(text) {
  return text
    .replace(/#(\w+)/g, '<span class="tag">#$1</span>')
    .replace(/@(\w+)/g, '<span class="mention">@$1</span>');
}

function toggleLike(postId) {
  const post = App.posts.find(p => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderPosts();
  if (post.liked) showToast('Post curtido! ❤️', 'success');
}

function openComments(postId) {
  const post = App.posts.find(p => p.id === postId);
  const user = getUserById(post.userId);
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = `Comentários — post de ${user.name}`;
  body.innerHTML = `
    <div style="margin-bottom:16px">
      <div style="background:var(--dark-3);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px">
        <p style="font-size:14px;color:var(--gray-light)">${post.content.slice(0, 120)}${post.content.length > 120 ? '...' : ''}</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
        ${generateFakeComments(post.id)}
      </div>
    </div>
    <div style="display:flex;gap:10px;align-items:center">
      <input id="commentInput" placeholder="Escreva um comentário..." style="flex:1;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-full);padding:10px 16px;color:var(--white);font-size:14px;outline:none;font-family:var(--font-body)">
      <button onclick="submitComment(${postId})" style="background:var(--red);border:none;border-radius:50%;width:40px;height:40px;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center">➤</button>
    </div>
  `;
  openModal('genericModal');
}

function generateFakeComments(postId) {
  const comments = [
    { userId: 2, text: 'Incrível! Parabéns pelo trabalho! 🎉', time: '30 min' },
    { userId: 3, text: 'Que demais! Aprendi muito vendo isso.', time: '1h' },
    { userId: 6, text: 'Adorei! Quando você faz mais conteúdo?', time: '2h' },
  ];
  return comments.map(c => {
    const u = getUserById(c.userId);
    return `
      <div style="display:flex;gap:10px;align-items:flex-start">
        <div style="width:34px;height:34px;border-radius:50%;background:var(--dark-4);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${u.avatar}</div>
        <div style="flex:1">
          <span style="font-size:13px;font-weight:600">${u.name}</span>
          <span style="font-size:12px;color:var(--gray-mid);margin-left:8px">${c.time}</span>
          <p style="font-size:14px;margin-top:3px;color:rgba(245,245,245,0.85)">${c.text}</p>
        </div>
      </div>
    `;
  }).join('');
}

function submitComment(postId) {
  const input = $('#commentInput');
  const text = input.value.trim();
  if (!text) return;
  const post = App.posts.find(p => p.id === postId);
  post.comments++;
  input.value = '';
  showToast('Comentário publicado! 💬', 'success');
  renderPosts();
}

function sharePost(postId) {
  const post = App.posts.find(p => p.id === postId);
  post.shares++;
  renderPosts();
  showToast('Post compartilhado! 🔗', 'success');
}

function savePost(postId) {
  const post = App.posts.find(p => p.id === postId);
  post.saved = !post.saved;
  renderPosts();
  showToast(post.saved ? 'Post salvo! 🔖' : 'Post removido dos salvos.', post.saved ? 'success' : '');
}

function showPostOptions(postId) {
  showToast('Opções: Salvar, Reportar, Compartilhar...', 'info');
}

function openImageModal(src) {
  showToast('Visualizador de imagem — em breve!', 'info');
}

// =====================
// NEW POST MODAL
// =====================
function openNewPost() {
  openModal('newPostModal');
}

function submitNewPost() {
  const text = $('#newPostText').value.trim();
  if (!text) { showToast('Escreva algo antes de publicar!'); return; }
  const newPost = {
    id: Date.now(), userId: 1,
    content: text, image: null, emoji: '📝',
    likes: 0, comments: 0, shares: 0,
    liked: false, time: 'agora', saved: false,
  };
  App.posts.unshift(newPost);
  renderPosts();
  closeModal('newPostModal');
  $('#newPostText').value = '';
  showToast('Publicação criada com sucesso! 🎉', 'success');
}

// =====================
// PROFILE
// =====================
function renderProfile() {
  const u = App.currentUser;
  if (!u) return;

  // Header info
  const nameEl = $('#profileName');
  const handleEl = $('#profileHandle');
  const bioEl = $('#profileBio');
  const courseEl = $('#profileCourse');
  const followersEl = $('#profileFollowers');
  const followingEl = $('#profileFollowing');
  const postsCountEl = $('#profilePostsCount');

  if (nameEl) nameEl.textContent = u.name;
  if (handleEl) handleEl.textContent = u.handle;
  if (bioEl) bioEl.textContent = u.bio || 'Aluno SENAI apaixonado por tecnologia!';
  if (courseEl) courseEl.textContent = u.course || 'Tecnologia da Informação';
  if (followersEl) followersEl.textContent = formatNumber(u.followers || 0);
  if (followingEl) followingEl.textContent = formatNumber(u.following || 0);
  if (postsCountEl) postsCountEl.textContent = App.posts.filter(p => p.userId === 1).length;

  renderProfileGrid();
}

function renderProfileGrid() {
  const grid = $('#profileGrid');
  if (!grid) return;
  const userPosts = App.posts.filter(p => p.userId === 1);
  if (userPosts.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <div class="empty-state-icon">📝</div>
        <h3>Nenhuma publicação ainda</h3>
        <p>Compartilhe algo com a comunidade!</p>
      </div>
    `;
    return;
  }
  grid.innerHTML = userPosts.map(p => `
    <div class="grid-post" onclick="openComments(${p.id})">
      <span>${p.emoji || '📝'}</span>
      <div class="grid-post-overlay">
        <span>❤️ ${p.likes}</span>
        <span>💬 ${p.comments}</span>
      </div>
    </div>
  `).join('');
}

function openEditProfile() {
  const u = App.currentUser;
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = 'Editar Perfil';
  body.innerHTML = `
    <div class="form-group">
      <label>Nome</label>
      <input id="editName" value="${u.name}" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)">
    </div>
    <div class="form-group" style="margin-top:14px">
      <label>Bio</label>
      <textarea id="editBio" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;resize:vertical;min-height:80px;font-family:var(--font-body)">${u.bio || ''}</textarea>
    </div>
    <div class="form-group" style="margin-top:14px">
      <label>Emoji / Avatar</label>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px">
        ${['😊','👨‍💻','👩‍💻','🎨','⚡','🔧','🧑‍🍳','🏗️','💊','🚀','🎯','💡'].map(e => `
          <button onclick="selectAvatar('${e}')" style="width:40px;height:40px;border-radius:50%;background:var(--dark-3);border:2px solid var(--dark-4);font-size:20px;cursor:pointer;transition:var(--transition)" onmouseover="this.style.borderColor='var(--red)'" onmouseout="this.style.borderColor='var(--dark-4)'">${e}</button>
        `).join('')}
      </div>
    </div>
    <button onclick="saveProfile()" style="width:100%;margin-top:20px;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:13px;font-size:15px;font-weight:600;cursor:pointer">Salvar Alterações</button>
  `;
  openModal('genericModal');
}

function selectAvatar(emoji) {
  App.currentUser.avatar = emoji;
  showToast(`Avatar atualizado! ${emoji}`, 'success');
}

function saveProfile() {
  const name = $('#editName')?.value.trim();
  const bio = $('#editBio')?.value.trim();
  if (name) App.currentUser.name = name;
  if (bio !== undefined) App.currentUser.bio = bio;
  App.currentUser.handle = '@' + (name || App.currentUser.name).toLowerCase().replace(/\s/g, '');
  localStorage.setItem('sc_session', JSON.stringify(App.currentUser));
  renderProfile();
  updateHeaderUser();
  renderSidebar();
  closeModal('genericModal');
  showToast('Perfil atualizado com sucesso! ✅', 'success');
}

function switchProfileTab(tab) {
  $$('.profile-tab').forEach(t => t.classList.remove('active'));
  $(`[data-tab="${tab}"]`).classList.add('active');
  if (tab === 'posts') renderProfileGrid();
  else {
    const grid = $('#profileGrid');
    if (grid) grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔒</div><h3>${tab === 'salvos' ? 'Nenhum post salvo' : 'Em breve!'}</h3></div>`;
  }
}

// =====================
// NOTIFICATIONS
// =====================
function renderNotifications() {
  const container = $('#notifContainer');
  if (!container) return;
  container.innerHTML = App.notifications.map(n => {
    const user = getUserById(n.userId);
    const icon = { like: '❤️', comment: '💬', follow: '👤', mention: '@' }[n.type] || '🔔';
    return `
      <div class="notif-item ${n.unread ? 'unread' : ''}" onclick="markNotifRead(${n.id})">
        <div class="notif-avatar">${user.avatar}</div>
        <div class="notif-icon-badge">${icon}</div>
        <div class="notif-content">
          <div class="notif-text"><strong>${user.name}</strong> ${n.text}</div>
          <div class="notif-time">${n.time}</div>
        </div>
      </div>
    `;
  }).join('');
}

function markNotifRead(id) {
  const n = App.notifications.find(n => n.id === id);
  if (n) { n.unread = false; }
  renderNotifications();
  updateNotifBadge();
}

function markAllRead() {
  App.notifications.forEach(n => n.unread = false);
  renderNotifications();
  updateNotifBadge();
  showToast('Todas as notificações marcadas como lidas!', 'success');
}

function updateNotifBadge() {
  const count = App.notifications.filter(n => n.unread).length;
  const badge = $('#notifBadge');
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  const msgCount = App.messages.reduce((acc, m) => acc + m.unread, 0);
  const msgBadge = $('#msgBadge');
  if (msgBadge) {
    msgBadge.textContent = msgCount;
    msgBadge.style.display = msgCount > 0 ? 'flex' : 'none';
  }
}

// =====================
// MESSAGES
// =====================
function renderMessages() {
  const list = $('#messagesList');
  if (!list) return;
  list.innerHTML = App.messages.map(conv => {
    const user = getUserById(conv.userId);
    const isOnline = conv.userId % 2 === 0;
    return `
      <div class="message-preview ${App.activeChat === conv.id ? 'active' : ''}" onclick="openChat(${conv.id})">
        <div class="msg-avatar">
          ${user.avatar}
          ${isOnline ? '<div class="online-dot"></div>' : ''}
        </div>
        <div class="msg-info">
          <div class="msg-name">${user.name}</div>
          <div class="msg-preview-text">${conv.preview}</div>
        </div>
        <div class="msg-meta">
          <div class="msg-time">${conv.messages[conv.messages.length - 1].time}</div>
          ${conv.unread > 0 ? `<div class="msg-unread-badge">${conv.unread}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function openChat(convId) {
  App.activeChat = convId;
  const conv = App.messages.find(m => m.id === convId);
  conv.unread = 0;
  const user = getUserById(conv.userId);

  // Update chat header
  const chatHeader = $('#chatHeader');
  chatHeader.innerHTML = `
    <div class="chat-avatar">${user.avatar}</div>
    <div>
      <div class="chat-user-name">${user.name}</div>
      <div class="chat-status">● Online</div>
    </div>
    <div class="chat-header-actions">
      <button class="chat-action-btn" onclick="showToast('Chamada de vídeo — em breve! 📹', 'info')">📹</button>
      <button class="chat-action-btn" onclick="showToast('Chamada de voz — em breve! 📞', 'info')">📞</button>
      <button class="chat-action-btn" onclick="showToast('Informações do contato — em breve!', 'info')">ℹ️</button>
    </div>
  `;

  // Render messages
  renderChatMessages(conv);
  renderMessages();
  updateNotifBadge();
}

function renderChatMessages(conv) {
  const container = $('#chatMessagesContainer');
  if (!container) return;
  const u = App.currentUser;
  container.innerHTML = conv.messages.map(msg => {
    const isMe = msg.from === 1;
    const sender = getUserById(msg.from);
    return `
      <div class="chat-msg ${isMe ? 'sent' : ''}">
        ${!isMe ? `<div class="chat-msg-avatar">${sender.avatar}</div>` : ''}
        <div>
          <div class="chat-msg-bubble">${msg.text}</div>
          <div class="chat-msg-time">${msg.time}</div>
        </div>
        ${isMe ? `<div class="chat-msg-avatar">${u.avatar}</div>` : ''}
      </div>
    `;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

function sendMessage() {
  const input = $('#chatInput');
  const text = input.value.trim();
  if (!text || !App.activeChat) return;
  const conv = App.messages.find(m => m.id === App.activeChat);
  const now = new Date();
  const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
  conv.messages.push({ id: Date.now(), from: 1, text, time });
  conv.preview = text;
  input.value = '';
  renderChatMessages(conv);
  renderMessages();
  // Fake reply after 1.5s
  setTimeout(() => {
    const replies = [
      'Que legal! 😄', 'Entendido!', 'Obrigado pela mensagem!',
      'Vou dar uma olhada nisso.', 'Boa ideia! 👍', 'Com certeza! 🔥'
    ];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    conv.messages.push({ id: Date.now(), from: conv.userId, text: reply, time });
    conv.preview = reply;
    renderChatMessages(conv);
    renderMessages();
  }, 1500);
}

// =====================
// EXPLORE
// =====================
function renderExplore() {
  const grid = $('#exploreGrid');
  if (!grid) return;
  const items = [
    { emoji: '💻', tag: 'Tecnologia', title: 'Programação Web com React', count: '2.4k posts' },
    { emoji: '🎨', tag: 'Design', title: 'UI/UX e Design Gráfico', count: '1.8k posts' },
    { emoji: '⚙️', tag: 'Mecatrônica', title: 'Indústria 4.0', count: '987 posts' },
    { emoji: '🍰', tag: 'Gastronomia', title: 'Gastronomia e Confeitaria', count: '3.1k posts' },
    { emoji: '💊', tag: 'Saúde', title: 'Enfermagem e Saúde', count: '1.5k posts' },
    { emoji: '☀️', tag: 'Energia', title: 'Energia Solar e Renovável', count: '654 posts' },
    { emoji: '🏗️', tag: 'Edificações', title: 'Construção Civil', count: '789 posts' },
    { emoji: '🔌', tag: 'TI', title: 'Redes e Infraestrutura', count: '1.2k posts' },
    { emoji: '🚗', tag: 'Automotivo', title: 'Mecânica Automotiva', count: '923 posts' },
    { emoji: '🧑‍🏭', tag: 'Segurança', title: 'Segurança do Trabalho', count: '445 posts' },
    { emoji: '📊', tag: 'Gestão', title: 'Administração e Negócios', count: '1.1k posts' },
    { emoji: '🎬', tag: 'Comunicação', title: 'Publicidade e Marketing', count: '876 posts' },
  ];
  grid.innerHTML = items.map(item => `
    <div class="explore-item" onclick="showToast('Explorando ${item.tag}! 🔍', 'info')">
      <div class="explore-thumb"><span>${item.emoji}</span></div>
      <div class="explore-item-info">
        <div class="explore-item-tag">${item.tag}</div>
        <div class="explore-item-title">${item.title}</div>
        <div class="explore-item-count">${item.count}</div>
      </div>
    </div>
  `).join('');
}

// =====================
// TRENDING & SUGGESTIONS
// =====================
function renderTrending() {
  const el = $('#trendingList');
  if (!el) return;
  el.innerHTML = TRENDING.map((t, i) => `
    <div class="trending-item" onclick="showToast('Explorando ${t.tag}', 'info')">
      <span class="trending-num">${i + 1}</span>
      <span class="trending-tag">${t.tag}</span>
      <span class="trending-count">${t.count}</span>
    </div>
  `).join('');
}

function renderSuggestions() {
  const el = $('#suggestionsList');
  if (!el) return;
  el.innerHTML = FAKE_USERS.slice(0, 4).map(u => `
    <div class="suggestion-item">
      <div class="suggestion-avatar">${u.avatar}</div>
      <div class="suggestion-info">
        <div class="suggestion-name">${u.name}</div>
        <div class="suggestion-sub">${u.course}</div>
      </div>
      <button class="btn-follow" id="follow-${u.id}" onclick="toggleFollow(${u.id})">Seguir</button>
    </div>
  `).join('');
}

function toggleFollow(userId) {
  const btn = $(`#follow-${userId}`);
  if (!btn) return;
  const isFollowing = btn.classList.contains('following');
  btn.classList.toggle('following', !isFollowing);
  btn.textContent = isFollowing ? 'Seguir' : 'Seguindo';
  const user = getUserById(userId);
  showToast(isFollowing ? `Deixou de seguir ${user.name}` : `Seguindo ${user.name}! 🎉`, isFollowing ? '' : 'success');
}

// =====================
// MODAL SYSTEM
// =====================
function openModal(id) {
  const modal = $(`#${id}`);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = $(`#${id}`);
  if (modal) modal.classList.remove('open');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// =====================
// SEARCH
// =====================
function handleSearch(e) {
  const q = e.target.value.trim().toLowerCase();
  if (!q) return;
  if (e.key === 'Enter') {
    showToast(`Buscando por "${q}"... 🔍`, 'info');
    navigateTo('explore');
  }
}

// =====================
// INIT
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // Hide loader after assets loaded
  setTimeout(hideLoader, 1600);

  // Init auth
  initAuth();

  // Navigation
  $$('[data-page]').forEach(el => {
    el.addEventListener('click', () => navigateTo(el.dataset.page));
  });

  // Search input
  const searchInput = $('#headerSearch');
  if (searchInput) {
    searchInput.addEventListener('keydown', handleSearch);
  }

  // Create post shortcut in feed
  const postInput = $('#feedPostInput');
  if (postInput) {
    postInput.addEventListener('focus', openNewPost);
  }

  // Chat enter key
  const chatInput = $('#chatInput');
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Notifications page button
  const notifBtn = $('#headerNotifBtn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => navigateTo('notificacoes'));
  }

  // Messages button
  const msgBtn = $('#headerMsgBtn');
  if (msgBtn) {
    msgBtn.addEventListener('click', () => navigateTo('mensagens'));
  }
});
// ===============================
// CADASTRAR USUÁRIO NO MONGO
// ===============================

const registerForm = document.getElementById("registerForm")

if(registerForm){

registerForm.addEventListener("submit", async (e)=>{

e.preventDefault()

const usuario = {
nome: document.getElementById("regName").value,
email: document.getElementById("regEmail").value,
curso: document.getElementById("regCourse").value,
senha: document.getElementById("regPass").value
}

try{

const resposta = await fetch("http://localhost:3000/usuarios",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(usuario)

})

alert("Usuário criado com sucesso!")

document.getElementById("registerForm").reset()

}catch(erro){

console.log(erro)
alert("Erro ao criar usuário")

}

})

}