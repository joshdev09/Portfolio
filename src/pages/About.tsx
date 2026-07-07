import photo from '../assets/images/me-photo.png'
import Button from '../components/Button'

function About() {
  return (
    <div className="bg-[#1a1a1a] min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full mx-auto">

        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">

          {/* LEFT — Photo */}
          <div className="flex flex-col gap-4 shrink-0">
            <div className="w-52 md:w-80 aspect-[3/4] rounded-xl overflow-hidden bg-[#242424]">
              <img
                src={photo}
                alt="Joshua Halili"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="flex flex-col gap-5 flex-1 min-w-0">

            {/* Section label */}
            <div className="flex items-center gap-3">
              <div className="w-7 h-px bg-[#6b7280]" />
              <span className="text-[#6b7280] text-xs font-semibold tracking-widest uppercase">
                About
              </span>
            </div>

            {/* Name + Verified */}
            <div>
              <div className="flex items-center gap-1 flex-wrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#60a5fa" className="size-5 shrink-0">
                  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                </svg>
                <h1 className="text-2xl md:text-2xl font-bold text-[#f0f2f5]">
                  Joshua Halili
                </h1>
              </div>
              <p className="text-[#6b7280] text-[10px] font-semibold tracking-widest uppercase mt-1.5">
                Software Developer · Full-Stack Developer · Front-end Ai Engineer
              </p>

              {/* Meta */}
              <div className="flex flex-col gap-1 mt-2">
                <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
                    <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                  </svg>
                  Angeles City, Pampanga, Philippines
                </div>
                <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 shrink-0">
                    <path fillRule="evenodd" d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 0 1 5.273 3h9.454a2.75 2.75 0 0 1 2.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3.73Zm3.068-5.852A1.25 1.25 0 0 1 5.273 4.5h9.454a1.25 1.25 0 0 1 1.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 0 0-.86.49l-.606 1.02a1 1 0 0 1-.86.49H8.236a1 1 0 0 1-.894-.553l-.448-.894A1 1 0 0 0 6 11H2.53l.015-.062 1.523-5.52Z" clipRule="evenodd" />
                  </svg>
                  joshuahalili526@gmail.com
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/[0.07]" />

            {/* Bio */}
            <p className="text-[#a1a1aa] text-base leading-relaxed">
              IT Web Development Student and <span className="text-[#f0f2f5] font-bold">Web Development Lead </span> at{' '}
              <span className="text-[#f0f2f5] font-bold">Google Developers Group on Campus</span>
              {' '}— Holy Angel University. I develop full-stack web applications, design modern front-end experiences, and leverage AI to build smarter, more efficient digital products.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/joshua.emmanuel.m.halili"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#6b7280] hover:text-[#f0f2f5] transition-colors duration-200 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.9v-2.891h2.538V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33V21.878C18.343 21.128 22 16.991 22 12Z" />
                </svg>
                <span>Facebook</span>
              </a>

              <div className="w-px h-4 bg-white/[0.1]" />

              {/* GitHub */}
              <a
                href="https://github.com/joshdev09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#6b7280] hover:text-[#f0f2f5] transition-colors duration-200 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
                </svg>
                <span>GitHub</span>
              </a>

              <div className="w-px h-4 bg-white/[0.1]" />

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/joshua-emmanuel-m-halili-133155377/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#6b7280] hover:text-[#f0f2f5] transition-colors duration-200 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 shrink-0">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>

            <Button />

          </div>
        </div>

      </div>
    </div>
  )
}

export default About