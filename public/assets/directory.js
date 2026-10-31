const form = document.querySelector('#filters');
const cards = [...document.querySelectorAll('#tool-grid .tool-card')];
const params = new URLSearchParams(location.search);
for (const name of ['q','category','platform','pricing','license']) {
  if (params.has(name)) form.elements[name].value = params.get(name);
}
function update() {
  const query = form.elements.q.value.trim().toLowerCase();
  const values = Object.fromEntries(new FormData(form));
  let count = 0;
  for (const card of cards) {
    const d = card.dataset;
    const matches = (!query || card.textContent.toLowerCase().includes(query)) &&
      (!values.category || values.category === d.category) &&
      (!values.platform || d.platforms.split('|').includes(values.platform)) &&
      (!values.pricing || values.pricing === d.pricing) &&
      (!values.license || values.license === d.license);
    card.hidden = !matches; count += Number(matches);
  }
  document.querySelector('#result-count').textContent = `${count} ${count === 1 ? 'tool' : 'tools'} to explore`;
  document.querySelector('#empty').hidden = count !== 0;
  const next = new URLSearchParams();
  for (const [k,v] of Object.entries(values)) if(v) next.set(k,v);
  history.replaceState(null,'',location.pathname + (next.size ? '?' + next : '') + location.hash);
}
form.addEventListener('input',update);
form.addEventListener('change',update);
form.addEventListener('submit', e => {e.preventDefault();update();});
form.addEventListener('reset', () => setTimeout(update,0));
document.querySelector('#empty-reset').addEventListener('click',()=>form.reset());
document.addEventListener('keydown',e=>{if(e.key==='/' && !e.ctrlKey && !e.metaKey && !e.altKey && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){e.preventDefault();form.elements.q.focus();}});
update();
