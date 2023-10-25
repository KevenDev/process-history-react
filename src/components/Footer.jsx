

const Footer = () => {
  return (
    <footer className="bg-[#005EB8]">
  <div className="mx-auto max-w-screen-xl px-4 py-1 sm:px-6 lg:px-8">
    <div className="flex justify-between sm:flex sm:items-center sm:justify-between items-center">
      <div className="flex justify-center text-teal-600 sm:justify-start">
         <img className="mx-auto md:mx-0 w-50 h-24" src="data:image/png;base64,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" alt="Logo Sebrae" />
      </div>

      <ul className=" flex justify-center gap-6 sm:justify-start md:gap-8">
          <li>
            <a
              href="https://www.facebook.com/sebraesergipe/?locale=pt_BR"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:text-[#13222f]"
            >
              <span className="sr-only">Facebook</span>
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/sebraesergipe/"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:text-[#13222f]"
            >
              <span className="sr-only">Instagram</span>
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/SebraeSergipe"
              rel="noreferrer"
              target="_blank"
              className="text-white transition hover:text-[#13222f]"
            >
              <span className="sr-only">Twitter</span>
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                />
              </svg>
            </a>
          </li>
        </ul>
      
    </div>
  </div>
</footer>
  )
}

export default Footer;
