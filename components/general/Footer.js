import React from "react";
import Link from "next/link";

import Logo from "../../assets/vsgrey.svg";
import Twitter from "../../assets/twitterwhite.svg";
import Instagram from "../../assets/instagramwhite.svg";
import Discord from "../../assets/discord.svg";
import Medium from "../../assets/medium.svg";
import FlowLogo from "../../assets/flowlogo.svg";

const Footer = () => {
  return (
    <footer className="bg-black-500 py-16 text-white">
      <div className="container block sm:grid grid-cols-12 gap-4">
        <div className="flex items-start col-span-2 md:col-span-1">
          <Link href="/">
            <a className="flex items-start">
              <Logo className="h-12 text-white fill-current" />
            </a>
          </Link>
        </div>
        <div className="col-span-7 lg:col-span-5 flex flex-col justify-between mt-6 sm:mt-0">
          <div>
            <h6 className="">A better way to auction art</h6>
            <h2 className="font-inktrap tracking-tighter font-semibold mt-1 text-2xl">
              Ready to get started?
            </h2>
            <p className="mt-2 w-10/12">
              Versus is a novel art marketplace that works to empower the artist
              and the collector.
            </p>
          </div>
          <div className="mt-6">
            <p className="font-bold font-lato">Built on Flow</p>
            <a
              href="https://www.onflow.org/"
              target="_blank"
              className="cursor-pointer mt-2"
            >
              <FlowLogo className="h-12 mt-1" />
            </a>
          </div>
        </div>
        <div className="col-span-3 md:col-span-4 lg:col-span-6 flex flex-col justify-between mt-6 sm:mt-0">
          <div>
            <h5 className="font-bold">Useful Links</h5>
            <div className="mt-2 flex flex-col">
              <a
                className="mb-2"
                href="mailto:support@versus-flow.art"
                target="_blank"
              >
                Contact Us
              </a>
              <a
                className="mb-2"
                href="https://capturinginsights.typeform.com/to/kf9JZtdY"
                target="_blank"
              >
                Artist Application
              </a>
              <Link href="/faq">
                <a className="mb-2">FAQ</a>
              </Link>
              <Link href="/technical">
                <a className="mb-2">Technical Information</a>
              </Link>
              <Link href="/privacy">
                <a className="mb-2">Privacy policy</a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center mt-16">
            <span>&copy;2021 Versus</span>
            <div className="mt-2 md:mt-0 md:ml-16 flex items-center">
              <a
                href="https://twitter.com/FlowVersus"
                target="_blank"
                className="cursor-pointer"
              >
                <Twitter className="h-6 fill-current mr-6" />
              </a>
              <a
                href="https://www.instagram.com/flowversus/"
                target="_blank"
                className="cursor-pointer"
              >
                <Instagram className="h-6 fill-current mr-6" />
              </a>
              <a
                href="https://discord.gg/aRjPpU9A8t"
                target="_blank"
                className="cursor-pointer"
              >
                <Discord className="h-6 fill-current mr-6" />
              </a>
              <a
                href="https://flowversus.medium.com/"
                target="_blank"
                className="cursor-pointer"
              >
                <Medium className="h-6 fill-current mr-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
