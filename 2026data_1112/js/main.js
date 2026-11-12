// ポートフォリオの表示・カテゴリー切り替え・モーダル・追加プレビューの処理
// 実際の作品は projects.js の projects 配列に登録してください。
    const categories = ["すべて", "チラシ・販促物", "パンフレット", "ロゴ", "SNS・広告", "求人広告", "WEBサイト", "エディトリアル", "その他"];
    let activeCategory = "すべて";
    let addedProjects = [];
    let currentProject = null;
    const grid = document.getElementById("grid");
    const filters = document.getElementById("filters");
    const count = document.getElementById("count");
    const modal = document.getElementById("modal");

    document.getElementById("yearNow").textContent = new Date().getFullYear();

    function allProjects() { return [...projects, ...addedProjects]; }
    function safeText(value) {
      return String(value || "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
    }
    function makePlaceholder(project) {
      return `<div class="placeholder"><div><strong>${safeText(project.placeholder || project.category)}</strong><span>${safeText(project.subtitle || "画像を登録してください")}</span></div></div>`;
    }
    function renderFilters() {
      filters.innerHTML = categories.map(cat => `<button class="filter ${activeCategory === cat ? "active" : ""}" data-category="${safeText(cat)}">${safeText(cat)}</button>`).join("");
      filters.querySelectorAll("button").forEach(btn => btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category; renderFilters(); renderGrid();
      }));
    }
    function renderGrid() {
      const list = allProjects().filter(p => activeCategory === "すべて" || p.category === activeCategory);
      count.textContent = `${list.length} Works`;
      if (!list.length) { grid.innerHTML = '<div class="empty">このカテゴリにはまだ作品がありません。</div>'; return; }
      grid.innerHTML = list.map(p => `
        <button class="card" data-id="${p.id}" aria-label="${safeText(p.title)}の詳細を開く">
          <div class="thumb">${p.image ? `<img src="${p.image}" alt="${safeText(p.title)}" loading="lazy">` : makePlaceholder(p)}</div>
          <div class="card-meta"><span class="card-title">${safeText(p.title)}</span><span class="card-category">${safeText(p.category)}</span></div>
          <div class="card-sub">${safeText(p.year || "")}${p.tools ? " · " + safeText(p.tools) : ""}</div>
        </button>`).join("");
      grid.querySelectorAll(".card").forEach(card => card.addEventListener("click", () => {
        const p = allProjects().find(x => String(x.id) === card.dataset.id);
        if (p) openProject(p);
      }));
    }
    function visibleProjects() {
      return allProjects().filter(project => activeCategory === "すべて" || project.category === activeCategory);
    }
    function openProject(p) {
      currentProject = p;
      const imageBox = document.getElementById("modalImage");
      imageBox.innerHTML = `${p.image ? `<img src="${p.image}" alt="${safeText(p.title)}">` : makePlaceholder(p)}
        <button class="project-nav back" id="previousProject" type="button">← Back</button>
        <button class="project-nav next" id="nextProject" type="button">Next →</button>`;
      const list = visibleProjects();
      const index = list.findIndex(project => String(project.id) === String(p.id));
      const previousButton = document.getElementById("previousProject");
      const nextButton = document.getElementById("nextProject");
      previousButton.disabled = index <= 0;
      nextButton.disabled = index < 0 || index >= list.length - 1;
      previousButton.addEventListener("click", () => { if (index > 0) openProject(list[index - 1]); });
      nextButton.addEventListener("click", () => { if (index >= 0 && index < list.length - 1) openProject(list[index + 1]); });
      document.getElementById("modalInfo").innerHTML = `
        <div class="eyebrow">${safeText(p.category)}${p.year ? " / " + safeText(p.year) : ""}</div>
        <h2>${safeText(p.title)}</h2>
        <div class="desc">${safeText(p.description || "制作の目的や工夫した点を記載してください。")}</div>
        <dl class="detail-list">
          <div class="detail-row"><dt>担当範囲</dt><dd>${safeText(p.role || "未設定")}</dd></div>
          <div class="detail-row"><dt>使用ツール</dt><dd>${safeText(p.tools || "未設定")}</dd></div>
          <div class="detail-row"><dt>制作年</dt><dd>${safeText(p.year || "未設定")}</dd></div>
        </dl>`;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeModal() { modal.classList.remove("open"); document.body.style.overflow = ""; }
    document.getElementById("closeModal").addEventListener("click", closeModal);
    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

    const editPanel = document.getElementById("editPanel");
    document.getElementById("toggleEditor").addEventListener("click", () => editPanel.classList.toggle("open"));
    document.getElementById("closeEditor").addEventListener("click", () => editPanel.classList.remove("open"));
    document.getElementById("projectForm").addEventListener("submit", e => {
      e.preventDefault();
      const file = document.getElementById("imageInput").files[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) { alert("画像ファイルを選択してください。"); return; }
      const reader = new FileReader();
      reader.onload = () => {
        addedProjects.unshift({
          id: "new-" + Date.now(),
          title: document.getElementById("titleInput").value.trim(),
          category: document.getElementById("categoryInput").value,
          year: document.getElementById("yearInput").value.trim(),
          tools: document.getElementById("toolsInput").value.trim(),
          role: document.getElementById("roleInput").value.trim(),
          description: document.getElementById("descriptionInput").value.trim(),
          image: reader.result
        });
        activeCategory = "すべて"; renderFilters(); renderGrid();
        e.target.reset();
        editPanel.classList.remove("open");
      };
      reader.readAsDataURL(file);
    });
    document.getElementById("exportButton").addEventListener("click", () => {
      const data = allProjects().map(({ image, ...p }) => p);
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "portfolio-projects.json"; a.click();
      URL.revokeObjectURL(url);
    });
    renderFilters(); renderGrid();
