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
  { id: 2, name: 'Ana Beatriz', handle: '@anabeatriz', avatar: 'https://i.pravatar.cc/300?img=5', course: 'Análise e Desenvolvimento', followers: 1240, following: 340, verified: true,
    storyImg: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500' },
  { id: 3, name: 'Felipe Zamora', handle: '@felipezamora', avatar: 'https://i.pravatar.cc/300?img=70', course: 'Mecatrônica', followers: 890, following: 220, verified: false,
    storyImg: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=500' },
  { id: 4, name: 'Marina Costa', handle: '@marinacosta', avatar: 'https://i.pravatar.cc/300?img=9', course: 'Design Gráfico', followers: 2100, following: 180, verified: true,
    storyImg: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500' },
  { id: 5, name: 'Pedro Alves', handle: '@pedroalves', avatar: 'https://i.pravatar.cc/300?img=12', course: 'Eletrotécnica', followers: 560, following: 410, verified: false,
    storyImg: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500' },
  { id: 6, name: 'Julia Mendes', handle: '@juliamendes', avatar: 'https://i.pravatar.cc/300?img=10', course: 'Gastronomia', followers: 3400, following: 250, verified: true,
    storyImg: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500' },
  { id: 7, name: 'Rafael Nunes', handle: '@rafaelnunes', avatar: 'https://i.pravatar.cc/300?img=13', course: 'Edificações', followers: 720, following: 300, verified: false,
    storyImg: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500' },
  { id: 8, name: 'Larissa Ferreira', handle: '@larissaferreira', avatar: 'https://i.pravatar.cc/300?img=20', course: 'Enfermagem', followers: 1850, following: 420, verified: true,
    storyImg: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500' },
  { id: 9, name: 'Bruno Lopes', handle: '@brunolopes', avatar: 'https://i.pravatar.cc/300?img=15', course: 'Redes de Computadores', followers: 945, following: 180, verified: false,
    storyImg: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500' }
];

// =====================
// POSTS INICIAIS
// =====================
const INITIAL_POSTS = [
  {
    id: 1, userId: 4,
    content: 'Finalizei o projeto de identidade visual para o meu TCC! 🎨 #Design #SENAI',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', 
    likes: 87, comments: 14, shares: 5, liked: false, time: '2h atrás', saved: false,
  },
  {
    id: 2, userId: 2,
    content: 'Acabei de fazer o deploy do meu primeiro projeto em React! 🚀 #Programação',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    likes: 143, comments: 31, shares: 18, liked: false, time: '4h atrás', saved: false,
  },
  {
    id: 3, userId: 3,
    content: 'Prática de hoje na oficina de usinagem. 🤖⚙️ #Mecatrônica #SENAI',
    image: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800',
    likes: 56, comments: 8, shares: 3, liked: false, time: '5h atrás', saved: false,
  }
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
  { tag: '#SENAI2026', count: '12.4k posts' },
  { tag: '#Tecnologia', count: '9.8k posts' },
  { tag: '#TCC', count: '7.2k posts' },
  { tag: '#Indústria4.0', count: '5.6k posts' },
  { tag: '#ProgramaçãoWeb', count: '4.1k posts' },
  { tag: '#Design', count: '3.8k posts' },
  { tag: '#Gastronomia', count: '2.9k posts' },
];

// =====================
// CAMADA DE API — MONGODB
// =====================
const API = 'http://localhost:3000';

// Utilitário genérico — nunca lança erro para não quebrar o app
async function apiCall(method, path, body = null) {
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body) opts.body = JSON.stringify(body);
    const resp = await fetch(API + path, opts);
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null; // servidor offline → ignora silenciosamente
  }
}

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
  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#loginName').value.trim();
    const pass = $('#loginPass').value.trim();
    if (!name || !pass) { showToast('Preencha todos os campos!'); return; }
    // Try MongoDB first
    try {
      const resp = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, senha: pass }),
      });
      if (resp.ok) {
        const data = await resp.json();
        if (data.usuario) {
          const user = {
            id: 1,
            name: data.usuario.nome,
            email: data.usuario.email,
            course: data.usuario.curso,
            password: pass,
            handle: '@' + data.usuario.nome.toLowerCase().replace(/\s/g, ''),
            avatar: '😊', bio: 'Aluno SENAI | ' + data.usuario.curso,
            followers: 0, following: 0,
          };
          loginUser(user);
          return;
        }
      }
    } catch(e) { /* servidor offline — tenta localStorage */ }
    // Fallback: localStorage
    const users = JSON.parse(localStorage.getItem('sc_users') || '[]');
    const found = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.password === pass);
    if (!found) { showToast('Usuário ou senha inválidos!'); return; }
    loginUser(found);
  });

  // Register
  $('#registerForm').addEventListener('submit', async (e) => {
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
    // Save locally always
    const newUser = {
      id: 1, name, email, course, password: pass,
      handle: '@' + name.toLowerCase().replace(/\s/g, ''),
      avatar: '😊', bio: 'Aluno SENAI | ' + course,
      followers: 0, following: 0,
    };
    users.push(newUser);
    localStorage.setItem('sc_users', JSON.stringify(users));
    // Also try to save to MongoDB
    try {
      await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: name, email, curso: course, senha: pass }),
      });
    } catch(err) { /* servidor offline — salvo só localmente */ }
    showToast('Conta criada com sucesso! Faça login. 🎉', 'success');
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
  renderGroups();
  renderEvents();
  renderVagas();
  renderProjects();
  renderSettings();
  navigateTo('feed');
  // Start real-time notification engine
  startRealtimeNotifications();
}

// =====================
// HEADER
// =====================
function updateHeaderUser() {
  const u = App.currentUser;
  const av = $('#headerAvatar');
  if (av) {
    // Agora sempre exibimos como imagem, garantindo que ocupe todo o espaço
    av.innerHTML = `<img src="${u.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${u.name}'">`;
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
      <div style="width:40px;height:40px;border-radius:50%;background:var(--dark-4);display:flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid var(--red);overflow:hidden;">
        <img src="${u.avatar}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${u.name}'">
      </div>
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
  // Re-render dynamic pages
  if (page === 'grupos') renderGroups();
  if (page === 'eventos') renderEvents();
  if (page === 'vagas') renderVagas();
  if (page === 'projetos') renderProjects();
  if (page === 'configuracoes') renderSettings();
  if (page === 'perfil') renderProfile();
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
    <div class="story-item add-story" onclick="openStoryCreator()">
      <div class="story-avatar-wrap">
        <div class="story-avatar">
          <img src="${u.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${u.name}'">
        </div>
      </div>
      <span class="story-name">Seu story</span>
    </div>
  `;
  FAKE_USERS.slice(0, 6).forEach(user => {
    html += `
      <div class="story-item" onclick="viewStory(${user.id})">
        <div class="story-avatar-wrap">
          <div class="story-avatar">
             <img src="${user.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${user.name}'">
          </div>
        </div>
        <span class="story-name">${user.name.split(' ')[0]}</span>
      </div>
    `;
  });
  wrap.innerHTML = html;
}

// viewStory is defined below with full implementation

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
  const videoHtml = post.video ? `<video src="${post.video}" controls style="width:100%;max-height:400px;display:block;background:#000"></video>` : '';
  const pollHtml = post.poll ? buildPollHtml(post) : '';

  return `
    <div class="post-card" id="post-${post.id}">
      <div class="post-header">
        <div class="post-avatar" onclick="navigateTo('profile')">
          <img src="${user.avatar}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;" onerror="this.src='https://ui-avatars.com/api/?name=${user.name}'">
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
      ${imgHtml}${videoHtml}${pollHtml}
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

function buildPollHtml(post) {
  const poll = post.poll;
  const total = poll.total || 0;
  return `
    <div style="padding:0 18px 14px">
      <div style="background:var(--dark-3);border-radius:var(--radius-sm);padding:14px">
        <div style="font-size:14px;font-weight:600;margin-bottom:10px">📊 ${poll.question}</div>
        ${poll.opts.map((opt, i) => {
          const pct = total > 0 ? Math.round((poll.votes[i] / total) * 100) : 0;
          return `<div onclick="votePoll(${post.id}, ${i})" style="margin-bottom:8px;cursor:pointer">
            <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px">
              <span>${opt}</span><span style="color:var(--gray-mid)">${pct}%</span>
            </div>
            <div style="height:6px;background:var(--dark-4);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${pct}%;background:var(--red);border-radius:99px;transition:width .4s"></div>
            </div>
          </div>`;
        }).join('')}
        <div style="font-size:12px;color:var(--gray-mid);margin-top:8px">${total} votos · ${poll.duration}</div>
      </div>
    </div>
  `;
}

function votePoll(postId, optIdx) {
  const post = App.posts.find(p => p.id === postId);
  if (!post?.poll || post.poll.voted) return;
  post.poll.votes[optIdx]++;
  post.poll.total = (post.poll.total || 0) + 1;
  post.poll.voted = true;
  renderPosts();
  showToast('Voto registrado! ✅', 'success');
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

  // Sincronizar com MongoDB em background
  const u = App.currentUser;
  if (u?.email && post.mongoId) {
    apiCall('POST', '/curtidas/toggle', {
      usuarioEmail: u.email,
      postId: post.mongoId,
    });
  }
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
    const avSrc = typeof u.avatar === 'string' && u.avatar.startsWith('http')
      ? u.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=b80f20&color=fff`;
    return `
      <div style="display:flex;gap:10px;align-items:flex-start">
        <div style="width:34px;height:34px;border-radius:50%;overflow:hidden;flex-shrink:0">
          <img src="${avSrc}" style="width:100%;height:100%;object-fit:cover">
        </div>
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
  const post = App.posts.find(p => p.id === postId);
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = 'Opções da publicação';
  body.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:8px">
      <button onclick="savePost(${postId});closeModal('genericModal')" style="background:var(--dark-3);border:1px solid var(--dark-4);color:var(--white);padding:12px 16px;border-radius:var(--radius-sm);font-size:14px;text-align:left;cursor:pointer;transition:var(--transition)" onmouseover="this.style.background='var(--dark-4)'" onmouseout="this.style.background='var(--dark-3)'">🔖 ${post?.saved ? 'Remover dos salvos' : 'Salvar publicação'}</button>
      <button onclick="sharePost(${postId});closeModal('genericModal')" style="background:var(--dark-3);border:1px solid var(--dark-4);color:var(--white);padding:12px 16px;border-radius:var(--radius-sm);font-size:14px;text-align:left;cursor:pointer;transition:var(--transition)" onmouseover="this.style.background='var(--dark-4)'" onmouseout="this.style.background='var(--dark-3)'">🔗 Compartilhar</button>
      <button onclick="copyPostLink(${postId})" style="background:var(--dark-3);border:1px solid var(--dark-4);color:var(--white);padding:12px 16px;border-radius:var(--radius-sm);font-size:14px;text-align:left;cursor:pointer;transition:var(--transition)" onmouseover="this.style.background='var(--dark-4)'" onmouseout="this.style.background='var(--dark-3)'">📋 Copiar link</button>
      <button onclick="reportPost(${postId})" style="background:var(--dark-3);border:1px solid var(--dark-4);color:var(--red);padding:12px 16px;border-radius:var(--radius-sm);font-size:14px;text-align:left;cursor:pointer;transition:var(--transition)" onmouseover="this.style.background='var(--dark-4)'" onmouseout="this.style.background='var(--dark-3)'">🚨 Reportar conteúdo</button>
    </div>
  `;
  openModal('genericModal');
}

function copyPostLink(postId) {
  navigator.clipboard?.writeText(window.location.href + '#post-' + postId).catch(() => {});
  closeModal('genericModal');
  showToast('Link copiado! 📋', 'success');
}

function reportPost(postId) {
  closeModal('genericModal');
  showToast('Publicação reportada. Obrigado! ✅', 'success');
}


// =====================
// LIGHTBOX / VISUALIZADOR DE IMAGEM
// =====================
function openImageModal(src, caption) {
  const existing = document.getElementById('lightboxOverlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.id = 'lightboxOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.95);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:zoom-out;backdrop-filter:blur(6px);animation:fadeIn .2s ease';
  overlay.innerHTML = `
    <button onclick="document.getElementById('lightboxOverlay').remove()" style="position:absolute;top:20px;right:24px;background:rgba(255,255,255,0.1);border:none;color:#fff;font-size:28px;cursor:pointer;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .2s" onmouseover="this.style.background='rgba(255,255,255,0.2)'" onmouseout="this.style.background='rgba(255,255,255,0.1)'">✕</button>
    <img src="${src}" style="max-width:90vw;max-height:80vh;border-radius:10px;object-fit:contain;box-shadow:0 8px 60px rgba(0,0,0,0.8)" alt="">
    ${caption ? `<p style="margin-top:16px;color:rgba(255,255,255,0.7);font-size:14px;max-width:600px;text-align:center">${caption}</p>` : ''}
  `;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// =====================
// UPLOAD DE MÍDIA (FOTO/VÍDEO)
// =====================
let pendingMediaBase64 = null;
let pendingMediaType = null;

function openMediaUpload(type) {
  pendingMediaBase64 = null;
  pendingMediaType = type;
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = type === 'video' ? 'video/*' : 'image/*';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const maxMB = type === 'video' ? 50 : 10;
    if (file.size > maxMB * 1024 * 1024) {
      showToast(`Arquivo muito grande! Máximo ${maxMB}MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      pendingMediaBase64 = ev.target.result;
      pendingMediaType = type;
      // Show preview inside the modal
      const preview = document.getElementById('postMediaPreview');
      if (preview) {
        if (type === 'video') {
          preview.innerHTML = `<video src="${pendingMediaBase64}" controls style="max-width:100%;max-height:200px;border-radius:8px;margin-top:10px"></video>`;
        } else {
          preview.innerHTML = `<img src="${pendingMediaBase64}" style="max-width:100%;max-height:200px;border-radius:8px;margin-top:10px;object-fit:cover">`;
        }
      }
      showToast(`${type === 'video' ? 'Vídeo' : 'Foto'} carregado! ✅`, 'success');
    };
    reader.readAsDataURL(file);
  };
  input.click();
}

