<template>
<nav class="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-red-500 mb-3">
  <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
    <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
      <a class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white" href="#pablo">
        cari teks video
      </a>
    </div>
    <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
      <ul class="flex flex-col lg:flex-row list-none ml-auto">
        <li class="nav-item">
        <li class="nav-item">
          <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="https://www.linkedin.com/in/azmi6298/" target="_blank">
            <i class="fa fa-linkedin text-lg leading-lg text-white opacity-75" />
          </a>
        </li>
        <li class="nav-item">
          <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="https://www.medium.com/@azmi6298/" target="_blank">
            <i class="fa fa-medium text-lg leading-lg text-white opacity-75" />
          </a>
        </li>
        <li class="nav-item">
          <a class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="https://www.github.com/azmi6298/" target="_blank">
            <i class="fa fa-github text-lg leading-lg text-white opacity-75" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>