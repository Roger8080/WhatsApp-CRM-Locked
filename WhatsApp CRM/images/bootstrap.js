// @ts-nocheck
// Variáveis globais iniciais
let e = null; // Dados vindos da API
let t = null; // Dados do usuário (armazenados no localStorage)
let n = null; // Dados do usuário atualizados após validação de licença
let o = false; // Flag para controle de licença ativa
var c = encodeURI("695b9093-7bfb-11ef-8741-5475513518d7");

// Recupera os dados do localStorage, se existirem
const a = localStorage.getItem("mbf_data")
  ? JSON.parse(atob(localStorage.getItem("mbf_data")))
  : null;
const i = {
  phone: a ? a.phone : null,
  unique_id: a ? a.unique_code : null,
  license: a ? a.license : null
};
t = i;

/* === Funções do Discador === */
function openDialer() {
  console.log("openDialer() chamado");
  try {
    // Cria o elemento modal do discador
    const dialerModal = document.createElement("div");
    dialerModal.id = "dialerModal";
    dialerModal.style.position = "fixed";
    dialerModal.style.top = "0";
    dialerModal.style.left = "0";
    dialerModal.style.width = "100%";
    dialerModal.style.height = "100%";
    dialerModal.style.background = "rgba(0,0,0,0.7)";
    dialerModal.style.display = "flex";
    dialerModal.style.justifyContent = "center";
    dialerModal.style.alignItems = "center";
    dialerModal.style.zIndex = "9999";

    // Usa template literal (crases) para inserir o HTML corretamente
    dialerModal.innerHTML = `
      <div class="dialer-modal-content" style="background:#fff;padding:20px;border-radius:10px; text-align:center; position:relative; width:300px;">
        <button class="close" id="btnCloseDialer" style="position:absolute; top:10px; right:10px; background:transparent; border:none; font-size:20px;">×</button>
        <h2>Teclado de Discagem</h2>
        <input type="text" id="dialerInput" readonly style="width:100%; font-size:18px; text-align:center; margin-bottom:10px; padding:5px; border:1px solid #ccc; border-radius:5px;">
        <div class="dialer-buttons" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-bottom:10px;">
          <button class="num-btn" data-num="1">1</button>
          <button class="num-btn" data-num="2">2 <span style="font-size:12px;display:block;">ABC</span></button>
          <button class="num-btn" data-num="3">3 <span style="font-size:12px;display:block;">DEF</span></button>
          <button class="num-btn" data-num="4">4 <span style="font-size:12px;display:block;">GHI</span></button>
          <button class="num-btn" data-num="5">5 <span style="font-size:12px;display:block;">JKL</span></button>
          <button class="num-btn" data-num="6">6 <span style="font-size:12px;display:block;">MNO</span></button>
          <button class="num-btn" data-num="7">7 <span style="font-size:12px;display:block;">PQRS</span></button>
          <button class="num-btn" data-num="8">8 <span style="font-size:12px;display:block;">TUV</span></button>
          <button class="num-btn" data-num="9">9 <span style="font-size:12px;display:block;">WXYZ</span></button>
          <button class="num-btn" data-num="*">*</button>
          <button class="num-btn" data-num="0">0 <span style="font-size:12px;display:block;">+</span></button>
          <button class="num-btn" data-num="#">#</button>
        </div>
        <button id="btnMakeCall" style="background:green;color:#fff;padding:10px 20px;font-size:18px;border:none;border-radius:10px;cursor:pointer;">📞 Ligar</button>
      </div>
    `;
    document.body.appendChild(dialerModal);

    // Associa os event listeners sem usar inline handlers
    document.getElementById("btnCloseDialer").addEventListener("click", closeDialer);
    document.querySelectorAll(".num-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        addNumber(btn.getAttribute("data-num"));
      });
    });
    document.getElementById("btnMakeCall").addEventListener("click", makeCall);

    console.log("Modal do discador aberto");
  } catch (error) {
    console.error("Erro em openDialer:", error);
  }
}

function closeDialer() {
  console.log("closeDialer() chamado");
  try {
    const dialerModal = document.getElementById("dialerModal");
    if (dialerModal) {
      dialerModal.style.display = "none";
      dialerModal.remove();
      console.log("Modal do discador fechado");
    } else {
      console.warn("closeDialer: dialerModal não encontrado");
    }
  } catch (error) {
    console.error("Erro em closeDialer:", error);
  }
}

function addNumber(num) {
  console.log("addNumber() chamado com:", num);
  try {
    const input = document.getElementById("dialerInput");
    if (input) {
      input.value += num;
      console.log("Número atual:", input.value);
    } else {
      console.warn("addNumber: dialerInput não encontrado");
    }
  } catch (error) {
    console.error("Erro em addNumber:", error);
  }
}