// =====================
// EMOJI PICKER
// =====================
const EMOJI_LIST = ['😊','😂','❤️','🔥','👏','🙌','🎉','🚀','💡','💪','👍','🤩','😍','🥳','🎓','💻','⚙️','🎨','📚','🏆','🌟','✨','🙏','😎','🤝','📱','💼','🎯','📸','🌈'];

function openEmojiPicker() {
  const existing = document.getElementById('emojiPickerPopup');
  if (existing) { existing.remove(); return; }
  const popup = document.createElement('div');
  popup.id = 'emojiPickerPopup';
  popup.style.cssText = 'position:absolute;bottom:60px;left:10px;z-index:500;background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);padding:12px;display:grid;grid-template-columns:repeat(6,1fr);gap:4px;box-shadow:var(--shadow-lg);width:240px;animation:fadeIn .15s ease';
  EMOJI_LIST.forEach(em => {
    const btn = document.createElement('button');
    btn.textContent = em;
    btn.style.cssText = 'background:none;border:none;font-size:22px;cursor:pointer;padding:4px;border-radius:6px;transition:background .15s';
    btn.onmouseover = () => btn.style.background = 'var(--dark-4)';
    btn.onmouseout = () => btn.style.background = 'none';
    btn.onclick = () => {
      const input = document.getElementById('chatInput');
      if (input) { input.value += em; input.focus(); }
      popup.remove();
    };
    popup.appendChild(btn);
  });
  const chatBar = document.querySelector('.chat-input-bar');
  if (chatBar) { chatBar.style.position = 'relative'; chatBar.appendChild(popup); }
  setTimeout(() => document.addEventListener('click', function handler(e) {
    if (!popup.contains(e.target)) { popup.remove(); document.removeEventListener('click', handler); }
  }), 100);
}

// =====================
// EMOJI PICKER PARA POST
// =====================
function openPostEmojiPicker() {
  const existing = document.getElementById('postEmojiPickerPopup');
  if (existing) { existing.remove(); return; }
  const popup = document.createElement('div');
  popup.id = 'postEmojiPickerPopup';
  popup.style.cssText = 'position:absolute;top:-200px;left:0;z-index:500;background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);padding:12px;display:grid;grid-template-columns:repeat(6,1fr);gap:4px;box-shadow:var(--shadow-lg);width:240px;animation:fadeIn .15s ease';
  EMOJI_LIST.forEach(em => {
    const btn = document.createElement('button');
    btn.textContent = em;
    btn.style.cssText = 'background:none;border:none;font-size:22px;cursor:pointer;padding:4px;border-radius:6px;transition:background .15s';
    btn.onmouseover = () => btn.style.background = 'var(--dark-4)';
    btn.onmouseout = () => btn.style.background = 'none';
    btn.onclick = () => {
      const input = document.getElementById('newPostText');
      if (input) { input.value += em; input.focus(); }
      popup.remove();
    };
    popup.appendChild(btn);
  });
  const optArea = document.getElementById('postModalOpts');
  if (optArea) { optArea.style.position = 'relative'; optArea.appendChild(popup); }
  setTimeout(() => document.addEventListener('click', function handler(e) {
    if (!popup.contains(e.target)) { popup.remove(); document.removeEventListener('click', handler); }
  }), 100);
}

// =====================
// ENQUETE
// =====================
let pollOptions = ['', ''];

function openPollCreator() {
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = '📊 Criar Enquete';
  pollOptions = ['', ''];
  body.innerHTML = `
    <div id="pollOptsContainer">
      <div class="form-group" style="margin-bottom:10px">
        <label style="font-size:13px;color:var(--gray-light);font-weight:500;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:6px">Pergunta</label>
        <input id="pollQuestion" placeholder="O que você quer perguntar?" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)">
      </div>
      <div id="pollOpts">
        <div class="form-group" style="margin-bottom:8px">
          <input class="poll-opt" data-idx="0" placeholder="Opção 1" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:14px;outline:none;font-family:var(--font-body)">
        </div>
        <div class="form-group" style="margin-bottom:8px">
          <input class="poll-opt" data-idx="1" placeholder="Opção 2" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:14px;outline:none;font-family:var(--font-body)">
        </div>
      </div>
      <button onclick="addPollOption()" style="background:none;border:1.5px dashed var(--dark-4);color:var(--gray-light);border-radius:var(--radius-sm);padding:9px;width:100%;cursor:pointer;font-size:14px;margin-bottom:16px">+ Adicionar opção</button>
    </div>
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:12px">
      <span style="font-size:13px;color:var(--gray-light)">Duração:</span>
      <select id="pollDuration" style="background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:7px 12px;color:var(--white);font-size:13px;outline:none;cursor:pointer">
        <option>1 dia</option><option selected>3 dias</option><option>7 dias</option><option>14 dias</option>
      </select>
    </div>
    <button onclick="submitPoll()" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:13px;font-size:15px;font-weight:600;cursor:pointer">Publicar Enquete 📊</button>
  `;
  openModal('genericModal');
}

function addPollOption() {
  const container = document.getElementById('pollOpts');
  const count = container.querySelectorAll('.poll-opt').length;
  if (count >= 4) { showToast('Máximo de 4 opções!'); return; }
  const div = document.createElement('div');
  div.className = 'form-group';
  div.style.marginBottom = '8px';
  div.innerHTML = `<input class="poll-opt" data-idx="${count}" placeholder="Opção ${count + 1}" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:14px;outline:none;font-family:var(--font-body)">`;
  container.appendChild(div);
}

function submitPoll() {
  const question = document.getElementById('pollQuestion')?.value.trim();
  const opts = Array.from(document.querySelectorAll('.poll-opt')).map(i => i.value.trim()).filter(Boolean);
  if (!question) { showToast('Escreva a pergunta!'); return; }
  if (opts.length < 2) { showToast('Adicione pelo menos 2 opções!'); return; }
  const duration = document.getElementById('pollDuration')?.value || '3 dias';
  const pollData = { question, opts, votes: opts.map(() => 0), duration, total: 0 };
  const newPost = {
    id: Date.now(), userId: 1,
    content: question, image: null, emoji: '📊',
    likes: 0, comments: 0, shares: 0,
    liked: false, time: 'agora', saved: false,
    poll: pollData,
  };
  App.posts.unshift(newPost);
  renderPosts();
  closeModal('genericModal');
  showToast('Enquete publicada! 📊', 'success');
}

// =====================
// LOCALIZAÇÃO
// =====================
function openLocationPicker() {
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = '📍 Adicionar Localização';
  const presets = ['SENAI São Paulo', 'SENAI Rio de Janeiro', 'SENAI Belo Horizonte', 'SENAI Curitiba', 'SENAI Porto Alegre', 'SENAI Brasília', 'SENAI Salvador', 'SENAI Recife', 'SENAI Fortaleza', 'SENAI Manaus'];
  body.innerHTML = `
    <div style="margin-bottom:14px">
      <input id="locationSearch" placeholder="Buscar local..." style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)" oninput="filterLocations(this.value)">
    </div>
    <div style="margin-bottom:10px;font-size:12px;color:var(--gray-mid);text-transform:uppercase;letter-spacing:.05em;font-weight:600">Sugestões</div>
    <div id="locationList" style="display:flex;flex-direction:column;gap:6px">
      ${presets.map(loc => `
        <div onclick="selectLocation('${loc}')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--dark-3);border-radius:var(--radius-sm);cursor:pointer;transition:background .15s" onmouseover="this.style.background='var(--dark-4)'" onmouseout="this.style.background='var(--dark-3)'">
          <span>📍</span><span style="font-size:14px">${loc}</span>
        </div>
      `).join('')}
    </div>
  `;
  openModal('genericModal');
}

function filterLocations(query) {
  const list = document.getElementById('locationList');
  if (!list) return;
  const items = list.querySelectorAll('div');
  items.forEach(item => {
    item.style.display = item.textContent.toLowerCase().includes(query.toLowerCase()) ? 'flex' : 'none';
  });
}

function selectLocation(loc) {
  App.pendingLocation = loc;
  closeModal('genericModal');
  const locBtn = document.getElementById('postLocationBtn');
  if (locBtn) { locBtn.textContent = `📍 ${loc}`; locBtn.style.color = 'var(--red)'; }
  showToast(`Local selecionado: ${loc} 📍`, 'success');
}

