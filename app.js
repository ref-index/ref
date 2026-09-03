
(function(){
  const archive = document.getElementById("archive");
  const count = document.getElementById("count");
  const refs = Array.isArray(window.REFS) ? window.REFS : [];

  count.textContent = `REF.001 → REF.${String(refs.length).padStart(3,"0")}`;

  archive.innerHTML = refs.map(ref => {
    const image = ref.image
      ? `<div class="ref-media">
           <img src="${escapeAttr(ref.image)}" alt="${escapeAttr(ref.title)} — ${escapeAttr(ref.artist)}">
         </div>`
      : `<div class="ref-media no-image">Image not displayed — add only when you have permission or a valid licence</div>`;

    const client = ref.client ? `<strong>Client</strong><br>${escapeHtml(ref.client)}<br><br>` : "";
    const commissioned = ref.commissionedBy ? `<strong>Commissioned by</strong><br>${escapeHtml(ref.commissionedBy)}<br><br>` : "";
    const credit = ref.imageCredit ? `<strong>Image credit</strong><br>${escapeHtml(ref.imageCredit)}<br><br>` : "";

    return `
      <article class="ref" id="ref-${escapeAttr(ref.id)}">
        <div class="ref-meta">
          <div class="ref-id">REF.${escapeHtml(ref.id)}</div>
          <div class="muted">${escapeHtml(ref.category || "")}</div>
          <div class="muted">${escapeHtml(ref.location || "")}</div>
        </div>

        ${image}

        <div class="ref-info">
          <div></div>
          <div>
            <h2>${escapeHtml(ref.title)}</h2>
            <div class="artist">${escapeHtml(ref.artist)}</div>
            <p class="ref-note">${escapeHtml(ref.note || "")}</p>
          </div>
          <div class="side">
            ${client}${commissioned}${credit}
            <a class="view-original" href="${escapeAttr(ref.sourceUrl)}" target="_blank" rel="noopener noreferrer">
              View original ↗
            </a>
          </div>
        </div>
      </article>`;
  }).join("");

  function escapeHtml(value=""){
    return String(value).replace(/[&<>"']/g, ch => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[ch]));
  }
  function escapeAttr(value=""){ return escapeHtml(value); }
})();
