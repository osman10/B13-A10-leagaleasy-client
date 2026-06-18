import {
  EnvelopeOpen,
  Handset,
  LogoFacebook,
  LogoLinkedin,
  MapPin,
} from "@gravity-ui/icons";
import Link from "next/link";

const ICON_SIZE = 20; // 🔥 single source of truth

const TopLink = () => {
  return (
    <div className="hidden md:block w-full bg-white">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-2">

          {/* LEFT INFO */}
          <div className="flex items-center gap-8">

            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0081E0]/10 text-[#0081E0]">
                <MapPin size={ICON_SIZE} />
              </div>

              <div className="leading-tight">
                <h3 className="text-sm font-semibold text-slate-800">
                  Location
                </h3>
                <p className="text-xs text-slate-500">
                  Kushtia, Mirpur, Bangladesh
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0081E0]/10 text-[#0081E0]">
                <EnvelopeOpen size={ICON_SIZE} />
              </div>

              <div className="leading-tight">
                <h3 className="text-sm font-semibold text-slate-800">
                  Mail
                </h3>
                <p className="text-xs text-slate-500">
                  info@legaleasy.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0081E0]/10 text-[#0081E0]">
                <Handset size={ICON_SIZE} />
              </div>

              <div className="leading-tight">
                <h3 className="text-sm font-semibold text-slate-800">
                  Call
                </h3>
                <p className="text-xs text-slate-500">
                  +88 01737 290987
                </p>
              </div>
            </div>

          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-3">

            <Link
              href="#"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-blue-600 hover:bg-blue-50 transition"
            >
              <LogoFacebook size={ICON_SIZE} />
            </Link>

            <Link
              href="#"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-100 text-sky-600 hover:bg-sky-50 transition"
            >
              <LogoLinkedin size={ICON_SIZE} />
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
};

export default TopLink;