// =====================
// STORY VIEWER
// =====================
function viewStory(userId) {
  const user = getUserById(userId);
  const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
    ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;

  // Story data per user with real images
  const storyBank = {
    2: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600', caption: 'Estudando React hoje! 💻', sub: 'há 20 min' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600', caption: 'Deploy feito! 🚀', sub: 'há 1h' },
    ],
    3: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=600', caption: 'Prática de mecatrônica! ⚙️', sub: 'há 30 min' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=600', caption: 'Mais um projeto finalizado 🔧', sub: 'há 2h' },
    ],
    4: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600', caption: 'Novo projeto de design! 🎨', sub: 'há 10 min' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600', caption: 'Identidade visual do TCC ✨', sub: 'há 45 min' },
    ],
    5: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600', caption: 'Laboratório de elétrica! ⚡', sub: 'há 1h' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600', caption: 'Circuito novo montado 🔌', sub: 'há 3h' },
    ],
    6: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600', caption: 'Aula de gastronomia hoje! 🍳', sub: 'há 5 min' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600', caption: 'Prato especial do dia 🍽️', sub: 'há 2h' },
    ],
    7: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600', caption: 'Obra em andamento! 🏗️', sub: 'há 15 min' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600', caption: 'Projeto de edificações 📐', sub: 'há 4h' },
    ],
    8: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600', caption: 'Plantão hoje! 💊', sub: 'há 25 min' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600', caption: 'Estágio na UTI 🏥', sub: 'há 6h' },
    ],
    9: [
      { type: 'image', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600', caption: 'Configurando servidor! 🖥️', sub: 'há 40 min' },
      { type: 'image', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600', caption: 'Redes em dia! 🌐', sub: 'há 5h' },
    ],
  };

  const stories = storyBank[userId] || [
    { type: 'image', img: user.storyImg || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600', caption: `Olá! Sou ${user.name} 👋`, sub: 'há 1h' },
  ];

  let idx = 0;

  const overlay = document.createElement('div');
  overlay.id = 'storyOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease';

  const render = () => {
    const s = stories[idx];
    overlay.innerHTML = `
      <div style="width:100%;max-width:420px;height:100vh;max-height:780px;position:relative;overflow:hidden;border-radius:16px;background:#111;box-shadow:0 20px 80px rgba(0,0,0,0.8)">
        <!-- Background image -->
        <div style="position:absolute;inset:0;overflow:hidden">
          <img src="${s.img}" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.75)" onerror="this.style.display='none'">
          <div style="position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.45) 0%,transparent 30%,transparent 60%,rgba(0,0,0,0.7) 100%)"></div>
        </div>

        <!-- Progress bars -->
        <div style="position:absolute;top:12px;left:12px;right:12px;display:flex;gap:4px;z-index:10">
          ${stories.map((_, i) => `
            <div style="flex:1;height:3px;background:rgba(255,255,255,0.3);border-radius:2px;overflow:hidden">
              ${i < idx ? '<div style="height:100%;background:#fff;width:100%"></div>' : ''}
              ${i === idx ? '<div style="height:100%;background:#fff;animation:storyProgress 5s linear forwards"></div>' : ''}
            </div>
          `).join('')}
        </div>

        <!-- Header -->
        <div style="position:absolute;top:26px;left:12px;right:12px;display:flex;align-items:center;gap:10px;z-index:10">
          <div style="width:40px;height:40px;border-radius:50%;border:2px solid #fff;overflow:hidden;flex-shrink:0">
            <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover">
          </div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#fff;text-shadow:0 1px 4px rgba(0,0,0,0.5)">${user.name}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.75)">${s.sub || ''}</div>
          </div>
          <button onclick="document.getElementById('storyOverlay').remove()" style="margin-left:auto;background:rgba(0,0,0,0.35);backdrop-filter:blur(4px);border:none;color:#fff;font-size:20px;cursor:pointer;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center">✕</button>
        </div>

        <!-- Caption -->
        <div style="position:absolute;bottom:80px;left:16px;right:16px;z-index:10">
          <div style="font-size:18px;font-weight:700;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.7);line-height:1.3">${s.caption}</div>
        </div>

        <!-- Nav areas -->
        <div style="position:absolute;left:0;top:0;width:40%;height:100%;cursor:pointer;z-index:5" onclick="storyNav(-1)"></div>
        <div style="position:absolute;right:0;top:0;width:40%;height:100%;cursor:pointer;z-index:5" onclick="storyNav(1)"></div>

        <!-- Bottom reactions -->
        <div style="position:absolute;bottom:20px;left:12px;right:12px;display:flex;gap:8px;z-index:10">
          <input placeholder="Responder story..." style="flex:1;background:rgba(255,255,255,0.15);backdrop-filter:blur(8px);border:1.5px solid rgba(255,255,255,0.3);border-radius:999px;padding:10px 16px;color:#fff;font-size:14px;outline:none;font-family:var(--font-body)" onfocus="this.style.background='rgba(255,255,255,0.25)'">
          <button onclick="showToast('Reação enviada! ❤️','success')" style="background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);border:none;color:#fff;font-size:20px;width:44px;height:44px;border-radius:50%;cursor:pointer;flex-shrink:0">❤️</button>
          <button onclick="showToast('Story compartilhado! 🔗','success')" style="background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);border:none;color:#fff;font-size:20px;width:44px;height:44px;border-radius:50%;cursor:pointer;flex-shrink:0">📤</button>
        </div>
      </div>
    `;
    clearTimeout(overlay._timer);
    overlay._timer = setTimeout(() => storyNav(1), 5000);
  };

  window.storyNav = (dir) => {
    idx += dir;
    if (idx < 0) { overlay.remove(); return; }
    if (idx >= stories.length) { overlay.remove(); return; }
    render();
  };

  // Close on background click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.remove();
  });

  document.body.appendChild(overlay);
  render();
}

// =====================
// GRUPOS FUNCIONAL
// =====================
const GROUPS = [
  { id: 1, name: 'ADS SENAI SP', emoji: '💻', banner: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', members: 342, description: 'Grupo dos alunos de Análise e Desenvolvimento de Sistemas', joined: false, category: 'Tecnologia',
    posts: [
      { id: 101, userId: 2, text: 'Alguém tem dica de material para estudar Node.js? 🤔', time: '10 min', likes: 12, liked: false, comments: 5 },
      { id: 102, userId: 4, text: 'Compartilhando o link do meu projeto final em React! Feedback bem-vindo 🚀', time: '2h', likes: 34, liked: false, comments: 11 },
      { id: 103, userId: 9, text: 'Quem toparia montar um grupo de estudos pra prova de algoritmos? 📚', time: '5h', likes: 27, liked: false, comments: 8 },
    ]
  },
  { id: 2, name: 'Design & Criação', emoji: '🎨', banner: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800', members: 218, description: 'Compartilhe projetos e dicas de design gráfico', joined: false, category: 'Design',
    posts: [
      { id: 201, userId: 4, text: 'Finalizei minha identidade visual do TCC! Usou Figma do começo ao fim 🎨', time: '30 min', likes: 56, liked: false, comments: 14 },
      { id: 202, userId: 2, text: 'Qual ferramenta vocês preferem para prototipagem: Figma ou Adobe XD?', time: '3h', likes: 18, liked: false, comments: 22 },
    ]
  },
  { id: 3, name: 'Mecatrônica SENAI', emoji: '⚙️', banner: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=800', members: 189, description: 'Automação, robótica e indústria 4.0', joined: true, category: 'Engenharia',
    posts: [
      { id: 301, userId: 3, text: 'Montamos um braço robótico com Arduino na aula de hoje! ⚙️🤖', time: '1h', likes: 45, liked: false, comments: 9 },
      { id: 302, userId: 5, text: 'Alguém tem experiência com CLP Siemens S7-1200? Preciso de ajuda com ladder 😅', time: '4h', likes: 8, liked: false, comments: 16 },
    ]
  },
  { id: 4, name: 'Gastronomia SENAI', emoji: '🍽️', banner: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800', members: 276, description: 'Receitas, técnicas e novidades da gastronomia', joined: false, category: 'Gastronomia',
    posts: [
      { id: 401, userId: 6, text: 'Fiz esse suflê de chocolate na aula de hoje, ficou INCRÍVEL 🍫😍', time: '45 min', likes: 89, liked: false, comments: 23 },
      { id: 402, userId: 7, text: 'Dicas de facas boas para iniciantes? Ainda usando as da escola 🔪', time: '6h', likes: 11, liked: false, comments: 7 },
    ]
  },
  { id: 5, name: 'Eletrotécnica & Energia', emoji: '⚡', banner: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800', members: 145, description: 'Energia solar, elétrica e automação residencial', joined: false, category: 'Engenharia',
    posts: [
      { id: 501, userId: 5, text: 'Instalamos um sistema fotovoltaico de 5kWp no laboratório essa semana! ☀️', time: '2h', likes: 38, liked: false, comments: 6 },
    ]
  },
  { id: 6, name: 'Saúde & Enfermagem', emoji: '💊', banner: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800', members: 203, description: 'Conteúdo de saúde, simulados e estudos', joined: true, category: 'Saúde',
    posts: [
      { id: 601, userId: 8, text: 'Dica de ouro para o simulado de farmacologia: use flashcards! 📇✅', time: '20 min', likes: 61, liked: false, comments: 18 },
      { id: 602, userId: 6, text: 'Alguém sabe se haverá vagas de estágio no Hospital das Clínicas este semestre?', time: '7h', likes: 14, liked: false, comments: 31 },
    ]
  },
];

// Track which group is currently open
App.activeGroup = null;

function renderGroups() {
  const container = document.getElementById('page-grupos');
  if (!container) return;

  if (App.activeGroup !== null) {
    renderGroupDetail(App.activeGroup);
    return;
  }

  const myGroups = GROUPS.filter(g => g.joined);
  const discover = GROUPS.filter(g => !g.joined);

  container.innerHTML = `
    <div class="page-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
      <div>
        <h1 class="page-title">👥 Grupos</h1>
        <p class="page-subtitle">Participe de comunidades do seu curso</p>
      </div>
      <button onclick="openCreateGroupModal()" style="background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:10px 20px;font-size:14px;font-weight:600;cursor:pointer">+ Criar Grupo</button>
    </div>

    ${myGroups.length ? `
      <div style="margin-bottom:28px">
        <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--gray-mid);margin-bottom:12px">Meus grupos (${myGroups.length})</div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
          ${myGroups.map(g => buildGroupCard(g)).join('')}
        </div>
      </div>
    ` : ''}

    <div>
      <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--gray-mid);margin-bottom:12px">Descobrir grupos</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px">
        ${discover.map(g => buildGroupCard(g)).join('')}
      </div>
    </div>
  `;
}

function buildGroupCard(g) {
  return `
    <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);overflow:hidden;transition:var(--transition);cursor:pointer"
      onmouseover="this.style.borderColor='var(--red)';this.style.transform='translateY(-2px)'"
      onmouseout="this.style.borderColor='var(--dark-4)';this.style.transform=''"
      onclick="openGroupDetail(${g.id})">
      <div style="height:80px;overflow:hidden;position:relative">
        <img src="${g.banner}" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.6)">
        <div style="position:absolute;top:10px;left:12px;font-size:28px">${g.emoji}</div>
        <div style="position:absolute;top:8px;right:10px;background:rgba(0,0,0,0.5);backdrop-filter:blur(4px);border-radius:4px;font-size:10px;font-weight:600;color:#fff;padding:2px 8px;text-transform:uppercase;letter-spacing:.05em">${g.category}</div>
      </div>
      <div style="padding:14px">
        <div style="font-family:var(--font-display);font-size:15px;font-weight:700;margin-bottom:4px">${g.name}</div>
        <div style="font-size:12px;color:var(--gray-light);margin-bottom:10px;line-height:1.4">${g.description}</div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <span style="font-size:12px;color:var(--gray-mid)">👤 ${g.members.toLocaleString()} membros</span>
          <button id="group-btn-${g.id}" onclick="event.stopPropagation();toggleGroup(${g.id})"
            style="background:${g.joined ? 'var(--dark-4)' : 'var(--red)'};color:${g.joined ? 'var(--gray-light)' : '#fff'};border:none;border-radius:var(--radius-full);padding:6px 14px;font-size:12px;font-weight:600;cursor:pointer;transition:var(--transition)">
            ${g.joined ? '✓ Participando' : 'Participar'}
          </button>
        </div>
      </div>
    </div>
  `;
}