function makeCall() {
  console.log("makeCall() chamado");
  try {
    const input = document.getElementById("dialerInput");
    if (input && input.value.trim() !== "") {
      console.log("Ligando para:", input.value);
      alert("Ligando para: " + input.value);
      // Aqui pode ser implementada a lógica real de chamada
      closeDialer();
    } else {
      console.warn("makeCall: Número vazio");
      alert("Digite um número para chamar.");
    }
  } catch (error) {
    console.error("Erro em makeCall:", error);
  }
}

// Torna as funções globais para serem usadas em outros trechos ou inline
window.openDialer = openDialer;
window.closeDialer = closeDialer;
window.addNumber = addNumber;
window.makeCall = makeCall;

/* === Observadores de Mutação para ajustar elementos da interface === */
(function () {
  const _0xdf2f80 = new MutationObserver(() => {
    const _0x1ff505 = document.querySelector(
      ".ant-popover-inner-content .custom-setting-menu"
    );
    if (_0x1ff505) {
      _0xdf2f80.disconnect();
      const _0x4070cf = _0x1ff505.closest(".ant-popover").parentElement.parentElement;
      let _0x49df3e = _0x4070cf.querySelector(".ant-popover");
      _0x4070cf
        .querySelector(".ant-popover-content")
        .insertAdjacentHTML(
          "afterbegin",
          `<button type="button" aria-label="Close" class="mbf-ant-modal-close">
             <span class="ant-modal-close-x">
               <span role="img" aria-label="close" class="anticon anticon-close ant-modal-close-icon">
                 <svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                   <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                 </svg>
               </span>
             </span>
           </button>`
        );
      _0x4070cf.querySelector(".mbf-ant-modal-close").addEventListener("click", () => {
        _0x49df3e.classList.add("ant-popover-hidden");
      });
      _0x4070cf.classList.add("full-screen");
      const _0x5080ac = _0x4070cf.querySelector(".custom-setting-menu-header div");
      _0x5080ac.innerHTML = "";
      _0x5080ac.innerHTML = `<p>${n.userDeviceData.device_data.skd_wa_no}</p>`;
      const _0x32e472 = document.querySelector(
        ".custom-setting-menu-items-layout .custom-setting-menu-item:nth-child(1)"
      );
      const _0x928600 = _0x32e472.cloneNode(true);
      _0x32e472.replaceWith(_0x928600);
      _0x928600.addEventListener("click", function () {
        // Modal de detalhes da licença
        (function () {
          let _0x4cc320 = `
            <div id="modalLicense" class="modal">
              <div class="modal-content">
                <button class="close"></button>
                <!-- Start - Modal content -->
                <h1 class="modal-title">Detalhes da licença</h1>
                <p class="modal-description">Aqui você encontrará informações detalhadas sobre sua licença e opções para desinstalá-la, se necessário.</p>
                <table class="user-info-table">
                  <tbody>
                    <tr>
                      <td><strong>Usuário:</strong></td>
                      <td>${n.userDeviceData.device_data.skd_wa_no}</td>
                    </tr>
                    <tr>
                      <td><strong>Telefone:</strong></td>
                      <td>${n.userDeviceData.device_data.skd_wa_no}</td>
                    </tr>
                    <tr>
                      <td><strong>Licença:</strong></td>
                      <td>${n.userDeviceData.skey}</td>
                    </tr>
                    <tr>
                      <td><strong>Plano:</strong></td>
                      <td>${n.userDeviceData.plan_type}</td>
                    </tr>
                    <tr>
                      <td><strong>Próxima data de pagamento:</strong></td>
                      <td>${n.userDeviceData.validate.end_date}</td>
                    </tr>
                  </tbody>
                </table>
                <div class="modal-buttons" style="margin-top: 20px;">
                  <button type="button" class="uninstall-button mbf_button">Desinstalar Licença</button>
                  <button type="button" class="close-button mbf_button alterntive">Fechar</button>
                </div>
                <!-- End - Modal content -->
              </div>
            </div>
          `;
          // Fecha os outros modais abertos
          document.querySelectorAll(".mbf-ant-modal-close").forEach(_0x41209d => {
            _0x41209d.click();
          });
          document.body.insertAdjacentHTML("beforeend", _0x4cc320);
          var _0x49e507 = document.getElementById("modalLicense");
          var _0x56a862 = _0x49e507.querySelector(".close");
          const _0xbbde52 = document.querySelector(".uninstall-button");
          const _0x2fb838 = document.querySelector(".close-button");
          _0x49e507.style.display = "flex";
          _0x56a862.onclick = function () {
            _0x49e507.style.display = "none";
            _0x49e507.remove();
          };
          _0x2fb838.onclick = function () {
            _0x49e507.style.display = "none";
            _0x49e507.remove();
          };
          _0xbbde52.onclick = async function () {
            _0x49e507.classList.add("loading");
            const _0x23441b = await (async function () {
              try {
                return { success: true, message: "done" };
              } catch (_0x394b9f) {
                return { success: false, message: "Formato de licença inválido" };
              }
            })();
            if (!_0x23441b.success) {
              _0x49e507.classList.remove("loading");
              alert(_0x23441b.message);
              return false;
            }
            o = false;
            localStorage.removeItem("mbf_data");
            alert(_0x23441b.message);
            setTimeout(() => {
              location.reload();
            }, 500);
          };
          window.onclick = function (_0x84cd18) {
            if (_0x84cd18.target == _0x49e507) {
              _0x49e507.style.display = "none";
              _0x49e507.remove();
            }
          };
        })();
      });
    }
  });
  const _0x23309e = new MutationObserver(() => {
    const _0x1d3b9f = document.querySelector(
      ".ant-popover-inner-content .custom-advance-tools-menu"
    );
    if (_0x1d3b9f) {
      _0x23309e.disconnect();
      const _0x3383b4 = _0x1d3b9f.closest(".ant-popover").parentElement.parentElement;
      let _0x2edecb = _0x3383b4.querySelector(".ant-popover");
      _0x3383b4
        .querySelector(".ant-popover-content")
        .insertAdjacentHTML(
          "afterbegin",
          `<button type="button" aria-label="Close" class="mbf-ant-modal-close">
             <span class="ant-modal-close-x">
               <span role="img" aria-label="close" class="anticon anticon-close ant-modal-close-icon">
                 <svg fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                   <path d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"></path>
                 </svg>
               </span>
             </span>
           </button>`
        );
      _0x3383b4.querySelector(".mbf-ant-modal-close").addEventListener("click", () => {
        _0x2edecb.classList.add("ant-popover-hidden");
      });
      _0x3383b4.classList.add("full-screen");
    }
  });
  _0x23309e.observe(document.body, { childList: true, subtree: true });
  _0xdf2f80.observe(document.body, { childList: true, subtree: true });
})();

