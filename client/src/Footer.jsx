export default function Footer() {
    return(
      <footer className="mt-auto min-h-0 bg-neutral-200 text-center text-white dark:bg-neutral-600">
        <div className="container pt-9">
          <div className="mb-9 flex sm:flex-row items-center justify-center">
            <a href="https://www.facebook.com/" className="mx-3 sm:mr-9 text-neutral-800 dark:text-neutral-200" target="_blank">
            <img src="http://localhost:5173/facebook.svg" alt="Facebook" width={'32px'} height={'32px'} />
            </a>
            <a href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" class="mr-4 sm:mx-6 text-neutral-800 dark:text-neutral-200" target="_blank">
            <img src={'http://localhost:5173/youtube.svg'} alt=""width={'32px'} height={'32px'} />
            </a>
            <a href="https://www.google-plus.com/" className="mx-3 sm:mx-6 text-neutral-800 dark:text-neutral-200" target="_blank">
            <img src="http://localhost:5173/google-plus.svg" alt="Google Plus" width={'32px'} height={'32px'} />
            </a>
            <a href="https://www.instagram.com/" className="mx-3 sm:mx-6 text-neutral-800 dark:text-neutral-200" target="_blank">
            <img src="http://localhost:5173/instagram.svg" alt="Instagram" width={'32px'} height={'32px'} />
            </a>
            <a href="https://www.linkedin.com/" className="mx-3 sm:mx-6 text-neutral-800 dark:text-neutral-200" target="_blank">
            <img src="http://localhost:5173/linkedin.svg" alt="LinkedIn" width={'32px'} height={'32px'} />
            </a>
            <a href="https://www.github.com/" className="mx-3 sm:mx-6 text-neutral-800 dark:text-neutral-200" target="_blank">
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