function openGroupDetail(groupId) {
  App.activeGroup = groupId;
  renderGroupDetail(groupId);
}

function renderGroupDetail(groupId) {
  const container = document.getElementById('page-grupos');
  const g = GROUPS.find(g => g.id === groupId);
  if (!container || !g) return;

  container.innerHTML = `
    <!-- Banner -->
    <div style="position:relative;height:160px;overflow:hidden;border-radius:var(--radius);margin-bottom:0">
      <img src="${g.banner}" style="width:100%;height:100%;object-fit:cover;filter:brightness(0.55)">
      <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.8))"></div>
      <button onclick="App.activeGroup=null;renderGroups()" style="position:absolute;top:14px;left:14px;background:rgba(0,0,0,0.5);backdrop-filter:blur(6px);border:none;color:#fff;padding:7px 14px;border-radius:var(--radius-full);font-size:13px;cursor:pointer;display:flex;align-items:center;gap:6px">← Voltar</button>
      <div style="position:absolute;bottom:16px;left:16px;right:16px;display:flex;align-items:flex-end;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <div>
          <div style="font-size:32px;margin-bottom:4px">${g.emoji}</div>
          <div style="font-family:var(--font-display);font-size:22px;font-weight:800;color:#fff">${g.name}</div>
          <div style="font-size:13px;color:rgba(255,255,255,0.8)">${g.members.toLocaleString()} membros · ${g.category}</div>
        </div>
        <button onclick="toggleGroup(${g.id})"
          style="background:${g.joined ? 'rgba(255,255,255,0.15)' : 'var(--red)'};backdrop-filter:blur(6px);color:#fff;border:${g.joined ? '1.5px solid rgba(255,255,255,0.3)' : 'none'};border-radius:var(--radius-full);padding:9px 20px;font-size:14px;font-weight:600;cursor:pointer;flex-shrink:0">
          ${g.joined ? '✓ Participando' : '+ Participar'}
        </button>
      </div>
    </div>

    <!-- Info bar -->
    <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);padding:16px;margin-top:14px;margin-bottom:14px;display:flex;align-items:center;gap:20px;flex-wrap:wrap">
      <div style="flex:1">
        <div style="font-size:14px;color:var(--gray-light)">${g.description}</div>
      </div>
      <!-- Mini member avatars -->
      <div style="display:flex;align-items:center;gap:-6px">
        ${FAKE_USERS.slice(0,5).map((u,i) => `
          <div style="width:30px;height:30px;border-radius:50%;overflow:hidden;border:2px solid var(--dark-2);margin-left:${i===0?'0':'-8px'};z-index:${5-i}">
            <img src="${u.avatar}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.background='var(--dark-4)'">
          </div>
        `).join('')}
        <div style="margin-left:6px;font-size:12px;color:var(--gray-mid)">e mais ${g.members - 5} membros</div>
      </div>
    </div>

    <!-- Post composer (only if joined) -->
    ${g.joined ? `
      <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);padding:14px;margin-bottom:14px">
        <div style="display:flex;gap:10px;align-items:center">
          <div style="width:36px;height:36px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid var(--red)">
            <img src="${typeof App.currentUser.avatar === 'string' && App.currentUser.avatar.startsWith('http') ? App.currentUser.avatar : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(App.currentUser.name) + '&background=b80f20&color=fff'}" style="width:100%;height:100%;object-fit:cover">
          </div>
          <input id="groupPostInput-${g.id}" placeholder="Compartilhe algo com o grupo ${g.name}..." onclick="openGroupPostModal(${g.id})"
            style="flex:1;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-full);padding:10px 16px;color:var(--gray-light);font-size:14px;outline:none;cursor:pointer;font-family:var(--font-body)" readonly>
          <button onclick="openGroupPostModal(${g.id})" style="background:var(--red);color:#fff;border:none;border-radius:var(--radius-full);padding:9px 18px;font-size:13px;font-weight:600;cursor:pointer;flex-shrink:0">Postar</button>
        </div>
      </div>
    ` : `
      <div style="background:rgba(232,25,44,0.06);border:1px solid rgba(232,25,44,0.2);border-radius:var(--radius);padding:14px;margin-bottom:14px;text-align:center;font-size:14px;color:var(--gray-light)">
        👋 Entre no grupo para publicar e interagir com os membros!
        <button onclick="toggleGroup(${g.id})" style="display:block;margin:10px auto 0;background:var(--red);color:#fff;border:none;border-radius:var(--radius-full);padding:8px 20px;font-size:13px;font-weight:600;cursor:pointer">Participar agora</button>
      </div>
    `}

    <!-- Posts feed -->
    <div id="groupPostsFeed-${g.id}" style="display:flex;flex-direction:column;gap:12px">
      ${g.posts.map(p => buildGroupPost(p, g.id)).join('')}
    </div>
  `;
}

function buildGroupPost(post, groupId) {
  const user = getUserById(post.userId);
  const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
    ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;
  return `
    <div class="post-card" id="gpost-${post.id}">
      <div class="post-header">
        <div class="post-avatar" style="overflow:hidden;padding:0">
          <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">
        </div>
        <div class="post-user-info">
          <div class="post-username">${user.name} ${user.verified ? '<span class="post-badge">✓ Destaque</span>' : ''}</div>
          <div class="post-meta">${user.course} · ${post.time}</div>
        </div>
      </div>
      <div class="post-body">
        <p class="post-text">${formatPostText(post.text)}</p>
      </div>
      <div class="post-footer">
        <button class="post-action ${post.liked ? 'liked' : ''}" onclick="likeGroupPost(${post.id}, ${groupId})">
          <span class="action-icon">${post.liked ? '❤️' : '🤍'}</span>
          <span>${post.likes}</span>
        </button>
        <button class="post-action" onclick="openGroupComments(${post.id}, ${groupId})">
          <span class="action-icon">💬</span>
          <span>${post.comments}</span>
        </button>
        <button class="post-action" onclick="showToast('Post compartilhado! 🔗','success')">
          <span class="action-icon">🔗</span>
        </button>
      </div>
    </div>
  `;
}

function likeGroupPost(postId, groupId) {
  const g = GROUPS.find(g => g.id === groupId);
  const post = g?.posts.find(p => p.id === postId);
  if (!post) return;
  post.liked = !post.liked;
  post.likes += post.liked ? 1 : -1;
  renderGroupDetail(groupId);
  if (post.liked) showToast('Post curtido! ❤️', 'success');
}

function openGroupComments(postId, groupId) {
  const g = GROUPS.find(g => g.id === groupId);
  const post = g?.posts.find(p => p.id === postId);
  const user = getUserById(post.userId);
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = `💬 Comentários`;
  body.innerHTML = `
    <div style="background:var(--dark-3);border-radius:var(--radius-sm);padding:12px;margin-bottom:14px;font-size:14px;color:var(--gray-light)">${post.text.slice(0, 120)}</div>
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
      ${generateFakeComments(postId)}
    </div>
    <div style="display:flex;gap:10px;align-items:center">
      <input id="groupCommentInput" placeholder="Escreva um comentário..." style="flex:1;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-full);padding:10px 16px;color:var(--white);font-size:14px;outline:none;font-family:var(--font-body)">
      <button onclick="post.comments++;closeModal('genericModal');renderGroupDetail(${groupId});showToast('Comentário publicado! 💬','success')" style="background:var(--red);border:none;border-radius:50%;width:40px;height:40px;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center">➤</button>
    </div>
  `;
  openModal('genericModal');
}

function openGroupPostModal(groupId) {
  const g = GROUPS.find(g => g.id === groupId);
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = `✍️ Postar em ${g.name}`;
  body.innerHTML = `
    <textarea id="groupPostText" placeholder="O que você quer compartilhar com o grupo?" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:14px;color:var(--white);font-size:15px;outline:none;resize:vertical;min-height:100px;font-family:var(--font-body)"></textarea>
    <button onclick="submitGroupPost(${groupId})" style="width:100%;margin-top:14px;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:13px;font-size:15px;font-weight:600;cursor:pointer">🚀 Publicar no Grupo</button>
  `;
  openModal('genericModal');
}

function submitGroupPost(groupId) {
  const text = document.getElementById('groupPostText')?.value.trim();
  if (!text) { showToast('Escreva algo antes de publicar!'); return; }
  const g = GROUPS.find(g => g.id === groupId);
  g.posts.unshift({
    id: Date.now(), userId: 1,
    text, time: 'agora', likes: 0, liked: false, comments: 0,
  });
  closeModal('genericModal');
  renderGroupDetail(groupId);
  showToast('Publicado no grupo! 🎉', 'success');
}

