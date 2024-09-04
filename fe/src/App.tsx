import React from "react";
import { Button, Accordion, Ripple, Modal } from "./Components";
import { API } from "./utils/API";
import { handleHttpError } from "./utils/ErrorHandlers";

function Slide({ img, children }: { img: string; children: React.ReactNode }) {
  const slideRef = React.useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <button
        ref={slideRef}
        style={{
          overflow: "hidden",
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "12rem",
          position: "relative",
          borderRadius: "8px",
        }}
        onClick={(e) => {
          Ripple(e, slideRef.current!, "#FFFFFF");
        }}
      >
        <h1 className="text-white text-lg absolute start-4 bottom-4 font-bold">
          {children}
        </h1>
      </button>
    </>
  );
}

function Product({
  img,
  price,
  children,
}: {
  img: string;
  price: number;
  children?: React.ReactNode;
}) {
  const priceFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);

  return (
    <>
      <div className="w-48 rounded-lg overflow-hidden shadow-lg">
        <img className="w-full h-64" src={img} alt="Product card" />
        <div className="p-4">
          <h1 className="mb-2">{children}</h1>
          <h4 className="text-lg font-medium mb-2 text-wrap">
            {priceFormatted}
          </h4>
        </div>
        <div className="p-4">
          <Button xcss={{ width: "100%" }} color="primary" textColor="white">
            Beli
          </Button>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const searchRef = React.useRef<HTMLInputElement>(null);

  const [accountModalOpen, setAccountModalOpen] = React.useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      // Construct form data to send
      const formData = new FormData(e.currentTarget);

      // Send login request to server
      const res = await API.get(`/auth?email=${formData.get("email")}&password=${formData.get("password")}`);

      console.log(res);
    } catch (err) {
      const errmess = handleHttpError(err);
      console.log(errmess);
      alert(errmess);
    }
  }

  return (
    <>
      {/* Sidebar (Mobile) */}
      {/* TODO: */}

      {/* Account modal */}
      <Modal isOpen={accountModalOpen} setIsOpen={setAccountModalOpen}>
        <form onSubmit={handleLogin} className="p-4">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
          >
            Login
          </button>
        </form>
      </Modal>

      {/* Header */}
      <header className="bg-[#FFF9F3] p-8 w-full">
        <div className="flex justify-between items-center">
          {/* TODO: Toggle sidebar for mobile */}
          <h1 className="text-primary font-bold text-2xl">Depository</h1>

          {/* These are put on sidebar on mobile */}
          <div className="flex items-center space-x-2">
            {/* <span className="hidden lg:block"><Button color="primary" textColor="white">Bantuan</Button></span> */}
            <Button
              onClick={() => setAccountModalOpen(!accountModalOpen)}
              img="Person.svg"
            >
              <span className="hidden lg:block">Akun</span>
            </Button>
            <Button img="Bag.svg">
              <span className="hidden lg:block">Belanja</span>
            </Button>
          </div>
        </div>

        <br />

        <div className="flex space-x-4">
          <Button color="white" img="Filter.svg" />
          <form
            className="flex w-full items-center px-4 py-2 space-x-4 bg-white rounded-full hover:cursor-text text-sm relative"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              ref={searchRef}
              type="text"
              placeholder="Cari produk..."
              className="px-4 py-2 border-0 rounded-full focus:outline-none w-full"
            />

            <img
              src="Search.svg"
              alt="Search icon"
              className="size-6 opacity-50 absolute end-8"
            />
          </form>
        </div>
      </header>

      {/* Main content */}
      <main className="w-full flex justify-center p-8">
        <div className="container">
          {/* Editor choices */}
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Editor Choices</h2>
              <h4 className="text-sm opacity-50">
                Produk paling berkualitas, kami jamin!
              </h4>
            </div>
            <div className="grid gap-4 grid-cols-12">
              {[
                {
                  img: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1298&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  text: "Fashion dan Sepatu",
                },

                {
                  img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1380&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  text: "Perabotan Interior",
                },

                {
                  img: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?q=80&w=1368&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  text: "Seni dan Dekorasi",
                },
              ].map((item, index) => (
                <div key={index} className="col-span-12 md:col-span-4">
                  <Slide img={item.img}>{item.text}</Slide>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            {/* Heading to grab attention */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Lihat Produk Terbaru Kami
              </h2>
              <h4 className="text-sm opacity-50">
                Cepat beli sebelum kehabisan!
              </h4>
            </div>

            {/* Latest products */}
            <div className="flex overflow-x-scroll w-full">
              {[
                {
                  img: "https://images.unsplash.com/photo-1591799265444-d66432b91588?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
                  price: 2500000,
                  name: "Ryzen CPU",
                },
                {
                  img: "https://images.unsplash.com/photo-1648737966614-55e58b5e3caf?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww",
                  price: 1200000,
                  name: "Laptop",
                },
                {
                  img: "https://images.unsplash.com/photo-1671418285899-58fb1471c038?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww",
                  price: 800000,
                  name: "Android Phone",
                },
                {
                  img: "https://images.unsplash.com/photo-1620856902651-ce18d6d31d42?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
                  price: 1500000,
                  name: "iPhone",
                },
                {
                  img: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGVsZWN0cm9uaWNzfGVufDB8fDB8fHww",
                  price: 500000,
                  name: "4K Monitor",
                },
                {
                  img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
                  price: 3000000,
                  name: "AI Assistant",
                },
              ].map((item, index) => (
                <div key={index} className="w-max me-4">
                  <Product img={item.img} price={item.price}>
                    {item.name}
                  </Product>
                </div>
              ))}
            </div>
          </section>

          {/* Newsletter signup */}
          <section className="mb-16 p-8 bg-[#5959D9] text-white rounded-lg">
            <h2 className="text-2xl font-bold mb-2">
              Ingin penawaran eksklusif dan cuplikan menarik? 🤫
            </h2>
            <p className="text-md">
              Daftar ke buletin kami dan jadilah yang pertama mengetahuinya:
            </p>
            <ul className="text-md list-disc ms-6 mt-2">
              <li>Penjualan kilat dan penawaran khusus 🤑</li>
              <li>Peluncuran produk baru ✨</li>
              <li>Tips and tricks 💡</li>
              <li>Cuplikan di balik layar 👀</li>
            </ul>

            <br />

            <form
              onSubmit={(e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append("email", e.currentTarget.email.value);

                alert("Email anda: " + formData.get("email"));
              }}
            >
              <div className="flex w-full items-center px-4 py-2 space-x-4 bg-white rounded-full hover:cursor-text text-sm relative">
                <input
                  type="text"
                  name="email"
                  placeholder="Masukkan email di sini..."
                  className="px-4 py-2 border-0 rounded-full focus:outline-none w-full"
                />

                <div className="hidden md:block absolute end-4">
                  <Button color="primary" textColor="white">
                    Langganan
                  </Button>
                </div>
              </div>

              <br />
              <div className="md:hidden">
                <Button
                  xcss={{ width: "100%" }}
                  color="primary"
                  textColor="white"
                >
                  Langganan
                </Button>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-8 border-t border-grey-500">
        {/* Row 1: Company info */}
        <div className="w-full flex flex-col lg:flex-row">
          <div>
            <h1 className="text-primary font-bold text-2xl">Depository</h1>
            <br />
            <p>Kota Barujadi, Jawa Selatan, Indonesia</p>
            <br />
            <div className="flex flex-wrap w-full space-x-4">
              <a href="#">
                <img src="Facebook.svg" alt="size-6" />
              </a>
              <a href="#">
                <img src="Twitter.svg" alt="size-6" />
              </a>
              <a href="#">
                <img src="LinkedIn.svg" alt="size-6" />
              </a>
            </div>
          </div>

          <br className="lg:hidden" />

          <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <Accordion opened title="Tentang Kami">
              <Button>Perusahaan</Button>
              <hr className="my-2" />
              <Button>Ketentuan Pemakaian</Button>
              <hr className="my-2" />
              <Button>Kebijakan Privasi</Button>
              <hr className="my-2" />
              <Button>Investor</Button>
            </Accordion>
            <Accordion opened title="Kemitraan">
              <Button>Mitra Kami</Button>
              <hr className="my-2" />
              <Button>Menjadi Penjual</Button>
              <hr className="my-2" />
              <Button>Forum</Button>
            </Accordion>
            <Accordion opened title="Bantuan">
              <Button>Pusat Bantuan</Button>
              <hr className="my-2" />
              <Button>Keamanan</Button>
            </Accordion>
          </div>
        </div>

        <br />

        {/* Row 2: Copyright */}
        <div className="w-full flex">
          <h6 className="text-sm">© 2024 Depository</h6>
        </div>
      </footer>
    </>
  );
}