/* === Inserindo estilos customizados === */
(function () {
  const _0x207051 = document.createElement("style");
  _0x207051.id = "mbf-custom-style";
  document.body.appendChild(_0x207051);
  _0x207051.textContent = `
    /*Inicio - Etiquetas --------------------*/
    span.top-tabbar-badge-class {
      background: var(--custom-primary-color)!important;
      color: white;
    }
    .dark span.top-tabbar-badge-class {
      background: white !important;
      color: black;
    }
    #main_section .main_toolbar .left_tab-side .ant-tabs-tab[data-node-key]:hover:after {
      background: var(--custom-primary-color) !important;
      border: 1px solid var(--custom-primary-color) !important;
    }
    /*Final - Etiquetas --------------------*/
  `;
})();

/* === Chamada à API para obter dados de anúncio === */
(async function (_0x2f7f50 = '', _0x45465d, _0x404940) {
  const _0x363c = new URL("https://crm.autozap.app/api/panouncement.php");
  _0x363c.searchParams.append("action", "get_data");
  _0x363c.searchParams.append("phone", _0x45465d);
  _0x363c.searchParams.append("reseller_id", _0x404940);
  if (_0x2f7f50) {
    _0x363c.searchParams.append("key", _0x2f7f50);
  }
  try {
    const _0x545c7d = await fetch(_0x363c, { method: "GET" });
    if (!_0x545c7d.ok) {
      throw new Error("HTTP error! status: " + _0x545c7d.status);
    }
    let _0x638860 = await _0x545c7d.json();
    console.log("1st response -->", _0x638860);
    return _0x638860;
  } catch (_0x13ffa1) {
    console.error("Error:", _0x13ffa1);
    throw _0x13ffa1;
  }
})("", t.phone, c).then(_0x34bc90 => {
  e = _0x34bc90.data;
  // Observador para substituir logo e remover avaliações
  (function () {
    const _0x501145 = new MutationObserver(_0x56e338 => {
      for (let _0x10a36a of _0x56e338) {
        if (_0x10a36a.type === "childList") {
          const _0x5f2828 = document.querySelector(
            'img[src="https://wawf.app/wp-content/uploads/2022/12/WA-WorkFlow-logo-design-270x51-1.webp"]'
          );
          if (_0x5f2828) {
            _0x5f2828.src = e.logo.data.logo_image;
            const _0x1853a5 = _0x5f2828.parentElement;
            if (_0x1853a5) {
              _0x1853a5.classList.add("wraper-logo-tag");
            }
          }
          if (document.querySelector(".ant-modal-root ul.ant-rate")) {
            const _0x3d9133 = document.querySelector(".ant-modal-root");
            if (_0x3d9133) {
              _0x3d9133.remove();
            }
          }
        }
      }
    });
    const _0x490eef = { childList: true, subtree: true };
    _0x501145.observe(document.body, _0x490eef);
  })();
  // Observador para aguardar a renderização da toolbar
  (function (_0x4a0267) {
    const _0x30be87 = new MutationObserver(function (_0x45c417) {
      _0x45c417.forEach(function (_0x3bcb5f) {
        if (_0x3bcb5f.type === "childList") {
          _0x3bcb5f.addedNodes.forEach(function (_0x497658) {
            if (_0x497658.classList && _0x497658.classList.contains("main_toolbar")) {
              let _0x214c62;
              _0x30be87.disconnect();
              _0x497658.style.opacity = 0;
              _0x214c62 = setInterval(() => {
                const _0x88a392 = _0x497658.querySelector(".custom-product-logo-layout");
                const _0x3c403c = _0x497658.querySelector(".left_tab-side");
                const _0x195da4 = _0x497658.querySelector(".right_buttons-side");
                if (_0x88a392 && _0x3c403c && _0x195da4) {
                  clearInterval(_0x214c62);
                  if (typeof _0x4a0267 == "function") {
                    _0x4a0267();
                  }
                }
              }, 100);
            }
          });
        }
      });
    });
    const _0x252b3e = { childList: true, subtree: true };
    _0x30be87.observe(document.body, _0x252b3e);
  })(async () => {
    // Modal de Boas-vindas (aparece apenas na 1ª vez)
    (function () {
      if (!localStorage.getItem("first_time")) {
        localStorage.setItem("first_time", true);
        let _0x4aa7ab = `
          <div id="modalWelcome" class="modal">
            <div class="modal-content">
              <button class="close"></button>
              <!-- Start - Modal content -->
              <h1 class="modal-title">${e.welcome.title}</h1>
              <img class="welcome_image" src="${e.welcome.image}" alt="${e.welcome.title}">
              <div class="modal-description">${e.welcome.description}</div>
              <div class="modal-buttons" style="margin-top: 20px;">
                 <a href="${e.welcome.button.link.url}" target="_blank" class="mbf_button">${e.welcome.button.link.title}</a>
                 <button type="button" class="close-button mbf_button">Fechar</button>
              </div>
              <!-- End - Modal content -->
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML("beforeend", _0x4aa7ab);
        var _0xa8cb4 = document.getElementById("modalWelcome");
        var _0x5a334d = _0xa8cb4.querySelector(".close");
        const _0x2d780e = document.querySelector(".close-button");
        _0xa8cb4.style.display = "flex";
        _0x5a334d.onclick = function () {
          _0xa8cb4.style.display = "none";
          _0xa8cb4.remove();
        };
        _0x2d780e.onclick = function () {
          _0xa8cb4.style.display = "none";
          _0xa8cb4.remove();
        };
        window.onclick = function (_0x385bb8) {
          if (_0x385bb8.target == _0xa8cb4) {
            _0xa8cb4.style.display = "none";
            _0xa8cb4.remove();
          }
        };
      }
    })();
    let _0x7571a3 = document.querySelector("#mbf_loading");
    var _0x2aabf5;
    // Se faltar dados de telefone ou id único, recarrega a página
    if (!t.phone || !t.unique_id) {
      location.reload();
    }
    console.log("Dados de licença", t);
    _0x2aabf5 = setInterval(function () {
      if (Boolean(document.querySelector(".two._aigs"))) {
        clearInterval(_0x2aabf5);
        const _0x2d5ed5 = document.querySelector("._aigs > header");
        const _0x50e0c4 = `
          <div class="mbf-sidebar">
            <a class="logo" href="${e.logo.data.logo_link}" target="_blank">
                <img src="${e.logo.data.logo_image}" alt="Logo">
            </a>
            <div class="mbf-buttons">
              ${e.buttons.data
                .map(_0x17915c => {
                  return `
                    <div id="${_0x17915c.id}" class="btn-item">
                        <div class="btn-item-img">
                            <img class="wc-user-img" src="${_0x17915c.icon}">
                        </div>
                        <div class="btn-item-info">
                            <strong class="btn-item-info-title">${_0x17915c.title}</strong>
                            <p class="btn-item-info-subtitle">${_0x17915c.sub_title}</p>
                        </div>
                    </div>
                  `;
                })
                .join("")}
            </div>
          </div>
        `;
        _0x2d5ed5.insertAdjacentHTML("afterbegin", _0x50e0c4);
        // Adiciona eventos aos itens da sidebar
        [
          { id: "sending_messages", index: 0x1 },
          { id: "lists", index: 0x2 },
          { id: "templates", index: 0x3 },
          { id: "workflow", index: 0x4 },
          { id: "schedule_messages", index: 0x5 },
          { id: "scheduled_shipments", index: 0x6 },
          { id: "kanban_board", index: 0x7 },
          { id: "kanban_board", index: 0x8 },
          { id: "functions", index: 0x9 },
          { id: "tools_free", index: 0xa },
          { id: "user", index: 0xb },
          { id: "call", index: 0xc }
        ].forEach(_0x413b43 => {
          const _0x56e116 = document.querySelector(`#${_0x413b43.id}`);
          if (_0x56e116) {
            _0x56e116.addEventListener("click", () => {
              // Se o item clicado for "call", chama o discador
              if (_0x413b43.id === "call") {
                openDialer();
              } else if (o === false) {
                // Modal para escolher o plano ou inserir chave de licença
                (function () {
                  document.body.insertAdjacentHTML("beforeend", `
                    <div id="modalPrice" class="modal">
                      <div class="modal-content">
                        <button class="close"></button>
                        <!-- Start - Modal content -->
                        <h1 class="modal-title">Escolha seu plano</h1>
                        <div class="modal-description">
                          Se você tiver uma licença, clique aqui para inserir sua chave:
                          <a href="#" class="open-insert-key">Inserir chave de licença</a>
                        </div>
                        <div class="toggle-price">
                          <input type="checkbox" id="toggle" class="toggle-checkbox" />
                        </div>
                        <div class="carousel-container">
                          <button class="carousel-btn left-btn">←</button>
                          <ul>
                            ${
                              e.table_price
                                .map(item => {
                                  if (item.variations && item.variations.length > 0) {
                                    return item.variations
                                      .map(variation => {
                                        const variationFeatures = variation.features
                                          ? variation.features
                                              .map(f => `<li>${f}</li>`)
                                              .join("")
                                          : "";
                                        return `
                                          <li class="subscription">
                                            <div class="subscription_header">
                                              <h2 class="subscription_header_title">${variation.name}</h2>
                                              ${variation.description ? `<div class="subscription_header_description">${variation.description}</div>` : ""}
                                            </div>
                                            <div class="subscription_content">
                                              <ul class="subscription_feature">
                                                ${variationFeatures}
                                              </ul>
                                              <div class="subscription_price">
                                                <span class="subscription_price_old">
                                                  ${variation.old_price ? variation.old_price : ""}
                                                </span>
                                                <span class="subscription_price_current">
                                                  ${variation.regular_price}
                                                </span>
                                              </div>
                                            </div>
                                            <div class="subscription_footer">
                                              <a class="mbf_button" href="${variation.url}" target="_blank">Comprar</a>
                                            </div>
                                          </li>
                                        `;
                                      })
                                      .join("");
                                  } else {
                                    const itemFeatures = item.features
                                      ? item.features.map(f => `<li>${f}</li>`).join("")
                                      : "";
                                    return `
                                      <li class="subscription">
                                        <div class="subscription_header">
                                          <h2 class="subscription_header_title">${item.title}</h2>
                                          ${item.description ? `<div class="subscription_header_description">${item.description}</div>` : ""}
                                        </div>
                                        <div class="subscription_content">
                                          <ul class="subscription_feature">
                                            ${itemFeatures}
                                          </ul>
                                          <div class="subscription_price">
                                            <span class="subscription_price_old">
                                              ${item.old_price ? item.old_price : ""}
                                            </span>
                                            <span class="subscription_price_current">
                                              ${item.regular_price}
                                            </span>
                                          </div>
                                        </div>
                                        <div class="subscription_footer">
                                          <a class="mbf_button" href="${item.url}" target="_blank">Comprar</a>
                                        </div>
                                      </li>
                                    `;
                                  }
                                })
                                .join("")
                            }
                          </ul>
                          <button class="carousel-btn right-btn">→</button>
                        </div>
                        <!-- End - Modal content -->
                      </div>
                    </div>
                  `);
                  var _0x2e93b0 = document.getElementById("modalPrice");
                  var _0x567106 = _0x2e93b0.querySelector(".close");
                  _0x2e93b0.style.display = "flex";
                  _0x567106.onclick = function () {
                    _0x2e93b0.style.display = "none";
                    _0x2e93b0.remove();
                  };
                  window.onclick = function (_0x541fe0) {
                    if (_0x541fe0.target == _0x2e93b0) {
                      _0x2e93b0.style.display = "none";
                      _0x2e93b0.remove();
                    }
                  };
                  const _0xb66914 = document.querySelector(".carousel-container ul");
                  const _0x5d98f4 = document.querySelector(".carousel-container .left-btn");
                  const _0xecfc89 = document.querySelector(".carousel-container .right-btn");
                  const _0x4136d8 = document.querySelectorAll(".carousel-container li.subscription");
                  const _0x47e83b = document.querySelector(".toggle-price input");
                  const _0x4f0b6c = document.querySelector(".open-insert-key");
                  function _0x3bd99f() {
                    const _0x15530a = _0x4136d8[0].clientWidth;
                    const _0x426bcd = _0xb66914.scrollLeft;
                    const _0x13168e = Math.round(_0x426bcd / _0x15530a);
                    console.log("Índice atual:", _0x13168e);
                    return _0x13168e;
                  }
                  function _0x2abfea() {
                    const _0x347cee = _0x3bd99f();
                    const _0x4d548d = document.querySelector(".carousel-container ul").children[_0x347cee];
                    let _0xdd5057 = e.table_price[_0x3bd99f()];
                    if (_0xdd5057.variations.length === 0) {
                      document.querySelector(".toggle-price").classList.add("disabled");
                      if (_0xdd5057.old_price === null) {
                        _0x4d548d.querySelector(".subscription_price_old").style.display = "none";
                        _0x4d548d.querySelector(".subscription_price_current").innerHTML = _0xdd5057.regular_price;
                      } else {
                        _0x4d548d.querySelector(".subscription_price_old").style.display = "inline";
                        _0x4d548d.querySelector(".subscription_price_current").innerHTML = _0xdd5057.regular_price;
                      }
                    } else {
                      document.querySelector(".toggle-price").classList.remove("disabled");
                      if (_0x47e83b.checked) {
                        if (_0xdd5057.variations[1].old_price === null) {
                          _0x4d548d.querySelector(".subscription_price_old").style.display = "none";
                          _0x4d548d.querySelector(".subscription_price_current").innerHTML = _0xdd5057.variations[1].regular_price;
                        } else {
                          _0x4d548d.querySelector(".subscription_price_old").style.display = "inline";
                          _0x4d548d.querySelector(".subscription_price_old").innerHTML = _0xdd5057.variations[1].old_price;
                          _0x4d548d.querySelector(".subscription_price_current").innerHTML = _0xdd5057.variations[1].regular_price;
                        }
                      } else if (_0xdd5057.variations[0].old_price === null) {
                        _0x4d548d.querySelector(".subscription_price_old").style.display = "none";
                        _0x4d548d.querySelector(".subscription_price_current").innerHTML = _0xdd5057.variations[0].regular_price;
                      } else {
                        _0x4d548d.querySelector(".subscription_price_old").style.display = "inline";
                        _0x4d548d.querySelector(".subscription_price_old").innerHTML = _0xdd5057.variations[0].old_price;
                        _0x4d548d.querySelector(".subscription_price_current").innerHTML = _0xdd5057.variations[0].regular_price;
                      }
                    }
                  }
                  _0x5d98f4.addEventListener("click", () => {
                    _0xb66914.scrollLeft -= _0xb66914.clientWidth;
                    setTimeout(() => {
                      _0x2abfea();
                    }, 100);
                  });
                  _0xecfc89.addEventListener("click", () => {
                    _0xb66914.scrollLeft += _0xb66914.clientWidth;
                    setTimeout(() => {
                      _0x2abfea();
                    }, 100);
                  });
                  _0x47e83b.addEventListener("change", function () {
                    _0x2abfea();
                  });
                  _0x4f0b6c.addEventListener("click", _0x4546d0 => {
                    _0x4546d0.preventDefault();
                    _0x2e93b0.style.display = "none";
                    _0x2e93b0.remove();
                    (function () {
                      document.body.insertAdjacentHTML("beforeend", `
                        <div id="modalPrice" class="modal">
                          <div class="modal-content">
                            <button class="close"></button>
                            <!-- Start - Modal content -->
                            <h1 class="modal-title">Você deve ter uma chave de licença válida e ativa</h1>
                            <div class="modal-description">
                              Insira sua chave de licença e clique em Ativar para ativar sua chave de licença.
                            </div>
                            <div class="toggle-price">
                              <input type="text" class="mbf_input_text" style="margin-bottom:20px;"/>
                              <div class="mbf_button">Ativar agora</div>
                            </div>
                            <!-- End - Modal content -->
                          </div>
                        </div>
                      `);
                      var _0x4f7f45 = document.getElementById("modalPrice");
                      var _0xeb728c = _0x4f7f45.querySelector(".close");
                      _0x4f7f45.style.display = "flex";
                      _0xeb728c.onclick = function () {
                        _0x4f7f45.style.display = "none";
                        _0x4f7f45.remove();
                      };
                      window.onclick = function (_0x331489) {
                        if (_0x331489.target == _0x4f7f45) {
                          _0x4f7f45.style.display = "none";
                          _0x4f7f45.remove();
                        }
                      };
                      const _0x3d37d4 = document.querySelector(".mbf_input_text");
                      document.querySelector(".mbf_button").addEventListener("click", async () => {
                        if (_0x3d37d4.value === "") {
                          alert("Você deve inserir sua licença");
                        } else {
                          _0x4f7f45.classList.add("loading");
                          const _0x4b73f6 = await l(t.unique_id, t.phone, _0x3d37d4.value);
                          if (_0x4b73f6.success) {
                            _0x4f7f45.classList.remove("loading");
                            const _0x1b7f5f = {
                              type: "ON_FETCH_REMOTE_DATA",
                              response: "",
                              extraData: {}
                            };
                            _0x1b7f5f.extraData.type = "validate_device";
                            _0x1b7f5f.extraData.mbf = true;
                            window.postMessage(_0x1b7f5f, "*");
                            _0x4f7f45.style.display = "none";
                            _0x4f7f45.remove();
                            o = true;
                            n = _0x4b73f6.data;
                            (function (_0x46d235) {
                              let _0x345d84 = null;
                              try {
                                const _0x29dcb7 = localStorage.getItem("mbf_data");
                                _0x345d84 = _0x29dcb7 ? JSON.parse(atob(_0x29dcb7)) : null;
                              } catch (_0x4a65e3) {}
                              if (_0x345d84) {
                                _0x345d84.license = _0x46d235;
                              } else {
                                _0x345d84 = { license: _0x46d235 };
                              }
                              try {
                                localStorage.setItem("mbf_data", btoa(JSON.stringify(_0x345d84)));
                              } catch (_0x58ad28) {}
                            })(_0x3d37d4.value);
                            const _0x20f376 =
                              "Olá " +
                              n.userDeviceData.device_data.skd_wa_no +
                              ', sua licença no Whatsapp Crm do plano "' +
                              n.userDeviceData.plan_type +
                              '" Está ativo agora. Seu próximo pagamento está agendado para ' +
                              n.userDeviceData.validate.end_date +
                              '. Obrigado por escolher o Whatsapp CRM, Desejamos sucesso em seu negócio! ';
                            alert(_0x20f376);
                          } else {
                            _0x4f7f45.classList.remove("loading");
                            _0x3d37d4.value = "";
                            _0x3d37d4.focus();
                            alert(_0x4b73f6.message);
                          }
                        }
                      });
                    })();
                  });
                  _0x2abfea();
                })();
              } else {
                // Se não for "call", dispara o clique no botão correspondente
                document
                  .querySelector(
                    ".main_toolbar > .right_buttons-side > div > div > .ant-space-item:nth-child(" +
                      _0x413b43.index +
                      ")"
                  )
                  .querySelector("button")
                  .click();
              }
            });
          }
        });
      }
    }, 50);
    // Validação de licença se existir
    if (t.license && t.license !== "") {
      const _0x5a62a9 = await l(t.unique_id, t.phone, t.license);
      if (_0x5a62a9.success) {
        (function () {
          if (new Date().getDate() === Number(e.promotion.day)) {
            let _0x1a72e7 = localStorage.getItem("list_promotions");
            if (_0x1a72e7) {
              _0x1a72e7 = JSON.parse(_0x1a72e7);
            } else {
              _0x1a72e7 = [];
              localStorage.setItem("list_promotions", JSON.stringify(_0x1a72e7));
            }
            let _0x2869ea = e.promotion.code;
            if (!_0x1a72e7.includes(_0x2869ea)) {
              _0x1a72e7.push(_0x2869ea);
              localStorage.setItem("list_promotions", JSON.stringify(_0x1a72e7));
              let _0x1c98d1 = `
                <div id="modalPromotion" class="modal">
                  <div class="modal-content">
                    <button class="close"></button>
                    <!-- Start - Modal content -->
                    <h1 class="modal-title">Promoções</h1>
                    <div class="carousel-container">
                      <button class="carousel-btn left-btn">←</button>
                      <ul>
                        ${e.promotion.slider
                          .map(_0x554598 => {
                            return `
                              <li class="promotion">
                                <a href="${_0x554598.link}" target="_blank">
                                  <img src="${_0x554598.image}" alt="${_0x554598.title}" class="promotion_image">
                                </a>
                              </li>
                            `;
                          })
                          .join("")}
                      </ul>
                      <button class="carousel-btn right-btn">→</button>
                    </div>
                    <!-- End - Modal content -->
                  </div>
                </div>
              `;
              document.body.insertAdjacentHTML("beforeend", _0x1c98d1);
              var _0x45c26e = document.getElementById("modalPromotion");
              var _0x355a72 = _0x45c26e.querySelector(".close");
              _0x45c26e.style.display = "flex";
              _0x355a72.onclick = function () {
                _0x45c26e.style.display = "none";
                _0x45c26e.remove();
              };
              window.onclick = function (_0xd2e6ca) {
                if (_0xd2e6ca.target == _0x45c26e) {
                  _0x45c26e.style.display = "none";
                  _0x45c26e.remove();
                }
              };
              const _0x52d9ea = document.querySelector(".carousel-container ul");
              const _0x198756 = document.querySelector(".carousel-container .left-btn");
              const _0x35c65e = document.querySelector(".carousel-container .right-btn");
              const _0x128e61 = document.querySelectorAll(".carousel-container li.subscription");
              function _0x2e8363() {
                const _0x5023ed = _0x128e61[0].clientWidth;
                const _0x56e68d = _0x52d9ea.scrollLeft;
                const _0x7b31eb = Math.round(_0x56e68d / _0x5023ed);
                console.log("Índice atual:", _0x7b31eb);
                return _0x7b31eb;
              }
              _0x198756.addEventListener("click", () => {
                _0x52d9ea.scrollLeft -= _0x52d9ea.clientWidth;
                setTimeout(() => {
                  _0x2e8363();
                }, 100);
              });
              _0x35c65e.addEventListener("click", () => {
                _0x52d9ea.scrollLeft += _0x52d9ea.clientWidth;
                setTimeout(() => {
                  _0x2e8363();
                }, 100);
              });
            }
          }
        })();
        o = true;
        n = _0x5a62a9.data;
        console.log("Dados do usuário:", n);
        const _0xb723f3 = {
          type: "ON_FETCH_REMOTE_DATA",
          response: "",
          extraData: {}
        };
        _0xb723f3.extraData.type = "validate_device";
        _0xb723f3.extraData.mbf = true;
        window.postMessage(_0xb723f3, "*");
      } else {
        if (a && a.license) {
          delete a.license;
          localStorage.setItem("mbf_data", btoa(JSON.stringify(a)));
        }
        (function () {
          let _0x132219 = `
            <div id="modalPrice" class="modal">
              <div class="modal-content">
                <button class="close"></button>
                <!-- Start - Modal content -->
                <img class="expired_image" src="${e.expired.image}" alt="${e.expired.title}">
                <div class="expired_description">${e.expired.description}</div>
                <a href="${e.expired.button.link}" target="_blank" class="btn-swal expired_button swal2-styled swal2-default-outline">${e.expired.button.title}</a>
                <div class="modal-buttons">
                  <button type="button" class="expired_button mbf_button">Fechar</button>
                </div>
                <!-- End - Modal content -->
              </div>
            </div>
          `;
          document.body.insertAdjacentHTML("beforeend", _0x132219);
          var _0x4bb6b5 = document.getElementById("modalPrice");
          var _0x54208a = _0x4bb6b5.querySelector(".close");
          const _0x18da39 = document.querySelector(".mbf_button");
          _0x4bb6b5.style.display = "flex";
          _0x54208a.onclick = function () {
            _0x4bb6b5.style.display = "none";
            _0x4bb6b5.remove();
          };
          _0x18da39.onclick = function () {
            _0x4bb6b5.style.display = "none";
            _0x4bb6b5.remove();
          };
          window.onclick = function (_0x13e2c5) {
            if (_0x13e2c5.target == _0x4bb6b5) {
              _0x4bb6b5.style.display = "none";
              _0x4bb6b5.remove();
            }
          };
        })();
      }
    }
    _0x7571a3.remove();
    document.querySelector(".main_toolbar").style.opacity = 1;
  });
});