function openCreateGroupModal() {
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = '👥 Criar Novo Grupo';
  body.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px">
      <div>
        <label style="display:block;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--gray-mid);margin-bottom:6px">Nome do grupo</label>
        <input id="newGroupName" placeholder="Ex: TCC SENAI 2026" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)">
      </div>
      <div>
        <label style="display:block;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--gray-mid);margin-bottom:6px">Descrição</label>
        <textarea id="newGroupDesc" placeholder="Do que se trata esse grupo?" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:14px;outline:none;resize:vertical;min-height:70px;font-family:var(--font-body)"></textarea>
      </div>
      <div>
        <label style="display:block;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--gray-mid);margin-bottom:6px">Categoria</label>
        <select id="newGroupCategory" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:14px;outline:none;appearance:none;cursor:pointer">
          <option>Tecnologia</option><option>Design</option><option>Engenharia</option>
          <option>Gastronomia</option><option>Saúde</option><option>Geral</option>
        </select>
      </div>
      <button onclick="createGroup()" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:13px;font-size:15px;font-weight:600;cursor:pointer;margin-top:4px">Criar Grupo 🚀</button>
    </div>
  `;
  openModal('genericModal');
}

function createGroup() {
  const name = document.getElementById('newGroupName')?.value.trim();
  const desc = document.getElementById('newGroupDesc')?.value.trim();
  const category = document.getElementById('newGroupCategory')?.value;
  if (!name || !desc) { showToast('Preencha nome e descrição!'); return; }
  const emojis = ['🌟','📚','💡','🏆','🤝','🔥'];
  GROUPS.push({
    id: Date.now(), name, description: desc, category,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    members: 1, joined: true, posts: [],
  });
  closeModal('genericModal');
  renderGroups();
  showToast(`Grupo "${name}" criado com sucesso! 🎉`, 'success');
}

function toggleGroup(id) {
  const g = GROUPS.find(g => g.id === id);
  g.joined = !g.joined;
  g.members += g.joined ? 1 : -1;
  if (App.activeGroup === id) {
    renderGroupDetail(id);
  } else {
    renderGroups();
    navigateTo('grupos');
  }
  showToast(g.joined ? `Você entrou no grupo "${g.name}"! 🎉` : `Saiu do grupo "${g.name}"`, g.joined ? 'success' : '');
}

// =====================
// EVENTOS
// =====================
const EVENTS = [
  { id: 1, title: 'Hackathon SENAI 2026', date: '15 Jun 2026', time: '08:00', local: 'SENAI São Paulo', emoji: '💻', category: 'Tecnologia', going: 127, interested: false },
  { id: 2, title: 'Workshop de Design UX/UI', date: '22 Jun 2026', time: '14:00', local: 'SENAI Rio de Janeiro', emoji: '🎨', category: 'Design', going: 84, interested: false },
  { id: 3, title: 'Feira de Projetos SENAI', date: '30 Jun 2026', time: '09:00', local: 'SENAI Curitiba', emoji: '🏆', category: 'Geral', going: 312, interested: true },
  { id: 4, title: 'Palestra: Indústria 4.0 e o Futuro', date: '5 Jul 2026', time: '19:00', local: 'Online', emoji: '🤖', category: 'Tecnologia', going: 567, interested: false },
  { id: 5, title: 'Concurso Gastronômico SENAI', date: '12 Jul 2026', time: '10:00', local: 'SENAI Belo Horizonte', emoji: '🍽️', category: 'Gastronomia', going: 93, interested: false },
  { id: 6, title: 'Semana de Saúde SENAI', date: '19 Jul 2026', time: '08:00', local: 'SENAI Salvador', emoji: '💊', category: 'Saúde', going: 145, interested: true },
];

function renderEvents() {
  const container = document.getElementById('page-eventos');
  if (!container) return;
  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">📅 Eventos</h1>
      <p class="page-subtitle">Fique por dentro dos eventos SENAI</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${EVENTS.map(ev => `
        <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);padding:20px;display:flex;gap:16px;align-items:center;transition:var(--transition)" onmouseover="this.style.borderColor='var(--red)'" onmouseout="this.style.borderColor='var(--dark-4)'">
          <div style="width:64px;height:64px;background:rgba(232,25,44,0.1);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:32px;flex-shrink:0">${ev.emoji}</div>
          <div style="flex:1">
            <div style="font-family:var(--font-display);font-size:16px;font-weight:700">${ev.title}</div>
            <div style="font-size:13px;color:var(--gray-light);margin-top:4px;display:flex;flex-wrap:wrap;gap:12px">
              <span>📅 ${ev.date} às ${ev.time}</span>
              <span>📍 ${ev.local}</span>
              <span>👤 ${ev.going} confirmados</span>
            </div>
            <span style="display:inline-block;margin-top:6px;background:rgba(232,25,44,0.12);color:var(--red);font-size:11px;font-weight:600;padding:2px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.05em">${ev.category}</span>
          </div>
          <div style="display:flex;gap:8px;flex-shrink:0;flex-direction:column;align-items:flex-end">
            <button id="event-btn-${ev.id}" onclick="toggleEvent(${ev.id})" style="background:${ev.interested ? 'var(--dark-4)' : 'var(--red)'};color:${ev.interested ? 'var(--gray-light)' : '#fff'};border:none;border-radius:var(--radius-full);padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap">
              ${ev.interested ? '✓ Tenho interesse' : 'Tenho interesse'}
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function toggleEvent(id) {
  const ev = EVENTS.find(e => e.id === id);
  ev.interested = !ev.interested;
  ev.going += ev.interested ? 1 : -1;
  renderEvents();
  navigateTo('eventos');
  showToast(ev.interested ? `Interesse confirmado em "${ev.title}"! 🎉` : 'Interesse removido', ev.interested ? 'success' : '');
}

// =====================
// VAGAS
// =====================
const VAGAS = [
  { id: 1, title: 'Desenvolvedor Front-end Jr', company: 'TechStart LTDA', location: 'São Paulo, SP', type: 'CLT', salary: 'R$ 3.500 – 4.500', emoji: '💻', tags: ['React', 'CSS', 'JavaScript'], saved: false },
  { id: 2, title: 'Designer Gráfico Estágio', company: 'AgênciaViva', location: 'Remoto', type: 'Estágio', salary: 'R$ 1.500 + benefícios', emoji: '🎨', tags: ['Figma', 'Illustrator', 'Photoshop'], saved: false },
  { id: 3, title: 'Técnico em Mecatrônica', company: 'Indústria Alfa S.A.', location: 'Curitiba, PR', type: 'CLT', salary: 'R$ 4.200 – 5.000', emoji: '⚙️', tags: ['CNC', 'Arduino', 'PLC'], saved: true },
  { id: 4, title: 'Auxiliar de Cozinha', company: 'Restaurante Sabor da Terra', location: 'Belo Horizonte, MG', type: 'CLT', salary: 'R$ 1.800 + gorjeta', emoji: '🍽️', tags: ['Gastronomia', 'Confeitaria'], saved: false },
  { id: 5, title: 'Técnico de Redes', company: 'NetWork Pro', location: 'Brasília, DF', type: 'PJ', salary: 'R$ 5.000 – 6.500', emoji: '🔌', tags: ['Cisco', 'Redes', 'Linux'], saved: false },
  { id: 6, title: 'Técnico de Enfermagem', company: 'Hospital Regional São Lucas', location: 'Porto Alegre, RS', type: 'CLT', salary: 'R$ 3.200 + plantões', emoji: '💊', tags: ['Enfermagem', 'UTI', 'Saúde'], saved: false },
];

