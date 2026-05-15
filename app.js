// =====================================
// CLASS PRODUK
// =====================================

class Produk {

  constructor(id, nama, harga, kategori, gambar) {

    this.id = id;
    this.nama = nama;
    this.harga = harga;
    this.kategori = kategori;
    this.gambar = gambar;

  }

  tampilkanProduk() {

    return `

      <div class="produk-card">

        <img src="${this.gambar}" alt="${this.nama}">

        <h3>${this.nama}</h3>

        <p>${this.kategori}</p>

        <div class="price">
          Rp ${this.harga.toLocaleString("id-ID")}
        </div>

        <button
          class="buy-btn"
          onclick="keranjang.tambahProduk(${this.id})"
        >
          Tambah Ke Keranjang
        </button>

      </div>

    `;

  }

}

// =====================================
// INHERITANCE
// =====================================

class ProdukPremium extends Produk {

  constructor(id, nama, harga, kategori, gambar, bonus) {

    super(id, nama, harga, kategori, gambar);

    this.bonus = bonus;

  }

  tampilkanProduk() {

    return `

      <div class="produk-card">

        <img src="${this.gambar}" alt="${this.nama}">

        <h3>${this.nama} ⭐</h3>

        <p>${this.kategori}</p>

        <p>Bonus: ${this.bonus}</p>

        <div class="price">
          Rp ${this.harga.toLocaleString("id-ID")}
        </div>

        <button
          class="buy-btn"
          onclick="keranjang.tambahProduk(${this.id})"
        >
          Premium Buy
        </button>

      </div>

    `;

  }

}

// =====================================
// CLASS KERANJANG
// =====================================

class Keranjang {

  constructor() {

    this.items = [];

  }

bayarSekarang() {

  const paymentStatus =
    document.getElementById("paymentStatus");

  if(this.items.length === 0) {

    paymentStatus.innerHTML =
      "Keranjang masih kosong";

    paymentStatus.style.color = "red";

    return;

  }

  paymentStatus.innerHTML =
    `Pembayaran Berhasil ✅ 
    Total Rp ${this.hitungTotal().toLocaleString("id-ID")}`;

  paymentStatus.style.color = "lime";

  this.showToast(
    "Pembayaran sukses"
  );

  this.items = [];

  this.renderCart();

}


  tambahProduk(id) {

    const produk = daftarProduk.find((item) => {
      return item.id === id;
    });

    this.items.push(produk);

    this.renderCart();

    this.showToast(
      `${produk.nama} berhasil ditambahkan`
    );

  }

  hapusProduk(index) {

    this.items.splice(index, 1);

    this.renderCart();

  }

  hitungTotal() {

    let total = 0;

    this.items.forEach((item) => {

      total += item.harga;

    });

    return total;

  }

  renderCart() {

    const cartItems =
      document.getElementById("cartItems");

    const totalHarga =
      document.getElementById("totalHarga");

    const cartCount =
      document.getElementById("cartCount");

    cartItems.innerHTML = "";

    this.items.forEach((item, index) => {

      cartItems.innerHTML += `

        <div class="cart-item">

          <h3>${item.nama}</h3>

          <p>
            Rp ${item.harga.toLocaleString("id-ID")}
          </p>

          <button
            class="buy-btn"
            onclick="keranjang.hapusProduk(${index})"
          >
            Hapus
          </button>

        </div>

      `;

    });

    totalHarga.innerText =
      this.hitungTotal().toLocaleString("id-ID");

    cartCount.innerText = this.items.length;

    localStorage.setItem(
      "keranjang",
      JSON.stringify(this.items)
    );

  }

  showToast(message) {

    const toast = document.createElement("div");

    toast.classList.add("toast");

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

      toast.classList.add("show");

    }, 100);

    setTimeout(() => {

      toast.remove();

    }, 3000);

  }

}

// =====================================
// ARRAY OBJECT PRODUK
// =====================================

const daftarProduk = [

  new Produk(
    1,
    "Gaming Mouse",
    350000,
    "Gaming",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop"
  ),

  new Produk(
    2,
    "Mechanical Keyboard",
    850000,
    "Keyboard",
    "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop"
  ),

  new ProdukPremium(
    3,
    "Gaming Headset",
    1200000,
    "Audio",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    "RGB Premium"
  ),

  new ProdukPremium(
    4,
    "Gaming Monitor",
    3200000,
    "Monitor",
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    "144Hz"
  ),

  new Produk(
    5,
    "Gaming Chair",
    2500000,
    "Furniture",
    "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop"
  ),

  new ProdukPremium(
    6,
    "Studio Microphone",
    1450000,
    "Audio",
    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    "Noise Reduction"
  ),

  // =========================
  // PRODUK BARU
  // =========================

  new ProdukPremium(
    7,
    "Gaming Laptop",
    12500000,
    "Laptop",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1200&auto=format&fit=crop",
    "RTX Series"
  ),

  new Produk(
    8,
    "Smart Watch",
    2200000,
    "Gadget",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
  ),

  new ProdukPremium(
    9,
    "PlayStation 5",
    8500000,
    "Console",
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1200&auto=format&fit=crop",
    "DualSense Included"
  ),

];

// =====================================
// OBJECT KERANJANG
// =====================================

const keranjang = new Keranjang();

// =====================================
// RENDER PRODUK
// =====================================

const produkContainer =
  document.getElementById("produkContainer");

function renderProduk(data) {

  produkContainer.innerHTML = "";

  data.forEach((produk) => {

    produkContainer.innerHTML +=
      produk.tampilkanProduk();

  });

}

renderProduk(daftarProduk);

// =====================================
// SEARCH SYSTEM
// =====================================

const searchInput =
  document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

  const keyword =
    searchInput.value.toLowerCase();

  const hasil = daftarProduk.filter((produk) => {

    return (
      produk.nama.toLowerCase().includes(keyword)
    );

  });

  renderProduk(hasil);

});

// =====================================
// HAMBURGER MENU
// =====================================

const menuToggle =
  document.getElementById("menuToggle");

const navMenu =
  document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

  navMenu.classList.toggle("active");

});

// =====================================
// BUTTON SCROLL
// =====================================

function scrollProduk() {

  document.getElementById("produk")
  .scrollIntoView({

    behavior: "smooth"

  });

}

// =====================================
// LOAD LOCAL STORAGE
// =====================================

window.addEventListener("load", () => {

  const data =
    JSON.parse(localStorage.getItem("keranjang"));

  if(data) {

    keranjang.items = data;

    keranjang.renderCart();

  }

});

// =========================
// OPEN CART
// =========================

const cartPopup =
document.getElementById("cartPopup");

const cartIcon =
document.querySelector(".cart-icon");

const closeCart =
document.getElementById("closeCart");

cartIcon.addEventListener("click", () => {

  cartPopup.classList.add("active");

});

closeCart.addEventListener("click", () => {

  cartPopup.classList.remove("active");

});

// =========================
// PAYMENT SYSTEM
// =========================

function bayarSekarang(){

  const paymentStatus =
  document.getElementById("paymentStatus");

  if(keranjang.items.length === 0){

    paymentStatus.innerHTML =
    "Keranjang masih kosong";

    return;

  }

  paymentStatus.innerHTML =
  "Pembayaran berhasil 🎉";

  keranjang.items = [];

  keranjang.renderCart();

  localStorage.removeItem("keranjang");

}