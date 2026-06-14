import React from "react";

const Logo = () => (
  <div className="flex items-center gap-2">
    <svg className="h-6 w-6" viewBox="0 0 1125 1125" fill="none">
      <path
        d="M479.34 717.11s12.56 98.77 94.03 180.24c82.97 82.97 167.21 81.02 167.21 81.02l-131.39 131.38s-86.95-9.04-172.16-94.24c-74.64-74.64-89.08-167.01-89.08-167.01l131.39-131.38Zm175.42-5.69s91.82 38.51 203.1 8.69c113.34-30.37 153.77-104.3 153.77-104.3l48.09 179.48s-51.3 70.79-167.7 101.97c-101.95 27.32-189.18-6.36-189.18-6.36l-48.09-179.48Zm82.78-154.76s79.26-60.27 109.08-171.55c30.37-113.34-13.44-185.32-13.44-185.32l179.47 48.09s35.65 79.82 4.46 196.22c-27.32 101.95-100.1 160.65-100.1 160.65l-179.47-48.09ZM644.9 407.59s-12.56-98.77-94.03-180.24c-82.97-82.97-167.21-81.02-167.21-81.02L515.04 14.95s86.95 9.04 172.16 94.24c74.64 74.64 89.08 167.01 89.08 167.01L644.89 407.58Zm-175.42 5.69s-91.82-38.51-203.1-8.69c-113.34 30.37-153.77 104.3-153.77 104.3L64.52 329.41s51.3-70.79 167.7-101.97c101.95-27.32 189.18 6.36 189.18 6.36l48.09 179.48ZM386.7 568.04s-79.26 60.27-109.08 171.55c-30.37 113.34 13.44 185.32 13.44 185.32l-179.47-48.09S75.94 797 107.13 680.6c27.32-101.95 100.1-160.65 100.1-160.65l179.47 48.09Z"
        fill="rgb(0,0,0)"
      />
    </svg>
    <span className="text-lg font-semibold tracking-tight text-gray-900">
      Beamline
    </span>
  </div>
);

const linkSections = [
  {
    title: "Product",
    links: [
      { name: "Expense management", href: "#" },
      { name: "Payments automation", href: "#" },
      { name: "Corporate cards", href: "#" },
      { name: "Bank connect", href: "#" },
      { name: "Invoicing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Events", href: "#" },
      { name: "Contact us", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "#" },
      { name: "Terms of use", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 overflow-hidden pt-12">
      <div className="container max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <Logo />
              <div className="mt-6 space-y-4 text-sm text-gray-600">
                <p>The financial command center for fast-moving teams.</p>
                <p>
                  Talk to a product expert today. <br />
                  For product inquiries, partnerships, or support, <br />
                  email us at hello@beamline.app.
                </p>
              </div>
            </div>

            {linkSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-gray-400">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-800 hover:text-gray-900 hover:underline"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-8 border-t border-gray-200 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="text-sm container max-w-8xl mx-auto text-left text-gray-500">
          <p>© 2026 Beamline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
