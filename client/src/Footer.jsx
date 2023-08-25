export default function Footer() {
    return(
      <footer className="mt-auto min-h-0 bg-neutral-200 text-center text-white dark:bg-neutral-600">
        <div className="container pt-9">
          <div className="mb-9 flex sm:flex-row  justify-center">
            <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            </a>
            <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <img src="http://localhost:5173/facebook-logo-2019.svg" alt="Facebook" width={'32px'} height={'32px'} />
            </a>
            <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <img src="http://localhost:5173/google-plus.svg" alt="Google Plus" width={'32px'} height={'32px'} />
              
            </a>
            <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <img src="http://localhost:5173/instagram.svg" alt="Instagram" width={'32px'} height={'32px'} />
            </a>
            <a href="#!" className="mr-9 text-neutral-800 dark:text-neutral-200">
            <img src="http://localhost:5173/linkedin.svg" alt="LinkedIn" width={'32px'} height={'32px'} />
            </a>
            <a href="#!" className="text-neutral-800 dark:text-neutral-200">
            <img src="http://localhost:5173/github.svg" alt="Github" width={'32px'} height={'32px'} />
            </a>
          </div>
        </div>
        <div
          className="bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
          © 2023 Copyright:
          <a
            className="text-neutral-800 dark:text-neutral-400"
            href="https://tailwind-elements.com/"
            >ONA PROPERTIES</a
          >
        </div>
      </footer>
    )
}