function renderVagas() {
  const container = document.getElementById('page-vagas');
  if (!container) return;
  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">💼 Vagas de Emprego</h1>
      <p class="page-subtitle">Oportunidades para alunos e egressos SENAI</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px">
      ${VAGAS.map(v => `
        <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);padding:20px;transition:var(--transition)" onmouseover="this.style.borderColor='var(--red)'" onmouseout="this.style.borderColor='var(--dark-4)'">
          <div style="display:flex;align-items:flex-start;gap:14px">
            <div style="width:52px;height:52px;background:rgba(232,25,44,0.1);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">${v.emoji}</div>
            <div style="flex:1">
              <div style="font-family:var(--font-display);font-size:16px;font-weight:700">${v.title}</div>
              <div style="font-size:14px;color:var(--gray-light);margin-top:2px">${v.company}</div>
              <div style="font-size:13px;color:var(--gray-mid);margin-top:6px;display:flex;flex-wrap:wrap;gap:12px">
                <span>📍 ${v.location}</span>
                <span>📋 ${v.type}</span>
                <span style="color:var(--accent);font-weight:600">💰 ${v.salary}</span>
              </div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">
                ${v.tags.map(t => `<span style="background:var(--dark-4);color:var(--gray-light);font-size:11px;padding:3px 9px;border-radius:4px">${t}</span>`).join('')}
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0">
              <button onclick="applyVaga(${v.id})" style="background:var(--red);color:#fff;border:none;border-radius:var(--radius-full);padding:8px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap">Candidatar-se</button>
              <button id="vaga-save-${v.id}" onclick="saveVaga(${v.id})" style="background:${v.saved ? 'rgba(232,25,44,0.15)' : 'var(--dark-3)'};color:${v.saved ? 'var(--red)' : 'var(--gray-light)'};border:1.5px solid ${v.saved ? 'var(--red)' : 'var(--dark-4)'};border-radius:var(--radius-full);padding:7px 16px;font-size:13px;cursor:pointer;white-space:nowrap">
                ${v.saved ? '🔖 Salva' : '📌 Salvar'}
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function applyVaga(id) {
  const v = VAGAS.find(v => v.id === id);
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = `Candidatura — ${v.title}`;
  body.innerHTML = `
    <div style="background:rgba(232,25,44,0.08);border-radius:var(--radius-sm);padding:14px;margin-bottom:16px">
      <div style="font-size:20px;margin-bottom:6px">${v.emoji}</div>
      <div style="font-weight:600">${v.title}</div>
      <div style="font-size:13px;color:var(--gray-light)">${v.company} · ${v.location}</div>
    </div>
    <div class="form-group" style="margin-bottom:14px">
      <label style="display:block;font-size:13px;color:var(--gray-light);margin-bottom:6px">Carta de apresentação</label>
      <textarea placeholder="Conte sobre você e por que se candidata a esta vaga..." style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:12px;color:var(--white);font-size:14px;outline:none;resize:vertical;min-height:100px;font-family:var(--font-body)"></textarea>
    </div>
    <button onclick="confirmApply(${v.id})" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:13px;font-size:15px;font-weight:600;cursor:pointer">Enviar candidatura 🚀</button>
  `;
  openModal('genericModal');
}

function confirmApply(id) {
  const v = VAGAS.find(v => v.id === id);
  closeModal('genericModal');
  showToast(`Candidatura enviada para "${v.title}"! Boa sorte! 🍀`, 'success');
}

function saveVaga(id) {
  const v = VAGAS.find(v => v.id === id);
  v.saved = !v.saved;
  renderVagas();
  navigateTo('vagas');
  showToast(v.saved ? 'Vaga salva! 🔖' : 'Vaga removida dos salvos.', v.saved ? 'success' : '');
}

// =====================
// PROJETOS
// =====================
const PROJECTS = [
  { id: 1, userId: 2, title: 'Sistema de Gestão de Estoque', desc: 'App web em React + Node.js para controle de estoque em tempo real', tags: ['React', 'Node', 'MongoDB'], emoji: '💻', likes: 34, comments: 8, liked: false },
  { id: 2, userId: 4, title: 'Identidade Visual — TCC Design', desc: 'Projeto completo de branding para empresa fictícia, do briefing ao manual de marca', tags: ['Figma', 'Illustrator', 'Branding'], emoji: '🎨', likes: 67, comments: 15, liked: false },
  { id: 3, userId: 3, title: 'Braço Robótico Arduino', desc: 'Braço mecânico com 4 graus de liberdade controlado por joystick e app móvel', tags: ['Arduino', 'Mecatrônica', 'C++'], emoji: '🤖', likes: 89, comments: 22, liked: false },
  { id: 4, userId: 6, title: 'Cardápio Digital Interativo', desc: 'Menu digital com QR Code para restaurantes, desenvolvido como TCC de Gastronomia', tags: ['Gastronomia', 'Digital', 'UX'], emoji: '🍽️', likes: 45, comments: 11, liked: false },
  { id: 5, userId: 9, title: 'Rede VLAN para Empresa', desc: 'Projeto de segmentação de rede com VLANs, firewall e servidor Zabbix', tags: ['Cisco', 'VLAN', 'Zabbix'], emoji: '🔌', likes: 28, comments: 6, liked: false },
];

function renderProjects() {
  const container = document.getElementById('page-projetos');
  if (!container) return;
  container.innerHTML = `
    <div class="page-header" style="display:flex;align-items:center;justify-content:space-between">
      <div>
        <h1 class="page-title">📂 Projetos</h1>
        <p class="page-subtitle">Trabalhos e TCCs dos alunos SENAI</p>
      </div>
      <button onclick="openNewProjectModal()" style="background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:10px 20px;font-size:14px;font-weight:600;cursor:pointer">+ Novo Projeto</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:16px">
      ${PROJECTS.map(p => {
        const user = getUserById(p.userId);
        const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
          ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;
        return `
          <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);overflow:hidden;transition:var(--transition)" onmouseover="this.style.borderColor='var(--red)'" onmouseout="this.style.borderColor='var(--dark-4)'">
            <div style="height:100px;background:linear-gradient(135deg,var(--dark-3),var(--dark-4));display:flex;align-items:center;justify-content:center;font-size:48px">${p.emoji}</div>
            <div style="padding:16px">
              <div style="font-family:var(--font-display);font-size:16px;font-weight:700;margin-bottom:6px">${p.title}</div>
              <div style="font-size:13px;color:var(--gray-light);line-height:1.5;margin-bottom:10px">${p.desc}</div>
              <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:12px">
                ${p.tags.map(t => `<span style="background:var(--dark-4);color:var(--gray-light);font-size:11px;padding:3px 9px;border-radius:4px">${t}</span>`).join('')}
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--dark-4);padding-top:10px">
                <div style="display:flex;align-items:center;gap:8px;font-size:13px;color:var(--gray-mid)">
                  <div style="width:24px;height:24px;border-radius:50%;overflow:hidden;flex-shrink:0">
                    <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover">
                  </div>
                  <span>${user.name.split(' ')[0]}</span>
                </div>
                <div style="display:flex;gap:10px;align-items:center">
                  <button onclick="likeProject(${p.id})" style="background:none;border:none;color:${p.liked ? 'var(--red)' : 'var(--gray-mid)'};cursor:pointer;font-size:13px;display:flex;align-items:center;gap:4px">
                    ${p.liked ? '❤️' : '🤍'} ${p.likes}
                  </button>
                  <button onclick="openProjectComments(${p.id})" style="background:none;border:none;color:var(--gray-mid);cursor:pointer;font-size:13px;display:flex;align-items:center;gap:4px">
                    💬 ${p.comments}
                  </button>
                  <button onclick="toggleSaveProject(${p.id})" title="${p.saved ? 'Remover dos salvos' : 'Salvar projeto'}"
                    style="background:none;border:none;color:${p.saved ? 'var(--red)' : 'var(--gray-mid)'};cursor:pointer;font-size:16px;padding:0 2px">
                    ${p.saved ? '🔖' : '📌'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function likeProject(id) {
  const p = PROJECTS.find(p => p.id === id);
  p.liked = !p.liked;
  p.likes += p.liked ? 1 : -1;
  renderProjects();
  if (p.liked) showToast('Projeto curtido! ❤️', 'success');
}

function toggleSaveProject(id) {
  const p = PROJECTS.find(pr => pr.id === id);
  if (!p) return;
  p.saved = !p.saved;
  renderProjects();
  showToast(p.saved ? 'Projeto salvo! 🔖' : 'Projeto removido dos salvos.', p.saved ? 'success' : '');

  // Sincronizar com MongoDB em background
  const u = App.currentUser;
  if (u?.email) {
    apiCall('POST', '/projetos-salvos/toggle', {
      usuarioEmail: u.email,
      projetoId:    String(p.id),
      titulo:       p.title,
      descricao:    p.desc,
      tags:         p.tags,
      emoji:        p.emoji,
    });
  }
}

function openNewProjectModal() {
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = '📂 Novo Projeto';
  body.innerHTML = `
    <div class="form-group" style="margin-bottom:12px">
      <label style="display:block;font-size:13px;color:var(--gray-light);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">Título do projeto</label>
      <input id="projTitle" placeholder="Ex: Sistema de Gestão SENAI" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)">
    </div>
    <div class="form-group" style="margin-bottom:12px">
      <label style="display:block;font-size:13px;color:var(--gray-light);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">Descrição</label>
      <textarea id="projDesc" placeholder="Descreva o seu projeto..." style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:14px;outline:none;resize:vertical;min-height:80px;font-family:var(--font-body)"></textarea>
    </div>
    <div class="form-group" style="margin-bottom:16px">
      <label style="display:block;font-size:13px;color:var(--gray-light);margin-bottom:6px;text-transform:uppercase;letter-spacing:.05em">Tags (separadas por vírgula)</label>
      <input id="projTags" placeholder="React, Node.js, MongoDB" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:14px;outline:none;font-family:var(--font-body)">
    </div>
    <button onclick="submitProject()" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:13px;font-size:15px;font-weight:600;cursor:pointer">Publicar Projeto 📂</button>
  `;
  openModal('genericModal');
}

function submitProject() {
  const title = document.getElementById('projTitle')?.value.trim();
  const desc = document.getElementById('projDesc')?.value.trim();
  const tags = document.getElementById('projTags')?.value.split(',').map(t => t.trim()).filter(Boolean);
  if (!title || !desc) { showToast('Preencha título e descrição!'); return; }
  const newProj = {
    id: Date.now(), userId: 1,
    title, desc, tags: tags.length ? tags : ['Projeto SENAI'],
    emoji: '📂', likes: 0, comments: 0, liked: false, saved: false,
  };
  PROJECTS.unshift(newProj);
  closeModal('genericModal');
  renderProjects();
  navigateTo('projetos');
  showToast('Projeto publicado com sucesso! 🎉', 'success');
}

// =====================
// CONFIGURAÇÕES
// =====================
function renderSettings() {
  const container = document.getElementById('page-configuracoes');
  if (!container) return;
  const u = App.currentUser;
  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">⚙️ Configurações</h1>
      <p class="page-subtitle">Gerencie sua conta e preferências</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px;max-width:600px">
      <!-- Conta -->
      <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);overflow:hidden">
        <div style="padding:16px 20px;border-bottom:1px solid var(--dark-4);font-family:var(--font-display);font-size:15px;font-weight:700">👤 Conta</div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:14px">
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:14px;font-weight:500">Nome</div>
              <div style="font-size:13px;color:var(--gray-mid)">${u.name}</div>
            </div>
            <button onclick="openEditProfile()" style="background:none;border:1.5px solid var(--dark-4);color:var(--white);padding:6px 14px;border-radius:var(--radius-full);font-size:13px;cursor:pointer">Editar</button>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:14px;font-weight:500">E-mail</div>
              <div style="font-size:13px;color:var(--gray-mid)">${u.email || 'Não informado'}</div>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:14px;font-weight:500">Curso</div>
              <div style="font-size:13px;color:var(--gray-mid)">${u.course}</div>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:14px;font-weight:500">Alterar senha</div>
              <div style="font-size:13px;color:var(--gray-mid)">*************</div>
            </div>
            <button onclick="openChangePassword()" style="background:none;border:1.5px solid var(--dark-4);color:var(--white);padding:6px 14px;border-radius:var(--radius-full);font-size:13px;cursor:pointer">Alterar</button>
          </div>
        </div>
      </div>

      <!-- Notificações -->
      <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);overflow:hidden">
        <div style="padding:16px 20px;border-bottom:1px solid var(--dark-4);font-family:var(--font-display);font-size:15px;font-weight:700">🔔 Notificações</div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:14px">
          ${[
            ['Curtidas nas publicações', true],
            ['Novos comentários', true],
            ['Novos seguidores', true],
            ['Mensagens diretas', false],
            ['Eventos e novidades SENAI', true],
          ].map(([label, on], i) => `
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:14px">${label}</span>
              <div onclick="this.dataset.on=this.dataset.on==='1'?'0':'1';this.style.background=this.dataset.on==='1'?'var(--red)':'var(--dark-4)';this.querySelector('div').style.left=this.dataset.on==='1'?'22px':'3px'" data-on="${on ? 1 : 0}" style="width:44px;height:24px;border-radius:99px;background:${on ? 'var(--red)' : 'var(--dark-4)'};cursor:pointer;position:relative;transition:background .2s">
                <div style="width:18px;height:18px;background:#fff;border-radius:50%;position:absolute;top:3px;left:${on ? '22px' : '3px'};transition:left .2s"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Privacidade -->
      <div style="background:var(--dark-2);border:1px solid var(--dark-4);border-radius:var(--radius);overflow:hidden">
        <div style="padding:16px 20px;border-bottom:1px solid var(--dark-4);font-family:var(--font-display);font-size:15px;font-weight:700">🔒 Privacidade</div>
        <div style="padding:16px 20px;display:flex;flex-direction:column;gap:14px">
          ${[
            ['Perfil público', true],
            ['Mostrar curso no perfil', true],
            ['Permitir marcações em fotos', false],
          ].map(([label, on]) => `
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:14px">${label}</span>
              <div onclick="this.dataset.on=this.dataset.on==='1'?'0':'1';this.style.background=this.dataset.on==='1'?'var(--red)':'var(--dark-4)';this.querySelector('div').style.left=this.dataset.on==='1'?'22px':'3px'" data-on="${on ? 1 : 0}" style="width:44px;height:24px;border-radius:99px;background:${on ? 'var(--red)' : 'var(--dark-4)'};cursor:pointer;position:relative;transition:background .2s">
                <div style="width:18px;height:18px;background:#fff;border-radius:50%;position:absolute;top:3px;left:${on ? '22px' : '3px'};transition:left .2s"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Zona de perigo -->
      <div style="background:rgba(232,25,44,0.05);border:1px solid rgba(232,25,44,0.2);border-radius:var(--radius);padding:20px">
        <div style="font-family:var(--font-display);font-size:15px;font-weight:700;color:var(--red);margin-bottom:12px">⚠️ Zona de Perigo</div>
        <button onclick="confirmDeleteAccount()" style="background:none;border:1.5px solid var(--red);color:var(--red);padding:9px 20px;border-radius:var(--radius-sm);font-size:14px;font-weight:600;cursor:pointer;transition:var(--transition)" onmouseover="this.style.background='var(--red)';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='var(--red)'">Excluir conta</button>
      </div>
    </div>
  `;
}

function openChangePassword() {
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = '🔑 Alterar Senha';
  body.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:14px">
      <div>
        <label style="display:block;font-size:13px;color:var(--gray-light);margin-bottom:6px">Senha atual</label>
        <input type="password" id="currentPass" placeholder="Senha atual" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)">
      </div>
      <div>
        <label style="display:block;font-size:13px;color:var(--gray-light);margin-bottom:6px">Nova senha</label>
        <input type="password" id="newPass" placeholder="Nova senha (mín. 6 caracteres)" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)">
      </div>
      <div>
        <label style="display:block;font-size:13px;color:var(--gray-light);margin-bottom:6px">Confirmar nova senha</label>
        <input type="password" id="confirmNewPass" placeholder="Repita a nova senha" style="width:100%;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-sm);padding:11px 14px;color:var(--white);font-size:15px;outline:none;font-family:var(--font-body)">
      </div>
      <button onclick="changePassword()" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:13px;font-size:15px;font-weight:600;cursor:pointer">Alterar senha</button>
    </div>
  `;
  openModal('genericModal');
}

function changePassword() {
  const curr = document.getElementById('currentPass')?.value;
  const nw = document.getElementById('newPass')?.value;
  const conf = document.getElementById('confirmNewPass')?.value;
  const users = JSON.parse(localStorage.getItem('sc_users') || '[]');
  const idx = users.findIndex(u => u.email === App.currentUser.email);
  if (idx === -1 || users[idx].password !== curr) { showToast('Senha atual incorreta!'); return; }
  if (!nw || nw.length < 6) { showToast('Nova senha deve ter pelo menos 6 caracteres!'); return; }
  if (nw !== conf) { showToast('As senhas não conferem!'); return; }
  users[idx].password = nw;
  localStorage.setItem('sc_users', JSON.stringify(users));
  App.currentUser.password = nw;
  localStorage.setItem('sc_session', JSON.stringify(App.currentUser));
  closeModal('genericModal');
  showToast('Senha alterada com sucesso! 🔑', 'success');
}

function confirmDeleteAccount() {
  const modal = $('#genericModal');
  const title = $('#genericModalTitle');
  const body = $('#genericModalBody');
  title.textContent = '⚠️ Excluir conta';
  body.innerHTML = `
    <p style="color:var(--gray-light);font-size:15px;margin-bottom:20px;line-height:1.6">Tem certeza? Esta ação é <strong style="color:var(--red)">irreversível</strong>. Todos os seus dados, posts e mensagens serão deletados permanentemente.</p>
    <div style="display:flex;gap:10px">
      <button onclick="closeModal('genericModal')" style="flex:1;background:var(--dark-3);border:1.5px solid var(--dark-4);color:var(--white);padding:12px;border-radius:var(--radius-sm);font-size:14px;font-weight:600;cursor:pointer">Cancelar</button>
      <button onclick="deleteAccount()" style="flex:1;background:var(--red);color:#fff;border:none;padding:12px;border-radius:var(--radius-sm);font-size:14px;font-weight:600;cursor:pointer">Sim, excluir</button>
    </div>
  `;
  openModal('genericModal');
}

function deleteAccount() {
  const users = JSON.parse(localStorage.getItem('sc_users') || '[]');
  const filtered = users.filter(u => u.email !== App.currentUser.email);
  localStorage.setItem('sc_users', JSON.stringify(filtered));
  localStorage.removeItem('sc_session');
  showToast('Conta excluída. Até mais! 👋');
  setTimeout(() => location.reload(), 1500);
}

function openNewPost() {
  openModal('newPostModal');
}

function submitNewPost() {
  const text = $('#newPostText').value.trim();
  if (!text && !pendingMediaBase64) { showToast('Escreva algo antes de publicar!'); return; }
  const location = App.pendingLocation ? `\n📍 ${App.pendingLocation}` : '';
  const content = (text || '') + location;

  const newPost = {
    id: Date.now(), userId: 1,
    content,
    image: pendingMediaType === 'photo' ? pendingMediaBase64 : null,
    video: pendingMediaType === 'video' ? pendingMediaBase64 : null,
    emoji: pendingMediaBase64 ? (pendingMediaType === 'video' ? '🎬' : '🖼️') : '📝',
    likes: 0, comments: 0, shares: 0,
    liked: false, time: 'agora', saved: false,
    mongoId: null, // preenchido após salvar
  };

  App.posts.unshift(newPost);
  renderPosts();
  closeModal('newPostModal');
  $('#newPostText').value = '';
  pendingMediaBase64 = null;
  pendingMediaType = null;
  App.pendingLocation = null;
  const preview = document.getElementById('postMediaPreview');
  if (preview) preview.innerHTML = '';
  const locBtn = document.getElementById('postLocationBtn');
  if (locBtn) { locBtn.textContent = '📍 Local'; locBtn.style.color = ''; }
  showToast('Publicação criada com sucesso! 🎉', 'success');

  // Salvar no MongoDB em background
  const u = App.currentUser;
  apiCall('POST', '/posts', {
    usuarioId:   u.email || u.handle,
    usuarioNome: u.name,
    conteudo:    content,
    imagem:      newPost.image,
    video:       newPost.video,
  }).then(data => {
    if (data?.post?._id) {
      newPost.mongoId = data.post._id;
    }
  });
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
  const grid = $('#profileGrid');
  if (!grid) return;

  if (tab === 'posts') {
    renderProfileGrid();

  } else if (tab === 'curtidos') {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon" style="font-size:30px;margin-bottom:8px">⏳</div><p>Carregando curtidas...</p></div>`;
    const u = App.currentUser;

    // Posts curtidos localmente (sessão atual)
    const likedLocal = App.posts.filter(p => p.liked);

    // Posts curtidos no banco (posts com mongoId)
    apiCall('GET', `/curtidas/${encodeURIComponent(u.email || '')}`)
      .then(curtidas => {
        const mongoIds = (curtidas || []).map(c => c.postId);
        // Merge: posts em memória que foram curtidos
        const allLiked = App.posts.filter(p => p.liked || (p.mongoId && mongoIds.includes(p.mongoId)));

        if (!allLiked.length) {
          grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">❤️</div><h3>Nenhum post curtido ainda</h3><p>Curta publicações para elas aparecerem aqui!</p></div>`;
          return;
        }
        grid.innerHTML = allLiked.map(p => {
          const preview = p.image
            ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)">`
            : `<span style="font-size:28px">${p.emoji || '❤️'}</span>`;
          return `
            <div class="grid-post" onclick="openComments(${p.id})" style="position:relative">
              ${preview}
              <div class="grid-post-overlay">
                <span>❤️ ${p.likes}</span>
                <span>💬 ${p.comments}</span>
              </div>
            </div>
          `;
        }).join('');
      });

  } else if (tab === 'salvos') {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon" style="font-size:30px;margin-bottom:8px">⏳</div><p>Carregando salvos...</p></div>`;
    const u = App.currentUser;

    // Posts salvos localmente
    const savedLocal = App.posts.filter(p => p.saved);

    apiCall('GET', `/projetos-salvos/${encodeURIComponent(u.email || '')}`)
      .then(projSalvos => {
        const items = [...savedLocal];

        if (!items.length && (!projSalvos || !projSalvos.length)) {
          grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔖</div><h3>Nenhum item salvo ainda</h3><p>Salve posts e projetos para vê-los aqui!</p></div>`;
          return;
        }

        let html = '';

        // Posts salvos
        if (items.length) {
          html += items.map(p => {
            const preview = p.image
              ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)">`
              : `<span style="font-size:28px">${p.emoji || '🔖'}</span>`;
            return `
              <div class="grid-post" onclick="openComments(${p.id})">
                ${preview}
                <div class="grid-post-overlay"><span>❤️ ${p.likes}</span><span>💬 ${p.comments}</span></div>
              </div>
            `;
          }).join('');
        }

        // Projetos salvos do banco
        if (projSalvos?.length) {
          html += projSalvos.map(ps => `
            <div class="grid-post" style="flex-direction:column;align-items:flex-start;padding:12px;gap:6px;cursor:default">
              <span style="font-size:26px">${ps.emoji || '📂'}</span>
              <div style="font-size:12px;font-weight:700;color:var(--white);line-height:1.3">${ps.titulo}</div>
              <div style="font-size:11px;color:var(--gray-mid)">${(ps.tags || []).slice(0,2).join(' · ')}</div>
              <div class="grid-post-overlay" style="font-size:11px"><span>📂 Projeto salvo</span></div>
            </div>
          `).join('');
        }

        grid.innerHTML = html;
      });

  } else {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-state-icon">🔒</div><h3>Em breve!</h3></div>`;
  }
}

