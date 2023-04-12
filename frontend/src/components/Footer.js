import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" pt-5 bg  d-flex flex-column ">
      <div className="row gap-1 justify-content-center  ">
        <div className=" col-sm-8  col-lg-3 d-flex flex-column align-items-center ">
          <h2>Keşfedin</h2>
          <Link className="text-decoration-none">Hakkımızda</Link>
          <Link className="text-decoration-none">Kariyer</Link>
          <Link className="text-decoration-none">İletişim</Link>
        </div>
        <div className=" col-sm-8  col-lg-3 d-flex flex-column align-items-center">
          <h2>Yardım</h2>
          <Link className="text-decoration-none">Sıkça Sorulan Sorular</Link>
          <Link className="text-decoration-none">
            Kişisel Verilerin Korunması
          </Link>
          <Link className="text-decoration-none">Gizlilik Politikası</Link>
        </div>
        <div className=" col-sm-8  col-lg-3 d-flex flex-column align-items-center">
          <h2>Keşfedin</h2>
          <Link className="text-decoration-none">Kullanım Koşulları</Link>
          <Link className="text-decoration-none">Çerez Politikası</Link>
          <Link className="text-decoration-none">
            Sosyal Sorumluluk Projeleri
          </Link>
        </div>
      </div>
      <div className="mt-3 text-center">
        <p>© 2023 JuniusTech</p>
      </div>
    </div>
  );
};

export default Footer;
