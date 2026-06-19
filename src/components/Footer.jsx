import Link from "next/link";
import {
  LogoFacebook,
  LogoLinkedin,
} from "@gravity-ui/icons";


export default function Footer() {
  return (
    <footer className="bg-[#0081E0] text-white mt-20">
      <div className="container mx-auto px-6 py-12">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">LegalEase</h2>
            <p className="text-sm mt-3 text-white/80 leading-relaxed">
              Connecting clients with verified lawyers through a secure,
              transparent, and modern legal marketplace.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <Link href="#" className="hover:scale-110 transition">
                <LogoFacebook  size={20} />
              </Link>

              <Link href="#" className="hover:scale-110 transition">
                <LogoLinkedin  size={20} />
              </Link>

     
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li><Link href="/browse-lawyers" className="hover:text-white">Browse Lawyers</Link></li>
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Lawyer Hiring</li>
              <li>Legal Consultation</li>
              <li>Case Management</li>
              <li>Verified Lawyers</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>Kushtia, Bangladesh</li>
              <li>info@legaleasy.com</li>
              <li>+880 1737 290987</li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/70">
          <p>© {new Date().getFullYear()} LegalEase. All rights reserved.</p>

          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}