// =====================
// NOTIFICATIONS
// =====================
// =====================
// REAL-TIME NOTIFICATIONS
// =====================
const REALTIME_NOTIF_POOL = [
  { type: 'like',    texts: ['curtiu sua publicação', 'curtiu sua foto', 'curtiu seu comentário', 'curtiu seu post recente'] },
  { type: 'comment', texts: ['comentou: "Que projeto incrível! 🔥"', 'comentou: "Parabéns pelo trabalho!"', 'comentou: "Adorei demais! 😍"', 'comentou: "Muito top isso!"'] },
  { type: 'follow',  texts: ['começou a te seguir', 'passou a te seguir'] },
  { type: 'mention', texts: ['mencionou você em uma publicação', 'te marcou em um comentário', 'te marcou em uma foto'] },
  { type: 'share',   texts: ['compartilhou sua publicação', 'compartilhou seu projeto'] },
];

let realtimeNotifInterval = null;

function startRealtimeNotifications() {
  if (realtimeNotifInterval) return;
  // Fire first one after 8s, then every 15–30s randomly
  const schedule = () => {
    const delay = 8000 + Math.random() * 22000;
    realtimeNotifInterval = setTimeout(() => {
      spawnRealtimeNotif();
      schedule();
    }, delay);
  };
  schedule();
}

function stopRealtimeNotifications() {
  clearTimeout(realtimeNotifInterval);
  realtimeNotifInterval = null;
}

function spawnRealtimeNotif() {
  // Pick random user and random type
  const user = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
  const pool = REALTIME_NOTIF_POOL[Math.floor(Math.random() * REALTIME_NOTIF_POOL.length)];
  const text = pool.texts[Math.floor(Math.random() * pool.texts.length)];

  const newNotif = {
    id: Date.now(),
    userId: user.id,
    type: pool.type,
    text,
    time: 'agora',
    unread: true,
    fresh: true,
  };

  App.notifications.unshift(newNotif);

  // Age older "agora" entries
  App.notifications.forEach((n, i) => {
    if (i > 0 && n.time === 'agora') n.time = '1 min';
  });

  updateNotifBadge();

  // Show toast popup with avatar
  showRealtimeNotifToast(user, text, pool.type);

  // Pulse the bell icon
  pulseNotifBell();

  // If already on notifications page, re-render live
  if (App.currentPage === 'notificacoes') {
    renderNotifications();
  }

  // Remove fresh flag after animation
  setTimeout(() => {
    newNotif.fresh = false;
    if (App.currentPage === 'notificacoes') renderNotifications();
  }, 2000);
}

