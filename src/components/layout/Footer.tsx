'use client';

import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto">
      {/* 1. Back to Top */}
      <button 
        onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] py-4 text-white text-sm font-medium transition-colors"
      >
        Back to top
      </button>

      {/* 2. MAIN FOOTER (Dark Blue #232F3E) */}
      <div className="bg-[#232F3E] text-white border-b border-[#3a4553]">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base mb-2">Get to Know Us</h3>
              <FooterLink>Careers</FooterLink>
              <FooterLink>About Amazon</FooterLink>
              <FooterLink>Accessibility</FooterLink>
              <FooterLink>Sustainability</FooterLink>
              <FooterLink>Press Center</FooterLink>
              <FooterLink>Investor Relations</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base mb-2">Make Money with Us</h3>
              <FooterLink>Sell on Amazon</FooterLink>
              <FooterLink>Sell apps on Amazon</FooterLink>
              <FooterLink>Supply to Amazon</FooterLink>
              <FooterLink>Become an Affiliate</FooterLink>
              <FooterLink>Self-Publish with Us</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base mb-2">Payment Products</h3>
              <FooterLink>Amazon Visa</FooterLink>
              <FooterLink>Amazon Store Card</FooterLink>
              <FooterLink>Shop with Points</FooterLink>
              <FooterLink>Reload Your Balance</FooterLink>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-base mb-2">Let Us Help You</h3>
              <FooterLink>Your Account</FooterLink>
              <FooterLink>Your Orders</FooterLink>
              <FooterLink>Shipping Rates & Policies</FooterLink>
              <FooterLink>Returns & Replacements</FooterLink>
              <FooterLink>Help</FooterLink>
            </div>
          </div>
        </div>
        
        {/* Divider Logo Area */}
        <div className="border-t border-[#3a4553] py-8 flex items-center justify-center gap-8">
           <span className="text-2xl font-bold tracking-tighter">
              amazon<span className="text-[#FF9900]">.refined</span>
            </span>
        </div>
      </div>

      {/* 3. SUBSIDIARY FOOTER (Darker Blue #131A22) */}
      <div className="bg-[#131A22] text-gray-400 py-8 text-xs">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
                {/* A Sample of the massive link list */}
                <SubFooterLink title="Amazon Music" desc="Stream millions of songs" />
                <SubFooterLink title="Amazon Ads" desc="Reach customers wherever they spend their time" />
                <SubFooterLink title="6pm" desc="Score deals on fashion brands" />
                <SubFooterLink title="AbeBooks" desc="Books, art & collectibles" />
                <SubFooterLink title="ACX" desc="Audiobook Publishing Made Easy" />
                <SubFooterLink title="Sell on Amazon" desc="Start a Selling Account" />
                
                <SubFooterLink title="Amazon Business" desc="Everything For Your Business" />
                <SubFooterLink title="AmazonGlobal" desc="Ship Orders Internationally" />
                <SubFooterLink title="Home Services" desc="Experienced Pros Happiness Guarantee" />
                <SubFooterLink title="Amazon Web Services" desc="Scalable Cloud Computing Services" />
                <SubFooterLink title="Audible" desc="Listen to Books & Original Audio Performances" />
                <SubFooterLink title="Box Office Mojo" desc="Find Movie Box Office Data" />
                
                <SubFooterLink title="Goodreads" desc="Book reviews & recommendations" />
                <SubFooterLink title="IMDb" desc="Movies, TV & Celebrities" />
                <SubFooterLink title="IMDbPro" desc="Get Info Entertainment Professionals Need" />
                <SubFooterLink title="Kindle Direct Publishing" desc="Indie Digital & Print Publishing Made Easy" />
                <SubFooterLink title="Amazon Photos" desc="Unlimited Photo Storage Free With Prime" />
                <SubFooterLink title="Prime Video Direct" desc="Video Distribution Made Easy" />
                
                <SubFooterLink title="Shopbop" desc="Designer Fashion Brands" />
                <SubFooterLink title="Woot!" desc="Deals and Shenanigans" />
                <SubFooterLink title="Zappos" desc="Shoes & Clothing" />
                <SubFooterLink title="Ring" desc="Smart Home Security Systems" />
                <SubFooterLink title="eero WiFi" desc="Stream 4K Video in Every Room" />
                <SubFooterLink title="Blink" desc="Smart Security for Every Home" />
            </div>

            <div className="mt-8 text-center text-xs text-gray-500">
                <div className="flex justify-center gap-4 mb-2">
                    <span className="hover:underline cursor-pointer">Conditions of Use</span>
                    <span className="hover:underline cursor-pointer">Privacy Notice</span>
                    <span className="hover:underline cursor-pointer">Consumer Health Data Privacy Disclosure</span>
                    <span className="hover:underline cursor-pointer">Your Ads Privacy Choices</span>
                </div>
                {/* ADDED TEXT BACK HERE */}
                <p>
                  © 1996-2026, Amazon.com, Inc. or its affiliates. <br />
                  This is a portfolio project by Zac. Not affiliated with Amazon.
                </p>
            </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ children }: { children: React.ReactNode }) {
  return <Link href="#" className="hover:underline decoration-1 underline-offset-2 text-gray-300 hover:text-white">{children}</Link>;
}

function SubFooterLink({ title, desc }: { title: string, desc: string }) {
    return (
        <div className="flex flex-col gap-0 group cursor-pointer">
            <span className="font-bold text-gray-300 group-hover:underline">{title}</span>
            <span className="text-[10px] leading-tight text-gray-500 group-hover:underline">{desc}</span>
        </div>
    )
}