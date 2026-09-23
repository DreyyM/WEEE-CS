const titles=[
  {title:"Neon City",type:"Movie",year:"2026",rating:"9.1",image:"https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80"},
  {title:"After Dark",type:"Series",year:"2026",rating:"8.8",image:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=700&q=80"},
  {title:"The Last Horizon",type:"Movie",year:"2026",rating:"9.4",image:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=700&q=80"},
  {title:"Parallel",type:"Series",year:"2025",rating:"8.7",image:"https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?auto=format&fit=crop&w=700&q=80"},
  {title:"Midnight Run",type:"Movie",year:"2026",rating:"8.6",image:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=700&q=80"},
  {title:"Wild Earth",type:"Series",year:"2026",rating:"9.0",image:"https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80"},
  {title:"The Signal",type:"Movie",year:"2025",rating:"8.9",image:"https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=700&q=80"},
  {title:"Echoes",type:"Series",year:"2026",rating:"8.5",image:"https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=700&q=80"}
];

const card = item => `<article class="card">
  <figure class="poster">
    <img src="${item.image}" alt="${item.title} concept poster" loading="lazy">
    <button class="play" data-play="${item.title}" aria-label="Play ${item.title}">▶</button>
  </figure>
  <div class="card-info"><h3>${item.title}</h3><small>${item.year} • ${item.type} <span>★ ${item.rating}</span></small></div>
</article>`;

const render = (id, list) => document.getElementById(id).innerHTML = list.map(card).join("");
render("trendingGrid", titles.slice(0,4));
render("moviesGrid", titles.filter(item => item.type === "Movie"));
render("seriesGrid", titles.filter(item => item.type === "Series"));

const searchModal=document.getElementById("searchModal");
const playerModal=document.getElementById("playerModal");
const searchInput=document.getElementById("search");
const results=document.getElementById("results");

function openModal(modal){modal.classList.add("active");modal.setAttribute("aria-hidden","false")}
function closeModal(modal){modal.classList.remove("active");modal.setAttribute("aria-hidden","true")}
function openPlayer(title){document.getElementById("playerTitle").textContent=title;openModal(playerModal)}

document.getElementById("openSearch").addEventListener("click",()=>{openModal(searchModal);searchInput.focus()});
document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>closeModal(document.getElementById(button.dataset.close))));
document.addEventListener("click",event=>{const play=event.target.closest("[data-play]");if(play)openPlayer(play.dataset.play)});
searchInput.addEventListener("input",()=>{
  const query=searchInput.value.trim().toLowerCase();
  const found=titles.filter(item=>item.title.toLowerCase().includes(query));
  results.innerHTML=!query?"":found.length?found.map(item=>`<button class="result" data-play="${item.title}">${item.title} — ${item.type}</button>`).join(""):"<p class='result'>No titles found.</p>";
});
document.querySelectorAll(".modal").forEach(modal=>modal.addEventListener("click",event=>{if(event.target===modal)closeModal(modal)}));
document.addEventListener("keydown",event=>{if(event.key==="Escape"){closeModal(searchModal);closeModal(playerModal)}});

const menuToggle=document.getElementById("menuToggle"), mainNav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",open);menuToggle.textContent=open?"×":"☰"});
mainNav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰"}));

document.getElementById("showAll").addEventListener("click",()=>{render("trendingGrid",titles);document.getElementById("showAll").textContent="Showing all titles"});
document.getElementById("addWatch").addEventListener("click",()=>alert("The Last Horizon was added to My List."));
document.getElementById("accountButton").addEventListener("click",()=>document.getElementById("account").scrollIntoView({behavior:"smooth"}));
document.getElementById("createAccount").addEventListener("click",()=>alert("Prototype: account creation flow is ready for expansion."));
document.getElementById("feedbackForm").addEventListener("submit",event=>{event.preventDefault();document.getElementById("formStatus").textContent="Thanks! Your prototype feedback was submitted.";event.currentTarget.reset()});
