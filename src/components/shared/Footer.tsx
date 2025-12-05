import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Logo from "../shadcn-studio/logo";
// import LogoHorizontal from "@/components/LogoHorizontal";

const footerLinks = [
    {
        title: "Product",
        links: ["Features", "Pricing", "Premium", "Travel Plans", "Community"]
    },
    {
        title: "Company",
        links: ["About", "Blog", "Careers", "Contact"]
    },
    {
        title: "Support",
        links: ["Help Center", "Terms", "Privacy Policy", "Status"]
    }
];

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Top Section */}
                <div className="grid gap-12 md:grid-cols-4">

                    {/* Logo + Description */}
                    <div className="space-y-4">
                        {/* <LogoHorizontal /> */}
                        {/* <div className="flex items-center justify-center mb-3">
                            <LogoSvg className='size-10' />
                        </div> */}
                        <Logo></Logo>


                        <p className="text-sm text-muted-foreground">
                            TravelBuddy helps solo travelers, friends, and explorers connect,
                            plan trips, and share unforgettable experiences.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a className="hover:text-primary transition" href="#">
                                <Facebook size={20} />
                            </a>
                            <a className="hover:text-primary transition" href="#">
                                <Instagram size={20} />
                            </a>
                            <a className="hover:text-primary transition" href="#">
                                <Twitter size={20} />
                            </a>
                            <a className="hover:text-primary transition" href="#">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Footer Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title} className="space-y-4">
                            <h3 className="font-semibold">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-muted-foreground hover:text-primary transition"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-12 flex flex-col items-center justify-between border-t pt-6 text-sm text-muted-foreground md:flex-row">
                    <p>© {new Date().getFullYear()} TravelBuddy — All rights reserved.</p>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-primary transition">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-primary transition">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
