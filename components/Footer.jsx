import React from "react";
import { Fot1, Fot2 } from ".";

const Footer = () => {
  const footerNavs = [
    {
      href: "javascript:voide()",
      name: "Terms",
    },
    {
      href: "javascript:voide()",
      name: "License",
    },
    {
      href: "javascript:voide()",
      name: "Privacy",
    },
    {
      href: "javascript:voide()",
      name: "About Us",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <img src="https://www.floatui.com/logo.svg" className="w-32" />
            <p className="max-w-md">
              Sample text for footer which explains dapp and services
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, index) => {
                return (
                  <li key={index} className="text-gray-800 hover:text-gray-500 duration-150">
                    <a  href={item.href}>
                      {item.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get the App</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="javacript:void()">
                <Fot1 />
              </a>
              <a href="javacript:void()" className="mt-0 block sm:mt-3">
                <Fot2 />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 py-10 border-t md:text-center">
          <p>c 2023 Deekshith M D, All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
