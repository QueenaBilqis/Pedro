import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 border-t border-slate-100 dark:border-slate-900 pt-20 pb-12 bg-surface-light dark:bg-surface-dark overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1">
            <h2 className="font-display text-8xl md:text-[150px] font-bold text-primary opacity-20 leading-none select-none -ml-4">PEDRO</h2>
            <div className="mt-12 space-y-6 max-w-xl">
              <p className="text-xl font-medium leading-relaxed">Our team is passionate about futurism and innovation, and we bring this passion to life in every bag we make.</p>
              <p className="text-slate-500 dark:text-slate-400">We love experimenting with modern materials, technologies and shapes to create products that not only meet your needs, but also inspire new possibilities.</p>
            </div>
          </div>
          <div className="flex-shrink-0 flex gap-4 hidden lg:flex">
             <div className="w-48 h-64 bg-slate-200 dark:bg-slate-800 rounded-3xl -rotate-6 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0DgQ7IXBtsIk5sXNRKXMlot5BVufXwKwqyYmIpsViSxRtjYK47kJyzqr7tew24jt_T_YPyJjYyH7-xmvPBrjm1SISBQpfEUQ-CoaK7bZoYoYOnzhj5lyV6XiSaamnYUbO1He-V6p97xmDwPw3YejMFigZq05WRWamxQomnwWx2oXcDiHu-TDYWKzHtUdzrdtY7SopyxFLIJzJOBVD9yDkE9q7l8YqqMrlgYK9m4gmKAN43zm8h1ihfDGTn6h6sX8JuqvNQa372te7" alt="Aesthetic" className="w-full h-full object-cover opacity-80" />
             </div>
             <div className="w-48 h-64 bg-slate-300 dark:bg-slate-700 rounded-3xl translate-y-12 overflow-hidden">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfsg6-p3ZQNvwEGcxsxsNXIXLYa8Cta5EPoFEux-hPAAKMbZkgaG6_eQ5WLS08TmOJlDXyCPnd-dfrH5wnKdUDGP7mZO--TMV2Nr2Qmfh2jf7spVOjvWNJmIhTNyysmUNvGyEg3H3c_BLaDeHifxRn7lZnit-whCa1Zc1dpvub3OJzKr4byiDs5YCmbWYuLRBjgoShP3HU01oZmiy_dP7XFxXU8Drkz7NUtglBQZ_3vXs47m626zIRuwtemH-7JJ_lIsbLQ4dNw7tU" alt="Material" className="w-full h-full object-cover opacity-80" />
             </div>
          </div>
        </div>
        <div className="mt-40 pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8 text-xs uppercase tracking-[0.3em] font-bold text-slate-600 dark:text-slate-400">
          <p>© 2024 PEDRO FUTURISTIC LUXURY</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
            <a href="#" className="hover:text-primary transition-colors">Behance</a>
            <a href="#" className="hover:text-primary transition-colors">Vimeo</a>
          </div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;