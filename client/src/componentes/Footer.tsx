import { BiCopyright } from "react-icons/bi";
import logoMobile from "../assets/hernyLogoSmall.png";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  GrFacebookOption,
  GrInstagram,
  GrYoutube,
  GrTwitter,
} from "react-icons/gr";
import { FaUserAlt } from "react-icons/fa";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import NewsLetter from "./newsletter";

import HeaderLink from "./HeaderLink";
import white from "../assets/SH-white2.png";

const widht = window.innerWidth;

const Footer = () => {
  if (window.screen.width > 390) {
    return (
      <div className="pt-5 w-full mb-0">
        <div className="h-32 bg-yellow flex justify-between items-center">
          <div className="pl-10 text-5xl text-left font-bold">
            CLUB<p>HENRY</p>
          </div>
          <p className="pl-10 pr-3 text-left">
            ¿Deseas conocer más de nosotros, ser el primero en enterarse de
            nuestros nuevos productos, promociones y mucho más? Déjanos tu
            e-mail...
          </p>
          <div className="pr-10 ml-2">
            <NewsLetter />
          </div>
        </div>
        <div className="h-40 bg-slate-700 flex flex-col items-center">
          <div className="flex w-full">
            <div className="ml-10 w-2/5 h-5 border-b border-white"></div>
            <div className="w-1/5 mt-3 justify-center flex text-white space-x-10">
              <GrFacebookOption />
              <GrInstagram />
              <GrYoutube />
              <GrTwitter />
            </div>
            <div className="mr-10 w-2/5 h-5 border-b border-white"></div>
          </div>
          <img src={white} className="aboslute h-20 w-48 " alt="img" />
          <p className="absolute pt-24 flex text-xs text-white">
            Copyright <BiCopyright className="mx-1 mt-0.5" />
            Henry Shop 2022
          </p>
          <div className="flex mt-5 text-sm text-white space-x-5 items-center">
            <div>Acerca de nosotros</div>
            <Link
              to="/política-devoluciones"
              className="text-white hover:text-yellow"
            >
              <div className="border-l pl-5 border-white">
                Politica de devoluciones
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <footer className="text-center bg-slate-900 text-white xl:w-screen">
        <div className="flex flex-col items-center">
          <div className="container px-6 pt-6">
            <div className="flex w-full">
              <div className="mr-3 ml-0 mt-2 w-2/5 h-5 border-t border-white"></div>
              <div className="flex justify-center mb-6 space-x-10">
                <GrFacebookOption />
                <GrInstagram />
                <GrYoutube />
                <GrTwitter />
              </div>
              <div className="ml-3 mr-0 mt-2 w-2/5 h-5 border-t border-white"></div>
            </div>
            <div>
              <form action="">
                <div className="grid md:grid-cols-3 gird-cols-1 gap-4 flex justify-center items-center">
                  <div className="md:ml-auto md:mb-6"></div>
                </div>
              </form>
            </div>
            <div className="mb-6">
              <p>
                ¿Deseas conocer más de nosotros? sé el primero en enterarte de
                nuestras novedades y recibir ofertas exclusivas.
              </p>
              <p>Suscríbete a nuestro boletín de noticias.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-self-end">
                <NewsLetter />
              </div>
              <div className="flex mx-8 items-center align-items center">
                <img src={white} className="aboslute h-20 w-48 " alt="img" />
              </div>
              <div className="flex mt-5 text-sm text-white space-x-5 items-center">
                <div className="pl-8">Acerca de nosotros</div>
                <Link
                  to="/política-devoluciones"
                  className="text-white hover:text-yellow"
                >
                  <div className="border-l pl-5 border-white">
                    Politica de devoluciones
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center p-4">
            © 2022 Copyright:
            <a className="text-white" href="http://localhost:3000/">
              {" "}
              HenryShop
            </a>
          </div>
        </div>
      </footer>
    );
  }
};
export default Footer;
