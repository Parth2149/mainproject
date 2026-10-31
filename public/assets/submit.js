const form = document.querySelector('#submit-tool');
let downloadUrl;
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const status = document.querySelector('#submit-status');
  const platforms = data.getAll('platform');
  if (!platforms.length) {status.textContent='Select at least one platform.';form.querySelector('[name="platform"]').focus();return;}
  for(const key of ['url','github']) {
    const value = data.get(key).trim();
    if(value && (!value.startsWith('https://') || (key==='github' && !/^https:\/\/github\.com\/[^/\s]+\/[^/\s]+\/?$/.test(value)))) {
      status.textContent=key==='github'?'Use a GitHub repository URL: https://github.com/owner/repository':'Use an HTTPS official website URL.';
      form.elements[key].focus();return;
    }
  }
  const entry = Object.fromEntries(['name','category','url','github','license','pricing','description'].map(k=>[k,data.get(k).trim()]));
  entry.platforms=platforms;
  const output = JSON.stringify(entry,null,2);
  document.querySelector('#json-output').value=output;
  if(downloadUrl) URL.revokeObjectURL(downloadUrl);
  downloadUrl=URL.createObjectURL(new Blob([output+'\n'],{type:'application/json'}));
  document.querySelector('#download-entry').href=downloadUrl;
  document.querySelector('#contribution').hidden=false;
  status.textContent='Entry generated locally. Download it and include it in a pull request; it has not been submitted yet.';
});