// Exibe o loading assim que a barra lateral (pane-side) é encontrada
var s = setInterval(function () {
  if (Boolean(document.getElementById("pane-side")) && e) {
    clearInterval(s);
    (function () {
      let _0x91254d = `
        <div id="mbf_loading">
          <div>
            <h1>${e.loading.loading_title}</h1>
            <img src="${e.loading.loading_image}" alt="Loading" />
            <p>${e.loading.loading_title_description}</p>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML("beforeend", _0x91254d);
      console.log("Cargando o programa");
    })();
  }
}, 50);

/* === Função de validação da licença === */
async function l(_0x55bbf8, _0x152b1d, _0x21459c, _0x1e7f29) {
  const _0x56e54a =
    "https://crm.autozap.app/api/pvalidate.php?" +
    new URLSearchParams({
      unique_id: _0x55bbf8,
      phone: _0x152b1d,
      license: _0x21459c,
      reseller_id: _0x1e7f29
    }).toString();
  try {
    console.log(_0x56e54a);
    const _0x521fc0 = await fetch(_0x56e54a, { method: "GET" });
    const _0x3957c7 = await _0x521fc0.json();
    console.log("insert license-->", _0x3957c7);
    if (_0x3957c7.status === 200) {
      return { success: true, message: _0x3957c7.message, data: _0x3957c7.dData };
    }
    return { success: false, message: _0x3957c7.message };
  } catch (_0x733a9b) {
    return { success: false, message: "Formato da Licença Inválido" };
  }
}

/* === Função de ofuscação simples (verificação de debug) === */
function r(_0x4e70e8) {
  function _0x355028(_0xba1d6e) {
    if (typeof _0xba1d6e == "string") {
      return function (_0x2c2fe6) {}.constructor("while (true) {}").apply("counter");
    }
    if (("" + _0xba1d6e / _0xba1d6e).length !== 1 || _0xba1d6e % 20 == 0) {
      (function () {
        return true;
      })
        .constructor("debugger")
        .call("action");
    } else {
      (function () {
        return false;
      })
        .constructor("debugger")
        .apply("stateObject");
    }
    _0x355028(++_0xba1d6e);
  }
  try {
    if (_0x4e70e8) {
      return _0x355028;
    }
    _0x355028(0);
  } catch (_0x3dd366) {}
}

// Intervalo para chamar a função de ofuscação
(function () {
  let _0x299231;
  try {
    _0x299231 = Function("return (function() {}.constructor(\"return this\")( ));")();
  } catch (_0xa7e238) {
    _0x299231 = window;
  }
  _0x299231.setInterval(r, 4000);
})();