function showRealtimeNotifToast(user, text, type) {
  const icon = { like: '❤️', comment: '💬', follow: '👤', mention: '@', share: '🔗' }[type] || '🔔';
  const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
    ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;

  const container = $('#toastContainer');
  const toast = document.createElement('div');
  toast.style.cssText = `
    display:flex;align-items:center;gap:12px;
    background:var(--dark-2);border:1px solid var(--dark-4);
    border-left:3px solid var(--red);
    border-radius:var(--radius);padding:12px 16px;
    box-shadow:0 8px 32px rgba(0,0,0,0.5);
    cursor:pointer;min-width:280px;max-width:340px;
    animation:slideIn .3s ease;
    transition:opacity .3s,transform .3s;
  `;
  toast.innerHTML = `
    <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;position:relative">
      <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover">
      <div style="position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:var(--dark-2);display:flex;align-items:center;justify-content:center;font-size:10px">${icon}</div>
    </div>
    <div style="flex:1;overflow:hidden">
      <div style="font-size:13px;font-weight:700;color:var(--white)">${user.name}</div>
      <div style="font-size:12px;color:var(--gray-light);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${text}</div>
    </div>
    <div style="font-size:11px;color:var(--gray-mid);flex-shrink:0">agora</div>
  `;
  toast.onclick = () => { navigateTo('notificacoes'); toast.remove(); };
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function pulseNotifBell() {
  const btn = $('#headerNotifBtn');
  if (!btn) return;
  btn.style.animation = 'none';
  btn.offsetHeight; // reflow
  btn.style.animation = 'bellPulse .6s ease';
  setTimeout(() => btn.style.animation = '', 600);
}

function renderNotifications() {
  const container = $('#notifContainer');
  if (!container) return;

  // Group by date
  const fresh = App.notifications.filter(n => n.fresh);
  const unread = App.notifications.filter(n => n.unread && !n.fresh);
  const read = App.notifications.filter(n => !n.unread);

  const renderGroup = (items, label) => {
    if (!items.length) return '';
    return `
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--gray-mid);padding:14px 0 8px">${label}</div>
      ${items.map(n => {
        const user = getUserById(n.userId);
        const icon = { like: '❤️', comment: '💬', follow: '👤', mention: '@', share: '🔗' }[n.type] || '🔔';
        const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
          ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;
        return `
          <div class="notif-item ${n.unread ? 'unread' : ''} ${n.fresh ? 'notif-fresh' : ''}" onclick="markNotifRead(${n.id})" style="${n.fresh ? 'animation:notifSlideIn .4s ease;' : ''}">
            <div class="notif-avatar" style="overflow:hidden;padding:0">
              <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"
                onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff'">
            </div>
            <div class="notif-icon-badge">${icon}</div>
            <div class="notif-content">
              <div class="notif-text"><strong>${user.name}</strong> ${n.text}</div>
              <div class="notif-time" style="${n.fresh ? 'color:var(--red);font-weight:600' : ''}">${n.time}</div>
            </div>
            ${n.unread ? '<div style="width:8px;height:8px;background:var(--red);border-radius:50%;flex-shrink:0;margin-left:auto"></div>' : ''}
          </div>
        `;
      }).join('')}
    `;
  };

  container.innerHTML =
    renderGroup(fresh, '🔴 Novo agora') +
    renderGroup(unread, '● Não lidas') +
    renderGroup(read, 'Anteriores');
}

function markNotifRead(id) {
  const n = App.notifications.find(n => n.id === id);
  if (n) { n.unread = false; n.fresh = false; }
  renderNotifications();
  updateNotifBadge();
}

function markAllRead() {
  App.notifications.forEach(n => { n.unread = false; n.fresh = false; });
  renderNotifications();
  updateNotifBadge();
  showToast('Todas as notificações marcadas como lidas! ✅', 'success');
}

function updateNotifBadge() {
  const count = App.notifications.filter(n => n.unread).length;
  const badge = $('#notifBadge');
  if (badge) {
    badge.textContent = count > 9 ? '9+' : count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    if (count > 0) badge.style.animation = 'badgePop .3s ease';
    setTimeout(() => { if (badge) badge.style.animation = ''; }, 300);
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
    const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
      ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;
    return `
      <div class="message-preview ${App.activeChat === conv.id ? 'active' : ''}" onclick="openChat(${conv.id})">
        <div class="msg-avatar" style="overflow:hidden;padding:0;position:relative">
          <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff'">
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
  const chatAvatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
    ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;
  chatHeader.innerHTML = `
    <div class="chat-avatar" style="overflow:hidden;padding:0">
      <img src="${chatAvatarSrc}" style="width:100%;height:100%;object-fit:cover;border-radius:50%" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff'">
    </div>
    <div>
      <div class="chat-user-name">${user.name}</div>
      <div class="chat-status">● Online</div>
    </div>
    <div class="chat-header-actions">
      <button class="chat-action-btn" onclick="openCallModal('video')">📹</button>
      <button class="chat-action-btn" onclick="openCallModal('audio')">📞</button>
      <button class="chat-action-btn" onclick="openContactInfo()">ℹ️</button>
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
    const senderAvatar = typeof sender.avatar === 'string' && sender.avatar.startsWith('http')
      ? sender.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(sender.name)}&background=b80f20&color=fff`;
    const myAvatar = typeof u.avatar === 'string' && u.avatar.startsWith('http')
      ? u.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=444&color=fff`;
    return `
      <div class="chat-msg ${isMe ? 'sent' : ''}">
        ${!isMe ? `<div class="chat-msg-avatar" style="overflow:hidden;padding:0"><img src="${senderAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>` : ''}
        <div>
          <div class="chat-msg-bubble">${msg.text}</div>
          <div class="chat-msg-time">${msg.time}</div>
        </div>
        ${isMe ? `<div class="chat-msg-avatar" style="overflow:hidden;padding:0"><img src="${myAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>` : ''}
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
      <div class="suggestion-avatar">
        <img src="${u.avatar}" alt="Avatar de ${u.name}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;" onerror="this.src='https://ui-avatars.com/api/?name=${u.name}'">
      </div>
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
    const matchedUsers = FAKE_USERS.filter(u =>
      u.name.toLowerCase().includes(q) || u.course.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q)
    );
    const matchedPosts = App.posts.filter(p =>
      p.content.toLowerCase().includes(q)
    );
    const modal = $('#genericModal');
    const title = $('#genericModalTitle');
    const body = $('#genericModalBody');
    title.textContent = `🔍 Resultados para "${q}"`;
    let html = '';
    if (matchedUsers.length) {
      html += `<div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--gray-mid);margin-bottom:10px">Pessoas</div>`;
      html += matchedUsers.map(u => `
        <div style="display:flex;align-items:center;gap:12px;padding:10px;background:var(--dark-3);border-radius:var(--radius-sm);margin-bottom:8px;cursor:pointer" onclick="closeModal('genericModal');navigateTo('perfil')">
          <div style="width:40px;height:40px;border-radius:50%;background:var(--dark-4);display:flex;align-items:center;justify-content:center;font-size:20px">${u.avatar}</div>
          <div><div style="font-size:14px;font-weight:600">${u.name}</div><div style="font-size:12px;color:var(--gray-mid)">${u.course}</div></div>
          <button onclick="event.stopPropagation();toggleFollow(${u.id})" class="btn-follow" id="follow-s-${u.id}">Seguir</button>
        </div>
      `).join('');
    }
    if (matchedPosts.length) {
      html += `<div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--gray-mid);margin:14px 0 10px">Publicações</div>`;
      html += matchedPosts.map(p => {
        const u = getUserById(p.userId);
        return `<div style="padding:12px;background:var(--dark-3);border-radius:var(--radius-sm);margin-bottom:8px;font-size:14px;cursor:pointer" onclick="closeModal('genericModal')"><span style="font-weight:600">${u?.name}: </span>${p.content.slice(0, 120)}...</div>`;
      }).join('');
    }
    if (!matchedUsers.length && !matchedPosts.length) {
      html = `<div class="empty-state"><div class="empty-state-icon">😕</div><h3>Nenhum resultado</h3><p>Tente buscar por outro termo</p></div>`;
    }
    body.innerHTML = html;
    openModal('genericModal');
  }
}



// =====================
// CHAMADAS (modal simulado)
// =====================
function openCallModal(type) {
  const conv = App.messages.find(m => m.id === App.activeChat);
  if (!conv) return;
  const user = getUserById(conv.userId);
  const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
    ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;
  const isVideo = type === 'video';
  const overlay = document.createElement('div');
  overlay.id = 'callOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:3000;background:var(--dark);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px';
  overlay.innerHTML = `
    <div style="width:100px;height:100px;border-radius:50%;overflow:hidden;border:3px solid var(--red)">
      <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover">
    </div>
    <div style="font-family:var(--font-display);font-size:24px;font-weight:800">${user.name}</div>
    <div style="color:var(--gray-light);font-size:15px">Chamando ${isVideo ? 'por vídeo' : 'por voz'}...</div>
    <div style="display:flex;gap:16px;margin-top:24px">
      <button onclick="document.getElementById('callOverlay').remove();showToast('Chamada encerrada')" style="width:64px;height:64px;border-radius:50%;background:#ef4444;border:none;color:#fff;font-size:28px;cursor:pointer">📵</button>
      <button onclick="showToast('${isVideo ? 'Câmera' : 'Microfone'} desligado')" style="width:64px;height:64px;border-radius:50%;background:var(--dark-3);border:none;color:#fff;font-size:28px;cursor:pointer">${isVideo ? '📷' : '🎤'}</button>
    </div>
    <p style="font-size:13px;color:var(--gray-mid);margin-top:16px">Chamadas ao vivo requerem servidor WebRTC</p>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => {
    const d = document.getElementById('callOverlay');
    if (d) { d.querySelector('div:nth-child(3)').textContent = `Em chamada ${isVideo ? 'por vídeo' : 'por voz'} com ${user.name}`; }
  }, 2000);
}

function openContactInfo() {
  const conv = App.messages.find(m => m.id === App.activeChat);
  if (!conv) return;
  const user = getUserById(conv.userId);
  const avatarSrc = typeof user.avatar === 'string' && user.avatar.startsWith('http')
    ? user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=b80f20&color=fff`;
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalTitle').textContent = `👤 ${user.name}`;
  document.getElementById('genericModalBody').innerHTML = `
    <div style="text-align:center;padding:10px 0 20px">
      <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;margin:0 auto 10px;border:3px solid var(--red)">
        <img src="${avatarSrc}" style="width:100%;height:100%;object-fit:cover">
      </div>
      <div style="font-family:var(--font-display);font-size:20px;font-weight:800">${user.name}</div>
      <div style="color:var(--gray-mid);font-size:14px">${user.handle}</div>
      <div style="margin-top:6px"><span style="background:rgba(232,25,44,0.12);color:var(--red);font-size:12px;padding:3px 10px;border-radius:4px">${user.course}</span></div>
    </div>
    <div style="display:flex;justify-content:center;gap:24px;margin-bottom:20px">
      <div style="text-align:center"><div style="font-family:var(--font-display);font-size:18px;font-weight:800">${formatNumber(user.followers)}</div><div style="font-size:12px;color:var(--gray-mid)">Seguidores</div></div>
      <div style="text-align:center"><div style="font-family:var(--font-display);font-size:18px;font-weight:800">${formatNumber(user.following)}</div><div style="font-size:12px;color:var(--gray-mid)">Seguindo</div></div>
    </div>
    <button onclick="toggleFollow(${user.id});closeModal('genericModal')" style="width:100%;background:var(--red);color:#fff;border:none;border-radius:var(--radius-sm);padding:12px;font-size:15px;font-weight:600;cursor:pointer">Seguir ${user.name}</button>
  `;
  openModal('genericModal');
}

function openProjectComments(projectId) {
  const p = PROJECTS.find(pr => pr.id === projectId);
  if (!p) return;
  const modal = document.getElementById('genericModal');
  document.getElementById('genericModalTitle').textContent = `💬 Comentários — ${p.title}`;
  document.getElementById('genericModalBody').innerHTML = `
    <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:16px">
      ${[
        { u: 2, t: 'Projeto incrível! Como você implementou a parte de autenticação?', time: '1h' },
        { u: 5, t: 'Muito bem feito! Seria possível fazer uma demo?', time: '3h' },
        { u: 8, t: 'Parabéns! Esse projeto vai longe 🚀', time: '5h' },
      ].map(c => {
        const user = getUserById(c.u);
        return `<div style="display:flex;gap:10px"><div style="width:34px;height:34px;border-radius:50%;background:var(--dark-4);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${user.avatar}</div><div><span style="font-size:13px;font-weight:600">${user.name}</span> <span style="font-size:12px;color:var(--gray-mid)">${c.time}</span><p style="font-size:14px;margin-top:3px">${c.t}</p></div></div>`;
      }).join('')}
    </div>
    <div style="display:flex;gap:10px;align-items:center">
      <input id="projCommentInput" placeholder="Comentar..." style="flex:1;background:var(--dark-3);border:1.5px solid var(--dark-4);border-radius:var(--radius-full);padding:10px 16px;color:var(--white);font-size:14px;outline:none;font-family:var(--font-body)">
      <button onclick="showToast('Comentário enviado! 💬','success');closeModal('genericModal')" style="background:var(--red);border:none;border-radius:50%;width:40px;height:40px;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center">➤</button>
    </div>
  `;
  openModal('genericModal');
}
// =====================
// STORY CREATOR SHORTCUT
// =====================
function openStoryCreator() {
  showToast('Criador de story — clique em outro perfil para visualizar! 📸', 'info');
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
// Cadastro MongoDB integrado acima no initAuth()