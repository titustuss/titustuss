export default function Footer() {
    return(
      <footer class="mt-auto min-h-0 bg-neutral-200 text-center text-white dark:bg-neutral-600">
        <div class="container pt-9">
          <div class="mb-9 flex sm:flex-row  justify-center">
            <a href="https://www.instagram.com/titustuss" class="mr-9 text-neutral-800 dark:text-neutral-200"target="_blank">
            <img src={'http://localhost:5173/instagram.svg'} alt="" className="w-6 h-6 mr-2" />
            </a>
            <a href="https://www.facebook.com/titustuss" class="mr-9 text-neutral-800 dark:text-neutral-200" target="_blank">
            <img src={'http://localhost:5173/facebook.svg'} alt="" className="w-6 h-6 mr-2" />
            </a>
            <a href="https://www.youtube.com/channel/YOUR_CHANNEL_ID" class="mr-9 text-neutral-800 dark:text-neutral-200" target="_blank">
            <img src={'http://localhost:5173/youtube.svg'} alt="" className="w-6 h-6 mr-2" />
            </a>
          </div>
        </div>
        <div
          class="bg-neutral-300 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
          © 2023 Copyright:
          <a
            class="text-neutral-800 dark:text-neutral-400"
            href="https://tailwind-elements.com/"
            >ONA PROPERTIES</a
          >
        </div>
      </footer>
    )
}